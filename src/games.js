/* ====== LAB VIRTUAL ANATOMI: atlas, urutan, pasangan, arah, gerakan ====== */
function stationTimer(el,sec,onEnd){let s=sec;el.textContent=s+' dtk';const iv=setInterval(()=>{s--;el.textContent=s+' dtk';el.classList.toggle('low',s<=10);if(s<=0){clearInterval(iv);onEnd()}},1000);return()=>clearInterval(iv)}
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\(.*?\)/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\b(m|n|a|v|lig|os|ossa|r|aa|vv|nn|nervus|nervi|musculus|musculi|arteria|vena|ligamentum|ramus)\b/g,'').replace(/\s+/g,' ').trim();
function lev(a,b){const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]}
const KEYW=['major','minor','superior','inferior','medialis','lateralis','medius','anterior','anterius','posterior','posterius','dexter','dextra','dextrum','sinister','sinistra','sinistrum','externus','externa','internus','interna','profundus','superficialis','longus','brevis','ovale','rotundum','spinosum','lacerum','magnum','minus','majus','ascendens','descendens','transversum','sigmoideum','primer','sekunder','precentralis','postcentralis','vera','obstetrik','diagonal'];
function nameMatch(input,ans){const a=norm(input);if(!a)return false;const paren=(ans.match(/\(([^)]*)\)/)||[])[1];
  const cands=[ans,...ans.split(/\s*[\/;]\s*|\s+dan\s+/),...(paren?[paren]:[])].map(norm).filter(Boolean);
  return cands.some(t=>{if(a===t)return true;const aw=a.split(' '),tw=t.split(' ');if(KEYW.some(k=>tw.includes(k)!==aw.includes(k)))return false;
    return t.length>3&&(lev(a,t)<=Math.min(3,Math.max(1,Math.floor(t.length*.15)))||(a.length>=6&&t.startsWith(a)&&a.length>=t.length*.7))})}
function pinSVG(v,{hl,only,show,labels}={}){
  const r=Math.max(7,Math.round(+v.vb.split(' ')[2]/40));
  return v.svg+v.pins.map((p,i)=>{if(only!==undefined&&only!==i)return'';const on=hl===i,ring=only!==undefined;
    return`<g data-p="${i}" class="pin" tabindex="0" role="button" aria-label="Penanda ${i+1}">${ring?`<circle cx="${p[0]}" cy="${p[1]}" r="${r+8}" fill="none" stroke="var(--eosin)" stroke-width="3" class="pulse"/>`:''}<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${on?'var(--accent)':ring?'var(--eosin)':'#fff'}" stroke="#222" stroke-width="1.5"/>${ring?'':`<text x="${p[0]}" y="${p[1]+r*.38}" text-anchor="middle" font-size="${r*1.05}" font-family="IBM Plex Mono, monospace" font-weight="600" fill="${on?'#fff':'#222'}" pointer-events="none">${i+1}</text>`}${labels?`<text x="${p[0]+r+3}" y="${p[1]+4}" font-size="${r*1.1}" font-family="IBM Plex Sans, sans-serif" fill="#111" stroke="#fff" stroke-width="3" paint-order="stroke">${esc(p[2])}</text>`:''}</g>`}).join('')}

