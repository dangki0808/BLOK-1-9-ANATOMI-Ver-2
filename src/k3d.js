/* ====== MODEL 3D: kit penampil diorama (three.js r147, dimuat saat dibutuhkan) ====== */
const SC3={};            // registry: id -> {t, d, R, target, build(K,root,api)}
const LAB3D={};          // lab id -> scene id (+ fokus)
const THREE_URLS=['https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js','https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/controls/OrbitControls.js'];
let _threeP=null;
function loadThree(){
  if(window.THREE&&THREE.OrbitControls)return Promise.resolve();
  if(_threeP)return _threeP;
  const one=src=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=()=>rej(new Error('gagal memuat '+src));document.head.appendChild(s)});
  _threeP=(window.THREE?Promise.resolve():one(THREE_URLS[0])).then(()=>THREE.OrbitControls?0:one(THREE_URLS[1])).catch(e=>{_threeP=null;throw e});
  return _threeP;
}
function visChain(o){while(o){if(!o.visible)return false;o=o.parent}return true}
function webglOK(){try{const c=document.createElement('canvas');return!!(c.getContext('webgl2')||c.getContext('webgl'))}catch(e){return false}}

/* ---- pembuat bentuk ---- */
function makeKit(){
  const T=THREE,cache={};
  const mat=(c,o={})=>{const {unique,...p}=o,k=c+JSON.stringify(p);const mk=()=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.62,metalness:.04},p));if(unique)return mk();return cache[k]||(cache[k]=mk())};
  const glass=(c='#bfe3f2',op=.28)=>mat(c,{transparent:true,opacity:op,roughness:.1,depthWrite:false});
  const glow=(c,i=.9)=>mat(c,{emissive:c,emissiveIntensity:i});
  const mesh=(g,m)=>{const x=new T.Mesh(g,typeof m==='string'?mat(m):m);x.castShadow=true;x.receiveShadow=true;return x};
  const K={T,mat,glass,glow,mesh,
    V:(x,y,z)=>new T.Vector3(x,y,z),
    g:()=>new T.Group(),
    box:(w,h,d,m)=>mesh(new T.BoxGeometry(w,h,d),m),
    rbox:(w,h,d,r,m)=>{const s=new T.Shape(),x=-w/2,y=-d/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+d-r);s.quadraticCurveTo(x+w,y+d,x+w-r,y+d);s.lineTo(x+r,y+d);s.quadraticCurveTo(x,y+d,x,y+d-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
      const geo=new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:true,bevelThickness:Math.min(.06,h/4),bevelSize:Math.min(.06,r/2),bevelSegments:2,curveSegments:6});geo.rotateX(-Math.PI/2);geo.translate(0,-h/2,0);return mesh(geo,m)},
    cyl:(rt,rb,h,m,seg=24,open=false,th=Math.PI*2)=>mesh(new T.CylinderGeometry(rt,rb,h,seg,1,open,0,th),m),
    sph:(r,m,ws=24,hs=16)=>mesh(new T.SphereGeometry(r,ws,hs),m),
    cap:(r,len,m)=>mesh(new T.CapsuleGeometry(r,len,6,14),m),
    tor:(R,r,m,arc=Math.PI*2,ts=40)=>mesh(new T.TorusGeometry(R,r,12,ts,arc),m),
    cone:(r,h,m,seg=20)=>mesh(new T.ConeGeometry(r,h,seg),m),
    lathe:(pts,m,seg=36)=>mesh(new T.LatheGeometry(pts.map(p=>new T.Vector2(p[0],p[1])),seg),m),
    tube:(pts,r,m,seg=48,closed=false)=>mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(p=>p.isVector3?p:new T.Vector3(...p)),closed),seg,r,10,closed),m),
    curve:pts=>new T.CatmullRomCurve3(pts.map(p=>p.isVector3?p:new T.Vector3(...p))),
    ext:(pts,depth,m)=>{const s=new T.Shape(pts.map(p=>new T.Vector2(p[0],p[1])));const geo=new T.ExtrudeGeometry(s,{depth,bevelEnabled:false});return mesh(geo,m)},
    put(o,x=0,y=0,z=0,rx=0,ry=0,rz=0,parent){o.position.set(x,y,z);o.rotation.set(rx,ry,rz);if(parent)parent.add(o);return o},
    sc(o,x,y=x,z=x){o.scale.set(x,y,z);return o},
    rnd:(a,b)=>a+Math.random()*(b-a),
    // alas diorama putih bergaya maket
    base(w,d,parent,col='#f6f3ee'){const b=K.rbox(w,.4,d,.35,mat(col,{roughness:.9}));b.position.y=-.2;b.castShadow=false;parent.add(b);const e=K.rbox(w+.12,.18,d+.12,.4,mat('#d9d2c7',{roughness:.9}));e.position.y=-.36;e.castShadow=false;parent.add(e);return b},
    floor(w,d,parent,col='#a0825f'){const f=K.box(w,.06,d,mat(col,{roughness:.75}));f.position.y=.03;f.castShadow=false;parent.add(f);for(let i=-w/2+.5;i<w/2;i+=.5){const l=K.box(.012,.062,d,mat('#8a6340'));l.position.set(i,.031,0);l.castShadow=false;parent.add(l)}return f},
    wall(len,h,parent,x,z,ry,col='#fbfaf7'){const w=K.box(len,h,.16,mat(col,{roughness:.95}));w.position.set(x,h/2,z);w.rotation.y=ry;parent.add(w);return w},
    // manusia sederhana (tinggi ±3.4)
    human({skin='#e0b48f',shirt='#4f7cac',pants='#3d4452',hair='#2b2420'}={}){const h=K.g();
      const torso=K.cap(.42,.9,shirt);torso.position.y=2.15;h.add(torso);const head=K.sph(.33,skin);head.position.y=3.05;h.add(head);const hr=K.sph(.345,hair);hr.scale.set(1,.7,1);hr.position.set(0,3.16,-.04);h.add(hr);
      const neck=K.cyl(.13,.15,.25,skin);neck.position.y=2.75;h.add(neck);
      const arm=s=>{const a=K.g();a.position.set(s*.55,2.55,0);const u=K.cap(.13,.5,shirt);u.position.y=-.34;a.add(u);const e=K.g();e.position.y=-.72;a.add(e);const f=K.cap(.11,.5,skin);f.position.y=-.34;e.add(f);const hd=K.sph(.13,skin);hd.position.y=-.76;e.add(hd);a.userData.elbow=e;h.add(a);return a};
      const leg=s=>{const l=K.g();l.position.set(s*.22,1.42,0);const u=K.cap(.17,.5,pants);u.position.y=-.36;l.add(u);const k=K.g();k.position.y=-.74;l.add(k);const lo=K.cap(.14,.5,pants);lo.position.y=-.32;k.add(lo);const ft=K.box(.24,.14,.42,'#2e2b28');ft.position.set(0,-.64,.08);k.add(ft);l.userData.knee=k;h.add(l);return l};
      h.userData={head,torso,armL:arm(-1),armR:arm(1),legL:leg(-1),legR:leg(1)};h.userData.sit=()=>{const u=h.userData;[u.legL,u.legR].forEach(l=>{l.rotation.x=-Math.PI/2;l.userData.knee.rotation.x=Math.PI/2});h.position.y-=.0};return h},
    tag(o,name,info){o.userData.name=name;o.userData.info=info;o.traverse(m=>{if(m.isMesh&&!m.userData.own){m.material=m.material.clone();m.userData.own=1}});return o}
  };
  return K;
}

