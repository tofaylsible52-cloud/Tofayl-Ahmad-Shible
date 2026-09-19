/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Save,
  RotateCcw,
  SlidersHorizontal,
  Download,
  Upload,
  CheckCircle,
  Eye,
  Edit3,
  X,
  AlertCircle
} from 'lucide-react';
import { ConfirmationModal } from '../common/ConfirmationModal';

export const EditControlBar: React.FC = () => {
  const {
    isEditMode,
    setIsEditMode,
    hasUnsavedChanges,
    saveChanges,
    cancelChanges,
    resetToDefault,
    exportDataAsJSON,
    importDataFromJSON,
    openAdminModal,
    lockAdmin,
    language,
  } = usePortfolio();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataFromJSON(content);
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showResetConfirm}
        title="Reset Portfolio Content?"
        message="This will restore all default personal details, projects, skills, and resume data. Any custom edits not backed up will be overwritten."
        confirmText="Reset to Default"
        isDangerous={true}
        onConfirm={() => {
          resetToDefault();
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />

      <ConfirmationModal
        isOpen={showCancelConfirm}
        title="Discard Unsaved Edits?"
        message="Are you sure you want to discard your unsaved changes? They will revert to the last saved state."
        confirmText="Discard Changes"
        isDangerous={true}
        onConfirm={() => {
          cancelChanges();
          setShowCancelConfirm(false);
        }}
        onCancel={() => setShowCancelConfirm(false)}
      />

      {/* Floating Control Bar when in Edit Mode */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl"
          >
            <div className="bg-neutral-900/95 backdrop-blur-xl border border-indigo-500/40 rounded-2xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-white">
              {/* Status Indicator */}
              <div className="flex items-center gap-2.5 pl-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                      Live CMS Active
                    </span>
                    {hasUnsavedChanges && (
                      <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Unsaved edits
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 hidden sm:block">
                    Click any pencil icon or use the full admin panel
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center flex-wrap gap-2 ml-auto">
                {/* Admin Drawer Button */}
                <button
                  type="button"
                  onClick={() => openAdminModal()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 rounded-xl border border-neutral-700 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Admin Panel</span>
                </button>

                {/* Import / Export Backup */}
                <button
                  type="button"
                  onClick={exportDataAsJSON}
                  title="Export portfolio as JSON backup"
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 rounded-xl border border-neutral-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Import portfolio from JSON backup"
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 rounded-xl border border-neutral-700 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                {/* Reset to Default */}
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  title="Reset to default content"
                  className="px-2.5 py-1.5 text-xs text-neutral-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl border border-transparent hover:border-rose-900/50 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>

                {/* Cancel Button */}
                {hasUnsavedChanges && (
                  <button
                    type="button"
                    onClick={() => setShowCancelConfirm(true)}
                    className="px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-700 transition-colors"
                  >
                    Cancel
                  </button>
                )}

                {/* Save Button */}
                <button
                  type="button"
                  onClick={saveChanges}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl shadow-lg transition-all ${
                    hasUnsavedChanges
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60 ring-2 ring-emerald-400/50'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/50'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'সেভ করুন' : 'Save All'}</span>
                </button>

                {/* Lock and Hide */}
                <button
                  type="button"
                  onClick={() => {
                    lockAdmin();
                    setIsEditMode(false);
                  }}
                  title={language === 'bn' ? 'লক করুন ও হাইড করুন' : 'Lock Admin & Hide Controls'}
                  className="px-2.5 py-1.5 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'লক ও হাইড' : 'Hide'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
