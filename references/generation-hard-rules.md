# Generation Hard Rules

> 生成 HTML 前必读。这些规则是从反复踩坑里提炼出来的——每一条都标注了它防的是什么 bug，什么案例踩过。
> 不是凭空想的规矩，是 v2-impeccable 批 1-4（共 25 个结构图）调试过程中沉淀下来的肌肉记忆。
> 读完还是怕忘？去 `structures/STRUCTURES_INDEX.md` 里找对应的参考实现照抄——所有规则都已经固化在那 25 个文件里。

## Canvas Size Standard (PDF-Ready)

**为 print 而设计。** 每个 HTML 输出都用固定 canvas 尺寸，让 PDF 导出 pixel-perfect 无缝。

| Type | ViewBox | Ratio | When |
|------|---------|-------|------|
| **Slide** | `viewBox="0 0 1400 788"` | 16:9 | 演示幻灯片 (Phase 3) |
| **Infographic** | `viewBox="0 0 1400 {H}"` | 16:N | 单页密集图 (Mode G) |

### 规则

1. **Width 始终 1400**。永远不改宽度。这是标准单位。
2. **Slide 高度始终 788**。(1400 ÷ 16 × 9 = 787.5 → 788)。所有 slide 内容必须装在这个框里。
3. **Infographic height = 内容最下 y + 20px**。所有元素放完后，viewBox 高度 = `(最低 y) + 20`。底部不留死空间。
4. **外层 frame rect** 匹配 viewBox：`<rect x="8" y="8" width="{W-16}" height="{H-16}" .../>`（4 边各 8px 内缩）。
5. **背景 rect** 完全匹配 viewBox：`<rect width="{W}" height="{H}" .../>`。
6. **PDF 导出读 viewBox 自动匹配** — `html_to_pdf.py` 提取 viewBox 尺寸并设 `@page`，不用手工配置。

### 应用

**生成 SVG 内容时：**
```
1. 放完所有元素
2. 找到最低 y 坐标（footer text 或最后一个 card 底边）
3. 设 viewBox 高度 = 最低 y + 20
4. 同步更新背景 rect 和外框
5. 完成 — PDF 会自动完美贴合
```

---

## Animation & Visualization Libraries

**不要重造轮子。** 通过 CDN 用久经考验的库做动画和数据可视化。全是单 `<script>` 标签——和我们"zero-dependency 单 HTML 文件"哲学兼容。

### 工具箱

| 库 | CDN Tag | Size | 用于 |
|---|---|---|---|
| **GSAP** | `<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>` | ~30KB | SVG 动画、stagger、timeline、scroll triggers |
| **GSAP ScrollTrigger** | `<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>` | ~12KB | 滚动动画（单页信息图）|
| **GSAP DrawSVG** | `<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/DrawSVGPlugin.min.js"></script>` | ~3KB | SVG path/rect/circle 线条绘制效果 |
| **GSAP MotionPath** | `<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/MotionPathPlugin.min.js"></script>` | ~5KB | 沿 SVG 路径动画（数据流粒子）|
| **GSAP MorphSVG** | `<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/MorphSVGPlugin.min.js"></script>` | ~8KB | SVG 形状互变 |
| **GSAP TextPlugin** | `<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js"></script>` | ~2KB | 数字 counter / odometer |
| **Anime.js** | `<script src="https://cdn.jsdelivr.net/npm/animejs@3/lib/anime.min.js"></script>` | ~17KB | GSAP 轻量替代 |
| **D3.js** (full) | `<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>` | ~90KB | 数据驱动图表、力导图、scales |
| **D3 micro** | `<script src="https://cdn.jsdelivr.net/npm/d3-shape@3"></script>` + `d3-scale` | ~15KB | 只要数学部分 |
| **ECharts** | `<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>` | ~300KB | 丰富交互图表：radar、sankey、heatmap、treemap |
| **Chart.js** | `<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>` | ~70KB | 简单图表：bar、line、pie |

### 推荐组合

| 场景 | 组合 | 理由 |
|---|---|---|
| **演示幻灯片**（默认）| 仅 GSAP | 卡片 stagger、幻灯片切换、path 动画。轻量 |
| **密集信息图**（Mode G）| GSAP + D3-micro | GSAP 管 stagger/timeline，D3-scale 做 proportional bar |
| **交互仪表盘** | GSAP + ECharts | ECharts 做丰富交互图表，GSAP 做页面级编排 |
| **极简/快速** | 仅 Anime.js | 最小体积 |

