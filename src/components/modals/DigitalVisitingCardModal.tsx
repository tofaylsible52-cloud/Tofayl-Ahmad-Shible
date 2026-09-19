/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Download,
  Share2,
  Copy,
  Check,
  Sparkles,
  QrCode
} from 'lucide-react';

export const DigitalVisitingCardModal: React.FC = () => {
  const { data, language, isVisitingCardOpen, setIsVisitingCardOpen, showNotification } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [activeSide, setActiveSide] = useState<'front' | 'qr'>('front');

  if (!isVisitingCardOpen) return null;

  const handleCopyCard = () => {
    const info = `${data.personal.name}\n${data.personal.title}\nPhone: ${data.contact.phone}\nEmail: ${data.contact.email}\nWhatsApp: ${data.contact.whatsapp}\nLocation: ${data.personal.location}`;
    navigator.clipboard.writeText(info);
    setCopied(true);
    showNotification(language === 'bn' ? 'যোগাযোগের তথ্য ক্লিপবোর্ডে কপি করা হয়েছে!' : 'Contact info copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.personal.name}`,
      `TITLE:${data.personal.title}`,
      `EMAIL;TYPE=INTERNET,HOME:${data.contact.email}`,
      `TEL;TYPE=CELL:${data.contact.phone}`,
      `ADR;TYPE=HOME:;;${data.contact.addressDetail};Jurain;Dhaka;;Bangladesh`,
      `NOTE:Graphic Designer & Video Editor. Trained at As-Sunnah Skill Development Institute.`,
      `URL:${window.location.href}`,
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tofayel_Ahmad_Shible_Contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification(language === 'bn' ? 'ডিজিটাল ভিজিটিং কার্ড (.vcf) ডাউনলোড হয়েছে!' : 'Digital Visiting Card (.vcf) downloaded!', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsVisitingCardOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl z-10 text-neutral-100 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold font-display text-white">
                {language === 'bn' ? 'অল-ইন-ওয়ান ডিজিটাল ভিজিটিং কার্ড' : 'All-in-One Digital Visiting Card'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsVisitingCardOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Card View Switcher */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setActiveSide('front')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSide === 'front'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {language === 'bn' ? 'কার্ড প্রোফাইল' : 'Card Profile'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSide('qr')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSide === 'qr'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কিউআর কোড' : 'QR Code'}</span>
            </button>
          </div>

          {/* Digital Visiting Card Canvas */}
          <div className="relative rounded-2xl overflow-hidden p-6 sm:p-7 border border-indigo-500/30 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 shadow-2xl glow-purple mb-6">
            {/* Ambient subtle glow light inside card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {activeSide === 'front' ? (
              <div className="relative z-10 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={data.personal.avatarUrl}
                      alt={data.personal.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
                    />
                    <div>
                      <h4 className="text-lg font-extrabold font-display text-white">{data.personal.name}</h4>
                      <p className="text-xs font-semibold text-indigo-400 tracking-wide">{data.personal.title}</p>
                      <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                        <span>{data.personal.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {data.personal.availabilityStatus === 'available'
                      ? (language === 'bn' ? 'কাজের জন্য প্রস্তুত' : 'Available')
                      : (language === 'bn' ? 'সক্রিয়' : 'Active')}
                  </div>
                </div>

                <div className="h-px w-full bg-neutral-800" />

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <a
                    href={`tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-colors text-neutral-300 hover:text-white cursor-pointer"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{data.contact.phone}</span>
                  </a>

                  <a
                    href={`mailto:${data.contact.email}`}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-colors text-neutral-300 hover:text-white cursor-pointer"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{data.contact.email}</span>
                  </a>

                  <a
                    href={data.contact.whatsappDirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-colors text-neutral-300 hover:text-white cursor-pointer"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{language === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp Chat'}</span>
                  </a>

                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-300">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">
                      {data.personal.completedProjectsCount} {language === 'bn' ? '+ প্রজেক্ট সম্পন্ন' : 'Projects Done'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>{language === 'bn' ? 'আস-সুন্নাহ এসডিআই সার্টিফাইড' : 'As-Sunnah SDI Certified'}</span>
                  <span className="font-mono text-indigo-400">{language === 'bn' ? 'ক্রিয়েটিভ ও আধুনিক' : 'Creative & Modern'}</span>
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center text-center py-4 space-y-4">
                <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-neutral-800 inline-block">
                  {/* High visual QR Code representation */}
                  <div className="w-40 h-40 flex flex-col items-center justify-center bg-white text-black p-2 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Corner Position Detection Patterns */}
                      <rect x="5" y="5" width="28" height="28" fill="black" />
                      <rect x="9" y="9" width="20" height="20" fill="white" />
                      <rect x="13" y="13" width="12" height="12" fill="black" />

                      <rect x="67" y="5" width="28" height="28" fill="black" />
                      <rect x="71" y="9" width="20" height="20" fill="white" />
                      <rect x="75" y="13" width="12" height="12" fill="black" />

                      <rect x="5" y="67" width="28" height="28" fill="black" />
                      <rect x="9" y="71" width="20" height="20" fill="white" />
                      <rect x="13" y="75" width="12" height="12" fill="black" />

                      {/* Data dots matrix */}
                      <rect x="38" y="8" width="6" height="6" fill="black" />
                      <rect x="48" y="14" width="6" height="6" fill="black" />
                      <rect x="56" y="8" width="6" height="6" fill="black" />
                      <rect x="40" y="24" width="6" height="6" fill="black" />
                      <rect x="52" y="24" width="6" height="6" fill="black" />
                      
                      <rect x="8" y="38" width="6" height="6" fill="black" />
                      <rect x="18" y="44" width="6" height="6" fill="black" />
                      <rect x="28" y="38" width="6" height="6" fill="black" />

                      <rect x="42" y="42" width="16" height="16" rx="4" fill="#4f46e5" />
                      
                      <rect x="68" y="38" width="6" height="6" fill="black" />
                      <rect x="78" y="44" width="6" height="6" fill="black" />
                      <rect x="86" y="38" width="6" height="6" fill="black" />
                      <rect x="70" y="52" width="6" height="6" fill="black" />

                      <rect x="38" y="68" width="6" height="6" fill="black" />
                      <rect x="48" y="74" width="6" height="6" fill="black" />
                      <rect x="58" y="68" width="6" height="6" fill="black" />
                      <rect x="44" y="84" width="6" height="6" fill="black" />
                      <rect x="68" y="72" width="6" height="6" fill="black" />
                      <rect x="82" y="78" width="6" height="6" fill="black" />
                      <rect x="74" y="86" width="6" height="6" fill="black" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">
                    {language === 'bn' ? 'স্মার্টফোনে কন্টাক্ট সেভ করতে স্ক্যান করুন' : 'Scan to Save Contact on Smartphone'}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {language === 'bn'
                      ? `${data.personal.name}-এর নাম্বার ও ইমেইল সরাসরি সেভ হবে`
                      : `Instantly saves ${data.personal.name}'s profile, phone, and email`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopyCard}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 rounded-xl border border-neutral-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-400" />}
              <span>{copied ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'তথ্য কপি করুন' : 'Copy Info')}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadVCard}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white rounded-xl shadow-lg shadow-indigo-950/50 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'bn' ? 'কন্টাক্ট সেভ (.vcf)' : 'Save Contact (.vcf)'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
