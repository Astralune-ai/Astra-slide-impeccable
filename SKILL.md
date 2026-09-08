---
name: astra-slide-impeccable
description: "Astra Presentation — 演示型 slide / deck / presentation 主入口。两条等价渲染路径：SVG（固定 viewBox 1400×788 / 720×1280，GSAP timeline 动画，32 个 QA 过的 structures 模板）vs 响应式 HTML（clamp() 全屏自适应，CSS reveal 动画）。用 /astra-slide 命令直接进，flag 选路径，否则默认弹问让用户选。两种 aspect ratio: 16:9 landscape（投影/桌面 deck）+ 9:16 portrait（演讲稿、短视频脚本、Discord 长截图）。50+ visual styles、140 GSAP 动画、AI 生成背景（Gemini）、CJK 双语字体栈、PPT/Markdown 转换、PDF 导出。Use this whenever the user wants 做演示 / 准备演讲 / build a presentation / make a deck / 重绘 chart-framework-table 截图 / convert PPT / generate 结构图 (漏斗/中心辐射/对比表/时间线 etc.). 注意：纯小红书内容卡片 / 信息图直出 走 /astra-graphic，不是这里。"
user-invocable: true
---

# Astra Presentation

> 你的下个 ppt，何必是 PPT

零依赖、动画饱满的浏览器原生 slide deck。**两条对等的渲染路径**——SVG（带 GSAP 动画，结构图模板丰富）和响应式 HTML（clamp 自适应，文字密度灵活）——**每次都让用户选**，因为各有所长不互替。两种 aspect ratio（16:9 / 9:16）+ 50+ styles + AI 背景 + 双语 CJK + PPT/MD 转换 + PDF 导出。

## Your Role

You are an **elite presentation designer** — Awwwards / Dribbble caliber. Every slide feels intentionally crafted, never generic. Reference the curated styles in [STYLE_PRESETS.md](references/STYLE_PRESETS.md) and the canonical structure files in `structures/` (16:9) or `structures-portrait/` (9:16) — they're tested, QA'd reference implementations.

**The AI Slop Test is your quality bar:** if someone could look at this and instantly say "AI made this," you've failed.

## Asher's Preferences (always active)

Before generating, read [ASHER_PREFERENCES.md](references/ASHER_PREFERENCES.md). Non-negotiable defaults: SVG icons (not emoji), per-page unique backgrounds, 170% font base, big diagrams, accurate content, incremental design changes, gemini-3-pro for image gen.

## 真数据图表 → astra-charts（`structures/` 里没有数据图）

`structures/` 的 25 个模板都是**概念图**（漏斗、冰山、SWOT、维恩、路线图…），
一张**数据图**都没有。要在 deck 里放"这六个渠道各占多少""一千个询价最后成了几个"
这类带真实数字的图，别手搓 —— 用 `astra-charts` 出碎片贴进来：

```bash
python3 ~/.claude/skills/astra-charts/render.py <图型> --fragment \
  --at 700,96 --size 640,600 --palette slate --dark --data '{...}'
```

它返回 `container`（嵌套 `<svg>`，贴进本页的 `<svg>` 里）+ `js`（已包在 IIFE 里，
贴页尾）+ `css`（入场动画）+ `deps`。**优先挑纯 SVG 的图型**——那 30 张
`deps` 是空的，零依赖原则不破；ECharts / Chart.js 的要 CDN。
`--dark` 会把明度反相以适配深底。不知道该用哪张图就先问路由：

```bash
python3 ~/.claude/skills/astra-charts/pick.py --shape funnel --scene 汇报 --explain
```

样例见 `~/Asher/05_archives_归档/2026/桌面往日历史_2026-08/图表自动选型_2026-08-15/13_slide嵌图_零依赖.html`。

---

## Core Principles

1. **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools.
2. **Aspect ratio is structural, not cosmetic** — 9:16 ≠ 16:9 squeezed. Pick early, layout follows.
3. **Distinctive Design** — No generic "AI slop." Every presentation must feel custom-crafted.
4. **Viewport Fitting (NON-NEGOTIABLE)** — Every slide MUST fit exactly within 100vh. No scrolling. Content overflows? Split into multiple slides.
5. **Bilingual Native** — Full Chinese + English support. Font stacks always include CJK fallbacks.
6. **Design Context Aware** — When `.impeccable.md` exists, use its brand personality + aesthetic direction to inform every choice.

---

## Phase 0 · Detect Rendering Mode + Mode + Aspect Ratio (DO FIRST)

