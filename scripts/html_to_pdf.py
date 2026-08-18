#!/usr/bin/env python3
"""
Astra Presentation: HTML → PDF exporter (Chrome screenshot mode).

PHILOSOPHY:
    PDF = pixel-exact screenshots of each slide as rendered in the browser viewport.
    NOT a print-mode reflow. This means: what you see in the browser is what
    ends up in the PDF — vw/vh, flex/grid layouts, fonts, all identical.

    The earlier --print-to-pdf approach was rejected because Chrome's print
    media query triggers a different layout pass (different vw/vh resolution,
    @media print rule activation), making PDF look nothing like the browser.

DEFAULTS:
    16:9 landscape (1280×720 logical px) — standard projector / desktop deck
    9:16 portrait  (720×1280 logical px) — phone / WeChat / vertical mobile share
    Device scale factor: 2x (HiDPI) — doubles pixel density for crisp text & SVG

USAGE:
    python3 html_to_pdf.py input.html [output.pdf]
    python3 html_to_pdf.py input.html [output.pdf] --portrait
    python3 html_to_pdf.py input.html [output.pdf] --scale 3   # ultra-crisp

REQUIREMENTS:
    - Google Chrome installed (macOS default path probed)
    - Pillow (PIL): `pip3 install Pillow`
"""
import sys, os, subprocess, tempfile, shutil, re, argparse, glob
from PIL import Image, JpegImagePlugin  # noqa: F401  (registers JPEG in Image.SAVE)
Image.init()  # ensure JPEG/PNG savers registered (some Pillow builds defer this)


# Injected into every captured page: drive GSAP timelines to their final frame
# so reveal/intro animations resolve before the screenshot — virtual-time-budget
# alone does NOT reliably advance rAF-driven GSAP timelines, and infinite
# (repeat:-1) tweens prevent virtual time from ever settling. Finite tweens jump
# to their end (visible final state); infinite ones are pinned to frame 0 + paused.
GSAP_FORCE_JS = """
(function(){
  function force(){
    if(!window.gsap || !gsap.globalTimeline){return;}
    try{
      gsap.globalTimeline.getChildren(false, true, true).forEach(function(c){
        if(c.repeat && c.repeat() === -1){ c.progress(0).pause(); }
        else { c.progress(1).pause(); }
      });
    }catch(e){}
  }
  force();
  document.addEventListener('DOMContentLoaded', force);
  window.addEventListener('load', force);
})();
"""


LANDSCAPE = (1280, 720)   # 16:9 in logical pixels (matches typical viewport)
PORTRAIT  = (720, 1280)   # 9:16 in logical pixels
DEFAULT_SCALE = 2         # device scale factor: 2x = HiDPI crispness by default


def find_chrome():
    # Prefer chrome-headless-shell (Playwright cache): it is purpose-built for
    # headless capture and exits cleanly. Full Chrome's `--headless` is flaky on
    # some machines (hangs, never writes the screenshot). Fall back to it only if
    # the shell isn't present.
    shells = []
    for cache in (os.path.expanduser('~/Library/Caches/ms-playwright'),
                  os.path.expanduser('~/.cache/ms-playwright')):
        shells += sorted(glob.glob(os.path.join(cache, 'chromium_headless_shell-*',
                                                 '*', 'chrome-headless-shell')), reverse=True)
        shells += sorted(glob.glob(os.path.join(cache, 'chromium-*', '*',
                                                 'chrome-mac', 'headless_shell')), reverse=True)
    paths = shells + [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        shutil.which('chromium') or '',
        shutil.which('google-chrome') or '',
    ]
    return next((p for p in paths if p and os.path.exists(p)), None)


def _is_headless_shell(chrome):
    b = os.path.basename(chrome).lower()
    return 'headless-shell' in b or 'headless_shell' in b


def count_slides(html):
    """Count elements whose class list contains exactly `slide` (not `slide-body`,
    `slide-meta`, etc.). Matches <section> or <div> with class="slide ..." or
    class="... slide ..." or class="... slide"."""
    return len(re.findall(
        r'<(?:section|div)[^>]*class="(?:[^"]*\s)?slide(?:\s[^"]*)?"',
        html
    ))


