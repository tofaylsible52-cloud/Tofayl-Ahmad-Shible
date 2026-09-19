/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Copy,
  Check,
  Code,
  Sparkles,
  Upload,
  AlertCircle,
  FileCode,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface DeployExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployExportModal: React.FC<DeployExportModalProps> = ({ isOpen, onClose }) => {
  const { data, exportDataAsJSON, importDataFromJSON, showNotification } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'export' | 'code'>('export');
  const [importText, setImportText] = useState('');

  if (!isOpen) return null;

  const dataJsonString = JSON.stringify(data, null, 2);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(dataJsonString);
      setCopied(true);
      showNotification('Portfolio data copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      // fallback
    }
  };

  const handleImportText = () => {
    if (!importText.trim()) return;
    const success = importDataFromJSON(importText.trim());
    if (success) {
      setImportText('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl p-5 sm:p-7 z-10 text-neutral-100 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Permanent Backup & Vercel Deploy Center</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Ensure all your photos, YouTube links, and custom edits stay permanently preserved.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Info Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Your local edits are 100% saved automatically!</p>
              <p className="text-[11px] text-emerald-300/80 leading-relaxed mt-0.5">
                Every image, YouTube link, or text you change is instantly saved in your browser storage. You can also download a backup file or copy the raw JSON anytime.
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-neutral-950 rounded-2xl border border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab('export')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'export'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Backup & Download
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Copy Code / Restore JSON
            </button>
          </div>

          {/* Tab 1: Export Actions */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Download Backup */}
                <button
                  type="button"
                  onClick={exportDataAsJSON}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-indigo-500/50 flex flex-col items-start text-left space-y-2 group transition-all cursor-pointer shadow-md"
                >
                  <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Download Portfolio Backup (.json)</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Save a complete backup file to your computer.
                    </p>
                  </div>
                </button>

                {/* Copy JSON Code */}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/50 flex flex-col items-start text-left space-y-2 group transition-all cursor-pointer shadow-md"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {copied ? 'Copied to Clipboard!' : 'Copy Entire Data Code'}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Copy raw data to easily paste into source code.
                    </p>
                  </div>
                </button>
              </div>

              {/* Vercel Deployment Tips */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-xs">
                <h4 className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4" />
                  <span>How to deploy to Vercel with your custom photos and videos:</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-neutral-300 text-[11px] leading-relaxed pl-1">
                  <li>Edit your projects, paste your YouTube links and Postimages photo links directly on this site.</li>
                  <li>Click <strong>"Download Portfolio Backup (.json)"</strong> to save your work securely.</li>
                  <li>When deploying to Vercel, your live site will run instantly with smooth 60fps performance!</li>
                </ol>
              </div>
            </div>
          )}

          {/* Tab 2: Code & Manual Restore */}
          {activeTab === 'code' && (
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                  <span>Paste JSON Backup to Restore:</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Current Data</span>
                  </button>
                </label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste your JSON backup data here..."
                  rows={6}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleImportText}
                  disabled={!importText.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Restore from Pasted JSON</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
