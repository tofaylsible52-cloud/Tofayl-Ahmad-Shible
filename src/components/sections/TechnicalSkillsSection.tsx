/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Cpu,
  BrainCircuit,
  Palette,
  Video,
  TrendingUp,
  Bot,
  Users,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { InlineEditField } from '../common/InlineEditField';

export const TechnicalSkillsSection: React.FC = () => {
  const {
    data,
    language,
    t,
    isEditMode,
    addTechnicalSkill,
    updateTechnicalSkill,
    deleteTechnicalSkill,
  } = usePortfolio();

  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Categorization helpers
  const categories = [
    { id: 'all', label: language === 'bn' ? 'সকল স্কিলস' : 'All Skills' },
    { id: 'hard-skills', label: language === 'bn' ? 'সফটওয়্যার ও হার্ড স্কিলস' : 'Software & Hard Skills' },
    { id: 'marketing-ai', label: language === 'bn' ? 'ডিজিটাল মার্কেটিং ও AI টুলস' : 'Digital Marketing & AI' },
    { id: 'soft-skills', label: language === 'bn' ? 'সফট স্কিলস' : 'Soft Skills' },
  ];

  const filteredSkills = (data.technicalSkills || []).filter((tech) => {
    if (activeFilter === 'all') return true;
    const cat = tech.category.toLowerCase();
    const name = tech.name.toLowerCase();
    if (activeFilter === 'hard-skills') {
      return cat.includes('video') || cat.includes('design') || name.includes('graphics') || name.includes('video');
    }
    if (activeFilter === 'marketing-ai') {
      return cat.includes('marketing') || cat.includes('ai') || name.includes('marketing') || name.includes('ai');
    }
    if (activeFilter === 'soft-skills') {
      return cat.includes('workflow') || cat.includes('soft') || name.includes('communication') || name.includes('time');
    }
    return true;
  });

  return (
    <section className="py-24 bg-neutral-950/90 relative border-t border-neutral-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'টেকনিক্যাল ও ক্রিয়েটিভ কোর স্কিলস' : 'Technical & Creative Core Skills'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {language === 'bn'
              ? 'দক্ষতা ও পেশাদার কাজের পরিধি'
              : 'Technical & Creative Core Skills'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {language === 'bn'
              ? 'গ্রাফিক্স ডিজাইন, প্রফেশনাল ভিডিও এডিটিং, আধুনিক এআই টুলস ইন্টিগ্রেশন এবং সময়নিষ্ঠ যোগাযোগ।'
              : 'Specialized hard skills in design & editing suites, digital marketing, generative AI acceleration, and disciplined soft skills.'}
          </p>
        </div>

        {/* 3 Core Skill Pillars Summary Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1: Software & Hard Skills */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-indigo-500/40 transition-all shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                {language === 'bn' ? 'কোর ক্যাটাগরি ০১' : 'Category 01'}
              </span>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                {language === 'bn' ? 'সফটওয়্যার ও হার্ড স্কিলস' : 'Software & Hard Skills'}
              </h3>
            </div>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5 text-indigo-300">
                  <Palette className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'গ্রাফিক্স ডিজাইন:' : 'Graphics Design:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="px-2 py-0.5 rounded-md bg-blue-950/70 text-blue-300 border border-blue-800/50 font-medium">Adobe Photoshop</span>
                  <span className="px-2 py-0.5 rounded-md bg-orange-950/70 text-orange-300 border border-orange-800/50 font-medium">Adobe Illustrator</span>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-950/70 text-cyan-300 border border-cyan-800/50 font-medium">Canva Pro</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5 text-purple-300">
                  <Video className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'ভিডিও এডিটিং:' : 'Video Editing:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="px-2 py-0.5 rounded-md bg-purple-950/70 text-purple-300 border border-purple-800/50 font-medium">Adobe Premiere Pro</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-950/70 text-purple-300 border border-purple-800/50 font-medium">Adobe After Effects</span>
                  <span className="px-2 py-0.5 rounded-md bg-pink-950/70 text-pink-300 border border-pink-800/50 font-medium">CapCut</span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-950/70 text-rose-300 border border-rose-800/50 font-medium">InShot</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Digital Marketing & AI Tools */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-emerald-500/40 transition-all shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                {language === 'bn' ? 'কোর ক্যাটাগরি ০২' : 'Category 02'}
              </span>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                {language === 'bn' ? 'ডিজিটাল মার্কেটিং ও AI টুলস' : 'Digital Marketing & AI Tools'}
              </h3>
            </div>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5 text-emerald-300">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'ডিজিটাল মার্কেটিং:' : 'Digital Marketing:'}</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {language === 'bn'
                    ? 'সোশ্যাল মিডিয়া গ্রোথ স্ট্র্যাটেজি, হাই-কনভার্সন বিজ্ঞাপন ডিজাইন ও অডিয়েন্স এঙ্গেজমেন্ট।'
                    : 'Audience engagement, high-conversion ad creatives, social growth, and campaign assets.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5 text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'AI টুলস (AI Tools):' : 'AI Tools:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/70 text-emerald-300 border border-emerald-800/50 font-medium">ChatGPT</span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-950/70 text-indigo-300 border border-indigo-800/50 font-medium">Google Gemini</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-950/70 text-amber-300 border border-amber-800/50 font-medium">Claude</span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-950/70 text-teal-300 border border-teal-800/50 font-medium">Google AI Studio</span>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-950/70 text-cyan-300 border border-cyan-800/50 font-medium">NotebookLM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Soft Skills */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                {language === 'bn' ? 'কোর ক্যাটাগরি ০৩' : 'Category 03'}
              </span>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                {language === 'bn' ? 'সফট স্কিলস (Soft Skills)' : 'Soft Skills & Work Ethic'}
              </h3>
            </div>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5 text-amber-300">
                  <Users className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কার্যকর যোগাযোগ (Effective Communication):' : 'Effective Communication:'}</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {language === 'bn'
                    ? 'ক্লায়েন্টের চাহিদা অনুযায়ী স্পষ্ট পরামর্শ, সক্রিয় শোনা ও প্রতিটি ধাপে নিয়মিত আপডেট প্রদান।'
                    : 'Active listening, clear client updates, receptive feedback loops, and transparent consultation.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5 text-amber-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'সময় ব্যবস্থাপনা (Time Management):' : 'Time Management:'}</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {language === 'bn'
                    ? 'নির্দিষ্ট ডেডলাইনের মধ্যে মানসম্মত প্রজেক্ট ডেলিভারি, নিখুঁত শিডিউলিং ও দ্রুত টার্নঅ্যারাউন্ড।'
                    : 'Strict adherence to project deadlines, disciplined workflow, fast turnaround, and organized delivery.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Admin Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === cat.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {isEditMode && (
            <button
              type="button"
              onClick={() =>
                addTechnicalSkill({
                  name: 'New Technical Skill',
                  category: 'Core Video',
                  level: 'Specialist',
                  description: 'Description of specialized technical process.',
                })
              }
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'bn' ? 'নতুন স্কিল যোগ করুন' : 'Add Technical Skill'}</span>
            </button>
          )}
        </div>

        {/* Detailed Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((tech) => (
            <div
              key={tech.id}
              className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 hover:border-indigo-500/40 transition-all space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-950 text-indigo-300 border border-neutral-800">
                    {tech.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <InlineEditField
                        value={tech.level}
                        placeholder="Expert"
                        onSave={(val) => updateTechnicalSkill(tech.id, { level: val })}
                      />
                    </span>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => deleteTechnicalSkill(tech.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold font-display text-white">
                  <InlineEditField
                    value={tech.name}
                    placeholder="Skill Name"
                    onSave={(val) => updateTechnicalSkill(tech.id, { name: val })}
                  />
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  <InlineEditField
                    value={tech.description}
                    placeholder="Describe your process and results..."
                    multiline
                    onSave={(val) => updateTechnicalSkill(tech.id, { description: val })}
                  />
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                <span>{language === 'bn' ? 'প্রফেশনাল এক্সপার্টাইজ' : 'Professional Expertise'}</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1">
                  <span>{language === 'bn' ? 'যাচাইকৃত দক্ষতা' : 'Verified'}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

