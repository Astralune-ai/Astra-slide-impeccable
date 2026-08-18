# Animation Gaps (Track E) — 新效果草案

> Basis: 对照 110 个现有效果 + 常见演示场景，找出真实缺口。每条新效果都必须满足：
> 1. 无法通过组合现有效果简单实现
> 2. 对应真实、高频的演示内容类型
> 3. 代码机制和现有的不重合

## 覆盖度检查（按内容类型）

| 内容类型 | 现有覆盖 | 缺口 |
|---------|---------|------|
| 标题 / hero | 46/49/50/77 ✓ | — |
| 数据图表 | Section 3/10 ✓ | — |
| 时间轴 / 里程碑 | 17/20 覆盖树形，**横向时间轴缺失** | **101 MILESTONE TIMELINE** |
| 对比 / before-after | 83A SPLIT SCREEN ✓ | 数值变化缺失 → **103 DELTA NUMBER** |
| 引语 / 证言 | **完全缺失** | **102 QUOTE REVEAL** |
| 关键词 / 标签云 | 07 STAGGER GRID 只能网格，爆发缺失 | **104 TAG BURST** |
| 对话 / 聊天流 | **完全缺失** | **106 CHAT BUBBLE** |
| 地理 / 地点 | **完全缺失** | **105 MAP PIN DROP** |
| 代码 / 终端 | 46 TYPEWRITER 只是纯文本 | **107 TERMINAL TYPE** |
| 角标 / 奖章 | **完全缺失** | **108 BADGE RIBBON** |

## 放置策略

新增 **Section 12 STORYTELLING · 叙事场景（8）**，IDs 101-108，统一放一起。

理由：这 8 个都是"场景组合级"而非"原子动画"，独立成段比强塞进现有 section 更清晰。

---

## 101 · MILESTONE TIMELINE · 里程碑时间线

**Purpose**: 横向时间轴 L→R 画出，里程碑标记+标签逐个揭示。适合产品路线图、公司大事记、季度规划。

**Distinct from**: 17 ARROW CHAIN（抽象连接线）、20 TREE DRAW（树形层级）— 本条是**时间单向**的刻度轴。

### SVG

```html
<svg viewBox="0 0 180 80">
  <line x1="10" y1="45" x2="170" y2="45" stroke="rgba(196,163,90,0.15)" stroke-width="1" class="mt101line"/>
  <g class="mt101g" data-x="30" data-label="Q1"><circle cx="30" cy="45" r="4" fill="rgba(196,163,90,0.25)" stroke="rgba(196,163,90,0.5)" stroke-width="1" class="mt101m"/><text x="30" y="30" text-anchor="middle" font-size="8" fill="rgba(196,163,90,0.6)" font-family="JetBrains Mono" class="mt101t">Q1</text><text x="30" y="62" text-anchor="middle" font-size="7" fill="rgba(232,228,223,0.4)" font-family="Noto Sans SC" class="mt101d">启动</text></g>
  <g class="mt101g"><circle cx="75" cy="45" r="4" fill="rgba(74,143,212,0.25)" stroke="rgba(74,143,212,0.5)" stroke-width="1" class="mt101m"/><text x="75" y="30" text-anchor="middle" font-size="8" fill="rgba(74,143,212,0.6)" font-family="JetBrains Mono" class="mt101t">Q2</text><text x="75" y="62" text-anchor="middle" font-size="7" fill="rgba(232,228,223,0.4)" font-family="Noto Sans SC" class="mt101d">测试</text></g>
  <g class="mt101g"><circle cx="120" cy="45" r="4" fill="rgba(61,170,90,0.25)" stroke="rgba(61,170,90,0.5)" stroke-width="1" class="mt101m"/><text x="120" y="30" text-anchor="middle" font-size="8" fill="rgba(61,170,90,0.6)" font-family="JetBrains Mono" class="mt101t">Q3</text><text x="120" y="62" text-anchor="middle" font-size="7" fill="rgba(232,228,223,0.4)" font-family="Noto Sans SC" class="mt101d">上线</text></g>
  <g class="mt101g"><circle cx="165" cy="45" r="4" fill="rgba(179,58,58,0.25)" stroke="rgba(179,58,58,0.5)" stroke-width="1" class="mt101m"/><text x="165" y="30" text-anchor="middle" font-size="8" fill="rgba(179,58,58,0.6)" font-family="JetBrains Mono" class="mt101t">Q4</text><text x="165" y="62" text-anchor="middle" font-size="7" fill="rgba(232,228,223,0.4)" font-family="Noto Sans SC" class="mt101d">扩张</text></g>
</svg>
```

