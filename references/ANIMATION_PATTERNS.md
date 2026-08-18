# Animation Patterns Reference

> 动画不是装饰，是叙事节奏。每个 pattern 都有明确的信息传达目的。

## 动画素材库（实时预览）

打开 [animation-showcase.html](../animation-showcase.html) 可查看 110 种动画效果的实时演示。所有效果持续循环运行，可直接从中选取代码使用。

```bash
open ~/.claude/skills/next-slide-impeccable/animation-showcase.html
```

选取流程：浏览素材库 → 找到合适的效果编号 → 参考下方对应 pattern 的代码片段 → 应用到目标结构中。

## CDN Setup

所有 GSAP 插件现在免费（Webflow 赞助）。按需加载：

```html
<!-- Core (必须) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

<!-- 按需加载的插件 -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/DrawSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/MotionPathPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/MorphSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js"></script>

<!-- 注册 -->
<script>
gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, MorphSVGPlugin, TextPlugin);
</script>
```

### 插件依赖速查

| Pattern | 需要的插件 |
|---------|-----------|
| draw-on, frame-draw | DrawSVGPlugin |
| path-flow, orbit | MotionPathPlugin |
| shape-morph | MorphSVGPlugin |
| counter, typewriter | TextPlugin |
| 其他所有 | 仅 GSAP Core |

---

## Pattern 速查表

| # | Pattern | 信息目的 | 适用结构 |
|---|---------|---------|---------|
| 1 | draw-on | 引导视线沿路径 | 所有带边框/连接线的结构 |
| 2 | counter | 数字冲击力 | bento-grid, dashboard, stats |
| 3 | stagger-reveal | 建立层次感 | 所有多元素结构 |
| 4 | shape-morph | 状态变化/对比 | bridge, comparison |
| 5 | path-flow | 数据/信息流向 | hub-spoke, tree, circular-flow |
| 6 | radar-sweep | 扫描/分析感 | radar-chart, dashboard |
| 7 | typewriter | 标题权威感 | 所有结构的标题 |
| 8 | pulse-ripple | 中心辐射/关注 | hub-spoke, venn |
| 9 | parallax-depth | 深度/层级感 | iceberg, hierarchical-layers |
| 10 | bar-growth | 数据对比 | bento-grid, comparison, dashboard |
| 11 | progress-ring | 完成度/比例 | dashboard, stats |
| 12 | scan-line | 科技/监控感 | dashboard, dense-modules |
| 13 | gradient-shift | 氛围流动 | 背景，所有结构 |
| 14 | bubble-rise | 上升/涌现 | iceberg, funnel |
| 15 | orbit-rotate | 生态/系统运转 | hub-spoke, circular-flow |

---

## Pattern 详解 + 代码片段

### 1. draw-on（线条描绘）

> 边框、连接线、图表轮廓从无到有"画出来"。

**需要：** DrawSVGPlugin

```js
// 基础：SVG 路径从 0% 画到 100%
gsap.from('.line', {drawSVG: '0%', duration: 1.2, ease: 'power2.inOut'});

// 进阶：从中心向两端画
gsap.from('.line', {drawSVG: '50% 50%', duration: 1, ease: 'power3.out'});

// 矩形边框描绘（卡片入场）
gsap.from('.card-border', {drawSVG: '0%', duration: 0.8, stagger: 0.1, ease: 'power2.inOut'});

// 无插件 fallback（纯 stroke-dashoffset）
// SVG 元素需要 pathLength="1"
gsap.set('.line', {strokeDasharray: 1, strokeDashoffset: 1});
gsap.to('.line', {strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut'});
```

**适用结构：** 所有带边框和连接线的结构

---

### 2. counter（数字跳动）

> KPI 数字从 0 滚动到目标值，制造冲击感。

**需要：** TextPlugin（可选，纯 JS 也行）

```js
// 方法 A：GSAP TextPlugin
gsap.to('.stat', {textContent: 38, duration: 1.5, ease: 'power3.out',
  snap: {textContent: 1}, // 整数
  modifiers: {textContent: v => '-' + Math.round(v) + '%'} // 前后缀
});

// 方法 B：无插件（推荐，更灵活）
const obj = {val: 0};
gsap.to(obj, {
  val: 38, duration: 1.5, ease: 'power3.out',
  onUpdate: () => {
    el.textContent = '-' + Math.round(obj.val) + '%';
  }
});

// 方法 C：带小数
const obj = {val: 0};
gsap.to(obj, {
  val: 3.2, duration: 1.5, ease: 'power3.out',
  onUpdate: () => el.textContent = obj.val.toFixed(1) + '×'
});
```

