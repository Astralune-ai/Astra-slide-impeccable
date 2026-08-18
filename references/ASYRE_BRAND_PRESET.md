# Asyre Brand Preset — Dark Gold

> The signature Asyre visual identity. Forged from real presentations. Dark, authoritative, amber-lit.

This is the **default recommended style** for Asyre Presentation. When users don't have a strong preference, suggest this style.

---

## Vibe

Cinematic, authoritative, contemplative — like a keynote in a dark theater with golden stage lighting. Every slide feels like a frame from a concept art film.

## Typography

- **Display (Chinese):** `'Noto Serif SC'` (700/900) — editorial authority, pairs with the dark atmosphere
- **Display (English):** `'Instrument Serif'` italic for accent, `'Space Grotesk'` (600/700) for headlines
- **Body:** `'Noto Sans SC'` (300/400/500) for Chinese, `'Space Grotesk'` (300/400) for English
- **Monospace:** `'JetBrains Mono'` for code or data

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

## Colors

```css
:root {
    /* === Asyre Dark Gold Palette === */
    --bg-primary: #0a0a0b;
    --bg-secondary: #111113;
    --bg-tertiary: #18181b;
    --text-primary: #e8e4df;
    --text-secondary: #8a857e;
    --text-muted: #4a4640;
    --accent: #c4a35a;
    --accent-secondary: #d4b96a;
    --accent-glow: rgba(196, 163, 90, 0.25);
    --accent-danger: #b33a3a;
    --accent-success: #3daa5a;
    --accent-info: #4a8fd4;
    --border-subtle: rgba(196, 163, 90, 0.08);
    --surface: rgba(255, 255, 255, 0.03);

    /* === Typography === */
    --font-display: 'Noto Serif SC', 'Instrument Serif', serif;
    --font-body: 'Noto Sans SC', 'Space Grotesk', sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
    --font-display-en: 'Space Grotesk', 'Inter', sans-serif;

    /* === Sizing — ALL clamp() === */
    --title-size: clamp(2.5rem, 5.5vw, 5rem);
    --h2-size: clamp(1.5rem, 3.5vw, 2.8rem);
    --h3-size: clamp(1.1rem, 2.5vw, 1.8rem);
    --subtitle-size: clamp(0.9rem, 2vw, 1.5rem);
    --body-size: clamp(0.8rem, 1.5vw, 1.15rem);
    --small-size: clamp(0.7rem, 1vw, 0.9rem);
    --stat-size: clamp(2.5rem, 8vw, 6rem);

    /* === Spacing === */
    --slide-padding: clamp(3rem, 8vw, 6rem) clamp(3rem, 8vw, 8rem);
    --content-gap: clamp(1.2rem, 2.5vw, 2.5rem);
    --element-gap: clamp(0.3rem, 1vw, 1rem);

    /* === Animation === */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --duration-normal: 0.5s;
    --duration-slow: 0.8s;
}
```

## Signature Elements

- **Golden accent line** (`blade-line`): A thin amber horizontal rule used as a visual separator
  ```css
  .blade-line {
      width: min(120px, 15vw);
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }
  ```

- **Section numbers**: Large, dimmed serif numbers (`--text-muted` at 12% opacity) positioned top-right of content slides, using `--font-display` at `clamp(4rem, 8vw, 7rem)`

- **Title highlight**: Key words in `--accent` color with subtle golden text-shadow
  ```css
  .highlight {
      color: var(--accent);
      text-shadow: 0 0 40px var(--accent-glow);
  }
  ```

- **Cover label tags**: Small uppercase tracking labels above sections
  ```css
  .cover-label {
      font-size: var(--small-size);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--accent);
      font-weight: 500;
  }
  ```

- **Slide transition**: Horizontal push with expo easing (translateX 40px), NOT vertical scroll
  ```css
  .slide {
      transform: translateX(40px);
      transition: opacity 0.5s var(--ease-out-expo),
                  transform 0.5s var(--ease-out-expo);
  }
  .slide.active { transform: translateX(0); }
  .slide.exit-left { transform: translateX(-40px); }
  ```

