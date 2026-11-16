/* =================== LATIHAN =================== */
function viewPractice(filter){
  const nWrong=Object.keys(S.wrong).length;
  const pool=filter==='all'?Q:filter==='wrong'?Q.filter(q=>S.wrong[q.id]):filter==='c34'?Q.filter(q=>q.l===2):QBY(filter);
  let queue=shuffle(pool),i=0,c=0,n=0;
  const chips=[['all','Semua',Q.length],['c34','Level C3–C4',Q.filter(q=>q.l===2).length],['wrong','Soal yang salah',nWrong],...MODS.map(m=>[m.id,'B'+m.blok+' · '+m.t,QBY(m.id).length])];
  app.innerHTML=`<p class="eyebrow">${Q.length} soal · umpan balik langsung</p><h1>Latihan soal</h1>
  <div class="row section" style="gap:6px;margin-top:16px">${chips.map(([k,l,cnt])=>`<a class="chip" href="#latihan-${k}" aria-pressed="${k===filter}">${esc(l)} <small>${cnt}${S.tq[k]&&acc(k)!==null?' · '+acc(k)+'%':''}</small></a>`).join('')}</div>
  <div class="row section" style="justify-content:space-between"><span class="mono muted" id="tally"></span><button class="btn sm" id="restart">Acak ulang</button></div>
  <div id="qbox" style="margin-top:12px"></div>`;
  const box=$('#qbox'),tally=$('#tally');
  const show=()=>{
    tally.textContent=`Soal ${Math.min(i+1,queue.length)} dari ${queue.length} · benar ${c}/${n}`;
    box.innerHTML='';
    if(!queue.length){box.innerHTML=`<div class="card"><p>${filter==='wrong'?'Belum ada soal yang salah. Kerjakan latihan dulu.':'Tidak ada soal.'}</p></div>`;return}
    if(i>=queue.length){box.innerHTML=`<div class="card"><h2>Selesai: ${c}/${n} benar (${Math.round(100*c/n)}%)</h2><p class="muted">${c/n>=.8?'Bagus. Pindah ke topik lain atau coba simulasi ujian.':'Ulangi modulnya, lalu kerjakan "Soal yang salah".'}</p><button class="btn primary" id="again">Ulangi</button></div>`;$('#again').onclick=()=>{queue=shuffle(pool);i=0;c=0;n=0;show()};return}
    const w=qWidget(queue[i],{num:`Soal ${i+1}`,onAnswer:ok=>{n++;if(ok)c++;tally.textContent=`Soal ${i+1} dari ${queue.length} · benar ${c}/${n}`;nb.hidden=false;nb.focus()}});
    box.appendChild(w);
    const nb=document.createElement('button');nb.className='btn primary';nb.textContent=i+1<queue.length?'Soal berikutnya →':'Lihat hasil';nb.hidden=true;nb.style.marginTop='12px';
    nb.onclick=()=>{i++;show()};box.appendChild(nb);
  };
  $('#restart').onclick=()=>{queue=shuffle(pool);i=0;c=0;n=0;show()};
  show();
}

/* =================== UJIAN =================== */

