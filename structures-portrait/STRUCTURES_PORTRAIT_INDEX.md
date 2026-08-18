# Portrait Structures · Canonical 9:16 Reference Set

> 8 个 9:16 (720×1280) 结构图参考库，全部跑通 + 自查通过。
> `ASPECT_RATIO = portrait` 时，**先来这里找模板**，不要去 `../structures/` 拿 16:9 的硬塞。
> 这里没有的结构 → 读 [../references/portrait-9-16.md](../references/portrait-9-16.md) §5 迁移决策表，从最接近的横版改写。
> **绝不要把 16:9 viewBox 旋转复用** —— 重新算 720×1280 坐标。

## 使用方式

1. 用户要求生成某种结构图，且已确认是 9:16
2. 查下表，匹配结构 → 打开对应 `NN-name-portrait.html`
3. **保留**：viewBox 720×1280、cornerRing 在 (660,50)、Header y=80-160、Footer y=1255、垂直 scan line、GSAP 动画 timeline、所有 9:16 安全区
4. **只换**：title / subtitle 文案、内容文字、数据、色值（如果品牌变化）
5. 改完后过一遍 [portrait-9-16.md](../references/portrait-9-16.md) §9 自查清单

## 公共约定（所有 portrait 文件共享）

- Canvas: `viewBox="0 0 720 1280"` (9:16 严格)
- 风格: Astra Dark Gold · 背景 `#0a0a0b` + grid pattern
- 字体: Noto Serif SC (CJK display) · Space Grotesk (EN display) · JetBrains Mono (tech caption)
- HTML wrap: `width: min(100vw, calc(100vh * 9 / 16))` letterbox 居中
- 角标: 右上 cornerRing **(660, 50)** with ringInner 无限旋转 + 当前文件编号 `P0X`
- 左上版本标: `IMPECCABLE · v2` (font 12, opacity 0.35, letter-spacing 2)
- Footer: 左 `STR-PORTRAIT-NN / REV.A` + 右 `9:16 · STRUCTURE NAME` (y=1255)
- Filter region: 与 16:9 一致 `x="-50%" y="-50%" width="200%" height="200%"`；stdDeviation≥4 用 `-75%/250%`，stdDeviation≥6 用 `-100%/300%`
- Scan line: **垂直方向**（top → bottom 扫描），不是横版的 left → right
- GSAP timeline 惯例: title/subtitle/title2 淡入 → 主体 stagger（top → bottom，部分逆向）→ stats/counter → perpetual

## 8 个文件索引

| # | 文件 | Preset | 类别 | 中文名 | 关键固化点 |
|---|---|---|---|---|---|
| 01 | [01-linear-progression-portrait.html](01-linear-progression-portrait.html) | #13 | flow | 线性进程（竖版时间线）| 垂直 spine x=140 / 6 节点 y=220-1080 / 卡片右侧 / NOW marker 在第 5 节点 / 粒子沿 spine 下落 |
| 02 | [02-dense-modules-portrait.html](02-dense-modules-portrait.html) | #21 | data | 密集模块（5 层堆叠）| 5 横向 layer 每层 y=160 高 / 每层 3 模块横排 / 底部 stats bar y=1100 / 全 GSAP 呼吸 |
| 03 | [03-funnel-portrait.html](03-funnel-portrait.html) | #2 | flow | 漏斗 | 5 层梯形 widths [560/476/392/308/224/140] 居中 x=360 / 右侧流失箭头 / glass-gradient 液态质感 |
| 04 | [04-hub-spoke-portrait.html](04-hub-spoke-portrait.html) | #3 | hierarchy | 中心辐射 | hub (360,380) r=110 + 6 spokes 2×3 网格 y=720/970 / 连线端点严守圆边 (cx±R·cos/sin) / hub softGlow |
| 05 | [05-hierarchical-layers-portrait.html](05-hierarchical-layers-portrait.html) | #11 | hierarchy | 层级堆叠 | 5 单层条 widths 540→460 (倒金字塔) / **bottom-to-top stagger** (`from: 'end'`) / maturity 4-dot indicator / 顶层 L5 softGlow 强调 emergent |
| 06 | [06-comparison-portrait.html](06-comparison-portrait.html) | #8 | compare | 二元对比 | A 上 (红 #a85c5c) y=200-630 + VS 八角徽章 y=660 (bounce.out from y=-500) + B 下 (绿 #5ca870) y=690-1120 / 6 维度行 ✗/✓ |
| 07 | [07-story-mountain-portrait.html](07-story-mountain-portrait.html) | #19 | narrative | 故事山 | 垂直 S-curve spine / 5 节点 y=240/440/640/860/1060 / **Act 3 (climax) r=80 + softGlow + 当前位置** / 卡片左右交替 / 背景 mountain arc 弱化叠加 |
| 08 | [08-iceberg-portrait.html](08-iceberg-portrait.html) | #4 | narrative | 冰山 | 水面 y=440 横切 / 上 3 (warm gold #e8b870) / 下 7 (cool blue #7a9aba) / 水下 gradient op 0.78→0.97 杀掉 grid / 14 气泡 rAF 上升 clip-path 杀于水面 / 底部 stats 30%/70% |