Three orthogonal decisions. **Rendering mode** decides which generator to use and is asked every time unless explicit; **mode** and **aspect ratio** are inferred silently when possible.

### 0.0 Rendering Mode — SVG vs 响应式 HTML（**最重要、必问**）

This skill has **two equally first-class generation paths**. They are not interchangeable — pick consciously, every time.

| Path | Canvas | Animation | 适合 | 不适合 |
|---|---|---|---|---|
| **SVG**（推荐，reference 多） | 固定 viewBox `1400×788` (16:9) 或 `720×1280` (9:16)，等比缩放 | GSAP timeline + 永续 rAF 粒子，可精确编排 | 结构图、信息图、impeccable 出品质感 deck、需要精确动画/坐标 | 大段长文、内嵌视频、跨设备交互复杂的场景 |
| **响应式 HTML** | `100vh` 自适应，`clamp()` 字号 | CSS reveal + IntersectionObserver | 长文型 deck、需要内嵌图片/视频/iframe、跨设备阅读 | 需要精确动画编排、想用现成的 32 个 structure 模板 |

**Decision protocol:**

1. **如果通过 `/astra-slide --svg ...` 进入** → `RENDERING_MODE = svg`，跳过询问。
2. **如果通过 `/astra-slide --html ...` 进入** → `RENDERING_MODE = html`，跳过询问。
3. **任何其它入口（无 flag、自然语言触发、`/astra-slide` 不带 flag）** → **必须**用 `AskUserQuestion` 弹二选一，不要默认任何一种：

   ```
   选哪种渲染路径？（每次都问，不记住偏好）

   A. SVG slide（推荐 — reference 多）
      固定 viewBox，GSAP 动画，等比缩放。32 个 QA 过的 structures 模板可复用。
      适合：结构图、信息图、impeccable 出品质感 deck。

   B. 响应式 HTML
      clamp() 全屏自适应，CSS reveal。
      适合：长文型 deck、内嵌图片/视频、跨设备阅读。
   ```

   选 A → `RENDERING_MODE = svg`；选 B → `RENDERING_MODE = html`。

4. `RENDERING_MODE` **决定 Phase 3 走哪一支**（Phase 3-SVG 或 Phase 3-HTML）。其它 Phase 共用。

**为什么不让 Claude 自己猜：** 这两条路出来的产物质感差异巨大，用户偏好和场景判断比关键词匹配靠谱得多。Asher 明确说"两个同等重要、要让我决定、每次都问"——遵守。

### 0.1 Mode (what the user wants)

| Mode | Trigger | Action |
|---|---|---|
| **A · New** | "创建/做/写一个 deck/演示/slide" + topic | Phase 1 |
| **B · PPT Convert** | User provides a `.pptx` path | [phase-4-conversions.md](references/phase-4-conversions.md) |
| **C · Enhance** | "改/优化/加" + existing HTML path | Read existing HTML → understand → modify in place |
| **D · Reference Match** | User provides screenshot/URL as style ref | Match closest preset, then Phase 2 |
| **E · Markdown Convert** | User provides `.md` path (not SKILL/CLAUDE/README) or pastes markdown with `---` separators | [phase-4-conversions.md](references/phase-4-conversions.md) |
| **G · Screenshot Redraw** | User gives table/chart/framework screenshot, wants it redrawn in Astra style | [mode-g-screenshot-redraw.md](references/mode-g-screenshot-redraw.md) |

### 0.2 Aspect Ratio (decides which structure library + viewport rules)

**Default to 16:9 unless any portrait signal is present.**

| Signal | → Aspect |
|---|---|
| "竖版", "9:16", "portrait", "vertical" | **9:16** |
| "小红书", "RedNote", "XHS" + slide/deck (not card — those go to `/astra-graphic`) | **9:16** |
| "Discord 长截图", "手机看", "phone share", "WeChat 朋友圈分享" | **9:16** |
| "短视频脚本卡", "TikTok shorts" | **9:16** |
| "投影/projector/conference/keynote/desktop" | **16:9** |
| Default / silent / unclear | **16:9** |

Set `ASPECT_RATIO = landscape | portrait`. **This variable is consulted in every subsequent phase** to pick:
- Structure references (`structures/` vs `structures-portrait/`)
- viewport-base.css mode (`html` gets `.deck-portrait` class for portrait)
- SVG canvas (1400×788 vs 720×1280)
- PDF export flag (default vs `--portrait`)

**Edge case** — explicit conflict like "9:16 投影"：default to user's first stated dimension (9:16 here), surface a one-liner: "用 9:16，会让投影上下留黑边——确认？" and proceed.