/* ---- Atlas interaktif ---- */
function labAtlas(box,aid){
  const A=ATL[aid];let vi=0,mode='learn',T=null;
  const best=()=>S.labs&&S.labs['at-'+aid];
  box.innerHTML=`<div class="simgrid"><div class="card ctrl">
    ${A.views.length>1?`<label>Tampilan<select id="aview">${A.views.map((v,i)=>`<option value="${i}">${esc(v.n)}</option>`).join('')}</select></label>`:''}
    <div class="tabs" style="margin:0"><button class="chip" data-am="learn" aria-pressed="true">Belajar</button><button class="chip" data-am="find" aria-pressed="false">Tunjukkan</button><button class="chip" data-am="name" aria-pressed="false">Sebutkan</button></div>
    <div id="apanel"></div><p class="note">Gambar skematik, bukan skala sebenarnya. Cocokkan dengan spesimen & atlas di laboratorium.</p></div>
    <div class="card atlascard"><svg id="asvg" viewBox="0 0 10 10" class="atlas" role="img"></svg><p class="mono muted" id="acap" style="text-align:center;margin:6px 0 0;font-size:.82rem"></p></div></div>`;
  const svg=$('#asvg',box),pan=$('#apanel',box);
  const V=()=>A.views[vi];
  const paint=o=>{svg.setAttribute('viewBox',V().vb);svg.innerHTML=pinSVG(V(),o);$('#acap',box).textContent=V().n};
  const learn=()=>{let lab=false;
    if(innerWidth<860)setTimeout(()=>{const d=$('.pind',pan);if(d)d.open=false});pan.innerHTML=`<label class="row" style="gap:8px;flex-wrap:nowrap"><input type="checkbox" id="alab"> Tampilkan semua nama</label><div id="ainfo" class="res">Ketuk penanda bernomor.</div><details class="pind" open><summary>Daftar struktur</summary><ol class="pinlist" id="alist">${V().pins.map((p,i)=>`<li><button class="linkbtn" data-li="${i}">${esc(p[2])}</button></li>`).join('')}</ol></details>`;
    const pick=i=>{paint({hl:i,labels:lab});bind();const p=V().pins[i];$('#ainfo',box).innerHTML=`<b>${i+1}. ${esc(p[2])}</b><br>${esc(p[3])}`;$$('[data-li]',pan).forEach(b=>b.classList.toggle('on',+b.dataset.li===i))};
    const bind=()=>$$('.pin',svg).forEach(g=>{g.onclick=()=>pick(+g.dataset.p);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(+g.dataset.p)}}});
    $('#alab',box).onchange=e=>{lab=e.target.checked;paint({labels:lab});bind()};
    $$('[data-li]',pan).forEach(b=>b.onclick=()=>pick(+b.dataset.li));paint({});bind()};
  const quiz=kind=>{const P=V().pins;let order=shuffle(P.map((_,i)=>i)).slice(0,Math.min(10,P.length)),k=0,sc=0;
    const next=()=>{if(T){T();T=null}
      if(k>=order.length){const pct=Math.round(100*sc/order.length);S.labs=S.labs||{};S.labs['at-'+aid]=Math.max(S.labs['at-'+aid]||0,pct);save();
        pan.innerHTML=`<div class="score">${sc}/${order.length}</div><p>${pct>=80?'Bagus. Coba tampilan lain atau Spot Tentamen.':'Ulangi mode Belajar untuk penanda yang salah.'}</p><button class="btn primary" id="aagain">Ulangi</button>`;$('#aagain',box).onclick=()=>quiz(kind);paint({});return}
      const ti=order[k];
      if(kind==='find'){paint({});pan.innerHTML=`<p class="mono muted">${k+1}/${order.length} · benar ${sc}</p><p>Ketuk struktur:</p><p class="target">${esc(P[ti][2])}</p><div id="afb"></div>`;
        $$('.pin',svg).forEach(g=>g.onclick=()=>{const pi=+g.dataset.p,ok=pi===ti;if(ok)sc++;paint({hl:ti,labels:false});$$('.pin',svg).forEach(x=>x.onclick=null);
          $('#afb',box).innerHTML=`<div class="fb ${ok?'s2':'s0'}">${ok?'Tepat.':`Itu nomor ${pi+1} (${esc(P[pi][2])}). Yang benar nomor ${ti+1}.`}<br><span class="note">${esc(P[ti][3])}</span></div><button class="btn sm primary" id="anx" style="margin-top:8px">Berikutnya →</button>`;$('#anx',box).onclick=()=>{k++;next()}})}
      else{paint({only:ti});const opts=shuffle([P[ti][2],...shuffle(P.filter((_,i)=>i!==ti).map(p=>p[2])).slice(0,3)]);
        pan.innerHTML=`<p class="mono muted">${k+1}/${order.length} · benar ${sc}</p><p>Struktur yang ditunjuk penanda merah adalah…</p><div class="opts">${opts.map(o=>`<button class="opt" data-o="${esc(o)}"><span>${esc(o)}</span></button>`).join('')}</div><div id="afb"></div>`;
        $$('.opt',pan).forEach(b=>b.onclick=()=>{const ok=b.dataset.o===P[ti][2];if(ok)sc++;$$('.opt',pan).forEach(x=>{x.disabled=true;if(x.dataset.o===P[ti][2])x.classList.add('correct')});if(!ok)b.classList.add('wrong');
          $('#afb',box).innerHTML=`<div class="fb ${ok?'s2':'s0'}"><span class="note">${esc(P[ti][3])}</span></div><button class="btn sm primary" id="anx" style="margin-top:8px">Berikutnya →</button>`;$('#anx',box).onclick=()=>{k++;next()}})}};
    next()};
  const run=()=>{if(T){T();T=null}mode==='learn'?learn():quiz(mode)};
  $$('[data-am]',box).forEach(b=>b.onclick=()=>{mode=b.dataset.am;$$('[data-am]',box).forEach(x=>x.setAttribute('aria-pressed',x===b));run()});
  const sel=$('#aview',box);if(sel)sel.onchange=()=>{vi=+sel.value;run()};
  run();return()=>{T&&T()};
}