### JS

```js
loop(tl=>{
  gsap.set('.mt101line',{strokeDasharray:1,strokeDashoffset:1});
  gsap.set('.mt101m',{scale:0,transformOrigin:'center'});
  gsap.set('.mt101t,.mt101d',{opacity:0,y:5});
  tl.to('.mt101line',{strokeDashoffset:0,duration:1,ease:'power2.inOut'})
    .to('.mt101m',{scale:1,duration:0.3,stagger:0.22,ease:'back.out(2)'},0.3)
    .to('.mt101t',{opacity:1,y:0,duration:0.25,stagger:0.22},0.4)
    .to('.mt101d',{opacity:1,y:0,duration:0.25,stagger:0.22},0.55)
    .to('.mt101line',{strokeDashoffset:-1,duration:0.6,ease:'power2.in'},'+=1.5')
    .to('.mt101m,.mt101t,.mt101d',{opacity:0,duration:0.3},'<');
},1);
```

**applicable_to**: roadmap, timeline, milestone, product-release, quarterly-plan

---

## 102 · QUOTE REVEAL · 引语展开

**Purpose**: 大引号 + 证言文本 + 署名的有序揭示。适合客户证言、名言引用、获奖感言。

**Distinct from**: 46 TYPEWRITER 是纯文本；本条有引号 SVG + 文本 + 署名的**组合构图**。

### SVG

```html
<svg viewBox="0 0 180 80">
  <text x="10" y="30" font-size="32" fill="rgba(196,163,90,0.25)" font-family="Noto Serif SC" font-weight="700" class="qr102lq">"</text>
  <text x="160" y="60" font-size="32" fill="rgba(196,163,90,0.25)" font-family="Noto Serif SC" font-weight="700" text-anchor="end" class="qr102rq">"</text>
  <text x="90" y="40" text-anchor="middle" font-size="11" fill="rgba(232,228,223,0.75)" font-family="Noto Serif SC" class="qr102t">这是我用过最好用的工具</text>
  <text x="90" y="56" text-anchor="middle" font-size="8" fill="rgba(196,163,90,0.5)" font-family="JetBrains Mono" letter-spacing="2" class="qr102a">— CTO, Acme Co.</text>
</svg>
```

### JS

```js
loop(tl=>{
  gsap.set('.qr102lq',{opacity:0,scale:0.3,transformOrigin:'10px 30px'});
  gsap.set('.qr102rq',{opacity:0,scale:0.3,transformOrigin:'160px 60px'});
  gsap.set('.qr102t',{opacity:0,y:6});
  gsap.set('.qr102a',{opacity:0,x:10});
  tl.to('.qr102lq',{opacity:1,scale:1,duration:0.5,ease:'back.out(2)'})
    .to('.qr102rq',{opacity:1,scale:1,duration:0.5,ease:'back.out(2)'},0.15)
    .to('.qr102t',{opacity:1,y:0,duration:0.6,ease:'power2.out'},0.3)
    .to('.qr102a',{opacity:1,x:0,duration:0.4,ease:'power2.out'},0.7)
    .to('.qr102lq,.qr102rq,.qr102t,.qr102a',{opacity:0,duration:0.3},'+=1.5');
},1);
```

**applicable_to**: testimonial, quote, award-citation, customer-feedback

---

## 103 · DELTA NUMBER · 对比数字

**Purpose**: "X → Y" 带箭头的数值变化，箭头颜色按方向变红/绿。适合 YoY 增长、前后对比、KPI 提升。

**Distinct from**: 21 COUNTER 只是单个数字 0→值；本条是**两个数字的变化关系** + 方向箭头。

### SVG