**适用结构：** bento-grid, dashboard, stats, radar-chart

---

### 3. stagger-reveal（交错出现）

> 多元素按序出现，建立视觉节奏。

```js
// 基础：从下往上 fade in
gsap.from('.card', {
  y: 30, opacity: 0, duration: 0.5,
  stagger: {amount: 1, from: 'start'}, // 总耗时 1s
  ease: 'back.out(1.5)'
});

// 网格：从左上角涟漪式展开
gsap.from('.cell', {
  scale: 0.8, opacity: 0, duration: 0.4,
  stagger: {grid: [3, 4], from: 'start', amount: 0.8},
  ease: 'back.out(1.2)'
});

// 表格行：从上到下逐行
gsap.from('.row', {
  x: -20, opacity: 0, duration: 0.3,
  stagger: 0.08, ease: 'power3.out'
});

// 方向变体
// from: 'start' | 'end' | 'center' | 'edges' | 'random'
// grid: [rows, cols] 用于网格布局
```

**适用结构：** 所有多元素结构

---

### 4. shape-morph（形状变形）

> 图标或形状平滑变形为另一个形状。

**需要：** MorphSVGPlugin

```js
// 路径 A 变形为路径 B
gsap.to('#shapeA', {morphSVG: '#shapeB', duration: 1, ease: 'power2.inOut'});

// 变形为圆形
gsap.to('#shape', {morphSVG: {shape: 'circle', size: 50}, duration: 0.8});

// 序列变形：A → B → C
const tl = gsap.timeline();
tl.to('#s', {morphSVG: '#s2', duration: 0.6})
  .to('#s', {morphSVG: '#s3', duration: 0.6});
```

**适用结构：** bridge (状态转变), comparison (对比切换)

---

### 5. path-flow（路径粒子流）

> 小圆点沿连接线流动，表示数据/信息传递。

**需要：** MotionPathPlugin

```js
// 沿 SVG path 移动
gsap.to('.particle', {
  motionPath: {path: '#connectionLine', align: '#connectionLine', alignOrigin: [0.5, 0.5]},
  duration: 2, ease: 'power1.inOut', repeat: -1, repeatDelay: 1
});

// 无插件 fallback：手动 cx/cy 动画
gsap.timeline({repeat: -1, repeatDelay: 1.5})
  .set('.dot', {attr: {cx: 700, cy: 330}, opacity: 0})
  .to('.dot', {opacity: 0.8, duration: 0.2})
  .to('.dot', {attr: {cx: 700, cy: 160}, duration: 1.2, ease: 'power2.inOut'}, '<')
  .to('.dot', {opacity: 0, duration: 0.3}, '-=0.3');

// 双向流动（请求/响应）
function biFlow(sel, x1,y1, x2,y2, delay) {
  gsap.timeline({repeat: -1, delay, repeatDelay: 2})
    .set(sel, {attr:{cx:x1,cy:y1}, opacity:0})
    .to(sel, {opacity:0.8, duration:0.2})
    .to(sel, {attr:{cx:x2,cy:y2}, duration:1.2, ease:'power2.inOut'}, '<')
    .to(sel, {opacity:0, duration:0.3}, '-=0.3')
    .set(sel, {attr:{cx:x2,cy:y2}, opacity:0}, '+=0.5')
    .to(sel, {opacity:0.5, duration:0.2})
    .to(sel, {attr:{cx:x1,cy:y1}, duration:1.2, ease:'power2.inOut'}, '<')
    .to(sel, {opacity:0, duration:0.3}, '-=0.3');
}
```

**适用结构：** hub-spoke, tree-branching, circular-flow

---

### 6. radar-sweep（雷达扫描）

> 旋转的扫描线或弧形，制造分析/扫描感。

```js
// SVG line 从中心旋转
gsap.to('.sweep-line', {
  rotation: 360, transformOrigin: '50% 50%',
  duration: 4, repeat: -1, ease: 'none'
});

// 扫描弧（只亮一段）
gsap.to('.sweep-arc', {
  rotation: 360, transformOrigin: 'center',
  duration: 6, repeat: -1, ease: 'none'
});

// 数据点在扫描线经过时亮起
const sweep = gsap.to('.sweep', {rotation:360, transformOrigin:'center', duration:4, repeat:-1, ease:'none'});
// 配合 onUpdate 检测角度，触发对应数据点 flash
```