/* =================== ROLEPLAY =================== */
let samplerP=null;
const getSampler=()=>samplerP||(samplerP=(window.claude&&window.claude.use)?window.claude.use('sample').catch(()=>null):Promise.resolve(null));
function viewRoleplayList(){
  app.innerHTML=`<p class="eyebrow">${RP.length} kasus anatomi klinis</p><h1>Roleplay</h1><p class="lead muted" style="max-width:64ch">Setiap kasus menghubungkan anatomi dengan pasien nyata. Tiga cara latihan: <b>Tutorial 7 Jump</b> (kerjakan langkah demi langkah lalu bandingkan dengan jawaban model), <b>Simulasi klinis</b> (pilih tindakan & jawaban, dapat umpan balik dan skor), dan <b>Roleplay AI</b> (bercakap bebas dengan pasien, tutor, atau penguji).</p>
  <div class="grid g2 section">${RP.map(r=>`<a class="card rpcard" href="#rp-${r.id}"><span class="eyebrow">Kasus ${r.id} · ${r.week}</span><h3>${esc(r.title)}</h3><p class="muted" style="font-size:.9rem;margin:0">${esc(r.text.slice(0,150))}…</p><div class="row" style="gap:6px;margin-top:auto">${r.topics.map(t=>`<span class="tag">${esc(MOD[t].t)}</span>`).join('')}${S.drafts['rpscore'+r.id]!==undefined?`<span class="tag c34">Skor ${S.drafts['rpscore'+r.id]}%</span>`:''}</div></a>`).join('')}</div>`;
}
function viewRoleplay(id){
  const r=RP.find(x=>x.id===id);if(!r){location.hash='roleplay';return}
  app.innerHTML=`<p class="bc"><a href="#roleplay">Roleplay</a> / Kasus ${r.id}</p><p class="eyebrow" style="margin-top:12px">Kasus ${r.id} · ${r.week}</p><h1 style="font-size:clamp(1.8rem,4vw,2.5rem)">${esc(r.title)}</h1>
  <section class="section card prose" style="max-width:none"><p>${esc(r.text)}</p>${r.labs.length?`<div class="tblwrap"><table class="tbl lab"><tr><th>Pemeriksaan</th><th>Hasil</th><th>Satuan</th><th>Rujukan</th><th></th></tr>${r.labs.map(l=>`<tr><td>${l[0]}</td><td class="v">${l[1]}</td><td class="mono muted">${l[2]}</td><td class="mono muted">${l[3]}</td><td>${l[4]?`<span class="flag ${l[4]}">${l[4]}</span>`:''}</td></tr>`).join('')}</table></div>`:''}</section>
  <div class="tabs"><button class="chip" data-tab="j" aria-pressed="true">Tutorial 7 Jump</button><button class="chip" data-tab="c" aria-pressed="false">Simulasi klinis</button><button class="chip" data-tab="a" aria-pressed="false">Roleplay AI</button></div><div id="rpbox"></div>`;
  const box=$('#rpbox');
  const tabs={j:()=>rpJump(r,box),c:()=>rpClin(r,box),a:()=>rpAI(r,box)};
  $$('[data-tab]').forEach(b=>b.onclick=()=>{$$('[data-tab]').forEach(x=>x.setAttribute('aria-pressed',x===b));tabs[b.dataset.tab]()});
  rpJump(r,box);
}
function rpJump(r,box){
  const J=r.jump;
  const steps=[
    ['Klarifikasi istilah','Tulis istilah dalam skenario yang belum kamu pahami beserta artinya.',`<div class="tblwrap"><table class="tbl">${J.istilah.map(([a,b])=>`<tr><td><b>${a}</b></td><td>${b}</td></tr>`).join('')}</table></div>`],
    ['Rumuskan masalah','Buat daftar pertanyaan dari data pasien dan kata kunci skenario.',`<ul>${J.masalah.map(x=>`<li>${x}</li>`).join('')}</ul>`],
    ['Curah pendapat','Jawab pertanyaanmu dengan pengetahuan awal (hipotesis), tanpa membuka buku.',`<ul>${J.hipotesis.map(x=>`<li>${x}</li>`).join('')}</ul>`],
    ['Analisis & peta konsep','Susun hubungan sebab-akibat dari pemicu sampai gejala.',`<div class="concept">${J.peta.map(x=>`<span>${x}</span>`).join('')}</div>`],
    ['Learning objective','Rumuskan hal yang perlu kamu pelajari mandiri.',`<ul>${J.lo.map(x=>`<li>${x}</li>`).join('')}</ul><p class="note">Modul terkait: ${r.topics.map(t=>`<a href="#m-${t}">${esc(MOD[t].t)}</a>`).join(', ')}.</p>`],
    ['Belajar mandiri','Pelajari modul terkait dan catat jawaban tiap LO di kertas folio (seperti di tutorial).',`<p>Buka modul: ${r.topics.map(t=>`<a href="#m-${t}">${esc(MOD[t].t)}</a>`).join(' · ')} dan kerjakan <a href="#latihan-${r.topics[0]}">latihan soal</a>.</p>`],
    ['Sintesis (pertemuan 2)','Jelaskan seluruh skenario dengan bahasamu sendiri, lalu bandingkan.',J.sintesis]];
  box.innerHTML=`<p class="note" style="margin-bottom:14px">Tulis dulu jawabanmu (tersimpan otomatis di browser ini), baru buka jawaban model. Pada tutorial sesungguhnya kamu hanya boleh membawa catatan kertas.</p>`+steps.map((s,i)=>`<div class="jstep" data-n="${i+1}"><h3>${s[0]}</h3><p class="muted" style="margin:2px 0 0">${s[1]}</p><textarea id="d-${r.id}-${i}" aria-label="Jawabanmu untuk langkah ${i+1}">${esc(S.drafts[`j${r.id}-${i}`]||'')}</textarea><button class="btn sm" data-rev="${i}">Lihat jawaban model</button><div class="model prose" hidden id="m-${r.id}-${i}" style="max-width:none">${s[2]}</div></div>`).join('');
  $$('textarea',box).forEach((t,i)=>t.oninput=()=>{S.drafts[`j${r.id}-${i}`]=t.value;save()});
  $$('[data-rev]',box).forEach(b=>b.onclick=()=>{const m=$('#m-'+r.id+'-'+b.dataset.rev,box);m.hidden=!m.hidden;b.textContent=m.hidden?'Lihat jawaban model':'Sembunyikan jawaban model'});
}
function rpClin(r,box){
  let i=0,score=0;const max=r.clin.length*2;
  const draw=()=>{
    if(i>=r.clin.length){const pct=Math.round(100*score/max);S.drafts['rpscore'+r.id]=pct;save();
      box.innerHTML=`<div class="card"><p class="eyebrow">Selesai</p><div class="score">${pct}%</div><p>${score} dari ${max} poin. ${pct>=80?'Penalaran klinismu sudah runtut.':'Baca sintesis di tab Tutorial 7 Jump, lalu ulangi.'}</p><button class="btn primary" id="again">Ulangi simulasi</button></div>`;$('#again',box).onclick=()=>{i=0;score=0;draw()};return}
    const n=r.clin[i],ord=shuffle(n.ch.map((_,k)=>k));
    box.innerHTML=`<div class="card"><div class="row" style="justify-content:space-between"><span class="eyebrow">Langkah ${i+1} dari ${r.clin.length}</span><span class="mono muted">${score}/${max}</span></div>
    <div style="margin:14px 0"><div class="who">${esc(n.who)}</div><div class="bubble them">${esc(n.say)}</div></div>
    <p><b>${esc(n.ask)}</b></p><div class="opts">${ord.map((k,j)=>`<button class="opt" data-k="${k}"><span class="k">${LET[j]}</span><span>${esc(n.ch[k].t)}</span></button>`).join('')}</div><div id="fbk"></div></div>`;
    $$('.opt',box).forEach(b=>b.onclick=()=>{const c=n.ch[+b.dataset.k];score+=c.s;
      $$('.opt',box).forEach(x=>{x.disabled=true;const s=n.ch[+x.dataset.k].s;if(s===2)x.classList.add('correct')});if(c.s<2)b.classList.add(c.s===1?'sel':'wrong');
      const best=n.ch.find(x=>x.s===2);
      $('#fbk',box).innerHTML=`<div class="fb s${c.s}"><b>${c.s===2?'Tepat (+2)':c.s===1?'Sebagian (+1)':'Kurang tepat (0)'}.</b> ${esc(c.f)}${c.s<2?`<br><span class="note">Jawaban terbaik: ${esc(best.t)}</span>`:''}</div><button class="btn primary" style="margin-top:12px" id="nx">${i+1<r.clin.length?'Lanjut →':'Lihat skor'}</button>`;
      $('#nx',box).onclick=()=>{i++;draw()};$('#nx',box).focus()});
  };draw();
}
const PERS={
  pasien:['Pasien / keluarga','Kamu adalah pasien atau keluarga pasien dalam skenario ini (pilih tokoh yang paling sesuai). Kamu orang awam: tidak memakai istilah medis, agak cemas, menjawab pertanyaan anamnesis sesuai skenario dan boleh menambah detail wajar yang konsisten. Jangan menyebut diagnosis. Mahasiswa berperan sebagai dokter muda yang menganamnesis dan menjelaskan kondisi. Bila penjelasannya memakai istilah sulit, tanyakan artinya.'],
  tutor:['Tutor PBL','Kamu tutor PBL anatomi klinis. Pandu mahasiswa memahami kasus dengan pertanyaan Sokratik bertahap mengikuti learning objective. Ajukan satu pertanyaan setiap giliran, minta mahasiswa menjelaskan mekanisme (bukan hafalan), beri petunjuk bila ia buntu, dan koreksi miskonsepsi dengan sopan.'],
  penguji:['Penguji','Kamu penguji ujian lisan anatomi (boleh meminta mahasiswa menyebut nama Latin, letak, persarafan, perdarahan, dan relasi struktur). Ajukan 5 pertanyaan bertingkat dari mengingat (C1) sampai analisis kasus (C4), satu per satu. Setelah tiap jawaban beri penilaian singkat (tepat/kurang/salah) dengan koreksi 1–2 kalimat, lalu lanjut ke pertanyaan berikutnya. Setelah pertanyaan kelima, beri nilai 0–100 dan 3 saran belajar.']};