/* ---- Spot tentamen (OSPE) ---- */
function viewSpot(){
  const hist=S.spotHist||[];
  app.innerHTML=`<p class="eyebrow">Ujian praktikum anatomi · gaya OSPE</p><h1>Spot tentamen</h1><p class="lead muted" style="max-width:66ch">Seperti ujian di laboratorium anatomi: kamu berpindah dari satu meja ke meja berikutnya, tiap meja satu jarum penunjuk dan waktu terbatas. Ketik nama strukturnya dalam bahasa Latin; ejaan sedikit keliru masih diterima, singkatan m./n./a./os boleh dihilangkan.</p>
  <div class="grid g2 section"><form class="card ctrl" id="spf"><h2>Atur ujian</h2>
   <div><p class="eyebrow" style="margin-bottom:6px">Spesimen (atlas)</p><div class="row" style="gap:6px">${ATLAS.map(a=>`<label class="chip"><input type="checkbox" data-sa="${a.id}" checked style="margin:0"> ${esc(a.n)}</label>`).join('')}</div>
   <div class="row" style="gap:6px;margin-top:8px"><button type="button" class="btn sm" id="spall">Semua</button><button type="button" class="btn sm" id="spnone">Kosongkan</button>${BLOKS.map(b=>ATLAS.some(a=>a.m.some(m=>MOD[m].blok===b.b))?`<button type="button" class="btn sm" data-sb="${b.b}">${b.n}</button>`:'').join('')}</div></div>
   <div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:10px"><label>Jumlah meja<select id="spn"><option>10</option><option selected>20</option><option>30</option><option>40</option></select></label><label>Waktu per meja<select id="spt"><option value="30">30 dtk</option><option value="45">45 dtk</option><option value="60" selected>60 dtk</option><option value="90">90 dtk</option></select></label><label>Cara menjawab<select id="spm"><option value="type">Ketik nama</option><option value="mc">Pilihan ganda</option></select></label></div>
   <p class="note" id="sperr" style="color:var(--bad)"></p><button class="btn primary">Mulai ujian</button></form>
   <div class="card"><h2>Riwayat</h2>${hist.length?`<div class="tblwrap"><table class="tbl"><tr><th>Tanggal</th><th>Meja</th><th>Skor</th></tr>${hist.slice(-8).reverse().map(h=>`<tr><td class="mono">${esc(h.d)}</td><td class="mono">${h.n} × ${h.t} dtk</td><td class="mono">${h.c}/${h.n} (${h.p}%)</td></tr>`).join('')}</table></div>`:'<p class="muted">Belum ada. Batas lulus praktikum umumnya 60–70%; targetkan ≥ 80% sebelum ujian.</p>'}</div></div>`;
  const setAll=v=>$$('[data-sa]').forEach(c=>c.checked=v);
  $('#spall').onclick=()=>setAll(true);$('#spnone').onclick=()=>setAll(false);
  $$('[data-sb]').forEach(b=>b.onclick=()=>$$('[data-sa]').forEach(c=>c.checked=ATL[c.dataset.sa].m.some(m=>MOD[m].blok===+b.dataset.sb)));
  $('#spf').onsubmit=e=>{e.preventDefault();const ids=$$('[data-sa]').filter(c=>c.checked).map(c=>c.dataset.sa);if(!ids.length){$('#sperr').textContent='Pilih minimal satu spesimen.';return}
    const pool=ids.flatMap(id=>ATL[id].views.flatMap((v,vi)=>v.pins.map((p,pi)=>({a:id,vi,pi}))));
    const n=Math.min(+$('#spn').value,pool.length);spotRun(shuffle(pool).slice(0,n),+$('#spt').value,$('#spm').value)};
}
function spotRun(st,sec,how){
  let i=0,stop=null;const res=[];
  const draw=()=>{if(stop){stop();stop=null}
    if(i>=st.length){const c=res.filter(r=>r.ok).length,p=Math.round(100*c/st.length);S.spotHist=(S.spotHist||[]).concat({d:new Date().toLocaleDateString('id-ID'),n:st.length,t:sec,c,p});save();
      app.innerHTML=`<p class="eyebrow">Hasil spot tentamen</p><div class="row" style="align-items:flex-end;gap:18px"><div class="score">${p}%</div><p class="muted">${c} dari ${st.length} meja benar · ${sec} detik per meja</p></div>
      <div class="row section" style="gap:8px"><button class="btn primary" id="spagain">Ujian baru</button></div>
      <div class="tblwrap section"><table class="tbl"><tr><th>Meja</th><th>Struktur</th><th>Jawabanmu</th><th></th></tr>${res.map((r,k)=>`<tr><td class="mono">${k+1}</td><td><b>${esc(r.ans)}</b><br><span class="note">${esc(ATL[r.a].n)}</span></td><td>${esc(r.got||'—')}</td><td>${r.ok?'<span class="flag N">benar</span>':'<span class="flag H">salah</span>'}</td></tr>`).join('')}</table></div>`;
      $('#spagain').onclick=viewSpot;cleanup=null;return}
    const s=st[i],A=ATL[s.a],V=A.views[s.vi],P=V.pins[s.pi],ans=P[2];
    app.innerHTML=`<div class="row" style="justify-content:space-between"><p class="eyebrow">Meja ${i+1} dari ${st.length} · ${esc(A.n)}</p><b class="timer" id="sptm"></b></div>
    <div class="simgrid section" style="margin-top:12px"><div class="card ctrl" id="spq"><p><b>Sebutkan struktur yang ditunjuk jarum merah.</b></p>
    ${how==='type'?`<form id="spa" class="row" style="flex-wrap:nowrap"><input type="text" id="spi" autocomplete="off" placeholder="Nama Latin…" aria-label="Jawaban"><button class="btn primary">Jawab</button></form><button class="btn sm ghost" id="spskip" type="button">Lewati</button>`:`<div class="opts">${shuffle([ans,...shuffle(V.pins.filter((_,k)=>k!==s.pi).map(p=>p[2])).slice(0,3)]).map(o=>`<button class="opt" data-o="${esc(o)}"><span>${esc(o)}</span></button>`).join('')}</div>`}<div id="spfb"></div></div>
    <div class="card atlascard"><svg class="atlas" viewBox="${V.vb}" role="img" aria-label="Spesimen">${pinSVG(V,{only:s.pi})}</svg><p class="mono muted" style="text-align:center;margin:6px 0 0;font-size:.82rem">${esc(V.n)}</p></div></div>
    <p class="row section" style="justify-content:flex-end"><button class="btn sm ghost" id="spquit">Akhiri ujian</button></p>`;
    const fin=got=>{if(stop){stop();stop=null}if(res[i])return;const ok=how==='type'?nameMatch(got||'',ans):got===ans;res[i]={a:s.a,ans,got,ok};
      $$('#spq input,#spq button.opt,#spq .btn',app).forEach(x=>x.disabled=true);
      $('#spfb').innerHTML=`<div class="fb ${ok?'s2':'s0'}"><b>${ok?'Benar.':got?'Belum tepat.':'Waktu habis.'}</b> Jawaban: <b>${esc(ans)}</b><br><span class="note">${esc(P[3])}</span></div><button class="btn primary" id="spnx" style="margin-top:10px">${i+1<st.length?'Meja berikutnya →':'Lihat hasil'}</button>`;$('#spnx').disabled=false;$('#spnx').onclick=()=>{i++;draw()};$('#spnx').focus()};
    if(how==='type'){$('#spi').focus({preventScroll:true});$('#spa').onsubmit=e=>{e.preventDefault();fin($('#spi').value.trim())};$('#spskip').onclick=()=>fin('')}
    else $$('#spq .opt').forEach(b=>b.onclick=()=>{fin(b.dataset.o);$$('#spq .opt').forEach(x=>{if(x.dataset.o===ans)x.classList.add('correct');else if(x===b)x.classList.add('wrong')})});
    $('#spquit').onclick=e=>{if(e.target.dataset.c!=='1'){e.target.dataset.c='1';e.target.textContent='Yakin? Sisa meja dihitung salah';return}for(let k=i;k<st.length;k++)if(!res[k])res[k]={a:st[k].a,ans:ATL[st[k].a].views[st[k].vi].pins[st[k].pi][2],got:'',ok:false};i=st.length;draw()};
    stop=stationTimer($('#sptm'),sec,()=>fin(how==='type'?$('#spi').value.trim():''));cleanup=()=>stop&&stop()};
  draw();
}