## 常见复用场景映射

| 用户说 | 读哪个参考 | 换什么 |
|---|---|---|
| "竖版项目时间线 / 9:16 路线图 / 小红书时间线" | 01-linear-progression-portrait | 节点年份 + 标题 + 三行细节 |
| "竖版技术栈 / 9:16 系统架构 / 手机看的层级图" | 02-dense-modules-portrait | 5 层名 + 每层 3 模块 |
| "竖版漏斗 / 9:16 转化率 / 营销漏斗手机版" | 03-funnel-portrait | 5 层名 + 百分比 + 绝对数 |
| "竖版中心辐射 / 9:16 组织架构 / 平台能力辐射" | 04-hub-spoke-portrait | hub 名 + 6 spoke 名 |
| "竖版能力栈 / 9:16 技能阶梯 / 自下而上构建" | 05-hierarchical-layers-portrait | 5 层名 + 成熟度评级 |
| "竖版对比 / 9:16 A vs B / 友商对比手机版" | 06-comparison-portrait | A/B 名 + 6 维度数据 |
| "竖版叙事 / 9:16 创业故事 / 旅程弧线" | 07-story-mountain-portrait | 5 幕名 + 时间戳 + 描述 |
| "竖版冰山 / 9:16 表象 vs 根因 / 隐藏问题" | 08-iceberg-portrait | 3 上 + 7 下条目 |

## 9:16 vs 16:9 关键差异速查

| 维度 | 16:9 横版 | 9:16 竖版 |
|---|---|---|
| viewBox | `0 0 1400 788` | `0 0 720 1280` |
| 主标题字号 | 20px | 34-36px |
| 卡片正文字号 | 10px | 14-16px |
| 时间线方向 | 横线 (x=80→1320) | 竖线 (y=220→1080) |
| 节点数上限 | 7-8 | 5-6 |
| 卡片宽度 | ~180px | 260-500px |
| 卡片高度 | ~160px | 120-150px |
| Scan line 方向 | 水平 (x:left→right) | 垂直 (y:top→bottom) |
| cornerRing 位置 | (1340, 40) | (660, 50) |
| Footer y | 768 | 1255 |
| 横向 grid 列数 | 3-4 | 1-2（≥3 字会塌） |
| 多列对比 | 左右 panel | 上下 panel + 中央 VS badge |

## 还没做但可以从 16:9 改写的结构

下面这些 16:9 结构现在没有 portrait 版本。需要 9:16 时按 [portrait-9-16.md](../references/portrait-9-16.md) §5 迁移决策表改写：

| 16:9 原结构 | 9:16 改写思路 | 优先级 |
|---|---|---|
| 05-radar-chart 雷达 | 缩小图表 + 数据列表移到下方 | ★ |
| 06-dashboard 仪表盘 | 拆成多个 9:16 KPI 卡片 deck | ★ |
| 07-bento-grid-dense 格子仪表盘 | 重排 2×3 / 3×2 改用 02-dense-modules-portrait 的模式 | ★★ |
| 08-comparison-matrix-dense 多维矩阵 | 改成上下分组短表，> 4 维拆多页 | ★ |
| 09-circular-flow 循环 | 直接竖（圆居中）—— 类似 hub-spoke 但环形连线 | ★★ |
| 12-swot-analysis SWOT | 2×2 → 上下 4 块 | ★★ |
| 13-venn-diagram 维恩图 | 缩小 + 数据标签外移 | ★ |
| 14-tree-branching 树状 | 横向树 → 纵向树（根在上）| ★★ |
| 15-winding-roadmap 蜿蜒路线 | S 曲线竖版 (类似 07-story-mountain 的 spine 思路) | ★★ |
| 17-structural-breakdown 结构拆解 | 中心 + 上下放射 | ★ |
| 19-periodic-table 周期表 | 4 列 × 6 行（保持网格）| ★★ |
| 20-comparison-table 对比表 | 维度作为竖列，少于 5 维 | ★ |
| 22-jigsaw 拼图 | 6 块 2×3 重排 | ★ |
| 23-isometric-map 等距地图 | 小图 + 列表注释，> 5 节点拆多页 | ★ |
| 24-comic-strip 漫画格 | 6 panel 2×3 重排 | ★ |

## 延伸规则

- [../references/portrait-9-16.md](../references/portrait-9-16.md) — 9:16 全部硬规则、安全区、字号、迁移决策表、自查清单
- [../references/STRUCTURE_PRESETS.md](../references/STRUCTURE_PRESETS.md) — 24 横版结构详细参数 + 硬规则 0-11（竖版改写时仍要参考的 SVG 通用规则）
- [../references/ASHER_PREFERENCES.md](../references/ASHER_PREFERENCES.md) — Asher 个人偏好（SVG 非 emoji / 大字 / 170% base）
- [../references/ASYRE_BRAND_PRESET.md](../references/ASYRE_BRAND_PRESET.md) — Astra Dark Gold 完整色板 + 字体栈
