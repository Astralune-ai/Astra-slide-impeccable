# Structures · Canonical Reference Set

> 24 个结构 + 1 个 gallery 索引 = 25 个"跑通的、过了 QA 的、踩完坑修完的" HTML 参考文件。
> **下次要生成同类结构图，先打开对应的参考文件，照抄布局 / 动画 / 数学，只换内容。**
> 这样可以跳过 STRUCTURE_PRESETS.md 里所有硬规则 0-11 的坑，它们已经固化在参考代码里。

## 使用方式

1. 用户要求生成某种结构图（e.g. "给我一个雷达图对比 3 个模型"）
2. 查下表，匹配结构 → 打开对应 `NN-name.html`
3. **保留**：骨架坐标、动画 timeline、filter region、GSAP tween 属性、`<defs>` 配色、corner ring、filter glow region、scan line、particle rAF 逻辑、永续呼吸动画。这些都是已经踩过坑修复的。
4. **只换**：title / subtitle 文案、内容文字、数据、色值（如果品牌变化）、图标（如果内容是不同领域）
5. 如果内容维度和参考不完全吻合（e.g. 参考是 6 节点，用户给了 5 节点），参考 STRUCTURE_PRESETS.md 里对应结构的"踩坑"部分调整坐标
6. 改完后自查：过一遍硬规则 0-11（见 STRUCTURE_PRESETS.md 末尾）

## 公共约定（所有 25 个文件共享）

- Canvas: `viewBox="0 0 1400 788"` (16:9.2)
- 风格: Asyre Dark Gold · 背景 `#0a0a0b` + grid pattern
- 字体: Noto Serif SC (CJK display) · Space Grotesk (EN display) · JetBrains Mono (tech caption)
- 角标: 右上 `cornerRing` with `ringInner` 无限旋转 + 当前文件编号
- 左上版本标: `IMPECCABLE · v2` (font 9, opacity 0.35, letter-spacing 2)
- Footer pattern: `STR-XXX-NN / REV.A — IMPECCABLE` 左下 + 结构副标题右下 (y=768)
- Filter region: 所有 `<filter>` 必须 `x="-50%" y="-50%" width="200%" height="200%"` 起步；stdDeviation≥4 用 `-75%/250%`（硬规则 9）
- GSAP timeline 惯例: 先 title/subtitle 淡入 → 主体 stagger → footer → perpetual（rAF particle + GSAP yoyo breath）

## 25 个文件索引

