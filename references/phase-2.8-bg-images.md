# Phase 2.8: AI Background Images

> 提取自 SKILL.md · 可选流程。Style 确认后（Phase 2 完成）触发。

## Phase 2.8: AI Background Images (Optional)

After style is confirmed (Phase 2), offer AI-generated background images per slide. This adds atmospheric depth that pure CSS cannot achieve — like the difference between a stage with lighting and a stage without.

### Step 2.8.0: Ask the User

**When running in Claude Code CLI**, use `AskUserQuestion`:

```
header: "Background Images"
question: "Want AI-generated background images for your slides?"
options:
  - label: "Every slide (recommended)"
    description: "Each slide gets a unique atmospheric background image"
  - label: "Key slides only"
    description: "Cover, section dividers, and closing slide"
  - label: "I'll provide my own images"
    description: "I have images ready to use as backgrounds"
  - label: "No images, pure CSS"
    description: "CSS-only backgrounds (fastest, zero image generation)"
```

If user picks "No images, pure CSS" -> skip to [Phase 3 (in SKILL.md)](../SKILL.md#phase-3-generate-presentation).
If user picks "I'll provide my own images" -> ask for image paths, proceed to Step 2.8.3.

### Step 2.8.1: Generate Image Prompts

For each slide that needs a background image, generate a short image prompt. The prompt should describe an **atmospheric, abstract background** — NOT a literal illustration of the slide content.

**When using Asyre Dark Gold style** (recommended), follow the proven style system from [ASYRE_BRAND_PRESET.md](ASYRE_BRAND_PRESET.md):

**Prompt template:**
```
Abstract dark background illustration: [slide topic as visual metaphor],
[golden/amber color direction].
Pure black background, very subtle and ethereal, low opacity feel.
Concept art, minimalist, suitable as a faded background image.
No text.
```

**Generation config:**
- Model: `gemini-3-pro-image-preview` (atmosphere quality, NOT flash)
- Aspect ratio: 16:9
- Quality: 2K

**Style rules (CRITICAL):**
- ALWAYS `pure black background`
- ALWAYS `amber and gold` color tone
- ALWAYS `concept art` / `ethereal` aesthetic
- Subject should be `semi-transparent` / `glowing edges` — designed to look good under overlay
- ALWAYS end with `No text, no watermarks`

**Anti-patterns (from Asyre IMAGE_PROMPTS):**
- NO `photorealistic` — use concept art
- NO `neon` / `cyan on dark` / `purple-to-blue gradient` — these are AI slop
- NO text rendered in image — all text goes in HTML
- NO dragons in every image (max 1-2 per deck if thematically appropriate)

**Real examples (from "Taming the Blade" presentation):**
- Power/danger → `a menacing chainsaw dissolving into golden energy particles, blade edge glowing amber`
- Perception → `a single human eye with golden iris, dissolving into amber light particles`
- Lost control → `golden chains shattering and dissolving into amber sparks`
- Self-reflection → `a cracked mirror floating in black void, reflecting amber and golden light`
- Trust → `a pair of hands slowly releasing a golden glowing leash`
- Long-term vision → `a single eternal golden flame burning steady in absolute darkness`

**For non-Asyre styles:** Adapt the prompt template to match the chosen style's color palette. Replace "amber and gold" with the style's accent colors. Keep the structure: `abstract metaphor + color direction + black/dark background + concept art + no text`.

**Key principles:**
- Each slide gets a DIFFERENT visual metaphor — never repeat the same concept
- Abstract > literal (don't illustrate the content, create atmosphere)
- The metaphor should resonate with the slide's emotional intent, not its literal topic
- Match the color direction from the chosen style preset
- If IMPECCABLE_CONTEXT is active, align image mood with `.impeccable.md` aesthetic direction

**Present the prompt list to the user for confirmation before generating.**

### Step 2.8.2: Generate Images

Use the `{{command_prefix}}image-gen` skill to generate background images:

1. Generate images sequentially (one at a time for quality control)
2. Parameters:
   - Aspect ratio: **16:9** (matches slide viewport)
   - Style: match the presentation's mood (dark atmospheric for dark themes, soft/light for light themes)
3. Save images to a `bg/` directory alongside the HTML file:
   ```
   presentation-name/
   ├── index.html
   └── bg/
       ├── 01-cover.jpg
       ├── 02-section-name.jpg
       ├── 03-section-name.jpg
       └── ...
   ```
4. Report progress: "Generated X/N backgrounds" (in user's language)
5. On failure: retry once, then fall back to CSS-only for that slide

**Alternative: Base64 inline** — If the user wants a single self-contained HTML file (no separate `bg/` directory), embed images as base64 data URIs. Warn that file size will be larger (~200KB-1MB per image).

### Step 2.8.3: Image Integration CSS

All background images use the same `.slide-bg` pattern (proven in the 亚马逊 AI 指南):

```css
/* Background image layer — sits behind all content */
.slide-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-size: cover;
    background-position: center;
    pointer-events: none;
    z-index: 0;
}

/* Content sits above background */
.slide-content {
    position: relative;
    z-index: 1;
}
```

**Opacity/overlay rules (from 踩坑记录):**

| Slide Type | Opacity | Overlay | Rationale |
|-----------|---------|---------|-----------|
| Cover/Title | `opacity: 0.25-0.35` | Dark overlay 70-75% | Image visible but doesn't compete with title text |
| Content (bullets, text) | `opacity: 0.08-0.12` | Optional 55-65% | Subtle atmosphere, text readability is priority |
| Section divider | `opacity: 0.20-0.30` | Dark overlay 65-70% | Stronger presence, fewer text elements |
| Stats/Numbers | `opacity: 0.08-0.10` | Dark overlay 60% | Numbers must be crystal clear |
| Quote slide | `opacity: 0.15-0.20` | Dark overlay 65% | Mood setting without distraction |
| Closing slide | `opacity: 0.25-0.35` | Dark overlay 70-75% | Emotional impact for the ending |
| Code slide | `opacity: 0.05` | Dark overlay 80% | Code readability is paramount |

**For light themes:** Instead of dark overlay, use a light overlay (`background: rgba(255,255,255,0.85)`) and keep image opacity low (`0.05-0.10`). The image becomes a barely perceptible texture.

**CRITICAL:** If text becomes hard to read over the background image, add `text-shadow` as compensation:
```css
.slide-content h1, .slide-content h2 {
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}
```

### Step 2.8.4: User-Provided Images

When user provides their own images:
1. **View each image** with the Read tool (multimodal)
2. **Evaluate**: suitable as slide background? Good resolution? Right mood?
3. **Map images to slides**: suggest which image goes with which slide
4. **Confirm mapping** with user before proceeding
5. Follow the same opacity/overlay rules from Step 2.8.3
