/* ====== MODEL 3D ANATOMI (bagian 1) ====== */
const PI=Math.PI;
function seg(K,a,b,r,m,r2){const A=a.isVector3?a:new K.T.Vector3(...a),B=b.isVector3?b:new K.T.Vector3(...b),L=A.distanceTo(B);const c=K.cyl(r2===undefined?r:r2,r,L,m,16);c.position.copy(A).add(B).multiplyScalar(.5);c.quaternion.setFromUnitVectors(new K.T.Vector3(0,1,0),B.clone().sub(A).normalize());return c}
const PINF=aid=>n=>{const A=ATL[aid];if(!A)return'';for(const v of A.views)for(const p of v.pins)if(p[2]===n)return p[3];return''};
function wrinkle(geo,amp=.035,f=9){const p=geo.attributes.position,v=new THREE.Vector3();for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);const n=v.clone().normalize();const d=amp*(Math.sin(v.x*f+Math.cos(v.y*f*.7))*Math.cos(v.z*f*.9+v.y*f*.4));v.addScaledVector(n,d);p.setXYZ(i,v.x,v.y,v.z)}geo.computeVertexNormals();return geo}
const BONEC='#ebdfc4';

/* ---- posisi anatomi, bidang, gerakan ---- */
SC3.tubuh={m:['term','artro','mio'],g:'Terminologi',t:'Posisi anatomi, bidang & gerakan',d:'Manusia dalam posisi anatomi dengan tiga bidang tubuh dan arah. Pilih gerakan untuk melihat fleksi, abduksi, rotasi, supinasi-pronasi, dorsofleksi-plantarfleksi.',R:2.6,target:[0,1.75,0],
build(K,root,api){K.base(6,5,root);const p=K.human({shirt:'#6d8fb3'});root.add(p);const u=p.userData;
  [-1,1].forEach(s=>K.put(K.sph(.04,'#222',8,6),s*.12,.05,.3,0,0,0,u.head));K.put(K.sc(K.sph(.06,'#d9a07a',8,6),1,1,1.3),0,-.03,.33,0,0,0,u.head);
  const thumb=K.put(K.cap(.04,.12,'#e0b48f'),-.13,-.72,.06,0,0,.4,u.armR.userData.elbow);api.label(thumb,'Ibu jari (lateral)','Pada posisi anatomi telapak tangan menghadap ke depan sehingga ibu jari berada di sisi lateral.',[-.1,0,0]);
  api.label(u.head,'Posisi anatomi','Berdiri tegak, wajah ke depan, lengan di samping, telapak tangan menghadap ke depan, kaki rapat.',[0,.6,0]);
  const pl=(w,h,c,ro)=>{const m=new K.T.Mesh(new K.T.PlaneGeometry(w,h),K.mat(c,{transparent:true,opacity:.22,side:K.T.DoubleSide,depthWrite:false}));m.rotation.set(...ro);root.add(m);return m};
  const sag=pl(2.4,4,'#3b82f6',[0,PI/2,0]);sag.position.y=1.8;const fro=pl(3,4,'#22c55e',[0,0,0]);fro.position.y=1.8;const tra=pl(3,2.4,'#f59e0b',[-PI/2,0,0]);tra.position.y=2.1;
  api.label(sag,'Bidang sagital (median)','Membagi tubuh kanan-kiri.',[0,2.1,1]);api.label(fro,'Bidang frontal (koronal)','Membagi tubuh depan-belakang.',[1.3,2.1,0]);api.label(tra,'Bidang transversal','Membagi atas-bawah; potongan CT aksial.',[1.3,0,1]);
  const arrow=(from,dir,c,name,inf)=>{const g=K.g();const d=new K.T.Vector3(...dir).normalize();const sh=K.cyl(.03,.03,.6,K.glow(c,.5),8);sh.position.y=.3;g.add(sh);const hd=K.cone(.08,.18,K.glow(c,.5),12);hd.position.y=.65;g.add(hd);g.position.set(...from);g.quaternion.setFromUnitVectors(new K.T.Vector3(0,1,0),d);root.add(g);api.label(g,name,inf,[0,0,0]);return g};
  const arr=[arrow([0,3.6,0],[0,1,0],'#ef4444','Superior (kranial)','Ke arah kepala.'),arrow([0,.05,.6],[0,-1,0],'#ef4444','Inferior (kaudal)','Ke arah kaki.'),arrow([0,2.2,.45],[0,0,1],'#8b5cf6','Anterior (ventral)','Ke depan.'),arrow([0,2.2,-.45],[0,0,-1],'#8b5cf6','Posterior (dorsal)','Ke belakang.'),
    arrow([.95,2.4,0],[1,0,0],'#10b981','Lateral','Menjauhi bidang median.'),arrow([-.95,1.25,0],[1,0,0],'#10b981','Medial','Mendekati bidang median.'),arrow([-1.25,2.9,.15],[0,1,0],'#f97316','Proksimal','Dekat pangkal anggota gerak.'),arrow([-1.25,1.0,.15],[0,-1,0],'#f97316','Distal','Jauh dari pangkal anggota gerak.')];
  let showP=true,showA=true;api.buttons('Tampilkan',[['Bidang + arah',()=>{showP=showA=true}],['Bidang saja',()=>{showP=true;showA=false}],['Arah saja',()=>{showP=false;showA=true}],['Tubuh saja',()=>{showP=showA=false}]]);
  let mv='none';const rd=api.readout();const MV={none:'Posisi anatomi.',fleksi:'Fleksi–ekstensi siku: sudut sendi mengecil lalu membesar (bidang sagital).',abd:'Abduksi–adduksi bahu: menjauhi lalu mendekati garis tengah (bidang frontal).',bahu:'Fleksi–ekstensi bahu: lengan diayun ke depan dan ke belakang.',lutut:'Fleksi lutut: tungkai bawah ditekuk ke belakang.',rot:'Rotasi kepala (sendi atlantoaksial, pivot): menoleh kanan-kiri.',sup:'Supinasi–pronasi: lengan bawah berputar; perhatikan ibu jari berpindah dari lateral ke medial.',dor:'Dorsofleksi–plantarfleksi pergelangan kaki.',sirk:'Sirkumduksi bahu: gabungan fleksi, abduksi, ekstensi, adduksi membentuk kerucut.'};
  api.buttons('Gerakan',[['Posisi anatomi',()=>mv='none'],['Fleksi siku',()=>mv='fleksi'],['Abduksi bahu',()=>mv='abd'],['Fleksi bahu',()=>mv='bahu'],['Fleksi lutut',()=>mv='lutut'],['Rotasi kepala',()=>mv='rot'],['Supinasi–pronasi',()=>mv='sup'],['Dorso/plantarfleksi',()=>mv='dor'],['Sirkumduksi',()=>mv='sirk']]);
  const foot=u.legR.userData.knee.children[1];
  return{update(t){sag.visible=fro.visible=tra.visible=showP;arr.forEach(a=>a.visible=showA);const s=(Math.sin(t*1.6)+1)/2;
    const R=u.armR,E=R.userData.elbow;R.rotation.set(0,0,0);E.rotation.set(0,0,0);u.head.rotation.y=0;u.legR.userData.knee.rotation.x=0;foot.rotation.x=0;
    if(mv==='fleksi')E.rotation.x=-s*2.2;if(mv==='abd')R.rotation.z=-s*2.6;if(mv==='bahu')R.rotation.x=-(s*2.6-.7);if(mv==='lutut')u.legR.userData.knee.rotation.x=s*2;if(mv==='rot')u.head.rotation.y=(s-.5)*2.2;
    if(mv==='sup'){E.rotation.x=-1.2;E.rotation.y=-s*PI}if(mv==='dor')foot.rotation.x=(s-.5)*1.2;if(mv==='sirk'){R.rotation.x=Math.sin(t*1.6)*.9;R.rotation.z=-.6+Math.cos(t*1.6)*.6}
    rd.textContent=MV[mv]}}}};

