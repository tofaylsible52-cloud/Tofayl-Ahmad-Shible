/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { normalizeImageUrl, isPostimagesPageUrl } from '../../utils/imageUtils';

const PRESET_CREATIVE_IMAGES = [
  {
    name: 'Creative Designer Portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    category: 'Portrait',
  },
  {
    name: 'Modern Studio Workspace',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    category: 'Hero / Banner',
  },
  {
    name: 'Video Timeline & Monitor',
    url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    category: 'Demo Reel',
  },
  {
    name: 'Tech Video Review Production',
    url: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=900&q=80',
    category: 'Video Project',
  },
  {
    name: 'Social Media & Smartphone Reels',
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=900&q=80',
    category: 'Reels Project',
  },
  {
    name: 'Studio Podcast & Microphones',
    url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80',
    category: 'Podcast Project',
  },
  {
    name: 'Graphic Design Typography & Colors',
    url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80',
    category: 'Design Project',
  },
  {
    name: 'Branding Stationery Mockup',
    url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=900&q=80',
    category: 'Branding Project',
  },
];

export const ImageUploadModal: React.FC = () => {
  const { imagePickerState, closeImagePicker, showNotification } = usePortfolio();
  const { isOpen, title, currentUrl, onSelect } = imagePickerState;

  const [inputUrl, setInputUrl] = useState(currentUrl || '');
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync when opened
  React.useEffect(() => {
    if (isOpen) {
      setInputUrl(currentUrl || '');
    }
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file (JPEG, PNG, WebP, SVG).', 'warning');
      return;
    }

    // Limit to ~4MB to avoid extreme storage bloat
    if (file.size > 4 * 1024 * 1024) {
      showNotification('Image is larger than 4MB. Consider using an image URL or compressing it.', 'warning');
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setInputUrl(result);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setIsProcessing(false);
      showNotification('Error reading file.', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleApply = () => {
    if (!inputUrl.trim()) {
      showNotification('Please provide an image URL or upload a file.', 'warning');
      return;
    }
    onSelect(inputUrl.trim());
    closeImagePicker();
    showNotification('Image updated successfully.', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeImagePicker}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl z-10 text-neutral-100 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display">{title || 'Change Image'}</h3>
            </div>
            <button
              type="button"
              onClick={closeImagePicker}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 pt-4 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'upload'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'url'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              Direct Image URL
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'presets'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Creative Presets
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto py-3 space-y-4">
            {activeTab === 'upload' && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                }}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-neutral-700 bg-neutral-950/50 hover:border-neutral-600'
                }`}
              >
                <div className="p-3 bg-neutral-800 rounded-full mb-3 text-indigo-400">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-neutral-200 mb-1">
                  Drag & Drop image here, or click to browse
                </p>
                <p className="text-xs text-neutral-400 mb-4">
                  Supports PNG, JPG, WebP, GIF, SVG
                </p>
                <label className="cursor-pointer px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl border border-neutral-700 transition-colors">
                  <span>Browse Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            )}

            {activeTab === 'url' && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-neutral-300">
                  Enter Web Image URL (Direct Link)
                </label>
                <input
                  type="text"
                  placeholder="https://i.postimg.cc/... or https://i.ibb.co/..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(normalizeImageUrl(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
                {isPostimagesPageUrl(inputUrl) && (
                  <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-[11px] text-amber-200">
                    ⚠️ এটি Postimages এর ওয়েবপেজ লিংক। দয়া করে Postimages থেকে <strong>"Direct link"</strong> (যা <code>i.postimg.cc/...</code> দিয়ে শুরু হয়) কপি করুন, অথবা উপরের <strong>"Upload File"</strong> ট্যাবে গিয়ে সরাসরি আপনার ছবি সিলেক্ট করুন।
                  </div>
                )}
                <p className="text-xs text-neutral-400">
                  Tip: Copy the <strong>Direct link</strong> from Postimages/ImgBB, or use Google Drive / Imgur / Unsplash URLs.
                </p>
              </div>
            )}

            {activeTab === 'presets' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {PRESET_CREATIVE_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInputUrl(preset.url)}
                    className={`group relative rounded-xl overflow-hidden border text-left transition-all aspect-video ${
                      inputUrl === preset.url
                        ? 'border-indigo-500 ring-2 ring-indigo-500/50'
                        : 'border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2 flex flex-col justify-end">
                      <span className="text-[10px] text-indigo-300 font-semibold uppercase">{preset.category}</span>
                      <span className="text-xs text-white font-medium truncate">{preset.name}</span>
                    </div>
                    {inputUrl === preset.url && (
                      <div className="absolute top-1.5 right-1.5 p-1 bg-indigo-600 rounded-full text-white shadow">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Live Preview Box */}
            {inputUrl && (
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-400">Preview</span>
                  <button
                    type="button"
                    onClick={() => setInputUrl('')}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Clear Image
                  </button>
                </div>
                <div className="relative max-h-48 rounded-lg overflow-hidden flex items-center justify-center bg-neutral-900 border border-neutral-800">
                  <img
                    src={inputUrl}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="max-h-48 w-auto object-contain rounded-md"
                    onError={() => {
                      // Fallback visual
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={closeImagePicker}
              className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isProcessing || !inputUrl}
              onClick={handleApply}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-950/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Apply Image
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