**适用结构：** radar-chart, hub-spoke

---

### 7. typewriter（打字效果）

> 标题逐字出现，建立权威感和期待。

```js
// 方法 A：clip-path 展开（推荐，支持 SVG text）
gsap.from('.title', {
  clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power3.out'
});

// 方法 B：逐字 opacity（需要 SplitText 或手动拆字）
// 手动拆字版本（纯 SVG，不需要插件）
const chars = document.querySelectorAll('.char');
gsap.from(chars, {opacity: 0, duration: 0.03, stagger: 0.05});

// 方法 C：光标闪烁配合
gsap.from('.title', {clipPath: 'inset(0 100% 0 0)', duration: 1.5, ease: 'steps(20)'});
gsap.to('.cursor', {opacity: 0, repeat: -1, yoyo: true, duration: 0.5});
```

**适用结构：** 所有结构的标题入场

---

### 8. pulse-ripple（脉冲涟漪）

> 从一个点向外扩散的圆圈波纹，表示辐射/影响力。

```js
// 单次脉冲
gsap.fromTo('.ring',
  {attr: {r: 50}, opacity: 0.15},
  {attr: {r: 250}, opacity: 0, duration: 1.5, ease: 'power2.out'}
);

// 持续脉冲（多个 ring 交错）
gsap.timeline({repeat: -1})
  .fromTo('.ring1', {attr:{r:50},opacity:0.12}, {attr:{r:280},opacity:0, duration:2.5, ease:'power1.out'})
gsap.timeline({repeat: -1, delay: 1})
  .fromTo('.ring2', {attr:{r:50},opacity:0.08}, {attr:{r:280},opacity:0, duration:2.5, ease:'power1.out'})

// Hub 中心 glow 呼吸
gsap.to('.hub-glow', {opacity: 0.6, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'});
```

**适用结构：** hub-spoke, venn-diagram

---

### 9. parallax-depth（视差深度）

> 不同层以不同速度/时机出现，制造深度感。

```js
// 冰山模型：上层快，下层慢
const tl = gsap.timeline();
tl.to('.layer-surface', {opacity: 1, y: 0, duration: 0.5}, 0.3);
tl.to('.layer-shallow', {opacity: 1, y: 0, duration: 0.6}, 0.8);
tl.to('.layer-mid', {opacity: 1, y: 0, duration: 0.7}, 1.3);
tl.to('.layer-deep', {opacity: 1, y: 0, duration: 0.8}, 1.8);
tl.to('.layer-abyss', {opacity: 1, y: 0, duration: 0.9}, 2.3);

// 持续微浮动（不同层不同幅度）
gsap.to('.layer-shallow', {y: -3, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'});
gsap.to('.layer-deep', {y: -1, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'});
```

**适用结构：** iceberg, hierarchical-layers, stack

---

### 10. bar-growth（条形图生长）

> 条形从 0 生长到目标宽度。

```js
// SVG rect 宽度动画
document.querySelectorAll('.bar').forEach((bar, i) => {
  const w = bar.getAttribute('data-width');
  gsap.to(bar, {attr: {width: w}, duration: 1, ease: 'power3.out', delay: 0.5 + i * 0.08});
});

// CSS scaleX 版本（性能更好）
gsap.from('.bar-fill', {
  scaleX: 0, transformOrigin: 'left center',
  duration: 0.8, stagger: 0.1, ease: 'power3.out'
});

// 柱状图（从底部向上）
gsap.from('.column', {
  scaleY: 0, transformOrigin: 'bottom center',
  duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)'
});
```

**适用结构：** bento-grid, comparison, dashboard

---

### 11. progress-ring（环形进度）

> 圆环从 0 填充到目标百分比。

```js
// SVG circle + stroke-dashoffset
// 设 circle circumference = 2πr, dasharray = circumference
// dashoffset 从 circumference → 0 表示 0% → 100%
const circle = document.querySelector('.ring');
const r = circle.getAttribute('r');
const circumference = 2 * Math.PI * r;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

gsap.to(circle, {
  strokeDashoffset: circumference * (1 - 0.73), // 73%
  duration: 1.5, ease: 'power3.out'
});
```

**适用结构：** dashboard, stats, hub-spoke center

---

### 12. scan-line（扫描线）

> 水平或垂直的亮线缓慢扫过画面，制造科技/监控感。