/* ---- panggung ---- */
function mount3D(el,sid,{focus,compact}={}){
  const S3=SC3[sid];if(!S3){el.innerHTML='';return null}
  el.innerHTML=`<div class="v3d card"><div class="v3hd"><div><p class="eyebrow" style="margin:0">Model 3D · putar dengan jari atau tetikus</p><h3 style="margin:2px 0 0">${esc(S3.t)}</h3></div>
    <div class="v3tools" role="toolbar" aria-label="Sudut pandang"><button class="chip" data-cv="iso" aria-pressed="true">Isometrik</button><button class="chip" data-cv="front" aria-pressed="false">Depan</button><button class="chip" data-cv="side" aria-pressed="false">Samping</button><button class="chip" data-cv="top" aria-pressed="false">Atas</button>
    <button class="chip" id="v3rot" aria-pressed="true" title="Putar otomatis">⟳ Putar</button><button class="chip" id="v3lab" aria-pressed="true">Label</button><button class="chip" id="v3fs" title="Layar penuh">⤢</button></div></div>
    <div class="v3stage" id="v3stage"><div class="v3load">Memuat model 3D…</div><div class="v3labels"></div><p class="v3hint">Seret: putar · cubit/gulir: zoom · dua jari/klik kanan: geser · ketuk bagian: penjelasan</p></div>
    <div class="v3ctl" id="v3ctl"></div><div class="v3info" id="v3info"><span class="muted">${esc(S3.d||'Ketuk bagian model untuk melihat penjelasan.')}</span></div></div>`;
  const stage=$('#v3stage',el),labelsEl=$('.v3labels',el),info=$('#v3info',el),ctlEl=$('#v3ctl',el);
  let dead=false,raf=0,ro=null,io=null,vis=true,R=null,ren=null,ctrls=null;
  const cleanup=()=>{dead=true;cancelAnimationFrame(raf);ro&&ro.disconnect();io&&io.disconnect();if(ctrls)ctrls.dispose();if(ren){ren.dispose();ren.forceContextLoss&&ren.forceContextLoss()}};
  if(!webglOK()){$('.v3load',el).textContent='Perangkat/browser ini tidak mendukung WebGL, jadi model 3D tidak dapat ditampilkan. Simulasi di bawah tetap berfungsi.';return cleanup}
  loadThree().then(()=>{if(dead)return;
    const T=THREE,K=makeKit();$('.v3load',el).remove();
    const scene=new T.Scene();
    ren=new T.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:false});ren.setPixelRatio(Math.min(2,devicePixelRatio||1));ren.shadowMap.enabled=true;ren.shadowMap.type=T.PCFSoftShadowMap;ren.localClippingEnabled=true;
    stage.prepend(ren.domElement);
    const cam=new T.PerspectiveCamera(35,1,.05,400);
    scene.add(new T.HemisphereLight('#ffffff','#b9b2a6',.75));
    const sun=new T.DirectionalLight('#fffaf0',.85);sun.castShadow=true;sun.shadow.mapSize.set(1536,1536);sun.shadow.bias=-.0006;scene.add(sun,sun.target);
    const fill=new T.DirectionalLight('#dfe8ff',.25);fill.position.set(-8,5,-6);scene.add(fill);
    const root=K.g();scene.add(root);
    const Rr=S3.R||6,tgt=new T.Vector3(...(S3.target||[0,1,0]));
    sun.position.set(Rr*.9,Rr*1.8,Rr*1.1);const sc=sun.shadow.camera;sc.left=sc.bottom=-Rr*1.4;sc.right=sc.top=Rr*1.4;sc.far=Rr*6;sc.updateProjectionMatrix();
    ctrls=new T.OrbitControls(cam,ren.domElement);ctrls.enableDamping=true;ctrls.dampingFactor=.08;ctrls.target.copy(tgt);ctrls.autoRotate=true;ctrls.autoRotateSpeed=1.1;ctrls.maxDistance=Rr*5;ctrls.minDistance=Rr*.2;ctrls.maxPolarAngle=Math.PI*.98;
    const labels=[];let showLab=true;
    const say=(name,txt)=>{info.innerHTML=`<b>${esc(name)}</b>${txt?'<br>'+txt:''}`};
    const api={
      root,scene,cam,ctrls,
      label(obj,name,infoTxt,off=[0,.4,0]){K.tag(obj,name,infoTxt);const d=document.createElement('button');d.className='v3lbl';d.textContent=name;d.onclick=()=>pick(obj);labelsEl.appendChild(d);const L={obj,d,off:new T.Vector3(...off)};labels.push(L);return obj},
      setLabel(obj,txt){const L=labels.find(l=>l.obj===obj);if(L)L.d.textContent=txt},
      info:say,
      buttons(title,list,act=0){const w=document.createElement('div');w.className='v3grp';w.innerHTML=`<span class="eyebrow">${esc(title)}</span><div class="row" style="gap:6px">${list.map((b,i)=>`<button class="chip" aria-pressed="${i===act}">${esc(b[0])}</button>`).join('')}</div>`;ctlEl.appendChild(w);
        const bs=$$('button',w);bs.forEach((b,i)=>b.onclick=()=>{bs.forEach(x=>x.setAttribute('aria-pressed',x===b));list[i][1]()});return w},
      button(text,fn){const b=document.createElement('button');b.className='btn sm';b.textContent=text;b.onclick=fn;let row=$('.v3act',ctlEl);if(!row){row=document.createElement('div');row.className='row v3act';row.style.gap='6px';ctlEl.appendChild(row)}row.appendChild(b);return b},
      slider(text,min,max,step,val,fn,fmt=v=>v){const w=document.createElement('label');w.className='v3grp';w.innerHTML=`<span class="eyebrow">${esc(text)}: <b class="mono">${fmt(val)}</b></span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}">`;ctlEl.appendChild(w);const inp=$('input',w),o=$('b',w);inp.oninput=()=>{o.textContent=fmt(+inp.value);fn(+inp.value)};return inp},
      readout(){const d=document.createElement('div');d.className='v3read mono';ctlEl.appendChild(d);return d},
      focus(x,y,z,r){go(null,new T.Vector3(x,y,z),r)}
    };
    const obj=S3.build(K,root,api)||{};
    // preset kamera
    let tw=null;
    const dirs={iso:[1,.85,1.15],front:[0,.18,1],side:[1,.18,0],top:[0,1,.002]};
    function go(kind,center,rad){const c=center||ctrls.target.clone(),r=rad||Rr,d=dirs[kind||curView]||dirs.iso;const hv=T.MathUtils.degToRad(cam.fov/2),hh=Math.atan(Math.tan(hv)*cam.aspect),dist=r/Math.sin(Math.min(hv,hh))*.95;
      const to=new T.Vector3(...d).normalize().multiplyScalar(dist).add(c);tw={f:cam.position.clone(),t:to,fc:ctrls.target.clone(),tc:c,k:0}}
    let curView='iso';
    
    $$('[data-cv]',el).forEach(b=>b.onclick=()=>{curView=b.dataset.cv;$$('[data-cv]',el).forEach(x=>x.setAttribute('aria-pressed',x===b));go(curView,tgt,Rr)});
    const rotB=$('#v3rot',el);rotB.onclick=()=>{ctrls.autoRotate=!ctrls.autoRotate;rotB.setAttribute('aria-pressed',ctrls.autoRotate)};
    ren.domElement.addEventListener('pointerdown',()=>{if(ctrls.autoRotate){ctrls.autoRotate=false;rotB.setAttribute('aria-pressed','false')}});
    const labB=$('#v3lab',el);labB.onclick=()=>{showLab=!showLab;labB.setAttribute('aria-pressed',showLab);labelsEl.hidden=!showLab};
    $('#v3fs',el).onclick=()=>{const c=$('.v3d',el);try{document.fullscreenElement?document.exitFullscreen():c.requestFullscreen().catch(()=>{})}catch(e){}};
    // pilih bagian
    const ray=new T.Raycaster(),pt=new T.Vector2();let hl=null,down=null;
    function pick(o){if(hl)hl.traverse(m=>{if(m.isMesh&&m.material.emissive&&m.userData.e0!==undefined){m.material.emissive.setHex(m.userData.e0);m.material.emissiveIntensity=m.userData.ei0}});hl=o;
      o.traverse(m=>{if(m.isMesh&&m.material.emissive){if(m.userData.e0===undefined){m.userData.e0=m.material.emissive.getHex();m.userData.ei0=m.material.emissiveIntensity}m.material.emissive.set('#f5a524');m.material.emissiveIntensity=.45}});
      say(o.userData.name,o.userData.info);labels.forEach(l=>l.d.classList.toggle('on',l.obj===o))}
    ren.domElement.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);
    ren.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;const r=ren.domElement.getBoundingClientRect();pt.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pt,cam);
      const hits=ray.intersectObject(root,true);for(const h of hits){let o=h.object;while(o&&!o.userData.info)o=o.parent;if(o&&visChain(h.object)){pick(o);return}}});
    // ukuran
    const size=()=>{const w=stage.clientWidth||600,h=compact?Math.max(260,Math.min(420,w*.62)):Math.max(300,Math.min(innerHeight*.62,w*.68));ren.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix();stage.style.height=h+'px'};
    size();go('iso',tgt,Rr);tw.k=1;cam.position.copy(tw.t);ctrls.target.copy(tw.tc);tw=null;ro=new ResizeObserver(size);ro.observe(stage);
    io=new IntersectionObserver(es=>{vis=es[0].isIntersecting});io.observe(stage);
    if(focus&&obj.focus)obj.focus(focus);
    const clock=new T.Clock(),v=new T.Vector3();let t=0;
    const loop=()=>{if(dead)return;raf=requestAnimationFrame(loop);if(!vis||document.hidden){clock.getDelta();return}
      const dt=Math.min(.05,clock.getDelta());t+=dt;
      if(tw){tw.k=Math.min(1,tw.k+dt*1.8);const e=1-Math.pow(1-tw.k,3);cam.position.lerpVectors(tw.f,tw.t,e);ctrls.target.lerpVectors(tw.fc,tw.tc,e);if(tw.k>=1)tw=null}
      obj.update&&obj.update(t,dt);ctrls.update();ren.render(scene,cam);
      if(showLab){const w=ren.domElement.clientWidth,h=ren.domElement.clientHeight;labels.forEach(l=>{if(!visChain(l.obj)){l.d.hidden=true;return}l.obj.getWorldPosition(v);v.add(l.off).project(cam);const off=v.z>1||Math.abs(v.x)>1.05||Math.abs(v.y)>1.05;l.d.hidden=off;if(!off){l.d.style.transform=`translate(${(v.x+1)/2*w}px,${(1-v.y)/2*h}px) translate(-50%,-100%)`}})}};
    loop();
  }).catch(()=>{if(dead)return;const l=$('.v3load',el);if(l)l.textContent='Model 3D tidak dapat dimuat (perlu koneksi internet untuk pustaka 3D). Simulasi di bawah tetap berfungsi.'});
  return cleanup;
}

