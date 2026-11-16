/* ====== APP ====== */
const $=(s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MOD=Object.fromEntries(MODS.map(m=>[m.id,m]));
Q.forEach((q,i)=>q.id=i);
const QBY=t=>Q.filter(q=>q.t===t);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const LET='ABCDE';
const BK=b=>BLOKS.find(x=>x.b===b);

/* ---- progres per pengguna (hanya di browser ini) ---- */
const KEY='anatomilab-v1';
let S={read:{},tq:{},wrong:{},drafts:{},labs:{},flash:{}};
try{const r=localStorage.getItem(KEY);if(r)S=Object.assign(S,JSON.parse(r))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
function record(q,ok){const t=S.tq[q.t]||(S.tq[q.t]={c:0,n:0});t.n++;if(ok){t.c++;delete S.wrong[q.id]}else S.wrong[q.id]=1;save()}
const acc=t=>{const x=S.tq[t];return x&&x.n?Math.round(100*x.c/x.n):null};

/* ---- router ---- */
const app=$('#app');
let cleanup=null;
function route(){
  if(cleanup){cleanup();cleanup=null}
  document.body.classList.remove('cbt-on');
  const h=(location.hash||'#peta').slice(1);
  const base=h.split('-')[0];
  $$('.nav a').forEach(a=>a.removeAttribute('aria-current'));
  const nv={peta:'peta',modul:'modul',m:'modul',blok:'modul',lab:'lab',latihan:'latihan',glosarium:'glosarium',spot:'spot',cbt:'cbt',roleplay:'roleplay',rp:'roleplay','3d':'3d'}[base]||'peta';
  const na=$(`.nav a[data-v="${nv}"]`);if(na)na.setAttribute('aria-current','page');
  if(base==='m')viewModule(h.slice(2));
  else if(base==='modul')viewModules();
  else if(base==='lab')h.length>4?viewLab(h.slice(4)):viewLabHub();
  else if(base==='latihan')viewPractice(h.slice(8)||'all');
  else if(base==='glosarium')viewGlos();
  else if(base==='spot')viewSpot();
  else if(base==='cbt')viewCBT();
  else if(base==='roleplay')viewRoleplayList();
  else if(base==='rp')viewRoleplay(+h.slice(3));
  else if(base==='3d')h.length>3?view3D(h.slice(3)):view3DHub();
  else viewHome();
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);

/* ---- kartu soal ---- */
function qWidget(q,{num,onAnswer,mixed=true}={}){
  const el=document.createElement('div');el.className='qcard';
  const order=mixed?shuffle([0,1,2,3,4].slice(0,q.o.length)):[0,1,2,3,4].slice(0,q.o.length);
  el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="eyebrow">${num?esc(num)+' · ':''}${esc(MOD[q.t].t)}</span><span class="tag ${q.l===2?'c34':''}">${q.l===2?'Kasus C3–C4':'C1–C2'}</span></div>
  <p class="qstem">${esc(q.q)}</p><div class="opts">${order.map((oi,k)=>`<button class="opt" data-o="${oi}"><span class="k">${LET[k]}</span><span>${esc(q.o[oi])}</span></button>`).join('')}</div><div class="expl" hidden></div>`;
  $$('.opt',el).forEach(b=>b.onclick=()=>{
    const pick=+b.dataset.o, ok=pick===q.a;
    $$('.opt',el).forEach(x=>{x.disabled=true;if(+x.dataset.o===q.a)x.classList.add('correct')});
    if(!ok)b.classList.add('wrong');
    const ex=$('.expl',el);ex.hidden=false;
    ex.innerHTML=`<b class="${ok?'ok':'no'}">${ok?'Benar.':'Belum tepat.'}</b> ${esc(q.e)}`;
    record(q,ok);onAnswer&&onAnswer(ok);
  });
  return el;
}

/* =================== PETA =================== */
function viewHome(){
  const read=Object.keys(S.read).length;
  const tot=Object.values(S.tq).reduce((a,x)=>({c:a.c+x.c,n:a.n+x.n}),{c:0,n:0});
  const lastSpot=(S.spotHist||[]).slice(-1)[0],lastCBT=(S.cbtHist||[]).slice(-1)[0];
  const nPins=ATLAS.reduce((a,x)=>a+x.views.reduce((b,v)=>b+v.pins.length,0),0);
  app.innerHTML=`
  <section class="hero">
    <div><p class="eyebrow">FKIK Universitas Mataram · Anatomi lintas blok</p>
    <h1>Anatomi dari Blok 1 sampai Blok 9 dalam satu meja praktikum</h1>
    <p class="lead">Modul ringkas dari slide kuliah dosen anatomi, atlas interaktif yang bisa ditunjuk dan diuji, spot tentamen berwaktu seperti ujian praktikum, latihan soal, CBT per blok, dan kasus anatomi klinis untuk roleplay.</p>
    <div class="row" style="margin-top:14px"><a class="btn primary" href="#modul">Mulai belajar</a><a class="btn" href="#3d">Model 3D</a><a class="btn" href="#spot">Spot tentamen</a><a class="btn" href="#cbt">CBT</a></div></div>
    <div class="count"><p class="eyebrow">Isi aplikasi</p><div class="num">${MODS.length}<span style="font-size:1.1rem;font-weight:600"> modul</span></div><p class="muted" style="font-size:.9rem">${Q.length} soal · ${Object.keys(SC3).length} model 3D · ${ATLAS.length} atlas 2D dengan ${nPins} penanda · ${GLOS.length} istilah · ${RP.length} kasus klinis</p></div>
  </section>
  <div class="stats section">
    <div><span class="eyebrow">Modul dipelajari</span><b>${read}/${MODS.length}</b></div>
    <div><span class="eyebrow">Soal dijawab</span><b>${tot.n}</b></div>
    <div><span class="eyebrow">Akurasi latihan</span><b>${tot.n?Math.round(100*tot.c/tot.n)+'%':'–'}</b></div>
    <div><span class="eyebrow">Spot terakhir</span><b>${lastSpot?lastSpot.p+'%':'–'}</b></div>
    <div><span class="eyebrow">CBT terakhir</span><b>${lastCBT?lastCBT.pct+'%':'–'}</b></div>
  </div>
  <section class="section"><h2>Peta blok</h2><p class="muted" style="max-width:70ch">Klik modul untuk membuka materi. Penanda <span class="tag">perkiraan</span> berarti nomor blok tidak tertulis di slide; pengelompokan disusun menurut urutan sistem organ yang lazim dan dapat berbeda dengan jadwal kampus.</p>
  <div class="blokmap">${BLOKS.map(b=>{const ms=MODS.filter(m=>m.blok===b.b);const done=ms.filter(m=>S.read[m.id]).length;return`<div class="blokcol card"><div class="row" style="justify-content:space-between;gap:6px"><span class="bnum">${b.b}</span>${b.sure?'':'<span class="tag">perkiraan</span>'}</div><h3>${esc(b.t)}</h3><div class="bbar"><i style="width:${ms.length?100*done/ms.length:0}%"></i></div>${ms.map(m=>`<a href="#m-${m.id}" class="bmod">${S.read[m.id]?'✓ ':''}${esc(m.t)}</a>`).join('')}</div>`}).join('')}</div></section>
  <section class="section"><div class="row" style="justify-content:space-between"><h2>Atlas interaktif</h2><a class="btn sm" href="#lab">Semua lab</a></div><div class="grid g3" style="margin-top:12px">${LABS.filter(l=>['tengkorak','basis','jantung','otak','abdomen','lengan'].includes(l.id)).map(labCard).join('')}</div></section>
  <section class="section grid g2">
    <div class="card"><h2>Cara belajar yang disarankan</h2><ol class="steps">
      <li><b>Baca modul</b> blokmu. Mulai dari kotak "Jembatan dasar" bila biologimu belum kuat.</li>
      <li><b>Atlas, mode Belajar</b>: ketuk tiap penanda dan ucapkan namanya keras-keras dalam bahasa Latin.</li>
      <li><b>Atlas, mode Tunjukkan & Sebutkan</b> sampai skor ≥ 8/10.</li>
      <li><b>Glosarium</b>: hafalkan awalan, akhiran, dan penanda tulang dengan kartu bolak-balik.</li>
      <li><b>Spot tentamen</b> berwaktu 60 detik per meja, lalu <b>CBT</b> blok dan <b>kasus klinis</b>.</li></ol>
      <p class="note">Progres tersimpan di browser ini saja.</p></div>
    <div class="card"><h2>Patokan level vertebra</h2><div class="tblwrap"><table class="tbl lab">${LEVELS.map(r=>`<tr><td>${r[0]}</td><td class="v">${r[1]}</td></tr>`).join('')}</table></div><p class="note">Sering keluar di soal; ada juga di panel rujukan CBT.</p></div>
  </section>`;
}
const LEVELS=[['Bifurkasio a. carotis communis','C4'],['Cartilago cricoidea, awal trakea & esofagus','C6'],['Vertebra prominens','C7'],['Angulus sterni, iga II, carina','T4/T5'],['Hiatus v. cava inferior','T8'],['Hiatus esophageus','T10'],['Processus xiphoideus, umbilicus (dermatom)','T10'],['Hiatus aorticus, truncus coeliacus','T12'],['A. mesenterica superior, aa. renales','L1–L2'],['Conus medullaris (dewasa)','L1–L2'],['A. mesenterica inferior','L3'],['Puncak crista iliaca, bifurkasio aorta','L4'],['Ginjal','T12–L3']];

/* =================== MODUL =================== */
function viewModules(){
  app.innerHTML=`<p class="eyebrow">${MODS.length} modul · urut per blok</p><h1>Modul</h1><p class="lead muted" style="max-width:62ch">Tiap modul: cerita klinis pembuka, jembatan dasar, materi inti dari slide kuliah, poin ujian, jebakan, jembatan keledai, atlas terkait, dan kuis.</p>
  ${BLOKS.map(b=>{const ms=MODS.filter(m=>m.blok===b.b);return ms.length?`<section class="section"><div class="row" style="gap:8px"><h2>${b.n} · ${esc(b.t)}</h2>${b.sure?'':'<span class="tag">blok perkiraan</span>'}</div><div class="grid g3" style="margin-top:12px">${ms.map(m=>`
  <a class="card modcard" href="#m-${m.id}"><span class="no">MODUL ${String(m.no).padStart(2,'0')}</span><h3>${esc(m.t)}</h3><span class="muted" style="font-size:.86rem">${esc(m.d)}</span>
  <div class="row" style="margin-top:auto;justify-content:space-between"><span class="tag">${QBY(m.id).length} soal</span>${S.read[m.id]?'<span class="done">✓ dipelajari</span>':acc(m.id)!==null?`<span class="tag">${acc(m.id)}% benar</span>`:''}</div></a>`).join('')}</div></section>`:''}).join('')}`;
}
function labCard(l){const b=l.key&&S.labs[l.key];
  return`<a class="card modcard" href="#lab-${l.id}"><span class="no">${esc(l.g)}</span><h3>${esc(l.t)}</h3><span class="muted" style="font-size:.88rem">${esc(l.d)}</span><div class="row" style="margin-top:auto;gap:6px">${[...new Set(l.m.map(t=>MOD[t].blok))].sort().map(b=>`<span class="tag">Blok ${b}</span>`).join('')}${b!==undefined?`<span class="tag c34">terbaik ${b}%</span>`:''}</div></a>`}
function viewModule(id){
  const m=MOD[id];if(!m){location.hash='modul';return}
  const i=MODS.indexOf(m),prev=MODS[i-1],next=MODS[i+1],atl=ATLAS.filter(a=>a.m.includes(id)),sq=SEQ.filter(s=>s.m===id),pr=PAIRS.filter(s=>s.m===id);
  const s3=Object.keys(SC3).filter(k=>(SC3[k].m||[]).includes(id));const tabs=[['materi','Materi'],...(s3.length?[['m3d',`Model 3D (${s3.length})`]]:[]),...(atl.length?[['atlas',`Atlas 2D (${atl.length})`]]:[]),...(sq.length||pr.length||id==='term'?[['main','Permainan']]:[]),['kuis','Kuis']];
  app.innerHTML=`<p class="bc"><a href="#modul">Modul</a> / ${BK(m.blok).n} · ${esc(BK(m.blok).t)}</p>
  <p class="eyebrow" style="margin-top:14px">Modul ${String(m.no).padStart(2,'0')} · ${BK(m.blok).n}${BK(m.blok).sure?'':' (perkiraan)'}</p><h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">${esc(m.t)}</h1><p class="muted">${esc(m.d)}</p><p class="note">Sumber: ${esc(m.src)}</p>
  <div class="tabs" role="tablist">${tabs.map(([k,l],j)=>`<button class="chip" data-mt="${k}" aria-pressed="${!j}">${l}</button>`).join('')}</div><div id="mbody"></div>
  <section class="section row" style="justify-content:space-between">
    ${prev?`<a class="btn" href="#m-${prev.id}">← ${esc(prev.t)}</a>`:'<span></span>'}
    <button class="btn ${S.read[id]?'':'primary'}" id="mark">${S.read[id]?'✓ Sudah dipelajari':'Tandai sudah dipelajari'}</button>
    ${next?`<a class="btn" href="#m-${next.id}">${esc(next.t)} →</a>`:'<span></span>'}</section>`;
  const body=$('#mbody');let lc=null;cleanup=()=>lc&&lc();
  const show=k=>{if(lc){lc();lc=null}$$('[data-mt]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mt===k));
    if(k==='materi'){body.innerHTML=`<section class="grid g2" style="margin-top:6px"><div class="callout mn"><p class="eyebrow">Mulai dari kasus</p><h3 style="margin-top:4px">${esc(m.story[0])}</h3><p style="margin:.4em 0 0">${m.story[1]}</p></div><div class="card"><p class="eyebrow">Setelah modul ini kamu bisa</p><ul style="padding-left:1.1em;margin:.4em 0 0">${m.obj.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div></section>
      <section class="section bridge prose"><p class="eyebrow">Jembatan dasar</p>${m.bridge.map(b=>`<p>${b}</p>`).join('')}</section>
      <section class="section prose">${m.core.replace(/<table class="tbl">/g,'<div class="tblwrap"><table class="tbl">').replace(/<\/table>/g,'</table></div>')}</section>
      <section class="section grid g3"><div class="callout hi"><h3>Sering diuji</h3><ul style="padding-left:1.1em;margin:0">${m.high.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div class="callout trap"><h3>Jebakan umum</h3><ul style="padding-left:1.1em;margin:0">${m.trap.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div class="callout mn"><h3>Jembatan keledai</h3><p style="margin:0">${m.mn}</p></div></section>
      <section class="section row" style="gap:8px"><span class="muted">Lanjutkan ke:</span>${tabs.slice(1).map(([k,l])=>`<button class="btn sm" data-go="${k}">${l}</button>`).join('')}</section>`;
      $$('[data-go]',body).forEach(b=>b.onclick=()=>{show(b.dataset.go);window.scrollTo(0,0)})}
    else if(k==='m3d'){body.innerHTML=`${s3.length>1?`<div class="tabs">${s3.map((k2,j)=>`<button class="chip" data-sb3="${j}" aria-pressed="${!j}">${esc(SC3[k2].t)}</button>`).join('')}</div>`:''}<div id="m3box"></div>`;
      const open3=j=>{if(lc){lc();lc=null}$$('[data-sb3]',body).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.sb3===j));lc=mount3D($('#m3box'),s3[j],{focus:id==='leher'&&s3[j]==='vertebra'?'leher':undefined})||null};$$('[data-sb3]',body).forEach(b=>b.onclick=()=>open3(+b.dataset.sb3));open3(0)}
    else if(k==='atlas'){body.innerHTML=`${atl.length>1?`<div class="tabs">${atl.map((a,j)=>`<button class="chip" data-ab="${j}" aria-pressed="${!j}">${esc(a.n)}</button>`).join('')}</div>`:''}<div id="abox"></div>`;
      const open=j=>{if(lc){lc();lc=null}$$('[data-ab]',body).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ab===j));lc=labAtlas($('#abox'),atl[j].id)||null};
      $$('[data-ab]',body).forEach(b=>b.onclick=()=>open(+b.dataset.ab));open(0)}
    else if(k==='main'){body.innerHTML=`${sq.length?'<h3 style="margin:8px 0">Urutkan</h3><div id="g1"></div>':''}${pr.length?'<h3 style="margin:18px 0 8px">Pasangkan</h3><div id="g2"></div>':''}${id==='term'?'<h3 style="margin:18px 0 8px">Istilah arah & gerakan</h3><div id="g3"></div>':''}`;
      if(sq.length)labSeq($('#g1'),[id]);if(pr.length)labPair($('#g2'),[id]);if(id==='term')labArah($('#g3'))}
    else{const qs=shuffle(QBY(id)).slice(0,5);body.innerHTML=`<div class="row" style="justify-content:space-between"><p class="muted">5 soal acak dari ${QBY(id).length} soal modul ini.</p><a class="btn sm" href="#latihan-${id}">Latihan semua soal modul ini</a></div><div class="grid" id="mq" style="margin-top:12px"></div>`;qs.forEach((q,k)=>$('#mq').appendChild(qWidget(q,{num:`Soal ${k+1}`})))}};
  $$('[data-mt]').forEach(b=>b.onclick=()=>show(b.dataset.mt));show('materi');
  $('#mark').onclick=e=>{S.read[id]?delete S.read[id]:S.read[id]=1;save();e.target.textContent=S.read[id]?'✓ Sudah dipelajari':'Tandai sudah dipelajari';e.target.classList.toggle('primary',!S.read[id])};
}

/* =================== LAB =================== */
function viewLabHub(){
  app.innerHTML=`<p class="eyebrow">${LABS.length} lab · tanpa preparat, tanpa kadaver</p><h1>Lab virtual</h1><p class="lead muted" style="max-width:64ch">Atlas skematik dengan penanda bernomor: pelajari, lalu uji dirimu dengan mode Tunjukkan (cari strukturnya) dan Sebutkan (beri nama). Permainan konsep melatih urutan, pasangan, dan istilah.</p>
  ${['Atlas interaktif','Permainan konsep'].map(g=>`<section class="section"><h2 style="margin-bottom:12px">${g}</h2><div class="grid g3">${LABS.filter(l=>l.g===g).map(labCard).join('')}</div></section>`).join('')}
  <section class="section card row" style="justify-content:space-between"><div><h3>Siap diuji seperti di laboratorium?</h3><p class="muted" style="margin:0">Spot tentamen mengacak penanda dari semua atlas, berwaktu per meja.</p></div><a class="btn primary" href="#spot">Buka spot tentamen</a></section>`}
function viewLab(id){
  const l=LAB[id];if(!l){location.hash='lab';return}const i=LABS.indexOf(l),prev=LABS[i-1],next=LABS[i+1];
  app.innerHTML=`<p class="bc"><a href="#lab">Lab virtual</a> / ${esc(l.g)}</p><h1 style="font-size:clamp(1.7rem,4vw,2.4rem);margin-top:12px">${esc(l.t)}</h1>
  <p class="muted" style="max-width:70ch">${esc(l.d)}</p><div class="row" style="gap:6px;margin-top:8px">${l.m.map(t=>`<a class="chip" href="#m-${t}">Modul: ${esc(MOD[t].t)}</a>`).join('')}</div>
  ${LAB3D[id]?'<div id="v3box" class="section"></div>':''}<div id="labbox" class="section"></div>
  <section class="section row" style="justify-content:space-between">${prev?`<a class="btn" href="#lab-${prev.id}">← ${esc(prev.t)}</a>`:'<span></span>'}${next?`<a class="btn" href="#lab-${next.id}">${esc(next.t)} →</a>`:'<span></span>'}</section>`;
  const c3=LAB3D[id]?mount3D($('#v3box'),LAB3D[id].s,{focus:LAB3D[id].f}):null;const c1=l.fn($('#labbox'))||null;cleanup=()=>{c3&&c3();c1&&c1()}}

/* =================== GLOSARIUM =================== */
function viewGlos(){
  const cats=[...new Set(GLOS.map(g=>g[2]))];let cat='Semua',q='',mode='list';
  app.innerHTML=`<p class="eyebrow">${GLOS.length} istilah · Terminologia Anatomica</p><h1>Glosarium</h1><p class="lead muted" style="max-width:62ch">Kosakata dasar anatomi dari kuliah terminologi: awalan, akar kata, akhiran, arah, gerakan, dan penanda tulang. Pakai mode kartu untuk menghafal.</p>
  <div class="tabs"><button class="chip" data-gm="list" aria-pressed="true">Daftar</button><button class="chip" data-gm="card" aria-pressed="false">Kartu hafalan</button></div>
  <div class="row" style="gap:6px">${['Semua',...cats].map(c=>`<button class="chip" data-gc="${c}" aria-pressed="${c==='Semua'}">${c}</button>`).join('')}</div>
  <div id="gbox" class="section" style="margin-top:16px"></div>`;
  const pool=()=>GLOS.filter(g=>(cat==='Semua'||g[2]===cat)&&(!q||norm(g[0]+' '+g[1]).includes(norm(q))));
  const draw=()=>{const box=$('#gbox');
    if(mode==='list'){box.innerHTML=`<input type="search" id="gq" placeholder="Cari istilah atau arti…" value="${esc(q)}" style="max-width:420px" aria-label="Cari istilah"><div class="tblwrap"><table class="tbl" id="gt"></table></div>`;
      const fill=()=>{const p=pool();$('#gt').innerHTML=`<tr><th>Istilah</th><th>Arti</th><th>Kelompok</th></tr>`+(p.length?p.map(g=>`<tr><td><b>${esc(g[0])}</b></td><td>${esc(g[1])}</td><td class="muted">${esc(g[2])}</td></tr>`).join(''):'<tr><td colspan="3" class="muted">Tidak ditemukan.</td></tr>')};
      $('#gq').oninput=e=>{q=e.target.value;fill()};fill()}
    else{let deck=shuffle(pool().filter(g=>!S.flash[g[0]])),known=pool().length-deck.length,flip=false;
      const card=()=>{if(!deck.length){box.innerHTML=`<div class="card"><h2>Semua kartu di kelompok ini sudah hafal.</h2><p class="muted">${known} istilah ditandai hafal.</p><button class="btn" id="greset">Ulang dari awal</button></div>`;$('#greset').onclick=()=>{pool().forEach(g=>delete S.flash[g[0]]);save();draw()};return}
        const g=deck[0];box.innerHTML=`<p class="mono muted">${deck.length} kartu tersisa · ${known} sudah hafal</p><button class="flash ${flip?'on':''}" id="gfc" aria-label="Balik kartu"><span class="eyebrow">${esc(g[2])}</span><b>${flip?esc(g[1]):esc(g[0])}</b><span class="note">${flip?esc(g[0]):'Ketuk untuk melihat arti'}</span></button>
        <div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="gno">Belum hafal</button><button class="btn primary" id="gyes">Sudah hafal</button></div>`;
        $('#gfc').onclick=()=>{flip=!flip;card()};$('#gno').onclick=()=>{deck.push(deck.shift());flip=false;card()};$('#gyes').onclick=()=>{S.flash[g[0]]=1;save();deck.shift();known++;flip=false;card()}};card()}};
  $$('[data-gc]').forEach(b=>b.onclick=()=>{cat=b.dataset.gc;$$('[data-gc]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
  $$('[data-gm]').forEach(b=>b.onclick=()=>{mode=b.dataset.gm;$$('[data-gm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
  draw();
}
