/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  Sparkles,
  CreditCard,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { DynamicIcon } from '../common/DynamicIcon';
import { InlineEditField } from '../common/InlineEditField';

export const ContactSection: React.FC = () => {
  const {
    data,
    language,
    t,
    updateContact,
    setIsVisitingCardOpen,
    showNotification,
  } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Graphic Design & Branding',
    budget: '৳৩,০০০ - ৳৮,০০০',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showNotification(
        language === 'bn' ? 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।' : 'Please fill in all required fields.',
        'info'
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showNotification(
        language === 'bn'
          ? `ধন্যবাদ ${formData.name}! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।`
          : `Thank you ${formData.name}! Your project inquiry has been sent to ${data.personal.name}.`,
        'success'
      );
      setFormData({
        name: '',
        email: '',
        serviceType: 'Graphic Design & Branding',
        budget: '৳৩,০০০ - ৳৮,০০০',
        message: '',
      });
    }, 800);
  };

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
    showNotification(
      language === 'bn' ? `ক্লিপবোর্ডে কপি করা হয়েছে: ${text}` : `Copied ${text} to clipboard!`,
      'success'
    );
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 relative border-t border-neutral-900">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'যোগাযোগ করুন' : 'Get In Touch'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {language === 'bn' ? 'আপনার প্রজেক্ট নিয়ে কথা বলুন' : "Let's Build Your Next Creative Project"}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {language === 'bn'
              ? 'ইউটিউব ভিডিও এডিটিং, শর্টস/রিলস, মোশন ডিজাইন এবং গ্রাফিক ডিজাইনের যেকোনো কাজের জন্য সরাসরি যোগাযোগ করুন।'
              : 'Available for freelance video editing, YouTube channel branding, motion design, and graphics design contracts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Visiting Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Contact Cards */}
            <div className="space-y-4">
              {/* Phone card */}
              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-indigo-500/40 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                      {language === 'bn' ? 'সরাসরি ফোন' : 'Direct Phone'}
                    </span>
                    <p className="text-sm font-bold text-white">
                      <InlineEditField
                        value={data.contact.phone}
                        placeholder="01798825795"
                        onSave={(val) => updateContact({ phone: val })}
                      />
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 font-semibold transition-colors cursor-pointer"
                  >
                    {language === 'bn' ? 'কল দিন' : 'Call'}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(data.contact.phone, 'phone')}
                    className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
                    title="Copy phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Email card */}
              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-indigo-500/40 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                      {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                    </span>
                    <p className="text-sm font-bold text-white">
                      <InlineEditField
                        value={data.contact.email}
                        placeholder="tofaylsible52@gmail.com"
                        onSave={(val) => updateContact({ email: val })}
                      />
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 font-semibold transition-colors cursor-pointer"
                  >
                    {language === 'bn' ? 'মেইল' : 'Mail'}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(data.contact.email, 'email')}
                    className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* WhatsApp direct card */}
              <a
                href={data.contact.whatsappDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center justify-between group block cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      {language === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপ চ্যাট' : 'Instant WhatsApp Chat'}
                    </span>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Chat on WhatsApp'}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </p>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Location card */}
              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    {language === 'bn' ? 'বর্তমান ঠিকানা / স্টুডিও' : 'Studio Location'}
                  </span>
                  <p className="text-sm font-bold text-white">
                    <InlineEditField
                      value={data.contact.addressDetail}
                      placeholder="Jurain, Dhaka, Bangladesh"
                      onSave={(val) => updateContact({ addressDetail: val })}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Visiting Card CTA Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    {language === 'bn' ? 'ডিজিটাল ভিজিটিং কার্ড' : 'Digital Visiting Card'}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {language === 'bn' ? 'মোবাইলে সেভ করার জন্য ভিকার্ড (.vcf) ও কিউআর কোড' : 'Download contact card (.vcf) directly to phone'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVisitingCardOpen(true)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'bn' ? 'ভিজিটিং কার্ড ও কিউআর খুলুন' : 'Open Visiting Card & QR'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Social Network Links */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                {language === 'bn' ? 'সোশ্যাল প্রোফাইল ও লিংক' : 'Social Profiles & Portfolios'}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {(data.socialLinks || []).map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-indigo-600 text-neutral-300 hover:text-white border border-neutral-800 transition-all text-xs font-medium hover:scale-105 shadow cursor-pointer"
                  >
                    <DynamicIcon name={soc.iconName} className="w-4 h-4" />
                    <span>{soc.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-2xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-display text-white">
                  {language === 'bn' ? 'প্রজেক্টের প্রস্তাব পাঠান' : 'Send a Project Inquiry'}
                </h3>
                <p className="text-xs text-neutral-400">
                  {language === 'bn'
                    ? 'আপনার প্রজেক্টের বিবরণ নিচে পূরণ করুন, খুব দ্রুত রেসপন্স পাবেন।'
                    : 'Fill out the project details below to receive a response within 24 hours.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'bn' ? 'যেমন: রহিম আহমেদ' : 'e.g. John Doe'}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-sm text-neutral-100 placeholder-neutral-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      {language === 'bn' ? 'আপনার ইমেইল *' : 'Your Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={language === 'bn' ? 'যেমন: name@example.com' : 'e.g. john@example.com'}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-sm text-neutral-100 placeholder-neutral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service needed */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      {language === 'bn' ? 'প্রয়োজনীয় সার্ভিস' : 'Service Required'}
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-sm text-neutral-100"
                    >
                      <option value="Graphic Design & Branding">{language === 'bn' ? 'গ্রাফিক ডিজাইন ও ব্র্যান্ডিং (Graphic Design)' : 'Graphic Design & Branding'}</option>
                      <option value="T-Shirt & Apparel Design">{language === 'bn' ? 'টি-শার্ট ও মার্চেন্ডাইজ ডিজাইন (T-Shirt Design)' : 'T-Shirt & Apparel Design'}</option>
                      <option value="YouTube Video Editing">{language === 'bn' ? 'ইউটিউব ভিডিও এডিটিং (YouTube Video Editing)' : 'YouTube Video Editing'}</option>
                      <option value="Reels & TikTok Short-form">{language === 'bn' ? 'রিলস ও টিকটক শর্ট-ফর্ম (Reels & TikTok)' : 'Reels & TikTok Short-form'}</option>
                      <option value="YouTube Thumbnail Package">{language === 'bn' ? 'ইউটিউব থাম্বনেইল প্যাকেজ (Thumbnails)' : 'YouTube Thumbnail Package'}</option>
                      <option value="Motion Graphics & Sound">{language === 'bn' ? 'মোশন গ্রাফিক্স ও সাউন্ড ডিজাইন' : 'Motion Graphics & Sound'}</option>
                      <option value="Complete Creative Retainer">{language === 'bn' ? 'কমপ্লিট ক্রিয়েটিভ রিটেইনার (Full Retainer)' : 'Complete Creative Retainer'}</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      {language === 'bn' ? 'আনুমানিক বাজেট (BDT ৳)' : 'Estimated Budget (BDT ৳)'}
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-sm text-neutral-100"
                    >
                      <option value="৳৩,০০০ - ৳৮,০০০">{language === 'bn' ? '৳৩,০০০ - ৳৮,০০০ (কুইক / সিঙ্গেল প্রজেক্ট)' : '৳3,000 - ৳8,000 (Quick Project)'}</option>
                      <option value="৳৮,০০০ - ৳১৫,০০০">{language === 'bn' ? '৳৮,০০০ - ৳১৫,০০০ (স্ট্যান্ডার্ড ডিজাইন / ভিডিও)' : '৳8,000 - ৳15,000 (Standard Project)'}</option>
                      <option value="৳১৫,০০০ - ৳৩০,০০০">{language === 'bn' ? '৳১৫,০০০ - ৳৩০,০০০ (ব্র্যান্ড আইডেন্টিটি / প্যাকেজ)' : '৳15,000 - ৳30,000 (Full Package)'}</option>
                      <option value="৳৩০,০০০ - ৳৬০,০০০">{language === 'bn' ? '৳৩০,০০০ - ৳৬০,০০০ (মাসিক ক্রিয়েটিভ রিটেইনার)' : '৳30,000 - ৳60,000 (Monthly Retainer)'}</option>
                      <option value="৳৬০,০০০+">{language === 'bn' ? '৳৬০,০০০+ (কাস্টম লং-টার্ম চুক্তি)' : '৳60,000+ (Long-Term Retainer)'}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    {language === 'bn' ? 'প্রজেক্টের বিবরণ ও রেফারেন্স লিংক *' : 'Project Overview & Links *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      language === 'bn'
                        ? 'আপনার ভিডিও বা ডিজাইনের বিবরণ, কাজের ভলিউম, ডেডলাইন বা রেফারেন্স লিংক লিখুন...'
                        : 'Describe your video or design project, footage volume, reference links, and deadlines...'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:outline-none text-sm text-neutral-100 placeholder-neutral-500 resize-none"
                  />
                </div>

                {/* Form Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? (language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending inquiry...')
                      : (language === 'bn' ? 'মেসেজ পাঠান' : 'Send Message')}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
