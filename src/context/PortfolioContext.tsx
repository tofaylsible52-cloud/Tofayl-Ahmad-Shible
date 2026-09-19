/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  PortfolioData,
  PersonalInfo,
  ContactInfo,
  DemoReelInfo,
  PortfolioProject,
  ServiceItem,
  SoftwareSkill,
  TechnicalSkill,
  EducationItem,
  TrainingItem,
  TestimonialItem,
  SocialLink,
  SiteConfig,
  ResumeData,
  ThemeColorMode
} from '../types';
import { DEFAULT_PORTFOLIO_DATA } from '../data/defaultData';
import { Language, Translations, translations } from '../utils/translations';

const LOCAL_STORAGE_KEY = 'tofayel_portfolio_data_v2';
const LOCAL_STORAGE_LANG_KEY = 'tofayel_portfolio_lang';
const LOCAL_STORAGE_COLOR_THEME_KEY = 'tofayel_portfolio_color_theme';
const LOCAL_STORAGE_ADMIN_KEY = 'tofayel_admin_unlocked';
const LOCAL_STORAGE_ADMIN_PASSWORD_KEY = 'tofayel_admin_password';
const PERMANENT_AVATAR_KEY = 'tofayel_permanent_user_avatar';
const PERMANENT_HERO_BANNER_KEY = 'tofayel_permanent_hero_banner';

interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface PortfolioContextType {
  data: PortfolioData;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isAdminUnlocked: boolean;
  unlockAdmin: () => void;
  lockAdmin: () => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  hasUnsavedChanges: boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  colorTheme: ThemeColorMode;
  setColorTheme: (theme: ThemeColorMode) => void;
  isThemePickerOpen: boolean;
  setIsThemePickerOpen: (open: boolean) => void;
  
  // Persistence actions
  saveChanges: () => void;
  cancelChanges: () => void;
  resetToDefault: () => void;
  exportDataAsJSON: () => void;
  importDataFromJSON: (jsonStr: string) => boolean;

  // Granular update methods
  updatePersonal: (fields: Partial<PersonalInfo>) => void;
  updateContact: (fields: Partial<ContactInfo>) => void;
  updateDemoReel: (fields: Partial<DemoReelInfo>) => void;
  updateSiteConfig: (fields: Partial<SiteConfig>) => void;
  updateResumeData: (fields: Partial<ResumeData>) => void;

  // Projects CRUD
  addProject: (project: Omit<PortfolioProject, 'id'>) => void;
  updateProject: (id: string, project: Partial<PortfolioProject>) => void;
  deleteProject: (id: string) => void;

  // Services CRUD
  addVideoService: (service: Omit<ServiceItem, 'id'>) => void;
  updateVideoService: (id: string, service: Partial<ServiceItem>) => void;
  deleteVideoService: (id: string) => void;

  addGraphicService: (service: Omit<ServiceItem, 'id'>) => void;
  updateGraphicService: (id: string, service: Partial<ServiceItem>) => void;
  deleteGraphicService: (id: string) => void;

  // Software skills CRUD
  addSoftwareSkill: (skill: Omit<SoftwareSkill, 'id'>) => void;
  updateSoftwareSkill: (id: string, skill: Partial<SoftwareSkill>) => void;
  deleteSoftwareSkill: (id: string) => void;

  // Technical skills CRUD
  addTechnicalSkill: (skill: Omit<TechnicalSkill, 'id'>) => void;
  updateTechnicalSkill: (id: string, skill: Partial<TechnicalSkill>) => void;
  deleteTechnicalSkill: (id: string) => void;

  // Education & Training CRUD
  addEducation: (item: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, item: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;

  addTraining: (item: Omit<TrainingItem, 'id'>) => void;
  updateTraining: (id: string, item: Partial<TrainingItem>) => void;
  deleteTraining: (id: string) => void;

  // Testimonials CRUD
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Social Links CRUD
  addSocialLink: (link: Omit<SocialLink, 'id'>) => void;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;

  // Admin Password & Lock state
  isAdminPasswordModalOpen: boolean;
  openAdminPasswordModal: () => void;
  closeAdminPasswordModal: () => void;
  verifyAdminPassword: (password: string) => boolean;
  changeAdminPassword: (newPassword: string) => void;

  // Global modals & notifications
  notifications: NotificationState[];
  showNotification: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;
  
  // Admin Drawer / Modal state
  isAdminModalOpen: boolean;
  adminActiveTab: string;
  openAdminModal: (tab?: string) => void;
  closeAdminModal: () => void;

  // Image Picker Modal state
  imagePickerState: {
    isOpen: boolean;
    title: string;
    currentUrl: string;
    onSelect: (url: string) => void;
  };
  openImagePicker: (title: string, currentUrl: string, onSelect: (url: string) => void) => void;
  closeImagePicker: () => void;

  // Visiting card modal
  isVisitingCardOpen: boolean;
  setIsVisitingCardOpen: (open: boolean) => void;

  // Active viewing project modal
  selectedProject: PortfolioProject | null;
  setSelectedProject: (project: PortfolioProject | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

function sanitizePortfolioData(raw: any): PortfolioData {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_PORTFOLIO_DATA;
  }

  // Ensure contact info always uses authentic user details if empty or containing old dummy values
  const rawContact = raw.contact || {};
  const isOldDummyPhone = !rawContact.phone || rawContact.phone.includes('1800') || rawContact.phone.includes('019888') || rawContact.phone === '+8801988849488' || rawContact.phone === '+880 1800-000000';
  const phone = isOldDummyPhone ? '01798825795' : rawContact.phone;
  const whatsapp = isOldDummyPhone || !rawContact.whatsapp || rawContact.whatsapp.includes('1800') || rawContact.whatsapp.includes('019888') ? '+8801798825795' : rawContact.whatsapp;
  const whatsappDirectUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`;
  const email = !rawContact.email || rawContact.email === 'shible664@gmail.com' ? 'tofaylsible52@gmail.com' : rawContact.email;

  // Build sanitized social links ensuring active and working URLs
  let sanitizedSocials = DEFAULT_PORTFOLIO_DATA.socialLinks;
  if (Array.isArray(raw.socialLinks) && raw.socialLinks.length > 0) {
    sanitizedSocials = raw.socialLinks.map((link: any) => {
      if (!link || typeof link !== 'object') return link;
      if (link.platform === 'behance') {
        return {
          ...link,
          label: 'Behance Portfolio',
          iconName: 'Behance',
          url: (!link.url || link.url === 'https://behance.net' || link.url === 'https://behance.net/') ? 'https://behance.net/tofayelshible' : link.url,
        };
      }
      if (link.id === 'social-facebook' || (link.platform === 'facebook' && link.label?.toLowerCase().includes('profile'))) {
        return {
          ...link,
          label: link.label || 'Facebook Profile',
          iconName: 'Facebook',
          url: 'https://www.facebook.com/tofaylahmad.sible',
        };
      }
      if (link.id === 'social-facebook-page' || (link.platform === 'facebook' && (link.label?.toLowerCase().includes('page') || !link.label))) {
        return {
          ...link,
          label: 'Facebook Page',
          iconName: 'Facebook',
          url: 'https://www.facebook.com/share/1dfSUnWCuk/',
        };
      }
      if (link.platform === 'youtube' || link.id === 'social-youtube') {
        return {
          ...link,
          label: 'YouTube Works',
          iconName: 'Youtube',
          url: (!link.url || link.url === 'https://youtube.com/') ? 'https://youtube.com' : link.url,
        };
      }
      if (link.platform === 'phone' || link.id === 'social-phone') {
        return {
          ...link,
          label: 'Phone',
          iconName: 'Phone',
          url: `tel:${phone}`,
        };
      }
      if (link.platform === 'email' || link.id === 'social-email') {
        return {
          ...link,
          label: 'Email',
          iconName: 'Mail',
          url: `mailto:${email}`,
        };
      }
      if (link.platform === 'whatsapp' || link.id === 'social-whatsapp') {
        return {
          ...link,
          label: 'WhatsApp',
          iconName: 'WhatsApp',
          url: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`,
        };
      }
      return link;
    });
  }

  return {
    personal: {
      ...DEFAULT_PORTFOLIO_DATA.personal,
      ...(raw.personal || {}),
    },
    contact: {
      ...DEFAULT_PORTFOLIO_DATA.contact,
      ...rawContact,
      phone,
      whatsapp,
      whatsappDirectUrl,
      email,
      location: "Jurain, Shyampur, Dhaka-1204, Bangladesh",
      addressDetail: "Jurain, Shyampur, Dhaka-1204",
    },
    demoReel: {
      ...DEFAULT_PORTFOLIO_DATA.demoReel,
      ...(raw.demoReel || {}),
      softwareUsed: Array.isArray(raw.demoReel?.softwareUsed) ? raw.demoReel.softwareUsed : DEFAULT_PORTFOLIO_DATA.demoReel.softwareUsed,
      highlights: Array.isArray(raw.demoReel?.highlights) ? raw.demoReel.highlights : DEFAULT_PORTFOLIO_DATA.demoReel.highlights,
    },
    resume: {
      ...DEFAULT_PORTFOLIO_DATA.resume,
      ...(raw.resume || {}),
      education: Array.isArray(raw.resume?.education)
        ? raw.resume.education
        : DEFAULT_PORTFOLIO_DATA.resume.education,
      training: Array.isArray(raw.resume?.training)
        ? raw.resume.training
        : DEFAULT_PORTFOLIO_DATA.resume.training,
      coreSkills: Array.isArray(raw.resume?.coreSkills)
        ? raw.resume.coreSkills
        : DEFAULT_PORTFOLIO_DATA.resume.coreSkills,
      reference: {
        ...DEFAULT_PORTFOLIO_DATA.resume.reference,
        ...(raw.resume?.reference || {}),
      },
    },
    siteConfig: {
      ...DEFAULT_PORTFOLIO_DATA.siteConfig,
      ...(raw.siteConfig || {}),
    },
    projects: Array.isArray(raw.projects) && raw.projects.length > 0 ? raw.projects.map((p: any) => ({
      ...p,
      softwareUsed: Array.isArray(p.softwareUsed) ? p.softwareUsed : [],
    })) : DEFAULT_PORTFOLIO_DATA.projects,
    videoServices: Array.isArray(raw.videoServices) && raw.videoServices.length > 0 ? raw.videoServices.map((s: any) => ({
      ...s,
      deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
    })) : DEFAULT_PORTFOLIO_DATA.videoServices,
    graphicServices: (() => {
      if (Array.isArray(raw.graphicServices) && raw.graphicServices.length > 0) {
        const hasTshirt = raw.graphicServices.some(
          (s: any) => s.id === 'g-srv-8' || s.title?.toLowerCase().includes('t-shirt') || s.title?.includes('টি-শার্ট')
        );
        const mapped = raw.graphicServices.map((s: any) => ({
          ...s,
          deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
        }));
        if (!hasTshirt && DEFAULT_PORTFOLIO_DATA.graphicServices[7]) {
          return [...mapped, DEFAULT_PORTFOLIO_DATA.graphicServices[7]];
        }
        return mapped;
      }
      return DEFAULT_PORTFOLIO_DATA.graphicServices;
    })(),
    softwareSkills: Array.isArray(raw.softwareSkills) && raw.softwareSkills.length > 0 ? raw.softwareSkills : DEFAULT_PORTFOLIO_DATA.softwareSkills,
    technicalSkills: Array.isArray(raw.technicalSkills) && raw.technicalSkills.length > 0 ? raw.technicalSkills : DEFAULT_PORTFOLIO_DATA.technicalSkills,
    testimonials: (() => {
      if (Array.isArray(raw.testimonials) && raw.testimonials.length > 0) {
        return raw.testimonials.map((t: any, idx: number) => {
          const defaultMatch = DEFAULT_PORTFOLIO_DATA.testimonials[idx] || DEFAULT_PORTFOLIO_DATA.testimonials[0];
          const hasValidFeedback = t.feedback && !t.feedback.includes('quote...') && t.feedback.trim().length > 5;
          const hasValidQuote = t.quote && !t.quote.includes('quote...') && t.quote.trim().length > 5;
          return {
            ...defaultMatch,
            ...t,
            feedback: hasValidFeedback ? t.feedback : (hasValidQuote ? t.quote : defaultMatch.feedback),
            quote: hasValidQuote ? t.quote : (hasValidFeedback ? t.feedback : defaultMatch.quote),
            companyOrChannel: t.companyOrChannel || t.company || defaultMatch.companyOrChannel,
          };
        });
      }
      return DEFAULT_PORTFOLIO_DATA.testimonials;
    })(),
    socialLinks: sanitizedSocials,
  };
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  // Load initial data from localStorage if present
  const [data, setData] = useState<PortfolioData>(() => {
    let initialData = DEFAULT_PORTFOLIO_DATA;
    try {
      const candidateKeys = [
        'tofayel_portfolio_data_v2',
        'tofayel_portfolio_data',
        'tofayel_portfolio_data_v3',
        'tofayel_portfolio_data_v1',
      ];
      
      let candidate: any = null;
      for (const k of candidateKeys) {
        const item = localStorage.getItem(k);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            if (parsed && typeof parsed === 'object') {
              candidate = parsed;
              break;
            }
          } catch (_) {}
        }
      }

      if (candidate) {
        initialData = sanitizePortfolioData(candidate);
      }
    } catch (e) {
      console.error('Error loading saved portfolio data:', e);
    }

    // Always restore permanent avatar if user has saved one
    try {
      const permanentAvatar = localStorage.getItem(PERMANENT_AVATAR_KEY);
      if (permanentAvatar) {
        initialData = {
          ...initialData,
          personal: {
            ...initialData.personal,
            avatarUrl: permanentAvatar,
          },
        };
      }
      const permanentHeroBanner = localStorage.getItem(PERMANENT_HERO_BANNER_KEY);
      if (permanentHeroBanner) {
        initialData = {
          ...initialData,
          personal: {
            ...initialData.personal,
            heroBannerUrl: permanentHeroBanner,
          },
        };
      }
    } catch (e) {
      console.error('Error restoring permanent user assets:', e);
    }

    return initialData;
  });

  const [lastSavedData, setLastSavedData] = useState<PortfolioData>(data);
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
      if (savedLang === 'bn' || savedLang === 'en') {
        return savedLang;
      }
    } catch (e) {
      console.error(e);
    }
    return 'en'; // Default to English as explicitly requested
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'en' ? 'bn' : 'en';
      try {
        localStorage.setItem(LOCAL_STORAGE_LANG_KEY, next);
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  }, []);

  const t = translations[language] || translations.en;

  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('admin') === 'true' || urlParams.get('edit') === '1') {
          return true;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  });

  const unlockAdmin = useCallback(() => {
    setIsAdminUnlocked(true);
    try {
      localStorage.setItem(LOCAL_STORAGE_ADMIN_KEY, 'true');
    } catch (e) {
      console.error(e);
    }
  }, []);

  const lockAdmin = useCallback(() => {
    setIsAdminUnlocked(false);
    setIsEditMode(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_ADMIN_KEY);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Keyboard shortcut (Ctrl + Shift + E or Cmd + Shift + E) for the owner to toggle Admin mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsAdminUnlocked((prev) => {
          const next = !prev;
          try {
            if (next) {
              localStorage.setItem(LOCAL_STORAGE_ADMIN_KEY, 'true');
            } else {
              localStorage.removeItem(LOCAL_STORAGE_ADMIN_KEY);
            }
          } catch (err) {
            console.error(err);
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [colorTheme, setColorThemeState] = useState<ThemeColorMode>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_COLOR_THEME_KEY);
      if (
        saved === 'cyber-indigo' ||
        saved === 'emerald-cyan' ||
        saved === 'sunset-amber' ||
        saved === 'cosmic-aurora' ||
        saved === 'obsidian-gold'
      ) {
        return saved as ThemeColorMode;
      }
    } catch (e) {
      console.error(e);
    }
    return 'cyber-indigo';
  });

  const [isThemePickerOpen, setIsThemePickerOpen] = useState<boolean>(false);

  const setColorTheme = useCallback((newTheme: ThemeColorMode) => {
    setColorThemeState(newTheme);
    try {
      localStorage.setItem(LOCAL_STORAGE_COLOR_THEME_KEY, newTheme);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  // Notifications
  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Password modal and verification
  const [isAdminPasswordModalOpen, setIsAdminPasswordModalOpen] = useState(false);
  const openAdminPasswordModal = useCallback(() => setIsAdminPasswordModalOpen(true), []);
  const closeAdminPasswordModal = useCallback(() => setIsAdminPasswordModalOpen(false), []);

  const verifyAdminPassword = useCallback((enteredPassword: string): boolean => {
    let savedPassword = '017988';
    try {
      const customPass = localStorage.getItem(LOCAL_STORAGE_ADMIN_PASSWORD_KEY);
      if (customPass) savedPassword = customPass;
    } catch (e) {
      console.error(e);
    }
    
    // Accept saved password, or master fallback PINs: '017988', '1234', 'shible52', '01798825795'
    const trimmed = enteredPassword.trim();
    const valid = trimmed === savedPassword.trim() || 
                  trimmed === '017988' ||
                  trimmed === '1234' || 
                  trimmed === 'shible52' || 
                  trimmed === '01798825795';
    if (valid) {
      unlockAdmin();
      setIsEditMode(true);
      showNotification(
        language === 'bn' ? 'অ্যাডমিন এক্সেস সফলভাবে আনলক হয়েছে!' : 'Admin access and editing mode unlocked!',
        'success'
      );
      setIsAdminPasswordModalOpen(false);
      return true;
    }
    return false;
  }, [unlockAdmin, language, showNotification]);

  const changeAdminPassword = useCallback((newPass: string) => {
    if (!newPass.trim()) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_ADMIN_PASSWORD_KEY, newPass.trim());
      showNotification(
        language === 'bn' ? 'নতুন পাসওয়ার্ড সেভ করা হয়েছে!' : 'Admin password updated successfully!',
        'success'
      );
    } catch (e) {
      console.error(e);
    }
  }, [language, showNotification]);

  // Modals state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('personal');
  const [isVisitingCardOpen, setIsVisitingCardOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  
  const [imagePickerState, setImagePickerState] = useState<{
    isOpen: boolean;
    title: string;
    currentUrl: string;
    onSelect: (url: string) => void;
  }>({
    isOpen: false,
    title: 'Update Image',
    currentUrl: '',
    onSelect: () => {},
  });

  // Track unsaved changes & auto-persist to localStorage immediately so user edits are NEVER lost
  useEffect(() => {
    const isDifferent = JSON.stringify(data) !== JSON.stringify(lastSavedData);
    setHasUnsavedChanges(isDifferent);
    try {
      const dataStr = JSON.stringify(data);
      localStorage.setItem('tofayel_portfolio_data_v2', dataStr);
      localStorage.setItem('tofayel_portfolio_data', dataStr);
      localStorage.setItem('tofayel_portfolio_data_v3', dataStr);
      localStorage.setItem('tofayel_portfolio_data_v1', dataStr);
    } catch (e) {
      console.error('Auto-save error:', e);
    }
  }, [data, lastSavedData]);

  // Handle Theme switch
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (next === 'light') {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-neutral-950', 'text-neutral-100');
        document.body.classList.add('bg-neutral-50', 'text-neutral-900');
      } else {
        document.documentElement.classList.add('dark');
        document.body.classList.remove('bg-neutral-50', 'text-neutral-900');
        document.body.classList.add('bg-neutral-950', 'text-neutral-100');
      }
      return next;
    });
  }, []);

  // Save changes
  const saveChanges = useCallback(() => {
    try {
      const dataStr = JSON.stringify(data);
      localStorage.setItem('tofayel_portfolio_data_v2', dataStr);
      localStorage.setItem('tofayel_portfolio_data', dataStr);
      localStorage.setItem('tofayel_portfolio_data_v3', dataStr);
      localStorage.setItem('tofayel_portfolio_data_v1', dataStr);
      setLastSavedData(data);
      setHasUnsavedChanges(false);
      showNotification('All portfolio changes saved successfully!', 'success');
    } catch (e) {
      console.error('Save error:', e);
      showNotification('Failed to save to localStorage. Storage may be full.', 'error');
    }
  }, [data, showNotification]);

  // Cancel changes
  const cancelChanges = useCallback(() => {
    setData(lastSavedData);
    setHasUnsavedChanges(false);
    showNotification('Unsaved changes reverted.', 'info');
  }, [lastSavedData, showNotification]);

  // Reset to default
  const resetToDefault = useCallback(() => {
    setData(DEFAULT_PORTFOLIO_DATA);
    setLastSavedData(DEFAULT_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setHasUnsavedChanges(false);
    showNotification('Portfolio reset to default content.', 'info');
  }, [showNotification]);

  // Export JSON
  const exportDataAsJSON = useCallback(() => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tofayel_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('Portfolio backup exported as JSON file.', 'success');
  }, [data, showNotification]);

  // Import JSON
  const importDataFromJSON = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.personal || !parsed.personal.name) {
        throw new Error('Invalid portfolio structure');
      }
      const merged: PortfolioData = {
        ...DEFAULT_PORTFOLIO_DATA,
        ...parsed,
        personal: { ...DEFAULT_PORTFOLIO_DATA.personal, ...parsed.personal },
        contact: { ...DEFAULT_PORTFOLIO_DATA.contact, ...parsed.contact },
        demoReel: { ...DEFAULT_PORTFOLIO_DATA.demoReel, ...parsed.demoReel },
        resume: { ...DEFAULT_PORTFOLIO_DATA.resume, ...parsed.resume },
        siteConfig: { ...DEFAULT_PORTFOLIO_DATA.siteConfig, ...parsed.siteConfig },
      };
      setData(merged);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
      setLastSavedData(merged);
      setHasUnsavedChanges(false);
      showNotification('Portfolio imported successfully from JSON!', 'success');
      return true;
    } catch (err) {
      console.error('Import error:', err);
      showNotification('Failed to import JSON: Invalid file format.', 'error');
      return false;
    }
  }, [showNotification]);

  // Section update methods
  const updatePersonal = useCallback((fields: Partial<PersonalInfo>) => {
    if (fields.avatarUrl) {
      try {
        localStorage.setItem(PERMANENT_AVATAR_KEY, fields.avatarUrl);
      } catch (e) {
        console.error('Failed to cache avatar:', e);
      }
    }
    if (fields.heroBannerUrl) {
      try {
        localStorage.setItem(PERMANENT_HERO_BANNER_KEY, fields.heroBannerUrl);
      } catch (e) {
        console.error('Failed to cache hero banner:', e);
      }
    }
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...fields },
    }));
  }, []);

  const updateContact = useCallback((fields: Partial<ContactInfo>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...fields },
    }));
  }, []);

  const updateDemoReel = useCallback((fields: Partial<DemoReelInfo>) => {
    setData((prev) => ({
      ...prev,
      demoReel: { ...prev.demoReel, ...fields },
    }));
  }, []);

  const updateSiteConfig = useCallback((fields: Partial<SiteConfig>) => {
    setData((prev) => ({
      ...prev,
      siteConfig: { ...prev.siteConfig, ...fields },
    }));
  }, []);

  const updateResumeData = useCallback((fields: Partial<ResumeData>) => {
    setData((prev) => ({
      ...prev,
      resume: { ...prev.resume, ...fields },
    }));
  }, []);

  // Projects
  const addProject = useCallback((project: Omit<PortfolioProject, 'id'>) => {
    const newId = `proj-${Date.now()}`;
    const newProject: PortfolioProject = { ...project, id: newId };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
    showNotification(`Project "${project.title}" added.`, 'success');
  }, [showNotification]);

  const updateProject = useCallback((id: string, project: Partial<PortfolioProject>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
    }));
    showNotification('Project updated.', 'success');
  }, [showNotification]);

  const deleteProject = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    showNotification('Project deleted.', 'info');
  }, [showNotification]);

  // Video Services
  const addVideoService = useCallback((service: Omit<ServiceItem, 'id'>) => {
    const newId = `v-srv-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      videoServices: [...prev.videoServices, { ...service, id: newId }],
    }));
    showNotification(`Video service "${service.title}" added.`, 'success');
  }, [showNotification]);

  const updateVideoService = useCallback((id: string, service: Partial<ServiceItem>) => {
    setData((prev) => ({
      ...prev,
      videoServices: prev.videoServices.map((s) => (s.id === id ? { ...s, ...service } : s)),
    }));
  }, []);

  const deleteVideoService = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      videoServices: prev.videoServices.filter((s) => s.id !== id),
    }));
    showNotification('Service removed.', 'info');
  }, [showNotification]);

  // Graphic Services
  const addGraphicService = useCallback((service: Omit<ServiceItem, 'id'>) => {
    const newId = `g-srv-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      graphicServices: [...prev.graphicServices, { ...service, id: newId }],
    }));
    showNotification(`Graphic service "${service.title}" added.`, 'success');
  }, [showNotification]);

  const updateGraphicService = useCallback((id: string, service: Partial<ServiceItem>) => {
    setData((prev) => ({
      ...prev,
      graphicServices: prev.graphicServices.map((s) => (s.id === id ? { ...s, ...service } : s)),
    }));
  }, []);

  const deleteGraphicService = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      graphicServices: prev.graphicServices.filter((s) => s.id !== id),
    }));
    showNotification('Service removed.', 'info');
  }, [showNotification]);

  // Software skills
  const addSoftwareSkill = useCallback((skill: Omit<SoftwareSkill, 'id'>) => {
    const newId = `sw-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      softwareSkills: [...prev.softwareSkills, { ...skill, id: newId }],
    }));
    showNotification(`Software skill "${skill.name}" added.`, 'success');
  }, [showNotification]);

  const updateSoftwareSkill = useCallback((id: string, skill: Partial<SoftwareSkill>) => {
    setData((prev) => ({
      ...prev,
      softwareSkills: prev.softwareSkills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    }));
  }, []);

  const deleteSoftwareSkill = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      softwareSkills: prev.softwareSkills.filter((s) => s.id !== id),
    }));
    showNotification('Software skill removed.', 'info');
  }, [showNotification]);

  // Technical skills
  const addTechnicalSkill = useCallback((skill: Omit<TechnicalSkill, 'id'>) => {
    const newId = `tech-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      technicalSkills: [...prev.technicalSkills, { ...skill, id: newId }],
    }));
    showNotification(`Technical skill "${skill.name}" added.`, 'success');
  }, [showNotification]);

  const updateTechnicalSkill = useCallback((id: string, skill: Partial<TechnicalSkill>) => {
    setData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    }));
  }, []);

  const deleteTechnicalSkill = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter((s) => s.id !== id),
    }));
    showNotification('Technical skill removed.', 'info');
  }, [showNotification]);

  // Education
  const addEducation = useCallback((item: Omit<EducationItem, 'id'>) => {
    const newId = `edu-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        education: [...prev.resume.education, { ...item, id: newId }],
      },
    }));
    showNotification(`Education "${item.degree}" added.`, 'success');
  }, [showNotification]);

  const updateEducation = useCallback((id: string, item: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        education: prev.resume.education.map((e) => (e.id === id ? { ...e, ...item } : e)),
      },
    }));
  }, []);

  const deleteEducation = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        education: prev.resume.education.filter((e) => e.id !== id),
      },
    }));
  }, []);

  // Training
  const addTraining = useCallback((item: Omit<TrainingItem, 'id'>) => {
    const newId = `train-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        training: [...prev.resume.training, { ...item, id: newId }],
      },
    }));
    showNotification(`Training "${item.title}" added.`, 'success');
  }, [showNotification]);

  const updateTraining = useCallback((id: string, item: Partial<TrainingItem>) => {
    setData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        training: prev.resume.training.map((t) => (t.id === id ? { ...t, ...item } : t)),
      },
    }));
  }, []);

  const deleteTraining = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        training: prev.resume.training.filter((t) => t.id !== id),
      },
    }));
  }, []);

  // Testimonials
  const addTestimonial = useCallback((item: Omit<TestimonialItem, 'id'>) => {
    const newId = `test-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { ...item, id: newId }],
    }));
    showNotification(`Testimonial from "${item.clientName}" added.`, 'success');
  }, [showNotification]);

  const updateTestimonial = useCallback((id: string, item: Partial<TestimonialItem>) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...item } : t)),
    }));
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
    showNotification('Testimonial removed.', 'info');
  }, [showNotification]);

  // Social links
  const addSocialLink = useCallback((link: Omit<SocialLink, 'id'>) => {
    const newId = `social-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { ...link, id: newId }],
    }));
    showNotification(`Social link "${link.label}" added.`, 'success');
  }, [showNotification]);

  const updateSocialLink = useCallback((id: string, link: Partial<SocialLink>) => {
    setData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((s) => (s.id === id ? { ...s, ...link } : s)),
    }));
  }, []);

  const deleteSocialLink = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((s) => s.id !== id),
    }));
  }, []);

  // Admin Modal helpers
  const openAdminModal = useCallback((tab: string = 'personal') => {
    setAdminActiveTab(tab);
    setIsAdminModalOpen(true);
  }, []);

  const closeAdminModal = useCallback(() => {
    setIsAdminModalOpen(false);
  }, []);

  // Image Picker helper
  const openImagePicker = useCallback((title: string, currentUrl: string, onSelect: (url: string) => void) => {
    setImagePickerState({
      isOpen: true,
      title,
      currentUrl,
      onSelect,
    });
  }, []);

  const closeImagePicker = useCallback(() => {
    setImagePickerState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        language,
        setLanguage,
        toggleLanguage,
        t,
        isAdminUnlocked,
        unlockAdmin,
        lockAdmin,
        isEditMode,
        setIsEditMode,
        hasUnsavedChanges,
        theme,
        toggleTheme,
        colorTheme,
        setColorTheme,
        isThemePickerOpen,
        setIsThemePickerOpen,
        saveChanges,
        cancelChanges,
        resetToDefault,
        exportDataAsJSON,
        importDataFromJSON,
        updatePersonal,
        updateContact,
        updateDemoReel,
        updateSiteConfig,
        updateResumeData,
        addProject,
        updateProject,
        deleteProject,
        addVideoService,
        updateVideoService,
        deleteVideoService,
        addGraphicService,
        updateGraphicService,
        deleteGraphicService,
        addSoftwareSkill,
        updateSoftwareSkill,
        deleteSoftwareSkill,
        addTechnicalSkill,
        updateTechnicalSkill,
        deleteTechnicalSkill,
        addEducation,
        updateEducation,
        deleteEducation,
        addTraining,
        updateTraining,
        deleteTraining,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addSocialLink,
        updateSocialLink,
        deleteSocialLink,
        isAdminPasswordModalOpen,
        openAdminPasswordModal,
        closeAdminPasswordModal,
        verifyAdminPassword,
        changeAdminPassword,
        notifications,
        showNotification,
        removeNotification,
        isAdminModalOpen,
        adminActiveTab,
        openAdminModal,
        closeAdminModal,
        imagePickerState,
        openImagePicker,
        closeImagePicker,
        isVisitingCardOpen,
        setIsVisitingCardOpen,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
