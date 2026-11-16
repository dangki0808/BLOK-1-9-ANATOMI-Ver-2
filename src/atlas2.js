/* ====== ATLAS SVG (bagian 2): organ ====== */
const C_ART='#c0392b',C_VEN='#3a5ea8',C_NRV='#e0b83a';
const JANTUNG=`<path d="M210 176 C 196 120 206 62 236 58 C 262 54 276 78 278 110 L 280 168" fill="none" stroke="${C_ART}" stroke-width="26"/>
<path d="M196 70 L 182 18 M220 60 L 220 14 M246 64 L 262 20" stroke="${C_ART}" stroke-width="11" stroke-linecap="round"/>
<rect x="148" y="34" width="26" height="130" rx="8" fill="${C_VEN}"/><rect x="138" y="252" width="26" height="70" rx="8" fill="${C_VEN}"/>
<path d="M236 214 C 238 170 236 140 254 118 M254 118 L 300 106 M254 118 L 214 112" fill="none" stroke="#5d7fc4" stroke-width="24" stroke-linecap="round"/>
<ellipse cx="148" cy="206" rx="40" ry="56" fill="#b86262" stroke="#7d3434" stroke-width="2"/><path d="M152 160 Q 174 140 190 160 Q 182 178 164 180 Z" fill="#b86262" stroke="#7d3434" stroke-width="2"/>
<path d="M290 190 Q 316 182 318 206 Q 304 214 292 206 Z" fill="#b86262" stroke="#7d3434" stroke-width="2"/>
<path d="M254 228 Q 330 220 326 296 Q 314 344 262 356 Q 276 300 254 228 Z" fill="#c97b7b" stroke="#7d3434" stroke-width="2"/>
<path d="M170 226 Q 214 204 256 228 Q 276 300 262 356 Q 196 344 170 290 Z" fill="#d58c8c" stroke="#7d3434" stroke-width="2"/>
<path d="M176 214 Q 158 280 206 340 Q 232 352 262 356" fill="none" stroke="#8e1b1b" stroke-width="4"/>
<path d="M252 214 Q 258 228 256 260 Q 262 310 262 352" fill="none" stroke="#8e1b1b" stroke-width="4"/><path d="M256 214 Q 290 210 318 232" fill="none" stroke="#8e1b1b" stroke-width="4"/>`;

const PERM=`<path d="M60 70 Q 160 40 260 70 L 282 110 L 270 220 Q 262 300 280 380 L 270 450 L 50 450 L 40 380 Q 58 300 50 220 L 38 110 Z" fill="#f1d7c8" stroke="#b8927e" stroke-width="2"/>
<path d="M150 86 Q 110 76 72 84 M170 86 Q 210 76 248 84" stroke="#b8927e" stroke-width="5" fill="none" stroke-linecap="round"/>
<rect x="150" y="90" width="20" height="112" rx="6" fill="#ead2b8" stroke="#b8927e"/><line x1="150" y1="106" x2="170" y2="106" stroke="#b8927e" stroke-width="2"/>
${[0,1,2,3,4,5].map(k=>`<path d="M150 ${118+k*18} Q 100 ${110+k*18} 64 ${130+k*20}" fill="none" stroke="#d6b29c" stroke-width="2"/><path d="M170 ${118+k*18} Q 220 ${110+k*18} 256 ${130+k*20}" fill="none" stroke="#d6b29c" stroke-width="2"/>`).join('')}
<path d="M150 204 Q 110 230 64 250 M170 204 Q 210 230 256 250" stroke="#b8927e" stroke-width="3" fill="none"/>
<circle cx="100" cy="176" r="5" fill="#c99282"/><circle cx="220" cy="176" r="5" fill="#c99282"/><circle cx="160" cy="300" r="5" fill="#b8927e"/>
<path d="M106 70 L 106 450 M214 70 L 214 450 M40 252 L 282 252 M40 334 L 282 334" stroke="#7a5f9a" stroke-width="1.5" stroke-dasharray="6 5" opacity=".7"/>
<circle cx="84" cy="346" r="4" fill="#b8927e"/><line x1="84" y1="346" x2="160" y2="300" stroke="#b8927e" stroke-dasharray="3 3"/>`;

