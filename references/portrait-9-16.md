# Portrait 9:16 — Hard Rules

> 这套规则只在 `ASPECT_RATIO = portrait` 时生效。横版 16:9 走 STRUCTURE_PRESETS.md / structures-landscape。
> 9:16 不是把 16:9 塞进竖框 —— 是另一套布局语言：纵向流、单列叙事、主语在上、详情在下。

## 1. Canvas & viewBox 标准

- **Slide HTML viewport**: `width: min(100vw, calc(100vh * 9 / 16)); height: 100vh; aspect-ratio: 9 / 16; margin: 0 auto;`
- **SVG viewBox**: `viewBox="0 0 720 1280"`（不是 1400×788 旋转过来 —— 重新算）
- **PDF 导出像素**: 720×1280（`scripts/html_to_pdf.py --portrait` 自动处理）
- **手机原生分辨率**: iPhone 15 Pro 1179×2556、小米 14 1200×2670 —— 用 9:16 比例 = 兼容所有
- **小红书 / 抖音 / Discord 安全区**: 最外圈留 40px padding，避免被 UI 遮

## 2. 三段式安全区（必守）

```
0    ────────────────────  720
│    [TOP HEADER  y:0-160]    ← 标题 + 副标题，顶部 60px 安全
│                             ← 平台 UI（小红书 share、抖音 caption）会盖
│    
│    [HERO CONTENT y:180-1080] ← 主体，900px 高度，是 16:9 的 1.5 倍
│                              ← 单列叙事 / 顶天立地 / 留白多
│                              ← 大图、大字、大数字都在这里
│
│    [BOTTOM FOOTER y:1100-1280] ← 品牌 / 编号 / 翻页提示
│                                ← 平台 UI（点赞栏、评论栏）会盖
1280 ────────────────────  720
```

**绝不能**：
- 把横版 7 节点 timeline 直接缩成 720 宽 —— 字会塌成 8px 不可读
- 在 y > 1100 放正文（会被翻页 hint 或平台 UI 遮）
- 在 y < 60 放正文（被状态栏 / 头部 UI 遮）

## 3. 字号基准（720 宽 SVG 内）

| 用途 | 横版 (1400 宽) | 竖版 (720 宽) | 说明 |
|---|---|---|---|
| 主标题 | 20px | 36px | 竖版字号要明显加大，否则在手机上看不清 |
| 副标题 | 12px | 18px | |
| 节点标题 | 11px | 22px | 卡片更宽（可达 600px），字也跟着大 |
| 卡片正文 | 10px | 18px | |
| 数字大字 | 20-26px | 56-88px | 竖版数字至少翻倍，撑场子 |
| 标签 caption | 8-9px | 13-14px | 最小不低于 13px |
| Footer 编号 | 9px | 12px | |

**HTML 正文（非 SVG）**：`html { font-size: 170%; }` 仍然适用，但 9:16 viewport 下：
- `--title-size: clamp(2rem, 7vw, 4rem)`（vw 在 9:16 下数值小，需要更大系数）
- `--body-size: clamp(0.95rem, 2.5vw, 1.4rem)`
- `--stat-size: clamp(3rem, 12vw, 7rem)`

## 4. 布局语法 —— 9:16 是纵向流

### 4.1 单列优先
- 720 宽不够做 3 列对比，硬做就字塌
- 除非每列内容极少（< 4 个字），否则**全部改成纵向上下排**
- 二元对比 `binary-comparison`：左右 → 上下，中间 VS badge 可以保留

### 4.2 时间线 —— 横线变竖线
- 横版：`x` 从 80 → 1320，节点沿 x 排开
- 竖版：`y` 从 200 → 1080，节点沿 y 排开（节点间距 ≥ 130px）
- 节点上下交替伸出卡片（左/右），或者单边统一（推荐右侧伸出，左侧只放年份/标签）

### 4.3 漏斗 —— 上宽下窄天然适合 9:16
- 漏斗本来就竖向，9:16 是它的母语
- 横版 4 层漏斗 width 从 600 → 200；竖版可以做 5-6 层 width 从 600 → 150，更夸张
- 转化率数字放右侧，每层一行