- **Content alignment**: Left-aligned text (NOT centered), asymmetric layout, generous left padding

- **Chinese text**: Letter-spacing `0.05-0.1em`, line-height `1.8-2.0`

## Background Image Integration

This style is DESIGNED for per-slide AI background images. Without them it still works (pure `--bg-primary` darkness), but with them the impact is dramatically higher.

**Image placement:**
```css
.slide-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    z-index: 0;
}
.slide-bg-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 11, 0.72);
    z-index: 0;
}
.slide-content {
    position: relative;
    z-index: 1;
}
```

**Opacity by slide type (Asyre-specific, tuned from real presentations):**

| Slide Type | Image Style | Overlay |
|-----------|------------|---------|
| Cover | Full hero image, centered composition | 72% dark overlay |
| Content | Abstract metaphor, positioned left/right | 75-80% dark overlay |
| Stats/Data | Subtle texture only | 85% dark overlay |
| Quote | Atmospheric, centered | 70% dark overlay |
| Closing | Echo of cover image | 72% dark overlay |

## When to Use

- Client presentations that need gravitas
- Keynote speeches and conference talks
- Strategy decks and thought leadership
- Any presentation where the audience should feel "this person means business"
- Chinese-language or bilingual presentations (the font stack is optimized for CJK)

## When NOT to Use

- Light/friendly contexts (teaching, workshops for beginners)
- Colorful product launches (use Bold & Creative category instead)
- Casual internal presentations

---

## AI Background Image Style (Gemini)

When generating background images for this preset, use this exact style system from `IMAGE_PROMPTS.md`:

### Prompt Template

```
Abstract dark background illustration: [slide topic as visual metaphor],
[golden/amber color direction].
Pure black background, very subtle and ethereal, low opacity feel.
Concept art, minimalist, suitable as a faded background image.
No text.
```

### Style Rules

| Rule | Value |
|------|-------|
| **Model** | `gemini-3-pro-image-preview` (atmosphere quality) |
| **Aspect ratio** | 16:9 |
| **Quality** | 2K |
| **Background** | Always `pure black background` |
| **Color tone** | Always `amber and gold` |
| **Style** | Always `concept art` / `ethereal` |
| **Subject rendering** | `semi-transparent` / `glowing edges` |
| **Text** | Always `No text, no watermarks` |

### Anti-patterns (from IMAGE_PROMPTS.md)

- NO `photorealistic` (unless explicitly requested)
- NO `neon` / `cyan on dark` / `purple-to-blue gradient` (AI slop)
- NO text rendered in the image (text goes in HTML, not in images)
- NO dragons in every image (max 1-2 per deck if thematically appropriate)

### Example Prompts (from real "Taming the Blade" presentation)

| Slide Topic | Visual Metaphor | Prompt |
|------------|----------------|--------|
| Raw power | Chainsaw | `a menacing chainsaw dissolving into golden energy particles, blade edge glowing amber` |
| Perception | Eye | `a single human eye with golden iris, dissolving into amber light particles` |
| Lost control | Chains breaking | `golden chains shattering and dissolving into amber sparks` |
| System structure | Wireframe tree | `a geometric tree structure made of golden wireframe lines and nodes` |
| Self-reflection | Cracked mirror | `a cracked mirror floating in black void, reflecting amber and golden light` |
| Memory layers | Translucent layers | `three translucent golden layers floating in black void, representing memory layers` |
| Trust | Releasing leash | `a pair of hands slowly releasing a golden glowing leash` |
| External brain | Brain + files | `a glowing golden brain with neural pathways extending into geometric file folder structures` |
| Long-term vision | Eternal flame | `a single eternal golden flame burning steady in absolute darkness` |

Each prompt follows the template: **abstract metaphor + amber/gold + pure black + concept art + no text**.
