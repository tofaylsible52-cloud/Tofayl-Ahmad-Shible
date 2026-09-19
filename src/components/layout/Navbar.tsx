/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Menu,
  X,
  Sun,
  Moon,
  Edit3,
  SlidersHorizontal,
  CreditCard,
  Sparkles,
  Check,
  ShieldCheck,
  Download,
  Palette,
  Lock,
  Unlock
} from 'lucide-react';
import { InlineEditField } from '../common/InlineEditField';
import { DeployExportModal } from '../modals/DeployExportModal';

export const Navbar: React.FC = () => {
  const {
    data,
    updateSiteConfig,
    language,
    setLanguage,
    t,
    isAdminUnlocked,
    isEditMode,
    setIsEditMode,
    theme,
    toggleTheme,
    colorTheme,
    setIsThemePickerOpen,
    setIsVisitingCardOpen,
    openAdminModal,
    openAdminPasswordModal,
    lockAdmin,
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: language === 'bn' ? 'পরিচিতি' : 'About', href: '#about' },
    { label: language === 'bn' ? 'শোরিল' : 'Showreel', href: '#showreel' },
    { label: language === 'bn' ? 'পোর্টফোলিও' : 'Portfolio', href: '#portfolio' },
    { label: language === 'bn' ? 'সেবাসমূহ' : 'Services', href: '#services' },
    { label: language === 'bn' ? 'দক্ষতা' : 'Skills', href: '#skills' },
    { label: language === 'bn' ? 'জীবনবৃত্তান্ত' : 'Resume', href: '#resume' },
    { label: language === 'bn' ? 'যোগাযোগ' : 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-pink-400">
                TS
              </span>
            </div>
          </div>
          <div className="font-display font-bold text-base tracking-tight text-white flex items-center">
            <InlineEditField
              value={data.siteConfig.logoText || data.personal.shortName}
              placeholder="Tofayel A. Shible"
              onSave={(val) => updateSiteConfig({ logoText: val })}
              className="text-white hover:text-indigo-300"
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800/80 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Language Switcher, Visiting Card, Theme Toggle, Edit Mode Switch) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Dual Language Switcher [English (Default) | বাংলা] */}
          <div className="flex items-center p-0.5 bg-neutral-900/90 rounded-full border border-neutral-800 shadow-inner">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                language === 'en'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="English (Default)"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                language === 'bn'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="বাংলা"
            >
              <span>🇧🇩</span>
              <span>বাংলা</span>
            </button>
          </div>

          {/* Digital Visiting Card Button */}
          <button
            type="button"
            onClick={() => setIsVisitingCardOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-all hover:border-indigo-500/40 cursor-pointer"
            title="Open digital visiting card"
          >
            <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
            <span>{language === 'bn' ? 'কার্ড' : 'Visiting Card'}</span>
          </button>

          {/* Deploy & Backup Center - ONLY visible if Admin is unlocked */}
          {isAdminUnlocked && (
            <button
              type="button"
              onClick={() => setIsDeployModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition-all cursor-pointer"
              title="Deploy & Backup (Download JSON / Copy Code)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'bn' ? 'ব্যাকআপ' : 'Backup'}</span>
            </button>
          )}

          {/* 5 Live Color Themes Switcher */}
          <button
            type="button"
            onClick={() => setIsThemePickerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-600/80 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 border border-indigo-400/40 shadow-md shadow-indigo-950/50 transition-all hover:scale-105 cursor-pointer"
            title="Choose from 5 Live Color & Motion Themes"
          >
            <Palette className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="hidden xl:inline">{language === 'bn' ? 'কালার থিম' : 'Themes'}</span>
          </button>

          {/* Theme Light/Dark Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Admin Access trigger when locked */}
          {!isAdminUnlocked && (
            <button
              type="button"
              onClick={openAdminPasswordModal}
              className="p-2 rounded-full text-neutral-400 hover:text-indigo-400 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
              title={language === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin Login'}
            >
              <Lock className="w-4 h-4 text-indigo-400" />
            </button>
          )}

          {/* Edit Mode Switch Button - ONLY visible if Admin is unlocked */}
          {isAdminUnlocked && (
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
                isEditMode
                  ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 ring-2 ring-amber-300/50 shadow-amber-950/50'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/50'
              }`}
            >
              {isEditMode ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'সম্পাদনা শেষ' : 'Editing Mode'}</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'এডিট মোড' : 'Edit Portfolio'}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Mobile menu trigger & Quick Lang Switch */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Mobile Language Switcher */}
          <div className="flex items-center p-0.5 bg-neutral-900 rounded-full border border-neutral-800">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold cursor-pointer ${
                language === 'en' ? 'bg-indigo-600 text-white' : 'text-neutral-400'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold cursor-pointer ${
                language === 'bn' ? 'bg-emerald-600 text-white' : 'text-neutral-400'
              }`}
            >
              বাং
            </button>
          </div>
          {isAdminUnlocked && (
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                isEditMode ? 'bg-amber-500 text-neutral-950' : 'bg-indigo-600 text-white'
              }`}
            >
              {isEditMode ? 'Done' : 'Edit'}
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl mt-2 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsThemePickerOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 cursor-pointer shadow-md"
            >
              <Palette className="w-3.5 h-3.5 text-white" />
              <span>{language === 'bn' ? '৫টি কালার থিম' : '5 Color Themes'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsVisitingCardOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
              <span>Visiting Card</span>
            </button>

            {isAdminUnlocked ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeployModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Backup / Deploy</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    openAdminModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Admin Panel</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  openAdminPasswordModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900/90 border border-neutral-800 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{language === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin Login'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Deploy & Permanent Backup Modal */}
      <DeployExportModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </header>
  );
};