### 4.4 中心辐射 hub-spoke —— 垂直化
- 横版：hub 居中，6 spoke 放射四周
- 竖版：hub 顶部（y=320，r=110），spokes 在下方做 2×3 网格
- 或者：hub 中央（y=640），上下各 3 个 spoke

### 4.5 卡片网格
- 横版 3×2 = 6 卡片 → 竖版 2×3 = 6 卡片
- 单卡 max-width 320px，间距 24px
- 卡片内：图标 64px + 标题 22px + 正文 16px 三行

## 5. 横版 → 竖版迁移决策表

| 横版结构 | 竖版策略 | 优先级 |
|---|---|---|
| 01-funnel 漏斗 | 直接竖（本来就竖向）| ★★★ |
| 02-hub-spoke 中心辐射 | hub 顶部 + spokes 2×3 网格 | ★★ |
| 03-iceberg 冰山 | 直接竖（水面横切）| ★★★ |
| 04-bridge 转型之桥 | S 曲线纵向 | ★★ |
| 05-radar-chart 雷达 | 缩小 + 数据列表在下 | ★ |
| 07-bento-grid 格子仪表盘 | 2×3 / 3×2 重排 | ★★ |
| 08-comparison-matrix 多维矩阵 | 改成上下分组 + 短表格 | ★ |
| 09-circular-flow 循环 | 直接竖（圆居中）| ★★ |
| 10-hierarchical-layers 层级堆叠 | 直接竖（堆叠本来就纵向）| ★★★ |
| 11-linear-progression 线性进程 | 横线 → 竖脊柱时间线 | ★★★ |
| 12-swot-analysis SWOT | 2×2 → 上下 4 块 | ★★ |
| 14-tree-branching 树状 | 横向树 → 纵向树（根在上）| ★★ |
| 15-winding-roadmap 蜿蜒路线 | S 曲线竖版 | ★★ |
| 16-story-mountain 故事山 | 弧线竖排 | ★ |
| 17-structural-breakdown 结构拆解 | 中心 + 上下放射 | ★ |
| 18-dense-modules 密集模块 | 4 层垂直堆叠 + 单列模块 | ★★★ |
| 19-periodic-table 周期表 | 4 列 × 6 行（保持网格）| ★★ |
| 20-comparison-table 对比表 | 维度作为竖列，少于 5 维 | ★ |
| 21-binary-comparison A vs B | 上下分屏 + 中央 VS | ★★ |
| 22-jigsaw 拼图 | 6 块 2×3 重排 | ★ |

★★★ = 9:16 比 16:9 更合适，优先做  
★★  = 可以转，但要重新布局  
★   = 数据维度太多/横向叙事强烈，建议拆成多页 9:16

## 6. 必守字段（与横版一致，复制即可）

所有 9:16 SVG 都保留这些公共元素（位置改成竖版坐标）：

```svg
<!-- 左上版本标 -->
<text x="30" y="30" font-family="JetBrains Mono" font-size="12" fill="#c4a35a" opacity="0.35" letter-spacing="2">IMPECCABLE · v2</text>

<!-- 右上 corner ring（编号位置改成 x="660"）-->
<g id="cornerRing" transform="translate(660, 50)">
  <circle r="26" fill="none" stroke="#c4a35a" stroke-width="0.6" opacity="0.3"/>
  <circle id="ringInner" r="18" fill="none" stroke="#c4a35a" stroke-width="0.4" opacity="0.35" stroke-dasharray="3,4"/>
  <circle r="10" fill="#c4a35a" opacity="0.08"/>
  <text y="5" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="#c4a35a" opacity="0.6">P11</text>
</g>

<!-- Header (居中 x=360) -->
<text x="360" y="80" text-anchor="middle" font-family="Noto Serif SC" font-size="36" font-weight="700" fill="#c4a35a" opacity="0" class="title">主标题</text>
<text x="360" y="116" text-anchor="middle" font-family="Space Grotesk" font-size="18" fill="#e8e4df" letter-spacing="4" opacity="0" class="subtitle">SUBTITLE</text>

<!-- Footer (y=1255 左 + y=1255 右) -->
<text x="30" y="1255" font-family="JetBrains Mono" font-size="11" fill="#c4a35a" opacity="0.35" letter-spacing="1">STR-PORTRAIT-NN / REV.A</text>
<text x="690" y="1255" text-anchor="end" font-family="JetBrains Mono" font-size="11" fill="#c4a35a" opacity="0.35" letter-spacing="1">9:16 PORTRAIT</text>

<!-- Background grid + scan line（与横版一致，宽度 720、高 1280）-->
<rect width="720" height="1280" fill="#0a0a0b"/>
<rect width="720" height="1280" fill="url(#gridLarge)"/>
<rect id="scanLine" x="-200" y="8" width="200" height="1264" fill="url(#scanGrad)" clip-path="url(#mainClip)" opacity="0.8"/>
<!-- mainClip: <rect x="8" y="8" width="704" height="1264"/> -->
```

