/* ====== ATLAS SVG (bagian 1): tulang ====== */
const BONE='fill="#e8dcc2" stroke="#9b8862" stroke-width="2"',HOLE='fill="var(--sunk)" stroke="#9b8862" stroke-width="2"',DARK='fill="#3d3530" stroke="#9b8862" stroke-width="1.5"';
const bn=(x1,y1,x2,y2,w)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#9b8862" stroke-width="${w}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e8dcc2" stroke-width="${w-4}" stroke-linecap="round"/>`;
const mirror=(s,W)=>s+`<g transform="matrix(-1 0 0 1 ${W} 0)">${s}</g>`;
const lbl=(x,y,t,a='middle')=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="11" font-family="IBM Plex Mono, monospace" fill="#6a5f55">${t}</text>`;

const SKEL=(()=>{let h='';
  for(let i=0;i<10;i++){const y=134+i*11,w=40+Math.min(i,6)*4-(i>6?(i-6)*6:0);h+=`<path d="M146 ${y} C ${146-w} ${y-10} ${146-w-8} ${y+16} ${146-w+6} ${y+24}" fill="none" stroke="#9b8862" stroke-width="5"/><path d="M146 ${y} C ${146-w} ${y-10} ${146-w-8} ${y+16} ${146-w+6} ${y+24}" fill="none" stroke="#e8dcc2" stroke-width="2.5"/>`}
  h+=bn(148,122,98,116,9)+`<path d="M98 112 L76 120 L82 132 L104 126 Z" ${BONE}/>`;
  h+=`<circle cx="92" cy="134" r="11" ${BONE}/>`+bn(90,140,80,250,13)+bn(76,256,64,334,8)+bn(86,256,80,336,8);
  h+=`<rect x="58" y="338" width="28" height="16" rx="5" ${BONE}/>`;for(let k=0;k<5;k++)h+=bn(60+k*6,358,56+k*7,384,4)+bn(56+k*7,388,54+k*7.5,404,3);
  h+=`<path d="M146 312 C 120 312 104 296 100 304 C 92 324 104 346 124 354 L 140 362 L 150 352 Z" ${BONE}/><ellipse cx="132" cy="350" rx="9" ry="7" ${DARK}/>`;
  h+=`<circle cx="126" cy="352" r="9" ${BONE}/>`+bn(124,358,120,460,14)+`<circle cx="110" cy="356" r="7" ${BONE}/><ellipse cx="121" cy="468" rx="9" ry="10" ${BONE}/>`;
  h+=bn(126,482,128,566,12)+bn(110,484,113,564,6)+`<path d="M108 570 L 140 570 L 146 592 L 104 592 Z" ${BONE}/>`;
  return mirror(h,300)+`<ellipse cx="150" cy="54" rx="34" ry="40" ${BONE}/><circle cx="137" cy="52" r="7" ${DARK}/><circle cx="163" cy="52" r="7" ${DARK}/><path d="M146 64 L150 74 L154 64 Z" ${DARK}/><path d="M124 78 Q150 116 176 78 L170 92 Q150 106 130 92 Z" ${BONE}/>
  <rect x="144" y="100" width="12" height="20" rx="3" ${BONE}/><rect x="141" y="124" width="18" height="18" rx="3" ${BONE}/><rect x="143" y="142" width="14" height="54" rx="4" ${BONE}/><path d="M145 196 L155 196 L150 210 Z" ${BONE}/>
  ${[0,1,2,3,4].map(k=>`<rect x="143" y="${252+k*12}" width="14" height="10" rx="3" ${BONE}/>`).join('')}<path d="M136 312 L164 312 L156 350 L144 350 Z" ${BONE}/>`})();

const TENG=`<path d="M92 152 C 80 80 150 30 230 32 C 312 34 366 96 352 176 C 348 206 330 222 300 226 L 252 226 L 190 206 L 118 200 Z" ${BONE}/>
<path d="M92 152 L 80 186 L 92 196 L 86 214 L 110 246 L 170 240 L 192 206 L 118 200 Z" ${BONE}/>
<path d="M140 190 Q 180 180 238 196" fill="none" stroke="#9b8862" stroke-width="9"/><path d="M140 190 Q 180 180 238 196" fill="none" stroke="#e8dcc2" stroke-width="6"/>
<path d="M96 250 L 108 288 Q 170 304 222 278 L 238 214 L 246 210 L 226 206 L 216 250 L 196 232 L 200 264 Q 150 280 112 262 Z" ${BONE}/>
<circle cx="118" cy="150" r="24" ${DARK}/><circle cx="250" cy="204" r="9" ${DARK}/><path d="M262 220 Q 274 248 284 226 Z" ${BONE}/>
<path d="M176 40 Q 168 110 186 168" fill="none" stroke="#9b8862" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M186 168 Q 236 128 292 178" fill="none" stroke="#9b8862" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M300 58 Q 318 120 336 196" fill="none" stroke="#9b8862" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M150 176 Q 160 158 186 168 L 190 204" fill="none" stroke="#9b8862" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M98 150 L 86 184" stroke="#9b8862" stroke-width="2"/>${[112,128,144,160].map(x=>`<rect x="${x}" y="238" width="10" height="12" rx="2" fill="#fff8e8" stroke="#9b8862"/>`).join('')}${[124,140,156,172].map(x=>`<rect x="${x}" y="262" width="10" height="11" rx="2" fill="#fff8e8" stroke="#9b8862"/>`).join('')}`;

