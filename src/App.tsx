/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { DemoReelSection } from './components/sections/DemoReelSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { SoftwareSkillsSection } from './components/sections/SoftwareSkillsSection';
import { TechnicalSkillsSection } from './components/sections/TechnicalSkillsSection';
import { ResumeSection } from './components/sections/ResumeSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { EditControlBar } from './components/admin/EditControlBar';
import { AdminEditModal } from './components/admin/AdminEditModal';
import { ImageUploadModal } from './components/common/ImageUploadModal';
import { DigitalVisitingCardModal } from './components/modals/DigitalVisitingCardModal';
import { AdminPasswordModal } from './components/modals/AdminPasswordModal';
import { ProjectModal } from './components/modals/ProjectModal';
import { NotificationToast } from './components/common/NotificationToast';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { InteractiveBackground } from './components/common/InteractiveBackground';
import { ThemeSwitcherModal } from './components/common/ThemeSwitcherModal';

const PortfolioContent: React.FC = () => {
  const { theme, colorTheme } = usePortfolio();

  return (
    <div className={`min-h-screen bg-neutral-950 text-neutral-100 selection:bg-indigo-600 selection:text-white font-sans relative ${theme} theme-${colorTheme}`}>
      {/* Interactive Motion Background, Cursor Light, and Touch Sparks */}
      <InteractiveBackground />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Single-Page Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <DemoReelSection />
        <PortfolioSection />
        <ServicesSection />
        <SoftwareSkillsSection />
        <TechnicalSkillsSection />
        <ResumeSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Controls */}
      <ThemeSwitcherModal />
      <EditControlBar />
      <AdminEditModal />
      <AdminPasswordModal />
      <ImageUploadModal />
      <DigitalVisitingCardModal />
      <ProjectModal />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <PortfolioContent />
      </PortfolioProvider>
    </ErrorBoundary>
  );
}
