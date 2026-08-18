// animation-snippets.js
// 140 GSAP animation snippets indexed by ID. Pair with GSAP core + relevant plugins.
// Usage: <script src="gsap.min.js"></script><script src="animation-snippets.js"></script>
//        then call: effects.play_01(document.querySelector('.my-cell'))
//
// Each function takes an optional `scope` (Element or Document). Selectors are
// scoped so the same snippet can animate any container. Looping snippets use
// the internal `_loop` helper, mirroring the showcase's `loop()` helper.

const effects = {};

// Internal helper — matches showcase's `loop()` (gsap.timeline with repeat:-1).
function _loop(scope, fn, pause){
  const tl = gsap.timeline({repeat:-1, repeatDelay: pause!=null ? pause : 1.5});
  fn(tl, scope);
  return tl;
}

// ========== SECTION 1: ENTRANCE ==========

/**
 * @id 01
 * @name FADE UP
 * @section entrance
 * @plugins [core]
 * @selectors .e01a, .e01b, .e01c
 */
effects.play_01 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.e01a'),{opacity:0,y:12},{opacity:1,y:0,duration:0.7,ease:'power3.out'})
      .fromTo(scope.querySelectorAll('.e01b'),{opacity:0,y:15},{opacity:1,y:0,duration:0.6,stagger:0.1,ease:'power3.out'},0.2)
      .fromTo(scope.querySelectorAll('.e01c'),{opacity:0,y:18,scale:0.95},{opacity:1,y:0,scale:1,duration:0.7,ease:'power3.out'},0.35)
      .to(scope.querySelectorAll('.e01a, .e01b, .e01c'),{opacity:0,y:-6,duration:0.5,ease:'power2.in'},'+=1.5');
  },1);
};

/**
 * @id 03
 * @name SCALE POP
 * @section entrance
 * @plugins [core]
 * @selectors .e03
 */
effects.play_03 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.e03'),{scale:0,transformOrigin:'center'},{scale:1,duration:0.6,ease:'back.out(1.5)'})
      .to(scope.querySelectorAll('.e03'),{scale:0,duration:0.4,ease:'power2.in'},'+=1');
  },1);
};

/**
 * @id 04
 * @name CLIP REVEAL
 * @section entrance
 * @plugins [core]
 * @selectors .e04
 */
effects.play_04 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.e04'),{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1,ease:'power3.out'})
      .to(scope.querySelectorAll('.e04'),{clipPath:'inset(0 0% 0 100%)',duration:0.6,ease:'power2.in'},'+=0.8');
  },1);
};

/**
 * @id 05
 * @name FLIP X
 * @section entrance
 * @plugins [core]
 * @selectors .e05
 */
effects.play_05 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.e05'),{rotationY:90,transformOrigin:'center',opacity:0},{rotationY:0,opacity:1,duration:0.8,ease:'power3.out'})
      .to(scope.querySelectorAll('.e05'),{rotationY:-90,opacity:0,duration:0.6},'+=1');
  },1);
};

/**
 * @id 06
 * @name BLUR IN
 * @section entrance
 * @plugins [core]
 * @selectors .e06, .e06blur
 */
effects.play_06 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.e06blur'),{attr:{stdDeviation:8}},{attr:{stdDeviation:0},duration:1,ease:'power2.out'})
      .fromTo(scope.querySelectorAll('.e06'),{opacity:0},{opacity:1,duration:0.8},0)
      .to(scope.querySelectorAll('.e06'),{opacity:0,duration:0.3},'+=1')
      .to(scope.querySelectorAll('.e06blur'),{attr:{stdDeviation:8},duration:0.5},'<');
  },1);
};

/**
 * @id 07
 * @name STAGGER GRID
 * @section entrance
 * @plugins [core]
 * @selectors .sg
 */
effects.play_07 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.sg'),{opacity:0,scale:0.8},{opacity:1,scale:1,duration:0.3,stagger:{grid:[3,4],from:'start',amount:0.8},ease:'back.out(1.2)'})
      .to(scope.querySelectorAll('.sg'),{opacity:0,scale:0.8,duration:0.2,stagger:{grid:[3,4],from:'end',amount:0.5}},'+=0.8');
  },1);
};

/**
 * @id 08
 * @name STAGGER FROM CENTER
 * @section entrance
 * @plugins [core]
 * @selectors .sc
 */
effects.play_08 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.sc'),{opacity:0,scale:0.5},{opacity:1,scale:1,duration:0.3,stagger:{from:'center',amount:0.6},ease:'back.out(1.5)'})
      .to(scope.querySelectorAll('.sc'),{opacity:0,scale:0.5,duration:0.2,stagger:{from:'edges',amount:0.4}},'+=0.8');
  },1);
};

/**
 * @id 09
 * @name ELASTIC BOUNCE
 * @section entrance
 * @plugins [core]
 * @selectors .eb
 */
effects.play_09 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.eb'),{scale:0,transformOrigin:'center'},{scale:1,duration:0.6,stagger:0.12,ease:'back.out(1.6)'})
      .to(scope.querySelectorAll('.eb'),{scale:0,duration:0.3,stagger:0.1,ease:'power2.in'},'+=0.8');
  },1);
};

// ========== SECTION 2: LINE/PATH ==========

/**
 * @id 11
 * @name DRAW ON
 * @section line-path
 * @plugins [core]
 * @selectors .d11
 */
effects.play_11 = function(scope){
  scope = scope || document;
  const sel = scope.querySelectorAll('.d11');
  return _loop(scope, (tl)=>{
    gsap.set(sel,{strokeDasharray:1,strokeDashoffset:1});
    tl.to(sel,{strokeDashoffset:0,duration:1.2,ease:'power2.inOut'})
      .to(sel,{strokeDashoffset:-1,duration:1.2*0.6,ease:'power2.in'},'+=0.8');
  },1);
};

/**
 * @id 12
 * @name DRAW FROM CENTER
 * @section line-path
 * @plugins [core]
 * @selectors .d12L, .d12R, .d12c, .d12e
 */
effects.play_12 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.d12L'),{attr:{x1:90,y1:40,x2:90,y2:40}});
    gsap.set(scope.querySelectorAll('.d12R'),{attr:{x1:90,y1:40,x2:90,y2:40}});
    gsap.set(scope.querySelectorAll('.d12e'),{opacity:0});
    tl.fromTo(scope.querySelectorAll('.d12c'),{scale:0,transformOrigin:'center'},{scale:1,duration:0.3,ease:'power2.out'})
      .to(scope.querySelectorAll('.d12L'),{attr:{x2:10},duration:0.8,ease:'power3.out'},0.2)
      .to(scope.querySelectorAll('.d12R'),{attr:{x2:170},duration:0.8,ease:'power3.out'},0.2)
      .to(scope.querySelectorAll('.d12e'),{opacity:1,duration:0.2},'<0.6')
      // Reverse
      .to(scope.querySelectorAll('.d12L'),{attr:{x2:90},duration:0.5,ease:'power2.in'},'+=1.2')
      .to(scope.querySelectorAll('.d12R'),{attr:{x2:90},duration:0.5,ease:'power2.in'},'<')
      .to(scope.querySelectorAll('.d12c'),{scale:0,duration:0.2},'<0.3')
      .to(scope.querySelectorAll('.d12e'),{opacity:0,duration:0.2},'<');
  },1);
};

/**
 * @id 13
 * @name POLYGON EXPAND
 * @section line-path
 * @plugins [core]
 * @selectors .d13poly, .d13v
 */
effects.play_13 = function(scope){
  scope = scope || document;
  const poly = scope.querySelector('.d13poly');
  const target = [{x:90,y:5},{x:170,y:30},{x:150,y:75},{x:30,y:75},{x:10,y:30}];
  const cx = 90, cy = 40;
  if(!poly) return;
  return _loop(scope, (tl)=>{
    const collapsed = target.map(()=>`${cx},${cy}`).join(' ');
    gsap.set(poly,{attr:{points:collapsed}});
    gsap.set(scope.querySelectorAll('.d13v'),{opacity:0});
    const o = {t:0};
    tl.to(o,{t:1,duration:1,ease:'power3.out',onUpdate:()=>{
      const pts = target.map(p=>`${cx+(p.x-cx)*o.t},${cy+(p.y-cy)*o.t}`).join(' ');
      poly.setAttribute('points',pts);
    }});
    tl.to(scope.querySelectorAll('.d13v'),{opacity:1,duration:0.2,stagger:0.06},'<0.5');
    tl.addLabel('hold','+=2');
    const o2 = {t:1};
    tl.to(o2,{t:0,duration:0.6,ease:'power2.in',onUpdate:()=>{
      const pts = target.map(p=>`${cx+(p.x-cx)*o2.t},${cy+(p.y-cy)*o2.t}`).join(' ');
      poly.setAttribute('points',pts);
    }},'hold');
    tl.to(scope.querySelectorAll('.d13v'),{opacity:0,duration:0.2},'hold');
  },1);
};

/**
 * @id 14
 * @name CURVE TRACE
 * @section line-path
 * @plugins [core]
 * @selectors .d14
 */
effects.play_14 = function(scope){
  scope = scope || document;
  const path = scope.querySelector('.d14');
  const dot = scope.querySelector('.d14dot');
  if(!path) return;
  const len = path.getTotalLength();
  return _loop(scope, (tl)=>{
    gsap.set(path,{strokeDasharray:len,strokeDashoffset:len});
    gsap.set(dot,{opacity:1});
    const o = {p:0};
    tl.to(o,{p:1,duration:1.5,ease:'power2.inOut',onUpdate:()=>{
      const pt = path.getPointAtLength(o.p*len);
      dot.setAttribute('cx',pt.x);
      dot.setAttribute('cy',pt.y);
      path.style.strokeDashoffset = len*(1-o.p);
    }});
    tl.to(dot,{opacity:0,duration:0.3},'+=0.5');
    tl.to(path,{strokeDashoffset:-len,duration:0.8,ease:'power2.in'},'<');
  },1);
};

/**
 * @id 15
 * @name DASHED FLOW
 * @section line-path
 * @plugins [core]
 * @selectors .d15
 */
effects.play_15 = function(scope){
  scope = scope || document;
  return gsap.to(scope.querySelectorAll('.d15'),{strokeDashoffset:-28,duration:2,repeat:-1,ease:'none'});
};

/**
 * @id 16
 * @name CIRCLE DRAW
 * @section line-path
 * @plugins [core]
 * @selectors .d16a, .d16b, .d16c, .d16dot
 */
effects.play_16 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.d16a, .d16b, .d16c'),{strokeDasharray:1,strokeDashoffset:1});
    tl.to(scope.querySelectorAll('.d16a'),{strokeDashoffset:0,duration:1,ease:'power2.inOut'})
      .to(scope.querySelectorAll('.d16b'),{strokeDashoffset:0,duration:0.8,ease:'power2.inOut'},0.3)
      .to(scope.querySelectorAll('.d16c'),{strokeDashoffset:0,duration:0.6,ease:'power2.inOut'},0.6)
      .fromTo(scope.querySelectorAll('.d16dot'),{scale:0,transformOrigin:'center'},{scale:1,duration:0.3,ease:'back.out(2)'},0.9)
      .to(scope.querySelectorAll('.d16a, .d16b, .d16c'),{strokeDashoffset:-1,duration:0.6,stagger:0.1},'+=0.8')
      .to(scope.querySelectorAll('.d16dot'),{scale:0,duration:0.2},'<');
  },1);
};

/**
 * @id 17
 * @name ARROW CHAIN
 * @section line-path
 * @plugins [core]
 * @selectors .ac
 */
effects.play_17 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.ac'),{strokeDasharray:1,strokeDashoffset:1});
    tl.to(scope.querySelectorAll('.ac'),{strokeDashoffset:0,duration:0.4,stagger:0.2,ease:'power2.inOut'})
      .to(scope.querySelectorAll('.ac'),{strokeDashoffset:-1,duration:0.3,stagger:0.15},'+=0.8');
  },1);
};

/**
 * @id 18
 * @name GRID DRAW
 * @section line-path
 * @plugins [core]
 * @selectors .gd
 */
effects.play_18 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.gd'),{strokeDasharray:1,strokeDashoffset:1});
    tl.to(scope.querySelectorAll('.gd'),{strokeDashoffset:0,duration:0.3,stagger:0.08,ease:'power2.inOut'})
      .to(scope.querySelectorAll('.gd'),{opacity:0,duration:0.3,stagger:0.05},'+=0.8')
      .set(scope.querySelectorAll('.gd'),{opacity:1});
  },1);
};

/**
 * @id 19
 * @name SPARKLINE
 * @section line-path
 * @plugins [core]
 * @selectors .d19, .d19fill, .d19dot
 */
effects.play_19 = function(scope){
  scope = scope || document;
  const pts = [{x:10,y:65},{x:30,y:55},{x:50,y:60},{x:70,y:35},{x:90,y:40},{x:110,y:20},{x:130,y:25},{x:150,y:15},{x:170,y:10}];
  const baseline = 72;
  const line = scope.querySelector('.d19');
  const fill = scope.querySelector('.d19fill');
  const dots = scope.querySelectorAll('.d19dot');
  if(!line) return;

  function buildPaths(positions){
    const lp = positions.map((p,i)=>`${p.x},${p.y}`).join(' ');
    const fp = lp + ` ${positions[positions.length-1].x},${baseline} ${positions[0].x},${baseline}`;
    line.setAttribute('points', lp);
    fill.setAttribute('points', fp);
    dots.forEach((d,i)=>{ d.setAttribute('cy', positions[i].y); });
  }

  const state = pts.map(p=>({x:p.x, y:baseline}));

  return _loop(scope, (tl)=>{
    state.forEach((s,i)=>{ s.y = baseline; });
    buildPaths(state);
    gsap.set(scope.querySelectorAll('.d19dot'),{opacity:0});

    pts.forEach((p,i)=>{
      tl.to(state[i], {y:p.y, duration:1, ease:'power3.out',
        onUpdate:()=>buildPaths(state)
      }, i*0.04);
    });
    tl.to(scope.querySelectorAll('.d19dot'),{opacity:0.5,duration:0.3,stagger:0.03},'<0.5');

    tl.addLabel('hold','+=1.5');
    pts.forEach((p,i)=>{
      tl.to(state[i], {y:baseline, duration:0.6, ease:'power2.in',
        onUpdate:()=>buildPaths(state)
      }, 'hold+=' + (i*0.03));
    });
    tl.to(scope.querySelectorAll('.d19dot'),{opacity:0,duration:0.3},'hold');
  },1);
};

/**
 * @id 20
 * @name TREE DRAW
 * @section line-path
 * @plugins [core]
 * @selectors .td, .tn
 */
effects.play_20 = function(scope){
  scope = scope || document;
  const lines = scope.querySelectorAll('.td');
  const nodes = scope.querySelectorAll('.tn');
  if(!lines.length) return;

  const origLines = [];
  lines.forEach(l=>{
    origLines.push({
      x1:+l.getAttribute('x1'),y1:+l.getAttribute('y1'),
      x2:+l.getAttribute('x2'),y2:+l.getAttribute('y2')
    });
  });

  return _loop(scope, (tl)=>{
    lines.forEach((l,i)=>{
      l.setAttribute('x2',origLines[i].x1);
      l.setAttribute('y2',origLines[i].y1);
      gsap.set(l,{opacity:1,strokeDasharray:'none',strokeDashoffset:0});
    });
    gsap.set(nodes,{opacity:0,scale:0,transformOrigin:'center'});

    tl.to(nodes[0],{opacity:1,scale:1,duration:0.3,ease:'power2.out'});

    tl.to(lines[0],{attr:{x2:origLines[0].x2,y2:origLines[0].y2},duration:0.5,ease:'power2.out'},0.2);
    tl.to(nodes[1],{opacity:1,scale:1,duration:0.2},0.5);

    tl.to(lines[1],{attr:{x2:origLines[1].x2,y2:origLines[1].y2},duration:0.5,ease:'power2.out'},0.5);
    tl.to(lines[2],{attr:{x2:origLines[2].x2,y2:origLines[2].y2},duration:0.5,ease:'power2.out'},0.5);
    tl.to([nodes[2],nodes[3]],{opacity:1,scale:1,duration:0.2,stagger:0.05},0.8);

    for(let i=3;i<7;i++){
      tl.to(lines[i],{attr:{x2:origLines[i].x2,y2:origLines[i].y2},duration:0.4,ease:'power2.out'},0.8);
    }
    tl.to([nodes[4],nodes[5],nodes[6],nodes[7],nodes[8],nodes[9],nodes[10],nodes[11]],{opacity:1,scale:1,duration:0.2,stagger:0.03},1.0);

    tl.addLabel('hold','+=1.8');
    for(let i=6;i>=0;i--){
      tl.to(lines[i],{attr:{x2:origLines[i].x1,y2:origLines[i].y1},duration:0.3,ease:'power2.in'},'hold+='+((6-i)*0.03));
    }
    tl.to(nodes,{opacity:0,scale:0,duration:0.2},'hold');
  },1);
};

