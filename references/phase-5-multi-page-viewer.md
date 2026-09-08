# Phase 5 · Multi-Page Viewer · 演讲翻页 + 手机端优化

> 当用户生成的 deck 是**多个独立 slide HTML** 的集合（如 `samples/S01-xxx.html`、`S02-xxx.html`...），需要一个 `index.html` 统一容器，支持：
> - 键盘 ← → 翻页 / 空格 / Home End
> - 手机端左右滑动翻页（swipe · 不显示按钮）
> - 目录抽屉（按 O 展开）
> - 进度条 / 页码 / 全屏（F）
> - 横竖屏都保持 16:9 比例（iframe 里 SVG 的 `object-fit:contain` 会自动 letterbox）

## 什么时候用

只要 deck 结构是 "一个 HTML = 一页" 的多页形态（而不是 single-file multi-slide），都应该建一个 `index.html` 包装起来。单页 swipe deck（`.slide` 全在同一个 HTML）不需要。

## 关键设计决策

1. **iframe 加载模式** — 每页独立 HTML 独立 JS，iframe 切 src 切页。避免 29 个 IIFE 全局污染 + ID 冲突。
2. **Swipe zones · 边缘触滑** — 屏幕左右边缘各 15vw（mobile 28vw）作为 swipe zone，z-index 覆盖 iframe。中央留给 iframe 交互（视频播放 / 链接点击）。
3. **Touch device 检测** — `@media (hover: none) and (pointer: coarse)` 隐藏 nav 按钮，让手机只靠 swipe。
4. **Viewport** — `width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover`（锁定缩放 + 处理刘海屏）
5. **100dvh** — 用 `height: 100dvh` 替代 `100vh`，处理 mobile 地址栏出现/消失导致的 viewport 高度变化。