def build_per_slide_html(html, slide_idx):
    """
    Return HTML where only the Nth slide is visible (display:grid),
    all others are display:none. Force every known "entered/active/visible"
    class AND hard-reset entrance-animation hidden states so reveals resolve
    to their final rendered state — without waiting for animations to play.

    Why the hard CSS reset matters: virtual-time-budget only advances the
    clock, but many decks start elements at `opacity:0; transform:translateY(20px)`
    and rely on a .slide.active class (or GSAP timeline, or IntersectionObserver)
    to unhide. If that class is never added — or the observer never fires in
    headless — the element stays invisible and the PDF page ships blank.
    Rather than chase every animation library, we override the hidden state.
    """
    inject = f"""
<style id="astra-pdf-isolate">
  /* Hide all slides, then show only the Nth */
  .slide {{ display: none !important; }}
  .slide:nth-of-type({slide_idx + 1}) {{ display: grid !important; }}
  /* Ensure no scroll-snap interference and full viewport occupancy */
  html, body {{ overflow: hidden !important; margin: 0 !important; padding: 0 !important; }}
  .deck {{ box-shadow: none !important; }}
  /* Force the current slide (and its children) to final-state */
  .slide:nth-of-type({slide_idx + 1}), .slide:nth-of-type({slide_idx + 1}) * {{
    opacity: 1 !important;
  }}
  /* Neutralize common entrance-anim hidden states — applied to the active slide's subtree */
  .slide:nth-of-type({slide_idx + 1}) .reveal,
  .slide:nth-of-type({slide_idx + 1}) [class*="fade"],
  .slide:nth-of-type({slide_idx + 1}) [class*="reveal"],
  .slide:nth-of-type({slide_idx + 1}) [class*="appear"],
  .slide:nth-of-type({slide_idx + 1}) [class*="enter"],
  .slide:nth-of-type({slide_idx + 1}) [data-anim] {{
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    animation: none !important;
    visibility: visible !important;
  }}
</style>
<script>
  // Tag every slide with the common "active/visible/entered" classes so
  // CSS rules like `.slide.active .reveal {{ opacity: 1 }}` resolve correctly.
  // Run both immediately (in case DOMContentLoaded already fired) and on the
  // event, to cover scripts that populate slides dynamically.
  (function forceFinalState() {{
    const tag = () => {{
      document.querySelectorAll('.slide').forEach(s => {{
        s.classList.add('active', 'visible', 'entered', 'in-view', 'is-visible');
      }});
    }};
    tag();
    document.addEventListener('DOMContentLoaded', tag);
  }})();
  {GSAP_FORCE_JS}
</script>
"""
    return html.replace('</head>', inject + '</head>')


def build_fullpage_html(html):
    """For multi-file decks: each file is ONE full-page slide (often an SVG with
    a GSAP intro). No per-slide isolation needed — just force GSAP to its final
    frame so the screenshot isn't a pre-animation blank."""
    inject = f'<script>{GSAP_FORCE_JS}</script>'
    if '</body>' in html:
        return html.replace('</body>', inject + '</body>', 1)
    return html + inject


def find_deck_files(input_path):
    """If input is a directory or an index.html viewer, return the ordered list of
    per-slide HTML files (S01-*.html ... or all *.html minus index). Else None."""
    base = None
    if os.path.isdir(input_path):
        base = input_path
    elif os.path.basename(input_path).lower() in ('index.html', 'index.htm'):
        base = os.path.dirname(os.path.abspath(input_path))
    if not base:
        return None
    files = sorted(glob.glob(os.path.join(base, 'S*.html')))
    if not files:
        files = sorted(f for f in glob.glob(os.path.join(base, '*.html'))
                       if os.path.basename(f).lower() not in ('index.html', 'index.htm'))
    return files or None