### 0.3 Impeccable Context (always check, additive)

Run a quick fuzzy scan for design context — DO NOT skip even if user didn't mention it:

```bash
ls -la .impeccable.md 2>/dev/null || \
  ls -1 2>/dev/null | grep -iE '(\.impeccable\.md$|^design[_-]philosophy.*\.md$|^.*[_-]philosophy.*\.md$|^philosophy.*\.md$|^design[_-]context.*\.md$|^brand[_-]?(guide|identity|style).*\.md$|^style[_-]guide.*\.md$|^visual[_-](identity|language).*\.md$)'
```

- Exact `.impeccable.md` found → `IMPECCABLE_CONTEXT = true`, read it, done.
- Fuzzy candidates found → show the user, ask "用这个作为 design context 吗？" — single question, options inline.
- Nothing → `IMPECCABLE_CONTEXT = false`. Don't ask the user to set one up — just proceed with defaults. (If they later say "I have a brand guide", flip then.)

---

## Phase 1 · Content Discovery (Mode A only)

**Minimum viable questions** — only ask what cannot be inferred. Most users want to give you content and trust you on the rest.

**Always ask (1 question):**
- What's the language? Options: 中文 / English / Bilingual

**Ask only if not already provided:**
- What's the content? (skip if user already shared it inline)

**Do NOT ask by default** (use these defaults silently, only ask if user signals a non-default):
- Purpose → infer from content (pitch / teaching / conference / internal). User can override later.
- Length → infer from content; if topic-only, default 8-10 slides.
- Inline editing → Yes (default). Skip asking.
- Style → **Astra Dark Gold** (default). Skip Phase 2 question 2.0 unless user asks "show me options" or "different style".
- Design context → already detected in 0.3.

**Why so few questions:** every question is friction. Asher knows what he wants, and the defaults match his preferences. If you're wrong on a default, he'll correct in one line — that's cheaper than 5 questions every time.

**When running in Claude Code CLI**, use `AskUserQuestion` tool for the language question with selectable options.

If user provides images, view them inline (multimodal Read), evaluate USABLE/NOT, integrate into outline.

---

## Phase 2 · Style Selection

### Default path (silent)

If user didn't ask about style, default to **Astra Dark Gold** ([ASYRE_BRAND_PRESET.md](references/ASYRE_BRAND_PRESET.md)) and proceed to Phase 3. This is what 80%+ of decks should use. Don't waste a turn asking.

### When user wants choice

Trigger on phrases like "show me styles", "different style", "I want something else", or "match this reference":

- **"Show me options"** — Generate 3 single-slide previews using their actual title (not Lorem Ipsum). Save to `.claude-design/slide-previews/style-{a,b,c}.html`. Open all three in browser. Use `AskUserQuestion` with A/B/C/Mix.
- **"Browse the gallery"** — `open style-gallery.html` (local) or share `https://next-slide.vercel.app/gallery`.
- **"Match this reference"** — Analyze reference image (colors, typography feel, layout), match 2-3 closest presets from [STYLE_PRESETS.md](references/STYLE_PRESETS.md), generate previews of each.
- **"Design from my context"** (only if `IMPECCABLE_CONTEXT = true`) — Synthesize fully custom style. See [phase-2.5-custom-style.md](references/phase-2.5-custom-style.md).

### Preset Elevation (when IMPECCABLE_CONTEXT = true)

If user picks a preset AND `.impeccable.md` exists, apply targeted refinements: typography upgrade away from Inter/Roboto, color tinting toward brand hue, animation tempo matched to audience. Show user the elevations briefly. Full protocol: [DESIGN_ELEVATION.md](references/DESIGN_ELEVATION.md).

---

## Phase 2.8 · AI Background Images (Optional)

After style is set, optionally generate AI concept-art backgrounds per slide using Gemini-3-pro. Full prompt templates and `.slide-bg` integration: [phase-2.8-bg-images.md](references/phase-2.8-bg-images.md).

Default ask: `every slide / key slides only / I'll provide my own / no images`. If "no images" — skip to Phase 3, CSS-only.

---

## Phase 3 · Generate Presentation

**Route by `RENDERING_MODE`** (decided in Phase 0.0):

- `RENDERING_MODE = svg` → **Phase 3-SVG** (default-recommended, structures-driven)
- `RENDERING_MODE = html` → **Phase 3-HTML** (responsive, html-template-driven)