// ========== SECTION 3: DATA ==========

/**
 * @id 21
 * @name COUNTER
 * @section data
 * @plugins [core]
 * @selectors .ctr
 */
effects.play_21 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    const o = {v:0};
    tl.to(o,{v:94.3,duration:1.5,ease:'power3.out',onUpdate:()=>{
      scope.querySelectorAll('.ctr').forEach(e=>e.textContent=o.v.toFixed(1)+'%');
    }}).to(o,{v:0,duration:0.5,ease:'power2.in',onUpdate:()=>{
      scope.querySelectorAll('.ctr').forEach(e=>e.textContent=o.v.toFixed(1)+'%');
    }},'+=1');
  },1);
};

/**
 * @id 22
 * @name BAR GROWTH
 * @section data
 * @plugins [core]
 * @selectors .bg22
 */
effects.play_22 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    scope.querySelectorAll('.bg22').forEach((b,i)=>{
      tl.to(b,{attr:{width:b.dataset.w},duration:0.8,ease:'power3.out'},i*0.1);
    });
    tl.to(scope.querySelectorAll('.bg22'),{attr:{width:0},duration:0.4,stagger:0.05},'+=1');
  },1);
};

/**
 * @id 23
 * @name COLUMN RISE
 * @section data
 * @plugins [core]
 * @selectors .col23
 */
effects.play_23 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    scope.querySelectorAll('.col23').forEach((c,i)=>{
      const h = +c.dataset.h;
      tl.to(c,{attr:{height:h,y:70-h},duration:0.6,ease:'back.out(1.5)'},i*0.08);
    });
    tl.to(scope.querySelectorAll('.col23'),{attr:{height:0,y:70},duration:0.3,stagger:0.05},'+=1');
  },1);
};

/**
 * @id 24
 * @name PROGRESS RING
 * @section data
 * @plugins [core]
 * @selectors .pr24, .pr24t
 */
effects.play_24 = function(scope){
  scope = scope || document;
  const pr = scope.querySelector('.pr24');
  if(!pr) return;
  const circ = 2*Math.PI*28;
  pr.style.strokeDasharray = circ;
  pr.style.strokeDashoffset = circ;
  return _loop(scope, (tl)=>{
    const o = {v:0};
    tl.to(o,{v:73,duration:1.5,ease:'power3.out',onUpdate:()=>{
      pr.style.strokeDashoffset = circ*(1-o.v/100);
      scope.querySelectorAll('.pr24t').forEach(e=>e.textContent=Math.round(o.v)+'%');
    }}).to(o,{v:0,duration:0.6,ease:'power2.in',onUpdate:()=>{
      pr.style.strokeDashoffset = circ*(1-o.v/100);
      scope.querySelectorAll('.pr24t').forEach(e=>e.textContent=Math.round(o.v)+'%');
    }},'+=1');
  },1);
};

/**
 * @id 25
 * @name PIE SEGMENTS
 * @section data
 * @plugins [core]
 * @selectors .pie
 */
effects.play_25 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    scope.querySelectorAll('.pie').forEach((p,i)=>{
      const d = +p.dataset.d;
      tl.to(p,{strokeDasharray:d+' '+(188.5-d),duration:0.8,ease:'power3.out'},i*0.15);
    });
    tl.to(scope.querySelectorAll('.pie'),{strokeDasharray:'0 188.5',duration:0.4,stagger:0.1},'+=1');
  },1);
};

/**
 * @id 26
 * @name SCATTER POP
 * @section data
 * @plugins [core]
 * @selectors .scp
 */
effects.play_26 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    scope.querySelectorAll('.scp').forEach((s,i)=>{
      tl.to(s,{attr:{r:s.dataset.r},duration:0.4,ease:'back.out(2)'},i*0.08);
    });
    tl.to(scope.querySelectorAll('.scp'),{attr:{r:0},duration:0.2,stagger:0.05},'+=1');
  },1);
};

/**
 * @id 27
 * @name STACKED BAR
 * @section data
 * @plugins [core]
 * @selectors .sb27
 */
effects.play_27 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    // 顺序生长：上一条完全长完（0.5s）+ 0.05s 呼吸间隙 → 下一条
    scope.querySelectorAll('.sb27').forEach((s,i)=>{
      tl.to(s,{attr:{width:s.dataset.w},duration:0.5,ease:'power3.out'},i*0.55);
    });
    tl.to(scope.querySelectorAll('.sb27'),{attr:{width:0},duration:0.3,stagger:0.08},'+=1');
  },1);
};

/**
 * @id 28
 * @name AREA FILL
 * @section data
 * @plugins [core]
 * @selectors .af28fill, .af28line
 */
effects.play_28 = function(scope){
  scope = scope || document;
  const targets = [{x:10,y:70},{x:30,y:50},{x:50,y:55},{x:70,y:30},{x:90,y:35},{x:110,y:20},{x:130,y:25},{x:150,y:15},{x:170,y:10}];
  const baseline = 72;
  const fill = scope.querySelector('.af28fill');
  const line = scope.querySelector('.af28line');
  if(!fill || !line) return;
  const state = targets.map(p=>({x:p.x,y:baseline}));

  function build(){
    const lp = state.map(p=>`${p.x},${p.y}`).join(' ');
    const fp = lp + ` ${state[state.length-1].x},${baseline} ${state[0].x},${baseline}`;
    fill.setAttribute('points',fp);
    line.setAttribute('points',lp);
  }

  return _loop(scope, (tl)=>{
    state.forEach((s,i)=>{s.y=baseline;});
    build();
    targets.forEach((p,i)=>{
      tl.to(state[i],{y:p.y,duration:1.2,ease:'power3.out',onUpdate:build},i*0.04);
    });
    tl.addLabel('hold','+=2');
    targets.forEach((p,i)=>{
      tl.to(state[i],{y:baseline,duration:0.6,ease:'power2.in',onUpdate:build},'hold+='+i*0.03);
    });
  },1);
};

/**
 * @id 29
 * @name GAUGE NEEDLE
 * @section data
 * @plugins [core]
 * @selectors .needle29, .gn29
 */
effects.play_29 = function(scope){
  scope = scope || document;
  const nd = scope.querySelector('.needle29');
  const gn = scope.querySelector('.gn29');
  if(!nd || !gn) return;
  gsap.set(gn,{strokeDasharray:100,strokeDashoffset:100});
  const cx = 90, cy = 70, len = 45;
  return _loop(scope, (tl)=>{
    const o = {angle:Math.PI};
    tl.to(o,{angle:0.15,duration:2.5,ease:'power2.inOut',onUpdate:()=>{
      const x2 = cx+len*Math.cos(o.angle), y2 = cy-len*Math.sin(o.angle);
      nd.setAttribute('x2',x2); nd.setAttribute('y2',y2);
      const pct = ((Math.PI-o.angle)/Math.PI)*100;
      gn.style.strokeDashoffset = 100-pct;
    }});
    tl.to(o,{angle:Math.PI,duration:1,ease:'power2.in',onUpdate:()=>{
      const x2 = cx+len*Math.cos(o.angle), y2 = cy-len*Math.sin(o.angle);
      nd.setAttribute('x2',x2); nd.setAttribute('y2',y2);
      const pct = ((Math.PI-o.angle)/Math.PI)*100;
      gn.style.strokeDashoffset = 100-pct;
    }},'+=1');
  },1);
};

/**
 * @id 30
 * @name WAFFLE FILL
 * @section data
 * @plugins [core]
 * @selectors #waffle30, .wf30
 */
effects.play_30 = function(scope){
  scope = scope || document;
  const wf = scope.querySelector('#waffle30') || (scope.getElementById && scope.getElementById('waffle30'));
  if(wf && !wf.childElementCount){
    for(let r=0;r<5;r++) for(let c=0;c<10;c++){
      const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
      rect.setAttribute('x',10+c*17); rect.setAttribute('y',5+r*15);
      rect.setAttribute('width',14); rect.setAttribute('height',12); rect.setAttribute('rx','2');
      rect.setAttribute('fill', (r*10+c)<73 ? 'rgba(196,163,90,0.12)' : 'rgba(196,163,90,0.03)');
      rect.setAttribute('class','wf30'); rect.style.opacity = 0;
      wf.appendChild(rect);
    }
  }
  return _loop(scope, (tl)=>{
    tl.to(scope.querySelectorAll('.wf30'),{opacity:1,duration:0.1,stagger:0.02})
      .to(scope.querySelectorAll('.wf30'),{opacity:0,duration:0.08,stagger:{each:0.015,from:'end'}},'+=0.8');
  },1);
};

// ========== SECTION 4: PERPETUAL ==========

/**
 * @id 31
 * @name PULSE RIPPLE
 * @section perpetual
 * @plugins [core]
 * @selectors .pp31r1, .pp31r2, .pp31r3, .pp31r4, .pp31r5, .pp31c
 */
effects.play_31 = function(scope){
  scope = scope || document;
  gsap.timeline({repeat:-1,repeatDelay:0.2}).fromTo(scope.querySelectorAll('.pp31r1'),{attr:{r:4},opacity:0.25,strokeWidth:2.5},{attr:{r:36},opacity:0,strokeWidth:0.3,duration:2,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:0.4,repeatDelay:0.2}).fromTo(scope.querySelectorAll('.pp31r2'),{attr:{r:4},opacity:0.2,strokeWidth:2},{attr:{r:36},opacity:0,strokeWidth:0.3,duration:2,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:0.8,repeatDelay:0.2}).fromTo(scope.querySelectorAll('.pp31r3'),{attr:{r:4},opacity:0.15,strokeWidth:1.5},{attr:{r:36},opacity:0,strokeWidth:0.3,duration:2,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:1.2,repeatDelay:0.2}).fromTo(scope.querySelectorAll('.pp31r4'),{attr:{r:4},opacity:0.1,strokeWidth:1.2},{attr:{r:36},opacity:0,strokeWidth:0.2,duration:2,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:1.6,repeatDelay:0.2}).fromTo(scope.querySelectorAll('.pp31r5'),{attr:{r:4},opacity:0.08,strokeWidth:1},{attr:{r:36},opacity:0,strokeWidth:0.2,duration:2,ease:'power1.out'});
  gsap.to(scope.querySelectorAll('.pp31c'),{attr:{r:9},opacity:0.25,duration:0.25,repeat:-1,yoyo:true,ease:'power2.out',repeatDelay:0.2});
};

/**
 * @id 32
 * @name ORBIT
 * @section perpetual
 * @plugins [core]
 * @selectors .orb32, .orb32d, .orb32d2, .orb32d3
 */
effects.play_32 = function(scope){
  scope = scope || document;
  const orbitTween = gsap.to(scope.querySelectorAll('.orb32'),{rotation:360,svgOrigin:'90 40',duration:30,repeat:-1,ease:'none'});
  const cx = 90, cy = 40, r = 28;
  const d1 = scope.querySelectorAll('.orb32d');
  const d2 = scope.querySelectorAll('.orb32d2');
  const d3 = scope.querySelectorAll('.orb32d3');
  let a = 0, rafId = 0, killed = false;
  function tick(){
    if(killed) return;
    a = (a+1.5)%360;
    const rad = a*Math.PI/180;
    gsap.set(d1,{attr:{cx:cx+r*Math.cos(rad), cy:cy+r*Math.sin(rad)}});
    const rad2 = (a-15)*Math.PI/180, rad3 = (a-30)*Math.PI/180;
    gsap.set(d2,{attr:{cx:cx+r*Math.cos(rad2), cy:cy+r*Math.sin(rad2)}});
    gsap.set(d3,{attr:{cx:cx+r*Math.cos(rad3), cy:cy+r*Math.sin(rad3)}});
    rafId = requestAnimationFrame(tick);
  }
  tick();
  return { teardown(){ killed = true; cancelAnimationFrame(rafId); orbitTween.kill(); } };
};

/**
 * @id 33
 * @name SCAN LINE H
 * @section perpetual
 * @plugins [core]
 * @selectors .sl33
 */
effects.play_33 = function(scope){
  scope = scope || document;
  return gsap.timeline({repeat:-1,repeatDelay:2}).set(scope.querySelectorAll('.sl33'),{y:0}).to(scope.querySelectorAll('.sl33'),{y:80,duration:2,ease:'power1.inOut'});
};

/**
 * @id 34
 * @name SCAN LINE V
 * @section perpetual
 * @plugins [core]
 * @selectors .sl34
 */
effects.play_34 = function(scope){
  scope = scope || document;
  return gsap.timeline({repeat:-1,repeatDelay:2}).set(scope.querySelectorAll('.sl34'),{x:0}).to(scope.querySelectorAll('.sl34'),{x:180,duration:2,ease:'power1.inOut'});
};

/**
 * @id 35
 * @name BREATHING GLOW
 * @section perpetual
 * @plugins [core]
 * @selectors .br35
 */
