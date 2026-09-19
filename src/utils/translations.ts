/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'bn';

export interface Translations {
  nav: {
    about: string;
    services: string;
    showreel: string;
    portfolio: string;
    skills: string;
    resume: string;
    contact: string;
    visitingCard: string;
    backupDeploy: string;
    editMode: string;
    viewMode: string;
    hireMe: string;
  };
  hero: {
    availableForWork: string;
    title: string;
    description: string;
    specializationBadge: string;
    explorePortfolio: string;
    watchShowreel: string;
    downloadResume: string;
    getInTouch: string;
    statYears: string;
    statProjects: string;
    statSatisfaction: string;
    statWorks: string;
    certifiedBadge: string;
    viewVisitingCard: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    atAGlance: string;
    fullName: string;
    trainingInstitution: string;
    location: string;
    availability: string;
    primaryFocus: string;
    downloadCV: string;
    letsTalk: string;
  };
  portfolio: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterVideo: string;
    filterGraphic: string;
    filterMotion: string;
    filterShowreel: string;
    addVideoBtn: string;
    addGraphicBtn: string;
    linkBtn: string;
    viewBtn: string;
    featuredTag: string;
    clientLabel: string;
    emptyText: string;
  };
  showreel: {
    badge: string;
    title: string;
    subtitle: string;
    linkBtn: string;
    pastePlaceholder: string;
    saveAndPlay: string;
    tip: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    videoTab: string;
    graphicTab: string;
    pricingStarts: string;
    requestService: string;
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    softwareTab: string;
    technicalTab: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    sendMessage: string;
    sendBtn: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    directContact: string;
    email: string;
    phone: string;
    location: string;
    whatsappChat: string;
  };
  footer: {
    rightsReserved: string;
    backToTop: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      showreel: 'Showreel',
      portfolio: 'Portfolio',
      skills: 'Skills',
      resume: 'Resume',
      contact: 'Contact',
      visitingCard: 'Visiting Card',
      backupDeploy: 'Backup / Deploy',
      editMode: 'Editing Mode',
      viewMode: 'Live Mode',
      hireMe: 'Hire Me',
    },
    hero: {
      availableForWork: 'Available for Freelance & Remote Projects',
      title: 'Creative Video Editor & Graphic Designer',
      description:
        'Crafting high-retention video stories, viral shorts, and stunning visual branding with precision and artistic flair.',
      specializationBadge: 'Video Editing • Graphic Design',
      explorePortfolio: 'Explore Portfolio',
      watchShowreel: 'Watch Showreel',
      downloadResume: 'Download Resume',
      getInTouch: 'Get in Touch',
      statYears: 'Years Experience',
      statProjects: 'Projects Completed',
      statSatisfaction: 'Client Satisfaction',
      statWorks: 'Featured Works',
      certifiedBadge: 'SDI Certified',
      viewVisitingCard: 'Visiting Card →',
    },
    about: {
      badge: 'Professional Background',
      title: 'About Me',
      subtitle: 'Passionate visual storyteller bridging creativity, modern aesthetics, and technical editing mastery.',
      description:
        'Certified Video Editor & Graphic Designer from As-Sunnah Skill Development Institute (SDI). Specializing in YouTube video editing, commercial reels, motion graphics, and premium digital branding.',
      atAGlance: 'At a Glance',
      fullName: 'Full Name',
      trainingInstitution: 'Training Institute',
      location: 'Location',
      availability: 'Availability',
      primaryFocus: 'Primary Focus',
      downloadCV: 'Download CV / Resume',
      letsTalk: "Let's Talk",
    },
    portfolio: {
      badge: 'Selected Works',
      title: 'Featured Portfolio',
      subtitle: 'Browse through commercial video edits, YouTube master cuts, social reels, and brand graphic designs.',
      filterAll: 'All Works',
      filterVideo: 'Video Editing',
      filterGraphic: 'Graphic Design',
      filterMotion: 'Motion Graphics',
      filterShowreel: 'Showreels',
      addVideoBtn: '+ Add YouTube Video',
      addGraphicBtn: '+ Add Image / Graphic',
      linkBtn: 'Link',
      viewBtn: 'View Details',
      featuredTag: 'Featured',
      clientLabel: 'Client',
      emptyText: 'No projects found in this category.',
    },
    showreel: {
      badge: 'Featured Video Showcase',
      title: 'Dynamic Showreel & Shorts',
      subtitle: 'High-energy cuts, motion effects, seamless pacing, and audio design in a 9:16 vertical showcase.',
      linkBtn: '⚡ Paste / Change Reel Link',
      pastePlaceholder: 'Paste YouTube Video or Shorts URL (e.g. https://youtu.be/... or https://youtube.com/shorts/...)',
      saveAndPlay: 'Save & Play',
      tip: 'Paste any YouTube Shorts or normal YouTube URL. The video and thumbnail update immediately.',
    },
    services: {
      badge: 'What I Offer',
      title: 'Services & Solutions',
      subtitle: 'End-to-end creative solutions tailored for content creators, agencies, and businesses.',
      videoTab: '🎬 Video Editing Services',
      graphicTab: '🎨 Graphic Design Services',
      pricingStarts: 'Starts at',
      requestService: 'Book This Service',
    },
    skills: {
      badge: 'Proficiency & Tools',
      title: 'Software & Technical Skills',
      subtitle: 'Industry-standard creative software and core production workflows.',
      softwareTab: 'Software Mastery',
      technicalTab: 'Technical Skills',
    },
    contact: {
      badge: 'Get In Touch',
      title: "Let's Work Together",
      subtitle: 'Have a project in mind or want to collaborate? Feel free to reach out anytime.',
      sendMessage: 'Send a Message',
      sendBtn: 'Send Message',
      nameLabel: 'Your Name',
      emailLabel: 'Your Email',
      subjectLabel: 'Subject',
      messageLabel: 'Your Message',
      directContact: 'Direct Contact Details',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      whatsappChat: 'Chat on WhatsApp',
    },
    footer: {
      rightsReserved: 'All rights reserved.',
      backToTop: 'Back to Top',
    },
  },
  bn: {
    nav: {
      about: 'পরিচিতি',
      services: 'সেবাসমূহ',
      showreel: 'শোরিল',
      portfolio: 'পোর্টফোলিও',
      skills: 'দক্ষতা',
      resume: 'জীবনবৃত্তান্ত',
      contact: 'যোগাযোগ',
      visitingCard: 'ভিজিটিং কার্ড',
      backupDeploy: 'ব্যাকআপ / ডিপ্লয়',
      editMode: 'এডিট মোড',
      viewMode: 'লাইভ মোড',
      hireMe: 'হায়ার করুন',
    },
    hero: {
      availableForWork: 'ফ্রিল্যান্স এবং রিমোট কাজের জন্য প্রস্তুত',
      title: 'ক্রিয়েটিভ ভিডিও এডিটর ও গ্রাফিক ডিজাইনার',
      description:
        'হাই-রিটেনশন ভিডিও স্টোরিটেলিং, ভাইরাল শর্টস এবং নজরকাড়া গ্রাফিক ডিজাইনে অভিজ্ঞ ও দক্ষ।',
      specializationBadge: 'ভিডিও এডিটিং • গ্রাফিক ডিজাইন',
      explorePortfolio: 'পোর্টফোলিও দেখুন',
      watchShowreel: 'শোরিল দেখুন',
      downloadResume: 'সিভি ডাউনলোড',
      getInTouch: 'যোগাযোগ করুন',
      statYears: 'বছরের অভিজ্ঞতা',
      statProjects: 'সফল প্রজেক্ট',
      statSatisfaction: 'ক্লায়েন্ট সন্তুষ্টি',
      statWorks: 'প্রদর্শিত কাজ',
      certifiedBadge: 'এসডিআই সার্টিফাইড',
      viewVisitingCard: 'ভিজিটিং কার্ড →',
    },
    about: {
      badge: 'পেশাদার পরিচিতি',
      title: 'আমার সম্পর্কে',
      subtitle: 'ক্রিয়েটিভিটি, আধুনিক নান্দনিকতা ও এডিটিং পারদর্শিতার সমন্বয়ে ভিজ্যুয়াল স্টোরিটেলার।',
      description:
        'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট (SDI) থেকে প্রশিক্ষিত ও সার্টিফাইড প্রফেশনাল। ইউটিউব ভিডিও এডিটিং, কমার্শিয়াল রিলস, মোশন গ্রাফিক্স ও প্রিমিয়াম ব্র্যান্ডিং ডিজাইনে দক্ষ।',
      atAGlance: 'এক নজরে',
      fullName: 'পূর্ণ নাম',
      trainingInstitution: 'প্রশিক্ষণ প্রতিষ্ঠান',
      location: 'ঠিকানা',
      availability: 'কাজের প্রাপ্যতা',
      primaryFocus: 'মূল দক্ষতা',
      downloadCV: 'সিভি / রেজুমে ডাউনলোড',
      letsTalk: 'কথা বলুন',
    },
    portfolio: {
      badge: 'নির্বাচিত প্রজেক্ট',
      title: 'প্রজেক্ট পোর্টফোলিও',
      subtitle: 'আমার কমার্শিয়াল ভিডিও এডিটিং, ইউটিউব মাস্টার কাট, সোশ্যাল রিলস এবং ব্র্যান্ড গ্রাফিক ডিজাইনসমূহ দেখুন।',
      filterAll: 'সব কাজ',
      filterVideo: 'ভিডিও এডিটিং',
      filterGraphic: 'গ্রাফিক ডিজাইন',
      filterMotion: 'মোশন গ্রাফিক্স',
      filterShowreel: 'শোরিল',
      addVideoBtn: '+ ইউটিউব ভিডিও যোগ করুন',
      addGraphicBtn: '+ ছবি / গ্রাফিক্স যোগ করুন',
      linkBtn: 'লিংক',
      viewBtn: 'বিস্তারিত দেখুন',
      featuredTag: 'ফিচার্ড',
      clientLabel: 'ক্লায়েন্ট',
      emptyText: 'এই ক্যাটাগরিতে কোনো প্রজেক্ট পাওয়া যায়নি।',
    },
    showreel: {
      badge: 'ভিডিও শোরিল',
      title: 'ডায়নামিক শোরিল ও শর্টস',
      subtitle: '৯:১৬ ভার্টিক্যাল ফরম্যাটে হাই-এনার্জি কাট, মোশন ট্রানজিশন এবং সাউন্ড ডিজাইনের আকর্ষণীয় উপস্থাপনা।',
      linkBtn: '⚡ শোরিল লিংক পরিবর্তন করুন',
      pastePlaceholder: 'ইউটিউব ভিডিও বা শর্টস লিংক পেস্ট করুন (যেমন https://youtu.be/... বা https://youtube.com/shorts/...)',
      saveAndPlay: 'সংরক্ষণ ও প্লে করুন',
      tip: 'যেকোনো ইউটিউব ভিডিও বা শর্টসের লিংক পেস্ট করুন। সাথে সাথে ভিডিও ও থাম্বনেইল আপডেট হয়ে যাবে।',
    },
    services: {
      badge: 'আমার সেবাসমূহ',
      title: 'প্রফেশনাল সার্ভিস',
      subtitle: 'কনটেন্ট ক্রিয়েটর, এজেন্সি ও ব্র্যান্ডের জন্য সম্পূর্ণ ক্রিয়েটিভ এডিটিং ও ডিজাইন সল্যুশন।',
      videoTab: '🎬 ভিডিও এডিটিং সেবা',
      graphicTab: '🎨 গ্রাফিক ডিজাইন সেবা',
      pricingStarts: 'শুরু মাত্র',
      requestService: 'সার্ভিস অর্ডার করুন',
    },
    skills: {
      badge: 'টুলস ও দক্ষতা',
      title: 'সফটওয়্যার ও টেকনিক্যাল স্কিলস',
      subtitle: 'ইন্ডাস্ট্রি স্ট্যান্ডার্ড ক্রিয়েটিভ সফটওয়্যার ও প্রফেশনাল ওয়ার্কফ্লো।',
      softwareTab: 'সফটওয়্যার দক্ষতা',
      technicalTab: 'টেকনিক্যাল পারদর্শিতা',
    },
    contact: {
      badge: 'যোগাযোগ',
      title: 'একসাথে কাজ শুরু করি',
      subtitle: 'আপনার কোনো প্রজেক্ট বা কাজের পরিকল্পনা থাকলে নির্দ্বিধায় যোগাযোগ করতে পারেন।',
      sendMessage: 'মেসেজ পাঠান',
      sendBtn: 'মেসেজ পাঠান',
      nameLabel: 'আপনার নাম',
      emailLabel: 'আপনার ইমেইল',
      subjectLabel: 'বিষয়',
      messageLabel: 'আপনার বার্তা',
      directContact: 'সরাসরি যোগাযোগের ঠিকানা',
      email: 'ইমেইল',
      phone: 'ফোন',
      location: 'ঠিকানা',
      whatsappChat: 'হোয়াটসঅ্যাপে চ্যাট করুন',
    },
    footer: {
      rightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
      backToTop: 'উপরে যান',
    },
  },
};