```html
<svg viewBox="0 0 180 80">
  <text x="35" y="48" text-anchor="middle" font-size="18" fill="rgba(232,228,223,0.5)" font-family="JetBrains Mono" font-weight="600" class="dn103a">23%</text>
  <g class="dn103arrow"><line x1="60" y1="40" x2="110" y2="40" stroke="rgba(61,170,90,0.5)" stroke-width="1.5" class="dn103l"/><polygon points="110,36 116,40 110,44" fill="rgba(61,170,90,0.5)" class="dn103h"/></g>
  <text x="145" y="48" text-anchor="middle" font-size="22" fill="rgba(61,170,90,0.9)" font-family="JetBrains Mono" font-weight="700" class="dn103b">42%</text>
  <text x="90" y="68" text-anchor="middle" font-size="8" fill="rgba(196,163,90,0.5)" font-family="JetBrains Mono" letter-spacing="2" class="dn103label">YoY GROWTH</text>
</svg>
```

### JS

```js
loop(tl=>{
  const a={v:0},b={v:0};
  gsap.set('.dn103arrow',{scaleX:0,transformOrigin:'60px 40px'});
  gsap.set('.dn103b,.dn103label',{opacity:0});
  gsap.set('.dn103a',{opacity:0});
  tl.to('.dn103a',{opacity:1,duration:0.3})
    .to(a,{v:23,duration:0.8,ease:'power3.out',onUpdate:()=>{
      document.querySelectorAll('.dn103a').forEach(e=>e.textContent=Math.round(a.v)+'%');
    }},'<')
    .to('.dn103arrow',{scaleX:1,duration:0.5,ease:'power2.out'},'+=0.3')
    .to('.dn103b',{opacity:1,duration:0.3},'+=0.1')
    .to(b,{v:42,duration:1,ease:'power3.out',onUpdate:()=>{
      document.querySelectorAll('.dn103b').forEach(e=>e.textContent=Math.round(b.v)+'%');
    }},'<')
    .to('.dn103label',{opacity:1,duration:0.4},'-=0.3')
    .to('.dn103a,.dn103arrow,.dn103b,.dn103label',{opacity:0,duration:0.3},'+=1.5');
},1);
```

**applicable_to**: year-over-year, kpi-delta, before-after-metric, growth-comparison

---

## 104 · TAG BURST · 标签爆发

**Purpose**: 8-12 个关键词标签从中心向外爆发出现，staggered 位置。适合技能云、能力概览、关键词 intro。

**Distinct from**: 07 STAGGER GRID 是在位出现，本条有**空间位移**（从中心向外）+ 多彩标签。

### SVG

```html
<svg viewBox="0 0 180 80">
  <g class="tb104g" data-tx="20" data-ty="15"><rect x="10" y="8" width="30" height="14" rx="7" fill="rgba(196,163,90,0.1)" stroke="rgba(196,163,90,0.2)" stroke-width="0.8"/><text x="25" y="18" text-anchor="middle" font-size="7" fill="rgba(196,163,90,0.8)" font-family="JetBrains Mono">AI</text></g>
  <g class="tb104g" data-tx="-30" data-ty="-5"><rect x="55" y="30" width="36" height="14" rx="7" fill="rgba(74,143,212,0.1)" stroke="rgba(74,143,212,0.2)" stroke-width="0.8"/><text x="73" y="40" text-anchor="middle" font-size="7" fill="rgba(74,143,212,0.8)" font-family="JetBrains Mono">Design</text></g>
  <g class="tb104g" data-tx="30" data-ty="10"><rect x="105" y="12" width="40" height="14" rx="7" fill="rgba(61,170,90,0.1)" stroke="rgba(61,170,90,0.2)" stroke-width="0.8"/><text x="125" y="22" text-anchor="middle" font-size="7" fill="rgba(61,170,90,0.8)" font-family="JetBrains Mono">Growth</text></g>
  <g class="tb104g" data-tx="0" data-ty="20"><rect x="130" y="54" width="36" height="14" rx="7" fill="rgba(179,58,58,0.1)" stroke="rgba(179,58,58,0.2)" stroke-width="0.8"/><text x="148" y="64" text-anchor="middle" font-size="7" fill="rgba(179,58,58,0.8)" font-family="JetBrains Mono">Speed</text></g>
  <g class="tb104g" data-tx="-35" data-ty="20"><rect x="15" y="54" width="30" height="14" rx="7" fill="rgba(150,120,200,0.1)" stroke="rgba(150,120,200,0.2)" stroke-width="0.8"/><text x="30" y="64" text-anchor="middle" font-size="7" fill="rgba(150,120,200,0.8)" font-family="JetBrains Mono">UX</text></g>
  <g class="tb104g" data-tx="20" data-ty="-10"><rect x="58" y="54" width="36" height="14" rx="7" fill="rgba(196,163,90,0.1)" stroke="rgba(196,163,90,0.2)" stroke-width="0.8"/><text x="76" y="64" text-anchor="middle" font-size="7" fill="rgba(196,163,90,0.8)" font-family="JetBrains Mono">Scale</text></g>
</svg>
```

