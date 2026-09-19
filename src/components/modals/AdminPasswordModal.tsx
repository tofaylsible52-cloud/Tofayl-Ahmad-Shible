/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, KeyRound, X, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminPasswordModal: React.FC = () => {
  const {
    isAdminPasswordModalOpen,
    closeAdminPasswordModal,
    verifyAdminPassword,
    language,
  } = usePortfolio();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAdminPasswordModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMessage(language === 'bn' ? 'অনুগ্রহ করে পাসওয়ার্ড লিখুন।' : 'Please enter the admin password.');
      return;
    }

    const success = verifyAdminPassword(password);
    if (success) {
      setIsSuccess(true);
      setErrorMessage('');
      setTimeout(() => {
        setPassword('');
        setIsSuccess(false);
      }, 500);
    } else {
      setErrorMessage(
        language === 'bn' 
          ? 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' 
          : 'Incorrect password! Please enter valid password.'
      );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAdminPasswordModal}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeAdminPasswordModal}
            className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon and Header */}
          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-950/40">
              {isSuccess ? <Unlock className="w-7 h-7 text-emerald-400 animate-bounce" /> : <Lock className="w-7 h-7" />}
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              {language === 'bn' ? 'অ্যাডমিন সিকিউরিটি অ্যাক্সেস' : 'Admin Security Access'}
            </h3>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">
              {language === 'bn'
                ? 'অনলাইন এডিটিং ও সিএমএস প্যানেল আনলক করতে আপনার গোপন পাসওয়ার্ড দিন।'
                : 'Enter your secure owner password to unlock live portfolio management.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                {language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড' : 'Admin Password'}
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-indigo-500 focus:outline-none text-sm text-white placeholder-neutral-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'bn' ? 'আনলক করুন' : 'Unlock Admin Mode'}</span>
            </button>
          </form>

          {/* Quick instructions */}
          <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 text-center">
            {language === 'bn' ? (
              <p>
                শুধুমাত্র অথোরাইজড ওনারের জন্য সংরক্ষিত।
              </p>
            ) : (
              <p>
                Restricted area for portfolio owner only.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
