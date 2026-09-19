/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Award,
  GraduationCap,
  Briefcase,
  Download,
  MapPin,
  Plus,
  Trash2,
  Printer,
  CheckCircle
} from 'lucide-react';
import { InlineEditField } from '../common/InlineEditField';

export const ResumeSection: React.FC = () => {
  const {
    data,
    language,
    t,
    isEditMode,
    addEducation,
    updateEducation,
    deleteEducation,
    addTraining,
    updateTraining,
    deleteTraining,
    addExperience,
    updateExperience,
    deleteExperience,
    showNotification,
  } = usePortfolio();

  const handleDownloadCV = () => {
    // Safely retrieve data arrays
    const trainingList = data.training || [];
    const educationList = data.education || [];
    const experienceList = data.experience || [];
    const softwareList = data.softwareSkills || [];

    // Generate text/markdown structured resume download
    const resumeContent = [
      `==================================================`,
      `${(data.personal?.name || 'Tofayel Ahmad Shible').toUpperCase()}`,
      `${(data.personal?.title || 'Graphic Designer & Video Editor').toUpperCase()}`,
      `==================================================`,
      `Location: ${data.personal?.location || ''}`,
      `Phone: ${data.contact?.phone || ''} | Email: ${data.contact?.email || ''}`,
      `WhatsApp: ${data.contact?.whatsapp || ''}`,
      `Website: ${typeof window !== 'undefined' ? window.location.href : ''}`,
      `\n--------------------------------------------------`,
      `PROFESSIONAL SUMMARY`,
      `--------------------------------------------------`,
      `${data.personal?.bio || ''}`,
      `\n--------------------------------------------------`,
      `PROFESSIONAL TRAINING & CERTIFICATIONS`,
      `--------------------------------------------------`,
      ...trainingList.map(
        (t) => `• ${t.title} - ${t.institution} (${t.duration})\n  ${t.description}`
      ),
      `\n--------------------------------------------------`,
      `FORMAL EDUCATION`,
      `--------------------------------------------------`,
      ...educationList.map(
        (e) => `• ${e.degree} - ${e.institution} (${e.year})\n  Grade: ${e.grade || 'Completed'}\n  ${e.description}`
      ),
      `\n--------------------------------------------------`,
      `WORK & FREELANCE EXPERIENCE`,
      `--------------------------------------------------`,
      ...experienceList.map(
        (exp) => `• ${exp.role} @ ${exp.company} (${exp.period})\n  Location: ${exp.location}\n  ${exp.description}\n  Highlights:\n${(exp.highlights || []).map(h => `    - ${h}`).join('\n')}`
      ),
      `\n--------------------------------------------------`,
      `TECHNICAL & CREATIVE CORE SKILLS`,
      `--------------------------------------------------`,
      `• Software & Hard Skills:`,
      `  - Graphics Design: Adobe Photoshop, Adobe Illustrator, Canva Pro`,
      `  - Video Editing: Adobe Premiere Pro, Adobe After Effects, CapCut, InShot`,
      `• Digital Marketing:`,
      `  - Social Media Growth Strategy & High-CTR Ad Creatives`,
      `• AI Tools:`,
      `  - ChatGPT, Google Gemini, Claude, Google AI Studio, NotebookLM`,
      `• Soft Skills:`,
      `  - Effective Communication, Time Management`,
      `\n--------------------------------------------------`,
      `SOFTWARE PROFICIENCY`,
      `--------------------------------------------------`,
      ...softwareList.map((s) => `• ${s.name}: ${s.proficiency}% (${s.category})`),
      `\n==================================================`,
      `Generated from ${data.personal?.name || 'Tofayel Ahmad Shible'}'s Digital Portfolio`,
      `==================================================`
    ].join('\n');

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tofayel_Ahmad_Shible_CV_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification(language === 'bn' ? 'সিভি / রেজুমে সফলভাবে ডাউনলোড হয়েছে!' : 'CV / Resume document downloaded successfully!', 'success');
  };

  const handlePrintCV = () => {
    window.print();
  };

  const trainingItems = data.training || [];
  const educationItems = data.education || [];
  const experienceItems = data.experience || [];

  return (
    <section id="resume" className="py-24 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'যোগ্যতা ও ব্যাকগ্রাউন্ড' : 'Qualifications & Background'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {language === 'bn' ? 'সিভি, শিক্ষাগত যোগ্যতা ও ট্রেনিং' : 'Resume, Education & Training'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              {language === 'bn'
                ? 'আস-সুন্নাহ এসডিআই-এর সার্টিফাইড প্রশিক্ষণ, একাডেমিক যোগ্যতা এবং ফ্রিল্যান্স কাজের বিবরণ।'
                : 'Verified certifications, institutional training at As-Sunnah SDI, and creative freelance track record.'}
            </p>
          </div>

          {/* CV Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePrintCV}
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold rounded-2xl border border-neutral-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>{language === 'bn' ? 'প্রিন্ট / পিডিএফ' : 'Print / PDF'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadCV}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl shadow-xl shadow-indigo-950/60 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'bn' ? 'সিভি ডাউনলোড করুন' : 'Download CV (Resume)'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Col 1: Professional Training & Certifications */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <span>{language === 'bn' ? 'প্রফেশনাল ট্রেনিং ও সার্টিফিকেট' : 'Professional Training'}</span>
              </h3>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() =>
                    addTraining({
                      title: language === 'bn' ? 'নতুন ট্রেনিং কোর্স' : 'New Specialized Training',
                      institution: 'As-Sunnah SDI / Academy',
                      duration: '3 Months',
                      description: 'Mastery in digital workflow and media production.',
                      iconName: 'Award',
                    })
                  }
                  className="p-1 text-indigo-400 hover:text-white cursor-pointer"
                  title="Add training"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {trainingItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2 relative group"
                >
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => deleteTraining(item.id)}
                      className="absolute top-3 right-3 text-neutral-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="flex items-center justify-between pr-6">
                    <span className="text-xs font-semibold text-indigo-400 font-mono">
                      <InlineEditField
                        value={item.duration}
                        placeholder="3 Months"
                        onSave={(val) => updateTraining(item.id, { duration: val })}
                      />
                    </span>
                  </div>

                  <h4 className="text-sm font-bold font-display text-white">
                    <InlineEditField
                      value={item.title}
                      placeholder="Training Title"
                      onSave={(val) => updateTraining(item.id, { title: val })}
                    />
                  </h4>

                  <p className="text-xs font-medium text-neutral-300">
                    <InlineEditField
                      value={item.institution}
                      placeholder="Institution"
                      onSave={(val) => updateTraining(item.id, { institution: val })}
                    />
                  </p>

                  <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                    <InlineEditField
                      value={item.description}
                      placeholder="Course highlights..."
                      multiline
                      onSave={(val) => updateTraining(item.id, { description: val })}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Formal Education */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <span>{language === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Education'}</span>
              </h3>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() =>
                    addEducation({
                      degree: language === 'bn' ? 'ডিগ্রি / সার্টিফিকেটের নাম' : 'Diploma / Degree Name',
                      institution: 'Educational Institute',
                      year: '2024 - 2025',
                      description: 'Academic background and honors.',
                      grade: 'Distinction',
                    })
                  }
                  className="p-1 text-purple-400 hover:text-white cursor-pointer"
                  title="Add education"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {educationItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2 relative group"
                >
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => deleteEducation(item.id)}
                      className="absolute top-3 right-3 text-neutral-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="flex items-center justify-between pr-6">
                    <span className="text-xs font-semibold text-purple-400 font-mono">
                      <InlineEditField
                        value={item.year}
                        placeholder="Year"
                        onSave={(val) => updateEducation(item.id, { year: val })}
                      />
                    </span>
                    {item.grade && (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">
                        {item.grade}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold font-display text-white">
                    <InlineEditField
                      value={item.degree}
                      placeholder="Degree Title"
                      onSave={(val) => updateEducation(item.id, { degree: val })}
                    />
                  </h4>

                  <p className="text-xs font-medium text-neutral-300">
                    <InlineEditField
                      value={item.institution}
                      placeholder="Institute"
                      onSave={(val) => updateEducation(item.id, { institution: val })}
                    />
                  </p>

                  <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                    <InlineEditField
                      value={item.description}
                      placeholder="Curriculum summary..."
                      multiline
                      onSave={(val) => updateEducation(item.id, { description: val })}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Experience & Roles */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <span>{language === 'bn' ? 'কাজের অভিজ্ঞতা' : 'Experience Track'}</span>
              </h3>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() =>
                    addExperience({
                      role: language === 'bn' ? 'ক্রিয়েটিভ ডিজাইনার ও ভিডিও এডিটর' : 'Creative Designer & Video Editor',
                      company: 'Freelance & Content Studio',
                      period: '2023 - Present',
                      location: 'Jurain, Dhaka',
                      description: 'Delivering end-to-end creative post-production.',
                      highlights: ['High-retention editing', 'Brand consistency'],
                    })
                  }
                  className="p-1 text-emerald-400 hover:text-white cursor-pointer"
                  title="Add experience"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {experienceItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2 relative group"
                >
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => deleteExperience(item.id)}
                      className="absolute top-3 right-3 text-neutral-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="flex items-center justify-between pr-6">
                    <span className="text-xs font-semibold text-emerald-400 font-mono">
                      <InlineEditField
                        value={item.period}
                        placeholder="2023 - Present"
                        onSave={(val) => updateExperience(item.id, { period: val })}
                      />
                    </span>
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold font-display text-white">
                    <InlineEditField
                      value={item.role}
                      placeholder="Role Title"
                      onSave={(val) => updateExperience(item.id, { role: val })}
                    />
                  </h4>

                  <p className="text-xs font-medium text-neutral-300">
                    <InlineEditField
                      value={item.company}
                      placeholder="Company / Client"
                      onSave={(val) => updateExperience(item.id, { company: val })}
                    />
                  </p>

                  <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                    <InlineEditField
                      value={item.description}
                      placeholder="Role summary..."
                      multiline
                      onSave={(val) => updateExperience(item.id, { description: val })}
                    />
                  </p>

                  {(item.highlights || []).length > 0 && (
                    <div className="space-y-1 pt-2">
                      {(item.highlights || []).map((h, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                          <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
