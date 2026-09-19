/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Play,
  CreditCard,
  CheckCircle2,
  ImageIcon,
  Send,
  Eye
} from 'lucide-react';
import { InlineEditField } from '../common/InlineEditField';
import { getAutoUpdatedExperience } from '../../utils/dateUtils';

export const HeroSection: React.FC = () => {
  const {
    data,
    language,
    t,
    updatePersonal,
    updateSiteConfig,
    isEditMode,
    openImagePicker,
    setIsVisitingCardOpen,
  } = usePortfolio();

  const dynamicExperience = getAutoUpdatedExperience(data.personal.yearsExperience);

  return (
    <section id="home" className="relative min-h-[90vh] pt-28 pb-20 flex items-center overflow-hidden">
      {/* Background ambient lighting blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-12 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability & Location Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <InlineEditField
                  value={data.personal.availabilityText}
                  placeholder="Available for freelance projects"
                  onSave={(val) => updatePersonal({ availabilityText: val })}
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <InlineEditField
                  value={data.personal.shortLocation}
                  placeholder="Jurain, Dhaka"
                  onSave={(val) => updatePersonal({ shortLocation: val })}
                />
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
                <span className="block text-neutral-400 text-lg sm:text-xl font-normal font-sans tracking-normal mb-1">
                  {language === 'bn' ? 'আসসালামু আলাইকুম, আমি' : 'Hello, I am'}
                </span>
                <InlineEditField
                  value={data.personal.name}
                  placeholder="Tofayel Ahmad Shible"
                  onSave={(val) => updatePersonal({ name: val })}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400"
                />
              </h1>

              <div className="text-xl sm:text-2xl font-bold font-display text-indigo-400 flex items-center gap-2 flex-wrap">
                <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
                <InlineEditField
                  value={data.personal.title}
                  placeholder="Graphic Designer & Video Editor"
                  onSave={(val) => updatePersonal({ title: val })}
                />
              </div>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              <InlineEditField
                value={data.personal.shortBio}
                placeholder="I create engaging videos and clean, modern graphics for brands, content creators, and social media platforms."
                multiline
                onSave={(val) => updatePersonal({ shortBio: val })}
              />
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#portfolio"
                className="group flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-950/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>{language === 'bn' ? 'কাজসমূহ দেখুন' : (data.siteConfig.primaryCtaText || 'View My Work')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 font-semibold text-sm rounded-2xl border border-neutral-700/80 hover:border-neutral-600 transition-all"
              >
                <Send className="w-4 h-4 text-indigo-400" />
                <span>{language === 'bn' ? 'যোগাযোগ করুন' : (data.siteConfig.secondaryCtaText || 'Contact Me')}</span>
              </a>

              <button
                type="button"
                onClick={() => setIsVisitingCardOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 bg-neutral-900/50 hover:bg-indigo-950/40 text-neutral-300 hover:text-indigo-200 font-medium text-sm rounded-2xl border border-dashed border-neutral-700 hover:border-indigo-500/50 transition-all"
              >
                <CreditCard className="w-4 h-4 text-indigo-400" />
                <span>{language === 'bn' ? 'ডিজিটাল কার্ড' : 'Visiting Card'}</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-6 max-w-lg border-t border-neutral-800/80">
              <div className="p-3 rounded-2xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="text-xl sm:text-2xl font-extrabold font-display text-white">
                  <InlineEditField
                    value={dynamicExperience}
                    placeholder="3 Months"
                    onSave={(val) => updatePersonal({ yearsExperience: val })}
                  />
                </div>
                <div className="text-[11px] text-neutral-400 font-medium mt-0.5">
                  {language === 'bn' ? 'অভিজ্ঞতা' : 'Experience'}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="text-xl sm:text-2xl font-extrabold font-display text-indigo-400">
                  <InlineEditField
                    value={data.personal.completedProjectsCount}
                    placeholder="150+"
                    onSave={(val) => updatePersonal({ completedProjectsCount: val })}
                  />
                </div>
                <div className="text-[11px] text-neutral-400 font-medium mt-0.5">
                  {language === 'bn' ? 'সম্পন্ন প্রোজেক্ট' : 'Projects Done'}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="text-xl sm:text-2xl font-extrabold font-display text-emerald-400">
                  <InlineEditField
                    value={data.personal.satisfactionRate}
                    placeholder="99%"
                    onSave={(val) => updatePersonal({ satisfactionRate: val })}
                  />
                </div>
                <div className="text-[11px] text-neutral-400 font-medium mt-0.5">
                  {language === 'bn' ? 'ক্লায়েন্ট সন্তুষ্টি' : 'Client Satisfaction'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Creative Card Showcase (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[330px] sm:max-w-[360px]">
              {/* Subtle ambient aura ring */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500/30 via-purple-500/30 to-pink-500/25 rounded-3xl blur-md pointer-events-none" />

              {/* Main Compact Portrait Card */}
              <div className="relative rounded-3xl bg-neutral-900 border border-neutral-800/90 overflow-hidden shadow-2xl">
                {/* Clear, Unobstructed Image container */}
                <div className="relative h-[340px] sm:h-[390px] w-full overflow-hidden bg-neutral-950 group">
                  <img
                    src={data.personal.avatarUrl}
                    alt={data.personal.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Very subtle bottom fade only at the lowest edge to blend into footer */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent pointer-events-none" />

                  {/* Top-left Minimal Tag (Never blocks face/chest) */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{language === 'bn' ? 'ক্রিয়েটিভ ডিজাইনার' : 'Creative Designer'}</span>
                  </div>

                  {/* Change Photo button in edit mode */}
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() =>
                        openImagePicker(
                          language === 'bn' ? 'প্রোফাইল ছবি পরিবর্তন করুন' : 'Update Hero Avatar Photo',
                          data.personal.avatarUrl,
                          (url) => updatePersonal({ avatarUrl: url })
                        )
                      }
                      className="absolute top-3 right-3 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl border border-indigo-400/50 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'ছবি পরিবর্তন' : 'Change Photo'}</span>
                    </button>
                  )}

                  {/* Showreel mini quick-launch button (Bottom right corner) */}
                  <a
                    href="#demoreel"
                    className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-lg backdrop-blur-md border border-indigo-400/40 transition-transform hover:scale-110 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    title={language === 'bn' ? 'ডেমো রিল দেখুন' : 'Watch Showreel'}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span className="text-[11px]">{language === 'bn' ? 'রিল' : 'Reel'}</span>
                  </a>
                </div>

                {/* Compact, Clean Card Footer */}
                <div className="p-3.5 space-y-2 bg-neutral-900 border-t border-neutral-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white truncate">{data.personal.name}</span>
                    <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> {language === 'bn' ? 'সার্টিফাইড' : 'Certified'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/80">
                    <span className="truncate">📍 {data.personal.shortLocation || data.personal.location}</span>
                    <button
                      type="button"
                      onClick={() => setIsVisitingCardOpen(true)}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline shrink-0 ml-2 cursor-pointer"
                    >
                      {language === 'bn' ? 'ভিজিটিং কার্ড →' : 'Visiting Card →'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