/* ---- kerangka ---- */
SC3.kerangka={m:['osteo','artro','eksup','eksinf'],g:'Osteologi',t:'Kerangka manusia',d:'206 tulang: aksial 80 dan apendikular 126. Gunakan tombol warna untuk membedakan keduanya.',R:3.7,target:[0,3.1,0],
build(K,root,api){K.base(5,4,root);const I=PINF('kerangka');const AX=[],AP=[];const B=()=>K.mat(BONEC,{unique:true,roughness:.65});
  const ax=o=>(AX.push(o),root.add(o),o),ap=o=>(AP.push(o),root.add(o),o);
  const sk=ax(K.sc(K.sph(1,B(),32,24),.36,.4,.44));sk.position.set(0,5.78,-.02);[-1,1].forEach(s=>K.put(K.sph(.08,'#3d3530',12,8),s*.13,-.05,.88,0,0,0,sk));
  const md=K.g();ax(md);md.add(K.tube([[-.25,5.45,-.08],[-.22,5.33,.2],[0,5.28,.32],[.22,5.33,.2],[.25,5.45,-.08]],.05,B(),24));[-1,1].forEach(s=>md.add(seg(K,[s*.25,5.45,-.08],[s*.28,5.62,-.12],.045,B())));
  api.label(sk,'Cranium',I('Cranium'),[0,.45,0]);api.label(md,'Mandibula',I('Mandibula'),[0,5.3,.38]);
  const sp=K.g();ax(sp);let y=5.32;for(let i=0;i<24;i++){const r=i<7?.055:i<19?.07:.09,h=i<7?.07:i<19?.09:.11;const z=i<7?-.12+.05*Math.sin(i/7*PI):i<19?-.12-.12*Math.sin((i-7)/12*PI):-.12+.08*Math.sin((i-19)/5*PI);sp.add(K.put(K.cyl(r,r,h,B(),12),0,y,z));sp.add(K.put(K.box(.04,.05,.14,B()),0,y,z-.12));y-=h+.02}
  const sac=K.put(K.cone(.16,.38,B(),3),0,2.95,-.2,PI,0,0);ax(sac);api.label(sp,'Vertebrae lumbales',I('Vertebrae lumbales'),[.15,3.2,-.2]);api.label(sac,'Os sacrum',I('Os sacrum'),[0,0,.2]);
  const st=K.g();ax(st);st.add(K.put(K.box(.22,.28,.07,B()),0,4.6,.3));st.add(K.put(K.box(.16,.75,.06,B()),0,4.08,.33));st.add(K.put(K.cone(.05,.14,B(),4),0,3.64,.33,PI));api.label(st,'Sternum',I('Sternum'),[0,4.15,.42]);
  const ribs=K.g();ax(ribs);for(let i=0;i<12;i++){const yy=4.7-i*.11,w=.3+.32*Math.sin(Math.min(1,(i+2)/8)*PI/2);[-1,1].forEach(s=>{const pts=[[s*.05,yy,-.26],[s*w*.85,yy+.02,-.2],[s*w,yy-.08,.03],[s*w*.75,yy-.18,.22]];if(i<10)pts.push([s*.1,yy-.24-(i>6?(i-6)*.05:0),.33]);ribs.add(K.tube(pts,.022,B(),20))})}
  api.label(ribs,'Costae',I('Costae'),[.55,4.2,.2]);
  const limb=s=>{const cl=ap(K.tube([[s*.08,4.78,.3],[s*.42,4.83,.25],[s*.74,4.85,0]],.03,B(),16));const scp=ap(K.ext([[0,0],[.42,.05],[.1,-.75]],.03,B()));scp.position.set(s>0?.32:-.32,4.78,-.35);if(s<0)scp.scale.x=-1;
    const hu=K.g();ap(hu);hu.add(K.put(K.sph(.11,B()),s*.8,4.62,0));hu.add(seg(K,[s*.82,4.55,0],[s*.95,3.62,0],.05,B()));hu.add(K.put(K.sc(K.sph(.08,B()),1.6,.8,1),s*.95,3.58,0));
    const ra=ap(seg(K,[s*1.03,3.52,.05],[s*1.13,2.76,.08],.035,B())),ul=ap(seg(K,[s*.9,3.56,-.03],[s*.98,2.73,0],.035,B()));
    const ca=K.g();ap(ca);for(let i=0;i<8;i++)ca.add(K.put(K.sph(.035,B(),8,6),s*(1.0+(i%4)*.045),2.66-Math.floor(i/4)*.07,.02));const hn=K.g();ap(hn);for(let k=0;k<5;k++){const x=s*(.98+k*.045);hn.add(seg(K,[x,2.56,.02],[x+s*.01,2.36,.03],.015,B()));hn.add(seg(K,[x+s*.01,2.33,.03],[x+s*.012,2.15+(k===0?.1:0),.04],.012,B()))}
    const pv=ap(K.ext([[-.05,.45],[.2,.48],[.42,.25],[.35,0],[.25,-.15],[.05,-.28],[0,-.15],[.12,-.05]],.05,B()));pv.position.set(s>0?.05:-.05,2.85,-.02);if(s<0)pv.scale.x=-1;
    const fe=K.g();ap(fe);fe.add(K.put(K.sph(.08,B()),s*.36,2.72,.05));fe.add(seg(K,[s*.36,2.72,.05],[s*.5,2.62,0],.05,B()));fe.add(K.put(K.sph(.07,B()),s*.53,2.62,0));fe.add(seg(K,[s*.5,2.6,0],[s*.36,1.58,.02],.055,B()));[-1,1].forEach(k=>fe.add(K.put(K.sph(.065,B()),s*(.36+k*.05),1.52,0)));
    const pa=ap(K.sc(K.sph(.05,B()),1,1.2,.6));pa.position.set(s*.36,1.55,.09);const ti=ap(seg(K,[s*.34,1.44,0],[s*.32,.24,0],.05,B())),fi=ap(seg(K,[s*.45,1.4,-.02],[s*.44,.22,-.02],.025,B()));
    const ft=K.g();ap(ft);ft.add(K.put(K.box(.14,.12,.24,B()),s*.36,.14,-.02));for(let k=0;k<5;k++)ft.add(seg(K,[s*(.3+k*.03),.1,.08],[s*(.29+k*.04),.05,.32],.014,B()));
    if(s<0){api.label(cl,'Clavicula',I('Clavicula'),[s*.3,.1,0]);api.label(hu,'Humerus',I('Humerus'),[s*.88,4.1,0]);api.label(ra,'Radius',I('Radius'),[s*.08,0,0]);api.label(ul,'Ulna',I('Ulna'),[0,-.1,0]);api.label(ca,'Ossa carpi',I('Ossa carpi'),[s*1.05,2.62,0]);api.label(pv,'Os coxae',I('Os coxae'),[s*.2,.4,0]);api.label(fe,'Femur',I('Femur'),[s*.43,2.1,0]);api.label(pa,'Patella',I('Patella'),[0,0,.05]);api.label(ti,'Tibia',I('Tibia'),[0,0,0]);api.label(fi,'Fibula',I('Fibula'),[0,0,0]);api.label(ft,'Ossa tarsi',I('Ossa tarsi'),[s*.36,.2,0])}
    else api.label(scp,'Scapula','Tulang belikat: spina, acromion, processus coracoideus, cavitas glenoidalis.',[.2,-.2,0])};
  limb(-1);limb(1);
  const paint=(on)=>{AX.forEach(o=>o.traverse(m=>m.isMesh&&m.material.color.set(on?'#e6b35a':BONEC)));AP.forEach(o=>o.traverse(m=>m.isMesh&&m.material.color.set(on?'#7fb0d9':BONEC)))};
  const rd=api.readout();api.buttons('Warna',[['Alami',()=>{paint(false);rd.textContent=''}],['Aksial vs apendikular',()=>{paint(true);rd.innerHTML='<b style="color:#c48a2c">Aksial (80)</b>: tengkorak, vertebra, iga, sternum · <b style="color:#4f86b8">Apendikular (126)</b>: gelang bahu-panggul dan anggota gerak'}]]);
  return{update(){}}}};

