# Phase 5-6: Delivery, Share, and Export

> 提取自 SKILL.md · Phase 5 交付 · 6A deploy to URL · 6B PDF export (含 PDF 踩坑)。

> **多页 deck viewer** (多个 HTML 文件 · 需要 `index.html` 包装 · 键盘 + 手机 swipe 翻页 + 目录) → 见 [phase-5-multi-page-viewer.md](phase-5-multi-page-viewer.md)

## Phase 5: Delivery

1. **Clean up** — Delete `.claude-design/slide-previews/` if it exists
2. **Open** — Use `open [filename].html` to launch in browser
3. **"Made with Astra Presentation" watermark** — The last slide should include a small, subtle watermark line at the bottom:
   - Text: "Made with Astra Presentation"
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

**Approach**: WYSIWYG screenshot mode. Each slide is rendered in a pixel-exact Chrome viewport, captured as a PNG, then composed into a multi-page PDF with Pillow. The PDF matches the browser rendering byte-for-byte.

**Why not `--print-to-pdf`?** Chrome's `--print-to-pdf` triggers `@media print`, which reflows the layout (different `vw/vh` resolution, print-mode layout pass). The result rarely matches the browser. Screenshot mode bypasses print entirely — what you see in the browser is what lands in the PDF.

#### Two orientations

| Orientation | Viewport (px) | Use case |
|---|---|---|
| **Landscape 16:9** (default) | 1280 × 720 | Standard projector / desktop deck |
| **Portrait 9:16** (`--portrait`) | 720 × 1280 | Phone / WeChat / 小红书 / Discord mobile |

Both orientations run the **same code path** — only the viewport dimensions differ.

#### Quick usage

The bundled script lives at `scripts/html_to_pdf.py`:

```bash
# 16:9 landscape (default)
python3 scripts/html_to_pdf.py presentation.html

# 9:16 portrait
python3 scripts/html_to_pdf.py presentation.html --portrait

# Custom output path
python3 scripts/html_to_pdf.py presentation.html out/deck.pdf --portrait
```

**When to use `--portrait`:**
- HTML deck authored at 9:16 (e.g. `width: min(100vw, calc(100vh * 9 / 16))` on `.deck`)
- Target audience views on phone (WeChat / 小红书 / Discord mobile)
- Single-column vertical layout
- Otherwise: stick with default landscape

#### How the script works

1. Counts `.slide` elements via regex (matches `class="slide …"` exactly — not `slide-body` / `slide-meta`)
2. For each slide N: writes a temp HTML where only the Nth slide is `display: grid` and all others are `display: none`. Also injects a script that adds `visible` class to every slide so reveal animations resolve to their final state.
3. Calls Chrome headless with `--screenshot --window-size=W,H --virtual-time-budget=4000` to capture each isolated slide as PNG
4. Loads the PNGs with Pillow, calls `Image.save(..., save_all=True, append_images=...)` to compose a multi-page PDF at 144 DPI
5. Cleans up the temp directory

#### Requirements

- **Chrome / Chromium** at the macOS default path (or in `PATH` as `chromium` / `google-chrome`)
- **Pillow** (the script also imports `JpegImagePlugin` explicitly to register the JPEG codec used during PDF write):
  ```bash
  pip3 install Pillow
  ```

#### Output

- File at the same location as the input HTML, same name with `.pdf` extension (or the explicit second arg)
- Typical size: 200–800 KB for 9–11 slides
- Resolution: 144 DPI (sharp text on retina, prints fine at 6×4")

#### Fallback

If Chrome is not found, the script exits with a message suggesting `Cmd+P → Save as PDF` from the browser as a manual fallback.

### 6B.1: Pitfalls (still relevant in screenshot mode)

The screenshot approach eliminates most of the old print-to-PDF pitfalls (no `@media print` reflow, no `visible` class HTML requirement — the script injects it). Two considerations remain:

**Pitfall A: Background image z-index stacking**

If `.slide-bg` uses `position: absolute; z-index: 0;` and `.slide-content` has no explicit positioning, browsers can render the background ON TOP of content. This is a browser bug, not a PDF bug — but it shows up in PDF too (because PDF == screenshot of browser).

**Fix (MANDATORY in Phase 3 generation):** Always set `position: relative; z-index: 2;` on `.slide-content`:

```css
.slide-content {
    position: relative;
    z-index: 2;
}
```

**Pitfall B: Remote images may fail under headless network timeouts**

Chrome headless has a short network timeout. Loading 15+ remote images simultaneously can hit rate limits (e.g. Wikipedia 429) and result in missing images in the PDF.

**Fix:** Before PDF export, download all background and content images locally and reference them via absolute `file://` paths:

```html
<!-- CORRECT for PDF export -->
<div class="slide-bg" style="background-image:url(file:///absolute/path/bg/01-cover.jpg);"></div>
<img src="file:///absolute/path/bg/eagle.jpg">

<!-- WRONG — may fail intermittently -->
<div class="slide-bg" style="background-image:url(https://upload.wikimedia.org/...);"></div>
<img src="eagle.jpg">
```

For browser-only viewing (no PDF export), remote URLs are fine.

#### Summary checklist for screenshot-safe generation

- [ ] `.slide-content` has `position: relative; z-index: 2;` (background stacking)
- [ ] All images downloaded locally and referenced via absolute `file://` paths before PDF export
- [ ] HTML's own animations / reveals can stay as-is — the script injects `visible` class automatically

#### Note on the legacy `--print-to-pdf` approach

The earlier implementation injected `@media print` CSS and called `chrome --print-to-pdf`. It was deprecated because:
- Print-mode reflow produced layouts unlike the browser (vw/vh resolved to different values)
- 9:16 page sizes interacted badly with print viewport defaults
- @media print rules were sometimes silently ignored by some Chrome headless versions

The screenshot approach is now the single source of truth for both 16:9 and 9:16. If you find the old approach referenced in an external doc or comment, ignore it and use `scripts/html_to_pdf.py`.
