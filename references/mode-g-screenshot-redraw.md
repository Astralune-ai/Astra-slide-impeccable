# Mode G · Screenshot Redraw (截图重绘)

> 提取自 SKILL.md · 用户贴一张表格/框架/图表的截图，要求在 Asyre 视觉系统里重绘成 SVG 嵌到 slide 里。

### Mode G: Screenshot Redraw (截图重绘)

**Auto-detect when:**
- User provides a screenshot/image of a table, framework, chart, or diagram (not a style reference — that's Mode D)
- User says "把这个表格嵌进去", "重绘这个", "recreate this in our style", etc.

**Workflow:**

1. **Read the screenshot** — Use the Read tool (multimodal) to view the image
2. **Identify structure** — Match to one of the 24 structures in [STRUCTURE_PRESETS.md](STRUCTURE_PRESETS.md). Analyze and extract:
   - Type: bento-grid / funnel / hub-spoke / iceberg / bridge / radar-chart / comparison-matrix / etc.
   - Rows, columns, cells, labels, groupings
   - Color semantics (what do the colors mean? headers vs data vs highlights)
   - Directional relationships (arrows, flow, hierarchy)
   - Source attribution (if visible: "Strategyzer", "Porter's Five Forces", etc.)
3. **Confirm with user** — Present what you identified:
   - "I see a 4×3 comparison table with headers: [X, Y, Z]. Redraw in Asyre Dark Gold SVG?"
   - Flag anything ambiguous or hard to read
4. **Redraw as SVG** — Recreate using the presentation's visual system:
   - Use the active style's CSS variables (colors, fonts) — default: Asyre Dark Gold
   - SVG `<text>` minimum 12px per ASHER_PREFERENCES
   - Map original color semantics to our palette:
     - Blue/primary → `var(--accent-info)` / `#5dade2`
     - Green/positive → `var(--accent-success)` / `#3daa5a`
     - Red/negative → `var(--accent-danger)` / `#e74c3c`
     - Gold/highlight → `var(--accent)` / `#c4a35a`
     - Purple/secondary → `#bb8fce`
     - Teal/tertiary → `#45b7a0`
   - Backgrounds: `var(--surface)` / `rgba(255,255,255,0.03)` for cells
   - Borders: `var(--border-subtle)` / `rgba(196,163,90,0.08)`
   - Text: hardcoded light colors in SVG (`fill="#f0ece7"` primary, `fill="#c4bdb4"` secondary, `fill="#9a928a"` muted)
   - ViewBox: 960×540 (16:9) default, adjust height to fit content
   - Include source attribution at bottom if original had one
5. **Embed into slide** — Either:
   - Insert into existing presentation (Mode C enhancement) at the specified slide position
   - Output as standalone slide HTML for manual integration
6. **Content density check** — If the table is too dense for one slide, suggest splitting:
   - Large tables (>6 rows): split into multiple slides or paginate
   - Complex frameworks: separate into overview + detail slides

**SVG redraw patterns** (proven in this skill's existing slides):
- **Table/Matrix**: `<rect>` cells + `<text>` labels, colored header row with accent border-top
- **Framework** (VPC, Empathy Map, etc.): geometric shapes + positioned text blocks, connecting lines
- **Flowchart**: rounded rects + SVG `<path>` arrows with `marker-end`
- **Comparison**: side-by-side columns with different accent colors
- **Hierarchy**: nested rects or concentric circles (like TAM/SAM/SOM)