effects.play_35 = function(scope){
  scope = scope || document;
  return gsap.to(scope.querySelectorAll('.br35'),{strokeOpacity:0.3,scale:1.08,transformOrigin:'center',duration:2,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 36
 * @name PARTICLE FLOW
 * @section perpetual
 * @plugins [core]
 * @selectors .pf36a, .pf36b, .pf36c
 */
effects.play_36 = function(scope){
  scope = scope || document;
  function flowP(sel,d){
    gsap.timeline({repeat:-1,delay:d}).set(scope.querySelectorAll(sel),{attr:{cx:10,cy:40},opacity:0}).to(scope.querySelectorAll(sel),{opacity:0.7,duration:0.2}).to(scope.querySelectorAll(sel),{attr:{cx:170},duration:2,ease:'power1.inOut'},'<').to(scope.querySelectorAll(sel),{opacity:0,duration:0.3},'-=0.3');
  }
  flowP('.pf36a',0); flowP('.pf36b',0.7); flowP('.pf36c',1.4);
};

/**
 * @id 37
 * @name WAVE
 * @section perpetual
 * @plugins [core]
 * @selectors .wv37a, .wv37b
 */
effects.play_37 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.wv37a'),{x:20,duration:3,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.wv37b'),{x:-15,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 38
 * @name BUBBLE RISE
 * @section perpetual
 * @plugins [core]
 * @selectors .bub
 */
effects.play_38 = function(scope){
  scope = scope || document;
  scope.querySelectorAll('.bub').forEach((b,i)=>{
    const x = +b.dataset.x, sy = +b.dataset.sy;
    gsap.timeline({repeat:-1,delay:i*1.5}).set(b,{attr:{cx:x,cy:sy},opacity:0}).to(b,{opacity:0.15,duration:0.3}).to(b,{attr:{cy:45,cx:x+(Math.random()*10-5)},duration:3+Math.random()*2,ease:'power1.out'},'<').to(b,{opacity:0,duration:0.4},'-=0.4');
  });
};

/**
 * @id 39
 * @name GRADIENT SHIFT
 * @section perpetual
 * @plugins [core]
 * @selectors .gs39a, .gs39b, .gs39c
 */
effects.play_39 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.gs39a'),{attr:{'stop-color':'rgba(61,170,90,0.1)'},duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.gs39b'),{attr:{'stop-color':'rgba(196,163,90,0.1)'},duration:5,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.gs39c'),{attr:{'stop-color':'rgba(74,143,212,0.1)'},duration:6,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 40
 * @name RADAR SWEEP
 * @section perpetual
 * @plugins [core]
 * @selectors .rs40arm, .rs40trail, .rs40blip
 */
effects.play_40 = function(scope){
  scope = scope || document;
  const arm = scope.querySelector('.rs40arm');
  const trail = scope.querySelector('.rs40trail');
  if(!arm || !trail) return;
  const cx = 90, cy = 40, r = 32;
  let angle = 270, rafId = 0, killed = false;

  function tick(){
    if(killed) return;
    angle = (angle+1.2)%360;
    const rad = angle*Math.PI/180;
    const ax = cx+r*Math.cos(rad), ay = cy+r*Math.sin(rad);
    arm.setAttribute('x2',ax.toFixed(1));
    arm.setAttribute('y2',ay.toFixed(1));

    const trailAngle = 30;
    const r2rad = (angle-trailAngle)*Math.PI/180;
    const x1 = cx+r*Math.cos(rad), y1 = cy+r*Math.sin(rad);
    const x2 = cx+r*Math.cos(r2rad), y2 = cy+r*Math.sin(r2rad);
    trail.setAttribute('d',
      `M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0,0 ${x2.toFixed(1)},${y2.toFixed(1)} Z`);

    rafId = requestAnimationFrame(tick);
  }
  tick();

  const blipTween = gsap.to(scope.querySelectorAll('.rs40blip'),{opacity:0.05,duration:2,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:0.6});
  return { teardown(){ killed = true; cancelAnimationFrame(rafId); blipTween.kill(); } };
};

/**
 * @id 41
 * @name NODE PULSE
 * @section perpetual
 * @plugins [core]
 * @selectors .np
 */
effects.play_41 = function(scope){
  scope = scope || document;
  return gsap.to(scope.querySelectorAll('.np'),{scale:1.2,transformOrigin:'center',duration:0.8,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:{each:0.4,repeat:-1,yoyo:true}});
};

/**
 * @id 42
 * @name SHIMMER
 * @section perpetual
 * @plugins [core]
 * @selectors .shm42
 */
effects.play_42 = function(scope){
  scope = scope || document;
  return gsap.timeline({repeat:-1,repeatDelay:1}).set(scope.querySelectorAll('.shm42'),{x:-60}).to(scope.querySelectorAll('.shm42'),{x:230,duration:1.5,ease:'power2.inOut'});
};

/**
 * @id 43
 * @name TYPING CURSOR
 * @section perpetual
 * @plugins [core]
 * @selectors .tc43c
 */
effects.play_43 = function(scope){
  scope = scope || document;
  return gsap.to(scope.querySelectorAll('.tc43c'),{opacity:0,duration:0.5,repeat:-1,yoyo:true,ease:'steps(1)'});
};

/**
 * @id 44
 * @name COUNTER FLICKER
 * @section perpetual
 * @plugins [core]
 * @selectors .cf44
 */
effects.play_44 = function(scope){
  scope = scope || document;
  const base = 128457;
  const o = {v:base};
  function hop(){
    const target = base+Math.floor(Math.random()*20-10);
    gsap.to(o,{v:target,duration:0.4+Math.random()*0.3,ease:'power1.inOut',
      onUpdate:()=>scope.querySelectorAll('.cf44').forEach(e=>e.textContent=Math.round(o.v).toLocaleString()),
      onComplete:()=>setTimeout(hop,400+Math.random()*400)});
  }
  hop();
};

/**
 * @id 45
 * @name ORBIT MULTI
 * @section perpetual
 * @plugins [core]
 * @selectors .om45a, .om45b, .om45c, .om45d, .om45p
 */
effects.play_45 = function(scope){
  scope = scope || document;
  const cx = 90, cy = 40;
  const rings = [
    {r:32,speed:0.4,dir:1,cls:'.om45c'},
    {r:25,speed:0.6,dir:-1,cls:'.om45a'},
    {r:18,speed:0.9,dir:1,cls:'.om45b'},
    {r:11,speed:1.3,dir:-1,cls:'.om45d'}
  ];
  const ringTweens = rings.map(rn =>
    gsap.to(scope.querySelectorAll(rn.cls),{rotation:rn.dir*360,transformOrigin:`${cx}px ${cy}px`,duration:40/rn.speed,repeat:-1,ease:'none'})
  );
  const particles = scope.querySelectorAll('.om45p');
  const pConfig = [
    {ring:0,angle:0,speed:1.5},{ring:0,angle:180,speed:1.5},
    {ring:1,angle:90,speed:2.2},{ring:1,angle:270,speed:2.2},
    {ring:2,angle:45,speed:3},{ring:2,angle:225,speed:3}
  ];
  let t = 0, rafId = 0, killed = false;
  function tick(){
    if(killed) return;
    t++;
    pConfig.forEach((pc,i)=>{
      if(!particles[i]) return;
      const rn = rings[pc.ring];
      const a = (pc.angle + t*pc.speed*rn.dir)%360;
      const rad = a*Math.PI/180;
      particles[i].setAttribute('cx',(cx+rn.r*Math.cos(rad)).toFixed(1));
      particles[i].setAttribute('cy',(cy+rn.r*Math.sin(rad)).toFixed(1));
    });
    rafId = requestAnimationFrame(tick);
  }
  tick();
  return { teardown(){ killed = true; cancelAnimationFrame(rafId); ringTweens.forEach(t=>t.kill()); } };
};

// ========== SECTION 5: TEXT ==========

/**
 * @id 46
 * @name TYPEWRITER
 * @section text
 * @plugins [core]
 * @selectors .tw46
 */
effects.play_46 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.tw46'),{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1.5,ease:'steps(6)'})
      .to(scope.querySelectorAll('.tw46'),{clipPath:'inset(0 0% 0 100%)',duration:0.5,ease:'steps(4)'},'+=0.8');
  },1);
};

/**
 * @id 47
 * @name HIGHLIGHT SWEEP
 * @section text
 * @plugins [core]
 * @selectors .hs47
 */
effects.play_47 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.hs47'),{attr:{width:0}},{attr:{width:145},duration:0.8,ease:'power3.out'})
      .to(scope.querySelectorAll('.hs47'),{attr:{width:0},duration:0.4},'+=0.8');
  },1);
};

/**
 * @id 48
 * @name SCRAMBLE
 * @section text
 * @plugins [core]
 * @selectors .scr48
 */
effects.play_48 = function(scope){
  scope = scope || document;
  const target = 'DECRYPTED!';
  const chars = '█▓▒░╬╫╪┼';
  const scrEl = scope.querySelector('.scr48');
  if(!scrEl) return;
  let step = 0, phase = 'decode';
  setInterval(()=>{
    let s = '';
    if(phase==='decode'){
      for(let i=0;i<target.length;i++){
        s += i<=step ? target[i] : chars[Math.floor(Math.random()*chars.length)];
      }
      step++;
      if(step>target.length){phase='hold'; step=0;}
    } else if(phase==='hold'){
      s = target; step++;
      if(step>15){phase='encode'; step=0;}
    } else {
      for(let i=0;i<target.length;i++){
        s += i<step ? chars[Math.floor(Math.random()*chars.length)] : target[i];
      }
      step++;
      if(step>target.length){phase='scramble'; step=0;}
    }
    if(phase==='scramble'){
      s = ''; for(let i=0;i<target.length;i++) s += chars[Math.floor(Math.random()*chars.length)];
      step++; if(step>10){phase='decode'; step=0;}
    }
    scrEl.textContent = s;
  },80);
};

/**
 * @id 49
 * @name SPLIT CHARS
 * @section text
 * @plugins [core]
 * @selectors .spc
 */
effects.play_49 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.spc'),{opacity:0,y:15},{opacity:1,y:0,duration:0.3,stagger:0.06,ease:'back.out(1.5)'})
      .to(scope.querySelectorAll('.spc'),{opacity:0,y:-10,duration:0.2,stagger:0.04},'+=0.8');
  },1);
};

/**
 * @id 50
 * @name CLIP TITLE
 * @section text
 * @plugins [core]
 * @selectors .ct50r
 */
effects.play_50 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.ct50r'),{attr:{width:0}},{attr:{width:180},duration:1,ease:'power3.out'})
      .to(scope.querySelectorAll('.ct50r'),{attr:{width:0},duration:0.5},'+=0.8');
  },1);
};

// ========== SECTION 6: MORPHING & TRANSFORM ==========

/**
 * @id 51
 * @name SHAPE BREATHE
 * @section morph-transform
 * @plugins [core]
 * @selectors .sb51
 */
effects.play_51 = function(scope){
  scope = scope || document;
  return gsap.to(scope.querySelectorAll('.sb51'),{attr:{points:'90,12 165,62 15,62'},duration:2,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 52
 * @name LIQUID BLOB
 * @section morph-transform
 * @plugins [core]
 * @selectors .lb52
 */
effects.play_52 = function(scope){
  scope = scope || document;
  return gsap.to(scope.querySelectorAll('.lb52'),{attr:{d:'M90,12 C130,8 150,30 148,48 C146,68 115,75 90,72 C65,69 32,60 32,42 C32,22 55,16 90,12Z'},duration:3,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 53
 * @name ROTATE 3D X
 * @section morph-transform
 * @plugins [core]
 * @selectors .r3x53
 */
effects.play_53 = function(scope){
  scope = scope || document;
  return gsap.timeline({repeat:-1,repeatDelay:1.2})
    .to(scope.querySelectorAll('.r3x53'),{scaleX:0,duration:0.4,ease:'power2.in',transformOrigin:'center'})
    .to(scope.querySelectorAll('.r3x53'),{scaleX:1,duration:0.4,ease:'back.out(1.4)'});
};

/**
 * @id 54
 * @name PENDULUM
 * @section morph-transform
 * @plugins [core]
 * @selectors .pend54g, .pend54sh
 */
effects.play_54 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.pend54g'),{rotation:25,svgOrigin:'90 5',duration:1.8,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.pend54sh'),{attr:{cx:110},duration:1.8,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 55
 * @name SPRING BOUNCE
 * @section morph-transform
 * @plugins [core]
 * @selectors .spb55
 */
effects.play_55 = function(scope){
  scope = scope || document;
  const els = scope.querySelectorAll('.spb55');
  return gsap.timeline({repeat:-1, repeatDelay:1})
    .to(els,{attr:{cy:20},duration:0.3,ease:'power2.out'})
    .to(els,{attr:{cy:60},duration:0.3,ease:'bounce.out'});
};

/**
 * @id 56
 * @name SCALE PULSE
 * @section morph-transform
 * @plugins [core]
 * @selectors .sp56a, .sp56b, .sp56c
 */
effects.play_56 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.sp56a'),{scale:1.12,transformOrigin:'center',duration:1.1,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.sp56b'),{scale:1.12,transformOrigin:'center',duration:1.1,repeat:-1,yoyo:true,ease:'sine.inOut',delay:0.35});
  gsap.to(scope.querySelectorAll('.sp56c'),{scale:1.12,transformOrigin:'center',duration:1.1,repeat:-1,yoyo:true,ease:'sine.inOut',delay:0.7});
};

/**
 * @id 57
 * @name MORPH ICON
 * @section morph-transform
 * @plugins [core]
 * @selectors .mi57
 */
effects.play_57 = function(scope){
  scope = scope || document;
  return gsap.timeline({repeat:-1,yoyo:true}).to(scope.querySelectorAll('.mi57'),{attr:{rx:5},duration:1.5,ease:'power2.inOut'}).to(scope.querySelectorAll('.mi57'),{attr:{rx:25},duration:1.5,ease:'power2.inOut'});
};

/**
 * @id 59a
 * @name RUBBER STRETCH
 * @section morph-transform
 * @plugins [core]
 * @selectors .rub59
 */
effects.play_59a = function(scope){
  scope = scope || document;
  return gsap.timeline({repeat:-1,yoyo:true}).to(scope.querySelectorAll('.rub59'),{attr:{rx:45,ry:15},duration:1.5,ease:'elastic.out(1,0.4)'}).to(scope.querySelectorAll('.rub59'),{attr:{rx:15,ry:40},duration:1.5,ease:'elastic.out(1,0.4)'});
};

/**
 * @id 59b
 * @name ACCORDION
 * @section morph-transform
 * @plugins [core]
 * @selectors .acc59
 */
effects.play_59b = function(scope){
  scope = scope || document;
  return gsap.to(scope.querySelectorAll('.acc59'),{scaleX:0.3,transformOrigin:'center',duration:1,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:{each:0.12,yoyo:true,repeat:-1}});
};

// ========== SECTION 7: PHYSICS & ORGANIC ==========

/**
 * @id 59c
 * @name GRAVITY DROP
 * @section physics-organic
 * @plugins [core]
 * @selectors .gd59a, .gd59b, .gd59c
 */
effects.play_59c = function(scope){
  scope = scope || document;
  gsap.timeline({repeat:-1,repeatDelay:1}).to(scope.querySelectorAll('.gd59a'),{attr:{cy:66},duration:0.6,ease:'bounce.out'}).to(scope.querySelectorAll('.gd59a'),{attr:{cy:10},duration:0.3,ease:'power2.in'},'+=0.5');
  gsap.timeline({repeat:-1,repeatDelay:1,delay:0.2}).to(scope.querySelectorAll('.gd59b'),{attr:{cy:66},duration:0.6,ease:'bounce.out'}).to(scope.querySelectorAll('.gd59b'),{attr:{cy:10},duration:0.3,ease:'power2.in'},'+=0.5');
  gsap.timeline({repeat:-1,repeatDelay:1,delay:0.4}).to(scope.querySelectorAll('.gd59c'),{attr:{cy:66},duration:0.6,ease:'bounce.out'}).to(scope.querySelectorAll('.gd59c'),{attr:{cy:10},duration:0.3,ease:'power2.in'},'+=0.5');
};

/**
 * @id 60
 * @name ELASTIC STRING
 * @section physics-organic
 * @plugins [core]
 * @selectors .es60
 */
effects.play_60 = function(scope){
  scope = scope || document;
  return gsap.timeline({repeat:-1}).to(scope.querySelectorAll('.es60'),{attr:{d:'M10,40 Q90,10 170,40'},duration:0.8,ease:'elastic.out(1,0.3)'}).to(scope.querySelectorAll('.es60'),{attr:{d:'M10,40 Q90,70 170,40'},duration:0.8,ease:'elastic.out(1,0.3)'}).to(scope.querySelectorAll('.es60'),{attr:{d:'M10,40 Q90,40 170,40'},duration:1,ease:'elastic.out(1,0.2)'});
};

/**
 * @id 61
 * @name FLOAT DRIFT
 * @section physics-organic
 * @plugins [core]
 * @selectors .fd61a, .fd61b, .fd61c
 */
effects.play_61 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.fd61a'),{x:3,y:-5,rotation:2,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.fd61b'),{x:-4,y:3,rotation:-3,duration:5,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.fd61c'),{x:2,y:-4,rotation:1.5,duration:3.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 62
 * @name BROWNIAN MOTION
 * @section physics-organic
 * @plugins [core]
 * @selectors .bm62
 */
effects.play_62 = function(scope){
  scope = scope || document;
  const particles = scope.querySelectorAll('.bm62');
  let killed = false;
  particles.forEach(p=>{
    // Read home anchor from data-hx/hy when present, else from initial cx/cy.
    // This makes every iteration an absolute offset from home (no accumulation).
    const hx = parseFloat(p.dataset.hx || p.getAttribute('cx'));
    const hy = parseFloat(p.dataset.hy || p.getAttribute('cy'));
    function jitter(){
      if(killed) return;
      gsap.to(p,{
        attr:{
          cx: hx+(Math.random()-0.5)*26,
          cy: hy+(Math.random()-0.5)*18,
          r: 3+Math.random()*1.2
        },
        duration: 0.35+Math.random()*0.5,
        ease: 'sine.inOut',
        onComplete: jitter
      });
    }
    jitter();
  });
  return { teardown(){ killed = true; particles.forEach(p => gsap.killTweensOf(p)); } };
};

/**
 * @id 63
 * @name HEARTBEAT
 * @section physics-organic
 * @plugins [core]
 * @selectors .hb63h, .hb63wave, .hb63dot
 */
effects.play_63 = function(scope){
  scope = scope || document;
  const wave = scope.querySelector('.hb63wave');
  const dot = scope.querySelector('.hb63dot');
  const heart = scope.querySelector('.hb63h');
  if(!wave) return;
  const len = wave.getTotalLength();
  gsap.set(wave,{strokeDasharray:len,strokeDashoffset:len});
  gsap.timeline({repeat:-1,repeatDelay:0.4})
    .to({},{duration:0.65})
    .to(heart,{scale:1.18,transformOrigin:'46px 40px',duration:0.08,ease:'power2.out'})
    .to(heart,{scale:1,duration:0.1})
    .to(heart,{scale:1.08,duration:0.07},'+=0.03')
    .to(heart,{scale:1,duration:0.25})
    .to({},{duration:0.4});
  return gsap.to({p:0},{p:1,duration:1.8,repeat:-1,repeatDelay:0.1,ease:'none',
    onUpdate:function(){
      const progress = this.targets()[0].p;
      const pt = wave.getPointAtLength(progress*len);
      dot.setAttribute('cx',pt.x);
      dot.setAttribute('cy',pt.y);
      wave.style.strokeDashoffset = len*(1-progress);
    },
    onRepeat:()=>{wave.style.strokeDashoffset = len;}
  });
};

/**
 * @id 64
 * @name SPIRAL IN
 * @section physics-organic
 * @plugins [core]
 * @selectors .sp64
 */
effects.play_64 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.sp64'),{strokeDasharray:1,strokeDashoffset:1});
    tl.to(scope.querySelectorAll('.sp64'),{strokeDashoffset:0,duration:2,ease:'power2.inOut'}).to(scope.querySelectorAll('.sp64'),{strokeDashoffset:-1,duration:1},'+=0.5');
  },1);
};

/**
 * @id 65
 * @name SMOKE RISE
 * @section physics-organic
 * @plugins [core]
 * @selectors .smk65a, .smk65b, .smk65c, .smk65d, .smk65e
 */