/* ---- tengkorak ---- */
SC3.tengkorak={m:['osteo','kepala'],g:'Kepala',t:'Cranium (tulang tengkorak)',d:'Tiap tulang diberi warna berbeda dengan garis sutura. Putar untuk melihat pterion, sutura, dan tulang wajah.',R:2.1,target:[0,1.75,0],
build(K,root,api){K.base(4.4,4,root);K.put(K.cyl(.5,.7,.6,'#ffffff'),0,.3,0,0,0,0,root);const I=PINF('tengkorak');const C=[0,2.15,0],S=[.95,1,1.15],R0=1;
  const sk=K.g();sk.position.set(...C);sk.scale.set(...S);root.add(sk);
  const patch=(c,a0,a1,t0,t1,r=R0)=>{const m=K.mesh(new K.T.SphereGeometry(r,48,32,a0+PI/2,a1-a0,t0,t1-t0),K.mat(c,{unique:true,side:K.T.DoubleSide,roughness:.7}));sk.add(m);return m};
  const fr=patch('#e9d7a8',-1,1,.05,1.5),pa1=patch('#d8c6e8',1,PI,0,1.38),pa2=patch('#d8c6e8',-PI,-1,0,1.38),te1=patch('#bfe0cf',.95,2.4,1.36,2.05),te2=patch('#bfe0cf',-2.4,-.95,1.36,2.05),oc=patch('#f2c4b5',2.35,2*PI-2.35,.55,2.5,1.004),sph1=patch('#f5e08a',.78,1.02,1.3,1.85,1.006),sph2=patch('#f5e08a',-1.02,-.78,1.3,1.85,1.006);
  const surf=(a,th,r=1.01)=>new K.T.Vector3(Math.sin(th)*Math.sin(a)*r*S[0],Math.cos(th)*r*S[1],Math.sin(th)*Math.cos(a)*r*S[2]).add(new K.T.Vector3(...C));
  const line=(pts,c='#6b5a3a')=>{const t=K.tube(pts,.012,c,60);root.add(t);return t};
  const cor=line([...Array(14)].map((_,i)=>surf(1,1.38-i*.1)).concat([...Array(14)].map((_,i)=>surf(-1,i*.1+.04))));const sag=line([...Array(7)].map((_,i)=>surf(PI,i*.09+.001)));const lam=line([...Array(16)].map((_,i)=>{const a=2.35+i*(2*PI-4.7)/15;return surf(a,.55)}));
  const face=K.g();root.add(face);const fy=C[1];
  [-1,1].forEach(s=>{K.put(K.sc(K.sph(.19,'#3d3530',20,14),1,1,.5),s*.38,fy-.2,.98,0,0,0,face);const zy=K.put(K.sc(K.sph(.2,'#f2a65a'),1,.8,.7),s*.62,fy-.48,.78,0,0,0,face);if(s>0)api.label(zy,'Os zygomaticum',I('Os zygomaticum'),[.1,0,.1]);face.add(K.tube([[s*.66,fy-.5,.7],[s*.92,fy-.5,.35],[s*.98,fy-.45,0]],.05,'#f2a65a',12))});
  const mx=K.put(K.rbox(.8,.5,.4,.12,'#8fc0e8'),0,fy-.82,.85,0,0,0,face);api.label(mx,'Maxilla',I('Maxilla'),[.3,0,.1]);const ns=K.put(K.box(.16,.3,.08,'#c9a0dc'),0,fy-.22,1.12,-.3,0,0,face);api.label(ns,'Os nasale',I('Os nasale'),[0,.05,.1]);K.put(K.sc(K.sph(.13,'#3d3530'),1,1.3,.5),0,fy-.55,1.08,0,0,0,face);
  for(let i=0;i<10;i++){const a=-.9+i*.2;K.put(K.box(.07,.1,.06,'#fffaf0'),Math.sin(a)*.42,fy-1.12,.82+Math.cos(a)*.22,0,a,0,face);K.put(K.box(.07,.09,.06,'#fffaf0'),Math.sin(a)*.4,fy-1.24,.8+Math.cos(a)*.2,0,a,0,face)}
  const md=K.g();root.add(md);md.add(K.tube([[-.75,fy-1.15,-.05],[-.6,fy-1.38,.5],[0,fy-1.45,.88],[.6,fy-1.38,.5],[.75,fy-1.15,-.05]],.065,K.mat('#9fd39a',{unique:true}),30));[-1,1].forEach(s=>{md.add(seg(K,[s*.75,fy-1.15,-.05],[s*.8,fy-.62,-.2],.07,K.mat('#9fd39a')));md.add(K.put(K.sph(.1,'#9fd39a'),s*.8,fy-.6,-.22))});api.label(md,'Mandibula',I('Mandibula'),[.4,fy-1.45,.6]);
  const eam=K.put(K.cyl(.09,.09,.05,'#3d3530',16),1.05*S[0]*.93,fy-.38,-.18,0,0,PI/2,root);api.label(eam,'Porus acusticus externus',I('Porus acusticus externus'),[.08,.05,0]);
  const mas=K.put(K.cone(.1,.3,'#bfe0cf',12),.9,fy-.62,-.42,PI,0,0,root);api.label(mas,'Processus mastoideus',I('Processus mastoideus'),[.1,-.1,0]);
  const ptr=K.put(K.sph(.06,K.glow('#ef4444',.6)),...surf(1,1.38,1.02).toArray());root.add(ptr);api.label(ptr,'Pterion',I('Pterion'),[.15,.05,0]);
  api.label(fr,'Os frontale',I('Os frontale'),[0,.4,.9]);api.label(pa1,'Os parietale',I('Os parietale'),[.75,.75,-.3]);api.label(te1,'Os temporale (pars squamosa)',I('Os temporale (pars squamosa)'),[1,-.15,-.3]);api.label(oc,'Os occipitale',I('Os occipitale'),[0,-.1,-1.15]);api.label(sph1,'Ala major ossis sphenoidalis',I('Ala major ossis sphenoidalis'),[.9,-.3,.45]);
  const orb=face.children[0];api.label(orb,'Orbita',I('Orbita'),[0,.1,.1]);const cm=K.put(K.sph(.03,'#6b5a3a'),...surf(1,.6,1.012).toArray());root.add(cm);api.label(cm,'Sutura coronalis',I('Sutura coronalis'),[0,.08,0]);const lm=K.put(K.sph(.03,'#6b5a3a'),...surf(2.6,.55,1.012).toArray());root.add(lm);api.label(lm,'Sutura lambdoidea',I('Sutura lambdoidea'),[0,.08,0]);
  let ex=0,exT=0;const parts=[[fr,0,.35,.25],[pa1,.3,.35,-.1],[pa2,-.3,.35,-.1],[oc,0,.05,-.4],[te1,.4,-.05,0],[te2,-.4,-.05,0],[sph1,.35,0,.3],[sph2,-.35,0,.3]];
  api.buttons('Tampilan',[['Utuh',()=>exT=0],['Tulang dipisah (exploded)',()=>exT=1]]);
  return{update(t,dt){ex+=(exT-ex)*Math.min(1,dt*3);parts.forEach(([m,x,y,z])=>m.position.set(x*ex,y*ex,z*ex));[cor,sag,lam,ptr,cm,lm].forEach(o=>o.visible=ex<.05)}}}};