### JS

```js
loop(tl=>{
  document.querySelectorAll('.tb104g').forEach((g,i)=>{
    const tx=+g.dataset.tx,ty=+g.dataset.ty;
    gsap.set(g,{opacity:0,x:-tx,y:-ty,scale:0.3,transformOrigin:'center'});
    tl.to(g,{opacity:1,x:0,y:0,scale:1,duration:0.5,ease:'back.out(1.4)'},i*0.08);
  });
  tl.to('.tb104g',{opacity:0,scale:0.8,duration:0.3,stagger:0.04},'+=1.5');
},1);
```

**applicable_to**: skill-tags, keyword-cloud, capability-overview, category-intro

---

## 105 · MAP PIN DROP · 地图落针

**Purpose**: Pin 从上方落下 + 着陆时的环形涟漪。适合地点揭示、门店开业、发布会地点。

**Distinct from**: 59C GRAVITY DROP 是多个球体反弹；本条是**单个 pin 含影子 + 地面冲击波**的落地仪式感。

### SVG

```html
<svg viewBox="0 0 180 80">
  <ellipse cx="90" cy="62" rx="14" ry="3" fill="rgba(0,0,0,0.15)" class="mp105sh"/>
  <circle cx="90" cy="60" r="4" fill="none" stroke="rgba(196,163,90,0.4)" stroke-width="1.5" class="mp105r1"/>
  <circle cx="90" cy="60" r="4" fill="none" stroke="rgba(196,163,90,0.3)" stroke-width="1" class="mp105r2"/>
  <g class="mp105pin"><path d="M90,30 C97,30 100,37 100,43 C100,50 90,60 90,60 C90,60 80,50 80,43 C80,37 83,30 90,30 Z" fill="rgba(196,163,90,0.85)"/><circle cx="90" cy="42" r="3" fill="rgba(10,10,11,0.5)"/></g>
</svg>
```

### JS

```js
loop(tl=>{
  gsap.set('.mp105pin',{y:-45,opacity:0});
  gsap.set('.mp105sh',{scale:0.3,opacity:0,transformOrigin:'center'});
  gsap.set('.mp105r1,.mp105r2',{attr:{r:4},opacity:0});
  tl.to('.mp105pin',{opacity:1,duration:0.15},0)
    .to('.mp105pin',{y:0,duration:0.45,ease:'power2.in'},0)
    .to('.mp105sh',{scale:1,opacity:1,duration:0.2,ease:'power2.out'},0.4)
    .fromTo('.mp105r1',{attr:{r:4},opacity:0.5,strokeWidth:2},{attr:{r:28},opacity:0,strokeWidth:0.3,duration:1,ease:'power1.out'},0.45)
    .fromTo('.mp105r2',{attr:{r:4},opacity:0.4,strokeWidth:1.5},{attr:{r:22},opacity:0,strokeWidth:0.3,duration:1,ease:'power1.out'},0.55)
    .to('.mp105pin',{y:-4,duration:0.15,ease:'power2.out',yoyo:true,repeat:1},0.45)
    .to('.mp105pin,.mp105sh',{opacity:0,duration:0.3},'+=1.5');
},1);
```

**applicable_to**: location-reveal, store-opening, event-venue, geographic-pinpoint

---

## 106 · CHAT BUBBLE · 对话泡泡

**Purpose**: 对话泡泡逐条出现，含"对方正在输入"的三点指示器。适合 AI 对话流、客服场景、产品交互演示。

**Distinct from**: 没有现有效果覆盖对话序列。46 TYPEWRITER 只是单句打字。

### SVG