### GSAP 集成模板（推荐默认）

生成 HTML 时，在 `</body>` 前加 script 并用这个模板：

```html
<!-- </body> 前 -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script>
gsap.registerPlugin();

// 时间线协调入场
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

// Header 打字机效果
tl.from(".header-title", { clipPath: "inset(0 100% 0 0)", duration: 1 });

// Cards stagger 入场
tl.from(".card", {
  y: 20, opacity: 0, duration: 0.5,
  stagger: { amount: 1.2, from: "start" }
}, "-=0.5");

// Bar charts 长出来
tl.from(".bar-fill", {
  scaleX: 0, transformOrigin: "left center", duration: 0.6,
  stagger: 0.1
}, "-=0.8");

// 连线 draw on
tl.from(".conn-line", {
  strokeDashoffset: 100, duration: 0.8,
  stagger: 0.15
}, "-=0.5");

// 高亮 card 脉冲（循环）
gsap.to(".highlight-card", {
  boxShadow: "0 0 15px rgba(196,163,90,0.3)",
  repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut"
});

// 扫描线（循环）
gsap.to(".scan-line", {
  y: "100%", duration: 4, repeat: -1, ease: "none"
});
</script>
```

### ECharts 集成模板（交互图表）

slide 或信息图需要丰富图表（radar / sankey / treemap）时：

```html
<div id="chart1" style="width:100%;height:300px"></div>
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
<script>
const chart = echarts.init(document.getElementById('chart1'), 'dark');
chart.setOption({
  backgroundColor: 'transparent',
  color: ['#5dade2','#c4a35a','#45b7a0','#f4845f','#bb8fce'],
  // ... chart config
});
window.addEventListener('resize', () => chart.resize());
</script>
```

**深色主题集成：** 始终用 `echarts.init(el, 'dark')` + `backgroundColor: 'transparent'`，和 Asyre Dark Gold 融合。

### 什么场景用什么

- **演示幻灯片（Phase 3）：** 默认 GSAP 做切换和入场。若用户选 "No animations" 则跳过。
- **Mode G 截图重绘：** GSAP 做重绘图的入场动画。Bar charts 用 `scaleX` 长出来。
- **密集信息图：** GSAP timeline 协调 stagger + scan line。D3-scale 做 proportional bar widths。
- **交互数据 slide：** ECharts 做 radar/sankey/treemap；Chart.js 做简单 bar/pie/line。

---

## 动画自动选取规则

**生成任何 HTML 时，必须自动为内容匹配合适的动画效果。** 单一 fade in 不够——用内容结构选动画。

动画子系统分三层——按顺序走这三个入口，选到一层能用就停。

### 入口 A · 场景匹配 → 查 combo（最快、推荐）

先查 [animation-combos.md](animation-combos.md) 里的 10 个现成 combo。能对上就直接拿完整的 **timeline + 持续层推荐**，不用自己编排。

| 场景 | combo_id | 结构对应 |
|---|---|---|
| 主标题亮相 | `hero-reveal` | hero-title / cover |
| 仪表盘/KPI 唤醒 | `dashboard-awakening` | bento-grid / dashboard |
| 数据墙（纯 KPI）| `stats-wall` | kpi-wall / metrics-grid |
| 路线图/时间线 | `roadmap-walkthrough` | timeline / roadmap |
| 投资 pitch 冲击 | `pitch-impact` | pitch-deck / traction |
| 客户证言 | `testimonial-elegance` | testimonial / quote-block |
| 技术/CLI 演示 | `tech-demo` | code-demo / devtool-deck |
| 年终/发布庆祝 | `celebration` | year-end / launch-moment |
| 单点焦点强调 | `focus-emphasis` | single-point / hub-center |
| 演讲背景 | `ambient-talk` | talk-cover / section-divider |

### 入口 B · 没匹配的 combo → 查 metadata 索引

场景不在 combo 表里时，用 [animation-index.json](../animation-index.json) 按条件筛单个 effect。每个 effect 有 13 个字段：`id / name / name_zh / section / purpose / mood / speed / complexity / plugins / loop / performance / applicable_to / pattern_family`。

