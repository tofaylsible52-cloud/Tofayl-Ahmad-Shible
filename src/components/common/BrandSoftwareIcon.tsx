/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandSoftwareIconProps {
  name: string;
  className?: string;
}

export const BrandSoftwareIcon: React.FC<BrandSoftwareIconProps> = ({ name, className = 'w-12 h-12' }) => {
  const normalized = name.toLowerCase().trim();

  // Adobe Premiere Pro (Official CC Badge)
  if (normalized.includes('premiere') || normalized === 'pr') {
    return (
      <div className={`${className} rounded-2xl bg-[#00005B] border border-[#9999FF]/50 flex items-center justify-center font-bold text-[#9999FF] shadow-lg shadow-[#00005B]/40 select-none overflow-hidden shrink-0`}>
        <div className="flex items-baseline justify-center">
          <span className="text-[17px] font-sans font-black tracking-tight leading-none">Pr</span>
        </div>
      </div>
    );
  }

  // Adobe After Effects (Official CC Badge)
  if (normalized.includes('after effects') || normalized.includes('aftereffects') || normalized === 'ae') {
    return (
      <div className={`${className} rounded-2xl bg-[#00005B] border border-[#D291FF]/50 flex items-center justify-center font-bold text-[#D291FF] shadow-lg shadow-[#00005B]/40 select-none overflow-hidden shrink-0`}>
        <div className="flex items-baseline justify-center">
          <span className="text-[17px] font-sans font-black tracking-tight leading-none">Ae</span>
        </div>
      </div>
    );
  }

  // Adobe Photoshop (Official CC Badge)
  if (normalized.includes('photoshop') || normalized === 'ps') {
    return (
      <div className={`${className} rounded-2xl bg-[#001E36] border border-[#31A8FF]/50 flex items-center justify-center font-bold text-[#31A8FF] shadow-lg shadow-[#001E36]/40 select-none overflow-hidden shrink-0`}>
        <div className="flex items-baseline justify-center">
          <span className="text-[17px] font-sans font-black tracking-tight leading-none">Ps</span>
        </div>
      </div>
    );
  }

  // Adobe Illustrator (Official CC Badge)
  if (normalized.includes('illustrator') || normalized === 'ai') {
    return (
      <div className={`${className} rounded-2xl bg-[#330000] border border-[#FF9A00]/50 flex items-center justify-center font-bold text-[#FF9A00] shadow-lg shadow-[#330000]/40 select-none overflow-hidden shrink-0`}>
        <div className="flex items-baseline justify-center">
          <span className="text-[17px] font-sans font-black tracking-tight leading-none">Ai</span>
        </div>
      </div>
    );
  }

  // Adobe Lightroom (Official CC Badge)
  if (normalized.includes('lightroom') || normalized === 'lr') {
    return (
      <div className={`${className} rounded-2xl bg-[#001E36] border border-[#31A8FF]/50 flex items-center justify-center font-bold text-[#31A8FF] shadow-lg shadow-[#001E36]/40 select-none overflow-hidden shrink-0`}>
        <div className="flex items-baseline justify-center">
          <span className="text-[17px] font-sans font-black tracking-tight leading-none">Lr</span>
        </div>
      </div>
    );
  }

  // Adobe Audition (Official CC Badge)
  if (normalized.includes('audition') || normalized === 'au') {
    return (
      <div className={`${className} rounded-2xl bg-[#001E36] border border-[#00E699]/50 flex items-center justify-center font-bold text-[#00E699] shadow-lg shadow-[#001E36]/40 select-none overflow-hidden shrink-0`}>
        <div className="flex items-baseline justify-center">
          <span className="text-[17px] font-sans font-black tracking-tight leading-none">Au</span>
        </div>
      </div>
    );
  }

  // DaVinci Resolve (Official Colorful Pinwheel Icon)
  if (normalized.includes('davinci') || normalized.includes('resolve')) {
    return (
      <div className={`${className} rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/80 flex items-center justify-center p-2 shadow-lg shadow-neutral-950/60 shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
          <path d="M50 8 C62 22, 78 33, 78 50 C78 67, 62 78, 50 92 C38 78, 22 67, 22 50 C22 33, 38 22, 50 8 Z" fill="#EF4444" />
          <path d="M8 50 C22 62, 33 78, 50 78 C67 78, 78 62, 92 50 C78 38, 67 22, 50 22 C33 22, 22 38, 8 50 Z" fill="#3B82F6" opacity="0.9" />
          <circle cx="50" cy="50" r="15" fill="#F59E0B" />
          <circle cx="50" cy="50" r="7" fill="#FFFFFF" opacity="0.9" />
        </svg>
      </div>
    );
  }

  // CapCut (Official Clean Vector Icon)
  if (normalized.includes('capcut')) {
    return (
      <div className={`${className} rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-700/80 flex items-center justify-center p-2.5 shadow-lg shadow-black/60 shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
          {/* CapCut dual chevron design */}
          <path d="M12 28 L50 48 L88 28 L50 8 Z" fill="#FFFFFF" />
          <path d="M12 72 L50 92 L88 72 L50 52 Z" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // Canva (Official Vibrant Gradient Brand Icon)
  if (normalized.includes('canva')) {
    return (
      <div className={`${className} rounded-2xl bg-gradient-to-tr from-[#00C4CC] via-[#7D2AE8] to-[#FF4E74] flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-900/40 select-none shrink-0`}>
        <span className="text-[20px] font-serif font-black italic drop-shadow-sm">C</span>
      </div>
    );
  }

  // Figma (Official 5-colored Logo)
  if (normalized.includes('figma')) {
    return (
      <div className={`${className} rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-2 shadow-lg shrink-0`}>
        <svg viewBox="0 0 38 57" className="w-5 h-7" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      </div>
    );
  }

  // Blender (Official 3D Logo)
  if (normalized.includes('blender')) {
    return (
      <div className={`${className} rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-2 shadow-lg shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="30" fill="#E87D0D" />
          <circle cx="50" cy="50" r="14" fill="#255799" />
          <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
          <path d="M50 20 L50 8" stroke="#E87D0D" strokeWidth="8" strokeLinecap="round" />
          <path d="M26 36 L16 26" stroke="#E87D0D" strokeWidth="8" strokeLinecap="round" />
          <path d="M74 36 L84 26" stroke="#E87D0D" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // InShot (Official Gradient Badge)
  if (normalized.includes('inshot')) {
    return (
      <div className={`${className} rounded-2xl bg-gradient-to-tr from-[#FF2A6D] to-[#FF6200] border border-rose-500/40 flex items-center justify-center text-white font-bold shadow-lg shadow-rose-950/60 select-none shrink-0`}>
        <span className="text-[17px] font-sans font-black tracking-tight">In</span>
      </div>
    );
  }

  // ChatGPT / OpenAI
  if (normalized.includes('chatgpt') || normalized.includes('openai')) {
    return (
      <div className={`${className} rounded-2xl bg-[#10A37F] border border-[#10A37F]/50 flex items-center justify-center p-2 shadow-lg shadow-emerald-950/60 shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
          <path d="M50 15 C35 15, 23 25, 20 38 C14 41, 10 48, 10 55 C10 65, 17 73, 27 75 C29 84, 38 90, 48 89 C58 88, 66 81, 68 72 C77 71, 84 64, 84 55 C84 48, 80 41, 74 38 C75 27, 65 17, 53 15 Z" fill="none" stroke="white" strokeWidth="6" />
          <circle cx="50" cy="50" r="12" fill="white" />
        </svg>
      </div>
    );
  }

  // Google Gemini / AI Studio
  if (normalized.includes('gemini') || normalized.includes('google ai') || normalized.includes('ai studio')) {
    return (
      <div className={`${className} rounded-2xl bg-gradient-to-tr from-[#1B72E8] via-[#8E24AA] to-[#EA4335] flex items-center justify-center p-2 shadow-lg shadow-indigo-950/60 shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
          <path d="M50 0 C50 27.6, 27.6 50, 0 50 C27.6 50, 50 72.4, 50 100 C50 72.4, 72.4 50, 100 50 C72.4 50, 50 27.6, 50 0 Z" />
        </svg>
      </div>
    );
  }

  // Claude (Anthropic)
  if (normalized.includes('claude') || normalized.includes('anthropic')) {
    return (
      <div className={`${className} rounded-2xl bg-[#CC785C] border border-[#D97757]/40 flex items-center justify-center text-white font-bold shadow-lg shadow-amber-950/60 select-none shrink-0`}>
        <span className="text-[17px] font-serif font-black">Cl</span>
      </div>
    );
  }

  // NotebookLM
  if (normalized.includes('notebooklm') || normalized.includes('notebook')) {
    return (
      <div className={`${className} rounded-2xl bg-[#00897B] border border-teal-400/40 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-950/60 select-none shrink-0`}>
        <span className="text-[16px] font-sans font-black">NLM</span>
      </div>
    );
  }

  // Microsoft Office / Excel / Word / 365
  if (normalized.includes('office') || normalized.includes('excel') || normalized.includes('word') || normalized.includes('ms')) {
    return (
      <div className={`${className} rounded-2xl bg-gradient-to-tr from-[#EA3E23] to-[#EB5A28] border border-orange-500/40 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-900/40 select-none shrink-0`}>
        <span className="text-[18px] font-sans font-black">O</span>
      </div>
    );
  }

  // Default fallback badge
  const letters = name.substring(0, 2).toUpperCase();
  return (
    <div className={`${className} rounded-2xl bg-gradient-to-br from-indigo-900 to-neutral-900 border border-indigo-500/50 flex items-center justify-center font-bold text-indigo-300 shadow-lg select-none shrink-0`}>
      <span className="text-[15px] font-mono font-black">{letters}</span>
    </div>
  );
};
