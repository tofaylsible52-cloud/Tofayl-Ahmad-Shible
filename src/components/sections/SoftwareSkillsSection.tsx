/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Layers,
  Sparkles,
  Plus,
  Trash2,
  Sliders,
  PenTool,
  Video,
  Film,
  Image as ImageIcon,
  FileSpreadsheet,
  Layout
} from 'lucide-react';
import { DynamicIcon } from '../common/DynamicIcon';
import { BrandSoftwareIcon } from '../common/BrandSoftwareIcon';
import { InlineEditField } from '../common/InlineEditField';

export const SoftwareSkillsSection: React.FC = () => {
  const {
    data,
    language,
    t,
    isEditMode,
    addSoftwareSkill,
    updateSoftwareSkill,
    deleteSoftwareSkill,
    openAdminModal,
  } = usePortfolio();

  // Glow class selector
  const getGlowClass = (color: string) => {
    switch (color) {
      case 'purple':
        return 'glow-purple border-purple-500/40 hover:border-purple-400';
      case 'blue':
        return 'glow-blue border-blue-500/40 hover:border-blue-400';
      case 'cyan':
        return 'glow-cyan border-cyan-500/40 hover:border-cyan-400';
      case 'orange':
        return 'glow-orange border-orange-500/40 hover:border-orange-400';
      case 'pink':
        return 'glow-pink border-pink-500/40 hover:border-pink-400';
      case 'emerald':
        return 'glow-emerald border-emerald-500/40 hover:border-emerald-400';
      default:
        return 'glow-purple border-indigo-500/40 hover:border-indigo-400';
    }
  };

  const getGradientLight = (color: string) => {
    switch (color) {
      case 'purple':
        return 'from-purple-600/25 via-purple-500/10 to-transparent';
      case 'blue':
        return 'from-blue-600/25 via-blue-500/10 to-transparent';
      case 'cyan':
        return 'from-cyan-600/25 via-cyan-500/10 to-transparent';
      case 'orange':
        return 'from-orange-600/25 via-orange-500/10 to-transparent';
      case 'pink':
        return 'from-pink-600/25 via-pink-500/10 to-transparent';
      case 'emerald':
        return 'from-emerald-600/25 via-emerald-500/10 to-transparent';
      default:
        return 'from-indigo-600/25 via-indigo-500/10 to-transparent';
    }
  };

  const getAccentColor = (color: string) => {
    switch (color) {
      case 'purple':
        return '#c084fc';
      case 'blue':
        return '#60a5fa';
      case 'cyan':
        return '#22d3ee';
      case 'orange':
        return '#fb923c';
      case 'pink':
        return '#f472b6';
      case 'emerald':
        return '#34d399';
      default:
        return '#818cf8';
    }
  };

  return (
    <section id="skills" className="py-24 bg-neutral-950 relative border-t border-neutral-900 overflow-hidden">
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সফটওয়্যার দক্ষতা' : 'Software & Mastery'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {language === 'bn' ? 'সফটওয়্যার টুলস ও পারদর্শিতা' : 'Software Tools & Glowing Proficiency'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {language === 'bn'
              ? 'ভিডিও পোস্ট-প্রোডাকশন, গ্রাফিক ডিজাইন, মোশন গ্রাফিক্স ও ডিজিটাল কন্টেন্ট তৈরির প্রধান টুলসেট।'
              : 'Specialized suites across video post-production, raster & vector graphics, motion design, and productivity.'}
          </p>
        </div>

        {/* Section Top Controls */}
        {isEditMode && (
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={() =>
                addSoftwareSkill({
                  name: language === 'bn' ? 'নতুন সফটওয়্যার' : 'New Software',
                  category: 'Design',
                  iconName: 'Sparkles',
                  proficiency: 90,
                  glowColor: 'cyan',
                  description: 'Workflow description for this software tool.',
                  accentHex: '#00C4CC',
                })
              }
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'bn' ? 'সফটওয়্যার কার্ড যোগ করুন' : 'Add Software Card'}</span>
            </button>
          </div>
        )}

        {/* Glowing Software Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.softwareSkills || []).map((skill) => {
            const glowClass = getGlowClass(skill.glowColor);
            const gradientLight = getGradientLight(skill.glowColor);
            const accentHex = getAccentColor(skill.glowColor);

            return (
              <div
                key={skill.id}
                className={`group relative rounded-3xl bg-neutral-900/90 backdrop-blur-xl border p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${glowClass}`}
              >
                {/* Soft Bottom Glowing Light Accent */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${gradientLight} pointer-events-none`}
                />

                <div className="relative z-10 space-y-4">
                  {/* Top Bar: Official Brand Icon + Category Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        <BrandSoftwareIcon name={skill.name} className="w-12 h-12" />
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {skill.category}
                        </span>
                        <div className="text-[11px] text-neutral-500 font-medium">
                          {language === 'bn' ? 'অফিসিয়াল সফটওয়্যার' : 'Verified Software'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => deleteSoftwareSkill(skill.id)}
                          className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                          title="Delete software"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Name & Proficiency */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold font-display text-white">
                        <InlineEditField
                          value={skill.name}
                          placeholder="Software Name"
                          onSave={(val) => updateSoftwareSkill(skill.id, { name: val })}
                        />
                      </h3>
                      <span className="text-xs font-mono font-bold" style={{ color: accentHex }}>
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Animated Progress Meter */}
                    <div className="w-full h-2 rounded-full bg-neutral-950 border border-neutral-800 overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-1000 shadow-sm"
                        style={{
                          width: `${skill.proficiency}%`,
                          backgroundColor: accentHex,
                          boxShadow: `0 0 10px ${accentHex}`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                    <InlineEditField
                      value={skill.description}
                      placeholder="Summary of tools and workflow in this app..."
                      multiline
                      onSave={(val) => updateSoftwareSkill(skill.id, { description: val })}
                    />
                  </p>
                </div>

                {/* Bottom Glow Color pill / indicator */}
                <div className="relative z-10 pt-4 mt-2 flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800/60">
                  <span className="capitalize">{skill.glowColor} {language === 'bn' ? 'অরা অ্যাকসেন্ট' : 'Accent Aura'}</span>
                  <span className="font-semibold text-neutral-200">{language === 'bn' ? 'প্রোডাকশন রেডি' : 'Production Ready'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
