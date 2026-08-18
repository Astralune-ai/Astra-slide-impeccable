# Phase 5-6: Delivery, Share, and Export

> 提取自 SKILL.md · Phase 5 交付 · 6A deploy to URL · 6B PDF export (含 PDF 踩坑)。

## Phase 5: Delivery

1. **Clean up** — Delete `.claude-design/slide-previews/` if it exists
2. **Open** — Use `open [filename].html` to launch in browser
3. **"Made with Asyre Presentation" watermark** — The last slide should include a small, subtle watermark line at the bottom:
   - Text: "Made with Asyre Presentation"
   - Style: `color: var(--text-muted); font-size: var(--small-size);`
   - Link to: `https://github.com/codesstar/next-slide` (engine credit)
   - This is **opt-out**: included by default. If the user says "no watermark", omit it.
4. **Summarize** — Tell the user:
   - File location, style name (or "custom from design context"), slide count
   - If background images were generated: mention count and location (`bg/` directory)
   - Navigation: Arrow keys, Space, scroll/swipe, click nav dots
   - How to customize: `:root` CSS variables for colors, font link for typography
   - How to adjust background image opacity: change `opacity` value on `.slide-bg` elements
   - If inline editing was enabled: how to use it
   - If IMPECCABLE_CONTEXT was used: mention which design context elevations were applied

---

## Phase 6: Share & Export (Optional)

Ask: "Want to share this? I can deploy to a live URL or export as PDF."

Options: Deploy to URL / Export to PDF / Both / No thanks

### 6A: Deploy to URL (Vercel)

1. Check Vercel CLI: `npx vercel --version`
2. Check login: `npx vercel whoami`
3. Deploy: `npx vercel --prod`
4. Share the URL

### 6B: Export to PDF

Uses Chrome/Chromium headless print-to-PDF. Zero extra dependencies — just needs Chrome installed (macOS default path).

**Step 1: Generate a temp HTML with print CSS injected.**

Write a Python script inline and run it. The script:

1. Reads the presentation HTML
2. Injects `@media print` CSS before `</head>` that:
   - Sets page size to `338mm × 190mm` (16:9 landscape), margin 0
   - Forces `body { overflow: visible }` and `print-color-adjust: exact`
   - Makes all `.slide` elements `position: relative`, `width: 338mm`, `height: 190mm`, `opacity: 1`, `transform: none`, with `page-break-after: always`
   - Forces ALL animated elements visible: `.anim-1` through `.anim-10`, `[class*="anim-"]`, `[class*="fade"]`, `[class*="reveal"]` → `opacity: 1 !important; transform: none !important; animation: none !important`
   - Hides nav: `.nav-dots, .progress-bar, .page-counter, [class*="nav"], [class*="progress"], [class*="counter"]` → `display: none !important`
3. Writes temp file to a temp directory
4. Calls Chrome headless:
   ```bash
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
     --headless --disable-gpu --no-pdf-header-footer --print-to-pdf-no-header \
     --print-to-pdf=/absolute/path/output.pdf \
     file:///path/to/temp.html
   ```
5. Cleans up temp file
6. Opens the PDF: `open output.pdf`

**Complete inline script** (run with `python3 -c "..."` or write to temp file):

```python
import sys, os, subprocess, tempfile, shutil

def html_to_pdf(input_html, output_pdf=None):
    if not output_pdf:
        output_pdf = os.path.splitext(input_html)[0] + '.pdf'
    with open(input_html, 'r', encoding='utf-8') as f:
        html = f.read()
    print_css = """
<style>
@media print {
    @page { size: 338mm 190mm; margin: 0; }
    body { overflow: visible !important; background: var(--bg-primary, #0a0a0b) !important;
           -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    .slide { position: relative !important; width: 338mm !important; height: 190mm !important;
             opacity: 1 !important; pointer-events: auto !important; transform: none !important;
             page-break-after: always !important; break-after: page !important;
             overflow: hidden !important; display: flex !important;
             flex-direction: column !important; justify-content: center !important; }
    .slide:last-of-type { page-break-after: avoid !important; }
    .anim-1,.anim-2,.anim-3,.anim-4,.anim-5,.anim-6,.anim-7,.anim-8,.anim-9,.anim-10,
    [class*="anim-"],[class*="fade"],[class*="reveal"] {
        opacity: 1 !important; transform: none !important; animation: none !important; }
    .slide * { animation-fill-mode: forwards !important; }
    .nav-dots,.slide-nav,.progress-bar,.nav-arrows,.slide-counter,.page-indicator,.page-counter,
    [class*="nav"],[class*="progress"],[class*="counter"] { display: none !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
</style>
"""
    html = html.replace('</head>', print_css + '\\n</head>')
    temp_dir = tempfile.mkdtemp()
    temp_html = os.path.join(temp_dir, 'print.html')
    with open(temp_html, 'w', encoding='utf-8') as f:
        f.write(html)
    chrome_paths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        shutil.which('chromium') or '', shutil.which('google-chrome') or '',
    ]
    chrome = next((p for p in chrome_paths if p and os.path.exists(p)), None)
    if not chrome:
        print("ERROR: Chrome/Chromium not found"); sys.exit(1)
    abs_output = os.path.abspath(output_pdf)
    cmd = [chrome, '--headless', '--disable-gpu', '--no-pdf-header-footer',
           '--print-to-pdf-no-header', f'--print-to-pdf={abs_output}', f'file://{temp_html}']
    subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    shutil.rmtree(temp_dir, ignore_errors=True)
    if os.path.exists(abs_output):
        print(f'PDF saved: {abs_output} ({os.path.getsize(abs_output)/1024:.0f}KB)')
    else:
        print('ERROR: PDF not created'); sys.exit(1)

html_to_pdf(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
```