function rpAI(r,box){
  box.innerHTML=`<div class="card"><p class="muted">Memeriksa ketersediaan fitur percakapan AI…</p></div>`;
  getSampler().then(sample=>{
    if(!sample){box.innerHTML=`<div class="card"><h3>Roleplay AI tidak tersedia di tampilan ini</h3><p class="muted">Fitur ini butuh akses Claude dari dalam halaman, yang hanya ada untuk penonton yang masuk ke claude.ai. Gunakan tab <b>Simulasi klinis</b> dan <b>Tutorial 7 Jump</b>, yang berfungsi penuh tanpa koneksi AI.</p></div>`;return}
    let per='pasien',msgs=[],busy=false,ctrl=null;
    box.innerHTML=`<div class="card"><div class="row" style="justify-content:space-between"><div class="row" style="gap:6px">${Object.entries(PERS).map(([k,v])=>`<button class="chip" data-p="${k}" aria-pressed="${k===per}">${v[0]}</button>`).join('')}</div><button class="btn sm" id="start">Mulai sesi</button></div>
      <p class="note" style="margin-top:8px">Ketik <b>selesai</b> kapan saja untuk menghentikan peran dan meminta umpan balik serta nilai. Percakapan tidak disimpan.</p>
      <div class="chat" id="chat" style="margin-top:12px"></div>
      <form id="cf" class="row" style="margin-top:12px;flex-wrap:nowrap"><input type="text" id="ci" placeholder="Tulis pertanyaan atau penjelasanmu…" autocomplete="off" disabled><button class="btn primary" id="cs" disabled>Kirim</button></form></div>`;
    const chat=$('#chat',box),ci=$('#ci',box),cs=$('#cs',box);
    const sys=()=>`Kamu sedang bermain peran untuk melatih mahasiswa kedokteran (anatomi klinis Blok 1–9, FKIK Universitas Mataram). Gunakan bahasa Indonesia yang wajar.\n\nKASUS ${r.id} "${r.title}":\n${r.text}\n${r.labs.length?'Data: '+r.labs.map(l=>l[0]+' '+l[1]+' '+l[2]).join('; ')+'\n':''}\nKUNCI PEMBAHASAN (rahasia; gunakan untuk menilai dan mengarahkan, jangan dibacakan utuh):\n${r.jump.sintesis.replace(/<[^>]+>/g,'')}\nLearning objective: ${r.jump.lo.join('; ')}\n\nPERANMU: ${PERS[per][1]}\n\nATURAN: tetap dalam peran; jawaban singkat (maksimal sekitar 100 kata); jangan memakai format markdown seperti tanda bintang atau pagar; jangan langsung memberi jawaban lengkap sebelum mahasiswa mencoba. Bila mahasiswa menulis "selesai", keluar dari peran lalu beri umpan balik: hal yang sudah baik, yang kurang atau keliru, nilai 0–100, dan 3 topik yang perlu dipelajari.`;
    const bub=(who,txt,me)=>{const d=document.createElement('div');d.style.display='flex';d.style.flexDirection='column';d.innerHTML=`<div class="who" style="${me?'text-align:right':''}">${esc(who)}</div><div class="bubble ${me?'me':'them'}"></div>`;$('.bubble',d).textContent=txt;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;return $('.bubble',d)};
    const ask=async()=>{busy=true;ci.disabled=cs.disabled=true;const b=bub(PERS[per][0],'…',false);ctrl=new AbortController();
      try{const res=await sample(msgs,{cache:false,signal:ctrl.signal,onText:({text})=>{b.textContent=text;chat.scrollTop=chat.scrollHeight}});b.textContent=res.text;msgs.push({role:'assistant',content:res.text})}
      catch(e){const code=e&&e.code;b.textContent=code==='not_granted'?'Akses AI ditolak. Kamu bisa mengizinkannya lewat menu Izin artefak, atau gunakan Simulasi klinis.':code==='rate_limited'?'Terlalu banyak permintaan. Tunggu sebentar lalu kirim lagi.':'Percakapan gagal dilanjutkan. Coba kirim ulang pesanmu.';if(msgs.length&&msgs[msgs.length-1].role==='user'&&code!=='not_granted'){msgs.pop()}}
      busy=false;ci.disabled=cs.disabled=false;ci.focus()};
    $$('[data-p]',box).forEach(b=>b.onclick=()=>{if(busy)return;per=b.dataset.p;$$('[data-p]',box).forEach(x=>x.setAttribute('aria-pressed',x===b))});
    $('#start',box).onclick=()=>{if(busy)return;chat.innerHTML='';msgs=[{role:'user',content:sys()+'\n\nMulai sekarang dengan kalimat pembuka dalam peranmu.'}];$('#start',box).textContent='Mulai ulang';ask()};
    $('#cf',box).onsubmit=e=>{e.preventDefault();const t=ci.value.trim();if(!t||busy||!msgs.length)return;ci.value='';bub('Kamu',t,true);msgs.push({role:'user',content:t});ask()};
    cleanup=()=>{ctrl&&ctrl.abort()};
  });
}


route();
