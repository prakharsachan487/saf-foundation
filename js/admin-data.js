/**
 * SAF FOUNDATION - DEFAULT SITE DATA & CMS STORAGE ENGINE
 * Powers the hidden admin panel with full schema for all sections
 */

const DEFAULT_SAF_DATA = {
  // General & Auth
  auth: {
    pin: 'admin123'
  },

  // 1. Header & Branding
  header: {
    brandName: 'SAF Foundation',
    logoImage: 'assets/images/logo.png',
    donateBtnText: 'Donate Now',
    taglineBadge: '80G Tax Exempted • 12A Certified'
  },

  // 2. Hero Section
  hero: {
    badgeText: 'Grassroots Empowerment Across India',
    heading: 'Empowering Communities, Transforming Lives',
    description: 'Dedicated to uplifting vulnerable families across India through quality education, nutritional security, healthcare, and sustainable livelihood programs.',
    donateBtnText: 'Donate Now',
    exploreBtnText: 'Explore Our Work',
    heroImage: 'assets/images/hero-community.jpg',
    stat1Number: '135+',
    stat1Label: 'Active Projects',
    stat2Number: '373k+',
    stat2Label: 'Lives Changed',
    stat3Number: '2,900+',
    stat3Label: 'Volunteers'
  },

  // 3. Impact Metrics Strip (5 counters)
  metrics: [
    { target: 5.5, decimals: 1, prefix: '', suffix: 'M+', label: 'Lives Impacted' },
    { target: 5598, decimals: 0, prefix: '', suffix: '', label: 'Families Supported' },
    { target: 330, decimals: 0, prefix: '', suffix: '+', label: 'Projects Completed' },
    { target: 2758, decimals: 0, prefix: '', suffix: '', label: 'Villages & Communities' },
    { target: 5000, decimals: 0, prefix: '', suffix: '+', label: 'Active Volunteers' }
  ],

  // 4. About Section
  about: {
    heading: 'About S. A. Foundation',
    description: 'S. A. Foundation is dedicated to breaking cycles of intergenerational poverty through community-owned, data-driven social models in education, healthcare, and sustainable livelihood.',
    missionTitle: 'Mission',
    missionText: 'Build sustainable community ecosystems that provide holistic nourishment and education to every child.',
    visionTitle: 'Vision',
    visionText: 'An inclusive India where vulnerable families achieve dignity, economic freedom, and self-reliance.',
    btnText: 'Meet Our Leadership',
    pillar1: 'Community Growth',
    pillar2: 'Healthcare',
    pillar3: 'Education',
    pillar4: 'Nutrition'
  },

  // 5. Founder & Leadership
  founder: {
    sectionTitle: 'Leadership & Vision — Anand Singh',
    sectionSubtitle: 'Visionary leadership fusing corporate execution rigor with deep grassroots empathy.',
    name: 'Anand Singh',
    designation: 'Founder & Managing Trustee, S. A. Foundation',
    image: 'assets/images/founder-anand-singh.jpg',
    quote: '“Social responsibility of each individual builds and economically empowers communities.”',
    quoteAuthor: '— Anand Singh',
    bio: 'Anand Singh channeled his entrepreneurial success into building scalable grassroots systems across India. Under his leadership, SAF Foundation has mobilized hundreds of millions in relief aid, established digital classrooms, and fostered self-reliant village cooperatives.',
    btnText: 'Connect With Founder',
    galleryHeading: 'Authentic Ground Footprint & Field Visits',
    stats: [
      { target: 58, decimals: 0, prefix: '', suffix: '%', label: 'Rural Reach' },
      { target: 187, decimals: 0, prefix: '', suffix: 'M', label: 'Impact Imprints' },
      { target: 13, decimals: 0, prefix: '', suffix: '+', label: 'Years of Service' },
      { target: 133, decimals: 0, prefix: '', suffix: '', label: 'Direct Initiatives' },
      { target: 365, decimals: 0, prefix: '₹', suffix: 'M', label: 'Capital Mobilized' }
    ]
  },

  // 6. Areas of Work (6 Pillars)
  areas: {
    sectionTitle: 'Our Areas of Work',
    sectionSubtitle: 'Scalable grassroots interventions designed for measurable, generational impact.',
    items: [
      {
        id: 'edu',
        title: 'Education',
        description: 'Digital classrooms, STEM kits, and girl child study scholarships across rural schools.',
        campaign: 'Education for Children',
        iconType: 'image',
        iconValue: 'assets/images/icon-3d-education.jpg'
      },
      {
        id: 'nutri',
        title: 'Food & Nutrition',
        description: 'Hot nutritious mid-day meals and monthly ration kits for vulnerable families.',
        campaign: 'Food and Nutrition Mission',
        iconType: 'image',
        iconValue: 'assets/images/icon-3d-food.jpg'
      },
      {
        id: 'health',
        title: 'Healthcare',
        description: 'Mobile health dispensaries, diagnostic health camps, and maternal wellness aid.',
        campaign: 'Rural Healthcare Camps',
        iconType: 'icon',
        iconClass: 'fa-solid fa-heart-pulse'
      },
      {
        id: 'livelihood',
        title: 'Livelihood & Employment',
        description: 'Vocational training workshops, digital skills, and micro-business incubation.',
        campaign: 'Youth Skill Centers',
        iconType: 'icon',
        iconClass: 'fa-solid fa-briefcase'
      },
      {
        id: 'women',
        title: 'Women & Child Welfare',
        description: 'Self-help groups, solar sewing units, menstrual health, and child protection.',
        campaign: 'Women SHG Empowerment',
        iconType: 'icon',
        iconClass: 'fa-solid fa-person-breastfeeding'
      },
      {
        id: 'relief',
        title: 'Emergency Relief',
        description: 'Rapid response teams delivering clean drinking water, food, and rescue during floods.',
        campaign: 'Emergency Flood Relief Aid',
        iconType: 'icon',
        iconClass: 'fa-solid fa-truck-droplet'
      }
    ]
  },

  // 7. Impact Map
  impactMap: {
    sectionTitle: 'Our Footprint Across India',
    sectionSubtitle: 'Deep grassroots presence with our primary flagship operations in Bihar and active initiatives across 30+ States.',
    flagshipBadge: 'Ground Zero: Patna, Bihar • Field Operations',
    heading: 'Measurable Footprint in Every Corner',
    description: 'From flood-prone districts and malnutrition rehabilitation in Bihar to arid village water security in Rajasthan and tribal education in Odisha, our ground teams execute daily grassroots transformation.',
    stats: [
      { target: 1100, suffix: '+', label: 'Active Field Projects' },
      { target: 2600, suffix: '+', label: 'Villages & Grams' },
      { target: 190, suffix: '', label: 'Model Digital Schools' },
      { target: 38, suffix: '', label: 'Field Resource Centres' }
    ]
  },

  // 8. Featured Campaigns (Dynamic List)
  campaigns: {
    sectionTitle: 'Featured Campaigns',
    sectionSubtitle: 'Directly fund targeted initiatives bringing immediate transformation to village communities.',
    items: [
      {
        id: 1,
        title: 'Smart Tabs for 5,000 Rural Girls',
        description: 'Equipping rural girl students with interactive digital curriculum tablets and mentoring.',
        image: 'assets/images/campaign-education.jpg',
        raised: '₹19.85 Lakh',
        progress: 79,
        goalText: '79% (Goal: ₹25L)',
        btnText: 'Support Campaign'
      },
      {
        id: 2,
        title: 'Bihar Flood Clean Water & Ration Kits',
        description: 'Deploying emergency rescue units and delivering 50,000 clean water packs to displaced families.',
        image: 'assets/images/campaign-relief.jpg',
        raised: '₹31.50 Lakh',
        progress: 90,
        goalText: '90% (Goal: ₹35L)',
        btnText: 'Support Campaign'
      },
      {
        id: 3,
        title: '1,000 Women Solar Craft Centers',
        description: 'Setting up community sewing hubs with digital machines and direct market linkage.',
        image: 'assets/images/campaign-women.jpg',
        raised: '₹16.40 Lakh',
        progress: 82,
        goalText: '82% (Goal: ₹20L)',
        btnText: 'Support Campaign'
      }
    ]
  },

  // 9. Real Stories of Change (Dynamic List)
  stories: {
    sectionTitle: 'Real Stories of Transformation',
    sectionSubtitle: 'Real stories of resilience, restored health, and transformed lives.',
    items: [
      {
        id: 1,
        title: 'Devi’s Story of Hope',
        description: 'How timely clinical nutrition and pediatric care saved her infant from severe acute malnutrition in rural Bihar.',
        image: 'assets/images/story-devi.jpg',
        btnText: 'Read Story',
        campaignTag: "Devi's Child Nutrition Support"
      },
      {
        id: 2,
        title: 'Shanti’s Leadership Journey',
        description: 'Leading 120 women in her village to erect solar clean water wells and launch collective farms.',
        image: 'assets/images/story-shanti.jpg',
        btnText: 'Read Story',
        campaignTag: "Shanti's Clean Water Cooperative"
      },
      {
        id: 3,
        title: 'Raju & Amit’s Education Breakthrough',
        description: 'From laboring at local kilns to securing district merit ranks with SAF smart tablets and scholarships.',
        image: 'assets/images/story-brothers.jpg',
        btnText: 'Read Story',
        campaignTag: 'Brothers Education Fund'
      }
    ]
  },

  // 10. Governance & Transparency
  transparency: {
    sectionTitle: 'Governance & Transparency',
    sectionSubtitle: '100% compliant, audited, and tax-exempt NGO in India.',
    heading: 'Highest Regulatory & Ethical Standards',
    programsPercent: 85,
    opsPercent: 10,
    adminPercent: 5,
    donorsCount: '422,860+',
    donorsLabel: 'Donors & Verified Audits',
    overheadRatio: '1.5%',
    overheadLabel: 'Overhead Ratio',
    badge1: '80G Tax Exemption',
    badge2: '12A Certified',
    badge3: 'FCRA Approved',
    badge4: 'CSR-1 Registered'
  },

  // 11. Ways to Get Involved (6 items)
  help: {
    sectionTitle: 'Ways to Get Involved',
    sectionSubtitle: 'Simple, impactful pathways to be a part of the nation-building journey.',
    items: [
      {
        title: 'Donate',
        description: 'Make a 50% 80G tax-exempt donation towards education, food, or emergency relief.',
        btnText: 'Donate',
        actionType: 'donate'
      },
      {
        title: 'Volunteer',
        description: 'Join our on-ground volunteer force across 30+ states in teaching and relief camps.',
        btnText: 'Volunteer',
        actionType: 'volunteer'
      },
      {
        title: 'Sponsor a Child',
        description: 'Sponsor a rural child\'s annual schooling or provide year-round ration security.',
        btnText: 'Sponsor Now',
        actionType: 'sponsor'
      },
      {
        title: 'Partner With Us',
        description: 'Collaborate on compliant Schedule VII CSR projects with audited governance.',
        btnText: 'Partner With Us',
        actionType: 'partner'
      },
      {
        title: 'Fund a Campaign',
        description: 'Fund an entire smart digital classroom, solar well, or health dispensary.',
        btnText: 'Fund a Campaign',
        actionType: 'partner'
      },
      {
        title: 'Spread Awareness',
        description: 'Amplify grassroots stories as a digital ambassador on social networks.',
        btnText: 'Spread Word',
        actionType: 'share'
      }
    ]
  },

  // 12. Testimonials (Dynamic List)
  testimonials: {
    sectionTitle: 'Community Voices',
    sectionSubtitle: 'What our institutional partners, village mukhiyas, and beneficiaries say.',
    items: [
      {
        id: 1,
        quote: '“Partnering with S. A. Foundation on our corporate CSR literacy mandate transformed 45 government schools in 6 months.”',
        author: 'Rajesh Kulkarni',
        role: 'Head of CSR, Tech Enterprise',
        rating: 5
      },
      {
        id: 2,
        quote: '“During the severe Kosi flood season, SAF Foundation\'s relief boat saved over 400 elderly and children in our Panchayat.”',
        author: 'Mukesh Sahni',
        role: 'Gram Mukhiya, Bihar',
        rating: 5
      },
      {
        id: 3,
        quote: '“Their 85% direct execution ratio and transparent digital receipts give us complete trust to donate every month.”',
        author: 'Sunita Mehta',
        role: 'Philanthropist & Regular Donor',
        rating: 5
      }
    ]
  },

  // 13. Latest News & Updates (Dynamic List)
  news: {
    sectionTitle: 'Latest News & Updates',
    sectionSubtitle: 'Recent field dispatches and press releases from SAF ground operations.',
    items: [
      {
        id: 1,
        tag: 'August 2026 • Education',
        title: 'SAF Inaugurates 25 New Solar Smart Labs',
        summary: 'Over 3,500 students now access interactive digital science modules across underserved schools.',
        image: 'assets/images/field-education.jpg'
      },
      {
        id: 2,
        tag: 'July 2026 • Emergency Relief',
        title: 'Monsoon Operation Dispatches 50,000 Ration Kits',
        summary: 'Ground teams deploy medical vans and dry rations across flood-inundated regions.',
        image: 'assets/images/campaign-relief.jpg'
      },
      {
        id: 3,
        tag: 'June 2026 • Women Livelihood',
        title: 'Women Solar Craft Hubs Cross ₹1 Crore Revenue',
        summary: 'Empowering 400 rural women artisans with direct market linkage to retail partners.',
        image: 'assets/images/campaign-women.jpg'
      }
    ]
  },

  // 14. Mega CTA & Footer
  footer: {
    ctaHeading: 'Together, We Can Create Change.',
    ctaSubtitle: 'Join Anand Singh and the S. A. Foundation in building an equitable, educated, and prosperous India.',
    ctaDonateBtn: 'Donate Now',
    ctaVolunteerBtn: 'Become a Volunteer',
    ctaPartnerBtn: 'Partner With Us',
    ctaImage: 'assets/images/founder-anand-singh.jpg',
    aboutText: 'S. A. Foundation is a national non-profit organization dedicated to empowering grassroots communities across India.',
    hqAddress: 'HQ: New Delhi - 110001',
    fieldAddress: 'Field: Patna, Bihar - 800001',
    phone: '+91 11 4987 6500',
    email: 'contact@saf-foundation.org',
    copyrightText: 'Copyright © 2026 S. A. FOUNDATION (SAF). All Rights Reserved.'
  }
};

const STORAGE_KEY = 'saf_foundation_site_data_v1';

const SiteDataManager = {
  get() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with DEFAULT_SAF_DATA in case new schema properties exist
        return this.deepMerge(JSON.parse(JSON.stringify(DEFAULT_SAF_DATA)), parsed);
      }
    } catch (e) {
      console.error('Error loading stored SAF data:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SAF_DATA));
  },

  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error saving SAF data:', e);
      return false;
    }
  },

  reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return JSON.parse(JSON.stringify(DEFAULT_SAF_DATA));
    } catch (e) {
      console.error('Error resetting SAF data:', e);
      return DEFAULT_SAF_DATA;
    }
  },

  exportJSON() {
    const data = this.get();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `saf_foundation_data_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        const merged = this.deepMerge(JSON.parse(JSON.stringify(DEFAULT_SAF_DATA)), parsed);
        this.save(merged);
        return { success: true, data: merged };
      }
      return { success: false, message: 'Invalid JSON file format.' };
    } catch (e) {
      return { success: false, message: 'Parsing error: ' + e.message };
    }
  },

  deepMerge(target, source) {
    if (!source || typeof source !== 'object') return target;
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        this.deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }
};
