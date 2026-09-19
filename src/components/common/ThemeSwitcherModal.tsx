/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, Sparkles, X, SunMedium, Orbit } from 'lucide-react';
import { ThemeColorMode } from '../../types';

export interface ThemeOption {
  id: ThemeColorMode;
  nameBn: string;
  nameEn: string;
  subtitleBn: string;
  subtitleEn: string;
  previewGradient: string;
  accentHex: string;
  badge: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'cyber-indigo',
    nameBn: '১. সাইবার ইন্ডিগো ও ইলেকট্রিক ভায়োলেট',
    nameEn: '1. Cyber Indigo & Electric Violet',
    subtitleBn: 'ভিডিও এডিটর ও ক্রিয়েটিভ আর্টিস্টদের মোস্ট পপুলার থিম',
    subtitleEn: 'Most popular for video creators & editors',
    previewGradient: 'from-indigo-600 via-purple-600 to-pink-500',
    accentHex: '#6366f1',
    badge: 'Trending',
  },
  {
    id: 'emerald-cyan',
    nameBn: '২. এমেরাল্ড মিন্ট ও নিয়ন সিয়ান',
    nameEn: '2. Emerald Mint & Neon Cyan',
    subtitleBn: 'ফ্রেশ ওশান ভাইব, অত্যন্ত পরিষ্কার ও আধুনিক লুক',
    subtitleEn: 'Fresh oceanic vibe with modern glowing cyan',
    previewGradient: 'from-emerald-500 via-teal-500 to-cyan-400',
    accentHex: '#10b981',
    badge: 'Fresh',
  },
  {
    id: 'sunset-amber',
    nameBn: '৩. সানসেট অ্যাম্বার ও ডিপ মেজেন্টা',
    nameEn: '3. Sunset Amber & Deep Magenta',
    subtitleBn: 'উজ্জ্বল রোদেলা গোল্ডেন ও ভাইব্রেন্ট মেজেন্টা পার্পল',
    subtitleEn: 'Warm sunset glow with energetic magenta',
    previewGradient: 'from-amber-500 via-rose-500 to-fuchsia-600',
    accentHex: '#f59e0b',
    badge: 'Vibrant',
  },
  {
    id: 'cosmic-aurora',
    nameBn: '৪. কসমিক অরোরা মেস',
    nameEn: '4. Cosmic Aurora Mesh',
    subtitleBn: 'মাল্টিকালার লাইভ স্মুথ অ্যানিমেটেড অরোরা গ্লো',
    subtitleEn: 'Multi-color dynamic flowing rainbow aurora',
    previewGradient: 'from-fuchsia-500 via-cyan-400 to-indigo-500',
    accentHex: '#d946ef',
    badge: 'Dynamic',
  },
  {
    id: 'obsidian-gold',
    nameBn: '৫. লাক্সারি অবসিডিয়ান গোল্ড ও রয়্যাল ব্লু',
    nameEn: '5. Luxury Obsidian Gold & Royal Blue',
    subtitleBn: 'এলিট মেটালিক গোল্ডেন ও স্যাফায়ার ব্লু ফিনিশ',
    subtitleEn: 'Elite metallic gold & sapphire agency finish',
    previewGradient: 'from-amber-400 via-yellow-500 to-blue-600',
    accentHex: '#eab308',
    badge: 'Premium',
  },
];

export const ThemeSwitcherModal: React.FC = () => {
  const { colorTheme, setColorTheme, isThemePickerOpen, setIsThemePickerOpen, language } = usePortfolio();

  return (
    <>
      {/* Floating Theme Switcher Floating Action Button */}
      <motion.button
        type="button"
        onClick={() => setIsThemePickerOpen(!isThemePickerOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800/95 border-2 border-indigo-500/50 hover:border-indigo-400 text-white shadow-2xl shadow-indigo-950/80 backdrop-blur-md cursor-pointer transition-all group"
        title="Change Live Color Theme"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
          <Palette className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-bold font-display hidden sm:inline text-neutral-200 group-hover:text-white">
          {language === 'bn' ? 'কালার থিম' : 'Color Themes'}
        </span>
      </motion.button>

      {/* Theme Selector Modal / Drawer */}
      <AnimatePresence>
        {isThemePickerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsThemePickerOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-neutral-900/95 border border-neutral-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 text-white max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsThemePickerOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold font-display text-white flex items-center gap-2">
                    <span>{language === 'bn' ? 'লাইভ কালার ও মোশন থিম' : 'Live Color & Motion Themes'}</span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {language === 'bn'
                      ? 'পছন্দের থিমে ক্লিক করুন, পুরো ওয়েবসাইটের ব্যাকগ্রাউন্ড ও কার্ড সাথে সাথে বদলে যাবে।'
                      : 'Choose your favorite palette to instantly transform the entire background and cards.'}
                  </p>
                </div>
              </div>

              {/* 5 Themes List */}
              <div className="space-y-3">
                {THEME_OPTIONS.map((themeOption) => {
                  const isSelected = colorTheme === themeOption.id;

                  return (
                    <motion.div
                      key={themeOption.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setColorTheme(themeOption.id);
                      }}
                      className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3.5 ${
                        isSelected
                          ? 'bg-neutral-800/90 border-indigo-500 shadow-lg shadow-indigo-950/50 ring-2 ring-indigo-500/30'
                          : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Theme Circle Preview */}
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${themeOption.previewGradient} p-0.5 shadow-md shrink-0 flex items-center justify-center`}
                        >
                          <div className="w-full h-full rounded-[14px] bg-neutral-950/30 backdrop-blur-xs flex items-center justify-center text-white">
                            {isSelected ? (
                              <Check className="w-5 h-5 text-white stroke-[2.5]" />
                            ) : (
                              <Sparkles className="w-4 h-4 opacity-75" />
                            )}
                          </div>
                        </div>

                        {/* Title & Info */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-sm font-bold font-display ${
                                isSelected ? 'text-white' : 'text-neutral-200'
                              }`}
                            >
                              {language === 'bn' ? themeOption.nameBn : themeOption.nameEn}
                            </h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-white/10 text-neutral-300">
                              {themeOption.badge}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {language === 'bn' ? themeOption.subtitleBn : themeOption.subtitleEn}
                          </p>
                        </div>
                      </div>

                      {/* Active indicator */}
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Tip */}
              <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
                <span>{language === 'bn' ? '✓ স্বয়ংক্রিয়ভাবে সেভ হবে' : '✓ Saved automatically'}</span>
                <button
                  type="button"
                  onClick={() => setIsThemePickerOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'সম্পন্ন' : 'Done'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