const BASIS=(()=>{let h=`<path d="M60 152 Q 130 118 186 150 M214 150 Q 270 118 340 152" fill="none" stroke="#9b8862" stroke-width="5"/>
<path d="M190 196 L 74 292 M210 196 L 326 292" stroke="#9b8862" stroke-width="7" stroke-linecap="round"/>`;
  let s=`<rect x="178" y="84" width="6" height="22" rx="3" ${DARK}/><circle cx="178" cy="160" r="5" ${DARK}/><path d="M168 168 Q 150 172 132 184" stroke="#3d3530" stroke-width="6" stroke-linecap="round" fill="none"/>
  <circle cx="150" cy="198" r="4.5" ${DARK}/><ellipse cx="148" cy="224" rx="8" ry="5" ${DARK}/><circle cx="135" cy="238" r="3" ${DARK}/><path d="M172 228 L 184 226 L 186 238 L 174 240 Z" ${DARK}/>
  <ellipse cx="118" cy="282" rx="6" ry="5" ${DARK}/><ellipse cx="132" cy="314" rx="10" ry="6" transform="rotate(30 132 314)" ${DARK}/><circle cx="164" cy="328" r="4" ${DARK}/>`;
  return `<ellipse cx="200" cy="214" rx="172" ry="196" ${BONE}/>`+h+mirror(s,400)+`<path d="M196 56 L 204 56 L 202 96 L 198 96 Z" fill="#d8cba8" stroke="#9b8862"/><rect x="186" y="178" width="28" height="24" rx="7" fill="#d8cba8" stroke="#9b8862" stroke-width="2"/><ellipse cx="200" cy="334" rx="28" ry="34" ${DARK}/>`+lbl(200,24,'ANTERIOR')+lbl(200,410,'POSTERIOR')})();

const LENGAN=(()=>{let h=`<path d="M70 52 L 150 72 L 122 176 Z" fill="#efe5cf" stroke="#9b8862" stroke-width="1.5"/>`+bn(156,44,74,54,10)+`<path d="M74 48 L 54 56 L 60 70 L 80 62 Z" ${BONE}/><path d="M96 74 L 110 70 L 112 82 Z" ${BONE}/>
<circle cx="82" cy="82" r="18" ${BONE}/><circle cx="64" cy="84" r="9" ${BONE}/>`+bn(84,96,94,298,18)+`<path d="M66 296 Q 94 314 126 296 L 120 318 Q 94 330 72 318 Z" ${BONE}/>`+bn(80,326,64,470,10)+bn(108,322,106,476,10)+`<path d="M56 470 L 52 484 L 64 476 Z" ${BONE}/>`;
  [[62,490],[78,490],[94,490],[108,484]].forEach(([x,y])=>h+=`<rect x="${x-7}" y="${y-7}" width="14" height="14" rx="4" ${BONE}/>`);[[56,508],[70,510],[86,510],[102,508]].forEach(([x,y])=>h+=`<rect x="${x-7}" y="${y-7}" width="14" height="14" rx="4" ${BONE}/>`);
  h+=bn(52,520,36,556,6)+bn(36,560,30,586,5);[70,84,98,110].forEach((x,k)=>{h+=bn(x,520,x+k*2-2,572,6)+bn(x+k*2-2,578,x+k*3-3,614-(k===3?10:0),4)});
  return h})();