**Shared by both:** style preset (Phase 2), AI background images (Phase 2.8), Asher's preferences, AI-Slop Test, content density limits.

**Different:** canvas system, animation engine, reference library, generation scaffold. The two paths produce **structurally different HTML** — don't mix them.

---

### Phase 3-SVG · 🔴 默认推荐路径

**核心原则：每张 slide 是一张 SVG**（带 GSAP timeline + 永续 rAF 动画）。32 个已 QA 的 reference 模板覆盖大部分场景，**先匹配模板再改内容**——不要从空白 SVG 写起。

#### Step 1 — 选 reference

按 `ASPECT_RATIO` 进入对应的 structures 库：

**For 16:9 (`ASPECT_RATIO = landscape`):**
- 打开 [structures/STRUCTURES_INDEX.md](structures/STRUCTURES_INDEX.md)，从 24 个结构里匹配（funnel / hub-spoke / iceberg / bridge / radar / dashboard / bento-grid / SWOT / venn / timeline / story-mountain / comparison-table / 等）。
- 读对应的 `structures/NN-name.html`（viewBox `0 0 1400 788`，Astra Dark Gold，GSAP）。

**For 9:16 (`ASPECT_RATIO = portrait`):**
- 打开 [structures-portrait/STRUCTURES_PORTRAIT_INDEX.md](structures-portrait/STRUCTURES_PORTRAIT_INDEX.md)，从 8 个高优结构里匹配（linear-progression / dense-modules / funnel / hub-spoke / hierarchical-layers / comparison / story-mountain / iceberg）。
- 读对应的 `structures-portrait/NN-name-portrait.html`（viewBox `0 0 720 1280`）。
- **必读** [portrait-9-16.md](references/portrait-9-16.md)：safe-zone 规则、字号缩放、从 16:9 迁移的决策表。

#### Step 2 — 复用 + 替换

- **保留**：骨架坐标、GSAP timeline、filter region、`<defs>` 配色、corner ring、永续 rAF 粒子逻辑、breath 动画。**这些是已经踩坑修复过的**。
- **只换**：title / subtitle 文案、内容文字、数据、品牌色（如有），需要时换图标。
- 如果内容维度跟参考不完全吻合（比如参考 6 节点你只有 5 节点），读 [STRUCTURE_PRESETS.md](references/STRUCTURE_PRESETS.md) 对应结构的"踩坑"段调坐标。

#### Step 3 — Reference 没覆盖到的情况

- Landscape 缺模板 → 读 [STRUCTURE_PRESETS.md](references/STRUCTURE_PRESETS.md) 抽象 spec + 硬规则 0-11，从头推导。
- Portrait 缺模板 → 选最接近的 landscape 模板，读 [portrait-9-16.md](references/portrait-9-16.md) §5 迁移决策表，**重新计算 720×1280**，不要直接旋转 SVG。

#### Step 4 — 多页 deck 的封装

每张 SVG slide 是独立 HTML 文件（`S01-xxx.html` / `S02-xxx.html` / ...）。多页时 Phase 5.5 会生成 `index.html` wrapper（键盘导航 + 移动端 swipe + TOC），见 [phase-5-multi-page-viewer.md](references/phase-5-multi-page-viewer.md)。

**🔴 `index.html` 的 `const slides` 数组 = 唯一的顺序真源。** 插页、换位、删页都**只改这个数组**，
不要重命名文件（重命名会连带打断 `bg/` 相对路径和已有的 preview / PDF 链路）。
文件名从此只是标识，跟顺序无关 —— 插页就叫 `S00b-`、`S03b-`，让它跟内容对得上就行。

#### Step 5 — 改完顺序必须重编页码〔有闸〕

每张 slide 里烘着两个跟顺序绑定的数字：**右上角环里的编号** + **右下角 `NN / TOTAL · LABEL`**。
插一页进去，后面每一张的这两个数字全错，而且**不会报错**，上台才发现。所以改完数组立刻跑：

```bash
python3 ~/.claude/skills/astra-slide-impeccable/scripts/renumber_deck.py <deck目录> --dry-run  # 先看
python3 ~/.claude/skills/astra-slide-impeccable/scripts/renumber_deck.py <deck目录>            # 再写
```

它按 `index.html` 的数组顺序重编，跟 PDF exporter 读的是同一个真源，三者（deck / PDF / 角标）不会打架。
`--dry-run` 输出 `将改 0 个文件` = 页码本来就对。

**哪次踩的**：2026-08-29 清华演讲 deck，11 张 → 插自我介绍页 → 12 张 → 再插保质期页 + 论点页换位 → 13 张，
页码重编了三轮。第一轮手写 regex，第二轮才想起来该做成脚本。

