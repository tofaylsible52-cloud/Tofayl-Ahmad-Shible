/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Video, Youtube, Check, AlertCircle, Play, Sparkles } from 'lucide-react';
import { parseVideoUrl } from '../../utils/videoUtils';
import { PortfolioProject } from '../../types';

interface QuickVideoLinkModalProps {
  isOpen: boolean;
  project: PortfolioProject | null;
  onClose: () => void;
  onSave: (updated: {
    videoUrl: string;
    thumbnailUrl?: string;
    title?: string;
    category?: 'Video Editing' | 'Graphic Design';
    subCategory?: string;
  }) => void;
}

export const QuickVideoLinkModal: React.FC<QuickVideoLinkModalProps> = ({
  isOpen,
  project,
  onClose,
  onSave,
}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [subCategory, setSubCategory] = useState('YouTube Video');
  const [autoUpdateThumbnail, setAutoUpdateThumbnail] = useState(true);

  useEffect(() => {
    if (project) {
      setVideoUrl(project.videoUrl || '');
      setTitle(project.title || '');
      setSubCategory(project.subCategory || 'YouTube Video');
    }
  }, [project, isOpen]);

  if (!isOpen || !project) return null;

  const parsed = videoUrl ? parseVideoUrl(videoUrl) : null;
  const hasValidVideo = Boolean(parsed && parsed.embedUrl);
  const ytThumbnail = parsed?.videoId
    ? `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`
    : '';

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    onSave({
      videoUrl: videoUrl.trim(),
      title: title.trim() || project.title,
      category: 'Video Editing',
      subCategory: subCategory.trim() || project.subCategory || 'YouTube Video',
      thumbnailUrl: autoUpdateThumbnail && ytThumbnail ? ytThumbnail : project.thumbnailUrl,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 z-10 text-neutral-100 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Paste YouTube / Video Link</h3>
                <p className="text-xs text-neutral-400">Add or replace the video in this project</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleApply} className="space-y-4">
            {/* Video URL Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-indigo-400" />
                <span>YouTube / Video URL</span>
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="e.g. https://youtu.be/L6hsr78adkU or https://www.youtube.com/watch?v=..."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
                autoFocus
              />
              <p className="text-[11px] text-neutral-500">
                Supports youtu.be, standard YouTube watch, YouTube Shorts, Vimeo, or direct MP4 links.
              </p>
            </div>

            {/* Live Video Preview Box */}
            {hasValidVideo && (
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Video Detected
                  </span>
                  <span className="text-[11px] text-neutral-500 uppercase">{parsed?.platform}</span>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-neutral-800 flex items-center justify-center">
                  {ytThumbnail ? (
                    <>
                      <img
                        src={ytThumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 fill-white translate-x-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <span className="text-xs text-neutral-400">Embed Ready</span>
                  )}
                </div>

                {ytThumbnail && (
                  <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={autoUpdateThumbnail}
                      onChange={(e) => setAutoUpdateThumbnail(e.target.checked)}
                      className="rounded border-neutral-700 bg-neutral-900 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Automatically use YouTube thumbnail as project cover image</span>
                  </label>
                )}
              </div>
            )}

            {/* Project Title Input (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. YouTube Video Edit"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!videoUrl.trim()}
                className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-lg shadow-red-950/50 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save & Embed Video</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
