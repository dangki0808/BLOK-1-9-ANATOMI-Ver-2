# Anatomi Lab Blok 1–9

Media belajar anatomi interaktif (FKIK Universitas Mataram), disusun dari slide kuliah anatomi di folder Drive.

## Cara membuka
Buka `index.html` di browser (Chrome, Edge, Firefox, Safari). Tidak perlu instalasi atau internet. Model 3D butuh browser yang mendukung WebGL (hampir semua HP dan laptop sekarang).

## Isi
- **Model 3D** (17 model yang bisa diputar 360°, di-zoom, digeser; sudut isometrik/depan/samping/atas; label; ketuk bagian untuk penjelasan; layar penuh): posisi anatomi-bidang-gerakan, kerangka, cranium (bisa dipisah per tulang), basis cranii (dengan saraf yang lewat), vertebra & penampang leher, permukaan thorax-abdomen, jantung (aliran darah, belah katup, sistem konduksi), saluran napas & paru (bernapas), organ abdomen (foregut/midgut/hindgut, arteri, jalan makanan), ginjal (belah, utuh, aliran urin), otak (lobus, area fungsional, belah sagital), ekstremitas superior & inferior (saraf, otot, gerakan), pelvis wanita vs pria, organ reproduksi (fertilisasi-implantasi, jalan sperma), perkembangan embrio, rotasi midgut. Muncul di menu Model 3D, di tab Model 3D tiap modul, dan di atas tiap atlas lab.
- **Modul** (20 topik per blok): kasus pembuka, jembatan dasar, materi inti, poin ujian, jebakan, jembatan keledai, model 3D, atlas 2D, permainan, kuis.
- **Lab Virtual**: 15 atlas 2D (250 penanda; mode Belajar, Tunjukkan, Sebutkan) + permainan Urutkan, Pasangkan, Istilah arah & gerakan.
- **Latihan**: 231 soal pilihan ganda dengan pembahasan.
- **Glosarium**: 129 istilah dengan kartu hafalan.
- **Spot Tentamen**: ujian praktikum gaya OSPE berwaktu.
- **CBT**: try out 100 soal, paket kasus, paket per blok, paket sendiri.
- **Kasus Klinis**: 6 kasus anatomi klinis (Tutorial 7 Jump, simulasi klinis, roleplay AI).

## Catatan
- Pembagian Blok 1, 4, 5, 6, 8 adalah perkiraan; yang pasti: Blok 2 (miologi), 3 (kepala-leher), 7 (ekstremitas superior), 9 (embriologi).
- Materi miologi (pptx) tidak terbaca; modulnya disusun dari rujukan anatomi standar.
- Koreksi terhadap slide: costae spuriae VIII–X (bukan VI–X); os ethmoidale dihitung di neurocranium.
- Model 3D dan atlas bersifat skematik (bentuk disederhanakan), bukan pengganti spesimen.
- Roleplay AI hanya berfungsi saat dibuka sebagai artefak di claude.ai.
- Progres tersimpan di browser masing-masing.
- `lib/` berisi three.js r147 (sudah tergabung di `index.html`).

## Menyusun ulang dari sumber
`sh src/build.sh` menghasilkan `src/index.html` (memuat three.js dari CDN).