```js
// 水平扫描（从上到下）
gsap.timeline({repeat: -1, repeatDelay: 6})
  .set('.scan-h', {y: 0, opacity: 0})
  .to('.scan-h', {opacity: 0.5, duration: 0.2})
  .to('.scan-h', {y: 788, duration: 3, ease: 'power1.inOut'}, '<')
  .to('.scan-h', {opacity: 0, duration: 0.5}, '-=0.5');

// 垂直扫描（从左到右）
gsap.timeline({repeat: -1, repeatDelay: 8})
  .set('.scan-v', {x: 0, opacity: 0})
  .to('.scan-v', {opacity: 0.3, duration: 0.2})
  .to('.scan-v', {x: 1400, duration: 4, ease: 'power1.inOut'}, '<')
  .to('.scan-v', {opacity: 0, duration: 0.5}, '-=0.5');
```

**SVG 扫描线定义：**
```html
<defs>
  <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="transparent"/>
    <stop offset="30%" stop-color="rgba(196,163,90,0.06)"/>
    <stop offset="50%" stop-color="rgba(196,163,90,0.12)"/>
    <stop offset="70%" stop-color="rgba(196,163,90,0.06)"/>
    <stop offset="100%" stop-color="transparent"/>
  </linearGradient>
</defs>
<rect x="0" y="0" width="1400" height="2" fill="url(#scanGrad)" class="scan-h"/>
```

**适用结构：** dashboard, dense-modules, bento-grid

---

### 13. gradient-shift（渐变流动）

> 背景色缓慢流动变化，制造活力感。

```js
// SVG linearGradient stop 位移
gsap.to('#gradStop1', {attr: {offset: '30%'}, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut'});
gsap.to('#gradStop2', {attr: {offset: '70%'}, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'});

// 整体色调微调
gsap.to('#gradStop1', {attr: {'stop-color': 'rgba(196,163,90,0.08)'}, duration: 6, repeat: -1, yoyo: true});
```

**适用结构：** 所有结构的背景层

---

### 14. bubble-rise（气泡上浮）

> 小圆点从底部上浮，制造涌现/上升感。

```js
function bubble(sel, x, startY, duration, delay) {
  gsap.timeline({repeat: -1, delay})
    .set(sel, {attr: {cx: x, cy: startY}, opacity: 0})
    .to(sel, {opacity: 0.15, duration: 0.3})
    .to(sel, {
      attr: {cy: 290, cx: x + (Math.random()*40 - 20)}, // 轻微横漂
      duration, ease: 'power1.out'
    }, '<')
    .to(sel, {opacity: 0, duration: 0.5}, `-=${0.5}`);
}
// 创建 6 个气泡
bubble('.b1', 500, 700, 6, 4);
bubble('.b2', 650, 720, 7, 5);
bubble('.b3', 800, 680, 5.5, 6);
```

**SVG 气泡定义：**
```html
<circle r="2" fill="rgba(74,143,212,0.15)" class="bubble b1"/>
<circle r="3" fill="rgba(74,143,212,0.1)" class="bubble b2"/>
```

**适用结构：** iceberg, funnel

---

### 15. orbit-rotate（轨道旋转）

> 元素沿圆形轨道持续旋转，表示系统运转。

```js
// 轨道环旋转（虚线圆）
gsap.to('.orbit', {
  rotation: 360, transformOrigin: '700px 410px',
  duration: 60, repeat: -1, ease: 'none'
});

// 反向轨道（制造复杂感）
gsap.to('.orbit2', {
  rotation: -360, transformOrigin: '700px 410px',
  duration: 90, repeat: -1, ease: 'none'
});

// 内部 spin ring
gsap.to('.hub-spin', {
  rotation: 360, transformOrigin: '700px 410px',
  duration: 20, repeat: -1, ease: 'none'
});
```

**适用结构：** hub-spoke, circular-flow, venn-diagram

---

## 组合编排原则

### 入场序列（所有结构通用）

```
0.0s  Frame border draw-on
0.3s  Header typewriter
0.5s  Scan line sweep (optional)
0.6s  Primary elements stagger-reveal
1.0s  Data (counter, bar-growth)
1.5s  Annotations / secondary text
2.0s  Perpetual effects start (pulse, orbit, scan-line loop)
```

### 持续动效搭配

| 效果 | 适度用量 | 过度标志 |
|------|---------|---------|
| 呼吸 glow | 1-2 个焦点元素 | 全部元素在闪 |
| 轨道旋转 | 1-2 圈 | 3+ 圈变杂乱 |
| 粒子流 | 3-6 个粒子 | 满屏飞 |
| 扫描线 | 每 6-10s 一次 | 每 2s 扫一次 |
| 气泡 | 4-6 个 | 冒泡浴缸 |