effects.play_65 = function(scope){
  scope = scope || document;
  const timelines = [];
  function smoke(sel,dx,dur,startR,endR,startOp){
    const els = scope.querySelectorAll(sel);
    // Re-roll horizontal drift each cycle via repeatRefresh + function-based value
    const tl = gsap.timeline({repeat:-1, delay:Math.random()*2, repeatDelay:Math.random()*0.8, repeatRefresh:true})
      .set(els,{attr:{cy:65, cx:90+dx, r:startR}, opacity:startOp})
      .to(els,{
        attr:{cy:5, cx:()=>90+dx+(Math.random()*30-15), r:endR},
        opacity:0, duration:dur, ease:'power1.out'
      });
    timelines.push(tl);
  }
  smoke('.smk65a',0,2.5,6,18,0.7);
  smoke('.smk65b',-4,3,8,22,0.55);
  smoke('.smk65c',3,2.2,5,15,0.75);
  smoke('.smk65d',-6,3.5,10,28,0.4);
  smoke('.smk65e',5,2.8,7,20,0.5);
  return { teardown(){ timelines.forEach(t => t.kill()); } };
};

/**
 * @id 66
 * @name LAVA LAMP
 * @section physics-organic
 * @plugins [core]
 * @selectors .ll66a, .ll66b, .ll66c
 */
effects.play_66 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.ll66a'),{attr:{cy:20,r:10},duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.ll66b'),{attr:{cy:55,r:10},duration:5,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.ll66c'),{attr:{cy:25,r:8},duration:3.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 67a
 * @name MAGNETIC PULL
 * @section physics-organic
 * @plugins [core]
 * @selectors .mag67
 */
effects.play_67a = function(scope){
  scope = scope || document;
  const mags = scope.querySelectorAll('.mag67');
  mags.forEach(m=>{
    const ox = +m.getAttribute('cx'), oy = +m.getAttribute('cy');
    gsap.timeline({repeat:-1})
      .to(m,{attr:{cx:85+Math.random()*10,cy:35+Math.random()*10},duration:2,ease:'power2.in'})
      .to(m,{attr:{cx:ox+Math.random()*20-10,cy:oy+Math.random()*20-10},duration:1,ease:'power3.out'})
      .to(m,{},{duration:0.5});
  });
};

/**
 * @id 67b
 * @name RIPPLE POOL
 * @section physics-organic
 * @plugins [core]
 * @selectors .rpl67a, .rpl67b, .rpl67c, .rpl67d, .rpl67e
 */
effects.play_67b = function(scope){
  scope = scope || document;
  gsap.timeline({repeat:-1,repeatDelay:0.2}).fromTo(scope.querySelectorAll('.rpl67a'),{attr:{rx:5,ry:2},strokeOpacity:0.35,strokeWidth:2.5},{attr:{rx:70,ry:20},strokeOpacity:0,strokeWidth:0.3,duration:2,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:0.4,repeatDelay:0.2}).fromTo(scope.querySelectorAll('.rpl67b'),{attr:{rx:5,ry:2},strokeOpacity:0.28,strokeWidth:2},{attr:{rx:70,ry:20},strokeOpacity:0,strokeWidth:0.3,duration:2,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:0.8,repeatDelay:0.2}).fromTo(scope.querySelectorAll('.rpl67d'),{attr:{rx:5,ry:2},strokeOpacity:0.2,strokeWidth:1.8},{attr:{rx:70,ry:20},strokeOpacity:0,strokeWidth:0.2,duration:2,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:1.2,repeatDelay:0.2}).fromTo(scope.querySelectorAll('.rpl67e'),{attr:{rx:5,ry:2},strokeOpacity:0.15,strokeWidth:1.5},{attr:{rx:70,ry:20},strokeOpacity:0,strokeWidth:0.2,duration:2,ease:'power1.out'});
  gsap.to(scope.querySelectorAll('.rpl67c'),{attr:{r:4},duration:0.2,repeat:-1,yoyo:true,ease:'power2.out',repeatDelay:0.2});
};

// ========== SECTION 8: GLITCH & DIGITAL ==========

/**
 * @id 67c
 * @name GLITCH TEXT
 * @section glitch-digital
 * @plugins [core]
 * @selectors .gl67, .gl67r, .gl67b
 */
effects.play_67c = function(scope){
  scope = scope || document;
  function glitchLoop(){
    gsap.timeline({repeat:-1,repeatDelay:2+Math.random()*3})
      .to(scope.querySelectorAll('.gl67r'),{x:2,y:-1,opacity:0.4,duration:0.05}).to(scope.querySelectorAll('.gl67r'),{x:-1,y:1,duration:0.05}).to(scope.querySelectorAll('.gl67r'),{x:0,y:0,opacity:0,duration:0.05})
      .to(scope.querySelectorAll('.gl67b'),{x:-2,y:1,opacity:0.4,duration:0.05},'<').to(scope.querySelectorAll('.gl67b'),{x:1,y:-1,duration:0.05}).to(scope.querySelectorAll('.gl67b'),{x:0,y:0,opacity:0,duration:0.05});
  }
  glitchLoop();
  gsap.timeline({repeat:-1,repeatDelay:3}).to(scope.querySelectorAll('.gl67'),{x:3,duration:0.03}).to(scope.querySelectorAll('.gl67'),{x:-2,duration:0.03}).to(scope.querySelectorAll('.gl67'),{x:0,duration:0.03});
};

/**
 * @id 68
 * @name MATRIX RAIN
 * @section glitch-digital
 * @plugins [core]
 * @selectors .mx68sv, .mx68t
 */
effects.play_68 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.mx68sv'); if(!sv) return;
  const cols = 12, chars = '01アイウエオカキクケコ';
  for(let c=0;c<cols;c++){
    const x = 8+c*15;
    for(let r=0;r<6;r++){
      const t = document.createElementNS('http://www.w3.org/2000/svg','text');
      t.setAttribute('x',x); t.setAttribute('y',-10);
      t.setAttribute('fill','rgba(61,170,90,'+(0.05+Math.random()*0.15)+')');
      t.setAttribute('font-family','JetBrains Mono'); t.setAttribute('font-size','9');
      t.textContent = chars[Math.floor(Math.random()*chars.length)];
      t.classList.add('mx68t'); sv.appendChild(t);
      gsap.to(t,{attr:{y:85},duration:1.5+Math.random()*2,repeat:-1,delay:r*0.3+c*0.1+Math.random(),ease:'none',
        onRepeat:()=>{t.textContent = chars[Math.floor(Math.random()*chars.length)];}});
    }
  }
};

/**
 * @id 69
 * @name SCAN GRID
 * @section glitch-digital
 * @plugins [core]
 * @selectors .sgr69sv, .sgr69
 */
effects.play_69 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.sgr69sv'); if(!sv) return;
  for(let r=0;r<4;r++) for(let c=0;c<9;c++){
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x',5+c*19); rect.setAttribute('y',5+r*19);
    rect.setAttribute('width',17); rect.setAttribute('height',17); rect.setAttribute('rx','2');
    rect.setAttribute('fill','rgba(196,163,90,0.03)'); rect.classList.add('sgr69');
    sv.appendChild(rect);
  }
  function scanRow(){
    const cells = sv.querySelectorAll('.sgr69');
    const row = Math.floor(Math.random()*4);
    for(let c=0;c<9;c++){
      const idx = row*9+c;
      gsap.to(cells[idx],{fill:'rgba(196,163,90,0.12)',duration:0.1,delay:c*0.04}).then(()=>{
        gsap.to(cells[idx],{fill:'rgba(196,163,90,0.03)',duration:0.5,delay:0.2});
      });
    }
    setTimeout(scanRow,1500+Math.random()*2000);
  }
  setTimeout(scanRow,500);
};

/**
 * @id 70
 * @name NOISE STATIC
 * @section glitch-digital
 * @plugins [core]
 * @selectors .ns70sv
 */
effects.play_70 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.ns70sv'); if(!sv) return;
  const rects = [];
  for(let r=0;r<8;r++) for(let c=0;c<18;c++){
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x',c*10); rect.setAttribute('y',r*10);
    rect.setAttribute('width',10); rect.setAttribute('height',10);
    rect.setAttribute('fill','rgba(196,163,90,0.02)');
    sv.appendChild(rect); rects.push(rect);
  }
  // 150ms > 100ms: slightly kinder on slow devices, still reads as TV static
  const intervalId = setInterval(()=>{
    rects.forEach(r=>{r.setAttribute('fill','rgba(196,163,90,'+(Math.random()*0.08).toFixed(3)+')');});
  },150);
  return { teardown(){
    clearInterval(intervalId);
    rects.forEach(r => { if(r.parentNode) sv.removeChild(r); });
    rects.length = 0;
  } };
};

/**
 * @id 71
 * @name BINARY STREAM
 * @section glitch-digital
 * @plugins [core]
 * @selectors .bs71a, .bs71b, .bs71c, .bs71d
 */
effects.play_71 = function(scope){
  scope = scope || document;
  function binScroll(sel,spd){
    const chars = '01';
    setInterval(()=>{
      const el = scope.querySelector(sel); if(!el) return;
      let s = ''; for(let i=0;i<18;i++) s += chars[Math.floor(Math.random()*2)];
      el.textContent = s;
    },spd);
  }
  binScroll('.bs71a',150); binScroll('.bs71b',180); binScroll('.bs71c',200); binScroll('.bs71d',250);
};

/**
 * @id 72
 * @name PIXEL DISSOLVE
 * @section glitch-digital
 * @plugins [core]
 * @selectors .pd72sv, .pd72c
 */
effects.play_72 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.pd72sv'); if(!sv) return;
  const cells = [];
  for(let r=0;r<8;r++) for(let c=0;c<18;c++){
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x',c*10); rect.setAttribute('y',r*10);
    rect.setAttribute('width',10); rect.setAttribute('height',10);
    const inShape = (c>4 && c<14 && r>1 && r<6);
    rect.setAttribute('fill',inShape?'rgba(196,163,90,0.1)':'rgba(196,163,90,0.02)');
    rect.classList.add('pd72c'); sv.appendChild(rect); cells.push({el:rect,orig:inShape});
  }
  function dissolve(){
    const order = [...Array(cells.length).keys()].sort(()=>Math.random()-0.5);
    order.forEach((idx,i)=>{
      gsap.to(cells[idx].el,{opacity:0,duration:0.1,delay:i*0.008});
    });
    setTimeout(()=>{
      order.reverse().forEach((idx,i)=>{
        gsap.to(cells[idx].el,{opacity:1,duration:0.1,delay:i*0.008});
      });
    },order.length*8+500);
    setTimeout(dissolve,order.length*16+2000);
  }
  setTimeout(dissolve,1000);
};

/**
 * @id 73
 * @name HEX PULSE
 * @section glitch-digital
 * @plugins [core]
 * @selectors .hp73sv
 */
effects.play_73 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.hp73sv'); if(!sv) return;
  const hexes = [];
  for(let r=0;r<3;r++) for(let c=0;c<6;c++){
    const cx = 20+c*28+(r%2)*14, cy = 15+r*24;
    const hex = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    const pts = []; for(let a=0;a<6;a++){const ang = Math.PI/3*a-Math.PI/6; pts.push((cx+11*Math.cos(ang)).toFixed(1)+','+(cy+11*Math.sin(ang)).toFixed(1));}
    hex.setAttribute('points',pts.join(' '));
    hex.setAttribute('fill','rgba(196,163,90,0.03)'); hex.setAttribute('stroke','rgba(196,163,90,0.06)'); hex.setAttribute('stroke-width','0.5');
    sv.appendChild(hex); hexes.push(hex);
  }
  function pulseHex(){
    const idx = Math.floor(Math.random()*hexes.length);
    gsap.to(hexes[idx],{fill:'rgba(196,163,90,0.12)',stroke:'rgba(196,163,90,0.2)',duration:0.3}).then(()=>{
      gsap.to(hexes[idx],{fill:'rgba(196,163,90,0.03)',stroke:'rgba(196,163,90,0.06)',duration:1});
    });
    setTimeout(pulseHex,400+Math.random()*800);
  }
  pulseHex();
};

/**
 * @id 74
 * @name CIRCUIT TRACE
 * @section glitch-digital
 * @plugins [core]
 * @selectors .ct74path, .ct74dot
 */
effects.play_74 = function(scope){
  scope = scope || document;
  const path = scope.querySelector('.ct74path');
  const dot = scope.querySelector('.ct74dot');
  if(!path || !dot) return;
  const len = path.getTotalLength();
  gsap.to(dot,{opacity:0.8,duration:0.3,delay:0.5});
  gsap.to({p:0},{p:1,duration:3,repeat:-1,ease:'none',onUpdate:function(){
    const pt = path.getPointAtLength(this.targets()[0].p*len);
    gsap.set(dot,{attr:{cx:pt.x,cy:pt.y}});
  }});
};

/**
 * @id 75a
 * @name HOLOGRAM
 * @section glitch-digital
 * @plugins [core]
 * @selectors .holo75, .holo75t, .holo75s
 */
effects.play_75a = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.holo75t'),{opacity:0.15,duration:1.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.timeline({repeat:-1,repeatDelay:1.5}).set(scope.querySelectorAll('.holo75s'),{y:12}).to(scope.querySelectorAll('.holo75s'),{y:62,duration:2,ease:'none'});
  setInterval(()=>{
    gsap.timeline()
      .to(scope.querySelectorAll('.holo75'),{opacity:0.15,x:2,duration:0.04})
      .to(scope.querySelectorAll('.holo75'),{opacity:1,x:-1,duration:0.04})
      .to(scope.querySelectorAll('.holo75'),{opacity:0.3,x:0,duration:0.03})
      .to(scope.querySelectorAll('.holo75'),{opacity:1,x:0,duration:0.05});
    gsap.timeline()
      .to(scope.querySelectorAll('.holo75t'),{x:3,duration:0.03})
      .to(scope.querySelectorAll('.holo75t'),{x:-2,duration:0.03})
      .to(scope.querySelectorAll('.holo75t'),{x:0,duration:0.04});
  },2500+Math.random()*2000);
};

/**
 * @id 75b
 * @name SIGNAL LOSS
 * @section glitch-digital
 * @plugins [core]
 * @selectors .sigl75, .sigl75bar
 */
effects.play_75b = function(scope){
  scope = scope || document;
  const el = scope.querySelector('.sigl75');
  const bar = scope.querySelector('.sigl75bar');
  if(!el) return;
  gsap.timeline({repeat:-1})
    .to(bar,{attr:{width:130},fill:'rgba(61,170,90,0.15)',duration:0.5})
    .call(()=>{el.textContent='CONNECTED'; el.setAttribute('fill','#3daa5a');})
    .to({},{duration:3})
    .to(bar,{attr:{width:30},fill:'rgba(179,58,58,0.15)',duration:0.3})
    .call(()=>{el.textContent='SIGNAL LOST'; el.setAttribute('fill','#b33a3a');})
    .to({},{duration:1.5})
    .to(bar,{attr:{width:70},fill:'rgba(196,163,90,0.15)',duration:0.5})
    .call(()=>{el.textContent='RECONNECT..'; el.setAttribute('fill','#c4a35a');})
    .to({},{duration:1})
    .to(bar,{attr:{width:130},fill:'rgba(61,170,90,0.15)',duration:0.5})
    .call(()=>{el.textContent='CONNECTED'; el.setAttribute('fill','#3daa5a');});
};

// ========== SECTION 9: COMPOSITE & CINEMATIC ==========

/**
 * @id 75c
 * @name REVEAL MASK
 * @section composite-cinematic
 * @plugins [core]
 * @selectors .rm75c
 */
effects.play_75c = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.to(scope.querySelectorAll('.rm75c'),{attr:{r:100},duration:1,ease:'power3.out'}).to(scope.querySelectorAll('.rm75c'),{attr:{r:0},duration:0.5,ease:'power2.in'},'+=1');
  },1);
};

/**
 * @id 76
 * @name SPOTLIGHT
 * @section composite-cinematic
 * @plugins [core]
 * @selectors #spt76
 */
effects.play_76 = function(scope){
  scope = scope || document;
  const sel = scope.querySelector('#spt76') || (scope.getElementById && scope.getElementById('spt76'));
  if(!sel) return;
  gsap.to(sel,{attr:{cx:0.8},duration:3,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(sel,{attr:{cy:0.3},duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 77
 * @name ZOOM BLUR
 * @section composite-cinematic
 * @plugins [core]
 * @selectors .zb77t, .zb77f
 */
effects.play_77 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.zb77t'),{scale:0.3,transformOrigin:'center',opacity:0},{scale:1,opacity:1,duration:0.5,ease:'power3.out'})
      .fromTo(scope.querySelectorAll('.zb77f'),{attr:{stdDeviation:6}},{attr:{stdDeviation:0},duration:0.5,ease:'power2.out'},0)
      .to(scope.querySelectorAll('.zb77t'),{scale:2,opacity:0,duration:0.4,ease:'power2.in'},'+=1')
      .to(scope.querySelectorAll('.zb77f'),{attr:{stdDeviation:4},duration:0.3},'<');
  },1);
};

/**
 * @id 78
 * @name PARALLAX LAYERS
 * @section composite-cinematic
 * @plugins [core]
 * @selectors .pl78a, .pl78b, .pl78c
 */
effects.play_78 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.pl78a'),{x:10,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.pl78b'),{x:-8,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.pl78c'),{x:15,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 81
 * @name SHUTTER
 * @section composite-cinematic
 * @plugins [core]
 * @selectors .sh81
 */
effects.play_81 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.sh81'),{scaleY:0,transformOrigin:'top'},{scaleY:1,duration:0.3,stagger:0.06,ease:'power2.out'})
      .to(scope.querySelectorAll('.sh81'),{scaleY:0,transformOrigin:'bottom',duration:0.3,stagger:0.06,ease:'power2.in'},'+=1');
  },1);
};

