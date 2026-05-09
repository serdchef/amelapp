import type { Period, Day, Amel } from '../types';

// ═══════════════════════════════════════════════════════════
// VAKİT BAZLI AMELLER
// ═══════════════════════════════════════════════════════════
export const PERIODS: Record<string, Period> = {
  gece: {
    name: 'Gece / Teheccüd',
    icon: '🌑',
    kerahat: false,
    desc: "Gece ibadeti Allah'ın katında çok kıymetlidir. Mümkünse teheccüd namazı kılın ve gece zikirlerini yapın.",
    amels: [
      {
        id: 'g1',
        t: 'Uykudan Uyanınca Zikir',
        en_t: 'Dhikr Upon Waking Up',
        ur_t: 'نیند سے بیدار ہونے کا ذکر',
        ar: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِیکَ لَهُ لَهُ الْمُلْکُ وَلَهُ الْحَمْد',
        txt: "La ilahe illallahu vahdehu la şerike leh.\nLehül mülkü ve lehül hamdu ve hüve ala külli şey'in kadir.\nElhamdülillahi ve sübhanallahi ve la ilahe illallahu vallahu ekber.\nVe la havle ve la kuvvete illa billah.\n\n→ Sonra istediğin duayı yap — kabul olur.",
        ur_txt: "لا إله إلا اللہ وحدہ لا شریک لہ، لہ الملک ولہ الحمد، وهو علی کل شیء قدیر۔ الحمدللہ، وسبحان اللہ، ولا إله إلا اللہ، واللہ اکبر، ولا حول ولا قوة إلا باللہ۔",
        faz: 'Uykudan uyanınca okuyanın duası kabul olur',
        en_faz: 'The prayer of the one who recites this upon waking up is accepted',
        ur_faz: 'نیند سے بیدار ہو کر یہ پڑھنے والے کی دعا قبول ہوتی ہے۔',
        src: 'Zikir 19',
        k: '1 kere',
      },
      {
        id: 'g2',
        t: 'Geçmişi Kökten Sildiren Tesbih',
        en_t: 'The Tasbih That Erases The Past',
        ar: 'سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ، سُبْحَانَ ذِي الْعِزَّةِ وَالْجَبَرُوتِ، سُبْحَانَ الْحَيِّ الَّذِي لَا يَمُوتُ سُبُّوحٌ قُدُّوسٌ رَبُّ الْمَلَائِكَةِ وَالرُّوحِ',
        txt: "Sübhane zil mülki vel melekût, Sübhane zil ızzeti vel ceberut, Sübhanel hayyillezî lâ yemût, Sübbuhun, Kuddusün, Rabbu’l-melaiketi ve’r-ruh.",
        faz: 'Ömürde bir kere dahi okusa geçmişi silinir, günahları affolur.',
        en_faz: 'Even if read once in a lifetime, sins are forgiven.',
        src: 'Hz. Enes (r.a) / Kenzü’l-ummâl',
        k: 'Günde 1 veya ömürde 1 kere',
      },
      {
        id: 'g3',
        t: "Arş'ın Taşıyıcı Meleklerinin Zikri",
        en_t: "Dhikr of the Bearers of the Throne",
        ar: 'سُبْحَانَ ذِي الْعَرْشِ وَالْعِزَّةِ وَالْعَظَمَةِ وَالْهَيْبَةِ وَالْقُدْرَةِ وَالْكِبْرِيَاءِ وَالْجَبَرُوتِ',
        txt: "Sübhane zi'l-arşi ve'l-izzeti ve'l-azameti ve'l-heybeti ve'l-kudreti ve'l-kibriyai ve'l-ceberut. Sübhane'l-meliki'l-mabud, Sübhane'l-meliki'l-mevcud...",
        faz: "Meleklerin virdidir. Arş'ın taşıyıcılarının sürekli okuduğu çok azametli bir tesbihtir.",
        en_faz: "The litany of the angels. A magnificent tasbih read by the bearers of the Throne.",
        src: 'Marifetname',
        k: 'Gece vakti 1 kere',
      },
    ],
  },

  sabah_sonrasi: {
    name: 'Sabah Namazı Sonrası',
    icon: '🌙',
    kerahat: false,
    desc: 'Sabah namazını kıldıktan sonra güneş doğana kadar. Nafile namaz kılınmaz — zikir, dua ve tesbihat vakti.',
    amels: [
      {
        id: 'sb1',
        t: 'Sabah & Akşam — 10 Kere / 6 Büyük Fazilet',
        en_t: 'Morning & Evening — 10 Times / 6 Great Virtues',
        ar: 'هُوَ اللهُ الَّذِي لَا إِلَهَ إِلَّا هُوَ وَاللهُ أَكْبَرُ',
        txt: "Hüvellahüllezi la ilahe illallahu vallahu ekber.\nSübhanallahi ve bihamdihi. Ve la havle ve la kuvvete illa billahi azze ve celle.\nVe esteğfirullahel evvele vel ahıra vezzahira vel batıne.\nLehül mülkü ve lehül hamdu biyedihil hayru ve hüve ala külli şey'in kadir.",
        faz: '① İblis\'e karşı korunma  ② Tonlarla sevap  ③ Cennette derece  ④ Huri eş  ⑤ 12 Bin melek  ⑥ Hac+Umre sevabı',
        en_faz: 'Protection from Iblis, tons of rewards, high ranks in Jannah.',
        src: 'Zikir 18',
        k: '10 kere',
      },
      {
        id: 'sb_ek1',
        t: 'Sabah Namazından Sonra 100 İhlas Sırrı',
        en_t: 'Secret of 100 Ikhlas After Fajr',
        ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ ... — ١٠٠×',
        txt: "Sabah namazından sonra dünya kelamı konuşmadan, herbirinin başında Besmele ile 100 İhlas Suresi okumak.",
        faz: '100 Senelik günahı affolur. Allah ile arasında kalan gizli günahları dahi silinir.',
        en_faz: '100 years of sins are forgiven. Even secret sins are erased.',
        src: 'Gönenli Mehmet Efendi',
        k: '100 kere',
      },
      {
        id: 'sb_ek2',
        t: 'Maddi ve Manevi Sıkıntılar İçin (Tevbe 128-129)',
        ar: 'لَقَدْ جَاءكُمْ رَسُولٌ مِّنْ أَنفُسِكُمْ عَزِيزٌ عَلَيْهِ مَا عَنِتُّمْ...',
        txt: "Lekad câekum resûlun min enfusikum azîzun, aleyhi mâ anittum harîsun aleykum bil mu’minîne raûfun rahîm. Fe in tevellev fe kul hasbiyallâhu, lâ ilâhe illâ hûve, aleyhi tevekkeltu ve huve rabbul arşil azîm.",
        faz: 'Büyük dert ve sıkıntıları defeder, her türlü hacet için okunur.',
        src: 'Tevbe Suresi',
        k: '7 veya 11 kere',
      },
      {
        id: 'sb_ek3',
        t: "Musa (A.S)'ın Meşhur Tesbihi",
        ar: 'سُبْحَانَ مَنْ يُسَبِّحُ لَهُ فِي لُجَجِ الْبِحَارِ، سُبْحَانَ مَنْ يُسَبِّحُ لَهُ مَا فِي الْأَرْضِ الْقِفَارِ...',
        txt: "Sübhâne men yusebbehu lehû fî luceci’l bihâr. Sübhâne men yusebbihu lehû mâ fî’l ardi-l gıfâr. Sübhâne men yusebbehu lehû alâ ru-usi’l cibâl...",
        faz: '1000 köle azat etmiş veya 1000 makbul hac yapmış kadar sevap yazılır.',
        src: 'Büstânü’l-fukarâ',
        k: 'Günde veya ayda 1 kere',
      },
      {
        id: 'sb3',
        t: "Günün Hayrı İçin Sabah Zikri",
        ar: 'مَا شَاءَ اللهُ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ',
        txt: "Maşaellahü la havle vela kuvvete illa billah.\nEşhedü enne ilahe ala külli şey'in kadir.",
        faz: "O günün tüm hayrı verilir — tüm şerri uzaklaştırılır",
        src: 'Zikir 43',
        k: '1 kere sabah',
      },
    ],
  },

  kerahat_sabah: {
    name: 'Kerahat Vakti',
    icon: '⏳',
    kerahat: true,
    desc: "Güneş doğduktan sonra ~45 dakika nafile namaz kılmak mekruhtur. Zikir, Kur'an okuma ve dua yapılabilir.",
    amels: [
      {
        id: 'ks1',
        t: 'İşrak için Beklerken — Oturup Zikret',
        ar: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ — ١٠٠×',
        txt: "Sabah namazından sonra zikir ve dua ile otur.\nGüneş doğup ~45 dk yükseldikten sonra:\n2 rekat İşrak namazı kıl.\n\nHadis: \"Sabah namazını kılıp zikir ile oturan, sonra güneş yükselince 2 rekat kılan kişiye tam bir Hac ve Umre sevabı yazılır.\"",
        faz: '1 Hac + 1 Umre sevabı (tam ve eksiksiz)',
        src: 'Hadis-i Şerif',
        k: 'Güneş+45dk sonra',
      },
      {
        id: 'ks_ek1',
        t: '24 Saat Zikretmekten Daha Faziletli Zikir',
        ar: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ...',
        txt: "Sübhanallahi velhamdülillahi vela ilahe illallahu valla hu ekber. vela havle vela kuvvete illa billah. Adede ma alimallahu teâlâ. Ve zinete ma alimallahu teala. Ve milema alimallahu teala.",
        faz: "Gecesini gündüzünü 24 saat zikirle geçirenden daha efdaldir. Günahlar dökülür.",
        src: 'Mektebun / Zikir',
        k: 'Günde 1 kere',
      },
      {
        id: 'ks_ek2',
        t: 'Göz Şifası İçin Sünnet Dua',
        ar: 'شِفَاءٌ مِنْ كُلِّ دَاءٍ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ',
        txt: "Yeni ayı ilk gördüğünde veya kerahat vaktinde sağ eliyle gözlerini mesh ederek 10 Fatiha ve 3 İhlas oku. Sonunda: 'şifaün min külli daa-in birahmetike ya erhamerrahimiin' de.",
        faz: 'Göz şikayetlerinden kurtuluş ve sıhhat sağlar.',
        src: 'Peygamber Efendimiz (s.a.v)',
        k: '7 defa',
      },
    ],
  },

  kusluk: {
    name: 'İşrak / Kuşluk Vakti',
    icon: '🌅',
    kerahat: false,
    desc: 'Kerahat vakti bittikten sonra öğle ezanına kadar olan bereketli vakit. İşrak ve Kuşluk namazı kılınabilir.',
    amels: [
      {
        id: 'ku1',
        t: 'Kuşluk (Duhâ) Namazı',
        en_t: 'Duha (Forenoon) Prayer',
        ur_t: 'نماز چاشت (ضحی)',
        ar: 'صَلَاةُ الضُّحَى — ٢ إِلَى ١٢ رَکْعَة',
        txt: "Güneş doğup iyice yükseldikten sonra öğleye yakın:\n2 ila 12 rekat arası kılınır.\n\nHadis: \"Her gün sadaka gerektiren 360 eklem için kuşluk namazı bütün bu sadakaya kâfi gelir.\"",
        ur_txt: "سورج اچھی طرح طلوع ہونے کے بعد ظہر سے پہلے 2 سے 12 رکعت تک ادا کی جاتی ہے۔",
        faz: "Vücudun 360 eklemi için sadaka — günlük şükür namazı",
        en_faz: "Charity for the 360 joints of the body — daily gratitude prayer",
        ur_faz: "جسم کے 360 جوڑوں کا صدقہ — روزانہ شکرانے کی نماز۔",
        src: 'Hadis-i Şerif',
        k: '2-12 rekat',
      },
      {
        id: 'ku_ek1',
        t: 'Fatiha Suresi’nin Hicri Rızık Sırrı',
        ar: 'فَاتِحَةُ الشَّرِيفَة — ٧٠-١٠×',
        txt: "Hicri ayın ilk haftası Pazar 70, Pzt 60, Salı 50, Çrş 40, Prş 30, Cuma 20, Cmt 10 kere Fatiha okumak.",
        faz: 'Maddi ve manevi rızık bolluğu, bereket ve kapıların açılması için tecrübe edilmiştir.',
        src: 'Muhammed Hakkı en Nazilli',
        k: 'Haftalık vird',
      },
      {
        id: 'ku_ek2',
        t: 'Zenginlik ve Maddi Sıkıntı İçin (Ya Muğni)',
        ar: 'يَا مُغْنِي — ١١٠٠×',
        txt: "Arabi ayın ilk Cuma gecesi başlayarak 41 gün yatsıdan sonra 1100 defa 'Ya Muğni' zikri.",
        faz: 'Maddi sıkıntılardan kurtulur, rızkı bollaşır, kalbi kanaatle dolar.',
        src: 'Mektebun / Havas',
        k: '1100 kere',
      },
    ],
  },

  ogle: {
    name: 'Öğle Namazı Sonrası',
    icon: '☀️',
    kerahat: false,
    desc: "Öğle namazından sonra ikindiye kadar. Kur'an, salevat ve zikir için güzel bir vakit.",
    amels: [
      {
        id: 'og1',
        t: 'Namaz Sonrası Tesbihat',
        en_t: 'Post-Prayer Tasbih',
        ar: 'سُبْحَانَ اللهِ ٣٣ — اَلْحَمْدُ لِلّٰهِ ٣٣ — اَللهُ أَكْبَرُ ٣٣',
        txt: "Sübhanallah (33)\nElhamdülillah (33)\nAllahü Ekber (33)\n+ 1 kere: La ilahe illallahu vahdehu la şerike leh, lehül mülkü ve lehül hamdu ve hüve ala külli şey'in kadir.",
        faz: "Günahlar denizin köpüğü kadar da olsa silinir",
        en_faz: "Sins are erased even if they are as much as the foam of the sea",
        src: 'Hadis-i Şerif',
        k: '33+33+33+1',
      },
      {
        id: 'og_ek1',
        t: 'Günahsız Ölmeye Sebep 5 Tevhid',
        ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ...',
        txt: "Beşli tevhid zikri: 1. La ilahe illallahu vallahu ekber. 2. La ilahe illallahu vahdeh. 3. La ilahe illallahu la şerike leh. 4. La ilahe illallahu lehül mülkü... 5. La ilahe illallahu vela havle...",
        faz: 'Bir gün, gece veya ay içinde okuyan o süre zarfında ölürse günahsız olarak Rabbine kavuşur.',
        src: 'Ebû Hüreyre (r.a)',
        k: 'Günde 1 kere',
      },
      {
        id: 'og_ek2',
        t: 'Hüsn-ü Hâtime (İmanlı Ölüm) Ayetleri',
        ar: 'فَاتِحَة + آيَةُ الْكُرْسِي + آمَنَ الرَّسُولُ + إِخْلَاص — ١١×',
        txt: "1 Fatiha, 1 Ayetel Kürsi, 1 Amenerrasulü ve 11 İhlas suresini bir arada okumak.",
        faz: 'Ömründe bir kere dahi okusa, Allah o kişiye imanlı bir son (hüsn-ü hatime) nasip eder.',
        src: 'İmâm-ı Attâs',
        k: 'Ömürde en az 1 kere',
      },
    ],
  },

  ikindi: {
    name: 'İkindi Namazı Sonrası',
    icon: '🌤',
    kerahat: false,
    desc: "İkindi namazından sonra kerahat başlayana dek. Çarşamba günlerinde bu vakitteki dua özellikle kabul olur.",
    amels: [
      {
        id: 'ik1',
        t: 'İkindi Sonrası Tesbihat',
        en_t: 'Post-Asr Tasbih',
        ar: 'سُبْحَانَ اللهِ — اَلْحَمْدُ لِلّٰهِ — اَللهُ أَكْبَرُ',
        txt: 'Sübhanallah (33) — Elhamdülillah (33) — Allahü Ekber (33)',
        faz: 'Günahları siler, dereceyi yükseltir',
        en_faz: 'Erases sins and elevates ranks',
        src: 'Hadis-i Şerif',
        k: '33+33+33',
      },
      {
        id: 'ik_ek1',
        t: 'Rızık ve Bereket Kapıları İçin (Mektebun)',
        ar: 'إِنَّ هَذَا لَرِزْقُنَا مَا لَهُ مِنْ نَفَادٍ',
        txt: "İnne hadza lerizquna ma lehu min nefad. (Sad Suresi 54. Ayet)\n\nMeali: Şüphesiz bu, bizim verdiğimiz rızıktır. Onun bitip tükenmesi yoktur.",
        faz: 'Rızık kapılarının açılması ve bereketin artması için özellikle ikindi sonrası okunur.',
        src: 'Mektebun / Sad Suresi',
        k: '7 veya 33 kere',
      },
      {
        id: 'ik_ek2',
        t: 'Dert ve Sıkıntıları Açan Dua',
        ar: 'اللَّهُمَّ إِنِّي عَبْدُكَ، وَابْنُ عَبْدِكَ، وَابْنُ أَمَتِكَ...',
        txt: "Allahümme inni ‘abdüke, vebnü abdike, vebnü emetike, nâsiyetî biyedike mâdin fiyye hukmüke... en tec'ale'l-kur'âne rabia kalbi ve nura-sadri ve cilae huzni ve zehebe hemmi.",
        faz: 'Tam bir teslimiyetle okunduğunda dertleri ve sıkıntıları kesinlikle açar.',
        src: 'Hadis-i Şerif',
        k: '3 kere',
      },
    ],
  },

  kerahat_aksam: {
    name: 'Kerahat Vakti (Akşam)',
    icon: '⏳',
    kerahat: true,
    desc: "Güneş batımına ~45 dakika kala nafile namaz mekruhtur. Zikir ve istiğfar yapabilirsiniz.",
    amels: [
      {
        id: 'ka1',
        t: 'Akşam Öncesi İstiğfar',
        en_t: 'Istighfar Before Maghrib',
        ar: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ وَأَتُوبُ إِلَيْه',
        txt: "Esteğfirullahel azîme ve etûbu ileyk.\n(Büyük Allah'tan mağfiret dilerim ve O'na tevbe ederim.)",
        faz: 'Günahları siler, kalbi temizler',
        en_faz: 'Erases sins and purifies the heart',
        src: 'Genel',
        k: '100 kere',
      },
    ],
  },

  aksam: {
    name: 'Akşam Namazı Sonrası',
    icon: '🌆',
    kerahat: false,
    desc: "Akşam namazından sonra Yatsı'ya kadar. Akşam zikirlerinin yapılacağı bereketli zaman.",
    amels: [
      {
        id: 'ak1',
        t: 'Sabah & Akşam — 10 Kere (Akşam)',
        en_t: 'Morning & Evening — 10 Times (Evening)',
        ar: 'هُوَ اللهُ الَّذِي لَا إِلَهَ إِلَّا هُوَ',
        txt: "Hüvellahüllezi la ilahe illallahu vallahu ekber.\nSübhanallahi ve bihamdihi.\nVe la havle ve la kuvvete illa billahi azze ve celle.\nVe esteğfirullahel evvele vel ahıra vezzahira vel batıne.\nLehül mülkü ve lehül hamdu biyedihil hayru ve hüve ala külli şey'in kadir.",
        faz: '6 büyük fazilet (akşam versiyonu)',
        en_faz: '6 great virtues (evening version)',
        src: 'Zikir 18',
        k: '10 kere',
      },
      {
        id: 'ak_ek1',
        t: 'Murad ve Hacet İçin 40 Fatiha',
        ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ — ٤٠×',
        txt: "Akşam namazı ile Yatsı arasında 40 kere Fatiha Suresi okuyup gönlünce dua etmek.",
        faz: 'Her türlü hacet ve muradın kabulü için büyük bir sırdır.',
        src: 'Havas / Mektebun',
        k: '40 kere',
      },
      {
        id: 'ak_ek2',
        t: 'Sihir, Büyü ve Nazar İptali (Salih Memişoğlu)',
        ar: 'آيَةُ الْكُرْسِي + فَاتِحَة + فَلَق + نَاس — ١١×',
        txt: "Akşam veya Sabah: Bir bardak suya 11 Ayetel Kürsi, 11 Fatiha, 11 Felak-Nas, 11 'La ilahe illa ente subhaneke...', 11 'La havle...' okuyup gökyüzüne bakarak içmek.",
        faz: 'Üzerindeki sihir, musallat ve ağırlıkların gittiğini bir saat içinde hissettirir.',
        src: 'Salih Memişoğlu',
        k: '1 kere',
      },
    ],
  },

  yatsi: {
    name: 'Yatsı Namazı Sonrası',
    icon: '🌃',
    kerahat: false,
    desc: "Yatsı namazından sonra Vitir ve uyku öncesi ameller.",
    amels: [
      {
        id: 'yt1',
        t: 'Yatsı Sonrası — 100 Kere',
        en_t: 'After Isha — 100 Times',
        ar: 'سُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ',
        txt: "Sübhanellahi vel-hamdu lillahi ve la ilahe illellahu vallahu ekber.\nVe la havle ve la kuvvete ve la kudrate ve la heybete ve la azamete illa billahil aliyyil-azim.",
        faz: 'Bütün mahlukatın ibadet sevabı — borçlardan, sıkıntılardan kurtuluş',
        en_faz: 'Reward of worship of all creatures — relief from debts and hardships',
        src: 'Zikir 25',
        k: '100 kere',
      },
      {
        id: 'yt_ek1',
        t: '1000 Köle Azadına Denk Müthiş Tesbih',
        ar: 'سُبْحَانَ مَنْ يُسَبَّحُ لَهُ فِي لُجَجِ الْبِحَارِ...',
        txt: "Sübhanallahi ve bihamdihi... (Musa A.S Tesbihi ile aynı azamette bir tesbih)",
        faz: 'Günde 1 veya ayda 1 okusa, İsmail (a.s) neslinden 1000 köle azat etmiş kadar sevap alır.',
        src: 'Nüzhetü’l-mecâlis',
        k: 'Günde veya ayda 1 kere',
      },
      {
        id: 'yt_ek2',
        t: 'Dert ve Gamdan Kurtuluş İçin (Şifa Duası)',
        ar: 'بِسْمِ اللَّهِ، رَبِّيَ اللَّهُ، حَسْبِيَ اللَّهُ، تَوَكَّلْتُ عَلَى اللَّهِ...',
        txt: "Bismillâh, rabbiyallâh, Hasbiyallah, Tevekkeltu âlAllâh, i'tesamtü billâh, fevvadtü emrî ilallâh, mâşâallâh, lâ havle vela kuvvete illâ billâh.",
        faz: 'Tüm hastalıklara, dertlere şifa ve düşmana karşı güç verir. Elini alnına koyup 7 kere oku.',
        src: 'Cübbeli Ahmet Hoca',
        k: '7 kere',
      },
    ],
  },

  yatmadan: {
    name: 'Yatmadan Önce',
    icon: '😴',
    kerahat: false,
    desc: 'Uyumadan önce mutlaka yapılması tavsiye edilen ameller.',
    amels: [
      {
        id: 'ya1',
        t: '4 Faziletli Amel — Yatmadan Önce',
        en_t: '4 Virtuous Deeds Before Sleep',
        ar: 'اللَّهُمَّ صَلِّ عَلَى جَمِيعِ الْأَنْبِيَاء',
        txt: "① 3× İhlas Suresi oku → Kur'an hatmi sevabı\n② Salevat oku → Tüm Peygamberler şefaatçi olur\n   Allahümme salli ala seyyidina Muhammedin ve Ademe ve Nuhin ve İbrahime ve Musa ve İsa ve ma beynehüm...\n③ Müminler için istiğfar → Bütün Müslümanların rızasını kazan\n④ Tehlil zikri oku → 1 Hac + 1 Umre sevabı",
        faz: '4 Büyük Sevap tek seferde',
        en_faz: '4 Great Rewards in one sitting',
        src: 'Zikir 27',
        k: 'Her gece',
      },
      {
        id: 'ya2',
        t: 'Ayet-el Kürsi + Muavvizeteyn',
        ar: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّوم',
        txt: "① Ayet-el Kürsi (1 kere)\n② Felak Suresi (3 kere)\n③ Nas Suresi (3 kere)\n④ İhlas Suresi (3 kere)\n\nHer sureden sonra üfle, avuçlarını yüzüne ve vücuduna sür.",
        faz: 'Gece boyunca korunma — Şeytan uzaklaşır',
        src: 'Hadis-i Şerif',
        k: 'Her gece',
      },
      {
        id: 'ya3',
        t: 'Hicri Ayın İlk Gecesi — Mülk Suresi Sırrı (Mektebun)',
        ar: 'سُورَةُ الْمُلْكِ (تَبَارَكَ)',
        txt: "Kim Kameri (hicri) ayların ilk gecesi Tebareke (Mülk) suresini okursa, o ay içinde başına hiç bela gelmez biiznillah.\n\nKaderde varsa da hafif atlatır. Mülk suresi 30 ayettir. Her ayeti ayın bir gününe tekabül eder.",
        faz: 'Ay boyunca belalardan korunma, kaderdeki musibeti hafifletme',
        src: 'Mektebun',
        k: 'Hicri ayın ilk gecesi',
      },
    ],
  },

  ezan: {
    name: 'Ezan Vakti',
    icon: '📢',
    kerahat: false,
    desc: 'Ezan okunurken yapılacaklar. Her ezanda bu ameli yapmak büyük sevaptır.',
    amels: [
      {
        id: 'ez1',
        t: 'Ezan Duası — 2 Milyon Sevap',
        en_t: 'Athan Prayer — 2 Million Rewards',
        ar: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّة وَالصَّلَاةِ الْقَائِمَة',
        txt: "Ezanı sessizce dinle, her cümleyi tekrar et.\n\nBitişinde oku:\nAllahümme Rabbe hazihi'd-da'vetit-tammeti ves-salatil-kaime,\nati Muhammeden'il-vesîlete vel-fadîlete\nVeb'ashü makamen mahmûden'illezi ve'adteh.",
        faz: '2 Milyon Sevap — günahların silinmesi — derecenin yükselmesi',
        en_faz: '2 Million Rewards — sins erased — rank elevated',
        src: 'Zikir 9',
        k: 'Her ezanda',
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════
// KONUM BAZLI AMELLER
// ═══════════════════════════════════════════════════════════
export const LOC_DB: Record<string, Amel[]> = {
  ev: [
    {
      id: 'ev1',
      t: 'Eve Girerken',
      ar: 'بِسْمِ اللهِ وَلَجْنَا وَبِسْمِ اللهِ خَرَجْنَا',
      txt: 'Bismillahi velecna ve bismillahi haracna ve ala Rabbina tevekkelna.',
      faz: 'Şeytan giremez — bereket artar',
      src: 'Genel',
      k: '1 kere',
    },
    {
      id: 'ev2',
      t: 'Yatmadan Önce 4 Amel',
      ar: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّد وَجَمِيعِ الأَنْبِيَاء',
      txt: "① 3× İhlas → Kur'an hatmi\n② Salevat → Şefaat\n③ İstiğfar → Müminlerin rızası\n④ Tehlil zikri → Hac + Umre sevabı",
      faz: '4 büyük sevap tek seferde',
      src: 'Zikir 27',
      k: 'Her gece',
    },
  ],
  cami: [
    {
      id: 'cam1',
      t: 'Camiye Girerken (4 kere)',
      ar: 'سُبْحَانَ اللهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ',
      txt: 'Sübhanallahi velhamdülillahi ve la ilahe illallahu vallahu ekber',
      faz: "Tahiyyatü'l-mescid namazı yerine geçer",
      src: 'Zikir 44',
      k: '4 kere',
    },
    {
      id: 'cam2',
      t: 'Namaza Çıkarken — 9 Zikir',
      ar: 'بِسْمِ اللهِ الَّذِي خَلَقَنِي فَهوُ يَهْدِينِ',
      txt: "Bismillahi ellezi halakani fe hüve yehdinî\n(+ 8 devam zikri ile birlikte)",
      faz: 'Sıddık + Şehit mertebesi — tüm günahlar silinir',
      src: 'Zikir 45',
      k: "1'er kere",
    },
  ],
  carsi: [
    {
      id: 'crs1',
      t: 'Çarşıya / Pazara Girerken',
      ar: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْد',
      txt: "La ilahe illallahu vahdehu la şerike lehu.\nLehül mülkü ve lehül hamdu yuhyî ve yümitu.\nVe hüve hayyün la yemûtu. Biyedihil hayru ve hüve ala külli şey'in kadir.",
      faz: '1 Milyon Hasene + 1 Milyon günah silinir + 1 Milyon derece + Cennette ev',
      src: 'Zikir 10',
      k: 'En az 1 kere',
    },
  ],
  yolculuk: [
    {
      id: 'yol1',
      t: 'Araca Binerken',
      ar: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا',
      txt: "Bismillah — Allahü Ekber × 3\nSübhanellezi sahhara lena haza ve ma künna lehu mukrinîn.\nVe inna ila Rabbina lemünkalibûn.",
      faz: 'Yolculuk boyunca koruma',
      src: 'Genel',
      k: '1 kere',
    },
    {
      id: 'yol2',
      t: 'Kilise / Havra Görünce',
      ar: 'لَا إِلَهَ إِلَّا اللهُ وَلَا نَعْبُدُ إِلَّا اللهَ',
      txt: "La ilahe illallah. Ve la na'büdü illallah.",
      faz: "Kafirlerin sayısı kadar sevap — Sıddıklık Makamı",
      src: 'Zikir 28',
      k: '1 kere',
    },
  ],
  kabir: [
    {
      id: 'kab1',
      t: 'Kabristana Girerken',
      ar: 'اَلسَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَار',
      txt: "Esselamü aleyküm ya ehlel diyar minel mü'minîne vel müslimîn.\nVe inna inşaallahü biküm lahikûn.\nNes'elullahe lena ve leküm el-afiyeh.",
      faz: 'Kabir ehline selam ve dua',
      src: 'Hadis-i Şerif',
      k: '1 kere',
    },
  ],
  sikinti: [
    {
      id: 'sik1',
      t: 'Borçtan Kurtulmak İçin (Mektebun)',
      ar: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
      txt: "Allahümmekfini bi-halalike an haramike ve ağnini bi-fadlike ammen sivake.",
      faz: "Dağ kadar borcun olsa da Allah'ın izniyle ödenir.",
      src: 'Tirmizi / Mektebun',
      k: 'Sıkça okunur',
    },
    {
      id: 'sik2',
      t: 'Dert ve Sıkıntı Anında (Mektebun)',
      ar: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
      txt: "La ilahe illa ente sübhaneke inni küntü minez-zalimin.\n\n(Yunus Aleyhisselam'ın balığın karnındaki duası)",
      faz: 'Her türlü keder, gam ve sıkıntıdan kurtuluş sağlar.',
      src: 'Enbiya 87 / Mektebun',
      k: 'Sıkıntılı anda çokça okunur',
    },
    {
      id: 'sik3',
      t: 'Maddi ve Manevi Rızık Kapıları İçin',
      ar: 'يَا رَزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ',
      txt: "İnne hadza lerizquna ma lehu min nefad.\n\n(Şüphesiz bu, bizim verdiğimiz rızıktır. Onun bitip tükenmesi yoktur.)",
      faz: 'Rızık ve bereket kapıları ardına kadar açılır.',
      src: 'Sad Suresi 54 / Mektebun',
      k: 'Her gün sabah veya işe başlarken',
    },
    {
      id: 'sik4',
      t: 'Hastalık ve Şifa Duası',
      ar: 'أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ وَاشْفِ أَنْتَ الشَّافِي',
      txt: "Ezhibil-be'se Rabben-nasi veşfi enteş-Şafi.\nLa şifae illa şifaüke, şifaen la yuğadiru sekamen.",
      faz: 'Hastalıktan, vebadan ve kederden kurtuluş şifası',
      src: 'Buhari / Mektebun',
      k: 'Hasta olan kişiye 7 kere okunur',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// GÜN BAZLI AMELLER
// ═══════════════════════════════════════════════════════════
export const DAYS: Day[] = [
  { name: 'Pazar', en: 'Sunday', special: null, fasting: false, amels: [] },
  {
    name: 'Pazartesi', en: 'Monday',
    special: "Hz. Peygamber'in doğduğu ve vahyin başladığı gün",
    fasting: true,
    amels: [
      {
        id: 'mon1', t: 'Pazartesi Orucu (Sünnet)',
        ur_t: 'پیر کا روزہ (سنت)',
        ar: 'نَوَیْتُ صَوْمَ یَوْمِ الاِثْنَیْن سُنَّة',
        txt: "Pazartesi orucu Peygamberimiz'in devam ettiği bir sünnettir.\n\"Bu günü neden oruçla geçiriyorsunuz?\" sorusuna: \"O gün doğdum ve o gün vahiy bana indi\" buyurdu.",
        ur_txt: "پیر کا روزہ رسول اللہ صلی اللہ علیہ وسلم کی ایک مستقل سنت ہے۔",
        faz: 'Sünnet orucu sevabı — büyük fazilet',
        ur_faz: 'سنت روزے کا ثواب — عظیم فضیلت',
        src: 'Hadis-i Şerif', k: 'Sünnet orucu',
      },
    ],
  },
  { name: 'Salı', en: 'Tuesday', special: null, fasting: false, amels: [] },
  {
    name: 'Çarşamba', en: 'Wednesday',
    special: 'Dua kabul günü — Öğle ile İkindi arasındaki dua kabul olur',
    fasting: false,
    amels: [
      {
        id: 'wed1', t: 'Çarşamba Günü Özel Dua Vakti',
        ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ بِاسْمِكَ الأَعْظَم',
        txt: "Hz. Cabir'in rivayetine göre:\nRasulullah (s.a.v.) Çarşamba günü Mescid-i Dırâr'da öğle ile ikindi arasında üç kez dua etti ve duası kabul oldu.\n\nBu vakitte şahsi ihtiyaçlarını samimiyetle Allah'a arz et.\nÖzellikle ikindi namazından sonra bu dua vaktini değerlendir.",
        faz: 'Çarşamba öğle-ikindi arası dua kabul olur', src: 'Sahih rivayet', k: 'Öğle-İkindi arası dua et',
      },
      {
        id: 'wed2', t: 'Günlük Salevat',
        ar: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّد',
        txt: 'Allahümme salli ala seyyidina Muhammed ve ala ali seyyidina Muhammed.',
        faz: 'Her salevat 10 rahmet getirir', src: 'Hadis-i Şerif', k: 'Çok oku',
      },
    ],
  },
  {
    name: 'Perşembe', en: 'Thursday',
    special: "Amellerin Allah'a yükseltildiği gün — Salevat and oruç günü",
    fasting: true,
    amels: [
      {
        id: 'thu1', t: "Perşembe İkindisinden Sonra Salevat",
        ar: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّد',
        txt: 'Allahümme salli ala seyyidina Muhammed ve ala ali seyyidina Muhammed.',
        faz: 'Perşembe ikindi sonrası özel salevat vakti', src: 'Salevat 48', k: 'Çok oku',
      },
      {
        id: 'thu2', t: 'Cuma Gecesi — 1000 Salevat',
        ar: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّد — ١٠٠٠×',
        txt: "Perşembeden Cumaya geçen gece 1000 kere salevat oku.",
        faz: 'Büyük fazilet ve derece', src: 'Salevat 50', k: '1000 kere gece',
      },
    ],
  },
  {
    name: 'Cuma', en: 'Friday',
    special: "Haftanın efendisi — Cennet ehlinin Allah'ı göreceği gün",
    fasting: false,
    amels: [
      {
        id: 'fri1', t: 'Cuma Günü Çok Salevat',
        ar: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّد',
        txt: 'Allahümme salli ala seyyidina Muhammed ve ala ali seyyidina Muhammed.',
        faz: '80 yıllık günah affettirir', src: 'Salevat 14', k: 'Çok oku',
      },
      {
        id: 'fri2', t: 'Kehf Suresi',
        ar: 'سُورَةُ الكَهْف',
        txt: "Cuma günü Kehf Suresi'ni oku.\n\nSabah namazından güneş batımına kadar okunması tavsiye edilir.",
        faz: 'İki Cuma arası nurla çevrilir', src: 'Hadis-i Şerif', k: 'Bir kere',
      },
      {
        id: 'fri3', t: 'Dua Vakti — İkindi Sonrası',
        ar: 'وَمِنْهَا سَاعَةٌ لَا يَرُدُّهَا اللهُ',
        txt: "Cuma günü içinde özel bir dua saati vardır.\nRivayete göre ikindi namazından akşama kadar.\nBu vakitte Rabbine yönel — ihtiyaçlarını arz et.",
        faz: 'Bu vakitte yapılan dua reddedilmez', src: 'Hadis-i Şerif', k: 'Bu vakitte dua et',
      },
    ],
  },
  { name: 'Cumartesi', en: 'Saturday', special: null, fasting: false, amels: [] },
];

export const HIJRI_SPECIAL: Record<number, { name: string; badge: string; amels: Amel[] }> = {
  7: {
    name: 'Receb', badge: 'Üç Kutsal Ayın İlki',
    amels: [
      {
        id: 'rec1', t: 'Receb — Öğle-İkindi Arası İstiğfar',
        ar: 'أَسْتَغْفِرُ اللهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّوم',
        txt: 'Esteğfirullahellezi la ilahe illa hüvel hayyel kayyume ve etubu ileyh',
        faz: 'Büyük istiğfar sevabı', src: 'İstiğfar 16', k: '100 kere (Öğle-İkindi arası)',
      },
    ],
  },
  8: {
    name: 'Şaban', badge: 'Berat Ayı',
    amels: [
      {
        id: 'sbn1', t: 'Şaban — 1000 Sene Sevabı',
        ar: 'سُبْحَانَ اللهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ',
        txt: 'Sübhanallahi vel hamdülillahi ve la ilahe illallahu vallahu ekber',
        faz: '1000 Sene ibadet sevabı', src: 'Zikir 35', k: '100 kere',
      },
    ],
  },
  9: {
    name: 'Ramazan', badge: 'Oruç Ayı',
    amels: [
      {
        id: 'ram1', t: "Ramazan'ın 4 Özel Zikri",
        ar: 'لَا إِلَهَ إِلَّا اللهُ — أَسْتَغْفِرُ اللهَ — اللَّهُمَّ إِنَّكَ عَفُوٌّ',
        txt: "① La ilahe illallah\n② Esteğfirullah\n③ Allahümme innike afüvvün tuhibbul afve fa'fu anni\n④ Allahümme inni es'elükel cennete ve eûzü bike minen-nar",
        faz: 'Ramazanda çok yapılması gereken 4 zikir', src: 'Zikir 36', k: 'Çok',
      },
    ],
  },
  10: {
    name: 'Şevval', badge: 'Bayram Sonrası Ay',
    amels: [
      {
        id: 'sev1', t: 'Uteka (Âzatlılar) Namazı (Mektebun)',
        ar: 'صَلَاةُ الْعُتَقَاءِ بَعْدَ الْعِيد',
        txt: 'Şevval ayı içerisinde gece veya gündüz 8 rekat kılınır.\nHer rekatında 1 Fatiha ve 15 İhlas Suresi okunur.\nNamaz bitince 70 kere "Sübhanellah" ve 70 kere Salevât-ı Şerife okunur.',
        faz: 'Kalbine hikmet pınarları akar, dünyanın derdini ve devasını anlar.', src: 'Enes b. Malik (r.a) / Mektebun', k: 'Şevval içinde 8 rekat',
      },
      {
        id: 'sev2', t: 'Şevval 6 Gün Orucu',
        ar: 'صِيَامُ سِتَّةِ أَيَّامٍ مِنْ شَوَّالٍ',
        txt: 'Ramazan orucunu tutup ardından Şevval ayında 6 gün oruç tutan kişi, bütün yılı oruçlu geçirmiş gibi sevap kazanır.',
        faz: 'Tüm yılı oruçlu geçirme sevabı', src: 'Müslim', k: '6 gün (peşpeşe veya ayrı)',
      },
    ],
  },
  11: {
    name: 'Zilkade', badge: 'Haram Aylar Başlangıcı',
    amels: [
      {
        id: 'zlk1', t: 'Zilkade İlk Gece Nafile Namazı (Mektebun)',
        ar: 'صَلَاةُ رَكْعَتَيْنِ كُلُّ رَكْعَةٍ بِالزَّلْزَلَةِ',
        txt: 'Bu mübarek haram ayın ilk gecesinde İKİ REKATTA BİR SELAM İLE 30 rekat namaz kılınır. Her rekatında 1 Fatiha, 1 Zilzal Sûresi okunur. (Zilzal bilmeyen İhlas okuyabilir).\nNamaz bitince Amme Sûresi (Nebe) okunur.',
        faz: 'Haram ay faziletine tam erişim', src: 'Cevâhiru’l-hams / Mektebun', k: 'İlk gece 30 rekat',
      },
      {
        id: 'zlk2', t: 'Haram Aylar Orucu (Mektebun)',
        ar: 'صَوْمُ الْأَشْهُرِ الْحُرُم',
        txt: 'Her kim haram aylarda (Zilkade, Zilhicce, Muharrem, Recep) Perşembe, Cuma, Cumartesi olmak üzere üç günü peşpeşe oruçlu geçirirse büyük mükâfat alır.',
        faz: '900 senelik ibadet sevabı yazılır', src: 'Taberânî / Mektebun', k: 'Perşembe-Cuma-Cumartesi',
      },
    ],
  },
  12: {
    name: 'Zilhicce', badge: 'Hac Ayı — İlk 10 Gün',
    amels: [
      {
        id: 'zlh1', t: 'Zilhicce İlk 10 Günü Zikir',
        ar: 'سُبْحَانَ اللهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَر',
        txt: 'Sübhanallah — Elhamdülillah — La ilahe illallah — Allahü Ekber',
        faz: "Yılın en faziletli 10 günü — her amelin sevabı kat kat artar",
        src: 'Hadis-i Şerif', k: 'Çok oku',
      },
      {
        id: 'zlh2', t: 'Haram Aylar Orucu (Mektebun)',
        ar: 'صَوْمُ الْأَشْهُرِ الْحُرُم',
        txt: 'Her kim haram aylarda (Zilkade, Zilhicce, Muharrem, Recep) Perşembe, Cuma, Cumartesi olmak üzere üç günü peşpeşe oruçlu geçirirse büyük mükâfat alır.',
        faz: '900 senelik ibadet sevabı yazılır', src: 'Taberânî / Mektebun', k: 'Perşembe-Cuma-Cumartesi',
      },
    ],
  },
};

export const LOCATIONS = [
  { key: 'ev',        icon: '🏠', name: 'Ev' },
  { key: 'cami',     icon: '🕌', name: 'Cami / Mescid' },
  { key: 'carsi',    icon: '🛒', name: 'Çarşı / Market' },
  { key: 'yolculuk', icon: '✈️', name: 'Yolculuk' },
  { key: 'kabir',    icon: '🪦', name: 'Kabir Ziyareti' },
  { key: 'sikinti',  icon: '🤲', name: 'Özel Durumlar / Sıkıntı Anı' },
];

export const PRAYER_LIST = [
  { n: 'İmsak',  k: 'Fajr'    as const },
  { n: 'Güneş', k: 'Sunrise'  as const },
  { n: 'Öğle',  k: 'Dhuhr'   as const },
  { n: 'İkindi',k: 'Asr'     as const },
  { n: 'Akşam', k: 'Maghrib' as const },
  { n: 'Yatsı', k: 'Isha'    as const },
];

export const TR_MONTHS = [
  'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
  'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık',
];