```bash
# 例 1：找 mood=elegant + loop=perpetual 的背景效果
jq '.effects[] | select((.mood | index("elegant")) and .loop == "perpetual") | {id, name, applicable_to}' animation-index.json

# 例 2：找适合 pitch-deck 的入场效果
jq '.effects[] | select((.applicable_to | index("pitch-deck")) and .loop == "oneshot") | {id, name, mood}' animation-index.json

# 例 3：找某 pattern family 的所有变体
jq '.effects[] | select(.pattern_family == "stagger-reveal") | {id, name, speed}' animation-index.json
```

自建 combo 的搭配规则：
- 入场 2-5 个 effect，按叙事分步（`purpose: entrance/reveal`）
- 持续层 1-2 个 effect（`loop: perpetual`，`performance: light` 优先）
- 数字必带 counter 跳动（id 21 或 103 DELTA）
- **mood 不混搭** — corporate 页别塞 playful 效果

### 入口 C · 拿代码调用

确定 effect ID 后，引入 snippet 库并调用：

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="animation-snippets.js"></script>
<script>
  effects.play_01();                                       // 整个文档
  effects.play_101(document.querySelector('#slide-3'));    // scope 到 slide（推荐）
</script>
```

函数签名：`effects.play_XX(scope = document)` → 返回 GSAP timeline 或 void。
后缀 A/B/C 小写：`play_59a`, `play_67c`, `play_91b` 等。

### 视觉预览

不确定效果长什么样？浏览器打开 [animation-showcase.html](../animation-showcase.html) — 140 个效果全部实时循环跑。

### 避坑

1. **perpetual 类 effect 重播前必须 teardown** — 所有长时循环或 DOM-创建型 effect 现在都返回 `{ teardown }` 句柄。正常使用场景下直接调一次即可；但**若需要在同一 scope 上重播**（切换视图、slide hot-reload 等），先 teardown 旧实例再调新的：

   ```js
   let handle = effects.play_32(slide);
   handle?.teardown?.();
   handle = effects.play_32(slide);  // clean restart
   ```

   涉及 teardown 的 effect：32 / 40 / 45 / 62 / 65 / 70 / 97 / 98 / 121 / 122 / 124 / 133 / 134 / 136 / 138。未返回 teardown 的 oneshot effect（入场类、text 类等）不需要管，播完自然结束。

2. **性能热点一页只选一个**：70 NOISE STATIC / 134 HOURGLASS SAND / 138 DOT MATRIX（已优化节流，但 mobile 场景避免堆叠）。

3. **每个生成的 HTML 至少包含：**
   - 一个入场序列（按叙事逻辑分步揭示，不是全部同时出现）
   - 1-2 个持续循环动画（让页面"活着"）
   - 数字类内容必须有 counter 跳动（21 或 103）

4. **避免的反模式：**
   - 所有元素同时 fade in（懒）
   - 只有入场没有持续动画（页面"死了"）
   - 一页堆 3+ 个持续层效果（视觉疲劳）
   - mood 混搭（corporate × playful、sci-fi × elegant 等）

---

## SVG transform + GSAP x/y 硬规则

**症状：** SVG 元素用 `transform="translate(X, Y)"` 定位，GSAP timeline 里动画写了 `{ y: 0 }` / `{ x: 0 }` → 元素被强拉到 (0, 0) 或 (0, Y)，所有卡片堆在画布顶部或左边，完全错位。

**原因：** GSAP 的 `x` / `y` 属性**不是**"动画到坐标 0"，而是"把 transform 的对应分量**强设**为 0"。元素已有 `transform="translate(30, 96)"` 时，`gsap.to(el, { y: 0 })` 会把它拉到 (30, 0)，**不是**保持 (30, 96)。

### 方案 A · SVG transform 定位 + 只动 opacity（推荐）

```html
<g class="card" opacity="0" transform="translate(30, 96)">...</g>
```
```js
// ✅ 正确：定位靠 SVG transform 已到位，动画只动 opacity
tl.to('.card', { opacity: 1, duration: 0.5, stagger: 0.1 }, 0.6);