/* ---- basis cranii ---- */
SC3.basis={m:['kepala','saraf'],g:'Kepala',t:'Basis cranii interna',d:'Dasar tengkorak dilihat dari dalam: tiga fossa bertingkat dan lubang-lubangnya. Tampilkan saraf untuk melihat apa yang lewat di tiap lubang.',R:2.6,target:[0,1.1,0],
build(K,root,api){K.base(5.6,5.6,root);const I=PINF('basis');const g=K.g();g.position.y=1.5;g.rotation.y=PI;root.add(g);
  const bowl=K.mesh(new K.T.SphereGeometry(2.2,48,24,0,2*PI,PI/2,PI/2),K.mat('#e6d6b0',{side:K.T.DoubleSide,roughness:.8}));bowl.scale.set(1,.42,1.18);g.add(bowl);
  const plate=(pts,y,c)=>{const e=K.ext(pts,.12,c);e.rotation.x=PI/2;e.position.y=y;g.add(e);return e};
  const fa=plate([[-1.6,-1.2],[-1.9,-.6],[-1.2,-.2],[-.4,-.35],[0,-.25],[.4,-.35],[1.2,-.2],[1.9,-.6],[1.6,-1.2],[.9,-2.2],[0,-2.4],[-.9,-2.2]],-.35,'#efe3c4');
  const fm=plate([[-1.95,-.55],[-1.2,-.15],[-.45,-.3],[-.3,.3],[-1.0,1.0],[-1.9,.6],[-2.1,0]],-.55,'#e3cfa0');const fm2=plate([[1.95,-.55],[1.2,-.15],[.45,-.3],[.3,.3],[1.0,1.0],[1.9,.6],[2.1,0]],-.55,'#e3cfa0');
  const fp=plate([[-1.0,1.0],[-.3,.3],[.3,.3],[1.0,1.0],[1.9,.65],[1.7,1.6],[.8,2.3],[0,2.45],[-.8,2.3],[-1.7,1.6],[-1.9,.65]],-.82,'#dcc694');
  [-1,1].forEach(s=>{const pr=seg(K,[s*.35,-.5,.35],[s*1.9,-.6,.75],.14,'#d9c38f');g.add(pr)});
  const sel=K.put(K.sc(K.tor(.2,.08,'#cdb47e',PI*1.4),1,1,1),0,-.45,0,PI/2,0,PI*.8,g);const hyp=K.put(K.sph(.15,'#e8a0b4'),0,-.5,0,0,0,0,g);api.label(sel,'Sella turcica',I('Sella turcica'),[0,.15,0]);
  const cg=K.put(K.cone(.07,.35,'#f0e6cc',4),0,-.2,-1.85,0,0,0,g);api.label(cg,'Crista galli',I('Crista galli'),[0,.25,0]);
  const H=(x,z,y,r,sx=1)=>{const h=K.sc(K.cyl(r,r,.14,'#2f2925',18),sx,1,1);h.position.set(x,y-.01,z);g.add(h);return h};
  const holes={};const add=(n,x,z,y,r,sx)=>{const L=H(-x,z,y,r,sx),R=H(x,z,y,r,sx);holes[n]=L;return L};
  [[-.12,-1.6],[-.12,-1.45],[-.12,-1.3],[.12,-1.6],[.12,-1.45],[.12,-1.3]].forEach(([x,z])=>H(x,z,-.35,.04));const lc=K.put(K.box(.4,.02,.55,K.mat('#b9a272',{transparent:true,opacity:.01})),0,-.28,-1.45,0,0,0,g);api.label(lc,'Lamina cribrosa',I('Lamina cribrosa'),[0,.15,0]);
  add('Canalis opticus',.32,-.35,-.35,.07);add('Fissura orbitalis superior',.6,-.2,-.55,.06,3.2);add('Foramen rotundum',.6,.05,-.55,.06);add('Foramen ovale',.75,.3,-.55,.08,1.5);add('Foramen spinosum',.95,.42,-.55,.04);add('Foramen lacerum',.4,.3,-.55,.08);
  add('Meatus acusticus internus',1.0,.82,-.62,.08);add('Foramen jugulare',.95,1.25,-.82,.11,1.6);add('Canalis hypoglossi',.55,1.45,-.82,.06);
  const fmg=K.put(K.sc(K.cyl(.42,.42,.14,'#2f2925',28),1,1,1.2),0,-.83,1.55,0,0,0,g);holes['Foramen magnum']=fmg;
  Object.entries(holes).forEach(([n,h])=>api.label(h,n,I(n),[0,.12,0]));api.label(fa,'Fossa cranii anterior',I('Fossa cranii anterior'),[-1.1,.1,-1.1]);api.label(fm,'Fossa cranii media',I('Fossa cranii media'),[-1.3,.1,.3]);api.label(fp,'Fossa cranii posterior',I('Fossa cranii posterior'),[-1.1,.1,1.6]);
  const nv=K.g();g.add(nv);const N=(x,z,y,c,name,inf)=>{[-1,1].forEach(s=>{const tb=seg(K,[s*x,y,z],[s*x*.7,y+.9,z*.6-.05],.035,K.mat(c,{emissive:c,emissiveIntensity:.3}));nv.add(tb);if(s<0&&name)api.label(tb,name,inf,[0,.5,0])})};
  N(.12,-1.45,-.35,'#e8c440','N. I','Olfactorius.');N(.32,-.35,-.35,'#e8c440','N. II','Opticus.');N(.6,-.2,-.55,'#e8c440','N. III, IV, V1, VI','');N(.6,.05,-.55,'#e8c440','V2','');N(.75,.3,-.55,'#e8c440','V3','');N(.95,.42,-.55,'#c0392b','A. meningea media','');N(1.0,.82,-.62,'#e8c440','N. VII, VIII','');N(.95,1.25,-.82,'#e8c440','N. IX, X, XI','');N(.55,1.45,-.82,'#e8c440','N. XII','');
  const ms=seg(K,[0,-.85,1.55],[0,.3,1.1],.25,K.mat('#f2d36b',{transparent:true,opacity:.8}));nv.add(ms);api.label(ms,'Medulla oblongata','Keluar lewat foramen magnum menjadi medula spinalis.',[0,.6,0]);nv.visible=false;
  api.buttons('Isi lubang',[['Lubang saja',()=>nv.visible=false],['Tampilkan saraf & pembuluh',()=>nv.visible=true]]);
  return{update(){}}}};
