/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SocialLink {
  id: string;
  platform: 'email' | 'phone' | 'whatsapp' | 'facebook' | 'linkedin' | 'behance' | 'instagram' | 'youtube' | 'github' | 'other';
  label: string;
  url: string;
  iconName: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Video Editing' | 'Graphic Design';
  subCategory: string;
  thumbnailUrl: string;
  videoUrl?: string;
  description: string;
  clientName: string;
  softwareUsed: string[];
  featured: boolean;
  projectDate: string;
  demoUrl?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
  badge?: string;
}

export interface SoftwareSkill {
  id: string;
  name: string;
  category: 'Video' | 'Design' | 'Motion' | 'Office';
  iconName: string;
  proficiency: number; // 0-100
  glowColor: 'blue' | 'purple' | 'cyan' | 'orange' | 'pink' | 'emerald';
  description: string;
  accentHex: string;
}

export interface TechnicalSkill {
  id: string;
  name: string;
  category: 'Core Video' | 'Core Design' | 'Marketing & AI' | 'Workflow';
  level: string; // e.g. "Advanced", "Expert", "Specialist"
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  status: 'Ongoing' | 'Completed' | 'Certified';
  institution: string;
  year: string;
  description: string;
}

export interface TrainingItem {
  id: string;
  title: string;
  institute: string;
  period: string;
  description: string;
  skillsLearned: string[];
}

export interface ReferenceInfo {
  name: string;
  role: string;
  organization: string;
  phone?: string;
  email?: string;
  location?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  companyOrChannel: string;
  company?: string;
  avatarUrl: string;
  rating: number;
  feedback: string;
  quote?: string;
  projectType: string;
}

export interface DemoReelInfo {
  title: string;
  subtitle: string;
  videoType: 'youtube' | 'vimeo' | 'direct';
  videoUrl: string;
  thumbnailUrl: string;
  role: string;
  softwareUsed: string[];
  description: string;
  highlights: string[];
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  title: string;
  shortBio: string;
  bio: string;
  location: string;
  shortLocation: string;
  trainingSummary: string;
  avatarUrl: string;
  heroBannerUrl: string;
  availabilityStatus: 'available' | 'busy' | 'limited';
  availabilityText: string;
  yearsExperience: string;
  completedProjectsCount: string;
  happyClientsCount: string;
  satisfactionRate: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  whatsappDirectUrl: string;
  location: string;
  addressDetail: string;
  workingHours: string;
}

export interface ResumeData {
  careerObjective: string;
  education: EducationItem[];
  training: TrainingItem[];
  coreSkills: string[];
  reference: ReferenceInfo;
}

export type ThemeColorMode =
  | 'cyber-indigo'    // 1. Cyber Indigo & Electric Violet
  | 'emerald-cyan'    // 2. Emerald Mint & Neon Cyan
  | 'sunset-amber'    // 3. Sunset Amber & Deep Magenta
  | 'cosmic-aurora'   // 4. Cosmic Aurora Mesh
  | 'obsidian-gold';  // 5. Luxury Obsidian Gold & Royal Blue

export interface SiteConfig {
  logoText: string;
  tagline: string;
  copyrightText: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  contact: ContactInfo;
  socialLinks: SocialLink[];
  demoReel: DemoReelInfo;
  projects: PortfolioProject[];
  videoServices: ServiceItem[];
  graphicServices: ServiceItem[];
  softwareSkills: SoftwareSkill[];
  technicalSkills: TechnicalSkill[];
  resume: ResumeData;
  testimonials: TestimonialItem[];
  siteConfig: SiteConfig;
}