// ❌ 错误：会把元素拉到 (0, 0)
tl.to('.card', { opacity: 1, y: 0, duration: 0.5 }, 0.6);
```

### 方案 B · 子元素用 SVG 属性定位 + GSAP 随便动 x/y

```html
<rect class="card" x="30" y="96" width="260" height="80" opacity="0"/>
```
```js
// ✅ 无 transform 时 GSAP x/y 按相对偏移处理，安全
tl.from('.card', { y: -20, opacity: 0, duration: 0.5 }, 0.6);
```

### Slide-in 效果

```js
// ✅ 用 fromTo，from 是相对当前位置的偏移，to 回到原位
tl.fromTo('.card',
  { x: -40 },                          // from: 向左偏 40
  { x: 0, opacity: 1, duration: 0.5 }  // to: 回到原位
, 0.6);
```

**警告**：即使用 fromTo，如果元素有 `transform="translate(X, Y)"`，GSAP 仍可能把 Y 分量强设为 0。最稳妥做法：外层 `<g transform="translate(X,Y)">` 负责定位，内层 `<g>` 包装内容 + 参与 GSAP slide-in 动画；或把 X/Y 搬到 rect/text 的 x/y 属性里（方案 B）。

### 批次踩坑实录（v2-impeccable 批 2，2026-04-17）

- `06 dashboard`：`.kpi transform="translate(X, 96)"` + `{ y: 0 }` → 5 张 KPI 堆 y=0
- `07 bento`：`.bento transform="translate(X, Y)"` + `{ y: 0 }` → 6 张 bento 堆 y=0
- `08 matrix`：`.trow transform="translate(0, Y)"` + `{ y: 0 }` → 10 行矩阵堆顶
- `09 circular-flow`：`#rightPanel transform="translate(770, 120)"` + `{ x: 0 }` → 右面板跑到左边覆盖圆
- `10 hierarchical`：**唯一幸存**，因为 sub-modules 没用 transform，用 SVG 属性定位

### 生成 HTML 时的自检

生成完 HTML 后，grep `y: 0` / `x: 0` 在 GSAP tween 里的所有出现，逐个确认：

1. 该元素**没有** `transform="translate(...)"` attribute？→ 安全
2. 该元素**有** transform？→ 立即删掉 `y: 0` / `x: 0`，或改用方案 B

**只要一个违规，整页 layout 爆炸。**

---

## 节点连线硬规则

**任何连线（line / path / 弧光 / 脉冲轨迹）必须止于节点圆边缘，绝不穿过圆心。**

公式：节点 `<circle cx=Cx cy=Cy r=R>`，连线端点必须在 `(Cx±R, Cy)` 或沿法向偏移 R 后的位置，**不能是 `(Cx, Cy)`**。

对于斜线（非水平/垂直），用三角法收端：
```js
const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy);
const nx=dx/L, ny=dy/L;
const sx=x1+nx*R1, sy=y1+ny*R1;    // 起点从 node1 圆边开始
const ex=x2-nx*R2, ey=y2-ny*R2;    // 终点在 node2 圆边停住
```

正反例：
- ❌ `<circle cx=30 cy=40 r=7> <line x1=30 x2=90>` ← 起点正穿圆心
- ✅ `<circle cx=30 cy=40 r=7> <line x1=37 x2=83>` ← 起点贴圆边（30+7=37）
- ❌ 电弧/闪电从 `cx` 画到另一个 `cx`
- ✅ 电弧从 `cx1+r1` 到 `cx2-r2`

适用：NETWORK / TREE / HUB-SPOKE / ARC / PULSE / 任何节点+连线的结构。

---

## 文字与布局防重叠

**核心原则：任何两个元素的 bounding box 必须有明确间距 — "挨着" 就是 bug。**

生成完后**心算 / 肉眼扫一遍**每个元素 x/y 范围，确认满足：

### 1. Text 行间距（纵向）
- 小字（≤10px）：至少 14px 行距
- 中字（12-14px）：至少 18px 行距
- 大字（16px+）：至少 22px 行距
- 计算：前一行 baseline y + 字高约 1.2×font-size + 4px 呼吸 ≤ 后一行 baseline y

