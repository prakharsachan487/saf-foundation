/**
 * SAF FOUNDATION - BILINGUAL LANGUAGE ENGINE (ENGLISH / HINDI)
 * Full seamless translation system with persistent language selection
 */

const SAF_TRANSLATIONS = {
  en: {
    // Nav
    nav_about: 'About',
    nav_founder: 'Founder',
    nav_work: 'Our Work',
    nav_map: 'Impact Map',
    nav_campaigns: 'Campaigns',
    nav_stories: 'Stories',
    nav_governance: 'Governance & Trust',
    nav_help: 'Ways to Help',
    nav_donate: 'Donate Now',
    tax_exempt_badge: '80G Tax Exempted • 12A Certified',

    // Hero
    hero_badge: 'Grassroots Empowerment Across India',
    hero_title: 'Empowering Communities, Transforming Lives',
    hero_desc: 'Dedicated to uplifting vulnerable families across India through quality education, nutritional security, healthcare, and sustainable livelihood programs.',
    hero_donate: 'Donate Now',
    hero_explore: 'Explore Our Work',
    hero_stat1_num: '135+',
    hero_stat1_lbl: 'Active Projects',
    hero_stat2_num: '373k+',
    hero_stat2_lbl: 'Lives Changed',
    hero_stat3_num: '2,900+',
    hero_stat3_lbl: 'Volunteers',

    // Impact Numbers
    impact_title: 'Key Impact Numbers',
    impact_subtitle: 'Transparent metrics reflecting our boots-on-the-ground footprint across India.',
    metric1_lbl: 'Lives Impacted',
    metric2_lbl: 'Families Supported',
    metric3_lbl: 'Projects Completed',
    metric4_lbl: 'Villages & Communities',
    metric5_lbl: 'Active Volunteers',

    // About
    about_title: 'About S. A. Foundation',
    about_desc: 'S. A. Foundation is dedicated to breaking cycles of intergenerational poverty through community-owned, data-driven social models in education, healthcare, and sustainable livelihood.',
    about_mission_title: 'Mission',
    about_mission_desc: 'Build sustainable community ecosystems that provide holistic nourishment and education to every child.',
    about_vision_title: 'Vision',
    about_vision_desc: 'An inclusive India where vulnerable families achieve dignity, economic freedom, and self-reliance.',
    about_btn: 'Meet Our Leadership',
    pillar1: 'Community Growth',
    pillar2: 'Healthcare',
    pillar3: 'Education',
    pillar4: 'Nutrition',

    // Founder
    founder_title: 'Leadership & Vision — Anand Singh',
    founder_subtitle: 'Visionary leadership fusing corporate execution rigor with deep grassroots empathy.',
    founder_name: 'Anand Singh',
    founder_tagline: 'Founder & Managing Trustee, S. A. Foundation',
    founder_quote: '“Social responsibility of each individual builds and economically empowers communities.”',
    founder_quote_author: '— Anand Singh',
    founder_bio: 'Anand Singh channeled his entrepreneurial success into building scalable grassroots systems across India. Under his leadership, SAF Foundation has mobilized hundreds of millions in relief aid, established digital classrooms, and fostered self-reliant village cooperatives.',
    founder_connect_btn: 'Connect With Founder',
    founder_gallery_title: 'Authentic Ground Footprint & Field Visits',
    founder_stat1_lbl: 'Rural Reach',
    founder_stat2_lbl: 'Impact Imprints',
    founder_stat3_lbl: 'Years of Service',
    founder_stat4_lbl: 'Direct Initiatives',
    founder_stat5_lbl: 'Capital Mobilized',

    // Areas
    areas_title: 'Our Areas of Work',
    areas_subtitle: 'Scalable grassroots interventions designed for measurable, generational impact.',
    area1_title: 'Education',
    area1_desc: 'Digital classrooms, STEM kits, and girl child study scholarships across rural schools.',
    area2_title: 'Food & Nutrition',
    area2_desc: 'Hot nutritious mid-day meals and monthly ration kits for vulnerable families.',
    area3_title: 'Healthcare',
    area3_desc: 'Mobile health dispensaries, diagnostic health camps, and maternal wellness aid.',
    area4_title: 'Livelihood & Employment',
    area4_desc: 'Vocational training workshops, digital skills, and micro-business incubation.',
    area5_title: 'Women & Child Welfare',
    area5_desc: 'Self-help groups, solar sewing units, menstrual health, and child protection.',
    area6_title: 'Emergency Relief',
    area6_desc: 'Rapid response teams delivering clean drinking water, food, and rescue during floods.',

    // Map
    map_title: 'Our Footprint Across India',
    map_subtitle: 'Deep grassroots presence with our primary flagship operations in Bihar and active initiatives across 30+ States.',
    map_flagship_badge: 'Ground Zero: Patna, Bihar • Field Operations',
    map_heading: 'Measurable Footprint in Every Corner',
    map_desc: 'From flood-prone districts and malnutrition rehabilitation in Bihar to arid village water security in Rajasthan and tribal education in Odisha, our ground teams execute daily grassroots transformation.',
    map_stat1_lbl: 'Active Field Projects',
    map_stat2_lbl: 'Villages & Grams',
    map_stat3_lbl: 'Model Digital Schools',
    map_stat4_lbl: 'Field Resource Centres',
    map_legend_bihar: 'Bihar (Primary Flagship Hub)',
    map_legend_all: 'Active Ground Operations (30+ States)',

    // Campaigns
    campaigns_title: 'Featured Campaigns',
    campaigns_subtitle: 'Directly fund targeted initiatives bringing immediate transformation to village communities.',
    camp1_title: 'Smart Tabs for 5,000 Rural Girls',
    camp1_desc: 'Equipping rural girl students with interactive digital curriculum tablets and mentoring.',
    camp1_raised: 'Raised: ₹19.85 Lakh',
    camp1_goal: '79% (Goal: ₹25L)',
    camp2_title: 'Bihar Flood Clean Water & Ration Kits',
    camp2_desc: 'Deploying emergency rescue units and delivering 50,000 clean water packs to displaced families.',
    camp2_raised: 'Raised: ₹31.50 Lakh',
    camp2_goal: '90% (Goal: ₹35L)',
    camp3_title: '1,000 Women Solar Craft Centers',
    camp3_desc: 'Setting up community sewing hubs with digital machines and direct market linkage.',
    camp3_raised: 'Raised: ₹16.40 Lakh',
    camp3_goal: '82% (Goal: ₹20L)',
    camp_btn: 'Support Campaign',

    // Stories
    stories_title: 'Real Stories of Transformation',
    stories_subtitle: 'Real stories of resilience, restored health, and transformed lives.',
    story1_title: 'Devi’s Story of Hope',
    story1_desc: 'How timely clinical nutrition and pediatric care saved her infant from severe acute malnutrition in rural Bihar.',
    story2_title: 'Shanti’s Leadership Journey',
    story2_desc: 'Leading 120 women in her village to erect solar clean water wells and launch collective farms.',
    story3_title: 'Raju & Amit’s Education Breakthrough',
    story3_desc: 'From laboring at local kilns to securing district merit ranks with SAF smart tablets and scholarships.',
    story_btn: 'Read Story',

    // Governance
    trans_title: 'Governance & Transparency',
    trans_subtitle: '100% compliant, audited, and tax-exempt NGO in India.',
    trans_heading: 'Highest Regulatory & Ethical Standards',
    trans_programs: 'Direct Programs',
    trans_ops: 'Ops',
    trans_admin: 'Admin',
    trans_donors_lbl: 'Donors & Verified Audits',
    trans_overhead_lbl: 'Overhead Ratio',
    trans_badge1: '80G Tax Exemption',
    trans_badge2: '12A Certified',
    trans_badge3: 'FCRA Approved',
    trans_badge4: 'CSR-1 Registered',

    // Ways to Help
    help_title: 'Ways to Get Involved',
    help_subtitle: 'Simple, impactful pathways to be a part of the nation-building journey.',
    help1_title: 'Donate',
    help1_desc: 'Make a 50% 80G tax-exempt donation towards education, food, or emergency relief.',
    help1_btn: 'Donate',
    help2_title: 'Volunteer',
    help2_desc: 'Join our on-ground volunteer force across 30+ states in teaching and relief camps.',
    help2_btn: 'Volunteer',
    help3_title: 'Sponsor a Child',
    help3_desc: 'Sponsor a rural child\'s annual schooling or provide year-round ration security.',
    help3_btn: 'Sponsor Now',
    help4_title: 'Partner With Us',
    help4_desc: 'Collaborate on compliant Schedule VII CSR projects with audited governance.',
    help4_btn: 'Partner With Us',
    help5_title: 'Fund a Campaign',
    help5_desc: 'Fund an entire smart digital classroom, solar well, or health dispensary.',
    help5_btn: 'Fund a Campaign',
    help6_title: 'Spread Awareness',
    help6_desc: 'Amplify grassroots stories as a digital ambassador on social networks.',
    help6_btn: 'Spread Word',

    // Testimonials
    testi_title: 'Community Voices',
    testi_subtitle: 'What our institutional partners, village mukhiyas, and beneficiaries say.',
    testi1_quote: '“Partnering with S. A. Foundation on our corporate CSR literacy mandate transformed 45 government schools in 6 months.”',
    testi1_author: 'Rajesh Kulkarni',
    testi1_role: 'Head of CSR, Tech Enterprise',
    testi2_quote: '“During the severe Kosi flood season, SAF Foundation\'s relief boat saved over 400 elderly and children in our Panchayat.”',
    testi2_author: 'Mukesh Sahni',
    testi2_role: 'Gram Mukhiya, Bihar',
    testi3_quote: '“Their 85% direct execution ratio and transparent digital receipts give us complete trust to donate every month.”',
    testi3_author: 'Sunita Mehta',
    testi3_role: 'Philanthropist & Regular Donor',

    // News
    news_title: 'Latest News & Updates',
    news_subtitle: 'Recent field dispatches and press releases from SAF ground operations.',
    news1_tag: 'August 2026 • Education',
    news1_title: 'SAF Inaugurates 25 New Solar Smart Labs',
    news1_desc: 'Over 3,500 students now access interactive digital science modules across underserved schools.',
    news2_tag: 'July 2026 • Emergency Relief',
    news2_title: 'Monsoon Operation Dispatches 50,000 Ration Kits',
    news2_desc: 'Ground teams deploy medical vans and dry rations across flood-inundated regions.',
    news3_tag: 'June 2026 • Women Livelihood',
    news3_title: 'Women Solar Craft Hubs Cross ₹1 Crore Revenue',
    news3_desc: 'Empowering 400 rural women artisans with direct market linkage to retail partners.',

    // Mega CTA & Footer
    mega_cta_title: 'Together, We Can Create Change.',
    mega_cta_desc: 'Join Anand Singh and the S. A. Foundation in building an equitable, educated, and prosperous India.',
    mega_cta_donate: 'Donate Now',
    mega_cta_volunteer: 'Become a Volunteer',
    mega_cta_partner: 'Partner With Us',
    footer_about: 'S. A. Foundation is a national non-profit organization dedicated to empowering grassroots communities across India.',
    footer_quick_links: 'Quick Links',
    footer_contact_info: 'Contact Info',
    footer_hq: 'HQ: New Delhi - 110001',
    footer_field: 'Field: Patna, Bihar - 800001',
    footer_phone: '+91 11 4987 6500',
    footer_email: 'contact@saf-foundation.org',
    footer_newsletter: 'Newsletter Signup',
    footer_subscribe_btn: 'Subscribe',
    footer_email_placeholder: 'Your Email Address',
    footer_copyright: 'Copyright © 2026 S. A. FOUNDATION (SAF). All Rights Reserved.'
  },

  hi: {
    // Nav
    nav_about: 'हमारे बारे में',
    nav_founder: 'संस्थापक',
    nav_work: 'हमारे कार्य',
    nav_map: 'प्रभाव मानचित्र',
    nav_campaigns: 'अभियान',
    nav_stories: 'कहानियाँ',
    nav_governance: 'पारदर्शिता एवं सुशासन',
    nav_help: 'सहयोग के तरीके',
    nav_donate: 'दान करें',
    tax_exempt_badge: '80G आयकर छूट • 12A प्रमाणित',

    // Hero
    hero_badge: 'भारत भर में जमीनी सशक्तिकरण',
    hero_title: 'समुदायों का सशक्तिकरण, जीवन में परिवर्तन',
    hero_desc: 'गुणवत्तापूर्ण शिक्षा, पोषण सुरक्षा, स्वास्थ्य सेवा और टिकाऊ आजीविका कार्यक्रमों के माध्यम से भारत भर में जरूरतमंद परिवारों के उत्थान हेतु समर्पित।',
    hero_donate: 'अभी दान करें',
    hero_explore: 'हमारा कार्य देखें',
    hero_stat1_num: '135+',
    hero_stat1_lbl: 'सक्रिय परियोजनाएं',
    hero_stat2_num: '373k+',
    hero_stat2_lbl: 'परिवर्तित जीवन',
    hero_stat3_num: '2,900+',
    hero_stat3_lbl: 'स्वयंसेवक',

    // Impact Numbers
    impact_title: 'प्रमुख प्रभाव आंकड़े',
    impact_subtitle: 'भारत भर में हमारे जमीनी कार्यों को दर्शाते पारदर्शी एवं प्रामाणिक आंकड़े।',
    metric1_lbl: 'प्रभावित जीवन',
    metric2_lbl: 'समर्थित परिवार',
    metric3_lbl: 'पूर्ण परियोजनाएं',
    metric4_lbl: 'गांव एवं समुदाय',
    metric5_lbl: 'सक्रिय स्वयंसेवक',

    // About
    about_title: 'एस. ए. फाउंडेशन के बारे में',
    about_desc: 'एस. ए. फाउंडेशन शिक्षा, स्वास्थ्य सेवा और टिकाऊ आजीविका में समुदाय-स्वामित्व वाले, डेटा-संचालित सामाजिक मॉडलों के माध्यम से पीढ़ीगत गरीबी के चक्र को तोड़ने के लिए समर्पित है।',
    about_mission_title: 'उद्देश्य (Mission)',
    about_mission_desc: 'टिकाऊ सामुदायिक व्यवस्था का निर्माण करना जो प्रत्येक बच्चे को समग्र पोषण और गुणवत्तापूर्ण शिक्षा प्रदान करे।',
    about_vision_title: 'दूरदर्शिता (Vision)',
    about_vision_desc: 'एक समावेशी भारत जहां कमजोर और जरूरतमंद परिवार सम्मान, आर्थिक स्वतंत्रता और आत्मनिर्भरता प्राप्त करें।',
    about_btn: 'हमारे नेतृत्व से मिलें',
    pillar1: 'सामुदायिक विकास',
    pillar2: 'स्वास्थ्य सेवा',
    pillar3: 'गुणवत्तापूर्ण शिक्षा',
    pillar4: 'पोषण सुरक्षा',

    // Founder
    founder_title: 'नेतृत्व एवं विज़न — आनंद सिंह',
    founder_subtitle: 'गहरी जमीनी संवेदनशीलता के साथ कॉर्पोरेट कार्यकुशलता का अनूठा संगम।',
    founder_name: 'आनंद सिंह',
    founder_tagline: 'संस्थापक एवं प्रबंध न्यासी, एस. ए. फाउंडेशन',
    founder_quote: '“प्रत्येक व्यक्ति की सामाजिक जिम्मेदारी ही समुदायों का निर्माण और उन्हें आर्थिक रूप से सशक्त बनाती है।”',
    founder_quote_author: '— आनंद सिंह',
    founder_bio: 'आनंद सिंह ने अपनी उद्यमशीलता की सफलता को भारत भर में बड़े पैमाने पर जमीनी सामाजिक प्रणालियों के निर्माण में लगाया। उनके नेतृत्व में, एसएएफ फाउंडेशन ने करोड़ों की राहत सहायता पहुंचाई, डिजिटल स्मार्ट कक्षाएं स्थापित कीं और आत्मनिर्भर ग्रामीण सहकारी समितियों को बढ़ावा दिया।',
    founder_connect_btn: 'संस्थापक से जुड़ें',
    founder_gallery_title: 'प्रामाणिक जमीनी कार्य एवं क्षेत्रीय दौरे',
    founder_stat1_lbl: 'ग्रामीण पहुंच',
    founder_stat2_lbl: 'प्रभाव के निशान',
    founder_stat3_lbl: 'वर्षों की सेवा',
    founder_stat4_lbl: 'प्रत्यक्ष पहल',
    founder_stat5_lbl: 'जुटाया गया पूंजी कोष',

    // Areas
    areas_title: 'हमारे कार्य क्षेत्र',
    areas_subtitle: 'मापने योग्य और पीढ़ीगत प्रभाव के लिए तैयार किए गए जमीनी हस्तक्षेप।',
    area1_title: 'शिक्षा',
    area1_desc: 'ग्रामीण स्कूलों में डिजिटल स्मार्ट कक्षाएं, एसटीईएम किट और बालिकाओं के लिए अध्ययन छात्रवृत्तियां।',
    area2_title: 'भोजन एवं पोषण',
    area2_desc: 'जरूरतमंद परिवारों के लिए पौष्टिक गर्म भोजन और मासिक राशन किट सहायता।',
    area3_title: 'स्वास्थ्य सेवा',
    area3_desc: 'मोबाइल स्वास्थ्य डिस्पेंसरी, डायग्नोस्टिक स्वास्थ्य शिविर और मातृ स्वास्थ्य देखभाल।',
    area4_title: 'आजीविका एवं रोजगार',
    area4_desc: 'व्यावसायिक प्रशिक्षण कार्यशालाएं, डिजिटल कौशल और सूक्ष्म व्यवसाय इनक्यूबेशन।',
    area5_title: 'महिला एवं बाल कल्याण',
    area5_desc: 'स्वयं सहायता समूह, सौर सिलाई केंद्र, मासिक धर्म स्वच्छता और बाल संरक्षण।',
    area6_title: 'आपदा राहत',
    area6_desc: 'बाढ़ और आपदाओं के दौरान स्वच्छ पेयजल, भोजन और बचाव कार्य पहुंचाने वाली त्वरित प्रतिक्रिया टीमें।',

    // Map
    map_title: 'भारत भर में हमारी पहुंच',
    map_subtitle: 'बिहार में हमारे प्राथमिक फ्लैगशिप केंद्र और 30+ राज्यों में सक्रिय पहलों के साथ मजबूत जमीनी उपस्थिति।',
    map_flagship_badge: 'ग्राउंड जीरो: पटना, बिहार • क्षेत्रीय संचालन केंद्र',
    map_heading: 'प्रत्येक कोने में मापने योग्य जमीनी कार्य',
    map_desc: 'बिहार में बाढ़ ग्रस्त क्षेत्रों और कुपोषण निवारण से लेकर राजस्थान के सूखा प्रभावित गांवों में जल सुरक्षा और ओडिशा में आदिवासी शिक्षा तक, हमारी टीमें रोजाना बदलाव ला रही हैं।',
    map_stat1_lbl: 'सक्रिय क्षेत्रीय परियोजनाएं',
    map_stat2_lbl: 'गांव एवं बस्तियां',
    map_stat3_lbl: 'मॉडल डिजिटल स्कूल',
    map_stat4_lbl: 'क्षेत्रीय संसाधन केंद्र',
    map_legend_bihar: 'बिहार (प्राथमिक फ्लैगशिप केंद्र)',
    map_legend_all: 'सक्रिय जमीनी कार्य (30+ राज्य)',

    // Campaigns
    campaigns_title: 'प्रमुख अभियान',
    campaigns_subtitle: 'ग्रामीण समुदायों में तत्काल सकारात्मक बदलाव लाने वाली लक्षित पहलों को सीधे समर्थन दें।',
    camp1_title: '5,000 ग्रामीण बालिकाओं के लिए स्मार्ट टैब',
    camp1_desc: 'ग्रामीण छात्राओं को डिजिटल अध्ययन टैबलेट और शैक्षणिक मार्गदर्शन प्रदान करना।',
    camp1_raised: 'एकत्रित: ₹19.85 लाख',
    camp1_goal: '79% (लक्ष्य: ₹25 लाख)',
    camp2_title: 'बिहार बाढ़ स्वच्छ जल एवं राशन किट',
    camp2_desc: 'आपातकालीन बचाव दल और विस्थापित परिवारों को 50,000 स्वच्छ जल पैकेट वितरण।',
    camp2_raised: 'एकत्रित: ₹31.50 लाख',
    camp2_goal: '90% (लक्ष्य: ₹35 लाख)',
    camp3_title: '1,000 महिला सौर शिल्प केंद्र',
    camp3_desc: 'डिजिटल सिलाई मशीनों और सीधे बाजार लिंकेज के साथ सामुदायिक सिलाई केंद्र स्थापना।',
    camp3_raised: 'एकत्रित: ₹16.40 लाख',
    camp3_goal: '82% (लक्ष्य: ₹20 लाख)',
    camp_btn: 'अभियान का समर्थन करें',

    // Stories
    stories_title: 'सच्ची बदलाव की कहानियां',
    stories_subtitle: 'संघर्ष, स्वस्थ जीवन और सकारात्मक बदलाव की वास्तविक प्रेरक गाथाएं।',
    story1_title: 'देवी की उम्मीद भरी कहानी',
    story1_desc: 'समय पर पोषण और बाल चिकित्सा ने कैसे ग्रामीण बिहार में गंभीर कुपोषण से नवजात की जान बचाई।',
    story2_title: 'शांति की नेतृत्व यात्रा',
    story2_desc: 'अपने गांव की 120 महिलाओं को सौर स्वच्छ जल कुएं लगाने और सामूहिक खेती शुरू करने का नेतृत्व।',
    story3_title: 'राजू और अमित की शिक्षा सफलता',
    story3_desc: 'ईंट भट्ठों में मजदूरी करने से लेकर एसएएफ टैबलेट व छात्रवृत्ति से जिला मेरिट हासिल करने तक।',
    story_btn: 'कहानी पढ़ें',

    // Governance
    trans_title: 'पारदर्शिता एवं सुशासन',
    trans_subtitle: '100% अनुपालन, ऑडिटेड और कर-मुक्त भारतीय गैर-सरकारी संगठन (NGO)।',
    trans_heading: 'सर्वोच्च नियामक और नैतिक मानक',
    trans_programs: 'प्रत्यक्ष कार्यक्रम',
    trans_ops: 'संचालन',
    trans_admin: 'प्रशासन',
    trans_donors_lbl: 'दानकर्ता और सत्यापित ऑडिट',
    trans_overhead_lbl: 'ओवरहेड अनुपात',
    trans_badge1: '80G आयकर छूट',
    trans_badge2: '12A प्रमाणित',
    trans_badge3: 'FCRA स्वीकृत',
    trans_badge4: 'CSR-1 पंजीकृत',

    // Ways to Help
    help_title: 'सहयोग के तरीके',
    help_subtitle: 'राष्ट्र निर्माण की इस यात्रा का हिस्सा बनने के सरल और प्रभावशाली रास्ते।',
    help1_title: 'दान करें',
    help1_desc: 'शिक्षा, भोजन या राहत सहायता के लिए 50% 80G कर-मुक्त योगदान दें।',
    help1_btn: 'दान करें',
    help2_title: 'स्वयंसेवक बनें',
    help2_desc: '30+ राज्यों में शिक्षण और राहत शिविरों में हमारी टीम से जुड़ें।',
    help2_btn: 'स्वयंसेवक बनें',
    help3_title: 'बच्चे को प्रायोजित करें',
    help3_desc: 'ग्रामीण बच्चे की वार्षिक स्कूली शिक्षा या राशन सुरक्षा प्रायोजित करें।',
    help3_btn: 'प्रायोजित करें',
    help4_title: 'साझेदारी करें',
    help4_desc: 'ऑडिटेड सुशासन के साथ शेड्यूल VII सीएसआर परियोजनाओं पर सहयोग करें।',
    help4_btn: 'साझेदारी करें',
    help5_title: 'अभियान को फंड करें',
    help5_desc: 'स्मार्ट डिजिटल कक्षा, सौर कुआं या स्वास्थ्य डिस्पेंसरी को फंड करें।',
    help5_btn: 'फंड करें',
    help6_title: 'जागरूकता फैलाएं',
    help6_desc: 'सोशल मीडिया पर डिजिटल एंबेसडर बनकर जमीनी कहानियों को प्रसारित करें।',
    help6_btn: 'शेयर करें',

    // Testimonials
    testi_title: 'सामुदायिक विचार',
    testi_subtitle: 'हमारे कॉर्पोरेट साझेदार, ग्राम मुखिया और लाभार्थी क्या कहते हैं।',
    testi1_quote: '“कॉर्पोरेट सीएसआर साक्षरता अभियान में एस. ए. फाउंडेशन के साथ साझेदारी ने 6 महीनों में 45 सरकारी स्कूलों का कायाकल्प कर दिया।”',
    testi1_author: 'राजेश कुलकर्णी',
    testi1_role: 'सीएसआर प्रमुख, टेक एंटरप्राइज',
    testi2_quote: '“भीषण कोसी बाढ़ के दौरान एसएएफ की राहत नाव ने हमारी पंचायत में 400 से अधिक बुजुर्गों और बच्चों की जान बचाई।”',
    testi2_author: 'मुकेश साहनी',
    testi2_role: 'ग्राम मुखिया, बिहार',
    testi3_quote: '“उनका 85% प्रत्यक्ष निष्पादन अनुपात और पारदर्शी रसीदें हमें हर महीने दान करने का पूरा भरोसा देती हैं।”',
    testi3_author: 'सुनीता मेहता',
    testi3_role: 'नियमित दानकर्ता एवं परोपकारी',

    // News
    news_title: 'ताज़ा समाचार एवं अपडेट',
    news_subtitle: 'एसएएफ जमीनी अभियानों से हालिया प्रेस विज्ञप्तियां और ग्राउंड डिस्पैच।',
    news1_tag: 'अगस्त 2026 • शिक्षा',
    news1_title: 'एसएएफ ने 25 नए सौर स्मार्ट लैब का उद्घाटन किया',
    news1_desc: '3,500 से अधिक छात्र अब डिजिटल विज्ञान मॉड्यूल से अध्ययन कर रहे हैं।',
    news2_tag: 'जुलाई 2026 • आपदा राहत',
    news2_title: 'मानसून ऑपरेशन: 50,000 राशन किट वितरित',
    news2_desc: 'बाढ़ प्रभावित क्षेत्रों में ग्राउंड टीमों ने मेडिकल वैन और सूखा राशन पहुंचाया।',
    news3_tag: 'जून 2026 • महिला आजीविका',
    news3_title: 'महिला सौर शिल्प केंद्रों ने ₹1 करोड़ का राजस्व पार किया',
    news3_desc: '400 ग्रामीण महिला कारीगरों को खुदरा बाजार से सीधे जोड़कर सशक्त बनाया।',

    // Mega CTA & Footer
    mega_cta_title: 'साथ मिलकर, हम बदलाव ला सकते हैं।',
    mega_cta_desc: 'एक न्यायसंगत, शिक्षित और समृद्ध भारत के निर्माण में आनंद सिंह और एस. ए. फाउंडेशन से जुड़ें।',
    mega_cta_donate: 'अभी दान करें',
    mega_cta_volunteer: 'स्वयंसेवक बनें',
    mega_cta_partner: 'साझेदारी करें',
    footer_about: 'एस. ए. फाउंडेशन भारत भर में जमीनी समुदायों को सशक्त बनाने के लिए समर्पित एक राष्ट्रीय गैर-लाभकारी संस्था है।',
    footer_quick_links: 'त्वरित लिंक्स',
    footer_contact_info: 'संपर्क जानकारी',
    footer_hq: 'मुख्यालय: नई दिल्ली - 110001',
    footer_field: 'क्षेत्रीय कार्यालय: पटना, बिहार - 800001',
    footer_phone: '+91 11 4987 6500',
    footer_email: 'contact@saf-foundation.org',
    footer_newsletter: 'न्यूज़लेटर सदस्यता',
    footer_subscribe_btn: 'सदस्यता लें',
    footer_email_placeholder: 'आपका ईमेल पता',
    footer_copyright: 'कॉपीराइट © 2026 एस. ए. फाउंडेशन (SAF). सर्वाधिकार सुरक्षित।'
  }
};