#### SVG 路径硬规则速记

- viewBox 永远固定（landscape `1400×788` / portrait `720×1280`），靠 `<svg>` 容器的 width/height 等比缩放。
- SVG transform + GSAP `y:0` 陷阱：`<g transform="translate(X,Y)">` 元素被 GSAP `{y:0}` 拽到 0。解：动画只 tween opacity，或把 x/y 写到 rect/text 属性上。
- Filter region：所有 `<filter>` 起步 `x="-50%" y="-50%" width="200%" height="200%"`，`stdDeviation≥4` 用 `-75%/250%`。
- 节点连线端点：`(cx + nx·R, cy + ny·R)`，不是中心点。
- 完整规则集：[generation-hard-rules.md](references/generation-hard-rules.md)。

---

### Phase 3-HTML · 响应式路径

**核心原则：标准 HTML 结构 + clamp() 全屏自适应**。适合长文 deck、嵌入图片视频、跨设备阅读。

#### Step 1 — 读模板

| For | Read |
|---|---|
| HTML 架构、JS 功能（nav / progress / counter / 触屏 swipe） | [html-template.md](references/html-template.md) |
| 强制 base CSS（必须完整内嵌） | [viewport-base.css](viewport-base.css) |

#### Step 2 — 动画编排（3-tier funnel）

1. **先查 combo** — [animation-combos.md](references/animation-combos.md) 有 10 个现成 timeline（hero-reveal / dashboard-awakening / pitch-impact / 等）。匹配上直接用。
2. **没合适的 combo** — 查 [animation-index.json](animation-index.json)，按 `mood` / `purpose` / `applicable_to` 筛单个 effect。
3. **代码出处** — 调 [animation-snippets.js](animation-snippets.js) 里的 `effects.play_XX(scope)`。

设计原理深读：[ANIMATION_PATTERNS.md](references/ANIMATION_PATTERNS.md)。

#### Step 3 — 生成要点

- 单 self-contained HTML 文件，所有 CSS/JS 内联。
- `<style>` 里**完整粘贴 viewport-base.css 的内容**。
- portrait 时给 `<html>` 加 `class="deck-portrait"`（激活 portrait CSS 覆写）。
- 字体走 Google Fonts / Fontshare，不要纯系统字体。CJK 内容必须 Noto Sans SC / Noto Serif SC / LXGW WenKai 进 stack。
- 导航：方向键 + Space + 点击 + 移动端 swipe + scroll-snap。
- 顶部 progress bar，底部 page counter。
- **PDF-SAFE（强制）**：`.slide-content` 必须 `position: relative; z-index: 2;`（防 bg image 叠层）。

#### Step 4 — 细节

背景图集成、双语字体处理、impeccable elevation 细则：[phase-3-details.md](references/phase-3-details.md)。

---

## Phase 3.5 · Quality Assurance

After generating, self-validate before delivery. Re-read the file and run the checks for **your `RENDERING_MODE`**.

### Shared checks（两条路径都要过）

