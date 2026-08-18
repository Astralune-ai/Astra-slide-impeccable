# Asher's Presentation Preferences

> 这些偏好在使用 Asyre Presentation 技能时**始终生效**，不需要每次重复说明。

## 图标系统
- **用 SVG inline icons**，不用 emoji。SVG 跨平台渲染一致，emoji 在投影仪/不同设备上显示不一致。
- 所有图标走 `<svg><use href="#i-xxx"/></svg>` sprite 系统。
- 除非 Asher 明确要求 emoji，否则永远默认 SVG。

## 背景图
- **每页用不同的概念艺术底图**，按页面内容匹配，绝不能所有页面用同一张图（试过，立刻被否决——"太丑了"）。
- 概念艺术风格：暗黑底 + 金色发光线条（Asyre Dark Gold）。
- 背景图 opacity 通常 0.2-0.4，overlay 0.45-0.6。
- 需要新底图时用 **gemini-3-pro-image-preview** 生成（不用 2.0-flash、2.5-flash-image 等低质量模型——Asher 原话"那些模型都太垃圾了"）。
- 概念艺术 prompt 关键词：`pure black background, golden-amber glowing ethereal light trails, sparks, luminous outlines, dark fantasy game concept art`。

## 文字大小与颜色
- **宁大勿小**。全局 `html { font-size: 170% }` 是基准。
- 颜色变量基准（暗色背景下）：
  - `--fg-primary`: 不低于 `#f0ece7`
  - `--fg-secondary`: 不低于 `#c4bdb4`（原 `#a09a92` 被否决——太暗看不清）
  - `--fg-dim`: 不低于 `#9a928a`（原 `#6b6560` 被否决——深色背景上完全看不见）
- HTML 正文最小 `clamp(0.5rem, 0.72vw, 0.62rem)`（170% 基础上）。
- 生成后自查：在 1280×720 上能不能清晰阅读每一行。

## SVG 图表（关键经验）
- **图表要大**，`max-height` 至少 `clamp(23rem, 50vh, 36rem)`，`min-height` 至少 `clamp(26rem, 55vh, 39rem)`。
- SVG 内文字颜色必须**硬编码亮色**（不走 CSS 变量）：
  - 次要文字用 `fill="#c4bdb4"`，不用 `#a09a92`
  - dim 文字用 `fill="#9a928a"`，不用 `#6b6560`
  - 蓝图标注用 `fill="rgba(196,163,90,0.5)"`，不低于 0.5 opacity
- SVG 内字号基准：最小 12px，标签 13px，标题 14-15px。绝不用 8px 或 9px。
- **连接线**：`stroke-width` 至少 2.5，`stroke-dasharray="8 4"`。1.5px 的线在 900px viewBox 里几乎看不见。
- **箭头三角形**：尺寸至少 12px 跨度（如 `points="250,126 264,132 250,138"`），太小看不见。
- **不要用 glow filter (`filter="url(#gl)"`) 在连接线上**——会把细线吃掉。
- 节点不超过 5-6 个，不要碎片小方块。
- 蓝图风格适配暗金：保留网格背景 `pattern`、JetBrains Mono 标注、版本号、虚线边框场景框，颜色换成金色/红色/绿色。

## 结构图布局
- 三栏对比布局效果好（如 LLM × Prompt → Agent × Context → Harness × Harness），每栏用不同颜色（蓝/金/绿）。
- 上下分区布局效果好（如蒸馏上半 + 反蒸馏下半），用虚线分隔。
- 脊柱图用 SVG 比 CSS div 干净很多。

## 内容准确性
- **不要瞎编产品归类**。涉及产品/公司/人物时，先搜索确认再写入。
  - 反面案例：Midjourney 被错误归类为 Agent、OpenClaw 被标为"自研"——都被立刻指出。
- 城市、公司名、人名等事实性内容必须精准，不能猜。

## 设计风格
- **Asyre Dark Gold** 是默认风格。不要随意"创意重设计"推翻已有设计。
- 改动要渐进式微调，不要一次性大刀阔斧。
- Asher 有自己的审美标准，不喜欢被 AI 的"创意"推着走。
  - 反面案例：LLM 训练页的创意重做被评"非常差"，要求恢复原版。

## 内容组织
- **一页一个概念**，信息密度宁低勿高。
- 每页 density check：标题 + 正文不超过 6-8 行可见文字。
- 如果内容太多，拆成多页，不要挤（Tips 四宫格被要求拆成 4 个独立页面）。
- 路线图类内容可合并一页（三列布局），每列用不同颜色区分。

## 多版本管理
- 同一套素材可以做多个版本：`index.html`（对外/课程版）+ `internal.html`（内部分享版）。
- 内部版：去掉自我介绍、案例展示、破冰互动、Q&A、营销专属内容、课程路线图。
- 通用知识点（信息获取/处理/输出、合规避坑）从营销版搬到内部版时，标签从 "MKT · xxx" 改为 "AI 应用 · xxx"。

## 图片编辑
- 编辑人物照片时**保持原人脸不变**。
- 用 gemini-3-pro-image-preview，参考 Gemini Image Generation 记忆中的代码模板。

## 产品图标
- 优先用 Google Favicon Proxy：`https://www.google.com/s2/favicons?domain=xxx&sz=64`
- 直链不可用时用 proxy 做 fallback（很多直链被 Cloudflare 拦截）。
