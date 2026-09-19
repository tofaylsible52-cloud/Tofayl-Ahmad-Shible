/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Briefcase,
  Video,
  PenTool,
  CheckCircle,
  Plus,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { DynamicIcon } from '../common/DynamicIcon';
import { InlineEditField } from '../common/InlineEditField';

export const ServicesSection: React.FC = () => {
  const {
    data,
    language,
    t,
    isEditMode,
    addVideoService,
    updateVideoService,
    deleteVideoService,
    addGraphicService,
    updateGraphicService,
    deleteGraphicService,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'graphic' | 'video'>('graphic');

  const videoServicesList = data.videoServices || [];
  const graphicServicesList = data.graphicServices || [];

  return (
    <section id="services" className="py-24 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ক্রিয়েটিভ সলিউশন' : 'Creative Solutions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {language === 'bn' ? 'সেবাসমূহ ও বিশেষ পারদর্শিতা' : 'Services & Expertise'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {language === 'bn'
              ? 'প্রফেশনাল গ্রাফিক ডিজাইন, ব্র্যান্ড আইডেন্টিটি এবং আধুনিক ভিডিও এডিটিং সেবা।'
              : 'Professional graphic design assets, brand identities, and video post-production solutions.'}
          </p>
        </div>

        {/* Tab Selector - Graphic Design is first and default */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab('graphic')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'graphic'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/60 ring-2 ring-indigo-500/30'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>{language === 'bn' ? `গ্রাফিক ডিজাইন সার্ভিস (${graphicServicesList.length})` : `Graphic Design Services (${graphicServicesList.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'video'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/60 ring-2 ring-indigo-500/30'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{language === 'bn' ? `ভিডিও এডিটিং সার্ভিস (${videoServicesList.length})` : `Video Editing Services (${videoServicesList.length})`}</span>
          </button>
        </div>

        {/* Video Editing Services Grid */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-400" />
                <span>{language === 'bn' ? 'ভিডিও এডিটিং ও মোশন সার্ভিস' : 'Video Editing & Motion Services'}</span>
              </h3>

              {isEditMode && (
                <button
                  type="button"
                  onClick={() =>
                    addVideoService({
                      title: language === 'bn' ? 'নতুন ভিডিও সার্ভিস' : 'New Video Service',
                      description: 'High quality video production package tailored for content creators.',
                      iconName: 'Video',
                      deliverables: ['Full HD/4K Export', 'Sound FX Included', 'Fast Turnaround'],
                      badge: 'Custom',
                    })
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'সার্ভিস যোগ করুন' : 'Add Service'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {videoServicesList.map((service) => (
                <div
                  key={service.id}
                  className="group relative rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-indigo-500/50 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 theme-card-glow"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <DynamicIcon name={service.iconName} className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-1">
                        {service.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/30 text-[10px] font-bold text-indigo-300 uppercase">
                            {service.badge}
                          </span>
                        )}
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => deleteVideoService(service.id)}
                            className="p-1 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h4 className="text-base font-bold font-display text-white group-hover:text-indigo-300 transition-colors">
                      <InlineEditField
                        value={service.title}
                        placeholder="Service Title"
                        onSave={(val) => updateVideoService(service.id, { title: val })}
                      />
                    </h4>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      <InlineEditField
                        value={service.description}
                        placeholder="Service description..."
                        multiline
                        onSave={(val) => updateVideoService(service.id, { description: val })}
                      />
                    </p>
                  </div>

                  {/* Deliverables checklist */}
                  <div className="pt-4 mt-4 border-t border-neutral-800/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                      {language === 'bn' ? 'যা যা অন্তর্ভুক্ত' : 'Includes'}
                    </span>
                    {(service.deliverables || []).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-neutral-300">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Graphic Design Services Grid */}
        {activeTab === 'graphic' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <PenTool className="w-5 h-5 text-indigo-400" />
                <span>{language === 'bn' ? 'গ্রাফিক ডিজাইন ও ভিজ্যুয়াল আইডেন্টিটি' : 'Graphic Design & Visual Identity'}</span>
              </h3>

              {isEditMode && (
                <button
                  type="button"
                  onClick={() =>
                    addGraphicService({
                      title: language === 'bn' ? 'নতুন গ্রাফিক সার্ভিস' : 'New Graphic Service',
                      description: 'Custom graphic design asset creation tailored to brand goals.',
                      iconName: 'PenTool',
                      deliverables: ['Vector Assets', '300 DPI Print Ready', 'Full Ownership'],
                      badge: 'New',
                    })
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'সার্ভিস যোগ করুন' : 'Add Service'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {graphicServicesList.map((service) => (
                <div
                  key={service.id}
                  className="group relative rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-indigo-500/50 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 theme-card-glow"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <DynamicIcon name={service.iconName} className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-1">
                        {service.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/30 text-[10px] font-bold text-indigo-300 uppercase">
                            {service.badge}
                          </span>
                        )}
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => deleteGraphicService(service.id)}
                            className="p-1 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h4 className="text-base font-bold font-display text-white group-hover:text-indigo-300 transition-colors">
                      <InlineEditField
                        value={service.title}
                        placeholder="Service Title"
                        onSave={(val) => updateGraphicService(service.id, { title: val })}
                      />
                    </h4>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      <InlineEditField
                        value={service.description}
                        placeholder="Service description..."
                        multiline
                        onSave={(val) => updateGraphicService(service.id, { description: val })}
                      />
                    </p>
                  </div>

                  {/* Deliverables checklist */}
                  <div className="pt-4 mt-4 border-t border-neutral-800/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                      {language === 'bn' ? 'যা যা প্রদান করা হবে' : 'Deliverables'}
                    </span>
                    {(service.deliverables || []).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-neutral-300">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-neutral-900 border border-indigo-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-display text-white">
              {language === 'bn' ? 'আপনার কি কোনো কাস্টম প্রজেক্টের পরিকল্পনা আছে?' : 'Have a customized project in mind?'}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              {language === 'bn'
                ? 'চ্যানেল ম্যানেজমেন্ট, মাসিক ভিডিও এডিটিং অথবা সোশ্যাল মিডিয়া ডিজাইনের যেকোনো বিষয়ে সরাসরি যোগাযোগ করুন।'
                : "Let's discuss custom video editing bundles, channel management, or social media design retainer."}
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xl shadow-indigo-950/60 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>{language === 'bn' ? 'আলোচনা শুরু করুন' : 'Request a Quote'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