const NAPAS=`<path d="M182 118 C 120 120 70 220 70 380 Q 120 414 184 392 Q 170 260 182 118 Z" fill="#eab3b3" stroke="#a65d5d" stroke-width="2"/>
<path d="M218 118 C 280 120 332 220 332 380 Q 282 414 224 392 L 236 344 Q 210 320 222 290 Z" fill="#eab3b3" stroke="#a65d5d" stroke-width="2"/>
<path d="M178 262 L 76 250 M174 196 Q 140 300 92 392" stroke="#a65d5d" stroke-width="2" fill="none"/><path d="M226 188 Q 266 290 312 392" stroke="#a65d5d" stroke-width="2" fill="none"/>
<path d="M196 218 L 150 262 M204 218 L 262 250" stroke="#9fb3c6" stroke-width="14" stroke-linecap="round"/><path d="M150 262 L 120 300 M150 262 L 126 220 M262 250 L 290 214 M262 250 L 290 300" stroke="#9fb3c6" stroke-width="7" stroke-linecap="round"/>
${Array.from({length:9},(_,k)=>`<rect x="186" y="${122+k*10}" width="28" height="7" rx="3" fill="#dfe7ee" stroke="#8aa3b8"/>`).join('')}
<path d="M194 210 L 206 210 L 200 222 Z" fill="#8aa3b8"/><rect x="182" y="102" width="36" height="16" rx="5" fill="#dfe7ee" stroke="#8aa3b8" stroke-width="2"/>
<path d="M166 48 L 234 48 L 228 84 L 200 100 L 172 84 Z" fill="#dfe7ee" stroke="#8aa3b8" stroke-width="2"/><path d="M194 48 L 200 58 L 206 48" fill="none" stroke="#8aa3b8" stroke-width="2"/>
<path d="M200 46 Q 184 22 200 10 Q 216 22 200 46 Z" fill="#e6d38a" stroke="#a89040" stroke-width="1.5"/>`;

const ABD=`<path d="M40 74 Q 38 40 120 40 L 262 58 Q 232 92 182 112 L 122 150 Q 60 162 40 122 Z" fill="#9c4a3c" stroke="#5e2a21" stroke-width="2"/><path d="M200 62 Q 192 84 186 108" stroke="#e7c3b9" stroke-width="2.5" fill="none"/>
<rect x="228" y="16" width="16" height="56" rx="7" fill="#d9a3a3" stroke="#93565a"/>
<path d="M300 176 Q 330 150 312 214 L 300 214 Z" fill="none"/>
<path d="M150 198 Q 220 196 300 178 Q 336 172 334 188 Q 300 214 230 224 Q 180 246 160 236 Z" fill="#e9c27a" stroke="#a5813d" stroke-width="2"/>
<path d="M194 194 Q 150 194 142 214 Q 134 254 168 266 Q 206 272 232 254" fill="none" stroke="#e6a96a" stroke-width="18" stroke-linecap="round"/>
<path d="M240 64 Q 302 48 320 92 Q 332 152 292 190 Q 250 214 206 200 L 190 196 L 194 178 Q 232 186 258 160 Q 280 120 240 100 Z" fill="#d98c8c" stroke="#93565a" stroke-width="2"/>
<ellipse cx="350" cy="120" rx="18" ry="34" transform="rotate(18 350 120)" fill="#7a3550" stroke="#4a1f31" stroke-width="2"/>
<ellipse cx="130" cy="148" rx="11" ry="16" transform="rotate(-25 130 148)" fill="#6f9a4a" stroke="#41602a" stroke-width="2"/>
<path d="M126 318 q 20 -26 40 0 t 40 0 t 40 0 t 30 0 M126 346 q 20 -26 40 0 t 40 0 t 40 0 t 30 0 M134 376 q 20 -24 40 0 t 40 0 t 40 0" fill="none" stroke="#e39b9b" stroke-width="13" stroke-linecap="round"/>
<path d="M86 366 L 86 236 Q 88 214 110 218 Q 200 300 300 220 Q 322 214 322 240 L 326 362 Q 318 410 250 396 Q 214 392 204 404 L 202 448" fill="none" stroke="#b58a52" stroke-width="22" stroke-linejoin="round"/>
<path d="M86 366 L 86 236 Q 88 214 110 218 Q 200 300 300 220 Q 322 214 322 240 L 326 362 Q 318 410 250 396 Q 214 392 204 404 L 202 448" fill="none" stroke="#d7b07a" stroke-width="16" stroke-dasharray="14 3" stroke-linejoin="round"/>
<circle cx="88" cy="370" r="20" fill="#d7b07a" stroke="#b58a52" stroke-width="2"/><path d="M80 386 Q 66 400 60 416" stroke="#b58a52" stroke-width="8" stroke-linecap="round" fill="none"/>`;