| # | 文件 | Preset | 类别 | 中文名 | EN slug | 关键固化点 |
|---|---|---|---|---|---|---|
| 01 | [01-funnel.html](01-funnel.html) | #2 | flow | 漏斗 | funnel | 梯形 stagger / 转化率 counter |
| 02 | [02-hub-spoke.html](02-hub-spoke.html) | #3 | hierarchy | 中心辐射 | hub-spoke | hub r=80 hold 3 行文字 / 6 连线端点在 rect 边缘 |
| 03 | [03-iceberg.html](03-iceberg.html) | #4 | narrative | 冰山 | iceberg | waterGrad opacity≥0.9 盖住水下 grid / 气泡 clip-path |
| 04 | [04-bridge.html](04-bridge.html) | #5 | narrative | 转型之桥 | bridge | 3 石头 callout "两上一下" / 弧渐变 red→gold→green |
| 05 | [05-radar-chart.html](05-radar-chart.html) | #6 | compare | 雷达图 | radar-chart | 4 层 sweep 联动 / rayToHex Cramer's rule / ★ 独立 tspan |
| 06 | [06-dashboard.html](06-dashboard.html) | #14 | data | 仪表盘 | dashboard | KPI counter + bar-growth + 扫描 |
| 07 | [07-bento-grid-dense.html](07-bento-grid-dense.html) | #1 | data | 格子仪表盘 | bento-grid-dense | 3×3 均匀 · 网格涟漪 stagger |
| 08 | [08-comparison-matrix-dense.html](08-comparison-matrix-dense.html) | #9 | compare | 多维矩阵 | comparison-matrix | 多列密度 + 行 stagger |
| 09 | [09-circular-flow.html](09-circular-flow.html) | #10 | flow | 循环流程 | circular-flow | 圆心左移避让右面板 / 粒子轨道不用扫描 |
| 10 | [10-hierarchical-layers.html](10-hierarchical-layers.html) | #11 | hierarchy | 层级堆叠 | hierarchical-layers | 水平条从底向上 stagger |
| 11 | [11-linear-progression.html](11-linear-progression.html) | #13 | flow | 线性进程 | linear-progression | 主线 draw-on · 节点 back.out pop |
| 12 | [12-swot-analysis.html](12-swot-analysis.html) | #20 | compare | SWOT 分析 | swot-analysis | 四象限从中心 scale 展开 |
| 13 | [13-venn-diagram.html](13-venn-diagram.html) | #16 | compare | 维恩图 | venn-diagram | 2-3 圆 slide-in + 交集 highlight pulse |
| 14 | [14-tree-branching.html](14-tree-branching.html) | #12 | hierarchy | 树状分支 | tree-branching | L1/L2 分支 draw-on · 连线端点严守节点边缘 |
| 15 | [15-winding-roadmap.html](15-winding-roadmap.html) | #18 | flow | 蜿蜒路线 | winding-roadmap | S 曲线 · 里程碑框在曲线旁 · 光点 getPointAtLength |
| 16 | [16-story-mountain.html](16-story-mountain.html) | #19 | narrative | 故事山 | story-mountain | 弧线 y≤480 / 卡片 y≥530 严格分离 · PEAK 光晕圆形 (filter region -75%/250%) · card 呼吸用 strokeOpacity（避 brightness tween 坑） |
| 17 | [17-structural-breakdown.html](17-structural-breakdown.html) | #22 | hierarchy | 结构拆解 | structural-breakdown | 中心 200×128 + 8 放射模块 · junction dot · counter |
| 18 | [18-dense-modules.html](18-dense-modules.html) | #21 | data | 密集模块 | dense-modules | 4 层 16 模块蓝图 · 8 cross-cut 侧栏 · 层间粒子 |
| 19 | [19-periodic-table.html](19-periodic-table.html) | #15 | data | 周期表 | periodic-table | 4×6 grid · row highlight cycling · 元素呼吸用 strokeOpacity |
| 20 | [20-comparison-table.html](20-comparison-table.html) | #7 | compare | 对比表 | comparison-table | 3 列 × 8 行 · winner x/w 从列常量派生（硬规则 10） · 获胜 badge cycle 脉冲 |
| 21 | [21-binary-comparison.html](21-binary-comparison.html) | #8 | compare | 二元对比 | binary-comparison | 左 panel 580w / 右 panel 580w / 中央 180 gap · VS badge `bounce.out` 从 y=-500 砸下 · 分隔线与 badge 拆分 |
| 22 | [22-jigsaw.html](22-jigsaw.html) | #17 | visual | 拼图 | jigsaw | 6 块 tab/blank 严格对称 · 外边波浪 · 完成 flash |
| 23 | [23-isometric-map.html](23-isometric-map.html) | #23 | visual | 等距地图 | isometric-map | 30° iso JS 生成 · 建筑 3 面 · core 最高带 glow · compass 在左上框内（不压 footer） |
| 24 | [24-comic-strip.html](24-comic-strip.html) | #24 | visual | 漫画格 | comic-strip | 6 panel 微旋转 ±0.3-0.8° · action words (PANIC/FIX/SHIP IT/ALL GOOD) · 无对话框 |
| 25 | [25-index.html](25-index.html) | — | gallery | 索引页 | index | 6×4 clickable grid · hover 用 `!important` 压过 GSAP inline style（硬规则 11） |

## 常见复用场景映射

| 用户说 | 读哪个参考 | 换什么 |
|---|---|---|
| "分析转化漏斗" | 01-funnel | 每层名字 + 百分比 |
| "平台架构图" | 02-hub-spoke / 17-structural-breakdown | hub 名 + 8 模块名 |
| "深层 vs 表面问题" | 03-iceberg | above 3 / below 7 的文字 |
| "AI 转型路线图" | 04-bridge / 15-winding-roadmap | 阶段石文案 |
| "模型能力对比" | 05-radar-chart / 20-comparison-table | 模型名 + 维度数据 |
| "团队看板" | 06-dashboard / 07-bento-grid-dense | KPI value + label |
| "工具对比矩阵" | 08-comparison-matrix-dense | 产品 + 维度 rating |
| "生命周期/循环" | 09-circular-flow | 4-6 节点名 |
| "技术栈分层" | 10-hierarchical-layers | 3-5 层名 |
| "项目时间线" | 11-linear-progression | 节点日期 + 里程碑 |
| "SWOT" | 12-swot-analysis | 4 象限内容 |
| "产品交集" | 13-venn-diagram | 2-3 圆 + 交集 |
| "组织架构" | 14-tree-branching | 根 + L1/L2 节点 |
| "叙事弧线" | 16-story-mountain | 5 幕文案 |
| "工具周期表" | 19-periodic-table | 24 元素 |
| "A vs B" | 21-binary-comparison | 左右两边 6 维 |
| "产品拼图" | 22-jigsaw | 6 块内容 |
| "服务器拓扑" | 23-isometric-map | 5 节点名 + 连接关系 |
| "用户旅程/故事" | 24-comic-strip | 6 格时间戳 + action word |

## 延伸规则

- [STRUCTURE_PRESETS.md](../references/STRUCTURE_PRESETS.md) — 每个 preset 的详细布局参数 + 踩坑清单 + 硬规则 0-11
- [ASHER_PREFERENCES.md](../references/ASHER_PREFERENCES.md) — Asher 个人偏好（SVG 非 emoji / 大字 / 170% base / 等）
- [ASYRE_BRAND_PRESET.md](../references/ASYRE_BRAND_PRESET.md) — Asyre Dark Gold 完整色板 + 字体栈
- [ANIMATION_PATTERNS.md](../references/ANIMATION_PATTERNS.md) — 15 核心动画模式方法论