```html
<svg viewBox="0 0 180 80">
  <g class="cb106b1"><rect x="10" y="8" width="60" height="16" rx="8" fill="rgba(74,143,212,0.12)" stroke="rgba(74,143,212,0.2)" stroke-width="0.6"/><text x="40" y="18" text-anchor="middle" font-size="7" fill="rgba(74,143,212,0.8)" font-family="Noto Sans SC">你好？</text></g>
  <g class="cb106b2"><rect x="110" y="28" width="60" height="16" rx="8" fill="rgba(196,163,90,0.12)" stroke="rgba(196,163,90,0.2)" stroke-width="0.6"/><text x="140" y="38" text-anchor="middle" font-size="7" fill="rgba(196,163,90,0.8)" font-family="Noto Sans SC">在！请讲</text></g>
  <g class="cb106b3"><rect x="10" y="48" width="40" height="16" rx="8" fill="rgba(74,143,212,0.12)" stroke="rgba(74,143,212,0.2)" stroke-width="0.6"/><circle cx="20" cy="56" r="1.5" fill="rgba(74,143,212,0.6)" class="cb106d cb106d1"/><circle cx="30" cy="56" r="1.5" fill="rgba(74,143,212,0.6)" class="cb106d cb106d2"/><circle cx="40" cy="56" r="1.5" fill="rgba(74,143,212,0.6)" class="cb106d cb106d3"/></g>
</svg>
```

### JS

```js
loop(tl=>{
  gsap.set('.cb106b1,.cb106b2,.cb106b3',{opacity:0,scale:0.85,transformOrigin:'left center'});
  gsap.set('.cb106b2',{transformOrigin:'right center'});
  tl.to('.cb106b1',{opacity:1,scale:1,duration:0.4,ease:'back.out(1.8)'})
    .to('.cb106b2',{opacity:1,scale:1,duration:0.4,ease:'back.out(1.8)'},'+=0.6')
    .to('.cb106b3',{opacity:1,scale:1,duration:0.4,ease:'back.out(1.8)'},'+=0.5')
    .to('.cb106d1',{opacity:0.3,duration:0.3,repeat:4,yoyo:true},'<')
    .to('.cb106d2',{opacity:0.3,duration:0.3,repeat:4,yoyo:true,delay:0.1},'<')
    .to('.cb106d3',{opacity:0.3,duration:0.3,repeat:4,yoyo:true,delay:0.2},'<')
    .to('.cb106b1,.cb106b2,.cb106b3',{opacity:0,duration:0.3,stagger:0.08},'+=0.8');
},1);
```

**applicable_to**: ai-conversation, chat-demo, dialog-sequence, customer-service-flow

---

## 107 · TERMINAL TYPE · 终端输入

**Purpose**: 命令行 prompt + 命令逐字输入 + 返回结果。适合开发者演示、CLI 工具介绍、hacker 风格科技感。

**Distinct from**: 46 TYPEWRITER 是纯文本，本条有 `$ ` prompt、命令、换行、结果——**多行代码结构**。

### SVG

```html
<svg viewBox="0 0 180 80">
  <rect x="5" y="5" width="170" height="70" rx="4" fill="rgba(0,0,0,0.3)" stroke="rgba(61,170,90,0.15)" stroke-width="0.8"/>
  <text x="10" y="18" font-size="8" fill="rgba(61,170,90,0.8)" font-family="JetBrains Mono">$</text>
  <text x="18" y="18" font-size="8" fill="rgba(232,228,223,0.85)" font-family="JetBrains Mono" class="tt107cmd"></text>
  <rect x="18" y="12" width="1.5" height="8" fill="rgba(61,170,90,0.6)" class="tt107cur"/>
  <text x="10" y="34" font-size="7" fill="rgba(232,228,223,0.5)" font-family="JetBrains Mono" class="tt107out1"></text>
  <text x="10" y="46" font-size="7" fill="rgba(61,170,90,0.75)" font-family="JetBrains Mono" class="tt107out2"></text>
  <text x="10" y="62" font-size="8" fill="rgba(61,170,90,0.8)" font-family="JetBrains Mono" class="tt107p2"></text>
</svg>
```

### JS

