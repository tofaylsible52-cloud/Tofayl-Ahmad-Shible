/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUp, Heart, Sparkles, MapPin, Mail, Phone, MessageCircle, Lock, Unlock, SlidersHorizontal } from 'lucide-react';
import { DynamicIcon } from '../common/DynamicIcon';
import { InlineEditField } from '../common/InlineEditField';

export const Footer: React.FC = () => {
  const {
    data,
    language,
    t,
    isAdminUnlocked,
    lockAdmin,
    openAdminPasswordModal,
    updatePersonal,
    updateSiteConfig,
    setIsVisitingCardOpen,
    openAdminModal,
  } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-12 text-neutral-400 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-900">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-neutral-950 rounded-[9px] flex items-center justify-center">
                  <span className="font-extrabold text-xs text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-pink-400">
                    TS
                  </span>
                </div>
              </div>
              <h3 className="font-display font-extrabold text-lg text-white">
                <InlineEditField
                  value={data.personal.name}
                  placeholder="Tofayel Ahmad Shible"
                  onSave={(val) => updatePersonal({ name: val })}
                />
              </h3>
            </div>

            <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
              <InlineEditField
                value={data.personal.title}
                placeholder="Graphic Designer & Video Editor"
                onSave={(val) => updatePersonal({ title: val })}
              />
            </p>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              <InlineEditField
                value={data.siteConfig.tagline || data.personal.shortBio}
                placeholder="I create engaging videos and clean, modern graphics for brands, content creators, and social media platforms."
                multiline
                onSave={(val) => updateSiteConfig({ tagline: val })}
              />
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsVisitingCardOpen(true)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'ডিজিটাল ভিজিটিং কার্ড' : 'Digital Visiting Card'}
              </button>
              {isAdminUnlocked && (
                <button
                  type="button"
                  onClick={() => openAdminModal()}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-indigo-400 border border-neutral-800 transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'সিএমএস অ্যাডমিন' : 'CMS Admin'}
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'কুইক লিংক' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-white transition-colors">{language === 'bn' ? 'হোম' : 'Home'}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{language === 'bn' ? 'আমার সম্পর্কে' : 'About Me'}</a></li>
              <li><a href="#demoreel" className="hover:text-white transition-colors">{language === 'bn' ? 'ডেমো রিল ভিডিও' : 'Featured Demo Reel'}</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">{language === 'bn' ? 'পোর্টফোলিও শোরুম' : 'Portfolio Showcase'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{language === 'bn' ? 'সার্ভিসসমূহ' : 'Services'}</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">{language === 'bn' ? 'সফটওয়্যার ও দক্ষতা' : 'Skills & Software'}</a></li>
              <li><a href="#resume" className="hover:text-white transition-colors">{language === 'bn' ? 'সিভি ও ট্রেনিং' : 'Resume & Training'}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{language === 'bn' ? 'যোগাযোগ' : 'Get in Touch'}</a></li>
            </ul>
          </div>

          {/* Col 3: Socials & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'যোগাযোগ ও ঠিকানা' : 'Connect & Location'}
            </h4>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{data.personal.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{data.contact.email}</span>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-neutral-500 mb-2">
                {language === 'bn' ? 'সোশ্যাল প্রোফাইল:' : 'Social Profiles:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {(data.socialLinks || []).map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    title={soc.label}
                    className="p-2 rounded-xl bg-neutral-900 hover:bg-indigo-600 hover:text-white text-neutral-400 border border-neutral-800 transition-all hover:scale-110 shadow cursor-pointer"
                  >
                    <DynamicIcon name={soc.iconName} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            <InlineEditField
              value={data.siteConfig.copyrightText}
              placeholder="© 2026 Tofayel Ahmad Shible. All rights reserved."
              onSave={(val) => updateSiteConfig({ copyrightText: val })}
            />
            {!isAdminUnlocked ? (
              <button
                type="button"
                onClick={openAdminPasswordModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-400 hover:text-indigo-300 border border-neutral-800/80 transition-colors cursor-pointer text-[11px]"
                title="Admin / Owner Login (Password Protected)"
              >
                <Lock className="w-3 h-3 text-indigo-400" />
                <span>{language === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin Login'}</span>
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {isAdminUnlocked && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openAdminModal()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 transition-colors cursor-pointer text-xs shadow"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
                </button>
                <button
                  type="button"
                  onClick={lockAdmin}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-neutral-900 hover:bg-rose-950/40 text-neutral-400 hover:text-rose-300 border border-neutral-800 hover:border-rose-900/50 transition-colors cursor-pointer text-xs"
                  title="Lock Admin Access"
                >
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? 'লক করুন' : 'Lock'}</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
            >
              <span>{language === 'bn' ? 'উপরে যান' : 'Back to top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