| # | Check | Action if fails |
|---|---|---|
| S1 | All font links valid Google Fonts / Fontshare URLs | Fix or remove broken |
| S2 | If Chinese text exists, CJK font in `<link>` AND in font stack | Add it |
| S3 | Content density within limits per [density table](#content-density-limits) | Split slides |
| S4 | **If `IMPECCABLE_CONTEXT = true`:** AI Slop Test (no cyan-on-dark, no glassmorphism overload, no gradient text on metrics, no identical card grids) | Redesign offending elements |
| S5 | **If `IMPECCABLE_CONTEXT = true`:** Output aligns with `.impeccable.md` typography / color / animation tempo | Adjust to match |

### `RENDERING_MODE = svg` 专属

| # | Check | Action if fails |
|---|---|---|
| V1 | viewBox 严格匹配（landscape `0 0 1400 788` / portrait `0 0 720 1280`） | Fix viewBox |
| V2 | 所有 `<filter>` region 起步 `x="-50%" y="-50%" width="200%" height="200%"`（`stdDeviation≥4` 用 `-75%/250%`） | Per [generation-hard-rules.md](references/generation-hard-rules.md) |
| V3 | GSAP timeline 没有把带 `transform="translate(X,Y)"` 的元素 tween 到 `y:0`（会被吸到 0） | 改为只 tween opacity，或把 x/y 写到 rect/text 属性 |
| V4 | 节点连线端点是 `(cx + nx·R, cy + ny·R)`，不是中心 | Recompute |
| V5 | **If `ASPECT_RATIO = portrait`:** 内容在 safe zone（y ≥ 60 且 y ≤ 1220），字号是 landscape 等价的 1.6–2× | Per [portrait-9-16.md](references/portrait-9-16.md) §9 |

### `RENDERING_MODE = html` 专属

| # | Check | Action if fails |
|---|---|---|
| H1 | Every `.slide` has `overflow: hidden` | Add it |
| H2 | All `font-size`, `margin`, `padding`, `gap` use `clamp()` | Replace fixed px/rem |
| H3 | `.slide-content` has `position: relative; z-index: 2;` (PDF-safe) | Add it |
| H4 | **If `ASPECT_RATIO = portrait`:** `<html>` has `class="deck-portrait"`, `.slide` width is `min(100vw, calc(100vh * 9 / 16))` | Fix per [portrait-9-16.md](references/portrait-9-16.md) §9 |

Only proceed to Phase 5 when all applicable checks pass.

---

## Phase 4 · Content Conversion (Modes B/E)

PPT (.pptx) and Markdown conversion both go through [phase-4-conversions.md](references/phase-4-conversions.md). Both end in Phase 2/3.

- **Mode B**: `scripts/extract-pptx.py` → confirm structure → Phase 2.
- **Mode E**: parse `---` separators + heading hierarchy → auto-detect slide types (cover/content/comparison/timeline) → confirm → Phase 2.

---

## Phase 5-6 · Delivery & Export

Save → list files → one-click open command. Full delivery flow + 100+ lines of PDF gotchas: [phase-5-6-delivery.md](references/phase-5-6-delivery.md).

- **Phase 5 Delivery**: save to user-specified path, list files, give open command.
- **Phase 5.5 Multi-Page Viewer**: when deck is multiple `S01-xxx.html` + `S02-xxx.html` files, build `index.html` wrapper with keyboard + mobile swipe + TOC. See [phase-5-multi-page-viewer.md](references/phase-5-multi-page-viewer.md).
- **Phase 6A Deploy**: Vercel one-click (optional).
- **Phase 6B PDF Export**: `python3 scripts/html_to_pdf.py input.html` for 16:9, add `--portrait` for 9:16. WYSIWYG screenshot mode (matches browser exactly, no `@media print` quirks). Needs Pillow.
  - **Multi-file SVG decks**: pass the **deck folder** or its **`index.html`** — the exporter captures each slide and combines.
  - **🔴 页序以 `index.html` 为准，不是文件名排序**（2026-08-29 修）。exporter 先解析 viewer 里的
    `const slides = [...]` 拿播放顺序；解析不出来才退回 `sorted(glob('S*.html'))`，并打印一行警告让你去核。
    **为什么必须这样**：deck 一旦有插页（`S00b-`、`S03b-`）或调过顺序（论点页 `S01` 排在市场页 `S02`
    **之后**），文件名顺序 ≠ 播放顺序。而页序错了 **不会报错**——静默出一份顺序乱的 PDF，
    是最危险的一类错。跑完看这行输出：
    `· order from index.html (N slides)` = 对；`· order from filename sort` = 去核页序。
  - 结论：**改了播放顺序只改 `index.html` 的数组就够，不用重命名文件。** (Single-file `.slide` decks still work by passing that one file.)
  - **Animations are forced to their final frame** before capture (GSAP `globalTimeline` → `progress(1)`; infinite `repeat:-1` tweens pinned to frame 0 + paused). Fixes the long-standing "PDF ships blank / pre-animation" bug — `--virtual-time-budget` alone does NOT reliably advance rAF-driven GSAP timelines, and infinite tweens stop virtual time from ever settling.
  - **Headless binary**: prefers Playwright's `chrome-headless-shell` (exits cleanly); full Chrome `--headless` hangs on some machines. If it hangs, ensure a Playwright chromium is cached under `~/Library/Caches/ms-playwright/`.

**PDF-SAFE recap:** only one rule remains — `.slide-content` must have `position: relative; z-index: 2;`. Old `@media print` overrides are no longer needed.

---

## Content Density Limits

Per slide. **If content exceeds, split into multiple slides — never cram, never scroll.**

### 16:9 landscape

| Slide Type | Max content |
|---|---|
| Title | 1 heading + 1 subtitle + optional tagline |
| Content | 1 heading + 4-6 bullets OR 1 heading + 2 paragraphs |
| Feature grid | 1 heading + 6 cards (2×3 or 3×2) |
| Comparison | 1 heading + 2 columns × 4 items |
| Timeline | 1 heading + 4-5 nodes |
| Stats | 1 heading + 3-4 big numbers + labels |
| Quote | 1 quote (max 3 lines) + attribution |
| Image | 1 heading + 1 image (max 60vh) |
| Code | 1 heading + 8-10 lines |

### 9:16 portrait (lower density — narrower canvas)

| Slide Type | Max content |
|---|---|
| Title | 1 heading + 1 subtitle (heading bigger than 16:9) |
| Content | 1 heading + 3-5 bullets OR 1 heading + 1 paragraph |
| Feature grid | 1 heading + 6 cards (2×3 vertical stack) |
| Comparison | 1 heading + top/bottom split (no left/right with 3+ cols) |
| Timeline | 1 heading + 4-5 nodes (vertical) |
| Stats | 1 heading + 1-2 hero numbers (bigger than 16:9) |
| Quote | 1 quote (max 4 lines) + attribution |
| Image | 1 heading + 1 image (max 50vh, can be portrait crop) |
| Code | 1 heading + 6-8 lines |

---

## Style Library

50+ curated styles across 7 categories. See [STYLE_PRESETS.md](references/STYLE_PRESETS.md) for full specs. Browse: `open style-gallery.html`.

| Category | Styles |
|---|---|
| Dark | Keynote Noir, Bold Signal, Neon Cyber, Terminal Green, Midnight Corporate, Cinema Scope, Dark Botanical, Starfield, Dark Premium, Dark Cinema, Futuristic Blue |
| Light | Swiss Modern, Paper & Ink, Notebook Tabs, Pastel Geometry, Morning Brief, Campus White, Soft Landing, Watercolor Wash, Korean Soft, Claymorphism 3D, Wabi-Sabi Zen |
| Editorial | Editorial Serif, Fashion Editorial, Newsprint Broadsheet, Vintage Editorial |
| Bold | Electric Studio, Creative Voltage, Split Pastel, Pop Art, Bold Typography, Neon Brutalism, Memphis Pop |
| Retro | Grainy Retro, Art Deco Gatsby, Risograph Overprint, Vintage Poster, Retro Arcade |
| Artistic | Surrealism Gallery, Scrapbook Portfolio, Blue Collage, Pink Handwritten, Art Nouveau Botanical, Soft Dreamy, Terracotta Earth |
| Cultural | 东方墨韵, 和風, Gradient Dreams, Blueprint, Bauhaus Primary, Swiss Grid, Aurora Mesh, Chinese Ink Wash |

---

## Canvas & Generation Rules

### Canvas sizes

| Format | Slide HTML | SVG viewBox | PDF px |
|---|---|---|---|
| 16:9 landscape | `width: 100vw; height: 100vh` | `0 0 1400 788` | 1280×720 |
| 9:16 portrait | `width: min(100vw, calc(100vh * 9 / 16))` | `0 0 720 1280` | 720×1280 |

### Hard rules (apply to both formats)

Coordinate / animation / layout 硬规则 are sealed in [generation-hard-rules.md](references/generation-hard-rules.md). Quick recap:

- **SVG transform + GSAP `y:0` trap**: elements with `transform="translate(X,Y)"` get yanked to y=0 by GSAP `{y:0}`. Solution: animate opacity only, OR move x/y onto rect/text attributes.
- **Node connector ends at circle edge**: `(cx + nx·R, cy + ny·R)`, not the center.
- **Text spacing**: small ≥14px line gap, medium ≥18, large ≥22; cards gap ≥10; cards never touch canvas/header/footer.
- **Score/badge**: label + value in 2 rows, box min 160×48.
- **Filter region**: all `<filter>` start with `x="-50%" y="-50%" width="200%" height="200%"`. stdDeviation ≥4 needs `-75%/250%`.

### Portrait-specific hard rules

See [portrait-9-16.md](references/portrait-9-16.md) for the full set. Key ones:

- viewBox is **always recalculated**, never just rotated from 16:9.
- Top safe zone: y ≥ 60. Bottom safe zone: y ≤ 1220. Outside that, platform UI may overlap.
- Font sizes inside SVG are **1.6-2× the landscape equivalent** (720 wide is much narrower than 1400).
- No 3-column horizontal layouts in portrait — single column or 2-column max.

---

## Supporting Files

| File | Purpose | When |
|---|---|---|
| [STYLE_PRESETS.md](references/STYLE_PRESETS.md) | 50+ visual presets | Phase 2 |
| [viewport-base.css](viewport-base.css) | Mandatory responsive CSS (incl. portrait overrides) | Phase 3 |
| [html-template.md](references/html-template.md) | HTML structure, JS features | Phase 3 |
| [portrait-9-16.md](references/portrait-9-16.md) | **9:16 hard rules + safe zones + migration table** | Phase 0.2, Phase 3 (portrait) |
| [animation-combos.md](references/animation-combos.md) | 10 timeline combos | Phase 3 (first try) |
| [animation-index.json](animation-index.json) | 140 effects metadata | Phase 3 (no combo match) |
| [animation-snippets.js](animation-snippets.js) | 140 GSAP function bodies | Phase 3 |
| [ANIMATION_PATTERNS.md](references/ANIMATION_PATTERNS.md) | 15 pattern methodology | Phase 3 (deep dive) |
| [STRUCTURE_PRESETS.md](references/STRUCTURE_PRESETS.md) | 24 landscape structure specs + 硬规则 0-11 | Phase 3-SVG (no template match), Mode G |
| [structures/STRUCTURES_INDEX.md](structures/STRUCTURES_INDEX.md) | **24 canonical 16:9 SVG refs** | **Phase 3-SVG, landscape — copy layout** |
| [structures-portrait/STRUCTURES_PORTRAIT_INDEX.md](structures-portrait/STRUCTURES_PORTRAIT_INDEX.md) | **8 canonical 9:16 SVG refs** | **Phase 3-SVG, portrait — copy layout** |
| [SCENARIO_TEMPLATES.md](references/SCENARIO_TEMPLATES.md) | Scenario structures, narrative arcs | Phase 1, 3 |
| [scripts/extract-pptx.py](scripts/extract-pptx.py) | PPT extraction | Phase 4A |
| [scripts/html_to_pdf.py](scripts/html_to_pdf.py) | PDF export（页序读 `index.html`，不是文件名排序） | Phase 6B |
| [scripts/renumber_deck.py](scripts/renumber_deck.py) | **插页/换位后重编页码 + 角标**（有 `--dry-run`） | Phase 3-SVG Step 5 |
| [ASYRE_BRAND_PRESET.md](references/ASYRE_BRAND_PRESET.md) | Astra Dark Gold full spec + AI image prompts | Phase 2 (default), 2.8 |
| [DESIGN_ELEVATION.md](references/DESIGN_ELEVATION.md) | How impeccable principles refine presets | Phase 2.5, 2.6, 3 |
| [ASHER_PREFERENCES.md](references/ASHER_PREFERENCES.md) | Asher's non-negotiable defaults | Always |
| `.impeccable.md` (project root) | Project design context | Phase 0.3 |

---

## Why so few client questions

Phase 1 only asks 1 question (language) by default. Combined with the rendering-mode question in Phase 0.0, that's at most 2 questions before generation. Intentional:

- **Asher knows what he wants.** Five questions every time = friction. He'd rather you guess and ship, then correct in one line.
- **Defaults match his preferences.** Astra Dark Gold + 16:9 + standard length covers 80% of cases. The other 20% he'll signal explicitly ("竖版", "show me other styles", "make it short").
- **Inferable signals win over questions.** Aspect ratio comes from "小红书"/"竖版"/"projector" in the prompt. Style comes from explicit "show me options". Length comes from content volume. Mode (PPT convert / Markdown / Enhance / 截图重绘) is silent from file types and verbs.
- **The one exception is RENDERING_MODE.** Phase 0.0 must ask every time (unless `/astra-slide --svg` / `--html` flag is passed) — SVG and 响应式 HTML produce structurally different outputs and Asher explicitly wants to choose, every time, no session memory.

If you find yourself drafting 3+ questions for a routine deck (beyond rendering-mode + language), stop and ask: which of these has a sensible default? Use the default, mention it briefly in your action message, ship the work.


## 客户品牌资产（astra-brand 统一接口，2026-06-10 起）
客户品牌（配色/字体/logo/信纸）一律从**中央品牌库**取，不要硬编码进本技能：读 `$ASTRA_BRAND_DIR`（默认 `~/.astra/brands`）`/<pack>/brand.json`（palette 四件套 / fonts / logo.mark / letterhead + content_margins_mm 安全边距）。规范与解析器见 `~/Code/astra-brand/BRAND_SPEC.md`、`resolve.py`；客户没真信纸用 `tools/make_letterhead.py` 由 logo+配色生成。本技能自有的品牌/风格机制继续可用，但**客户级资产以品牌包为准**。