```js
(function(){
  const cmd=document.querySelector('.tt107cmd'),cur=document.querySelector('.tt107cur');
  const o1=document.querySelector('.tt107out1'),o2=document.querySelector('.tt107out2'),p2=document.querySelector('.tt107p2');
  if(!cmd)return;
  const command='asyre build --prod';
  gsap.to(cur,{opacity:0,duration:0.4,repeat:-1,yoyo:true,ease:'steps(1)'});
  function runLoop(){
    cmd.textContent='';o1.textContent='';o2.textContent='';p2.textContent='';
    cur.setAttribute('x',18);
    let i=0;
    const typeInt=setInterval(()=>{
      if(i<command.length){
        cmd.textContent=command.slice(0,++i);
        cur.setAttribute('x',18+i*4.2);
      }else{
        clearInterval(typeInt);
        setTimeout(()=>{
          o1.textContent='✓ Compiled successfully';
          setTimeout(()=>{
            o2.textContent='  Built 8 files · 42.3 KB gzipped';
            setTimeout(()=>{p2.textContent='$ _';},400);
          },400);
        },400);
      }
    },60);
    setTimeout(runLoop,6000);
  }
  runLoop();
})();
```

**applicable_to**: cli-demo, developer-intro, tech-showcase, command-line-reveal

---

## 108 · BADGE RIBBON · 角标飘带

**Purpose**: 右上角色带/奖章从边缘滑入 + 轻微弹跳。适合 "NEW" / "限时" / "HOT" / 获奖角标。

**Distinct from**: 02 SLIDE LEFT 被 kill 了；且本条是**固定位置角标**带旋转角度+弹跳，完全不同。

### SVG

```html
<svg viewBox="0 0 180 80">
  <rect x="30" y="15" width="120" height="50" rx="6" fill="rgba(196,163,90,0.06)" stroke="rgba(196,163,90,0.15)" stroke-width="1"/>
  <text x="90" y="45" text-anchor="middle" font-size="12" fill="rgba(196,163,90,0.5)" font-family="Noto Serif SC" font-weight="700">产品</text>
  <g class="br108" transform="rotate(12,155,22)"><rect x="125" y="10" width="50" height="20" fill="rgba(179,58,58,0.85)"/><text x="150" y="23" text-anchor="middle" font-size="9" fill="#fff" font-family="JetBrains Mono" font-weight="700" letter-spacing="1">NEW</text></g>
</svg>
```

### JS

```js
loop(tl=>{
  gsap.set('.br108',{x:80,y:-30,rotation:45,opacity:0,transformOrigin:'center'});
  tl.to('.br108',{x:0,y:0,rotation:12,opacity:1,duration:0.6,ease:'back.out(2)'})
    .to('.br108',{rotation:14,duration:0.15,yoyo:true,repeat:1,ease:'sine.inOut'},'+=0.1')
    .to('.br108',{x:80,y:-30,rotation:45,opacity:0,duration:0.4,ease:'power2.in'},'+=1.8');
},1);
```

**applicable_to**: badge, ribbon, new-label, promo-tag, award-sticker

---

---

## 109 · COUNTDOWN DIGITS · 倒计时数字

**Purpose**: 3/2/1/GO! 大数字序列，每个 scale-in + 快速缩放淡出 + 颜色切换。适合发布会开场、倒计时、"Ready?" 时刻。

**Distinct from**: 21 COUNTER 是连续数字滚动；本条是**离散、有仪式感的倒计时序列**，每个数字独立弹出。

### SVG

```html
<svg viewBox="0 0 180 80">
  <text x="90" y="55" text-anchor="middle" font-size="36" font-family="JetBrains Mono" font-weight="700" fill="rgba(196,163,90,0.9)" class="cd109">3</text>
  <text x="90" y="72" text-anchor="middle" font-size="7" font-family="JetBrains Mono" fill="rgba(196,163,90,0.4)" letter-spacing="2" class="cd109l">COUNTDOWN</text>
</svg>
```

### JS

```js
(function(){
  const el=document.querySelector('.cd109');if(!el)return;
  const seq=['3','2','1','GO!'];
  const colors=['rgba(196,163,90,0.95)','rgba(74,143,212,0.95)','rgba(179,58,58,0.95)','rgba(61,170,90,1)'];
  let i=0;
  function next(){
    el.textContent=seq[i];el.setAttribute('fill',colors[i]);
    gsap.fromTo(el,{scale:2.2,opacity:0,transformOrigin:'center'},{scale:1,opacity:1,duration:0.3,ease:'back.out(2)'});
    gsap.to(el,{scale:1.4,opacity:0,duration:0.35,delay:0.7,ease:'power2.in',onComplete:()=>{
      i=(i+1)%seq.length;
      setTimeout(next,150);
    }});
  }
  next();
})();
```