const GINJAL=(()=>{const pyr=[[215,70,262,64,222,128],[278,82,302,130,236,152],[306,166,306,216,242,200],[300,246,274,296,234,240],[254,312,206,322,214,262]];
  return `<path d="M178 12 L 250 16 L 222 52 L 186 48 Z" fill="#d9a441" stroke="#9a6f1f" stroke-width="2"/>
<path d="M200 44 C 300 40 332 150 322 204 C 312 300 262 348 204 342 C 160 338 142 300 166 262 Q 184 232 172 192 Q 152 152 166 112 C 152 72 168 46 200 44 Z" fill="#b65c52" stroke="#6e2f29" stroke-width="2.5"/>
${pyr.map(p=>`<path d="M${p[0]} ${p[1]} L ${p[2]} ${p[3]} L ${p[4]} ${p[5]} Z" fill="#7f3532" stroke="#5a2321" stroke-width="1"/>`).join('')}
<path d="M174 118 Q 226 108 232 150 L 240 200 L 228 256 Q 202 282 176 258 Q 188 230 178 192 Q 164 152 174 118 Z" fill="#f3e1b0" stroke="#c9a85a" stroke-width="1.5"/>
${pyr.map(p=>`<circle cx="${p[4]-6}" cy="${p[5]}" r="9" fill="#efd27a" stroke="#b8952f" stroke-width="1.5"/>`).join('')}
<path d="M208 128 Q 196 170 196 196 Q 196 230 206 258 M196 196 L 228 200" stroke="#efd27a" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M196 196 Q 176 224 168 244 Q 160 270 156 300 L 150 378" stroke="#efd27a" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M156 300 L 150 378" stroke="#b8952f" stroke-width="2" fill="none"/>
<path d="M40 180 L 182 186" stroke="${C_ART}" stroke-width="11" stroke-linecap="round"/><path d="M40 210 L 180 212" stroke="${C_VEN}" stroke-width="13" stroke-linecap="round"/>`})();

const OTAK=`<defs><clipPath id="brainclip"><path d="M60 170 C 50 90 130 30 220 32 C 320 34 382 90 374 170 C 370 210 342 228 302 226 L 250 222 C 230 250 180 262 140 248 C 95 236 66 214 60 170 Z"/></clipPath></defs>
<ellipse cx="322" cy="252" rx="56" ry="34" fill="#d9a08f" stroke="#8a5446" stroke-width="2"/>${[0,1,2,3].map(k=>`<path d="M${276+k*6} ${236+k*8} Q 322 ${226+k*10} ${370-k*6} ${240+k*8}" fill="none" stroke="#8a5446" stroke-width="1"/>`).join('')}
<path d="M238 222 Q 270 224 268 250 Q 266 276 240 274 Q 226 262 230 238 Z" fill="#e2b3a4" stroke="#8a5446" stroke-width="2"/><path d="M240 272 L 264 270 L 262 316 L 246 316 Z" fill="#e2b3a4" stroke="#8a5446" stroke-width="2"/>
<g clip-path="url(#brainclip)"><path d="M0 0 L 210 0 L 188 152 L 150 182 L 100 262 L 0 320 Z" fill="#e7b2a5"/><path d="M210 0 L 318 0 L 302 130 L 188 152 Z" fill="#e3c79a"/><path d="M318 0 L 420 0 L 420 320 L 312 216 L 302 130 Z" fill="#b8c79a"/><path d="M150 182 L 188 152 L 302 130 L 312 216 L 250 262 L 100 262 Z" fill="#a9bfd6"/></g>
<path d="M60 170 C 50 90 130 30 220 32 C 320 34 382 90 374 170 C 370 210 342 228 302 226 L 250 222 C 230 250 180 262 140 248 C 95 236 66 214 60 170 Z" fill="none" stroke="#8a5446" stroke-width="2.5"/>
<path d="M212 34 Q 196 92 188 152" stroke="#5d2f26" stroke-width="3.5" fill="none"/><path d="M182 36 Q 166 96 160 156" stroke="#8a5446" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/><path d="M244 38 Q 226 96 216 148" stroke="#8a5446" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>
<path d="M140 186 Q 220 162 302 132" stroke="#5d2f26" stroke-width="3.5" fill="none"/>
<ellipse cx="128" cy="174" rx="18" ry="11" fill="#c25e4f" opacity=".55"/><ellipse cx="288" cy="160" rx="20" ry="12" fill="#3f6fa8" opacity=".5"/>`;