/**
 * @id 82
 * @name WIPE DIAGONAL
 * @section composite-cinematic
 * @plugins [core]
 * @selectors .wd82p
 */
effects.play_82 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.to(scope.querySelectorAll('.wd82p'),{attr:{points:'0,0 220,0 220,80 0,80'},duration:1,ease:'power2.inOut'})
      .to(scope.querySelectorAll('.wd82p'),{attr:{points:'220,0 220,0 220,80 220,80'},duration:0.6},'+=0.8')
      .set(scope.querySelectorAll('.wd82p'),{attr:{points:'0,0 0,0 0,80 0,80'}});
  },1);
};

/**
 * @id 83a
 * @name SPLIT SCREEN
 * @section composite-cinematic
 * @plugins [core]
 * @selectors .sps83L, .sps83R, .sps83d
 */
effects.play_83a = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.sps83L'),{attr:{x:5,width:82}},{attr:{x:-40,width:82},duration:0.8,ease:'power2.inOut'})
      .fromTo(scope.querySelectorAll('.sps83R'),{attr:{x:93,width:82}},{attr:{x:138,width:82},duration:0.8,ease:'power2.inOut'},'<')
      .to(scope.querySelectorAll('.sps83d'),{opacity:0,duration:0.3},'<0.3')
      .to(scope.querySelectorAll('.sps83L'),{attr:{x:5},duration:0.6,ease:'power2.out'},'+=1.2')
      .to(scope.querySelectorAll('.sps83R'),{attr:{x:93},duration:0.6,ease:'power2.out'},'<')
      .to(scope.querySelectorAll('.sps83d'),{opacity:1,duration:0.3},'<0.2');
  },1);
};

/**
 * @id 83b
 * @name CURTAIN OPEN
 * @section composite-cinematic
 * @plugins [core]
 * @selectors .curt83L, .curt83R
 */
effects.play_83b = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.to(scope.querySelectorAll('.curt83L'),{attr:{x:-75,width:80},duration:1,ease:'power3.inOut'})
      .to(scope.querySelectorAll('.curt83R'),{attr:{x:175,width:80},duration:1,ease:'power3.inOut'},'<')
      .to(scope.querySelectorAll('.curt83L'),{attr:{x:10,width:80},duration:0.8,ease:'power2.inOut'},'+=1.5')
      .to(scope.querySelectorAll('.curt83R'),{attr:{x:90,width:80},duration:0.8,ease:'power2.inOut'},'<');
  },1);
};

// ========== SECTION 10: ADVANCED DATA ==========

/**
 * @id 83c
 * @name TREEMAP GROW
 * @section advanced-data
 * @plugins [core]
 * @selectors .tm83
 */
effects.play_83c = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    scope.querySelectorAll('.tm83').forEach((r,i)=>{
      tl.to(r,{attr:{width:r.dataset.w},duration:0.5,ease:'power3.out'},i*0.08);
    });
    tl.to(scope.querySelectorAll('.tm83'),{attr:{width:0},duration:0.3,stagger:0.05},'+=1');
  },1);
};

/**
 * @id 84
 * @name SANKEY FLOW
 * @section advanced-data
 * @plugins [core]
 * @selectors .sk84p1, .sk84p2, .sk84p3, .sk84p4, .sk84p5, .sk84p6
 */
effects.play_84 = function(scope){
  scope = scope || document;
  function sankeyFlow(sel, x1,y1, x2,y2, dur, delay){
    gsap.timeline({repeat:-1, delay, repeatDelay:0.5+Math.random()})
      .set(scope.querySelectorAll(sel),{attr:{cx:x1,cy:y1},opacity:0})
      .to(scope.querySelectorAll(sel),{opacity:0.5,duration:0.15})
      .to(scope.querySelectorAll(sel),{attr:{cx:x2,cy:y2},duration:dur,ease:'power1.inOut'},'<')
      .to(scope.querySelectorAll(sel),{opacity:0,duration:0.2},'-=0.2');
  }
  sankeyFlow('.sk84p1', 13,20, 155,16, 2, 0);
  sankeyFlow('.sk84p2', 13,22, 155,18, 2.3, 0.8);
  sankeyFlow('.sk84p3', 13,37, 155,41, 2.2, 0.3);
  sankeyFlow('.sk84p4', 13,40, 155,43, 2.5, 1.2);
  sankeyFlow('.sk84p5', 13,56, 155,65, 2.4, 0.6);
  sankeyFlow('.sk84p6', 13,60, 155,68, 2.1, 1.5);
};

/**
 * @id 85
 * @name HEATMAP PULSE
 * @section advanced-data
 * @plugins [core]
 * @selectors .hm85sv
 */
effects.play_85 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.hm85sv'); if(!sv) return;
  const cells = [];
  for(let r=0;r<4;r++) for(let c=0;c<9;c++){
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x',5+c*19); rect.setAttribute('y',5+r*19);
    rect.setAttribute('width',17); rect.setAttribute('height',17); rect.setAttribute('rx','2');
    rect.setAttribute('fill','rgba(196,163,90,0.03)');
    sv.appendChild(rect); cells.push(rect);
  }
  function heatPulse(){
    cells.forEach(c=>{
      const v = Math.random();
      const color = v>0.7?'rgba(179,58,58,'+(v*0.2).toFixed(2)+')':v>0.4?'rgba(196,163,90,'+(v*0.15).toFixed(2)+')':'rgba(74,143,212,'+(v*0.08).toFixed(2)+')';
      gsap.to(c,{fill:color,duration:0.5+Math.random()});
    });
    setTimeout(heatPulse,2000+Math.random()*1000);
  }
  heatPulse();
};

/**
 * @id 86
 * @name DONUT SPIN
 * @section advanced-data
 * @plugins [core]
 * @selectors .dn86, .dn86t
 */
effects.play_86 = function(scope){
  scope = scope || document;
  const segs = scope.querySelectorAll('.dn86');
  segs.forEach(s=>{
    const len = +s.dataset.len;
    const off = +(s.dataset.offset||0);
    s.style.strokeDasharray = `0 100`;
    s.style.strokeDashoffset = -off;
  });
  return _loop(scope, (tl)=>{
    segs.forEach((s,i)=>{
      const len = +s.dataset.len;
      const off = +(s.dataset.offset||0);
      tl.to(s,{strokeDasharray:`${len} ${100-len}`,duration:0.6,ease:'power3.out'},i*0.1);
    });
    const o = {v:0};
    tl.to(o,{v:100,duration:0.6+segs.length*0.1,ease:'power3.out',onUpdate:()=>{
      const t = scope.querySelector('.dn86t');
      if(t) t.textContent = Math.round(o.v)+'%';
    }},0);
    tl.addLabel('hold','+=2');
    segs.forEach((s,i)=>{
      tl.to(s,{strokeDasharray:'0 100',duration:0.4},'hold+='+i*0.05);
    });
    const o2 = {v:100};
    tl.to(o2,{v:0,duration:0.4,onUpdate:()=>{
      const t = scope.querySelector('.dn86t');
      if(t) t.textContent = Math.round(o2.v)+'%';
    }},'hold');
  },1);
};

/**
 * @id 87
 * @name NETWORK GRAPH
 * @section advanced-data
 * @plugins [core]
 * @selectors .ng87n, .ng87l
 */
effects.play_87 = function(scope){
  scope = scope || document;
  scope.querySelectorAll('.ng87n').forEach((n)=>{
    const amp = 1.08+Math.random()*0.14, dur = 1.3+Math.random()*1.2, dly = Math.random()*1.5;
    gsap.to(n,{scale:amp,transformOrigin:'center',duration:dur,repeat:-1,yoyo:true,ease:'sine.inOut',delay:dly});
  });
  scope.querySelectorAll('.ng87l').forEach((l)=>{
    const dur = 1.5+Math.random()*1.8, dly = Math.random()*1.2;
    gsap.to(l,{strokeOpacity:0.08+Math.random()*0.1,duration:dur,repeat:-1,yoyo:true,ease:'sine.inOut',delay:dly});
  });
};

/**
 * @id 88
 * @name WATERFALL
 * @section advanced-data
 * @plugins [core]
 * @selectors .wf88
 */
effects.play_88 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    scope.querySelectorAll('.wf88').forEach((r,i)=>{
      const h = +r.dataset.h;
      tl.to(r,{attr:{height:h,y:72-h},duration:0.5,ease:'power3.out'},i*0.1);
    });
    tl.to(scope.querySelectorAll('.wf88'),{attr:{height:0,y:72},duration:0.3,stagger:0.06},'+=1');
  },1);
};

/**
 * @id 89
 * @name CANDLESTICK
 * @section advanced-data
 * @plugins [core]
 * @selectors .ckw, .ckb
 */
effects.play_89 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.ckw'),{scaleY:0,transformOrigin:'center'});
    gsap.set(scope.querySelectorAll('.ckb'),{scaleY:0,transformOrigin:'center'});
    tl.to(scope.querySelectorAll('.ckw'),{scaleY:1,duration:0.25,stagger:0.12,ease:'power2.out'})
      .to(scope.querySelectorAll('.ckb'),{scaleY:1,duration:0.3,stagger:0.12,ease:'back.out(1.3)'},'<0.08')
      .to(scope.querySelectorAll('.ckw, .ckb'),{opacity:0,duration:0.3,stagger:0.03,ease:'power2.in'},'+=1.8')
      .set(scope.querySelectorAll('.ckw, .ckb'),{opacity:1,scaleY:0});
  },1);
};

/**
 * @id 90
 * @name FLOW DIAGRAM
 * @section advanced-data
 * @plugins [core]
 * @selectors .fl90pulse1, .fl90pulse2, .fl90n0, .fl90n1, .fl90n2
 */
effects.play_90 = function(scope){
  scope = scope || document;
  const p1 = scope.querySelector('.fl90pulse1');
  const p2 = scope.querySelector('.fl90pulse2');
  const n0 = scope.querySelector('.fl90n0');
  const n1 = scope.querySelector('.fl90n1');
  const n2 = scope.querySelector('.fl90n2');
  if(!p1) return;

  return gsap.timeline({repeat:-1,repeatDelay:1.5})
    .to(n0,{strokeOpacity:0.25,duration:0.2}).to(n0,{strokeOpacity:0.08,duration:0.5})
    .to(p1,{opacity:0.8,duration:0.1},'-=0.3')
    .to(p1,{attr:{x1:64,x2:69},duration:0.4,ease:'power2.inOut'},'<')
    .to(p1,{opacity:0,duration:0.1})
    .set(p1,{attr:{x1:47,x2:52}})
    .to(n1,{strokeOpacity:0.25,duration:0.2}).to(n1,{strokeOpacity:0.08,duration:0.5})
    .to(p2,{opacity:0.8,duration:0.1},'-=0.3')
    .to(p2,{attr:{x1:128,x2:133},duration:0.4,ease:'power2.inOut'},'<')
    .to(p2,{opacity:0,duration:0.1})
    .set(p2,{attr:{x1:111,x2:116}})
    .to(n2,{strokeOpacity:0.25,duration:0.2}).to(n2,{strokeOpacity:0.08,duration:0.5});
};

/**
 * @id 91a
 * @name FUNNEL POUR
 * @section advanced-data
 * @plugins [core]
 * @selectors .fnl91neck, .fnl91top, .fnl91pool, .fnl91drip
 */
effects.play_91a = function(scope){
  scope = scope || document;
  return gsap.timeline({repeat:-1,repeatDelay:2})
    .fromTo(scope.querySelectorAll('.fnl91neck'),{attr:{y:70,height:0}},{attr:{y:38,height:32},duration:1,ease:'power2.out'})
    .fromTo(scope.querySelectorAll('.fnl91top'),{attr:{y:38,height:0}},{attr:{y:8,height:30},duration:3.5,ease:'power1.in'})
    .to({},{duration:1})
    .to(scope.querySelectorAll('.fnl91top'),{attr:{y:38,height:0},duration:3,ease:'power2.in'})
    .to(scope.querySelectorAll('.fnl91neck'),{attr:{y:70,height:0},duration:1.8,ease:'none'},'-=0.5')
    .fromTo(scope.querySelectorAll('.fnl91pool'),{attr:{y:78,height:0}},{attr:{y:72,height:6},duration:1.5,ease:'power1.out'},'<0.3')
    .to(scope.querySelectorAll('.fnl91drip:first-of-type'),{attr:{cx:90,cy:72},opacity:0.3,duration:0.15},'<0.2')
    .to(scope.querySelectorAll('.fnl91drip:first-of-type'),{opacity:0,duration:0.3})
    .to(scope.querySelectorAll('.fnl91pool'),{attr:{height:0,y:78},duration:0.6},'+=1');
};

/**
 * @id 91b
 * @name RADAR FILL
 * @section advanced-data
 * @plugins [core]
 * @selectors .rdf91s, .rdf91d, .rdf91outline
 */
effects.play_91b = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    const segs = scope.querySelectorAll('.rdf91s');
    const dots = scope.querySelectorAll('.rdf91d');
    gsap.set(segs,{opacity:0});
    gsap.set(dots,{opacity:0});
    gsap.set(scope.querySelectorAll('.rdf91outline'),{opacity:0});
    segs.forEach((s,i)=>{
      tl.to(s,{opacity:1,duration:0.3,ease:'power2.out'},i*0.25);
      tl.to(dots[i],{opacity:1,duration:0.15},i*0.25+0.15);
    });
    tl.to(scope.querySelectorAll('.rdf91outline'),{opacity:1,duration:0.4},'<0.2');
    tl.to([...segs,...dots,scope.querySelector('.rdf91outline')],{opacity:0,duration:0.5,stagger:0.03},'+=2');
  },1);
};

// ========== SECTION 11: PARTICLE SYSTEMS ==========

/**
 * @id 91c
 * @name STARFIELD
 * @section particle
 * @plugins [core]
 * @selectors .sf91sv
 */
effects.play_91c = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.sf91sv'); if(!sv) return;
  for(let i=0;i<30;i++){
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    const cx = 90, cy = 40; c.setAttribute('r',0.5+Math.random()*1.5);
    c.setAttribute('fill','rgba(196,163,90,'+(0.05+Math.random()*0.15)+')');
    sv.appendChild(c);
    const angle = Math.random()*Math.PI*2;
    gsap.fromTo(c,{attr:{cx:cx+Math.cos(angle)*5,cy:cy+Math.sin(angle)*5}},
      {attr:{cx:cx+Math.cos(angle)*100,cy:cy+Math.sin(angle)*50},duration:1+Math.random()*2,repeat:-1,delay:Math.random()*2,ease:'power2.in',
       onRepeat:function(){gsap.set(c,{attr:{cx:cx+Math.cos(angle)*5,cy:cy+Math.sin(angle)*5}});}});
  }
};

/**
 * @id 92
 * @name FIREFLY
 * @section particle
 * @plugins [core]
 * @selectors .ff92sv
 */
effects.play_92 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.ff92sv'); if(!sv) return;
  for(let i=0;i<10;i++){
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',Math.random()*180); c.setAttribute('cy',Math.random()*80);
    c.setAttribute('r',1.5); c.setAttribute('fill','rgba(196,163,90,0.15)');
    sv.appendChild(c);
    gsap.to(c,{attr:{cx:'+='+((Math.random()-0.5)*40),cy:'+='+((Math.random()-0.5)*20)},duration:3+Math.random()*3,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*2});
    gsap.to(c,{opacity:0,duration:1+Math.random()*2,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()});
  }
};

/**
 * @id 93
 * @name SNOW FALL
 * @section particle
 * @plugins [core]
 * @selectors .sn93sv
 */
effects.play_93 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.sn93sv'); if(!sv) return;
  for(let i=0;i<20;i++){
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    const x = Math.random()*180;
    c.setAttribute('r',0.8+Math.random()*1.5); c.setAttribute('fill','rgba(200,200,210,'+(0.05+Math.random()*0.1)+')');
    sv.appendChild(c);
    gsap.fromTo(c,{attr:{cx:x,cy:-5}},{attr:{cy:85,cx:x+(Math.random()-0.5)*30},duration:3+Math.random()*3,repeat:-1,delay:Math.random()*3,ease:'none'});
  }
};

/**
 * @id 94
 * @name CONFETTI
 * @section particle
 * @plugins [core]
 * @selectors .cf94sv
 */