/* ---- Urutkan ---- */
function labSeq(box,only){
  const list=only?SEQ.filter(s=>only.includes(s.m)):SEQ;let cur=list[0];
  box.innerHTML=`<div class="card ctrl"><label>Rangkaian<select id="sqs">${list.map(s=>`<option value="${s.id}">${esc(s.t)}</option>`).join('')}</select></label><p class="note" style="margin:0">Ketuk kartu sesuai urutan yang benar. Salah ketuk akan ditandai dan dihitung sebagai kesalahan.</p><div id="sqbox"></div></div>`;
  const play=()=>{let k=0,err=0;const pile=shuffle(cur.it.map((t,i)=>({t,i})));
    const draw=()=>{$('#sqbox',box).innerHTML=`<ol class="seqdone">${cur.it.slice(0,k).map(t=>`<li>${esc(t)}</li>`).join('')}</ol>${k<cur.it.length?`<div class="seqpile">${pile.filter(p=>p.i>=k).map(p=>`<button class="seqcard" data-i="${p.i}">${esc(p.t)}</button>`).join('')}</div>`:`<div class="fb ${err===0?'s2':err<3?'s1':'s0'}"><b>Selesai dengan ${err} kesalahan.</b></div><button class="btn primary" id="sqagain" style="margin-top:8px">Ulangi</button>`}<p class="mono muted" style="margin:8px 0 0">${k}/${cur.it.length} · salah ${err}</p>`;
      if(k>=cur.it.length){S.labs=S.labs||{};const sc=Math.max(0,100-err*10);S.labs['sq-'+cur.id]=Math.max(S.labs['sq-'+cur.id]||0,sc);save();$('#sqagain',box).onclick=play;return}
      $$('.seqcard',box).forEach(b=>b.onclick=()=>{if(+b.dataset.i===k){k++;draw()}else{err++;b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),400);$('.mono.muted',box).textContent=`${k}/${cur.it.length} · salah ${err}`}})};draw()};
  $('#sqs',box).onchange=e=>{cur=list.find(s=>s.id===e.target.value);play()};play();
}

