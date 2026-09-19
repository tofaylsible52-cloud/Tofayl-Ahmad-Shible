/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  MessageSquareQuote,
  Star,
  Plus,
  Trash2,
  Sparkles,
  Quote,
  ImageIcon
} from 'lucide-react';
import { InlineEditField } from '../common/InlineEditField';

export const TestimonialsSection: React.FC = () => {
  const {
    data,
    language,
    isEditMode,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    openImagePicker,
  } = usePortfolio();

  return (
    <section className="py-24 bg-neutral-950 relative border-t border-neutral-900 overflow-hidden">
      {/* Soft background light */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ক্লায়েন্ট রিভিউ ও ফিডব্যাক' : 'Client Endorsements'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {language === 'bn' ? 'ক্লায়েন্টদের প্রতিক্রিয়া ও রিভিউ' : 'What Clients & Creators Say'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              {language === 'bn'
                ? 'ভিডিও এডিটিংয়ের গতি, ভিজ্যুয়াল কোয়ালিটি, থাম্বনেইল সিটিআর ও আন্তরিক যোগাযোগের বাস্তব ফিডব্যাক।'
                : 'Trusted feedback on editing speed, visual quality, thumbnail CTR, and transparent communication.'}
            </p>
          </div>

          {isEditMode && (
            <button
              type="button"
              onClick={() =>
                addTestimonial({
                  clientName: language === 'bn' ? 'নতুন ক্লায়েন্ট' : 'New Client',
                  role: language === 'bn' ? 'কনটেন্ট ক্রিয়েটর' : 'Content Creator',
                  companyOrChannel: 'Studio / Channel',
                  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                  feedback: 'তোফায়েল ভাইয়ের কাজ অত্যন্ত নিখুঁত ও প্রফেশনাল। সময়মতো কাজ ডেলিভারি পেয়েছি।',
                  quote: 'Tofayel delivered high-retention video edits on schedule. The graphics and pacing were top-notch.',
                  rating: 5,
                  projectType: 'YouTube Video & Branding',
                })
              }
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'bn' ? 'রিভিউ যোগ করুন' : 'Add Review'}</span>
            </button>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.testimonials || []).map((review) => {
            const reviewText = language === 'bn'
              ? (review.feedback || review.quote || 'তোফায়েল ভাইয়ের ডিজাইন ও এডিটিং কোয়ালিটি অত্যন্ত প্রশংসনীয়।')
              : (review.quote || review.feedback || 'Outstanding design and video editing quality.');
            const companyText = review.companyOrChannel || review.company || '';

            return (
              <div
                key={review.id}
                className="group relative rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-indigo-500/40 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 theme-card-glow"
              >
                <div className="space-y-4">
                  {/* Top bar: Stars + Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Quote className="w-6 h-6 text-indigo-500/30" />
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => deleteTestimonial(review.id)}
                          className="p-1 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete testimonial"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm text-neutral-200 italic leading-relaxed">
                    &ldquo;
                    <InlineEditField
                      value={reviewText}
                      placeholder="Client feedback quote..."
                      multiline
                      onSave={(val) =>
                        updateTestimonial(review.id, {
                          feedback: val,
                          quote: val,
                        })
                      }
                    />
                    &rdquo;
                  </p>
                </div>

                {/* Client Info & Avatar */}
                <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={review.avatarUrl}
                        alt={review.clientName}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover border border-neutral-700"
                      />
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() =>
                            openImagePicker(
                              `Update ${review.clientName} Photo`,
                              review.avatarUrl,
                              (url) => updateTestimonial(review.id, { avatarUrl: url })
                            )
                          }
                          className="absolute -bottom-1 -right-1 p-1 rounded-full bg-black/80 text-white text-[10px] border border-white/20 cursor-pointer"
                          title="Change photo"
                        >
                          <ImageIcon className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white font-display">
                        <InlineEditField
                          value={review.clientName}
                          placeholder="Client Name"
                          onSave={(val) => updateTestimonial(review.id, { clientName: val })}
                        />
                      </h4>
                      <p className="text-xs text-neutral-400">
                        <InlineEditField
                          value={`${review.role} ${companyText ? '• ' + companyText : ''}`}
                          placeholder="Role / Brand"
                          onSave={(val) => {
                            if (val.includes('•')) {
                              const [r, c] = val.split('•').map((s) => s.trim());
                              updateTestimonial(review.id, { role: r, companyOrChannel: c, company: c });
                            } else {
                              updateTestimonial(review.id, { role: val });
                            }
                          }}
                        />
                      </p>
                    </div>
                  </div>

                  {review.projectType && (
                    <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950/60 px-2 py-1 rounded-lg border border-indigo-500/20 text-right shrink-0">
                      {review.projectType}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