## 7. 多页 9:16 deck —— 滑动而非翻页

横版多页 deck 是水平箭头键翻页，9:16 在手机上更自然的是**纵向滑动**：

```css
html { scroll-snap-type: y mandatory; }
.slide { 
  width: min(100vw, calc(100vh * 9 / 16));
  height: 100vh;
  scroll-snap-align: start;
  margin: 0 auto;
}
```

JS 监听 `wheel` / `touchmove` 自动 snap。键盘 ↑↓ / Space / PgUp/PgDn 都要支持。

## 8. 常见踩坑

| 坑 | 表现 | 对策 |
|---|---|---|
| 字号没放大 | 标题在手机上比 caption 还小 | 9:16 字号是 16:9 的 1.6-2 倍 |
| viewBox 旋转复用 | 用 `viewBox="0 0 788 1400"` 把 16:9 旋转过来 | **永远重新算成 720×1280**，不要旋转 |
| 卡片过宽 | 单卡占满 720 宽，文字一行散乱 | 单卡 max-width 600，左右各留 60 padding |
| 横向多列硬塞 | 3 列对比每列 200 宽，字塌成 8px | 改成单列上下排 |
| Footer 撞翻页 hint | y=1240 的 footer 被翻页提示遮 | footer y ≤ 1255，翻页 hint 放外面 |
| Chrome PDF 横纵搞反 | 输出 1280×720 而不是 720×1280 | 用 `--portrait` 旗标，不要手动改 PDF 配置 |
| 动画时长跟横版一样 | 竖版滑动节奏比横版翻页快，长动画显拖 | duration 整体压缩 0.7-0.8 倍 |
| Hub 在中央被裁 | hub 圆 r=80 放 y=640，上下卡片挤不下 | hub 顶部（y=320）让出下方 900px 给内容 |
| 装饰线穿过文字 | 中央加竖向 spine / connector 线（哪怕 opacity 0.15）会穿过层内 caption | 内容区不要画装饰线；视觉层级靠层宽/位置/色彩表达，不靠贯穿线 |
| 连线先画后才出端点 | hub-spoke 类结构 connectors 先 draw-on，spokes 后 pop-in —— 视觉上"线指向虚空"再凭空冒出端点 | **endpoints first**：spokes 先出 (back.out 1.7 stagger) → connectors 才往外画到 spoke 圆边 |
| Rail / 边栏标签紧贴主体 | 在 layer rect 旁 30-50px 内放 axis 标签，视觉上贴边 | 要么删掉（信息冗余），要么间距 ≥ 80px |

## 9. 自查清单（生成后必跑）

- [ ] viewBox 是 `0 0 720 1280`（不是其他比例）
- [ ] 主标题字号 ≥ 32px（SVG 内）
- [ ] 卡片正文字号 ≥ 16px（SVG 内）
- [ ] 任何文字不出 y=60 顶 / y=1220 底
- [ ] 没有 3 列以上的横向布局
- [ ] cornerRing 在右上 x=660 附近，不出框
- [ ] Footer y=1255，左右两端
- [ ] HTML wrap 用 `width: min(100vw, calc(100vh * 9 / 16))` 锁 9:16
- [ ] PDF 导出命令包含 `--portrait`

## 10. 何时不该用 9:16

- 数据维度 ≥ 5 的对比矩阵 —— 改成多页 9:16 或保持 16:9
- 横向时间线超过 8 个节点 —— 换横版
- 仪表盘需要并排展示 6+ KPI —— 改成 16:9 的 dashboard
- 论文/报告类长文本 —— 用 docforge PDF 而不是 9:16 slide