effects.play_94 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.cf94sv'); if(!sv) return;
  const colors = ['rgba(196,163,90,0.2)','rgba(74,143,212,0.2)','rgba(61,170,90,0.2)','rgba(179,58,58,0.2)','rgba(150,120,200,0.2)'];
  for(let i=0;i<15;i++){
    const r = document.createElementNS('http://www.w3.org/2000/svg','rect');
    const x = Math.random()*180;
    r.setAttribute('width',3+Math.random()*4); r.setAttribute('height',2+Math.random()*3); r.setAttribute('rx','1');
    r.setAttribute('fill',colors[Math.floor(Math.random()*colors.length)]);
    sv.appendChild(r);
    gsap.fromTo(r,{attr:{x,y:-5},rotation:0},{attr:{y:85,x:x+(Math.random()-0.5)*40},rotation:360*Math.random(),duration:2+Math.random()*3,repeat:-1,delay:Math.random()*3,ease:'none'});
  }
};

/**
 * @id 95
 * @name CONSTELLATION
 * @section particle
 * @plugins [core]
 * @selectors .cs95sv
 */
effects.play_95 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.cs95sv'); if(!sv) return;
  const pts = [];
  for(let i=0;i<10;i++){
    const cx = 12+Math.random()*156, cy = 8+Math.random()*64;
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',cx); c.setAttribute('cy',cy); c.setAttribute('r',2);
    c.setAttribute('fill','rgba(196,163,90,0.3)'); sv.appendChild(c); pts.push({x:cx,y:cy,el:c});
    gsap.to(c,{attr:{cx:'+='+((Math.random()-0.5)*10),cy:'+='+((Math.random()-0.5)*6)},duration:4+Math.random()*3,repeat:-1,yoyo:true,ease:'sine.inOut'});
    gsap.to(c,{opacity:0.08,duration:2+Math.random()*2,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()});
  }
  for(let i=0;i<pts.length;i++){
    for(let j=i+1;j<pts.length;j++){
      const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y;
      if(Math.sqrt(dx*dx+dy*dy)<65){
        const l = document.createElementNS('http://www.w3.org/2000/svg','line');
        l.setAttribute('x1',pts[i].x); l.setAttribute('y1',pts[i].y); l.setAttribute('x2',pts[j].x); l.setAttribute('y2',pts[j].y);
        l.setAttribute('stroke','rgba(196,163,90,0.1)'); l.setAttribute('stroke-width','0.8');
        sv.insertBefore(l,sv.firstChild);
        gsap.to(l,{strokeOpacity:0.18,duration:2+Math.random()*2,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*2});
      }
    }
  }
};

/**
 * @id 96
 * @name ENERGY FIELD
 * @section particle
 * @plugins [core]
 * @selectors .ef96sv
 */
effects.play_96 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.ef96sv'); if(!sv) return;
  const cx = 90, cy = 40;
  const gc = document.createElementNS('http://www.w3.org/2000/svg','circle');
  gc.setAttribute('cx',cx); gc.setAttribute('cy',cy); gc.setAttribute('r',10); gc.setAttribute('fill','rgba(196,163,90,0.08)');
  gc.setAttribute('stroke','rgba(196,163,90,0.1)'); gc.setAttribute('stroke-width','1');
  sv.appendChild(gc);
  gsap.to(gc,{attr:{r:14},opacity:0.15,duration:1.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
  for(let i=0;i<20;i++){
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('r',1.5+Math.random()*2);
    c.setAttribute('fill','rgba(196,163,90,'+(0.1+Math.random()*0.2).toFixed(2)+')');
    sv.appendChild(c);
    const angle = Math.random()*Math.PI*2, dist = 12+Math.random()*22;
    gsap.fromTo(c,{attr:{cx:cx+Math.cos(angle)*dist,cy:cy+Math.sin(angle)*dist}},
      {attr:{cx:cx+Math.cos(angle)*(dist+8+Math.random()*10),cy:cy+Math.sin(angle)*(dist+4+Math.random()*8)},
       duration:1.5+Math.random()*2,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*2});
    gsap.to(c,{opacity:0.03,duration:1+Math.random()*1.5,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()});
  }
};

/**
 * @id 97
 * @name METEOR SHOWER
 * @section particle
 * @plugins [core]
 * @selectors .ms97sv
 */
effects.play_97 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.ms97sv'); if(!sv) return;
  // Pre-allocated pool — recycled instead of creating DOM nodes forever.
  const POOL_SIZE = 6;
  const pool = [];
  for(let i=0; i<POOL_SIZE; i++){
    const l = document.createElementNS('http://www.w3.org/2000/svg','line');
    l.setAttribute('stroke','rgba(196,163,90,0.5)');
    l.setAttribute('stroke-width','2');
    l.setAttribute('stroke-linecap','round');
    l.setAttribute('opacity','0');
    sv.appendChild(l);
    pool.push({el:l, busy:false});
  }
  const timeoutIds = new Set();
  let killed = false;
  function meteor(){
    if(killed) return;
    const slot = pool.find(s => !s.busy);
    if(slot){
      slot.busy = true;
      const l = slot.el;
      const sx = 20+Math.random()*140, sy = -5;
      l.setAttribute('x1',sx); l.setAttribute('y1',sy);
      l.setAttribute('x2',sx); l.setAttribute('y2',sy);
      l.setAttribute('opacity','1');
      gsap.to(l,{attr:{x1:sx-55,y1:sy+95,x2:sx-35,y2:sy+60},duration:0.55+Math.random()*0.3,ease:'power2.in',
        onComplete:()=>{
          gsap.to(l,{opacity:0,duration:0.25, onComplete:()=>{ slot.busy = false; }});
        }});
    }
    // If all slots are busy we just skip this tick and wait for the next spawn
    const id = setTimeout(()=>{ timeoutIds.delete(id); meteor(); }, 400+Math.random()*1200);
    timeoutIds.add(id);
  }
  meteor();
  [200, 500].forEach(delay=>{
    const id = setTimeout(()=>{ timeoutIds.delete(id); meteor(); }, delay);
    timeoutIds.add(id);
  });
  return { teardown(){
    killed = true;
    timeoutIds.forEach(clearTimeout);
    timeoutIds.clear();
    pool.forEach(s => {
      gsap.killTweensOf(s.el);
      if(s.el.parentNode) sv.removeChild(s.el);
    });
    pool.length = 0;
  } };
};

/**
 * @id 98
 * @name DNA HELIX
 * @section particle
 * @plugins [core]
 * @selectors .dna98sv
 */
effects.play_98 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.dna98sv'); if(!sv) return;
  const N = 14, amp = 22, cx = 90, cy = 40;
  const strand1 = [], strand2 = [], rungs = [];
  const path1 = document.createElementNS('http://www.w3.org/2000/svg','path');
  path1.setAttribute('fill','none'); path1.setAttribute('stroke','rgba(196,163,90,0.2)'); path1.setAttribute('stroke-width','2'); path1.setAttribute('stroke-linecap','round');
  const path2 = document.createElementNS('http://www.w3.org/2000/svg','path');
  path2.setAttribute('fill','none'); path2.setAttribute('stroke','rgba(74,143,212,0.2)'); path2.setAttribute('stroke-width','2'); path2.setAttribute('stroke-linecap','round');
  sv.appendChild(path1); sv.appendChild(path2);
  for(let i=0;i<N;i++){
    const l = document.createElementNS('http://www.w3.org/2000/svg','line');
    l.setAttribute('stroke','rgba(196,163,90,0.06)'); l.setAttribute('stroke-width','1');
    sv.insertBefore(l,path1);
    rungs.push(l);
    const d1 = document.createElementNS('http://www.w3.org/2000/svg','circle');
    d1.setAttribute('r','2'); d1.setAttribute('fill','rgba(196,163,90,0.15)');
    const d2 = document.createElementNS('http://www.w3.org/2000/svg','circle');
    d2.setAttribute('r','2'); d2.setAttribute('fill','rgba(74,143,212,0.15)');
    sv.appendChild(d1); sv.appendChild(d2);
    strand1.push(d1); strand2.push(d2);
  }
  let t = 0, rafId = 0, killed = false;
  function update(){
    if(killed) return;
    t += 0.03;
    let d1 = 'M', d2 = 'M';
    for(let i=0;i<N;i++){
      const x = 10+i*(160/(N-1));
      const phase = i*0.55+t;
      const y1 = cy+Math.sin(phase)*amp;
      const y2 = cy-Math.sin(phase)*amp;
      const z1 = Math.cos(phase);
      const z2 = -z1;
      d1 += (i===0?'':' L')+x.toFixed(1)+','+y1.toFixed(1);
      d2 += (i===0?'':' L')+x.toFixed(1)+','+y2.toFixed(1);
      strand1[i].setAttribute('cx',x); strand1[i].setAttribute('cy',y1);
      strand1[i].setAttribute('opacity',(0.1+0.15*(z1+1)/2).toFixed(2));
      strand2[i].setAttribute('cx',x); strand2[i].setAttribute('cy',y2);
      strand2[i].setAttribute('opacity',(0.1+0.15*(z2+1)/2).toFixed(2));
      rungs[i].setAttribute('x1',x); rungs[i].setAttribute('y1',y1);
      rungs[i].setAttribute('x2',x); rungs[i].setAttribute('y2',y2);
      const rungOp = Math.max(0,0.08-Math.abs(z1)*0.06);
      rungs[i].setAttribute('stroke-opacity',rungOp.toFixed(3));
    }
    path1.setAttribute('d',d1); path2.setAttribute('d',d2);
    rafId = requestAnimationFrame(update);
  }
  update();
  return { teardown(){
    killed = true;
    cancelAnimationFrame(rafId);
    // Remove the DOM nodes we created so a re-play wouldn't build up layers
    [path1, path2, ...rungs, ...strand1, ...strand2].forEach(n => { if(n.parentNode) n.parentNode.removeChild(n); });
  } };
};

/**
 * @id 99
 * @name WAVE INTERFERENCE
 * @section particle
 * @plugins [core]
 * @selectors .wi99sv, .wi99src
 */
effects.play_99 = function(scope){
  scope = scope || document;
  const sv = scope.querySelector('.wi99sv');
  if(!sv) return;
  const sources = [{cx:50,cy:40,color:'196,163,90'},{cx:130,cy:40,color:'74,143,212'}];
  sources.forEach(src=>{
    for(let i=0;i<8;i++){
      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx',src.cx); c.setAttribute('cy',src.cy); c.setAttribute('r',3);
      c.setAttribute('fill','none');
      c.setAttribute('stroke','rgba('+src.color+',0.2)');
      c.setAttribute('stroke-width','1.5');
      sv.insertBefore(c,sv.firstChild);
      gsap.timeline({repeat:-1,delay:i*0.35})
        .fromTo(c,
          {attr:{r:3},strokeOpacity:0.25,strokeWidth:2},
          {attr:{r:70},strokeOpacity:0,strokeWidth:0.3,duration:2.8,ease:'none'});
    }
  });
  gsap.to(scope.querySelectorAll('.wi99src'),{attr:{r:4.5},duration:0.3,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:0.15});
};

/**
 * @id 100
 * @name AURORA
 * @section particle
 * @plugins [core]
 * @selectors .au100a, .au100b, .au100c, .au100la, .au100lb
 */
effects.play_100 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.au100a'),{attr:{d:'M-10,0 L-10,0 Q20,60 50,42 Q80,25 110,52 Q140,62 170,35 Q185,25 190,0 L190,0 Z'},duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.au100b'),{attr:{d:'M-10,0 L-10,0 Q30,55 60,38 Q90,20 120,48 Q150,58 180,30 Q190,18 190,0 Z'},duration:5,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.au100c'),{attr:{d:'M-10,0 L-10,0 Q25,48 55,32 Q85,22 115,42 Q145,48 175,28 Q190,15 190,0 Z'},duration:6,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.au100la'),{attr:{d:'M0,4 Q45,1 90,5 Q135,1 180,4'},duration:3,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.au100lb'),{attr:{d:'M0,6 Q45,3 90,7 Q135,3 180,6'},duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.au100a'),{opacity:0.8,duration:3,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.au100b'),{opacity:0.7,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.au100la'),{strokeOpacity:0.3,duration:2,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 02
 * @name VEIL DOWN
 * @section entrance
 * @plugins [core]
 * @selectors .vl02, .vl02t
 */
effects.play_02 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    tl.fromTo(scope.querySelectorAll('.vl02'),{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:0.8,ease:'power3.out'})
      .fromTo(scope.querySelectorAll('.vl02t'),{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:0.8,ease:'power3.out'},0)
      .to(scope.querySelectorAll('.vl02, .vl02t'),{clipPath:'inset(0% 0 100% 0)',duration:0.5,ease:'power2.in'},'+=1');
  },1);
};

/**
 * @id 10
 * @name IRIS OPEN
 * @section entrance
 * @plugins [core]
 * @selectors .ir10c
 */
effects.play_10 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.ir10c'),{attr:{r:0}});
    tl.to(scope.querySelectorAll('.ir10c'),{attr:{r:100},duration:0.8,ease:'power3.out'})
      .to(scope.querySelectorAll('.ir10c'),{attr:{r:0},duration:0.5,ease:'power2.in'},'+=1');
  },1);
};

/**
 * @id 58
 * @name SPRING COIL
 * @section morph-transform
 * @plugins [core]
 * @selectors .sc58, .sc58a, .sc58b
 */
effects.play_58 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.sc58'),{attr:{d:'M45,40 Q55,25 65,40 T85,40 T105,40 T125,40 T145,40'},duration:1.4,repeat:-1,yoyo:true,ease:'power2.inOut'});
  gsap.to(scope.querySelectorAll('.sc58a'),{attr:{cx:45},duration:1.4,repeat:-1,yoyo:true,ease:'power2.inOut'});
  gsap.to(scope.querySelectorAll('.sc58b'),{attr:{cx:145},duration:1.4,repeat:-1,yoyo:true,ease:'power2.inOut'});
};

/**
 * @id 79
 * @name LETTERBOX
 * @section composite-cinematic
 * @plugins [core]
 * @selectors .lb79t, .lb79b
 */
effects.play_79 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.lb79t'),{attr:{height:0,y:0}});
    gsap.set(scope.querySelectorAll('.lb79b'),{attr:{height:0,y:80}});
    tl.to(scope.querySelectorAll('.lb79t'),{attr:{height:12,y:0},duration:0.55,ease:'power3.inOut'})
      .to(scope.querySelectorAll('.lb79b'),{attr:{height:12,y:68},duration:0.55,ease:'power3.inOut'},'<')
      .to(scope.querySelectorAll('.lb79t'),{attr:{height:0,y:0},duration:0.55,ease:'power3.inOut'},'+=1.4')
      .to(scope.querySelectorAll('.lb79b'),{attr:{height:0,y:80},duration:0.55,ease:'power3.inOut'},'<');
  },1);
};

/**
 * @id 80
 * @name FOCUS PULL
 * @section composite-cinematic
 * @plugins [core]
 * @selectors .fp80c, .fp80fb
 */
effects.play_80 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.fp80c'),{scale:1.3,opacity:0,transformOrigin:'center'});
    gsap.set(scope.querySelectorAll('.fp80fb'),{attr:{stdDeviation:8}});
    tl.to(scope.querySelectorAll('.fp80c'),{scale:1,opacity:1,duration:0.8,ease:'power3.out'})
      .to(scope.querySelectorAll('.fp80fb'),{attr:{stdDeviation:0},duration:0.8,ease:'power2.out'},0)
      .to(scope.querySelectorAll('.fp80c'),{scale:0.88,opacity:0,duration:0.5,ease:'power2.in'},'+=1.2')
      .to(scope.querySelectorAll('.fp80fb'),{attr:{stdDeviation:6},duration:0.5},'<');
  },1);
};

// ========== SECTION 12: STORYTELLING ==========

/**
 * @id 101
 * @name MILESTONE TIMELINE
 * @section storytelling
 * @plugins [core]
 * @selectors .mt101line, .mt101m, .mt101t, .mt101d
 */
effects.play_101 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.mt101line'),{strokeDasharray:1,strokeDashoffset:1});
    gsap.set(scope.querySelectorAll('.mt101m'),{scale:0,transformOrigin:'center'});
    gsap.set(scope.querySelectorAll('.mt101t, .mt101d'),{opacity:0,y:5});
    tl.to(scope.querySelectorAll('.mt101line'),{strokeDashoffset:0,duration:1,ease:'power2.inOut'})
      .to(scope.querySelectorAll('.mt101m'),{scale:1,duration:0.3,stagger:0.22,ease:'back.out(2)'},0.3)
      .to(scope.querySelectorAll('.mt101t'),{opacity:1,y:0,duration:0.25,stagger:0.22},0.4)
      .to(scope.querySelectorAll('.mt101d'),{opacity:1,y:0,duration:0.25,stagger:0.22},0.55)
      .to(scope.querySelectorAll('.mt101line'),{strokeDashoffset:-1,duration:0.6,ease:'power2.in'},'+=1.5')
      .to(scope.querySelectorAll('.mt101m, .mt101t, .mt101d'),{opacity:0,duration:0.3},'<');
  },1);
};