### 2. 同行两段 text（横向）
- name 列结束 x + 至少 20px gap ≤ value 列起始 x
- 估算 name 宽度：中文 font × chars，英文 ≈ 0.55 × font × chars
- 14 tree 踩过：name "Claude 3.5 Sonnet · Anthropic ★" (240px, 从 x=556) 撞到 description (x=760) — 必须扩 gap 到 ≥60px

### 3. Card / box 外部间距
- 两个 card 之间 ≥10px gap（x 或 y）
- Card 不能和 canvas edge 贴（至少 8px margin）
- Card 不能和 footer stamp (y=768) 贴（card bottom ≤ 752，留 16px）
- Card 不能和 header subtitle (y≈72) 贴（card top ≥ 94，留 22px）
- 15 winding-roadmap 踩过：M2 card y=80 抵 subtitle（gap 8），M4 card y=718 抵 progress strip（gap 7）

### 4. 容器内部 padding
- Panel / quadrant 内部的 card/box 必须留 **左右各 ≥20px，上下各 ≥16px** 空白边
- **精确算公式**：外框 `x + width = R`，内部元素 right edge ≤ `R - 20`；外框 `y = T`，内部元素 top ≥ `T + 16`
- **绝对不要凭直觉**算外框边界，必须读 rect 的 `x` 和 `width` 属性相加
- 13 venn 踩过：rightPanel width=540，center card width=520 → 0 右 gap（贴死）
- 12 swot v3 再踩：W box right edge = 1198+172 = 1370 = 象限 right edge，**完全贴死**

### 5. Score / stat value 和 bullet 行的 y 冲突
- Bullet 行最后 subtext bottom (baseline + descender ≈ baseline + 2)
- Score box 放 bullet 下方时：Score top y ≥ bullet subtext bottom y + 8

### 6. path 上 callout 框的位置规则（winding-roadmap / story-mountain 类）
- 曲线顶 milestone：框放曲线**上方**
- 曲线底 milestone：框放**下方**
- 垂直段 milestone：框放**左**或**右**
- 框到 path 的最近距离 ≥8px（通过连接虚线跨越）

**心算自检口诀：** 对每个 card / text 问"它的 x/y 范围是什么，上下左右邻居的 x/y 范围是什么，gap 够不够"。

---

## SWOT / 2×2 矩阵装饰大字

**4 个装饰大字（S/W/O/T 等）必须在各象限的同一相对位置。默认：全部左上角。**

- ❌ 不要"对角镜像"（S 左上 + W 右上 + O 左下 + T 右下）— 看着像视觉杂音
- ✅ 统一"左上对齐"：每个大字 x = 象限 left + 22，y = 象限 top + 62
- 大字字号建议 64px，opacity 0.12（纯装饰，不抢眼）
- **大字的 x 范围内不许有其他实体**（title / bullet / score box 一律避开）
- 若象限的 title 也在 x=左边 +98 开始（default），则大字（ends at ~x+50）和 title 有 ~26px gap — 刚好

12 SWOT 踩过：W 放右上 + score box 也在右上 → 打架；T 放右下 + 冲突。全部改成左上对齐之后问题消失。

---

## Score / Index badge

1. **Label 和 value 绝不能挤同一行** — 必须分上下两行（或左右两列 + 明确分隔）
2. Box 最小尺寸 **160×48**（label 20px 行 + 分隔 line + value 28px 行）
3. Value 字号 ≥ label 字号的 2 倍（对比清晰）
4. Box 用 **drop shadow filter**（`feDropShadow dy=4 stdDev=4`）创造"悬浮感"，不是靠纯加粗边框
5. 位置：4 个象限的 **同一相对角**（建议右上角），远离大字避免冲突

Drop shadow filter 模板（加到 defs）：
```xml
<filter id="floatShadow" x="-30%" y="-30%" width="160%" height="180%">
  <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.55"/>
</filter>
```

12 SWOT v2 踩过：原本 box 128×34 label y=22 + value y=28 挤一排；改 172×54，label y=20 + separator line y=28 + value y=46 两行清晰分开。

---

## PDF Export Compatibility

导出 PDF 时（Phase 6B），动画不渲染。Chrome headless print CSS 已强制 `animation: none !important` + `opacity: 1 !important`——不用特殊处理。ECharts/D3 的图表会作为静态 SVG/canvas 被捕捉进 PDF。
