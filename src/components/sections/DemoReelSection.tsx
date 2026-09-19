/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Film,
  Play,
  CheckCircle,
  ImageIcon,
  Edit3,
  Youtube,
  Check,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InlineEditField } from '../common/InlineEditField';
import { parseVideoUrl } from '../../utils/videoUtils';

export const DemoReelSection: React.FC = () => {
  const { data, updateDemoReel, isEditMode, isAdminUnlocked, language, t, openImagePicker } = usePortfolio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReelLinkInput, setShowReelLinkInput] = useState(false);
  const [customReelUrl, setCustomReelUrl] = useState('');

  const demoReel = data.demoReel || {
    title: '',
    subtitle: '',
    videoType: 'youtube',
    videoUrl: '',
    thumbnailUrl: '',
    role: '',
    softwareUsed: [],
    description: '',
    highlights: [],
  };

  const softwareList = demoReel.softwareUsed || [];
  const highlightsList = demoReel.highlights || [];
  const parsedVideo = parseVideoUrl(demoReel.videoUrl);

  const handleApplyReelUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customReelUrl.trim()) return;

    const parsed = parseVideoUrl(customReelUrl.trim());
    const newThumbnail = parsed.videoId
      ? `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`
      : demoReel.thumbnailUrl;

    updateDemoReel({
      videoUrl: customReelUrl.trim(),
      thumbnailUrl: newThumbnail,
    });
    setCustomReelUrl('');
    setShowReelLinkInput(false);
    setIsPlaying(true);
  };

  return (
    <section id="demoreel" className="py-24 bg-neutral-950/80 relative border-t border-neutral-900 overflow-hidden">
      {/* Dynamic colorful gradient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-purple-600/20 via-pink-600/15 to-indigo-600/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-500/20 via-purple-500/20 to-pink-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider shadow-lg">
            <Smartphone className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? '৯:১৬ ভার্টিক্যাল শোরিল (শর্টস / রিলস)' : 'Vertical Showreel (9:16 Shorts / Reel)'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            <InlineEditField
              value={demoReel.title}
              placeholder={language === 'bn' ? 'কমার্শিয়াল ও ক্রিয়েটিভ শোরিল ২০২৫/২০২৬' : 'Commercial & Creative Showreel 2025/2026'}
              onSave={(val) => updateDemoReel({ title: val })}
            />
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            <InlineEditField
              value={demoReel.subtitle}
              placeholder={language === 'bn' ? 'ডায়নামিক পেসিং, প্রিসিশন কালার গ্রেডিং, মোশন গ্রাফিক্স ও নেরেটিভ ভিডিওর সমন্বয়।' : 'A showcase of dynamic pacing, precision color grading, motion graphics, and narrative editing.'}
              onSave={(val) => updateDemoReel({ subtitle: val })}
            />
          </p>
        </div>

        {/* Quick Reel URL Linker - ONLY when Admin is unlocked & in Edit Mode */}
        {isAdminUnlocked && isEditMode && (
          <div className="max-w-xl mx-auto mb-8 p-4 rounded-3xl bg-neutral-900/90 border border-red-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>{language === 'bn' ? 'শোরিল ইউটিউব লিংক (শর্টস / ভিডিও)' : 'Showreel YouTube Link (Shorts / Video)'}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowReelLinkInput((prev) => !prev);
                  if (!showReelLinkInput && demoReel.videoUrl) {
                    setCustomReelUrl(demoReel.videoUrl);
                  }
                }}
                className="text-xs px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-xl border border-red-400/40 cursor-pointer font-bold shadow transition-all"
              >
                {showReelLinkInput ? (language === 'bn' ? 'বন্ধ করুন' : 'Close Input') : (language === 'bn' ? '⚡ শোরিল লিংক পরিবর্তন' : '⚡ Paste / Change Reel Link')}
              </button>
            </div>

            {showReelLinkInput && (
              <form onSubmit={handleApplyReelUrl} className="space-y-2 pt-1">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={customReelUrl}
                    onChange={(e) => setCustomReelUrl(e.target.value)}
                    placeholder={language === 'bn' ? 'ইউটিউব ভিডিও বা শর্টস লিংক পেস্ট করুন...' : 'Paste YouTube Video or Shorts URL (e.g. https://youtu.be/... or https://youtube.com/shorts/...)'}
                    className="w-full flex-1 px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 font-mono"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!customReelUrl.trim()}
                    className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সংরক্ষণ ও প্লে' : 'Save & Play'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {language === 'bn' ? '💡 যেকোনো ইউটিউব ভিডিও বা শর্টসের লিংক পেস্ট করলেই সাথে সাথে ভিডিও ও থাম্বনেইল আপডেট হয়ে যাবে।' : '💡 Paste any YouTube Shorts or normal YouTube URL. The video and thumbnail will update immediately.'}
                </p>
              </form>
            )}
          </div>
        )}

        {/* Vertical 9:16 Showcase Layout */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Vertical Reel Mockup Frame (9:16) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-[2.5rem] p-3 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black border-2 border-neutral-700/80 shadow-[0_0_50px_rgba(99,102,241,0.25)] group">
              {/* Phone Camera Notch Pill */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-950 rounded-full z-30 flex items-center justify-center border border-neutral-800">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700 mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
              </div>

              {/* Inner Display Screen */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black flex items-center justify-center">
                {isPlaying ? (
                  <div className="w-full h-full bg-black">
                    {parsedVideo.isDirect ? (
                      <video
                        src={parsedVideo.embedUrl}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <iframe
                        src={`${parsedVideo.embedUrl}${parsedVideo.embedUrl.includes('?') ? '&' : '?'}autoplay=1&rel=0`}
                        title="Featured Demo Reel"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-neutral-950 flex items-center justify-center">
                    {/* Poster Thumbnail */}
                    <img
                      src={demoReel.thumbnailUrl}
                      alt="Demo Reel Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                    {/* Play Button Trigger */}
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-900/60 hover:scale-110 active:scale-95 transition-all group/btn cursor-pointer"
                      aria-label="Play showreel video"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-40" />
                      <Play className="w-6 h-6 fill-white translate-x-0.5 group-hover/btn:scale-110 transition-transform" />
                    </button>

                    {/* Badge */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase text-white tracking-widest">
                        Tap To Play Reel
                      </span>
                    </div>

                    {/* Edit Controls when in Edit Mode */}
                    {isEditMode && (
                      <div className="absolute top-8 right-3 z-30 flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setCustomReelUrl(demoReel.videoUrl || '');
                            setShowReelLinkInput(true);
                          }}
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded-lg border border-red-400 shadow flex items-center gap-1 cursor-pointer"
                        >
                          <Youtube className="w-3 h-3" />
                          <span>Link</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openImagePicker(
                              'Update Demo Reel Thumbnail',
                              demoReel.thumbnailUrl,
                              (url) => updateDemoReel({ thumbnailUrl: url })
                            )
                          }
                          className="px-2.5 py-1 bg-black/80 hover:bg-black text-white text-[10px] font-semibold rounded-lg border border-white/20 backdrop-blur-md flex items-center gap-1 shadow cursor-pointer"
                        >
                          <ImageIcon className="w-3 h-3" />
                          <span>Cover</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details & Production Metadata */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border border-neutral-800/90 shadow-xl space-y-5">
              <div>
                <span className="text-[11px] uppercase font-bold text-indigo-400 tracking-wider">
                  {language === 'bn' ? 'ভূমিকা ও প্রডাকশন' : 'Role & Production'}
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  <InlineEditField
                    value={demoReel.role}
                    placeholder={language === 'bn' ? 'লিড ভিডিও এডিটর ও মোশন ডিজাইনার' : 'Lead Video Editor & Motion Designer'}
                    onSave={(val) => updateDemoReel({ role: val })}
                  />
                </h3>
              </div>

              {/* Software Used Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {softwareList.map((software, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-neutral-800/90 border border-neutral-700 text-neutral-200 text-xs font-medium shadow-sm"
                  >
                    {software}
                  </span>
                ))}
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                <InlineEditField
                  value={demoReel.description}
                  placeholder={language === 'bn' ? 'ইউটিউব ভিডিও স্টোরিটেলিং, শর্ট-ফর্ম ভাইরাল ট্রানজিশন, সাউন্ড এফেক্টস, সিনেমাটিক কালার গ্রেডিং ও সোশ্যাল মার্কেটিং ভিডিও সম্বলিত শোরিল।' : 'Featured highlight reel capturing fast-paced YouTube storytelling, short-form viral transitions, podcast audio mastering, cinematic color grades, and branded social marketing spots.'}
                  multiline
                  onSave={(val) => updateDemoReel({ description: val })}
                />
              </p>

              {/* Highlights Bullet Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-neutral-800">
                {highlightsList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