/**
 * @id 102
 * @name QUOTE REVEAL
 * @section storytelling
 * @plugins [core]
 * @selectors .qr102lq, .qr102rq, .qr102t, .qr102a
 */
effects.play_102 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.qr102lq'),{opacity:0,scale:0.3,transformOrigin:'10px 32px'});
    gsap.set(scope.querySelectorAll('.qr102rq'),{opacity:0,scale:0.3,transformOrigin:'170px 62px'});
    gsap.set(scope.querySelectorAll('.qr102t'),{opacity:0,y:6});
    gsap.set(scope.querySelectorAll('.qr102a'),{opacity:0,x:10});
    tl.to(scope.querySelectorAll('.qr102lq'),{opacity:1,scale:1,duration:0.5,ease:'back.out(2)'})
      .to(scope.querySelectorAll('.qr102rq'),{opacity:1,scale:1,duration:0.5,ease:'back.out(2)'},0.15)
      .to(scope.querySelectorAll('.qr102t'),{opacity:1,y:0,duration:0.6,ease:'power2.out'},0.3)
      .to(scope.querySelectorAll('.qr102a'),{opacity:1,x:0,duration:0.4,ease:'power2.out'},0.7)
      .to(scope.querySelectorAll('.qr102lq, .qr102rq, .qr102t, .qr102a'),{opacity:0,duration:0.3},'+=1.5');
  },1);
};

/**
 * @id 103
 * @name DELTA NUMBER
 * @section storytelling
 * @plugins [core]
 * @selectors .dn103a, .dn103arrow, .dn103b, .dn103label
 */
effects.play_103 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    const a = {v:0}, b = {v:0};
    gsap.set(scope.querySelectorAll('.dn103arrow'),{scaleX:0,transformOrigin:'60px 40px'});
    gsap.set(scope.querySelectorAll('.dn103b, .dn103label'),{opacity:0});
    gsap.set(scope.querySelectorAll('.dn103a'),{opacity:0});
    tl.to(scope.querySelectorAll('.dn103a'),{opacity:1,duration:0.3})
      .to(a,{v:23,duration:0.8,ease:'power3.out',onUpdate:()=>{
        scope.querySelectorAll('.dn103a').forEach(e=>e.textContent=Math.round(a.v)+'%');
      }},'<')
      .to(scope.querySelectorAll('.dn103arrow'),{scaleX:1,duration:0.5,ease:'power2.out'},'+=0.3')
      .to(scope.querySelectorAll('.dn103b'),{opacity:1,duration:0.3},'+=0.1')
      .to(b,{v:42,duration:1,ease:'power3.out',onUpdate:()=>{
        scope.querySelectorAll('.dn103b').forEach(e=>e.textContent=Math.round(b.v)+'%');
      }},'<')
      .to(scope.querySelectorAll('.dn103label'),{opacity:1,duration:0.4},'-=0.3')
      .to(scope.querySelectorAll('.dn103a, .dn103arrow, .dn103b, .dn103label'),{opacity:0,duration:0.3},'+=1.5');
  },1);
};

/**
 * @id 104
 * @name TAG BURST
 * @section storytelling
 * @plugins [core]
 * @selectors .tb104g
 */
effects.play_104 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    scope.querySelectorAll('.tb104g').forEach((g,i)=>{
      const tx = +g.dataset.tx, ty = +g.dataset.ty;
      gsap.set(g,{opacity:0,x:-tx,y:-ty,scale:0.3,transformOrigin:'center'});
      tl.to(g,{opacity:1,x:0,y:0,scale:1,duration:0.5,ease:'back.out(1.4)'},i*0.08);
    });
    tl.to(scope.querySelectorAll('.tb104g'),{opacity:0,scale:0.8,duration:0.3,stagger:0.04},'+=1.5');
  },1);
};

/**
 * @id 105
 * @name MAP PIN DROP
 * @section storytelling
 * @plugins [core]
 * @selectors .mp105pin, .mp105sh, .mp105r1, .mp105r2
 */
effects.play_105 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.mp105pin'),{y:-45,opacity:0});
    gsap.set(scope.querySelectorAll('.mp105sh'),{scale:0.3,opacity:0,transformOrigin:'center'});
    gsap.set(scope.querySelectorAll('.mp105r1, .mp105r2'),{attr:{r:4},opacity:0});
    tl.to(scope.querySelectorAll('.mp105pin'),{opacity:1,duration:0.15},0)
      .to(scope.querySelectorAll('.mp105pin'),{y:0,duration:0.45,ease:'power2.in'},0)
      .to(scope.querySelectorAll('.mp105sh'),{scale:1,opacity:1,duration:0.2,ease:'power2.out'},0.4)
      .fromTo(scope.querySelectorAll('.mp105r1'),{attr:{r:4},opacity:0.6,strokeWidth:2},{attr:{r:28},opacity:0,strokeWidth:0.3,duration:1,ease:'power1.out'},0.45)
      .fromTo(scope.querySelectorAll('.mp105r2'),{attr:{r:4},opacity:0.4,strokeWidth:1.5},{attr:{r:22},opacity:0,strokeWidth:0.3,duration:1,ease:'power1.out'},0.55)
      .to(scope.querySelectorAll('.mp105pin'),{y:-4,duration:0.15,ease:'power2.out',yoyo:true,repeat:1},0.45)
      .to(scope.querySelectorAll('.mp105pin, .mp105sh'),{opacity:0,duration:0.3},'+=1.5');
  },1);
};

/**
 * @id 106
 * @name CHAT BUBBLE
 * @section storytelling
 * @plugins [core]
 * @selectors .cb106b1, .cb106b2, .cb106b3, .cb106d1, .cb106d2, .cb106d3
 */
effects.play_106 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.cb106b1, .cb106b3'),{opacity:0,scale:0.85,transformOrigin:'left center'});
    gsap.set(scope.querySelectorAll('.cb106b2'),{opacity:0,scale:0.85,transformOrigin:'right center'});
    tl.to(scope.querySelectorAll('.cb106b1'),{opacity:1,scale:1,duration:0.4,ease:'back.out(1.8)'})
      .to(scope.querySelectorAll('.cb106b2'),{opacity:1,scale:1,duration:0.4,ease:'back.out(1.8)'},'+=0.6')
      .to(scope.querySelectorAll('.cb106b3'),{opacity:1,scale:1,duration:0.4,ease:'back.out(1.8)'},'+=0.5')
      .to(scope.querySelectorAll('.cb106d1'),{opacity:0.3,duration:0.3,repeat:4,yoyo:true},'<')
      .to(scope.querySelectorAll('.cb106d2'),{opacity:0.3,duration:0.3,repeat:4,yoyo:true,delay:0.1},'<')
      .to(scope.querySelectorAll('.cb106d3'),{opacity:0.3,duration:0.3,repeat:4,yoyo:true,delay:0.2},'<')
      .to(scope.querySelectorAll('.cb106b1, .cb106b2, .cb106b3'),{opacity:0,duration:0.3,stagger:0.08},'+=0.8');
  },1);
};

/**
 * @id 107
 * @name TERMINAL TYPE
 * @section storytelling
 * @plugins [core]
 * @selectors .tt107cmd, .tt107cur, .tt107out1, .tt107out2, .tt107p2
 */
effects.play_107 = function(scope){
  scope = scope || document;
  const cmd = scope.querySelector('.tt107cmd');
  const cur = scope.querySelector('.tt107cur');
  const o1 = scope.querySelector('.tt107out1');
  const o2 = scope.querySelector('.tt107out2');
  const p2 = scope.querySelector('.tt107p2');
  if(!cmd) return;
  const command = 'asyre build --prod';
  gsap.to(cur,{opacity:0,duration:0.4,repeat:-1,yoyo:true,ease:'steps(1)'});
  function runLoop(){
    cmd.textContent=''; o1.textContent=''; o2.textContent=''; p2.textContent='';
    cur.setAttribute('x',18);
    let i = 0;
    const typeInt = setInterval(()=>{
      if(i < command.length){
        cmd.textContent = command.slice(0,++i);
        cur.setAttribute('x',18+i*4.2);
      } else {
        clearInterval(typeInt);
        setTimeout(()=>{
          o1.textContent = '✓ Compiled successfully';
          setTimeout(()=>{
            o2.textContent = '  Built 8 files · 42.3 KB gzipped';
            setTimeout(()=>{p2.textContent='$ _';},400);
          },400);
        },400);
      }
    },60);
    setTimeout(runLoop,6500);
  }
  runLoop();
};

/**
 * @id 108
 * @name BADGE RIBBON
 * @section storytelling
 * @plugins [core]
 * @selectors .br108
 */
effects.play_108 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.br108'),{x:80,y:-30,rotation:45,opacity:0,transformOrigin:'150px 22px'});
    tl.to(scope.querySelectorAll('.br108'),{x:0,y:0,rotation:12,opacity:1,duration:0.6,ease:'back.out(2)'})
      .to(scope.querySelectorAll('.br108'),{rotation:14,duration:0.15,yoyo:true,repeat:1,ease:'sine.inOut'},'+=0.1')
      .to(scope.querySelectorAll('.br108'),{x:80,y:-30,rotation:45,opacity:0,duration:0.4,ease:'power2.in'},'+=1.8');
  },1);
};

/**
 * @id 109
 * @name COUNTDOWN DIGITS
 * @section storytelling
 * @plugins [core]
 * @selectors .cd109
 */
effects.play_109 = function(scope){
  scope = scope || document;
  const el = scope.querySelector('.cd109');
  if(!el) return;
  const seq = ['3','2','1','GO!'];
  const colors = ['rgba(196,163,90,0.95)','rgba(74,143,212,0.95)','rgba(179,58,58,0.95)','rgba(61,170,90,1)'];
  let i = 0;
  function next(){
    el.textContent = seq[i]; el.setAttribute('fill',colors[i]);
    gsap.fromTo(el,{scale:2.2,opacity:0,transformOrigin:'center'},{scale:1,opacity:1,duration:0.3,ease:'back.out(2)'});
    gsap.to(el,{scale:1.4,opacity:0,duration:0.35,delay:0.7,ease:'power2.in',onComplete:()=>{
      i = (i+1) % seq.length;
      setTimeout(next,150);
    }});
  }
  next();
};

/**
 * @id 110
 * @name FLASH REVEAL
 * @section storytelling
 * @plugins [core]
 * @selectors .fr110f, .fr110t, .fr110s
 */
effects.play_110 = function(scope){
  scope = scope || document;
  return _loop(scope, (tl)=>{
    gsap.set(scope.querySelectorAll('.fr110f'),{opacity:0});
    gsap.set(scope.querySelectorAll('.fr110t, .fr110s'),{opacity:0,scale:0.88,transformOrigin:'center'});
    tl.to(scope.querySelectorAll('.fr110f'),{opacity:1,duration:0.08,ease:'power2.out'})
      .to(scope.querySelectorAll('.fr110f'),{opacity:0,duration:0.5,ease:'power2.in'})
      .to(scope.querySelectorAll('.fr110t'),{opacity:1,scale:1,duration:0.4,ease:'back.out(1.8)'},'-=0.35')
      .to(scope.querySelectorAll('.fr110s'),{opacity:1,scale:1,duration:0.3,ease:'power2.out'},'-=0.2')
      .to(scope.querySelectorAll('.fr110t, .fr110s'),{opacity:0,duration:0.4},'+=1.5');
  },1);
};

// ========== SECTION 13: PERPETUAL II ==========

/**
 * @id 121 @name WAVE TRAVEL @section perpetual-ii @plugins [core] @selectors .wt121
 */
effects.play_121 = function(scope){
  scope = scope || document;
  const el = scope.querySelector('.wt121'); if(!el) return;
  let phase = 0;
  const tick = ()=>{
    phase += 0.05;
    const pts = [];
    for(let x=0;x<=180;x+=4) pts.push(x+','+(40+Math.sin(x/18+phase)*12).toFixed(1));
    el.setAttribute('points',pts.join(' '));
  };
  gsap.ticker.add(tick);
  return { teardown(){ gsap.ticker.remove(tick); } };
};

/**
 * @id 122 @name TIDE ROLL @section perpetual-ii @plugins [core] @selectors .tr122f, .tr122l
 */
effects.play_122 = function(scope){
  scope = scope || document;
  const f = scope.querySelector('.tr122f'), l = scope.querySelector('.tr122l');
  if(!f) return;
  let phase = 0;
  const tick = ()=>{
    phase += 0.04;
    const top = [];
    for(let x=0;x<=180;x+=4){
      const y = 48+Math.sin(x/20+phase)*9+Math.sin(x/10+phase*1.3)*3;
      top.push(x+','+y.toFixed(1));
    }
    l.setAttribute('points',top.join(' '));
    f.setAttribute('points',top.join(' ')+' 180,80 0,80');
  };
  gsap.ticker.add(tick);
  return { teardown(){ gsap.ticker.remove(tick); } };
};

/**
 * @id 123 @name FLOW LINES @section perpetual-ii @plugins [core] @selectors .fl123a, .fl123b, .fl123c, .fl123d
 */
effects.play_123 = function(scope){
  scope = scope || document;
  [['a',3],['b',4.5],['c',2.8],['d',5]].forEach(([s,dur])=>{
    const el = scope.querySelectorAll('.fl123'+s);
    gsap.timeline({repeat:-1})
      .set(el,{x:-40,opacity:0})
      .to(el,{opacity:1,duration:dur*0.15,ease:'power1.out'})
      .to(el,{x:140,duration:dur*0.7,ease:'none'},'<')
      .to(el,{x:210,opacity:0,duration:dur*0.15,ease:'power1.in'});
  });
};

/**
 * @id 124 @name RIPPLE GRID @section perpetual-ii @plugins [core] @selectors .rg124sv
 */
effects.play_124 = function(scope){
  scope = scope || document;
  const g = scope.querySelector('.rg124sv'); if(!g) return;
  const cells = [];
  for(let r=0;r<4;r++)for(let c=0;c<9;c++){
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x',10+c*19);rect.setAttribute('y',10+r*16);
    rect.setAttribute('width',15);rect.setAttribute('height',12);rect.setAttribute('rx','2');
    rect.setAttribute('fill','rgba(196,163,90,0.06)');
    g.appendChild(rect);cells.push({el:rect,col:c});
  }
  let phase = 0;
  const tick = ()=>{
    phase += 0.08;
    cells.forEach(({el,col})=>{
      const i = Math.max(0,Math.sin(phase-col*0.5));
      el.setAttribute('fill','rgba(196,163,90,'+(0.05+i*0.2).toFixed(3)+')');
    });
  };
  gsap.ticker.add(tick);
  return { teardown(){
    gsap.ticker.remove(tick);
    cells.forEach(({el}) => { if(el.parentNode) g.removeChild(el); });
    cells.length = 0;
  } };
};

/**
 * @id 125 @name COLOR CYCLE @section perpetual-ii @plugins [core] @selectors .cc125
 */