## 完整模板

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<title>[DECK TITLE]</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body{background:#f4f1e8;overflow:hidden;height:100vh;height:100dvh;position:relative;font-family:'Noto Sans SC',-apple-system,sans-serif;-webkit-user-select:none;user-select:none;touch-action:pan-y}
.deck{width:100vw;height:100vh;height:100dvh;position:relative}
.slide-frame{width:100%;height:100%;border:none;display:block;transition:opacity 0.35s ease}
.slide-frame.loading{opacity:0.3}

/* Swipe zones · 触屏边缘翻页 · z-index 覆盖 iframe */
.swipe-zone{position:fixed;top:0;bottom:0;width:15vw;z-index:60;background:transparent;touch-action:pan-y}
.swipe-zone.left{left:0}
.swipe-zone.right{right:0}

/* Progress bar */
.progress-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#3a9687,#4db0a0);z-index:100;transition:width 0.4s ease;box-shadow:0 0 8px rgba(58,150,135,0.5)}

/* Counter */
.counter{position:fixed;bottom:16px;right:24px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#7a7268;letter-spacing:2px;z-index:100;opacity:0.75;pointer-events:none;background:rgba(244,241,232,0.6);padding:4px 10px;border-radius:3px;border:0.5px solid rgba(122,114,104,0.2)}

/* Nav buttons · desktop only */
.nav-btn{position:fixed;top:50%;transform:translateY(-50%);width:46px;height:46px;background:rgba(58,150,135,0.1);border:1px solid rgba(58,150,135,0.28);border-radius:50%;cursor:pointer;z-index:100;opacity:0.35;transition:opacity 0.25s,background 0.25s;font-family:'Noto Sans SC',sans-serif;font-size:26px;color:#3a9687;display:flex;align-items:center;justify-content:center;user-select:none;line-height:1;padding-bottom:3px}
.nav-btn:hover{opacity:0.95;background:rgba(58,150,135,0.22)}
.nav-btn:active{transform:translateY(-50%) scale(0.92)}
.nav-btn.prev{left:20px}
.nav-btn.next{right:20px}
.nav-btn:disabled{opacity:0.12;cursor:not-allowed}

/* Help · bottom left */
.help{position:fixed;bottom:16px;left:24px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#7a7268;letter-spacing:2px;z-index:100;opacity:0.55;pointer-events:none}

/* Title label · top left */
.title-label{position:fixed;top:14px;left:24px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#3a9687;letter-spacing:3px;z-index:100;opacity:0.65;pointer-events:none}

/* Outline drawer · O to toggle */
.outline{position:fixed;top:0;right:0;width:320px;height:100vh;background:rgba(244,241,232,0.98);border-left:1px solid rgba(122,114,104,0.2);z-index:200;transform:translateX(100%);transition:transform 0.35s ease;padding:50px 24px 20px;overflow-y:auto;backdrop-filter:blur(8px)}
.outline.open{transform:translateX(0)}
.outline h3{font-family:'Noto Sans SC',sans-serif;font-size:13px;color:#3a9687;margin-bottom:16px;letter-spacing:3px;font-weight:600}
.outline ul{list-style:none}
.outline li{font-size:12px;color:#1a1714;padding:7px 10px;border-radius:3px;cursor:pointer;margin-bottom:2px;transition:background 0.2s;display:flex;gap:10px;align-items:baseline}
.outline li:hover{background:rgba(58,150,135,0.1)}
.outline li.active{background:#3a9687;color:#f4f1e8}
.outline li .num{font-family:'JetBrains Mono',monospace;font-size:10px;color:#7a7268;min-width:24px}
.outline li.active .num{color:#f4f1e8;opacity:0.85}
.outline-toggle{position:fixed;top:14px;right:24px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#3a9687;letter-spacing:2px;z-index:201;background:rgba(58,150,135,0.1);border:1px solid rgba(58,150,135,0.28);padding:4px 10px;border-radius:3px;cursor:pointer;opacity:0.7;transition:opacity 0.2s}
.outline-toggle:hover{opacity:1}

/* Mobile · 触屏只靠 swipe · 隐藏 nav 按钮 */
@media (hover: none) and (pointer: coarse), (max-width: 768px){
  .nav-btn{display:none}
  .title-label{display:none}
  .help{font-size:9px;letter-spacing:1px;bottom:10px;left:14px;max-width:calc(100vw - 120px);line-height:1.4}
  .counter{font-size:10px;bottom:10px;right:14px;padding:3px 7px;letter-spacing:1.5px}
  .outline-toggle{top:10px;right:12px;font-size:9px;padding:3px 8px;letter-spacing:1.5px}
  .outline{width:min(85vw,320px)}
  .swipe-zone{width:28vw}
}
@media (max-width: 480px){ .help{display:none} }

/* Landscape · max space for slide */
@media (orientation:landscape) and (max-height:500px){ .help,.title-label{display:none} }
</style>
</head>
<body>
<div class="deck">
  <iframe id="slideFrame" class="slide-frame" src="[FIRST_SLIDE_PATH]"></iframe>
</div>

<div class="progress-bar" id="progressBar"></div>
<div class="swipe-zone left" aria-hidden="true"></div>
<div class="swipe-zone right" aria-hidden="true"></div>
<button class="nav-btn prev" id="navPrev" onclick="prev()" title="上一页 (←)">‹</button>
<button class="nav-btn next" id="navNext" onclick="next()" title="下一页 (→)">›</button>
<div class="counter" id="counter">01 / XX</div>
<div class="help">← → 翻页  ·  F 全屏  ·  O 目录  ·  手机左右滑</div>
<div class="title-label">[DECK TITLE]</div>
<button class="outline-toggle" onclick="toggleOutline()">目录 · O</button>

<aside class="outline" id="outline">
  <h3>[DECK TITLE] · XX PAGES</h3>
  <ul id="outlineList"></ul>
</aside>

<script>
const slides = [
  ['页 1 标题', 'samples/S01-xxx.html'],
  ['页 2 标题', 'samples/S02-xxx.html'],
  // ...
];

let idx = 0;
const frame = document.getElementById('slideFrame');
const counter = document.getElementById('counter');
const progressBar = document.getElementById('progressBar');
const navPrev = document.getElementById('navPrev');
const navNext = document.getElementById('navNext');
const outline = document.getElementById('outline');
const outlineList = document.getElementById('outlineList');

slides.forEach(([title, path], i) => {
  const li = document.createElement('li');
  li.innerHTML = `<span class="num">${String(i+1).padStart(2,'0')}</span><span>${title}</span>`;
  li.onclick = () => { show(i); outline.classList.remove('open'); };
  outlineList.appendChild(li);
});

function show(i){
  if(i < 0 || i >= slides.length) return;
  idx = i;
  frame.classList.add('loading');
  frame.src = slides[i][1];
  counter.textContent = `${String(i+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  progressBar.style.width = `${(i+1)/slides.length*100}%`;
  navPrev.disabled = i === 0;
  navNext.disabled = i === slides.length - 1;
  outlineList.querySelectorAll('li').forEach((li, j) => li.classList.toggle('active', j === i));
}
function next(){ show(Math.min(idx + 1, slides.length - 1)); }
function prev(){ show(Math.max(idx - 1, 0)); }
function toggleOutline(){ outline.classList.toggle('open'); }

// Keyboard handler · 抽成函数以便父 + iframe document 都绑定
function handleKeydown(e){
  if(e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  switch(e.key){
    case 'ArrowRight': case ' ': case 'PageDown': case 'Enter':
      next(); e.preventDefault(); break;
    case 'ArrowLeft': case 'PageUp': case 'Backspace':
      prev(); e.preventDefault(); break;
    case 'Home': show(0); e.preventDefault(); break;
    case 'End': show(slides.length - 1); e.preventDefault(); break;
    case 'f': case 'F':
      if(document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
      break;
    case 'o': case 'O': toggleOutline(); break;
    case 'Escape':
      if(outline.classList.contains('open')) outline.classList.remove('open');
      break;
  }
}
document.addEventListener('keydown', handleKeydown);

// CRITICAL · iframe keydown 绑定
// 用户鼠标点过 iframe 内容（视频/按钮/链接）后焦点跑进 iframe,
// 此后方向键事件由 iframe 内部处理，不会冒泡到父页面 → 方向键"失效"。
// 解决：在 iframe 的 contentDocument 上也绑一份同样的 handler。每次切页（load）重新绑定。
function bindFrameKeys(){
  try {
    const doc = frame.contentDocument;
    if(!doc) return;
    doc.removeEventListener('keydown', handleKeydown);  // 防重复
    doc.addEventListener('keydown', handleKeydown);
  } catch(err) { /* cross-origin · ignore */ }
}
frame.addEventListener('load', () => {
  frame.classList.remove('loading');
  bindFrameKeys();
});
bindFrameKeys();  // initial bind (iframe 可能在脚本执行时已 load 完)

// Touch swipe · 手机左右滑翻页 · 阈值 40px · 800ms · 水平 > 垂直 1.2×
let touchStartX = 0, touchStartY = 0, touchStartTime = 0, touchTracking = false;
function onTouchStart(e){
  const t = e.changedTouches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
  touchStartTime = Date.now();
  touchTracking = true;
}
function onTouchEnd(e){
  if(!touchTracking) return;
  touchTracking = false;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  const dt = Date.now() - touchStartTime;
  if(dt < 800 && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2){
    if(dx < 0) next(); else prev();
  }
}
['.swipe-zone', 'body'].forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', () => { touchTracking = false; }, { passive: true });
  });
});

show(0);
</script>
</body>
</html>
```

## 为什么 swipe zones 而不是全屏 swipe

**iframe 事件隔离**：iframe 里的 touch 事件不会冒泡到 parent document。所以 parent 的 touch listener 只能接收不在 iframe 上的 touch。

**设计权衡**：
- **全屏 swipe** (swipe zone 占 100vw)：iframe 完全无法接收触摸 → S14 视频页无法点播 / 链接无法点击 → ❌
- **边缘 swipe** (15vw/28vw)：中间 70-44vw 留给 iframe 交互（视频、链接、按钮） → ✓

**推荐尺寸**：
- Desktop: `15vw` 边缘（避免误触，主要靠键盘）
- Mobile: `28vw` 边缘（约 1/4 屏幕，手指舒服够得到）

## 关键 Do / Don't

- ✅ **DO**: 把 keydown handler 抽成命名函数，**同时**绑到 `document` 和 `frame.contentDocument`（iframe 同源才可以）。否则用户点过 iframe 内容后焦点跑进 iframe，方向键就失效。
- ✅ **DO**: 每次 iframe `load` 都重新 `bindFrameKeys()`（切页会换 contentDocument）。
- ✅ **DO**: 用 `@media (hover: none) and (pointer: coarse)` 检测触屏设备，不要只用 `max-width: 768px`（iPad Pro landscape 1024px 宽但是触屏）
- ✅ **DO**: swipe zones 用 `touch-action: pan-y` 允许垂直滚动
- ✅ **DO**: `height: 100dvh` 而不是 `100vh`（mobile viewport 会变）
- ✅ **DO**: Keyboard 和 swipe 共存（桌面 + 触屏都能用）
- ❌ **DON'T**: 只在父 `document` 绑 keydown（iframe focus 后就失效，是本 skill 最常踩的坑）
- ❌ **DON'T**: 用全屏 overlay 捕获所有 touch（iframe 交互全废）
- ❌ **DON'T**: 依赖 `e.preventDefault()` 在 `passive: true` listener 里（会报错）
- ❌ **DON'T**: swipe 阈值 < 30px（误触频繁）· > 80px（用户要用力滑）

## Deploy 流程

1. 本地 stage：把 `index.html` + `samples/` + `assets/` copy 到 `/tmp/<slug>-stage/`（排除 `pdf-pages/`、`pdf-temp/`、`export-pdf.*`、本地编辑临时文件）
2. rsync 到服务器：`rsync -avz /tmp/<slug>-stage/ xiuhe-cloud:/tmp/<slug>-stage/`
3. 服务器：`sudo rsync -a --delete /tmp/<slug>-stage/ /var/www/html/<slug>/`
4. nginx location block：`sudo sed -i '/^}/i \    location /<slug>/ { alias /var/www/html/<slug>/; index index.html; }' /etc/nginx/sites-enabled/<site>`
5. `sudo nginx -t && sudo systemctl reload nginx`
6. 更新 `~/xiu-he/share/DEPLOY_INDEX.md`

URL：`http://<server-ip>/<slug>/`
