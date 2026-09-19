/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  User,
  GraduationCap,
  MapPin,
  Sparkles,
  Award,
  Film,
  PenTool,
  CheckCircle,
  Download,
  CreditCard
} from 'lucide-react';
import { InlineEditField } from '../common/InlineEditField';

export const AboutSection: React.FC = () => {
  const { data, updatePersonal, setIsVisitingCardOpen, language, t } = usePortfolio();

  return (
    <section id="about" className="py-24 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'আমার পরিচিতি' : 'About Me'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {language === 'bn'
              ? 'ক্রিয়েটিভ ভিজ্যুয়াল ও আকর্ষণীয় গল্প সৃষ্টিতে নিবেদিত'
              : 'Crafting Impactful Visuals & Engaging Stories'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {language === 'bn'
              ? 'ডিজাইন নান্দনিকতা, হাই-রিটেনশন ভিডিও এডিটিং ও আধুনিক ডিজিটাল প্রযুক্তির সমন্বয়ে পেশাদার কাজ।'
              : 'Dedicated creative professional blending design aesthetics, high-retention video editing, and modern digital workflows.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Bio Card (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-6 theme-card-glow transition-all duration-500">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {language === 'bn' ? 'প্রফেশনাল প্রোফাইল ও ক্রিয়েটিভ ভিশন' : 'Professional Profile & Creative Vision'}
              </h3>

              <div className="text-base text-neutral-300 leading-relaxed space-y-4">
                <p>
                  <InlineEditField
                    value={data.personal.bio}
                    placeholder={
                      language === 'bn'
                        ? 'আমি তোফায়েল আহমদ শিবলী, ঢাকার জুরাইনে বসবাসরত একজন নিবেদিতপ্রাণ গ্রাফিক ডিজাইনার ও ভিডিও এডিটর। আমি আকর্ষণীয় ভিজ্যুয়াল কনটেন্ট ডিজাইন, প্রফেশনাল ভিডিও এডিটিং এবং আধুনিক ডিজিটাল টুলস ব্যবহারে পারদর্শী।'
                        : 'I am Tofayel Ahmad Shible, a passionate Graphic Designer and Video Editor based in Jurain, Dhaka. I specialize in crafting visually compelling content, editing engaging videos, and leveraging modern AI tools and digital marketing strategies to bring creative visions to life.'
                    }
                    multiline
                    onSave={(val) => updatePersonal({ bio: val })}
                  />
                </p>
              </div>

              {/* Training & Institute Highlight Box */}
              <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {language === 'bn' ? 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট' : 'As-Sunnah Skill Development Institute'}
                    </h4>
                    <p className="text-xs text-indigo-300">
                      {language === 'bn' ? 'প্রফেশনাল ট্রেনিং ও ম্যানেজমেন্ট সার্টিফিকেট প্রাপ্ত' : 'Professional Training & Management Graduate'}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  <InlineEditField
                    value={data.personal.trainingSummary}
                    placeholder={
                      language === 'bn'
                        ? 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট থেকে ক্ষুদ্র ব্যবসা ব্যবস্থাপনা ও ডিজিটাল স্কিলসের ওপর প্রফেশনাল ট্রেনিং সম্পন্ন করেছি।'
                        : 'Completed professional training in Small Business Management and digital skills from As-Sunnah Skill Development Institute.'
                    }
                    multiline
                    onSave={(val) => updatePersonal({ trainingSummary: val })}
                  />
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'bn' ? 'হাই রিটেনশন পেসিং ও গতিশীল কাট' : 'High viewer retention pacing & dynamic cuts'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'bn' ? 'উচ্চ সিটিআর (CTR) থাম্বনেইল ও বিজ্ঞাপন ডিজাইন' : 'High CTR YouTube thumbnails & social ads'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'bn' ? 'আধুনিক এআই টুলস ও দ্রুত প্রজেক্ট ডেলিভারি' : 'AI-powered generative tools & rapid delivery'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'bn' ? 'সময়নিষ্ঠ যোগাযোগ ও পেশাদার বিশ্বস্ততা' : 'Disciplined communication & ethics'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Profile Card & Quick Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-5 theme-card-glow transition-all duration-500">
              <div className="flex items-center gap-3.5 pb-2 border-b border-neutral-800">
                <img
                  src={data.personal.avatarUrl}
                  alt={data.personal.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover object-top border-2 border-indigo-500/40 shadow-md shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold font-display text-white flex items-center gap-1.5">
                    <span>{data.personal.name}</span>
                  </h3>
                  <p className="text-xs text-indigo-400 font-semibold">{data.personal.title}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <span className="text-neutral-400">{language === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}</span>
                  <span className="font-bold text-white">{data.personal.name}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <span className="text-neutral-400">{language === 'bn' ? 'পেশা / পদবী' : 'Role'}</span>
                  <span className="font-bold text-indigo-400">{data.personal.title}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <span className="text-neutral-400">{language === 'bn' ? 'ঠিকানা' : 'Location'}</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {data.personal.location}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <span className="text-neutral-400">{language === 'bn' ? 'দক্ষতার ক্ষেত্র' : 'Specialization'}</span>
                  <span className="font-bold text-white">{language === 'bn' ? 'ভিডিও ও গ্রাফিক আর্টস' : 'Video & Graphic Arts'}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <span className="text-neutral-400">{language === 'bn' ? 'কাজের প্রাপ্যতা' : 'Freelance Status'}</span>
                  <span className="font-bold text-emerald-400 uppercase tracking-wide">
                    {language === 'bn' ? 'উপলব্ধ (Available)' : 'Available'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsVisitingCardOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-950/50 transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{language === 'bn' ? 'ডিজিটাল ভিজিটিং কার্ড দেখুন' : 'Open Digital Visiting Card'}</span>
                </button>

                <a
                  href="#resume"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-2xl border border-neutral-700 transition-colors"
                >
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>{language === 'bn' ? 'যোগ্যতা ও সিভি দেখুন' : 'View Qualifications & Resume'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