def screenshot_slide(chrome, html_file, png_file, width, height, scale=DEFAULT_SCALE, timeout=60):
    user_dir = tempfile.mkdtemp(prefix='astra-cr-')
    cmd = [chrome]
    if not _is_headless_shell(chrome):
        # full Chrome needs the headless+sandbox flags; chrome-headless-shell
        # is already headless and rejects/ignores them.
        cmd += ['--headless', '--no-sandbox']
    cmd += [
        '--disable-gpu', '--hide-scrollbars',
        f'--user-data-dir={user_dir}',
        f'--window-size={width},{height}',
        f'--force-device-scale-factor={scale}',
        f'--screenshot={png_file}',
        '--default-background-color=00000000',
        '--virtual-time-budget=4000',
        f'file://{html_file}',
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        if not os.path.exists(png_file):
            raise RuntimeError(f'Screenshot failed for {html_file}\nstderr: {result.stderr[:300]}')
    finally:
        shutil.rmtree(user_dir, ignore_errors=True)


def combine_to_pdf(png_paths, output_pdf):
    """Combine PNGs into a multi-page PDF using Pillow."""
    images = []
    for p in png_paths:
        img = Image.open(p)
        # Convert to RGB (drops alpha — PDF doesn't support transparent pages)
        if img.mode in ('RGBA', 'LA', 'P'):
            bg = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            bg.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = bg
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        images.append(img)

    # Resolution scales with device scale factor: 144 dpi × scale so the PDF
    # reports a page size that matches the logical viewport instead of the
    # raw pixel dimensions (otherwise 2x/3x screenshots end up as huge pages).
    images[0].save(
        output_pdf,
        save_all=True,
        append_images=images[1:],
        resolution=144.0,
    )


def export_multifile(chrome, files, abs_output, width, height, scale):
    """Each file is one full-page slide (multi-file SVG/HTML deck). Inject GSAP
    force, screenshot each, combine. Temp HTML is written beside the original so
    any relative assets still resolve."""
    tmp_htmls, png_paths = [], []
    temp_png_dir = tempfile.mkdtemp(prefix='astra-pdf-')
    try:
        for i, f in enumerate(files):
            with open(f, 'r', encoding='utf-8') as fh:
                page = build_fullpage_html(fh.read())
            html_file = os.path.join(os.path.dirname(os.path.abspath(f)), f'.astra_pdf_tmp_{i:03d}.html')
            with open(html_file, 'w', encoding='utf-8') as fh:
                fh.write(page)
            tmp_htmls.append(html_file)
            png_file = os.path.join(temp_png_dir, f's{i:03d}.png')
            screenshot_slide(chrome, html_file, png_file, width, height, scale=scale)
            png_paths.append(png_file)
            print(f'  [{i+1}/{len(files)}] {os.path.basename(f)}')
        combine_to_pdf(png_paths, abs_output)
        size_kb = os.path.getsize(abs_output) / 1024
        print(f'PDF saved ({len(files)} pages, {scale}x HiDPI): {abs_output} ({size_kb:.0f} KB)')
    finally:
        for t in tmp_htmls:
            try: os.remove(t)
            except OSError: pass
        shutil.rmtree(temp_png_dir, ignore_errors=True)


def html_to_pdf(input_html, output_pdf=None, portrait=False, scale=DEFAULT_SCALE):
    width, height = PORTRAIT if portrait else LANDSCAPE

    chrome = find_chrome()
    if not chrome:
        sys.exit('ERROR: Chrome/Chromium not found. Install Chrome or use Cmd+P → Save as PDF.')

    # Multi-file deck? (a folder of S01-*.html, or an index.html viewer)
    deck_files = find_deck_files(input_html)
    if deck_files:
        if not output_pdf:
            base = (input_html if os.path.isdir(input_html)
                    else os.path.dirname(os.path.abspath(input_html)))
            output_pdf = os.path.join(base, os.path.basename(os.path.normpath(base)) + '.pdf')
        print(f'Multi-file deck: {len(deck_files)} slides via {os.path.basename(chrome)}')
        export_multifile(chrome, deck_files, os.path.abspath(output_pdf), width, height, scale)
        return

    if not output_pdf:
        output_pdf = os.path.splitext(input_html)[0] + '.pdf'

    abs_html = os.path.abspath(input_html)
    abs_output = os.path.abspath(output_pdf)

    with open(abs_html, 'r', encoding='utf-8') as f:
        html = f.read()

    n = count_slides(html)
    if n == 0:
        sys.exit('ERROR: No .slide elements found in HTML.')

    temp_dir = tempfile.mkdtemp(prefix='astra-pdf-')
    png_paths = []

    try:
        for i in range(n):
            per_html = build_per_slide_html(html, i)
            html_file = os.path.join(temp_dir, f's{i:02d}.html')
            png_file = os.path.join(temp_dir, f's{i:02d}.png')
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(per_html)
            screenshot_slide(chrome, html_file, png_file, width, height, scale=scale)
            png_paths.append(png_file)
            print(f'  [{i+1}/{n}] captured slide')

        combine_to_pdf(png_paths, abs_output)

        size_kb = os.path.getsize(abs_output) / 1024
        orientation = 'portrait 9:16' if portrait else 'landscape 16:9'
        px_w, px_h = width * scale, height * scale
        print(f'PDF saved ({orientation}, {n} pages, {scale}x HiDPI → {px_w}×{px_h}px): '
              f'{abs_output} ({size_kb:.0f} KB)')
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


def main():
    parser = argparse.ArgumentParser(
        description='Astra Presentation: HTML → PDF via per-slide screenshots '
                    '(16:9 default, --portrait for 9:16). Pixel-exact viewport rendering.')
    parser.add_argument('input_html', help='Input HTML file')
    parser.add_argument('output_pdf', nargs='?', default=None,
                        help='Output PDF path (default: input.pdf)')
    parser.add_argument('--portrait', action='store_true',
                        help='9:16 vertical (720×1280 logical px). Default is 16:9 landscape.')
    parser.add_argument('--scale', type=int, default=DEFAULT_SCALE, choices=[1, 2, 3],
                        help=f'Device scale factor for HiDPI rendering. '
                             f'1=standard, 2=default (crisp), 3=ultra-crisp. Default: {DEFAULT_SCALE}.')
    args = parser.parse_args()
    html_to_pdf(args.input_html, args.output_pdf, portrait=args.portrait, scale=args.scale)


if __name__ == '__main__':
    main()
