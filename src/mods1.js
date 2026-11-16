/* ====== MODUL ANATOMI (bagian 1) ====== */
const BLOKS=[
  {b:1,n:'Blok 1',t:'Pengantar & terminologi',sure:false},
  {b:2,n:'Blok 2',t:'Muskuloskeletal dasar',sure:true},
  {b:3,n:'Blok 3',t:'Kepala, leher & neuro dasar',sure:true},
  {b:4,n:'Blok 4',t:'Kardiorespirasi & dinding thorax',sure:false},
  {b:5,n:'Blok 5',t:'Gastrointestinal',sure:false},
  {b:6,n:'Blok 6',t:'Urinaria & limfoid',sure:false},
  {b:7,n:'Blok 7',t:'Ekstremitas',sure:true},
  {b:8,n:'Blok 8',t:'Neuroanatomi',sure:false},
  {b:9,n:'Blok 9',t:'Reproduksi & embriologi',sure:true}];

const MODS=[
{id:'term',no:1,blok:1,t:'Terminologi anatomi',d:'Akar kata Latin-Yunani, posisi anatomi, bidang, arah, dan gerakan.',src:'Medical Terminology (Anatomy) · dr. Ida Lestari Harahap',
 story:['Satu kata, tiga informasi','Dokter jaga menulis "fraktur 1/3 distal os radius sinistra". Tanpa melihat foto, dokter lain langsung tahu: tulang mana, sisi mana, dan bagian mana yang patah. Terminologi anatomi adalah bahasa bersama yang membuat deskripsi itu tidak mungkin salah tafsir.'],
 obj:['Memecah istilah medis menjadi awalan, akar, dan akhiran','Menjelaskan posisi anatomi dan tiga bidang tubuh','Memakai pasangan istilah arah dengan benar','Menamai gerakan sendi utama'],
 bridge:['Di biologi SMA kamu memakai nama ilmiah dua kata (<i>Homo sapiens</i>). Anatomi memakai prinsip yang sama: kata Latin yang pasti dan tidak berubah antarnegara, disebut <b>Terminologia Anatomica</b>.','Istilah medis bisa dibongkar seperti rumus: <b>awalan + akar + akhiran</b>. Contoh: <i>peri-card-itis</i> = sekitar + jantung + radang = radang selaput pembungkus jantung.'],
 core:`<h4>Struktur istilah medis</h4>
<table class="tbl"><tr><th>Bagian</th><th>Contoh</th><th>Arti</th></tr>
<tr><td>Awalan (prefix)</td><td>hipo-, hiper-, brady-, tachy-, endo-, peri-, sub-, supra-, inter-, intra-</td><td>kurang, lebih, lambat, cepat, di dalam, sekitar, di bawah, di atas, di antara, di dalam</td></tr>
<tr><td>Akar (root)</td><td>cardi-, hepat-, nephr-/ren-, gastr-, oste-, my-, neur-, pneum-, derm-, hem-/haem-</td><td>jantung, hati, ginjal, lambung, tulang, otot, saraf, paru/udara, kulit, darah</td></tr>
<tr><td>Akhiran (suffix)</td><td>-itis, -ectomy, -otomy, -ostomy, -algia, -logy, -megaly, -penia, -emia, -osis</td><td>radang, pengangkatan, sayatan, membuat lubang, nyeri, ilmu, pembesaran, kekurangan, dalam darah, keadaan</td></tr></table>
<p>Warna: <i>rubra/erythro-</i> merah, <i>alba/leuko-</i> putih, <i>flava/xantho-</i> kuning, <i>nigra/melano-</i> hitam, <i>cyano-</i> biru. Ukuran: <i>major/minor</i>, <i>longus/brevis</i>, <i>magnus</i>. Bilangan: <i>uni-, bi-, tri-, quadri-</i>. Prognosis ditulis <i>ad bonam</i> (baik), <i>dubia</i> (ragu), <i>ad malam</i> (buruk).</p>
<h4>Posisi anatomi</h4>
<p>Berdiri tegak, wajah dan pandangan ke depan, lengan di samping tubuh dengan <b>telapak tangan menghadap ke depan</b>, kaki rapat dan jari kaki ke depan. Semua istilah arah selalu dihitung dari posisi ini, apa pun posisi pasien sebenarnya.</p>
<h4>Bidang tubuh</h4>
<ul><li><b>Sagital (median)</b>: membagi kanan-kiri; bidang median tepat di tengah, parasagital di sampingnya.</li>
<li><b>Frontal (koronal)</b>: membagi depan-belakang.</li>
<li><b>Transversal (horizontal, aksial)</b>: membagi atas-bawah; potongan CT scan.</li></ul>
<h4>Istilah arah</h4>
<table class="tbl"><tr><th>Pasangan</th><th>Makna</th><th>Contoh</th></tr>
<tr><td>Superior / inferior (kranial / kaudal)</td><td>ke kepala / ke kaki</td><td>Hidung superior terhadap mulut</td></tr>
<tr><td>Anterior / posterior (ventral / dorsal)</td><td>depan / belakang</td><td>Sternum anterior terhadap jantung</td></tr>
<tr><td>Medial / lateral</td><td>mendekati / menjauhi bidang median</td><td>Ibu jari lateral terhadap kelingking</td></tr>
<tr><td>Proksimal / distal</td><td>dekat / jauh dari pangkal anggota gerak</td><td>Siku proksimal terhadap pergelangan</td></tr>
<tr><td>Superfisial / profunda</td><td>dekat / jauh dari permukaan</td><td>Kulit superfisial terhadap otot</td></tr>
<tr><td>Ipsilateral / kontralateral</td><td>sisi sama / sisi berlawanan</td><td>Hemiparesis kontralateral pada stroke</td></tr>
<tr><td>Palmar, plantar, dorsum</td><td>telapak tangan, telapak kaki, punggung</td><td>Dorsum pedis</td></tr></table>
<h4>Gerakan</h4>
<ul><li><b>Fleksi / ekstensi</b>: mengecilkan / membesarkan sudut sendi (bidang sagital).</li>
<li><b>Abduksi / adduksi</b>: menjauhi / mendekati garis tengah (bidang frontal). Untuk jari tangan, patokannya jari tengah; untuk jari kaki, jari kedua.</li>
<li><b>Rotasi medial / lateral</b> dan <b>sirkumduksi</b> (gabungan berbentuk kerucut).</li>
<li><b>Supinasi / pronasi</b>: telapak menghadap ke depan-atas / ke belakang-bawah (sendi radioulnar).</li>
<li><b>Dorsofleksi / plantarfleksi</b>: punggung kaki diangkat / menjinjit.</li>
<li><b>Inversi / eversi</b>: telapak kaki menghadap ke medial / lateral.</li>
<li>Elevasi/depresi, protraksi/retraksi (bahu, mandibula), oposisi ibu jari.</li></ul>`,
 high:['Posisi anatomi: telapak tangan menghadap ke depan','Pasangan proksimal-distal hanya untuk anggota gerak (dan saluran)','Supinasi-pronasi terjadi di sendi radioulnar, bukan sendi bahu','Bidang transversal = potongan CT aksial'],
 trap:['Ibu jari berada di sisi lateral tangan dalam posisi anatomi, bukan medial','"Kaudal" bukan berarti posterior','Abduksi jari tangan dihitung dari jari tengah, bukan dari garis tengah tubuh'],
 mn:'<b>Supinasi = "Sup"</b>: telapak menadah seperti membawa mangkuk sup.',atlas:['bidang']},

{id:'osteo',no:2,blok:2,t:'Osteologi',d:'Klasifikasi tulang, penanda permukaan, kerangka aksial & apendikular.',src:'Osteologi · dr. Ida Lestari Harahap',
 story:['Patah karena batuk?','Seorang nenek batuk keras lalu nyeri dada tajam di satu titik. Foto rontgen menunjukkan patah iga. Tulang yang rapuh, iga yang melengkung, dan titik lemah di sudut iga menjelaskan mengapa: memahami bentuk tulang berarti memahami di mana tulang mudah patah.'],
 obj:['Menyebut jumlah dan pembagian tulang','Mengelompokkan tulang menurut bentuknya','Mengenali penanda permukaan tulang','Menjelaskan bagian sternum dan klasifikasi costae'],
 bridge:['Tulang adalah jaringan hidup: matriks kolagen (lentur) yang dikeraskan kristal kalsium fosfat (hidroksiapatit), diisi sel osteoblas (pembentuk), osteosit (perawat), dan osteoklas (penghancur).','Kamu sudah tahu kalsium dan fosfat dari kimia. Di tubuh, 99% kalsium disimpan di tulang dan bisa dilepas ke darah saat dibutuhkan.'],
 core:`<h4>Jumlah dan pembagian</h4>
<p>Dewasa memiliki <b>206 tulang</b>: <b>kerangka aksial 80</b> (cranium, os hyoideum, ossicula auditus, columna vertebralis, costae, sternum) dan <b>kerangka apendikular 126</b> (gelang bahu, ekstremitas superior, gelang panggul, ekstremitas inferior).</p>
<h4>Bentuk tulang</h4>
<table class="tbl"><tr><th>Bentuk</th><th>Contoh</th></tr>
<tr><td>Panjang (longum)</td><td>Humerus, femur, phalanx</td></tr>
<tr><td>Pendek (breve)</td><td>Ossa carpi, ossa tarsi</td></tr>
<tr><td>Pipih (planum)</td><td>Os parietale, sternum, scapula, costae</td></tr>
<tr><td>Tak beraturan (irregulare)</td><td>Vertebra, os coxae</td></tr>
<tr><td>Berongga udara (pneumaticum)</td><td>Maxilla, os frontale, sphenoidale, ethmoidale</td></tr>
<tr><td>Sesamoid</td><td>Patella, os pisiforme</td></tr></table>
<p>Bagian tulang panjang: <b>diafisis</b> (batang), <b>metafisis</b>, <b>epifisis</b> (ujung) dengan lempeng epifisis (pertumbuhan memanjang), <b>periosteum</b> di luar, <b>endosteum</b> dan cavitas medullaris di dalam. Arteri nutricia masuk lewat foramen nutricium.</p>
<h4>Penanda permukaan</h4>
<table class="tbl"><tr><th>Istilah</th><th>Arti</th></tr>
<tr><td>Caput, collum, condylus, epicondylus</td><td>kepala, leher, tonjolan sendi bulat, tonjolan di atas kondilus</td></tr>
<tr><td>Tuberculum, tuberositas, trochanter</td><td>tonjolan kecil, tonjolan kasar, tonjolan besar (hanya femur)</td></tr>
<tr><td>Processus, spina, crista, linea</td><td>tonjolan, tonjolan runcing, rigi, garis</td></tr>
<tr><td>Fossa, fovea, sulcus, incisura</td><td>cekungan, cekungan kecil, alur, takik</td></tr>
<tr><td>Foramen, canalis, meatus, fissura, sinus</td><td>lubang, saluran, liang, celah, rongga udara</td></tr>
<tr><td>Facies articularis</td><td>permukaan sendi</td></tr></table>
<h4>Cranium</h4><p><b>Neurocranium 8 tulang</b> (frontale 1, parietale 2, temporale 2, occipitale 1, sphenoidale 1, ethmoidale 1) dan <b>viscerocranium/splanchnocranium 14 tulang</b> (nasale 2, lacrimale 2, zygomaticum 2, maxilla 2, palatinum 2, concha nasalis inferior 2, vomer 1, mandibula 1). Os ethmoidale dihitung di neurocranium.</p>
<h4>Columna vertebralis</h4><p>33 ruas: 7 servikal, 12 torakal, 5 lumbal, 5 sakral (menyatu jadi os sacrum), 4 coccygeal. Kurva sekunder lordosis servikal dan lumbal; kurva primer kifosis torakal dan sakral.</p>
<h4>Sternum dan costae</h4>
<ul><li><b>Manubrium</b> setinggi vertebra T3–T4, <b>corpus</b> T5–T9, <b>processus xiphoideus</b> T10. Pertemuan manubrium-corpus = <b>angulus sterni (Ludovici)</b>, setinggi T4–T5 dan tempat iga II bersendi: patokan menghitung iga.</li>
<li><b>Costae verae I–VII</b> (langsung ke sternum), <b>spuriae VIII–X</b> (lewat kartilago iga di atasnya), <b>fluctuantes XI–XII</b> (ujung bebas).</li></ul>`,
 high:['206 tulang = 80 aksial + 126 apendikular','Angulus Ludovici = iga II = T4/T5','Costae spuriae VIII–X','Trochanter hanya ada pada femur'],
 trap:['Sebagian slide menulis costae spuriae VI–X; yang benar VIII–X','Os ethmoidale termasuk neurocranium, bukan viscerocranium','Patella tulang sesamoid, bukan tulang pendek'],
 mn:'Vertebra "<b>sarapan jam 7, makan siang jam 12, makan malam jam 5</b>": 7 servikal, 12 torakal, 5 lumbal.',atlas:['kerangka','tengkorak']},

{id:'artro',no:3,blok:2,t:'Artrologi (sendi)',d:'Klasifikasi sendi struktural & fungsional, komponen sendi sinovial.',src:'Ekstremitas Superior (B.7.1) · dr. Ida Lestari Harahap',
 story:['Lutut yang "terkunci"','Pemain futsal memutar badan saat kakinya tertumpu, terdengar bunyi "klik", lalu lututnya tidak bisa diluruskan. Robekan meniskus, bantalan fibrokartilago di dalam sendi, terselip di antara tulang. Struktur kecil di dalam sendi menentukan apakah sendi bisa bergerak.'],
 obj:['Mengklasifikasikan sendi secara fungsional dan struktural','Menyebut komponen sendi sinovial','Memberi contoh tiap jenis sendi sinovial dan gerakannya'],
 bridge:['Sendi (articulatio) adalah tempat dua tulang atau lebih bertemu. Makin bebas geraknya, makin kurang stabil: bahu paling lincah dan paling sering dislokasi.','Kartilago hialin licin seperti es; cairan sinovial berperan seperti oli yang juga memberi makan kartilago yang tidak punya pembuluh darah.'],
 core:`<h4>Klasifikasi fungsional</h4><ul><li><b>Synarthrosis</b>: tidak bergerak (sutura cranium).</li><li><b>Amphiarthrosis</b>: sedikit bergerak (symphysis pubica, discus intervertebralis).</li><li><b>Diarthrosis</b>: bebas bergerak (semua sendi sinovial).</li></ul>
<h4>Klasifikasi struktural</h4>
<table class="tbl"><tr><th>Jenis</th><th>Subtipe</th><th>Contoh</th></tr>
<tr><td rowspan="3">Fibrosa</td><td>Sutura</td><td>Sutura coronalis, sagittalis</td></tr><tr><td>Gomphosis</td><td>Gigi dalam alveolus</td></tr><tr><td>Syndesmosis</td><td>Membrana interossea radius-ulna, tibiofibular distal</td></tr>
<tr><td rowspan="2">Kartilaginosa</td><td>Synchondrosis (primer, hialin)</td><td>Lempeng epifisis, sendi iga I-manubrium</td></tr><tr><td>Symphysis (sekunder, fibrokartilago)</td><td>Symphysis pubica, discus intervertebralis</td></tr>
<tr><td>Sinovial</td><td>lihat di bawah</td><td>Bahu, siku, lutut</td></tr></table>
<h4>Komponen sendi sinovial</h4><p>Kartilago artikular hialin, <b>capsula articularis</b> (lapisan fibrosa luar dan membrana synovialis dalam), cavitas articularis berisi cairan sinovial, ligamentum, dan pada beberapa sendi diskus/meniskus, labrum, serta bursa.</p>
<h4>Jenis sendi sinovial</h4>
<table class="tbl"><tr><th>Jenis</th><th>Sumbu</th><th>Contoh</th></tr>
<tr><td>Ball and socket (spheroidea)</td><td>Multiaksial</td><td>Bahu (glenohumeral), panggul (coxae)</td></tr>
<tr><td>Condyloid / ellipsoid</td><td>Biaksial</td><td>Radiocarpal, metacarpophalangeal</td></tr>
<tr><td>Saddle (sellaris)</td><td>Biaksial</td><td>Carpometacarpal ibu jari</td></tr>
<tr><td>Hinge (ginglymus)</td><td>Uniaksial</td><td>Humeroulnar, interphalangeal</td></tr>
<tr><td>Pivot (trochoidea)</td><td>Uniaksial (rotasi)</td><td>Atlantoaksial (dens), radioulnar proksimal</td></tr>
<tr><td>Gliding (plana)</td><td>Geser</td><td>Intercarpal, acromioclavicular, facet vertebra</td></tr></table>`,
 high:['Symphysis = fibrokartilago; synchondrosis = hialin','Atlantoaksial = pivot (gerak "tidak")','Carpometacarpal I = sendi pelana','Gomphosis = gigi'],
 trap:['Sendi siku humeroulnar = engsel, tetapi radioulnar proksimal = pivot','Syndesmosis termasuk sendi fibrosa, bukan kartilaginosa'],
 mn:'Sendi sinovial "<b>Bola Kondang Pelana Engsel Pasak Geser</b>": ball, condyloid, saddle, hinge, pivot, gliding.',atlas:['kerangka']},

{id:'mio',no:4,blok:2,t:'Miologi',d:'Jenis otot, bagian otot rangka, tata nama otot, origo-insersio.',src:'Miologi (Blok 2) · materi pptx tidak terbaca; disusun dari rujukan standar',
 story:['Mengapa namanya "sternocleidomastoideus"?','Nama otot sering seperti alamat lengkap: otot ini menempel di sternum, clavicula, dan processus mastoideus. Bila kamu tahu cara membaca nama otot, separuh hafalan origo-insersio sudah selesai.'],
 obj:['Membedakan tiga jenis jaringan otot','Menjelaskan origo, insersio, dan aksi','Membaca nama otot berdasarkan bentuk, ukuran, arah serat, letak, jumlah kepala, dan perlekatan','Membedakan peran agonis, antagonis, sinergis, fiksator'],
 bridge:['Otot bekerja dengan menarik, tidak pernah mendorong. Gerakan berlawanan selalu dikerjakan otot lain.','Di tingkat sel, filamen aktin dan miosin saling bergeser dengan energi ATP dan dipicu ion kalsium: inilah kontraksi.'],
 core:`<h4>Tiga jenis otot</h4><table class="tbl"><tr><th></th><th>Rangka</th><th>Jantung</th><th>Polos</th></tr>
<tr><td>Garis lintang</td><td>Ada</td><td>Ada</td><td>Tidak</td></tr><tr><td>Inti</td><td>Banyak, tepi</td><td>1–2, tengah</td><td>1, tengah</td></tr><tr><td>Kendali</td><td>Sadar (somatik)</td><td>Tidak sadar</td><td>Tidak sadar (otonom)</td></tr><tr><td>Ciri</td><td>Serat panjang</td><td>Diskus interkalaris, bercabang</td><td>Sel gelendong</td></tr></table>
<h4>Bagian otot rangka</h4><p>Venter (perut otot), tendo (berbentuk tali) atau aponeurosis (lembaran). Pembungkus: epimisium (seluruh otot), perimisium (fasikulus), endomisium (tiap serat). <b>Origo</b> = perlekatan yang relatif diam, biasanya proksimal; <b>insersio</b> = perlekatan yang bergerak, biasanya distal.</p>
<h4>Tata nama otot</h4><table class="tbl"><tr><th>Dasar</th><th>Contoh</th></tr>
<tr><td>Bentuk</td><td>Deltoideus (segitiga), trapezius, rhomboideus, quadratus, lumbricales (seperti cacing)</td></tr>
<tr><td>Ukuran</td><td>Major, minor, longus, brevis, maximus</td></tr>
<tr><td>Arah serat</td><td>Rectus, obliquus, transversus</td></tr>
<tr><td>Letak</td><td>Tibialis anterior, intercostales, temporalis</td></tr>
<tr><td>Jumlah kepala</td><td>Biceps, triceps, quadriceps</td></tr>
<tr><td>Perlekatan</td><td>Sternocleidomastoideus, coracobrachialis</td></tr>
<tr><td>Fungsi</td><td>Flexor, extensor, adductor, levator, supinator</td></tr></table>
<h4>Arsitektur serat</h4><p>Paralel/fusiformis (biceps: jangkauan gerak besar), pennatus (unipennatus, bipennatus seperti rectus femoris, multipennatus seperti deltoideus: tenaga besar), konvergen (pectoralis major), sirkular/sfingter (orbicularis oris).</p>
<h4>Peran dalam gerakan</h4><ul><li><b>Agonis (prime mover)</b>: penggerak utama.</li><li><b>Antagonis</b>: gerak berlawanan, harus relaksasi.</li><li><b>Sinergis</b>: membantu agonis.</li><li><b>Fiksator</b>: menstabilkan origo agonis.</li></ul>`,
 high:['Otot jantung: diskus interkalaris','Origo relatif tetap, insersio bergerak','Deltoideus multipennatus','Antagonis fleksi siku adalah triceps brachii'],
 trap:['Otot polos tidak berlurik walau ada aktin-miosin','Origo tidak selalu proksimal (misalnya otot wajah berinsersio ke kulit)'],
 mn:'<b>"Origo = Orang tua di rumah"</b> (diam), <b>"Insersio = Insan yang jalan-jalan"</b> (bergerak).',atlas:['otot']},

{id:'kepala',no:5,blok:3,t:'Kepala: cranium & wajah',d:'Tulang cranium, titik kraniometrik, fossa cranii & foramina, otot mimik.',src:'Anatomi Kepala-Leher (Blok 3)',
 story:['Pukulan di pelipis','Remaja terkena bola keras di pelipis, sempat sadar dan bercanda, lalu satu jam kemudian tidak sadar. Di bawah pterion, titik tulang paling tipis, berjalan a. meningea media. Robeknya menimbulkan perdarahan epidural dengan "lucid interval".'],
 obj:['Menyebut tulang neurocranium dan viscerocranium','Menunjuk titik kraniometrik dan sutura','Memasangkan foramen basis cranii dengan isinya','Menjelaskan persarafan otot mimik dan otot pengunyah'],
 bridge:['Cranium seperti helm berlapis yang tersusun dari banyak keping. Pada bayi, keping-keping ini belum rapat (fontanel) supaya kepala bisa melewati jalan lahir dan otak bisa tumbuh.','Basis cranii berlubang-lubang karena saraf dan pembuluh harus keluar-masuk otak. Menghafal "lubang + isinya" adalah inti kuliah ini.'],
 core:`<h4>Titik kraniometrik dan sutura</h4><ul><li><b>Bregma</b>: pertemuan sutura coronalis dan sagittalis (fontanel anterior).</li><li><b>Lambda</b>: pertemuan sutura sagittalis dan lambdoidea (fontanel posterior).</li><li><b>Pterion</b>: pertemuan frontale, parietale, temporale, ala major sphenoidale; tipis, di atas a. meningea media.</li><li><b>Asterion</b>: pertemuan parietale, temporale, occipitale.</li><li><b>Nasion, inion</b> (protuberantia occipitalis externa), <b>vertex</b> (titik tertinggi).</li></ul>
<h4>Fossa cranii</h4><p><b>Anterior</b>: lobus frontalis (lamina cribrosa ethmoidale). <b>Media</b>: lobus temporalis, sella turcica berisi hipofisis. <b>Posterior</b>: cerebellum, pons, medulla oblongata.</p>
<table class="tbl"><tr><th>Lubang</th><th>Fossa</th><th>Isi</th></tr>
<tr><td>Foramina lamina cribrosa</td><td>Anterior</td><td>N. olfactorius (I)</td></tr>
<tr><td>Canalis opticus</td><td>Media</td><td>N. opticus (II), a. ophthalmica</td></tr>
<tr><td>Fissura orbitalis superior</td><td>Media</td><td>N. III, IV, V1 (ophthalmicus), VI, v. ophthalmica superior</td></tr>
<tr><td>Foramen rotundum</td><td>Media</td><td>N. maxillaris (V2)</td></tr>
<tr><td>Foramen ovale</td><td>Media</td><td>N. mandibularis (V3)</td></tr>
<tr><td>Foramen spinosum</td><td>Media</td><td>A. meningea media</td></tr>
<tr><td>Foramen lacerum</td><td>Media</td><td>Tertutup kartilago; a. carotis interna melintas di atasnya</td></tr>
<tr><td>Meatus acusticus internus</td><td>Posterior</td><td>N. facialis (VII), n. vestibulocochlearis (VIII)</td></tr>
<tr><td>Foramen jugulare</td><td>Posterior</td><td>N. IX, X, XI, v. jugularis interna</td></tr>
<tr><td>Canalis hypoglossi</td><td>Posterior</td><td>N. hypoglossus (XII)</td></tr>
<tr><td>Foramen magnum</td><td>Posterior</td><td>Medulla oblongata, a. vertebralis, radix spinalis n. XI</td></tr></table>
<h4>Otot wajah</h4><p><b>Otot mimik</b> (orbicularis oculi, orbicularis oris, buccinator, zygomaticus major, frontalis, platysma) berasal dari arcus pharyngeus II dan semuanya disarafi <b>n. facialis (VII)</b>. <b>Otot pengunyah</b> (masseter, temporalis, pterygoideus medialis dan lateralis) berasal dari arcus I dan disarafi <b>n. mandibularis (V3)</b>. Pterygoideus lateralis satu-satunya yang membuka mulut.</p>
<h4>Embriologi saraf (dasar)</h4><p>Lempeng saraf melipat menjadi tabung saraf (neurulasi, minggu ke-3–4). Neuroporus anterior menutup ±hari ke-25, posterior ±hari ke-27; gagal menutup menyebabkan anensefali (anterior) atau spina bifida (posterior). Tiga vesikel primer: prosencephalon, mesencephalon, rhombencephalon; berkembang menjadi lima vesikel sekunder.</p>`,
 high:['Foramen ovale = V3, rotundum = V2, fissura orbitalis superior = V1','Foramen spinosum = a. meningea media','Foramen jugulare = IX, X, XI','Otot mimik = n. VII; otot kunyah = n. V3'],
 trap:['Fissura orbitalis superior tidak dilalui n. opticus; n. II lewat canalis opticus','Buccinator otot mimik (n. VII), bukan otot kunyah','Ethmoid kadang ditulis dua kali di slide; hitung di neurocranium saja'],
 mn:'Divisi trigeminus keluar lewat "<b>Standing Room Only</b>": Superior orbital fissure (V1), Rotundum (V2), Ovale (V3).',atlas:['tengkorak','basis']},

{id:'leher',no:6,blok:3,t:'Leher',d:'Vertebra servikal, trigonum colli, otot dan isi selubung karotis.',src:'Anatomi Kepala-Leher (Blok 3)',
 story:['Mencari nadi di leher','Saat resusitasi, petugas menekan dua jari di samping jakun untuk mencari nadi karotis. Arteri itu terletak di trigonum caroticum, bersama v. jugularis interna dan n. vagus di dalam satu selubung.'],
 obj:['Membedakan atlas, axis, dan vertebra servikal tipikal','Menjelaskan pembagian trigonum colli','Menyebut isi selubung karotis dan letaknya'],
 bridge:['Leher adalah "jalan tol" antara kepala dan tubuh: pembuluh darah, saluran napas, saluran makan, dan saraf berdesakan di ruang sempit yang dibungkus lapisan fascia.'],
 core:`<h4>Vertebra servikal</h4><ul><li>Ciri khas semua servikal: <b>foramen transversarium</b> (dilalui a. vertebralis C6–C1).</li><li><b>Atlas (C1)</b>: tanpa corpus dan processus spinosus; facies articularis superior bersendi dengan condylus occipitalis (mengangguk "ya").</li><li><b>Axis (C2)</b>: memiliki <b>dens</b> yang menjadi poros sendi atlantoaksial (pivot, menoleh "tidak").</li><li>C3–C6: processus spinosus bifidus. <b>C7 vertebra prominens</b>, spinosus panjang dan tidak bifid.</li></ul>
<h4>Trigonum colli</h4><p>M. sternocleidomastoideus (SCM) membagi leher menjadi <b>trigonum anterius</b> dan <b>posterius</b>.</p>
<table class="tbl"><tr><th>Trigonum</th><th>Bagian</th><th>Isi penting</th></tr>
<tr><td rowspan="4">Anterius</td><td>Submandibulare</td><td>Glandula submandibularis</td></tr><tr><td>Submentale</td><td>Nodus limfoid submental</td></tr><tr><td>Caroticum</td><td>Bifurkasio a. carotis communis (setinggi tepi atas kartilago tiroid, C4)</td></tr><tr><td>Musculare</td><td>Otot infrahyoid, tiroid, laring</td></tr>
<tr><td>Posterius</td><td>Occipitale, omoclaviculare</td><td>N. accessorius (XI), plexus brachialis, a. subclavia</td></tr></table>
<h4>Selubung karotis</h4><p>Berisi <b>a. carotis communis/interna</b> (medial), <b>v. jugularis interna</b> (lateral), dan <b>n. vagus</b> (posterior, di antaranya). N. phrenicus (C3–C5) berjalan di permukaan m. scalenus anterior.</p>
<h4>Otot leher</h4><p>SCM dan trapezius disarafi n. XI. Suprahyoid (digastricus, mylohyoideus, geniohyoideus, stylohyoideus) mengangkat hyoid; infrahyoid (strap muscles) menurunkannya, sebagian besar disarafi ansa cervicalis.</p>`,
 high:['Foramen transversarium ciri servikal','Dens = axis; atlas tanpa corpus','Isi selubung karotis: arteri, vena, n. vagus','N. XI di trigonum posterius rentan cedera saat biopsi kelenjar'],
 trap:['N. phrenicus tidak berada di dalam selubung karotis','C7 tidak bifid'],
 mn:'N. phrenicus: "<b>C3, 4, 5 keeps the diaphragm alive</b>".',atlas:['vertebra','leher']},

{id:'thorax',no:7,blok:4,t:'Dinding thorax & mediastinum',d:'Apertura thoracis, otot interkostal, pembuluh interkostal, isi mediastinum.',src:'Anatomy of Truncus · dr. Ida Lestari Harahap',
 story:['Jarum di sela iga','Saat pungsi cairan pleura, dokter selalu menusuk tepat di atas tepi atas iga. Mengapa tidak di bawahnya? Karena vena, arteri, dan saraf interkostal berjalan di sulcus costae pada tepi bawah iga.'],
 obj:['Menjelaskan batas apertura thoracis','Menyebut lapisan otot interkostal dan urutan VAN','Membagi mediastinum dan isinya'],
 bridge:['Rongga dada seperti sangkar yang bisa membesar-mengecil. Otot di antara iga dan diafragma mengubah volume sangkar; sesuai hukum Boyle, tekanan turun dan udara masuk.'],
 core:`<h4>Apertura thoracis</h4><p><b>Superior</b> (thoracic inlet): korpus T1, iga I, tepi atas manubrium. <b>Inferior</b>: T12, iga XI–XII, arcus costalis, processus xiphoideus; ditutup diafragma.</p>
<h4>Otot dinding thorax</h4><ul><li><b>Intercostales externi</b>: inspirasi; serat ke anterior-inferior ("tangan di saku").</li><li><b>Intercostales interni</b>: ekspirasi paksa.</li><li><b>Intercostales intimi</b>, subcostales, transversus thoracis.</li></ul>
<h4>Berkas neurovaskular interkostal</h4><p>Di sulcus costae tepi bawah iga, antara m. intercostalis internus dan intimus, berurutan dari atas: <b>Vena, Arteri, Nervus (VAN)</b>. Vena interkostal posterior bermuara ke sistem <b>v. azygos</b> (kanan) dan <b>hemiazygos</b> (kiri).</p>
<h4>Mediastinum</h4><table class="tbl"><tr><th>Bagian</th><th>Isi</th></tr>
<tr><td>Superius (di atas bidang angulus sterni T4/T5)</td><td>Thymus, arcus aortae dan cabangnya, v. brachiocephalica, v. cava superior, trakea, esofagus, n. vagus, n. phrenicus, ductus thoracicus</td></tr>
<tr><td>Inferius anterius</td><td>Sisa thymus, jaringan lemak, nodus limfoid</td></tr>
<tr><td>Inferius medium</td><td>Jantung dan perikardium, pangkal pembuluh besar</td></tr>
<tr><td>Inferius posterius</td><td>Aorta descendens, esofagus, v. azygos, ductus thoracicus, n. vagus</td></tr></table>
<h4>Dinding abdomen</h4><p>Lapisan otot lateral: obliquus externus, obliquus internus, transversus abdominis; anterior: rectus abdominis dalam selubungnya. <b>Aorta abdominalis</b> (T12–L4) bercabang: truncus coeliacus (T12), a. mesenterica superior (L1), aa. renales (L1–L2), a. mesenterica inferior (L3), bifurkasio menjadi aa. iliaca communis (L4).</p>`,
 high:['Urutan VAN dari atas di tepi bawah iga','Bidang angulus sterni membagi mediastinum superius-inferius','Truncus coeliacus T12, AMS L1, AMI L3, bifurkasio L4'],
 trap:['Jantung ada di mediastinum medium, bukan anterius','Pungsi pleura di atas tepi atas iga, bukan di bawah iga'],
 mn:'<b>VAN</b> dari atas ke bawah, seperti mobil van yang parkir di bawah atap iga.',atlas:['permukaan']},

{id:'jantung',no:8,blok:4,t:'Jantung & pembuluh darah',d:'Perikardium, ruang & katup, auskultasi, arteri koroner, sistem konduksi.',src:'Cardiovascular & Lymphoid System Anatomy',
 story:['Nyeri dada dan "widowmaker"','Pria 52 tahun nyeri dada kiri menjalar ke lengan. Angiografi menunjukkan sumbatan di LAD, arteri yang memperdarahi dinding depan ventrikel kiri dan dua pertiga anterior septum. Tahu peta arteri koroner berarti tahu bagian jantung mana yang mati.'],
 obj:['Menjelaskan lapisan perikardium dan sinusnya','Mengurutkan aliran darah melalui ruang dan katup','Menunjuk area auskultasi','Memetakan cabang arteri koroner','Mengurutkan sistem konduksi'],
 bridge:['Jantung adalah dua pompa yang ditempel: kanan memompa ke paru (sirkulasi kecil), kiri ke seluruh tubuh (sirkulasi besar). Katup bekerja seperti pintu satu arah.'],
 core:`<h4>Pembuluh darah</h4><p>Tiga lapisan: <b>tunika intima</b> (endotel), <b>media</b> (otot polos, tebal pada arteri), <b>adventitia/externa</b> (jaringan ikat, tebal pada vena). Vena punya katup; kapiler hanya endotel.</p>
<h4>Perikardium</h4><p>Fibrosum (luar, kuat) dan serosum (lamina parietalis dan visceralis/epikardium) dengan cavitas pericardii berisi sedikit cairan. <b>Sinus transversus</b> di belakang aorta-truncus pulmonalis (penting saat bedah jantung), <b>sinus obliquus</b> di belakang atrium kiri. Penumpukan cairan menekan jantung (<b>tamponade</b>): trias Beck = hipotensi, vena leher distensi, bunyi jantung menjauh.</p>
<h4>Ruang dan katup</h4><div class="flow"><span>VCS/VCI</span><span>Atrium kanan</span><span>Katup trikuspid</span><span>Ventrikel kanan</span><span>Katup pulmonal</span><span>A. pulmonalis</span><span>Paru</span><span>Vv. pulmonales</span><span>Atrium kiri</span><span>Katup mitral</span><span>Ventrikel kiri</span><span>Katup aorta</span><span>Aorta</span></div>
<p>Apex jantung dibentuk ventrikel kiri, setinggi sela iga V linea midclavicularis kiri. Facies sternocostalis didominasi ventrikel kanan.</p>
<h4>Area auskultasi</h4><table class="tbl"><tr><th>Katup</th><th>Lokasi</th></tr><tr><td>Aorta</td><td>Sela iga II parasternal kanan</td></tr><tr><td>Pulmonal</td><td>Sela iga II parasternal kiri</td></tr><tr><td>Trikuspid</td><td>Sela iga IV–V parasternal kiri</td></tr><tr><td>Mitral</td><td>Sela iga V linea midclavicularis kiri (apex)</td></tr></table>
<h4>Arteri koroner</h4><ul><li><b>A. coronaria dextra (RCA)</b>: atrium dan ventrikel kanan, nodus SA (±60%) dan nodus AV (±80%), sepertiga posterior septum lewat a. interventricularis posterior pada dominansi kanan (±75% orang).</li><li><b>A. coronaria sinistra (LCA)</b> bercabang menjadi <b>LAD (r. interventricularis anterior)</b>: dinding anterior ventrikel kiri, apex, dua pertiga anterior septum; dan <b>r. circumflexus</b>: dinding lateral-posterior ventrikel kiri.</li><li>Vena jantung bermuara ke <b>sinus coronarius</b> lalu atrium kanan.</li></ul>
<h4>Sistem konduksi</h4><div class="flow"><span>Nodus SA</span><span>Nodus AV</span><span>Berkas His</span><span>Crus dextrum & sinistrum</span><span>Serabut Purkinje</span></div>`,
 high:['LAD = dinding anterior LV & 2/3 anterior septum','Dominansi kanan ±75%','Auskultasi mitral di apex ICS V MCL kiri','Trias Beck = tamponade'],
 trap:['Apex dibentuk ventrikel kiri, tetapi permukaan depan didominasi ventrikel kanan','Katup pulmonal di ICS II kiri, aorta di ICS II kanan'],
 mn:'Urutan auskultasi "<b>All Physicians Take Money</b>": Aorta, Pulmonal, Trikuspid, Mitral (dari kanan atas berputar ke apex).',atlas:['jantung','permukaan']},

{id:'limfoid',no:9,blok:6,t:'Sistem limfoid',d:'Organ limfoid primer & sekunder, lien, nodus limfoid, ductus thoracicus.',src:'Anatomy of Truncus serta Organ Lymphoid · dr. Ida Lestari Harahap',
 story:['Limpa yang pecah','Pengendara motor jatuh dengan perut kiri atas membentur setang. Tekanan darahnya turun perlahan. Lien terletak di bawah iga IX–XI kiri, sangat kaya darah, dan kapsulnya tipis: robek sedikit saja bisa menyebabkan syok.'],
 obj:['Membedakan organ limfoid primer dan sekunder','Menjelaskan letak, relasi, dan perdarahan lien','Menjelaskan struktur nodus limfoid dan aliran limfe'],
 bridge:['Sistem limfe punya dua tugas: mengembalikan cairan jaringan yang bocor dari kapiler ke darah, dan menjadi "pos jaga" imun tempat limfosit bertemu antigen.'],
 core:`<h4>Primer vs sekunder</h4><p><b>Primer</b> (tempat limfosit lahir dan matang): sumsum tulang (sel B) dan <b>thymus</b> (sel T). <b>Sekunder</b> (tempat limfosit bertemu antigen): nodus limfoid, lien, tonsil (cincin Waldeyer), MALT, plak Peyer di ileum.</p>
<h4>Lien</h4><ul><li>Di regio hipokondrium kiri, sejajar <b>iga IX–XI</b>, sumbu panjang searah iga X.</li><li>Relasi: diafragma (superolateral), gaster (anterior), ginjal kiri (posterior), flexura coli sinistra (inferior), cauda pancreatis di hilum.</li><li>Ligamentum gastrosplenicum dan splenorenale.</li><li>Darah dari <b>a. lienalis</b> (cabang truncus coeliacus, berjalan berkelok di tepi atas pankreas); v. lienalis menyatu dengan v. mesenterica superior membentuk v. porta.</li><li>Pulpa merah (menyaring eritrosit tua) dan pulpa putih (limfoid).</li></ul>
<h4>Nodus limfoid</h4><p>Kapsul, korteks (folikel sel B), parakorteks (sel T), medula. Limfe masuk lewat <b>vasa afferentia</b> di permukaan cembung, keluar lewat <b>vasa efferentia</b> di hilum.</p>
<h4>Aliran limfe</h4><p><b>Ductus thoracicus</b> mulai dari cisterna chyli (L1–L2), naik melalui hiatus aorticus, mengalirkan limfe tubuh kecuali kuadran kanan atas, bermuara di sudut v. subclavia sinistra dan v. jugularis interna sinistra. <b>Ductus lymphaticus dexter</b> mengalirkan kepala-leher kanan, lengan kanan, dan thorax kanan.</p>`,
 high:['Primer: sumsum tulang & thymus','Lien sejajar iga IX–XI kiri','A. lienalis cabang truncus coeliacus','Ductus thoracicus bermuara di angulus venosus kiri'],
 trap:['Nodus limfoid organ sekunder, bukan primer','Vasa afferentia masuk di sisi cembung, bukan di hilum'],
 mn:'Lien "<b>1-3-5-7-9-11</b>": ukuran 1×3×5 inci, berat 7 ons, terletak di iga 9–11.',atlas:['abdomen']},

{id:'resp',no:10,blok:4,t:'Saluran napas',d:'Hidung & sinus, pharynx, larynx, trakea, bronkus, paru.',src:'Anatomi Sistem Respirasi · dr. Ida Lestari Harahap',
 story:['Mimisan pada anak','Anak 8 tahun sering mengorek hidung lalu mimisan. Hampir selalu sumbernya pleksus Kiesselbach di septum anterior, tempat lima arteri bertemu. Menekan cuping hidung 10 menit biasanya cukup menghentikannya.'],
 obj:['Menjelaskan struktur cavum nasi, concha, meatus, dan drainase sinus','Membagi pharynx dan menyebut cincin Waldeyer','Menyebut kartilago larynx dan persarafannya','Menjelaskan trakea, carina, dan percabangan bronkus'],
 bridge:['Saluran napas atas menghangatkan, melembapkan, dan menyaring udara sebelum mencapai alveolus yang tipis dan rapuh.'],
 core:`<h4>Hidung dan sinus paranasal</h4><p>Septum nasi (kartilago septi, lamina perpendicularis ethmoidale, vomer). Dinding lateral: concha superior, media, inferior dengan meatus di bawahnya.</p>
<table class="tbl"><tr><th>Muara</th><th>Yang bermuara</th></tr><tr><td>Recessus sphenoethmoidalis</td><td>Sinus sphenoidalis</td></tr><tr><td>Meatus superior</td><td>Sel ethmoid posterior</td></tr><tr><td>Meatus medius (hiatus semilunaris)</td><td>Sinus frontalis, maxillaris, sel ethmoid anterior</td></tr><tr><td>Meatus inferior</td><td>Ductus nasolacrimalis</td></tr></table>
<p><b>Pleksus Kiesselbach (Little's area)</b> di septum anterior: sumber epistaksis anterior.</p>
<h4>Pharynx</h4><p>Nasopharynx (tonsila pharyngea/adenoid, muara tuba auditiva), oropharynx (tonsila palatina), laryngopharynx. <b>Cincin Waldeyer</b>: tonsila pharyngea, tubaria, palatina, lingualis.</p>
<h4>Larynx</h4><p>9 kartilago: 3 tunggal (<b>thyroidea, cricoidea, epiglottica</b>) dan 3 pasang (<b>arytenoidea, corniculata, cuneiformis</b>). Plica vocalis (pita suara sejati) di bawah plica vestibularis. <b>M. cricoarytenoideus posterior satu-satunya abduktor</b> pita suara. Persarafan: <b>n. laryngeus superior</b> (sensoris di atas pita suara, motorik m. cricothyroideus) dan <b>n. laryngeus recurrens</b> (semua otot intrinsik lain, sensoris di bawah pita suara). N. recurrens kiri melingkari arcus aortae, kanan melingkari a. subclavia.</p>
<h4>Trakea dan bronkus</h4><p>Trakea dari C6 sampai T4/T5, 16–20 kartilago berbentuk C (terbuka ke posterior, ditutup m. trachealis). Bercabang di <b>carina</b>. Bronkus utama kanan lebih lebar, pendek, dan tegak sehingga benda asing lebih sering masuk ke kanan. Paru kanan 3 lobus (fissura obliqua dan horizontalis), kiri 2 lobus dengan lingula dan incisura cardiaca.</p>`,
 high:['Meatus medius: frontalis, maxillaris, ethmoid anterior','Ductus nasolacrimalis ke meatus inferior','Abduktor satu-satunya: cricoarytenoideus posterior','Benda asing lebih sering ke bronkus kanan'],
 trap:['Kartilago cricoidea satu-satunya cincin penuh, bukan thyroidea','N. recurrens kiri melingkari arcus aortae, kanan melingkari a. subclavia'],
 mn:'"<b>Posterior Pulls apart</b>": cricoarytenoideus posterior membuka pita suara.',atlas:['napas']}
];