/* ---- Pasangkan ---- */
function labPair(box,only){
  const list=only?PAIRS.filter(s=>only.includes(s.m)):PAIRS;let cur=list[0];
  box.innerHTML=`<div class="card ctrl"><label>Set<select id="pps">${list.map(s=>`<option value="${s.id}">${esc(s.t)}</option>`).join('')}</select></label><p class="note" style="margin:0">Ketuk satu kartu di kiri lalu pasangannya di kanan. Tiap ronde maksimal 6 pasang acak.</p><div id="ppbox"></div></div>`;
  const play=()=>{const set=shuffle(cur.p).slice(0,6),L=shuffle(set.map((p,i)=>({t:p[0],i}))),R=shuffle(set.map((p,i)=>({t:p[1],i})));let sel=null,done=0,err=0;
    $('#ppbox',box).innerHTML=`<div class="pairgrid"><div>${L.map(x=>`<button class="pcard" data-l="${x.i}">${esc(x.t)}</button>`).join('')}</div><div>${R.map(x=>`<button class="pcard" data-r="${x.i}">${esc(x.t)}</button>`).join('')}</div></div><div id="ppfb" class="mono muted" style="margin-top:8px">0/${set.length} pasang · salah 0</div>`;
    $$('[data-l]',box).forEach(b=>b.onclick=()=>{if(b.disabled)return;$$('[data-l]',box).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=+b.dataset.l});
    $$('[data-r]',box).forEach(b=>b.onclick=()=>{if(sel===null||b.disabled)return;const l=$(`[data-l="${sel}"]`,box);
      if(+b.dataset.r===sel){[l,b].forEach(x=>{x.disabled=true;x.classList.remove('sel');x.classList.add('ok')});done++;sel=null}else{err++;b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),400)}
      $('#ppfb',box).textContent=`${done}/${set.length} pasang · salah ${err}`;
      if(done===set.length){$('#ppfb',box).innerHTML=`<div class="fb ${err===0?'s2':err<3?'s1':'s0'}"><b>Selesai, ${err} kesalahan.</b></div><button class="btn primary" id="ppagain" style="margin-top:8px">Ronde baru</button>`;$('#ppagain',box).onclick=play}})};
  $('#pps',box).onchange=e=>{cur=list.find(s=>s.id===e.target.value);play()};play();
}