const REPF=(()=>{const s=`<path d="M60 92 Q 30 150 70 200 L 176 214 L 176 90 Z" fill="#c6a3c8" opacity=".35"/>
<path d="M176 84 Q 148 72 118 78" fill="none" stroke="#c97b8e" stroke-width="7" stroke-linecap="round"/><path d="M118 78 Q 84 86 62 82" fill="none" stroke="#c97b8e" stroke-width="13" stroke-linecap="round"/>
<path d="M62 82 Q 40 82 34 98 M36 90 L 26 100 M40 94 L 34 110 M46 92 L 48 110" fill="none" stroke="#c97b8e" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="90" cy="130" rx="25" ry="14" fill="#e9d0a6" stroke="#a88a52" stroke-width="2"/><path d="M114 130 L 172 112" stroke="#a88a52" stroke-width="4" stroke-linecap="round"/>`;
  return mirror(s,420)+`<path d="M170 70 Q 210 48 250 70 Q 264 140 236 192 L 230 226 L 190 226 L 184 192 Q 156 140 170 70 Z" fill="#d98c8c" stroke="#8f4b4b" stroke-width="2.5"/>
<path d="M186 86 L 234 86 L 210 156 Z" fill="#f2c4c4" stroke="#8f4b4b"/><path d="M206 160 L 214 160 L 214 222 L 206 222 Z" fill="#f2c4c4"/>
<path d="M190 226 L 230 226 L 236 292 L 184 292 Z" fill="#e6a5a5" stroke="#8f4b4b" stroke-width="2"/>`})();

const REPM=`<path d="M300 20 Q 270 60 244 98" stroke="#d9b23a" stroke-width="6" fill="none" stroke-linecap="round"/>
<circle cx="200" cy="92" r="52" fill="#e6c36a" stroke="#a5852c" stroke-width="2.5"/>
<ellipse cx="260" cy="134" rx="14" ry="30" transform="rotate(-30 260 134)" fill="#d9b38c" stroke="#9a7650" stroke-width="2"/>

<ellipse cx="204" cy="168" rx="30" ry="22" fill="#c48a6a" stroke="#8a5a3e" stroke-width="2"/>
<ellipse cx="132" cy="184" rx="12" ry="24" fill="#e8dcc2" stroke="#9b8862" stroke-width="2"/>
<path d="M176 222 Q 140 230 60 236 Q 36 244 40 258 Q 44 270 64 266 Q 140 264 186 242 Z" fill="#e7b2a0" stroke="#9a6650" stroke-width="2"/>
<path d="M176 226 Q 130 232 66 240" stroke="#c9826b" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M182 240 Q 130 256 64 258" stroke="#d99a86" stroke-width="8" fill="none"/>
<path d="M200 144 L 202 210 Q 196 238 160 250 L 46 256" stroke="#fff3e6" stroke-width="3" fill="none"/>
<path d="M60 238 Q 30 250 54 268 Q 70 262 66 246 Z" fill="#d98c8c" stroke="#9a6650" stroke-width="2"/>
<circle cx="206" cy="318" r="44" fill="#f1d7c8" stroke="#b8927e" stroke-width="2" opacity=".7"/>
<ellipse cx="200" cy="322" rx="22" ry="28" fill="#e8d5c0" stroke="#9a7a5a" stroke-width="2"/><path d="M218 292 Q 240 306 226 346" stroke="#b08860" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M222 296 C 120 270 90 160 120 100 C 150 40 262 40 270 104 L 246 150 L 222 166" fill="none" stroke="#8c6d4a" stroke-width="5" stroke-linecap="round" opacity=".9"/>`;
