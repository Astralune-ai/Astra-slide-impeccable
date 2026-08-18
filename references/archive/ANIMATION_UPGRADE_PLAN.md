# Animation Subsystem Upgrade Plan

> Working doc for the animation subsystem upgrade. Delete after Phase 4 收口 is merged into SKILL.md.

## 0. 原则

动画子系统只服务一件事：**让 agent 快速选对效果、干净拿到代码、不用从零编排整场**。三层职责拆干净。

## 1. 目标三层架构

```
┌─ Discovery 层（选） ─ animation-index.json + PATTERNS.md 方法论
├─ Code 层（抽） ─────── animation-snippets.js（按 ID 索引）
└─ Choreography 层（编）─ animation-combos.md（timeline 模板）
                         showcase.html 继续存在，只做视觉浏览
```

## 2. Metadata Schema（每个 cell 的标签）

```yaml
id: 01                         # 稳定 ID（含 A/B/C 后缀）
name: FADE UP
name_zh: 淡入上升
section: entrance              # 11 个 section 之一
purpose: [reveal, layered]     # 信息目的
mood: [soft, corporate]        # 情绪色彩
speed: fast | medium | slow
complexity: basic | intermediate | advanced
plugins: [core] | [DrawSVG, MotionPath, ...]
loop: oneshot | perpetual
performance: light | medium | heavy
applicable_to: [bento-grid, dashboard, hero-title, ...]
pattern_family: stagger-reveal # 对应 PATTERNS.md 15 个模式之一
```

## 3. Combo Schema（编排模板）

```yaml
combo_id: dashboard-reveal
structure: dashboard
mood: corporate
duration_total: 3.5s
timeline:
  - t: 0.0s, effect: 46, target: "#title"       # typewriter
  - t: 0.3s, effect: 34, target: ".scan-v"      # scan-line-v loop
  - t: 0.8s, effect: 07, target: ".card"        # stagger grid
  - t: 1.4s, effect: 21, target: ".stat"        # counter
  - t: 2.0s, effect: 22, target: ".bar"         # bar-growth
  - t: 2.8s, effect: 35, target: ".focus"       # breathing loop
notes: "effect 35 只用 1-2 个焦点 cell，不是全部"
```

目标产出 **8-12 个 combo** 对应 24 个 structure 的常见组合。

## 4. 最终文件结构

```
next-slide-impeccable/
├── SKILL.md                    # 动画规则段收口重写
├── ANIMATION_PATTERNS.md       # 改定位：方法论 + 编排原则（不是索引）
├── animation-showcase.html     # 保留，视觉浏览器角色
├── animation-index.json        # 新，110 cell 的 metadata
├── animation-snippets.js       # 新，ID 索引的代码片段
└── animation-combos.md         # 新，timeline 编排库
```

## 5. 五条 Track 落到具体交付物

| Track | 交付物 | 执行者 |
|-------|--------|--------|
| **A 质量提纯** | showcase.html 内淘汰/升级过的 cell + change log | 我 |
| **B 可检索性** | animation-index.json 全量 metadata | Subagent 起草 → 我审 |
| **C 编排组合库** | animation-combos.md（8-12 combo） | 我 |
| **D 代码可抽取** | animation-snippets.js + showcase.html 瘦身 | Subagent 起草 → 我审 |
| **E 补缺口** | 5-10 个新 cell（ID 101+）含 metadata + snippet | 我 |

## 6. 执行顺序（依赖关系）

```
Phase 1 并行：  A (culling)  ‖  D (extract code)  ‖  E (draft new effects)
                        ↓ 都完成后
Phase 2 串行：  B (tag metadata on final set)      ← subagent
                        ↓
Phase 3 串行：  C (design combos using final set)  ← 我
                        ↓
Phase 4 收口：  SKILL.md §动画自动选取规则 重写
```

D 起草时提取全部 110 个；Phase 1 结束后按 A 的裁决删除 kill 的 snippet，按 E 补入新增的。

## 7. 验收门

- **每 Phase 结束**：浏览器打开 showcase，确认动画跑、无 JS 报错
- **最终门**：3 个样例 prompt（pitch deck / dashboard / story arc）端到端测 agent 选择链路通不通

## 8. 时间预估

Phase 1: ~1.5h（并行）· Phase 2: ~1h（含审） · Phase 3: ~1h · Phase 4: ~30min · 总 ~4h