**applicable_to**: launch-countdown, event-opening, ready-go-moment

---

## 110 · FLASH REVEAL · 闪光揭示

**Purpose**: 瞬间强白光覆盖 → 淡出时揭示背后的内容。适合重大揭示、产品发布、戏剧性转场。

**Distinct from**: 77 ZOOM BLUR 是温和的 scale+blur；75C REVEAL MASK 是圆形遮罩展开；本条是**瞬间高亮曝光**的视觉冲击。

### SVG

```html
<svg viewBox="0 0 180 80">
  <rect x="5" y="5" width="170" height="70" rx="4" fill="rgba(196,163,90,0.06)" stroke="rgba(196,163,90,0.15)" stroke-width="0.8"/>
  <text x="90" y="35" text-anchor="middle" font-size="16" font-family="Noto Serif SC" font-weight="700" fill="rgba(232,228,223,0.9)" class="fr110t">发布！</text>
  <text x="90" y="52" text-anchor="middle" font-size="9" font-family="JetBrains Mono" fill="rgba(196,163,90,0.6)" letter-spacing="2" class="fr110s">LAUNCH</text>
  <rect x="0" y="0" width="180" height="80" fill="rgba(255,255,255,0.95)" class="fr110f"/>
</svg>
```

### JS

```js
loop(tl=>{
  gsap.set('.fr110f',{opacity:0});
  gsap.set('.fr110t,.fr110s',{opacity:0,scale:0.88,transformOrigin:'center'});
  tl.to('.fr110f',{opacity:1,duration:0.08,ease:'power2.out'})
    .to('.fr110f',{opacity:0,duration:0.5,ease:'power2.in'})
    .to('.fr110t',{opacity:1,scale:1,duration:0.4,ease:'back.out(1.8)'},'-=0.35')
    .to('.fr110s',{opacity:1,scale:1,duration:0.3,ease:'power2.out'},'-=0.2')
    .to('.fr110t,.fr110s',{opacity:0,duration:0.4},'+=1.5');
},1);
```

**applicable_to**: big-reveal, launch-moment, dramatic-transition, product-unveil

---

## 10 个新效果清单（快速查阅）

| ID | 名字 | 核心机制 | Section |
|----|------|---------|---------|
| 101 | MILESTONE TIMELINE | 横线 draw + 节点 stagger + 双标签 | 12 STORYTELLING |
| 102 | QUOTE REVEAL | 大引号弹出 + 文本+署名串行 | 12 STORYTELLING |
| 103 | DELTA NUMBER | 双 counter + 箭头 scaleX | 12 STORYTELLING |
| 104 | TAG BURST | data-tx/ty 从中心辐射 | 12 STORYTELLING |
| 105 | MAP PIN DROP | pin y 落下 + 环形涟漪 | 12 STORYTELLING |
| 106 | CHAT BUBBLE | 顺序 scale + 三点输入指示 | 12 STORYTELLING |
| 107 | TERMINAL TYPE | setInterval 打字 + 多行输出 | 12 STORYTELLING |
| 108 | BADGE RIBBON | 对角滑入 + 轻微弹跳 | 12 STORYTELLING |
| 109 | COUNTDOWN DIGITS | 3/2/1/GO! 离散序列 + 颜色切换 | 12 STORYTELLING |
| 110 | FLASH REVEAL | 瞬间白光曝光 + 揭示内容 | 12 STORYTELLING |

## Phase 1 收口 Apply 步骤

1. 在 `animation-showcase.html` 的 Section 11 后，新增 Section 12 STORYTELLING · 叙事场景 (8)
2. 按上述 SVG + JS 插入 8 个 cell
3. CSS 类名已经全部唯一（mt101/qr102/dn103/tb104/mp105/cb106/tt107/br108），不与现有冲突
4. D subagent 返回后，把这 8 个也补进 animation-snippets.js（按统一格式导出 `effects.play_101` ... `effects.play_108`）