**Usage in skill flow:**
```bash
python3 /tmp/asyre-pdf-export.py presentation.html presentation.pdf
open presentation.pdf
```

**If `~/bin/html_to_pdf.py` exists** (Asher's local setup), use it directly instead of writing the inline script:
```bash
python3 ~/bin/html_to_pdf.py presentation.html presentation.pdf
```

**Fallback:** If Chrome is not found, inform the user and suggest installing Chrome or using `Cmd+P → Save as PDF` from the browser as manual fallback.

**Output:** PDF at same location as HTML, same filename with `.pdf` extension. Typical size: 500KB–2MB for 10-15 slides.

### 6B.1: PDF Export Pitfalls (踩坑记录)

Chrome headless renders the page as a static snapshot — no scroll events fire, no IntersectionObserver triggers, no JS-driven class toggling. This causes three recurring issues:

**Pitfall 1: Animation elements invisible in PDF**

The pattern `.slide:not(.visible) [class*="anim-"] { opacity: 0; }` hides all animated content by default, waiting for JS to add `.visible` on scroll. Chrome headless never scrolls, so text stays at `opacity: 0`.

**Fix (MANDATORY during Phase 3 generation):** Add `visible` class to every `.slide` element in the HTML by default:
```html
<!-- CORRECT — always include "visible" -->
<div class="slide slide--day visible" id="slide-4">
```
JS can still remove and re-add `.visible` for scroll-triggered animation in the browser. But the default state must be visible so PDF export captures all content.

**Pitfall 2: Background image covers text (z-index stacking)**

`.slide-bg` uses `position: absolute; z-index: 0;`. If `.slide-content` doesn't have explicit positioning, Chrome headless may render the background layer ON TOP of the content layer.

**Fix (MANDATORY during Phase 3 generation):** Always set `position: relative; z-index: 2;` on `.slide-content`:
```css
.slide-content {
    /* ... other styles ... */
    position: relative;
    z-index: 2;
}
```

**Pitfall 3: `@media print` rules alone are not enough**

Even with `@media print { [class*="anim-"] { opacity: 1 !important; } }`, some Chrome headless versions ignore print media queries when using `--print-to-pdf`. The `visible` class approach (Pitfall 1) is the reliable solution — it works regardless of whether print CSS is honored.

**Pitfall 4: Remote images fail in PDF export**

`html_to_pdf.py` copies HTML to a temp directory before calling Chrome headless. This breaks relative local paths (e.g. `eagle.jpg`). Remote URLs (Wikipedia etc.) also frequently fail — Chrome headless has a short network timeout and Wikipedia rate-limits (429 Too Many Requests) when loading 15+ images simultaneously.

**Fix (MANDATORY before PDF export):**
1. Download ALL images (backgrounds + content) to a local directory (e.g. `bg/`)
2. Reference them using absolute `file://` paths in the HTML:
   ```html
   <!-- CORRECT for PDF export -->
   <div class="slide-bg" style="background-image:url(file:///absolute/path/bg/01-cover.jpg);"></div>
   <img src="file:///absolute/path/bg/eagle.jpg">
   
   <!-- WRONG — will break in PDF -->
   <div class="slide-bg" style="background-image:url(https://upload.wikimedia.org/...);"></div>
   <img src="eagle.jpg">
   ```
3. Do this BEFORE calling `html_to_pdf.py`, not after discovering broken images

**When to keep remote URLs:** If the user only needs the HTML (no PDF export), remote URLs are fine for browser viewing. But the moment PDF export is requested, switch to local `file://` paths.

**Summary checklist for PDF-safe generation:**
- [ ] Every `.slide` has `visible` class in the HTML
- [ ] `.slide-content` has `position: relative; z-index: 2;`
- [ ] `@media print` CSS included as a backup (forces opacity, hides nav)
- [ ] Background images use `.slide-bg` with `z-index: 0`
- [ ] All images downloaded locally and referenced via absolute `file://` paths before PDF export
