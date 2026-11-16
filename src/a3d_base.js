/* ====== MODEL 3D ANATOMI: pembantu ====== */
const lerpC=(K,a,b,k)=>new K.T.Color(a).lerp(new K.T.Color(b),Math.max(0,Math.min(1,k)));
function flowDots(K,root,pts,n,col,r=.07){const cv=K.curve(pts),d=[];for(let i=0;i<n;i++){const s=K.sph(r,K.glow(col,.8),10,8);root.add(s);d.push(s)}return{cv,d,update(t,sp=.25,on=true){d.forEach((s,i)=>{s.visible=on;const k=(((t*sp+i/n)%1)+1)%1;s.position.copy(cv.getPointAt(k))})}}}
function rbc(K,s=1){const pts=[[0,.12],[.3,.16],[.55,.22],[.75,.2],[.86,.1],[.89,0],[.86,-.1],[.75,-.2],[.55,-.22],[.3,-.16],[0,-.12]];return K.sc(K.lathe(pts,K.mat('#c8423b',{roughness:.45}),40),s)}
/* ---- vertebra ---- */
function vertebra(K,type){const g=K.g(),B=K.mat('#e9dcc0',{roughness:.7}),F=K.mat('#c9b48a',{roughness:.6});
  const P={L:{r:.78,h:.7,f:.42,sp:[.14,.5,.95,0],tr:.95},T:{r:.55,h:.55,f:.36,sp:[.1,.2,1.15,-.75],tr:.75},C:{r:.42,h:.36,f:.5,sp:[.09,.16,.55,-.2],tr:.55}}[type];
  const zb=P.f+P.r*.72;const body=K.cyl(P.r,P.r,P.h,B,32);body.scale.z=type==='C'?.7:.8;body.position.z=zb;g.add(body);
  const arch=K.tor(P.f+.08,.1,B,Math.PI,24);arch.rotation.x=-Math.PI/2;g.add(arch);
  [-1,1].forEach(s=>{const pd=K.box(.18,.24,zb-P.r*.55,B);pd.position.set(s*(P.f+.06),0,(zb-P.r*.55)/2);g.add(pd);
    const tp=K.box(P.tr,.16,.2,B);tp.position.set(s*(P.f+.05+P.tr/2),0,type==='T'?-.25:0);tp.rotation.y=type==='T'?s*.35:0;g.add(tp);
    if(type==='C'){const ft=K.tor(.12,.05,B);ft.rotation.x=Math.PI/2;ft.position.set(s*(P.f+.32),0,0);g.add(ft)}
    if(type==='T'){const cf=K.sc(K.sph(.1,F,10,8),1,1,.4);cf.position.set(s*(P.f+.05+P.tr*.9),0,-.38);g.add(cf);[1,-1].forEach(u=>{const df=K.sc(K.sph(.1,F,10,8),.4,1,1);df.position.set(s*P.r*.98,u*P.h*.4,zb-.2);g.add(df)})}
    [1,-1].forEach(u=>{const ap=K.cyl(.09,.09,.25,u>0?F:B,12);ap.position.set(s*(P.f*.8),u*P.h*.55,-.12);g.add(ap)})});
  const [sw,sh,sl,tilt]=P.sp;const sp=K.box(sw,sh,sl,B);sp.position.set(0,Math.sin(tilt)*sl/2,-(P.f+.12)-Math.cos(tilt)*sl/2);sp.rotation.x=-tilt;g.add(sp);
  if(type==='C')[-1,1].forEach(s=>{const b=K.sph(.09,B,10,8);b.position.set(s*.1,sp.position.y-.05,sp.position.z-sl/2);g.add(b)});
  g.userData={body,sp,zb};return g}
function atlasC1(K){const g=K.g(),B=K.mat('#e9dcc0',{roughness:.7}),F=K.mat('#c9b48a');const a=K.tor(.75,.11,B,Math.PI*.55);a.rotation.x=Math.PI/2;a.rotation.z=Math.PI*.225;g.add(a);
  const p=K.tor(.8,.1,B,Math.PI*.7);p.rotation.x=-Math.PI/2;p.rotation.z=Math.PI*.15;g.add(p);
  [-1,1].forEach(s=>{K.put(K.box(.35,.38,.62,B),s*.68,0,.1,0,0,0,g);K.put(K.sc(K.sph(.17,F,12,8),.9,.3,1.6),s*.68,.2,.1,0,0,0,g);K.put(K.box(.5,.14,.2,B),s*1.05,0,.05,0,0,0,g);const r=K.tor(.11,.045,B);r.rotation.x=Math.PI/2;r.position.set(s*1.12,0,.05);g.add(r)});
  K.put(K.sph(.12,B),0,0,.77,0,0,0,g);K.put(K.sph(.1,B),0,0,-.82,0,0,0,g);return g}