let currentLanguage = localStorage.getItem('saf_site_language') || 'en';

function setSiteLanguage(lang) {
  if (lang !== 'en' && lang !== 'hi') lang = 'en';
  currentLanguage = lang;
  localStorage.setItem('saf_site_language', lang);

  const t = SAF_TRANSLATIONS[lang];
  if (!t) return;

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // 1. Header & Navigation
  document.querySelectorAll('.desktop-nav .nav-link-item, .mobile-nav-links .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#about') link.innerHTML = lang === 'hi' ? (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-circle-info"></i> ' : '') + t.nav_about : (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-circle-info"></i> ' : '') + t.nav_about;
    if (href === '#founder') link.innerHTML = lang === 'hi' ? (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-user-tie"></i> ' : '') + t.nav_founder : (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-user-tie"></i> ' : '') + t.nav_founder;
    if (href === '#areas') link.innerHTML = lang === 'hi' ? (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-hand-holding-heart"></i> ' : '') + t.nav_work : (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-hand-holding-heart"></i> ' : '') + t.nav_work;
    if (href === '#impact-map') link.innerHTML = lang === 'hi' ? (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-map-location-dot"></i> ' : '') + t.nav_map : (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-map-location-dot"></i> ' : '') + t.nav_map;
    if (href === '#campaigns') link.innerHTML = lang === 'hi' ? (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-bullhorn"></i> ' : '') + t.nav_campaigns : (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-bullhorn"></i> ' : '') + t.nav_campaigns;
    if (href === '#stories') link.innerHTML = lang === 'hi' ? (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-book-open"></i> ' : '') + t.nav_stories : (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-book-open"></i> ' : '') + t.nav_stories;
    if (href === '#transparency') link.innerHTML = (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-shield-halved"></i> ' : '') + t.nav_governance;
    if (href === '#help') link.innerHTML = (link.classList.contains('mobile-nav-link') ? '<i class="fa-solid fa-hands-holding-child"></i> ' : '') + t.nav_help;
  });

  document.querySelectorAll('.nav-donate-btn, .mobile-drawer-footer .btn-pill-red').forEach(btn => {
    btn.textContent = t.nav_donate;
  });

  const mobileDrawerBadge = document.querySelector('.mobile-drawer-footer div');
  if (mobileDrawerBadge) mobileDrawerBadge.textContent = t.tax_exempt_badge;

  // 2. Hero Section
  const heroBadge = document.querySelector('.hero-tag-badge');
  if (heroBadge) heroBadge.innerHTML = `<span class="badge-dot"></span> ${t.hero_badge}`;
  const heroHeading = document.querySelector('.hero-heading');
  if (heroHeading) heroHeading.textContent = t.hero_title;
  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) heroDesc.textContent = t.hero_desc;
  const heroDonate = document.querySelector('.hero-actions .btn-pill-red');
  if (heroDonate) heroDonate.textContent = t.hero_donate;
  const heroExplore = document.querySelector('.hero-actions .btn-pill-outline');
  if (heroExplore) heroExplore.textContent = t.hero_explore;

  const p1 = document.querySelector('.pill-stat-1');
  if (p1) p1.innerHTML = `<strong>${t.hero_stat1_num}</strong><span>${t.hero_stat1_lbl}</span>`;
  const p2 = document.querySelector('.pill-stat-2');
  if (p2) p2.innerHTML = `<strong>${t.hero_stat2_num}</strong><span>${t.hero_stat2_lbl}</span>`;
  const p3 = document.querySelector('.pill-stat-3');
  if (p3) p3.innerHTML = `<strong>${t.hero_stat3_num}</strong><span>${t.hero_stat3_lbl}</span>`;

  // 3. Impact Numbers
  const impactTitle = document.querySelector('.trust-strip-section .section-title');
  if (impactTitle) impactTitle.textContent = t.impact_title;
  const impactSubtitle = document.querySelector('.trust-strip-section .section-subtitle');
  if (impactSubtitle) impactSubtitle.textContent = t.impact_subtitle;

  const metricCards = document.querySelectorAll('.trust-strip-grid .trust-stat-3d-card .stat-lbl');
  if (metricCards[0]) metricCards[0].textContent = t.metric1_lbl;
  if (metricCards[1]) metricCards[1].textContent = t.metric2_lbl;
  if (metricCards[2]) metricCards[2].textContent = t.metric3_lbl;
  if (metricCards[3]) metricCards[3].textContent = t.metric4_lbl;
  if (metricCards[4]) metricCards[4].textContent = t.metric5_lbl;

  // 4. About Section
  const aboutTitle = document.querySelector('.about-content .section-title');
  if (aboutTitle) aboutTitle.textContent = t.about_title;
  const aboutDesc = document.querySelector('.about-content > p');
  if (aboutDesc) aboutDesc.textContent = t.about_desc;
  const mvBoxes = document.querySelectorAll('.mission-vision-boxes .mv-3d-box');
  if (mvBoxes[0]) {
    mvBoxes[0].querySelector('h4').textContent = t.about_mission_title;
    mvBoxes[0].querySelector('p').textContent = t.about_mission_desc;
  }
  if (mvBoxes[1]) {
    mvBoxes[1].querySelector('h4').textContent = t.about_vision_title;
    mvBoxes[1].querySelector('p').textContent = t.about_vision_desc;
  }
  const aboutBtn = document.querySelector('.about-content .btn-pill-dark');
  if (aboutBtn) aboutBtn.textContent = t.about_btn;

  const t1 = document.querySelector('.tag-pos-1');
  if (t1) t1.innerHTML = `<i class="fa-solid fa-users" style="color:var(--teal-subtle);"></i> ${t.pillar1}`;
  const t2 = document.querySelector('.tag-pos-2');
  if (t2) t2.innerHTML = `<i class="fa-solid fa-heart-pulse" style="color:#E11D48;"></i> ${t.pillar2}`;
  const t3 = document.querySelector('.tag-pos-3');
  if (t3) t3.innerHTML = `<i class="fa-solid fa-graduation-cap" style="color:var(--accent-gold);"></i> ${t.pillar3}`;
  const t4 = document.querySelector('.tag-pos-4');
  if (t4) t4.innerHTML = `<i class="fa-solid fa-apple-whole" style="color:var(--teal-subtle);"></i> ${t.pillar4}`;

  // 5. Founder
  const fSecTitle = document.querySelector('.founder-section .section-title');
  if (fSecTitle) fSecTitle.textContent = t.founder_title;
  const fSecSub = document.querySelector('.founder-section .section-subtitle');
  if (fSecSub) fSecSub.textContent = t.founder_subtitle;
  const fName = document.querySelector('.founder-details h2');
  if (fName) fName.textContent = t.founder_name;
  const fTag = document.querySelector('.founder-tagline');
  if (fTag) fTag.textContent = t.founder_tagline;
  const fQuote = document.querySelector('.founder-quote-3d');
  if (fQuote) fQuote.innerHTML = `${t.founder_quote}<br><strong style="font-size:0.85rem; color:var(--text-muted);">${t.founder_quote_author}</strong>`;
  const fBio = document.querySelector('.founder-details > p');
  if (fBio) fBio.textContent = t.founder_bio;
  const fBtn = document.querySelector('.founder-details .btn-pill-dark');
  if (fBtn) fBtn.textContent = t.founder_connect_btn;
  const fGalleryHead = document.querySelector('.founder-main-layout > h4');
  if (fGalleryHead) fGalleryHead.textContent = t.founder_gallery_title;

  const fStats = document.querySelectorAll('.founder-stats-row .founder-stat-pill-card .lbl');
  if (fStats[0]) fStats[0].textContent = t.founder_stat1_lbl;
  if (fStats[1]) fStats[1].textContent = t.founder_stat2_lbl;
  if (fStats[2]) fStats[2].textContent = t.founder_stat3_lbl;
  if (fStats[3]) fStats[3].textContent = t.founder_stat4_lbl;
  if (fStats[4]) fStats[4].textContent = t.founder_stat5_lbl;

  // 6. Areas
  const areasTitle = document.querySelector('.areas-section .section-title');
  if (areasTitle) areasTitle.textContent = t.areas_title;
  const areasSubtitle = document.querySelector('.areas-section .section-subtitle');
  if (areasSubtitle) areasSubtitle.textContent = t.areas_subtitle;

  const areaCards = document.querySelectorAll('.areas-3d-grid .area-3d-card');
  const areaData = [
    { title: t.area1_title, desc: t.area1_desc },
    { title: t.area2_title, desc: t.area2_desc },
    { title: t.area3_title, desc: t.area3_desc },
    { title: t.area4_title, desc: t.area4_desc },
    { title: t.area5_title, desc: t.area5_desc },
    { title: t.area6_title, desc: t.area6_desc }
  ];
  areaCards.forEach((card, idx) => {
    if (areaData[idx]) {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h3) h3.textContent = areaData[idx].title;
      if (p) p.textContent = areaData[idx].desc;
    }
  });

  // 7. Map
  const mapTitle = document.querySelector('.map-section .section-title');
  if (mapTitle) mapTitle.textContent = t.map_title;
  const mapSubtitle = document.querySelector('.map-section .section-subtitle');
  if (mapSubtitle) mapSubtitle.textContent = t.map_subtitle;
  const mapBadge = document.querySelector('.map-flagship-pill');
  if (mapBadge) mapBadge.innerHTML = `<i class="fa-solid fa-location-dot" style="color:var(--accent-gold);"></i> ${t.map_flagship_badge}`;
  const mapH3 = document.querySelector('.map-content-col h3');
  if (mapH3) mapH3.textContent = t.map_heading;
  const mapDesc = document.querySelector('.map-content-col > p');
  if (mapDesc) mapDesc.textContent = t.map_desc;

  const mapStats = document.querySelectorAll('.map-stats-3d-grid .map-stat-card-item .lbl');
  if (mapStats[0]) mapStats[0].textContent = t.map_stat1_lbl;
  if (mapStats[1]) mapStats[1].textContent = t.map_stat2_lbl;
  if (mapStats[2]) mapStats[2].textContent = t.map_stat3_lbl;
  if (mapStats[3]) mapStats[3].textContent = t.map_stat4_lbl;

  const legendItems = document.querySelectorAll('.map-legend-bar .legend-item span:last-child');
  if (legendItems[0]) legendItems[0].textContent = t.map_legend_bihar;
  if (legendItems[1]) legendItems[1].textContent = t.map_legend_all;

  // 8. Campaigns
  const campTitle = document.querySelector('.campaigns-section .section-title');
  if (campTitle) campTitle.textContent = t.campaigns_title;
  const campSubtitle = document.querySelector('.campaigns-section .section-subtitle');
  if (campSubtitle) campSubtitle.textContent = t.campaigns_subtitle;

  const campCards = document.querySelectorAll('.campaigns-section .campaign-3d-card');
  const campData = [
    { title: t.camp1_title, desc: t.camp1_desc, raised: t.camp1_raised, goal: t.camp1_goal },
    { title: t.camp2_title, desc: t.camp2_desc, raised: t.camp2_raised, goal: t.camp2_goal },
    { title: t.camp3_title, desc: t.camp3_desc, raised: t.camp3_raised, goal: t.camp3_goal }
  ];
  campCards.forEach((card, idx) => {
    if (campData[idx]) {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      const raisedSpan = card.querySelector('.campaign-stats-row span:first-child');
      const goalSpan = card.querySelector('.campaign-stats-row span:last-child');
      const btn = card.querySelector('button');
      if (h3) h3.textContent = campData[idx].title;
      if (p) p.textContent = campData[idx].desc;
      if (raisedSpan) raisedSpan.innerHTML = `${campData[idx].raised.split(':')[0]}: <strong>${campData[idx].raised.split(':')[1] || ''}</strong>`;
      if (goalSpan) goalSpan.textContent = campData[idx].goal;
      if (btn) btn.textContent = t.camp_btn;
    }
  });

  // 9. Stories
  const storiesTitle = document.querySelector('.stories-section .section-title');
  if (storiesTitle) storiesTitle.textContent = t.stories_title;
  const storiesSubtitle = document.querySelector('.stories-section .section-subtitle');
  if (storiesSubtitle) storiesSubtitle.textContent = t.stories_subtitle;

  const storyCards = document.querySelectorAll('.stories-section .story-3d-card');
  const storyData = [
    { title: t.story1_title, desc: t.story1_desc },
    { title: t.story2_title, desc: t.story2_desc },
    { title: t.story3_title, desc: t.story3_desc }
  ];
  storyCards.forEach((card, idx) => {
    if (storyData[idx]) {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      const btn = card.querySelector('button');
      if (h3) h3.textContent = storyData[idx].title;
      if (p) p.textContent = storyData[idx].desc;
      if (btn) btn.textContent = t.story_btn;
    }
  });

  // 10. Governance
  const transTitle = document.querySelector('.transparency-section .section-title');
  if (transTitle) transTitle.textContent = t.trans_title;
  const transSubtitle = document.querySelector('.transparency-section .section-subtitle');
  if (transSubtitle) transSubtitle.textContent = t.trans_subtitle;
  const transHead = document.querySelector('.transparency-3d-layout h3');
  if (transHead) transHead.textContent = t.trans_heading;

  const transRatio = document.querySelector('.transparency-3d-layout strong');
  if (transRatio) {
    transRatio.parentElement.innerHTML = `
      <strong style="font-size:1.8rem; color:#B45309;">85%</strong> ${t.trans_programs} | 
      <strong style="font-size:1.1rem; color:var(--navy-heading);">10%</strong> ${t.trans_ops} | 
      <strong style="font-size:1.1rem; color:var(--teal-subtle);">5%</strong> ${t.trans_admin}
    `;
  }

  const transBoxes = document.querySelectorAll('.transparency-3d-layout div[style*="background:var(--bg-subtle)"]');
  if (transBoxes[0]) transBoxes[0].querySelector('div:last-child').textContent = t.trans_donors_lbl;
  if (transBoxes[1]) transBoxes[1].querySelector('div:last-child').textContent = t.trans_overhead_lbl;

  const badges = document.querySelectorAll('.transparency-3d-layout div[style*="grid-template-columns:1fr 1fr"] > div');
  if (badges[0]) badges[0].innerHTML = `<i class="fa-solid fa-check" style="color:var(--teal-subtle);"></i> ${t.trans_badge1}`;
  if (badges[1]) badges[1].innerHTML = `<i class="fa-solid fa-check" style="color:var(--teal-subtle);"></i> ${t.trans_badge2}`;
  if (badges[2]) badges[2].innerHTML = `<i class="fa-solid fa-check" style="color:var(--teal-subtle);"></i> ${t.trans_badge3}`;
  if (badges[3]) badges[3].innerHTML = `<i class="fa-solid fa-check" style="color:var(--teal-subtle);"></i> ${t.trans_badge4}`;

  // 11. Ways to Help
  const helpTitle = document.querySelector('.help-section .section-title');
  if (helpTitle) helpTitle.textContent = t.help_title;
  const helpSubtitle = document.querySelector('.help-section .section-subtitle');
  if (helpSubtitle) helpSubtitle.textContent = t.help_subtitle;

  const helpBoxes = document.querySelectorAll('.help-3d-grid .help-3d-box');
  const helpData = [
    { title: t.help1_title, desc: t.help1_desc, btn: t.help1_btn },
    { title: t.help2_title, desc: t.help2_desc, btn: t.help2_btn },
    { title: t.help3_title, desc: t.help3_desc, btn: t.help3_btn },
    { title: t.help4_title, desc: t.help4_desc, btn: t.help4_btn },
    { title: t.help5_title, desc: t.help5_desc, btn: t.help5_btn },
    { title: t.help6_title, desc: t.help6_desc, btn: t.help6_btn }
  ];
  helpBoxes.forEach((box, idx) => {
    if (helpData[idx]) {
      const h3 = box.querySelector('h3');
      const p = box.querySelector('p');
      const btn = box.querySelector('button');
      if (h3) h3.textContent = helpData[idx].title;
      if (p) p.textContent = helpData[idx].desc;
      if (btn) btn.textContent = helpData[idx].btn;
    }
  });

  // 12. Testimonials
  const testiTitle = document.querySelector('.testimonials-section .section-title');
  if (testiTitle) testiTitle.textContent = t.testi_title;
  const testiSubtitle = document.querySelector('.testimonials-section .section-subtitle');
  if (testiSubtitle) testiSubtitle.textContent = t.testi_subtitle;

  const testiCards = document.querySelectorAll('.testimonials-section .testimonial-3d-card');
  const testiData = [
    { quote: t.testi1_quote, author: t.testi1_author, role: t.testi1_role },
    { quote: t.testi2_quote, author: t.testi2_author, role: t.testi2_role },
    { quote: t.testi3_quote, author: t.testi3_author, role: t.testi3_role }
  ];
  testiCards.forEach((card, idx) => {
    if (testiData[idx]) {
      const p = card.querySelector('p');
      const author = card.querySelector('strong');
      const role = card.querySelector('div[style*="font-size:0.78rem"]');
      if (p) p.textContent = testiData[idx].quote;
      if (author) author.textContent = testiData[idx].author;
      if (role) role.textContent = testiData[idx].role;
    }
  });

  // 13. News
  const newsTitle = document.querySelector('.updates-section .section-title');
  if (newsTitle) newsTitle.textContent = t.news_title;
  const newsSubtitle = document.querySelector('.updates-section .section-subtitle');
  if (newsSubtitle) newsSubtitle.textContent = t.news_subtitle;

  const newsCards = document.querySelectorAll('.updates-section .campaign-3d-card');
  const newsData = [
    { tag: t.news1_tag, title: t.news1_title, desc: t.news1_desc },
    { tag: t.news2_tag, title: t.news2_title, desc: t.news2_desc },
    { tag: t.news3_tag, title: t.news3_title, desc: t.news3_desc }
  ];
  newsCards.forEach((card, idx) => {
    if (newsData[idx]) {
      const tag = card.querySelector('div[style*="font-size:0.78rem"]');
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (tag) tag.textContent = newsData[idx].tag;
      if (h3) h3.textContent = newsData[idx].title;
      if (p) p.textContent = newsData[idx].desc;
    }
  });

  // 14. Mega CTA & Footer
  const megaH2 = document.querySelector('.mega-cta-3d-card h2');
  if (megaH2) megaH2.textContent = t.mega_cta_title;
  const megaP = document.querySelector('.mega-cta-3d-card p');
  if (megaP) megaP.textContent = t.mega_cta_desc;
  const megaBtns = document.querySelectorAll('.mega-cta-3d-card button');
  if (megaBtns[0]) megaBtns[0].textContent = t.mega_cta_donate;
  if (megaBtns[1]) megaBtns[1].textContent = t.mega_cta_volunteer;
  if (megaBtns[2]) megaBtns[2].textContent = t.mega_cta_partner;

  const footerAbout = document.querySelector('.footer-grid-cols > div:first-child > p');
  if (footerAbout) footerAbout.textContent = t.footer_about;

  const footerHeadings = document.querySelectorAll('.footer-grid-cols h4');
  if (footerHeadings[0]) footerHeadings[0].textContent = t.footer_quick_links;
  if (footerHeadings[1]) footerHeadings[1].textContent = t.footer_contact_info;
  if (footerHeadings[2]) footerHeadings[2].textContent = t.footer_newsletter;

  const contactLis = document.querySelectorAll('.footer-grid-cols > div:nth-child(3) ul li');
  if (contactLis[0]) contactLis[0].innerHTML = `<i class="fa-solid fa-building" style="color:var(--accent-gold);"></i> ${t.footer_hq}`;
  if (contactLis[1]) contactLis[1].innerHTML = `<i class="fa-solid fa-map-pin" style="color:var(--accent-gold);"></i> ${t.footer_field}`;
  if (contactLis[2]) contactLis[2].innerHTML = `<i class="fa-solid fa-phone" style="color:var(--accent-gold);"></i> ${t.footer_phone}`;
  if (contactLis[3]) contactLis[3].innerHTML = `<i class="fa-solid fa-envelope" style="color:var(--accent-gold);"></i> ${t.footer_email}`;

  const newsInput = document.querySelector('#newsletterForm input[type="email"]');
  if (newsInput) newsInput.placeholder = t.footer_email_placeholder;
  const newsSubmit = document.querySelector('#newsletterForm button');
  if (newsSubmit) newsSubmit.textContent = t.footer_subscribe_btn;

  const footerCopy = document.querySelector('.mega-footer div[style*="text-align:center"]');
  if (footerCopy) footerCopy.innerHTML = t.footer_copyright;

  // Update switcher buttons active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function initLanguageSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang) {
        setSiteLanguage(targetLang);
      }
    });
  });

  // Apply initially saved or default language
  setSiteLanguage(currentLanguage);
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
});

window.setSiteLanguage = setSiteLanguage;
window.SAF_TRANSLATIONS = SAF_TRANSLATIONS;