effects.play_125 = function(scope){
  scope = scope || document;
  const el = scope.querySelector('.cc125'); if(!el) return;
  gsap.to({h:40},{h:200,duration:4.5,repeat:-1,yoyo:true,ease:'sine.inOut',onUpdate:function(){
    el.setAttribute('fill','hsl('+this.targets()[0].h+',55%,55%)');
  }});
  gsap.to(el,{scale:1.06,transformOrigin:'center',duration:2.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 126 @name STARBURST RAYS @section perpetual-ii @plugins [core] @selectors .sb126
 */
effects.play_126 = function(scope){
  scope = scope || document;
  const star = scope.querySelector('.sb126star');
  if(star){
    const pts=[], n=8, step=Math.PI/n, cx=90, cy=40, rO=27, rI=9;
    for(let i=0;i<n*2;i++){
      const r = i%2===0?rO:rI;
      const a = i*step-Math.PI/2;
      pts.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1));
    }
    star.setAttribute('points',pts.join(' '));
  }
  gsap.to(scope.querySelectorAll('.sb126'),{rotation:360,svgOrigin:'90 40',duration:15,repeat:-1,ease:'none'});
  gsap.to(scope.querySelectorAll('.sb126star'),{scale:1.12,svgOrigin:'90 40',opacity:0.8,duration:1.8,repeat:-1,yoyo:true,ease:'sine.inOut'});
};

/**
 * @id 127 @name SONAR PING @section perpetual-ii @plugins [core] @selectors .sp127p1, .sp127p2, .sp127p3
 */
effects.play_127 = function(scope){
  scope = scope || document;
  gsap.timeline({repeat:-1,repeatDelay:0.3}).fromTo(scope.querySelectorAll('.sp127p1'),{attr:{r:4},strokeOpacity:0.55},{attr:{r:36},strokeOpacity:0,duration:1.8,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:0.6,repeatDelay:0.3}).fromTo(scope.querySelectorAll('.sp127p2'),{attr:{r:4},strokeOpacity:0.55},{attr:{r:36},strokeOpacity:0,duration:1.8,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:1.2,repeatDelay:0.3}).fromTo(scope.querySelectorAll('.sp127p3'),{attr:{r:4},strokeOpacity:0.55},{attr:{r:36},strokeOpacity:0,duration:1.8,ease:'power1.out'});
};

/**
 * @id 128 @name BROADCAST @section perpetual-ii @plugins [core] @selectors .bc128w1, .bc128w2, .bc128w3
 */
effects.play_128 = function(scope){
  scope = scope || document;
  gsap.timeline({repeat:-1,repeatDelay:0.3}).fromTo(scope.querySelectorAll('.bc128w1'),{strokeOpacity:0.6,scale:0.5,svgOrigin:'90 30'},{strokeOpacity:0,scale:1,duration:1.5,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:0.5,repeatDelay:0.3}).fromTo(scope.querySelectorAll('.bc128w2'),{strokeOpacity:0.5,scale:0.4,svgOrigin:'90 30'},{strokeOpacity:0,scale:1,duration:1.5,ease:'power1.out'});
  gsap.timeline({repeat:-1,delay:1,repeatDelay:0.3}).fromTo(scope.querySelectorAll('.bc128w3'),{strokeOpacity:0.4,scale:0.3,svgOrigin:'90 30'},{strokeOpacity:0,scale:1,duration:1.5,ease:'power1.out'});
};

/**
 * @id 129 @name ENERGY CORE @section perpetual-ii @plugins [core] @selectors .ec129core, .ec129inner, .ec129ring1, .ec129ring2
 */
effects.play_129 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.ec129core'),{scale:1.12,svgOrigin:'90 40',duration:1.6,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.ec129inner'),{opacity:0.4,scale:1.15,svgOrigin:'90 40',duration:0.85,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.ec129aura'),{scale:1.18,opacity:0.2,svgOrigin:'90 40',duration:2.4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(scope.querySelectorAll('.ec129ring1'),{rotation:360,svgOrigin:'90 40',duration:22,repeat:-1,ease:'none'});
  gsap.to(scope.querySelectorAll('.ec129ring2'),{rotation:-360,svgOrigin:'90 40',duration:15,repeat:-1,ease:'none'});
  gsap.timeline({repeat:-1,repeatDelay:0.6}).fromTo(scope.querySelectorAll('.ec129emit'),{attr:{r:10},strokeOpacity:0.6},{attr:{r:30},strokeOpacity:0,duration:2,ease:'power1.out'});
};

/**
 * @id 130 @name MAGNETIC LINES @section perpetual-ii @plugins [core] @selectors .ml130a-f
 */
effects.play_130 = function(scope){
  scope = scope || document;
  ['ml130a','ml130b','ml130c','ml130d','ml130e','ml130f'].forEach((cls,i)=>{
    gsap.timeline({repeat:-1,delay:i*0.28})
      .to(scope.querySelectorAll('.'+cls),{strokeOpacity:0.6,duration:1.1,ease:'sine.inOut'})
      .to(scope.querySelectorAll('.'+cls),{strokeOpacity:0.08,duration:1.1,ease:'sine.inOut'});
  });
};

/**
 * @id 131 @name CLOCK TICK @section perpetual-ii @plugins [core] @selectors .ct131m, .ct131h
 */
effects.play_131 = function(scope){
  scope = scope || document;
  gsap.to(scope.querySelectorAll('.ct131m'),{rotation:360,svgOrigin:'90 40',duration:6,repeat:-1,ease:'none'});
  gsap.to(scope.querySelectorAll('.ct131h'),{rotation:360,svgOrigin:'90 40',duration:72,repeat:-1,ease:'none'});
};

/**
 * @id 132 @name GEAR MESH @section perpetual-ii @plugins [core] @selectors .gm132a, .gm132b
 */
effects.play_132 = function(scope){
  scope = scope || document;
  function gearPts(cx,cy,teeth,rO,rI,phase){
    const pts=[], step=Math.PI/teeth;
    for(let i=0;i<teeth*2;i++){
      const r = i%2===0?rO:rI;
      const a = i*step+(phase||0)-Math.PI/2;
      pts.push((cx+r*Math.cos(a)).toFixed(2)+','+(cy+r*Math.sin(a)).toFixed(2));
    }
    return pts.join(' ');
  }
  const gA = scope.querySelector('.gm132ap');
  const gB = scope.querySelector('.gm132bp');
  if(gA) gA.setAttribute('points',gearPts(55,40,12,18,14));
  if(gB) gB.setAttribute('points',gearPts(85,40,8,12,9,Math.PI/8));
  gsap.to(scope.querySelectorAll('.gm132a'),{rotation:360,svgOrigin:'55 40',duration:9,repeat:-1,ease:'none'});
  gsap.to(scope.querySelectorAll('.gm132b'),{rotation:-360,svgOrigin:'85 40',duration:6,repeat:-1,ease:'none'});
};

/**
 * @id 133 @name ATOMIC ORBIT @section perpetual-ii @plugins [core] @selectors .ao133e1, .ao133e2, .ao133e3
 */
effects.play_133 = function(scope){
  scope = scope || document;
  const e1 = scope.querySelector('.ao133e1');
  const e2 = scope.querySelector('.ao133e2');
  const e3 = scope.querySelector('.ao133e3');
  if(!e1) return;
  let t = 0;
  const tick = ()=>{
    t += 0.025;
    e1.setAttribute('cx',90+42*Math.cos(t));
    e1.setAttribute('cy',40+12*Math.sin(t));
    const a2=t*1.3, ax=42*Math.cos(a2), ay=12*Math.sin(a2), r2=Math.PI/3;
    e2.setAttribute('cx',90+ax*Math.cos(r2)-ay*Math.sin(r2));
    e2.setAttribute('cy',40+ax*Math.sin(r2)+ay*Math.cos(r2));
    const a3=t*1.6, bx=42*Math.cos(a3), by=12*Math.sin(a3), r3=-Math.PI/3;
    e3.setAttribute('cx',90+bx*Math.cos(r3)-by*Math.sin(r3));
    e3.setAttribute('cy',40+bx*Math.sin(r3)+by*Math.cos(r3));
  };
  gsap.ticker.add(tick);
  return { teardown(){ gsap.ticker.remove(tick); } };
};

/**
 * @id 134 @name HOURGLASS SAND @section perpetual-ii @plugins [core] @selectors .hg134top, .hg134bot, .hg134sand
 * @html-requires polygon.hg134top (init "60,10 90,10 120,10 94,40 86,40"), polygon.hg134bot (init "60,70 90,70 120,70 120,70 60,70"), g.hg134sand (empty)
 */
effects.play_134 = function(scope){
  scope = scope || document;
  const top = scope.querySelector('.hg134top');
  const bot = scope.querySelector('.hg134bot');
  const g = scope.querySelector('.hg134sand');
  if(!top||!bot||!g) return;
  const state = {p:0};
  let killed = false;
  let spawnTimeoutId = 0;
  const activeCircles = new Set();
  function render(){
    const p = state.p;
    const ty = 10+30*p;
    const tx1 = 60+26*p, tx2 = 120-26*p;
    const tSag = 2*(1-p);
    top.setAttribute('points',`${tx1.toFixed(1)},${ty.toFixed(1)} 90,${(ty+tSag).toFixed(1)} ${tx2.toFixed(1)},${ty.toFixed(1)} 94,40 86,40`);
    const by = 70-30*p;
    const bx1 = 60+26*p, bx2 = 120-26*p;
    const bPeak = 3*p;
    bot.setAttribute('points',`${bx1.toFixed(1)},${by.toFixed(1)} 90,${(by-bPeak).toFixed(1)} ${bx2.toFixed(1)},${by.toFixed(1)} 120,70 60,70`);
  }
  render();
  function spawn(){
    if(killed) return;
    if(state.p<0.97){
      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      const startX = 90+(Math.random()-0.5)*1.6;
      c.setAttribute('cx',startX);
      c.setAttribute('cy',40);
      c.setAttribute('r',0.55+Math.random()*0.65);
      c.setAttribute('fill','rgba(196,163,90,'+(0.7+Math.random()*0.25)+')');
      g.appendChild(c);
      activeCircles.add(c);
      const surfY = 70-30*state.p-3*state.p;
      const targetY = Math.max(42,surfY-1);
      gsap.to(c,{attr:{cy:targetY,cx:startX+(Math.random()-0.5)*3.5},duration:0.35+Math.random()*0.15,ease:'power2.in',
        onComplete:()=>{
          if(c.parentNode) g.removeChild(c);
          activeCircles.delete(c);
        }});
    }
    // 70ms average spawn (was 50-85ms) — ~25% fewer DOM nodes without losing rhythm
    spawnTimeoutId = setTimeout(spawn,55+Math.random()*40);
  }
  spawn();
  const mainTween = gsap.to(state,{p:1,duration:4.5,ease:'none',repeat:-1,repeatDelay:0.7,
    onUpdate:render,onRepeat:()=>{state.p=0;render();}});
  return { teardown(){
    killed = true;
    clearTimeout(spawnTimeoutId);
    mainTween.kill();
    activeCircles.forEach(c => {
      gsap.killTweensOf(c);
      if(c.parentNode) g.removeChild(c);
    });
    activeCircles.clear();
  } };
};

/**
 * @id 135 @name VORTEX SWIRL @section perpetual-ii @plugins [core] @selectors .vs135
 */
effects.play_135 = function(scope){
  scope = scope || document;
  const el = scope.querySelector('.vs135'); if(!el) return;
  const pts = [];
  for(let a=0;a<Math.PI*4.5;a+=0.1){
    const r = 2+a*3;
    pts.push((90+r*Math.cos(a)).toFixed(1)+','+(40+r*Math.sin(a)).toFixed(1));
  }
  el.setAttribute('points',pts.join(' '));
  return gsap.to(el,{rotation:-360,svgOrigin:'90 40',duration:6,repeat:-1,ease:'none'});
};

/**
 * @id 136 @name GLOW COMET @section perpetual-ii @plugins [core] @selectors .gc136head, .gc136t1-4
 */
effects.play_136 = function(scope){
  scope = scope || document;
  const h = scope.querySelector('.gc136head');
  const t1 = scope.querySelector('.gc136t1');
  const t2 = scope.querySelector('.gc136t2');
  const t3 = scope.querySelector('.gc136t3');
  const t4 = scope.querySelector('.gc136t4');
  if(!h) return;
  let a = 0;
  const tick = ()=>{
    a += 0.025;
    [[h,0],[t1,0.09],[t2,0.18],[t3,0.27],[t4,0.36]].forEach(([el,off])=>{
      if(!el) return;
      const ang = a-off;
      el.setAttribute('cx',90+22*Math.cos(ang));
      el.setAttribute('cy',40+22*Math.sin(ang));
    });
  };
  gsap.ticker.add(tick);
  return { teardown(){ gsap.ticker.remove(tick); } };
};

/**
 * @id 137 @name ELECTRIC ARC @section perpetual-ii @plugins [core] @selectors .ea137
 */
effects.play_137 = function(scope){
  scope = scope || document;
  const el = scope.querySelector('.ea137');
  const halo = scope.querySelector('.ea137halo');
  const nodes = scope.querySelectorAll('.ea137node');
  if(!el) return;
  function zap(){
    const pts = ['M32,40']; // 起点止于左节点边缘（cx-r=32）
    for(let x=42;x<148;x+=10){
      pts.push('L'+x+','+(40+(Math.random()-0.5)*26).toFixed(1));
    }
    pts.push('L148,40'); // 终点止于右节点边缘（cx-r=148）
    el.setAttribute('d',pts.join(' '));
    if(halo) halo.setAttribute('d',pts.join(' '));
    gsap.timeline({onComplete:()=>setTimeout(zap,600+Math.random()*900)})
      .set(halo?[el,halo]:[el],{opacity:1})
      .to(nodes,{attr:{stroke:'rgba(255,255,255,1)'},duration:0.04},0)
      .to(halo?[el,halo]:[el],{opacity:0.4,duration:0.05})
      .to(halo?[el,halo]:[el],{opacity:1,duration:0.04})
      .to(halo?[el,halo]:[el],{opacity:0.6,duration:0.05})
      .to(halo?[el,halo]:[el],{opacity:1,duration:0.04})
      .to(halo?[el,halo]:[el],{opacity:0,duration:0.3,ease:'power2.in'},'+=0.1')
      .to(nodes,{attr:{stroke:'rgba(220,230,255,0.7)'},duration:0.3},'<');
  }
  setTimeout(zap,500);
};

/**
 * @id 138 @name DOT MATRIX @section perpetual-ii @plugins [core] @selectors .dm138sv
 */
effects.play_138 = function(scope){
  scope = scope || document;
  const g = scope.querySelector('.dm138sv'); if(!g) return;
  const dots = [];
  for(let r=0;r<5;r++)for(let c=0;c<15;c++){
    const d = document.createElementNS('http://www.w3.org/2000/svg','circle');
    d.setAttribute('cx',15+c*11);d.setAttribute('cy',15+r*12);
    d.setAttribute('r',1.8);d.setAttribute('fill','rgba(196,163,90,0.15)');
    g.appendChild(d);dots.push({el:d,col:c,row:r});
  }
  let phase = 0;
  // 160ms > 120ms: reduce per-second setAttribute ops from 625 to 469 (75 dots × 6.25/s)
  const intervalId = setInterval(()=>{
    phase += 0.32;  // slightly larger step compensates for fewer frames
    dots.forEach(({el,col,row})=>{
      const wave = Math.sin(phase-col*0.4-row*0.15);
      const flicker = Math.random()>0.88;
      const bright = Math.max(0,wave)*0.6+(flicker?0.3:0)+0.12;
      el.setAttribute('fill','rgba(196,163,90,'+Math.min(bright,0.88).toFixed(2)+')');
    });
  },160);
  return { teardown(){
    clearInterval(intervalId);
    dots.forEach(({el}) => { if(el.parentNode) g.removeChild(el); });
    dots.length = 0;
  } };
};

/**
 * @id 139 @name NETWORK PULSE @section perpetual-ii @plugins [core] @selectors .np139n1-3, .np139pulse
 */
effects.play_139 = function(scope){
  scope = scope || document;
  return gsap.timeline({repeat:-1,repeatDelay:0.4})
    .set(scope.querySelectorAll('.np139pulse'),{attr:{cx:30,cy:40},opacity:0})
    .to(scope.querySelectorAll('.np139n1'),{attr:{fill:'rgba(255,240,200,0.6)'},duration:0.12})
    .to(scope.querySelectorAll('.np139pulse'),{opacity:1,duration:0.1},'<')
    .to(scope.querySelectorAll('.np139n1'),{attr:{fill:'rgba(196,163,90,0.2)'},duration:0.3},'+=0.05')
    .to(scope.querySelectorAll('.np139pulse'),{attr:{cx:90},duration:0.55,ease:'power1.inOut'},'-=0.45')
    .to(scope.querySelectorAll('.np139n2'),{attr:{fill:'rgba(255,240,200,0.6)'},duration:0.12},'-=0.05')
    .to(scope.querySelectorAll('.np139pulse'),{opacity:0,duration:0.08})
    .to(scope.querySelectorAll('.np139n2'),{attr:{fill:'rgba(196,163,90,0.2)'},duration:0.3})
    .set(scope.querySelectorAll('.np139pulse'),{attr:{cx:90},opacity:1})
    .to(scope.querySelectorAll('.np139pulse'),{attr:{cx:150},duration:0.55,ease:'power1.inOut'},'-=0.1')
    .to(scope.querySelectorAll('.np139n3'),{attr:{fill:'rgba(255,240,200,0.6)'},duration:0.12},'-=0.05')
    .to(scope.querySelectorAll('.np139pulse'),{opacity:0,duration:0.08})
    .to(scope.querySelectorAll('.np139n3'),{attr:{fill:'rgba(196,163,90,0.2)'},duration:0.3});
};

/**
 * @id 140 @name WIND STREAKS @section perpetual-ii @plugins [core] @selectors .ws140a-g
 */
effects.play_140 = function(scope){
  scope = scope || document;
  ['a','b','c','d','e','f','g'].forEach((s,i)=>{
    const yDrift = (Math.random()-0.5)*3;
    gsap.timeline({repeat:-1,delay:i*0.25})
      .fromTo(scope.querySelectorAll('.ws140'+s),{x:-30,y:0},{x:210,y:yDrift,duration:2.5+Math.random()*1.5,ease:'none'});
  });
};

// Expose to window for non-module usage
if (typeof window !== 'undefined') window.effects = effects;
if (typeof module !== 'undefined' && module.exports) module.exports = effects;