/* ---- galeri ---- */
function view3DHub(){
  const ids=Object.keys(SC3);
  app.innerHTML=`<p class="eyebrow">${ids.length} model · putar 360°, zoom, ketuk bagian</p><h1>Model 3D</h1><p class="lead muted" style="max-width:66ch">Semua gambar dan simulasi Blok 3 dalam bentuk maket tiga dimensi yang bisa diputar dari berbagai sudut: isometrik, depan, samping, dan atas. Setiap model juga muncul di atas lab dan skill lab terkait.</p>
  <div class="grid g3 section">${ids.map(id=>{const s=SC3[id];return`<a class="card modcard" href="#3d-${id}"><span class="no">${esc(s.g||'Model 3D')}</span><h3>${esc(s.t)}</h3><span class="muted" style="font-size:.88rem">${esc(s.d||'')}</span></a>`}).join('')}</div>`}
function view3D(id){
  const s=SC3[id];if(!s){location.hash='3d';return}
  const labs=Object.keys(LAB3D).filter(k=>LAB3D[k].s===id&&LAB[k]);
  app.innerHTML=`<p class="bc"><a href="#3d">Model 3D</a></p><div id="v3box" class="section" style="margin-top:12px"></div>
  ${labs.length?`<div class="row" style="gap:6px">${labs.map(k=>`<a class="btn sm" href="#lab-${k}">Buka simulasi: ${esc(LAB[k].t)}</a>`).join('')}</div>`:''}${id==='klinik'?`<div class="row" style="gap:6px"><a class="btn sm" href="#skill">Buka Skill Lab</a></div>`:''}`;
  cleanup=mount3D($('#v3box'),id)}
