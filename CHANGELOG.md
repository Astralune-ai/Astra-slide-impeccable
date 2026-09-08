# CHANGELOG · astra-slide-impeccable

每次踩坑修完写一条：日期 · 改了什么 · 哪次踩的 · 怎么自检。

## 2026-08-29

- **`html_to_pdf.py` 页序改读 `index.html`，不再靠文件名排序**〔P0 · 静默错误〕

  `find_deck_files()` 原来是 `sorted(glob.glob('S*.html'))`，纯文件名排序。
  deck 一旦有插页（`S00b-`、`S03b-`）或调过顺序（论点页 `S01` 要排在市场页 `S02` **之后**），
  文件名顺序 ≠ 播放顺序，**导出的 PDF 页序是乱的而且不报错**——最危险的一类错。

  改法：新增 `order_from_viewer()`，解析 viewer 里的 `const slides = [...]` 拿播放顺序；
  解析不出来（没 index.html / 没数组 / 列的文件缺失）才退回文件名排序，并打印警告。

  **哪次踩的**：2026-08-29 清华来访 13 页 deck。当时的绕法是复制到临时目录按顺序重命名再导，
  原文件不动——能work但每次都要手工摆一遍，所以直接修根因。

  **自检**：跑完看输出那行。`· order from index.html (N slides)` = 对；
  `· order from filename sort` = 去核页序。
  退路已测三种：无 index.html / index.html 无数组 / 数组列了不存在的文件 —— 都能正确回退。

- **新增 `scripts/renumber_deck.py`：插页/换位后重编页码 + 角标**

  每张 slide 烘着两个跟顺序绑定的数字（右上角环编号、右下 `NN / TOTAL · LABEL`），
  插一页后面全错，同样**不报错**。脚本按 `index.html` 数组顺序重编，跟 PDF exporter 同一个真源。

  ```bash
  python3 scripts/renumber_deck.py <deck目录> --dry-run   # 先看
  python3 scripts/renumber_deck.py <deck目录>             # 再写
  ```

  **哪次踩的**：同一个 deck，11 张 → 12 张 → 13 张，页码手写 regex 重编了三轮才想起来该做成工具。

  **自检**：`--dry-run` 输出 `将改 0 个文件` = 页码本来就对。

- **SKILL.md 补 Phase 3-SVG Step 5**：改顺序**只改 `index.html` 的数组**，不重命名文件
  （重命名会打断 `bg/` 相对路径和已有的 preview / PDF 链路）；改完立刻跑 `renumber_deck.py`。