### 视觉规范

- **线不穿圆**：连接线到圆形节点时，`line y2` = `circle cy - r`，不能穿入圆内。所有 hub-spoke、tree、network 结构都遵守此规则。
- **元素不重叠**：箭头、标签、连接线之间保持至少 2px 间距。文字行间距至少 14px（10px 字号时）。
- **层级清晰**：背景元素（网格、环）在底层，连接线中层，节点+文字顶层。
- **曲线与卡片不重叠**：story-mountain、linear-progression 等带弧线的结构，信息卡片必须放在弧线区域之外（如弧线上方/下方的独立区域），用虚线连接器关联。**绝对不要把卡片放在曲线穿过的位置。**
- **结构拆解间距**：structural-breakdown 中心块与子模块卡片之间保持 ≥100px 间距。卡片内计数器数字 ≤14px，不要用 18px+ 大号挤在小卡片里。
- **拼图接口精度**：jigsaw 相邻拼图的凸（tab）和凹（blank）必须用数学镜像的贝塞尔控制点。凸突出 30px，凹缩进 30px，中心点对齐。外围四边也要有波浪不规则边缘（±10-15px 偏移），不能全是直线。
- **不要用抽象隐喻图**：天平、齿轮互锁、抽象对比等"看不懂"的图形一律不做。如果信息可以用文字+数据清晰表达，就用文字。
- **漫画格不用对话框**：comic-strip 结构里不使用 speech bubble（对话框），用图形+数据+action words 讲故事。

### 扫描线使用规则

不是所有结构都适合扫描线。扫描线的方向必须和结构的信息流方向一致，且**每个结构最多一条扫描线**。双向扫描线（一条从上一条从下）看起来很蠢，绝对不要做。

| 扫描方式 | 适用结构 | 原因 |
|---------|---------|------|
| **垂直扫描（上→下）** | bento-grid, periodic-table, dense-modules, tree-branching, structural-breakdown | 信息按网格/层级纵向排列 |
| **水平扫描（左→右）** | hierarchical-layers, linear-progression | 信息沿时间线/层级横向流动 |
| **不用扫描线** | SWOT, venn-diagram, comparison-matrix, binary-comparison, circular-flow, winding-roadmap, comic-strip | 这些结构有自己的视觉节奏，扫描线是多余的干扰 |

圆形结构（circular-flow, hub-spoke）用**粒子轨道动画**代替扫描线——小光点沿轨道路径持续流动（rAF + getPointAtLength），更符合环形信息流的视觉逻辑。

扫描线实现：
```js
// 垂直扫描（宽条从上往下）
gsap.fromTo(scanRect, {attr:{y:-120}}, {attr:{y:800}, duration:6, ease:'none', repeat:-1});

// 水平扫描（窄高条从左往右）
gsap.fromTo(scanRect, {attr:{x:-120}}, {attr:{x:1400}, duration:5.5, ease:'none', repeat:-1});
```

### Circular Flow 布局规则

当 circular-flow 结构需要右侧详情面板时，必须：
- **圆心左移**至 cx ≤ 400（默认 cx=380），给面板留空间
- **半径缩小**至 r ≤ 200（默认 r=190）
- **节点框在圆外**，通过虚线连接器连到圆上的标记点
- 面板和圆的右侧节点之间保持 **≥ 50px 间距**
- 面板内的"周期"标签字号 ≤ 12px，text-anchor="end"，不要用 14px+ 抢视觉权重

不遵守这些规则会导致节点框和面板内容重叠，这是最常见的布局错误。

### 性能原则

- 优先用 `transform` 和 `opacity`（GPU 加速）
- 避免动画 `width/height`（触发 reflow）
- SVG 属性动画（cx, cy, r）性能 OK，但数量控制在 20 个以内
- `repeat: -1` 的持续动画不超过 8 个
- Mobile：减少粒子数，加大 `repeatDelay`

### PDF 兼容

所有动画元素必须有合理的**终态**（opacity: 1, transform: none）。`html_to_pdf.py` 会：
1. 注入 `gsap.globalTimeline.progress(1)` 强制跑完所有动画
2. 清除 inline `opacity: 0` 样式
3. 用 `--virtual-time-budget=5000` 给 JS 5 秒执行时间

不需要额外处理。