/* ---- Arah & gerakan ---- */
function labArah(box){
  let n=0,c=0;
  box.innerHTML=`<div class="card ctrl"><div class="tabs" style="margin:0"><button class="chip" data-ak="arah" aria-pressed="true">Istilah arah</button><button class="chip" data-ak="gerak" aria-pressed="false">Istilah gerakan</button></div><p class="mono muted" id="artally" style="margin:0"></p><div id="arbox"></div></div>`;
  let kind='arah';
  const ask=()=>{$('#artally',box).textContent=`benar ${c}/${n}`;let q,ans,opts;
    if(kind==='arah'){const r=ARAH[Math.floor(Math.random()*ARAH.length)];q=`Dalam posisi anatomi, <b>${esc(r[0])}</b> terletak … terhadap ${esc(r[1])}.`;ans=r[2];opts=shuffle(ARAHOPT[r[3]])}
    else{const r=GERAK[Math.floor(Math.random()*GERAK.length)];q=`${esc(r[0])}. Gerakan ini disebut…`;ans=r[1];opts=shuffle([ans,...shuffle(GERAKALL.filter(x=>x!==ans)).slice(0,4)])}
    $('#arbox',box).innerHTML=`<p class="qstem" style="margin:4px 0 10px">${q}</p><div class="opts">${opts.map(o=>`<button class="opt" data-o="${o}"><span>${o}</span></button>`).join('')}</div><div id="arfb"></div>`;
    $$('.opt',box).forEach(b=>b.onclick=()=>{const ok=b.dataset.o===ans;n++;if(ok)c++;$$('.opt',box).forEach(x=>{x.disabled=true;if(x.dataset.o===ans)x.classList.add('correct')});if(!ok)b.classList.add('wrong');$('#artally',box).textContent=`benar ${c}/${n}`;
      $('#arfb',box).innerHTML=`<button class="btn primary sm" id="arnx" style="margin-top:10px">Soal berikutnya →</button>`;$('#arnx',box).onclick=ask;$('#arnx',box).focus()})};
  $$('[data-ak]',box).forEach(b=>b.onclick=()=>{kind=b.dataset.ak;$$('[data-ak]',box).forEach(x=>x.setAttribute('aria-pressed',x===b));ask()});ask();
}

/* ---- daftar lab ---- */
const LABS=[
 ...ATLAS.map(a=>({id:a.id,g:'Atlas interaktif',t:a.n,d:`${a.views.length>1?a.views.length+' tampilan, ':''}${a.views.reduce((s,v)=>s+v.pins.length,0)} penanda. Mode belajar, tunjukkan, dan sebutkan.`,m:a.m,fn:b=>labAtlas(b,a.id),key:'at-'+a.id})),
 {id:'urut',g:'Permainan konsep',t:'Urutkan rangkaian',d:`${SEQ.length} rangkaian: aliran darah jantung, jalan napas, makanan, urin, sperma, lapisan, perkembangan embrio.`,m:[...new Set(SEQ.map(s=>s.m))],fn:b=>labSeq(b)},
 {id:'pasang',g:'Permainan konsep',t:'Pasangkan',d:`${PAIRS.length} set: foramen-isi, saraf kranial, otot-persarafan, lesi saraf, auskultasi, level vertebra, dermatom, kariotipe.`,m:[...new Set(PAIRS.map(s=>s.m))],fn:b=>labPair(b)},
 {id:'arah',g:'Permainan konsep',t:'Istilah arah & gerakan',d:'Soal acak tanpa batas tentang posisi relatif struktur dan nama gerakan sendi.',m:['term','artro'],fn:labArah}];
const LAB=Object.fromEntries(LABS.map(l=>[l.id,l]));