const TUNGKAI=(()=>{let h=`<path d="M58 22 Q 34 70 70 112 L 98 122 L 130 112 Q 170 80 152 24 Q 104 2 58 22 Z" ${BONE}/><path d="M130 116 L 196 130 L 196 152 L 140 150 Z" ${BONE}/><path d="M104 140 L 128 196 L 112 210 L 96 160 Z" ${BONE}/><ellipse cx="150" cy="168" rx="16" ry="12" ${DARK}/>
<circle cx="110" cy="128" r="22" ${DARK}/><circle cx="110" cy="128" r="16" ${BONE}/>`+bn(108,132,82,154,14)+`<ellipse cx="66" cy="156" rx="14" ry="18" ${BONE}/><ellipse cx="108" cy="180" rx="7" ry="8" ${BONE}/>`+bn(78,156,100,384,20)+`<ellipse cx="86" cy="400" rx="16" ry="12" ${BONE}/><ellipse cx="118" cy="400" rx="16" ry="12" ${BONE}/><ellipse cx="102" cy="384" rx="12" ry="14" fill="#f4ead6" stroke="#9b8862" stroke-width="2"/>
<path d="M78 416 L 132 416 L 124 438 L 86 438 Z" ${BONE}/>`+bn(108,434,112,600,18)+`<circle cx="72" cy="430" r="9" ${BONE}/>`+bn(73,440,78,600,8)+`<ellipse cx="123" cy="608" rx="8" ry="10" ${BONE}/><ellipse cx="76" cy="612" rx="7" ry="11" ${BONE}/><ellipse cx="104" cy="434" rx="7" ry="5" fill="#d8cba8"/>
<ellipse cx="100" cy="622" rx="18" ry="11" ${BONE}/><path d="M80 634 L 128 634 L 132 652 L 76 652 Z" ${BONE}/>`;
  [0,1,2,3,4].forEach(k=>{const x=80+k*12;h+=bn(x,656,x-4+k,688,6)});return h})();

const PELVIS=(()=>{let s=`<path d="M176 88 C 130 40 66 36 42 70 C 30 106 56 150 92 178 L 112 200 L 150 214 L 176 160 Z" ${BONE}/><circle cx="106" cy="206" r="24" ${BONE}/><circle cx="106" cy="206" r="14" ${DARK}/>
<path d="M120 222 L 196 226 L 196 252 L 150 266 L 124 282 L 112 260 Z" ${BONE}/><ellipse cx="152" cy="244" rx="20" ry="13" ${DARK}/><ellipse cx="128" cy="276" rx="12" ry="9" ${BONE}/>
<path d="M200 82 Q 124 108 118 188 Q 136 230 196 226" fill="none" stroke="#c0392b" stroke-width="2" stroke-dasharray="5 4"/>`;
  return mirror(s,400)+`<path d="M166 76 L 234 76 L 214 188 L 200 196 L 186 188 Z" ${BONE}/><path d="M194 198 L 206 198 L 202 214 L 198 214 Z" ${BONE}/>${[100,124,148,170].map(y=>`<circle cx="190" cy="${y}" r="3.5" ${DARK}/><circle cx="210" cy="${y}" r="3.5" ${DARK}/>`).join('')}<rect x="194" y="224" width="12" height="30" rx="3" fill="#d8cba8" stroke="#9b8862" stroke-width="1.5"/>`})();