function axisC2(K){const g=vertebra(K,'C');K.put(K.cyl(.17,.2,.75,'#e9dcc0',16),0,.55,g.userData.zb,0,0,0,g);K.put(K.sph(.17,'#e9dcc0'),0,.93,g.userData.zb,0,0,0,g);g.userData.sp.scale.set(1.6,1.6,1.3);return g}
SC3.vertebra={m:['osteo','leher'],g:'Osteologi & leher',t:'Vertebra & penampang leher',d:'Atlas, axis, vertebra servikal, torakal, lumbal, columna vertebralis lengkap, dan penampang leher setinggi C6. Anterior menghadap ke depan.',R:2.1,target:[0,1.6,0],
build(K,root,api){K.base(4.4,4.4,root);K.put(K.cyl(.5,.7,.9,'#ffffff'),0,.45,0,0,0,0,root);const sets={};
  const mk=(k,o,y=1.6)=>{const g=K.g();g.add(o);g.position.y=y;root.add(g);g.visible=false;sets[k]=g;return o};
  const A=mk('atlas',atlasC1(K));api.label(A,'Atlas (C1)','Tanpa corpus dan processus spinosus. Massa lateralis dengan facies articularis superior bersendi dengan condylus occipitalis (gerak mengangguk).',[0,.6,0]);
  const X=mk('axis',axisC2(K));api.label(X,'Axis (C2)','Dens menjulang ke atas menjadi poros sendi atlantoaksial (gerak menoleh). Processus spinosus besar dan bifid.',[0,1.1,.5]);
  const C=mk('cerv',vertebra(K,'C'));api.label(C.userData.body,'Corpus (servikal)','Kecil, lebar ke samping; ada uncus di tepi atas.',[0,.3,0]);api.label(C.children.find(c=>c.geometry&&c.geometry.type==='TorusGeometry'&&c.position.x>0)||C,'Foramen transversarium','Ciri khas servikal; dilalui a. vertebralis (C6–C1).',[0,.3,0]);api.label(C.userData.sp,'Processus spinosus bifid','C3–C6 bercabang dua; C7 panjang tidak bifid (prominens).',[0,.3,0]);
  const Tt=mk('thor',vertebra(K,'T'));api.label(Tt.userData.body,'Corpus (torakal)','Berbentuk jantung, dengan fovea costalis superior & inferior untuk caput costae.',[0,.4,0]);api.label(Tt.userData.sp,'Processus spinosus torakal','Panjang dan menurun tajam menutupi vertebra di bawahnya.',[0,.3,0]);
  const Lm=mk('lumb',vertebra(K,'L'));api.label(Lm.userData.body,'Corpus (lumbal)','Paling besar, berbentuk ginjal, menopang berat badan.',[0,.45,0]);api.label(Lm.userData.sp,'Processus spinosus lumbal','Pendek, lebar seperti kapak, horizontal.',[0,.4,0]);
  // kolumna
  const col=K.g(),verts=[];let y=0;const seq=[['C',7],['T',12],['L',5]];const curve=i=>i<7?.25*Math.sin(i/7*Math.PI):i<19?-.45*Math.sin((i-7)/12*Math.PI):.35*Math.sin((i-19)/5*Math.PI);let i=0;
  seq.forEach(([tp,n])=>{for(let k=0;k<n;k++,i++){const v=i===0?atlasC1(K):i===1?axisC2(K):vertebra(K,tp);const s=tp==='L'?.32:tp==='T'?.36:.4;K.sc(v,s);v.position.set(0,-y,curve(i));col.add(v);verts.push(v);y+=tp==='L'?.32:tp==='T'?.27:.2;
    if(i>1){const d=K.cyl(.22*(tp==='L'?1.2:1),.22*(tp==='L'?1.2:1),.05,K.mat('#a9c7d8'),20);d.position.set(0,-y+.1,curve(i)+v.userData.zb*s);col.add(d)}}});
  const sac=K.cone(.35,1,'#e3d3b2',3);sac.rotation.x=Math.PI;sac.position.set(0,-y-.35,.25);col.add(sac);K.sc(col,1.05);col.position.y=y*1.05+.95;col.visible=false;root.add(col);sets.kol=col;
  api.label(verts[3],'Servikal (7)','Lordosis servikal; C1 atlas, C2 axis, C7 prominens.',[.4,0,0]);api.label(verts[12],'Torakal (12)','Kifosis torakal; bersendi dengan iga.',[.4,0,0]);api.label(verts[21],'Lumbal (5)','Lordosis lumbal; corpus terbesar.',[.4,0,0]);api.label(sac,'Os sacrum','5 vertebra sakral menyatu.',[.3,0,0]);
  // penampang leher
  const nk=K.g();K.put(K.cyl(2.2,2.2,.5,'#e9b9a0',48),0,0,0,0,0,0,nk);const col2=(x,z,r,c,h=.62,sx=1,sz=1)=>K.put(K.sc(K.cyl(r,r,h,c,28),sx,1,sz),x,.1,z,0,0,0,nk);
  const vb=col2(0,-.55,.45,'#e9dcc0');K.put(K.tor(.38,.1,'#e9dcc0',Math.PI),0,.3,-1.05,-Math.PI/2,0,0,nk);const sc2=col2(0,-1.05,.22,'#f2d36b',.66);
  const tr=K.put(K.tor(.36,.09,'#dfe7ee',Math.PI*1.7),0,.38,.95,Math.PI/2,0,Math.PI*.35,nk);const tri=col2(0,.95,.3,'#1d2a33',.6);
  const es=col2(0,.35,.22,'#d98c8c',.64,1.4,.7);const th=col2(.62,.95,.3,'#9c4a3c',.6,.8,1.3);col2(-.62,.95,.3,'#9c4a3c',.6,.8,1.3);
  const ca=col2(1.05,.25,.17,'#c0392b',.7);col2(-1.05,.25,.17,'#c0392b',.7);const ij=col2(1.45,.3,.24,'#3a5ea8',.68);col2(-1.45,.3,.24,'#3a5ea8',.68);const vg=col2(1.25,.02,.08,'#e8c440',.74);col2(-1.25,.02,.08,'#e8c440',.74);
  const scm=col2(1.55,.9,.28,'#b9473f',.66,1.5,.6);col2(-1.55,.9,.28,'#b9473f',.66,1.5,.6);const trp=col2(1.1,-1.6,.35,'#b9473f',.66,1.6,.5);col2(-1.1,-1.6,.35,'#b9473f',.66,1.6,.5);
  nk.position.y=1.4;nk.visible=false;root.add(nk);sets.leher=nk;
  [[vb,'Corpus vertebra C6','Tuberculum caroticum (Chassaignac) di processus transversus C6.'],[sc2,'Medulla spinalis','Di canalis vertebralis.'],[tri,'Trachea','Dimulai setinggi C6 di bawah cartilago cricoidea.'],[es,'Oesophagus','Di belakang trakea, mulai C6.'],[th,'Glandula thyroidea','Lobus kanan-kiri memeluk trakea; isthmus di cincin trakea 2–4.'],[ca,'A. carotis communis','Di selubung karotis, paling medial.'],[ij,'V. jugularis interna','Di selubung karotis, lateral.'],[vg,'N. vagus','Di selubung karotis, di belakang antara arteri dan vena.'],[scm,'M. sternocleidomastoideus','Membagi trigonum anterius & posterius; n. XI.'],[trp,'M. trapezius','Di posterior; n. XI.']].forEach(([o,n,i])=>api.label(o,n,i,[0,.45,0]));
  const show=k=>{Object.entries(sets).forEach(([kk,g])=>g.visible=kk===k);api.focus(0,k==='kol'?3.6:1.6,0,k==='kol'?4.6:k==='leher'?2.8:2)};
  api.buttons('Spesimen',[['Atlas C1',()=>show('atlas')],['Axis C2',()=>show('axis')],['Servikal',()=>show('cerv')],['Torakal',()=>show('thor')],['Lumbal',()=>show('lumb')],['Kolumna',()=>show('kol')],['Leher C6',()=>show('leher')]],2);
  sets.cerv.visible=true;
  return{focus(f){show(f)},update(){}}}};

