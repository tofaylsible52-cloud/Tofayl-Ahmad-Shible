/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Calendar,
  User,
  Layers,
  Play,
  Edit3,
  Image as ImageIcon,
  Youtube,
  Check,
  Video
} from 'lucide-react';
import { parseVideoUrl } from '../../utils/videoUtils';

export const ProjectModal: React.FC = () => {
  const {
    selectedProject,
    setSelectedProject,
    isEditMode,
    openAdminModal,
    openImagePicker,
    updateProject,
  } = usePortfolio();

  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [showVideoInput, setShowVideoInput] = useState(false);

  if (!selectedProject) return null;

  const parsedVideo = selectedProject.videoUrl ? parseVideoUrl(selectedProject.videoUrl) : null;

  const handleApplyVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVideoUrl.trim()) return;

    const parsed = parseVideoUrl(customVideoUrl.trim());
    const newThumbnail = parsed.videoId
      ? `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`
      : selectedProject.thumbnailUrl;

    const updated = {
      ...selectedProject,
      videoUrl: customVideoUrl.trim(),
      thumbnailUrl: newThumbnail,
      category: 'Video Editing' as const,
    };

    updateProject(selectedProject.id, updated);
    setSelectedProject(updated);
    setCustomVideoUrl('');
    setShowVideoInput(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col z-10 text-neutral-100 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:px-6 border-b border-neutral-800 bg-neutral-950/60">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {selectedProject.category}
              </span>
              {selectedProject.subCategory && (
                <span className="text-xs text-neutral-400 hidden sm:inline">
                  • {selectedProject.subCategory}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => {
                    openAdminModal('projects');
                    setSelectedProject(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded-xl border border-indigo-500/30 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit in CMS</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Media Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Visual Media Showcase */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 aspect-video shadow-inner flex items-center justify-center">
              {parsedVideo && parsedVideo.embedUrl ? (
                parsedVideo.isDirect ? (
                  <video
                    src={parsedVideo.embedUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={`${parsedVideo.embedUrl}${parsedVideo.embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                    title={selectedProject.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <img
                  src={selectedProject.thumbnailUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}

              {isEditMode && (
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomVideoUrl(selectedProject.videoUrl || '');
                      setShowVideoInput((prev) => !prev);
                    }}
                    className="px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold rounded-xl border border-red-400 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>{selectedProject.videoUrl ? 'Change Video Link' : 'Set YouTube Video'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openImagePicker(
                        `Change ${selectedProject.title} Image`,
                        selectedProject.thumbnailUrl,
                        (url) => {
                          updateProject(selectedProject.id, { thumbnailUrl: url });
                          setSelectedProject({ ...selectedProject, thumbnailUrl: url });
                        }
                      )
                    }
                    className="px-3 py-1.5 bg-black/80 hover:bg-black text-white text-xs font-semibold rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Change Cover</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Video URL Input Form in Edit Mode */}
            {isEditMode && showVideoInput && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleApplyVideoUrl}
                className="p-3.5 rounded-2xl bg-neutral-950 border border-red-500/30 space-y-2 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                    <Youtube className="w-4 h-4" />
                    <span>Paste YouTube / Video Link</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowVideoInput(false)}
                    className="text-neutral-500 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customVideoUrl}
                    onChange={(e) => setCustomVideoUrl(e.target.value)}
                    placeholder="https://youtu.be/... or https://www.youtube.com/watch?v=..."
                    className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 font-mono"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply</span>
                  </button>
                </div>
              </motion.form>
            )}

            {/* Title & Metadata */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                {selectedProject.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                {selectedProject.clientName && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Client: <strong className="text-neutral-200">{selectedProject.clientName}</strong></span>
                  </div>
                )}
                {selectedProject.projectDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Year: <strong className="text-neutral-200">{selectedProject.projectDate}</strong></span>
                  </div>
                )}
              </div>

              <div className="h-px w-full bg-neutral-800" />

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Project Overview</h4>
                <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {/* Software Used */}
              {selectedProject.softwareUsed && (selectedProject.softwareUsed || []).length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Software & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProject.softwareUsed || []).map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Action */}
          {selectedProject.demoUrl && (
            <div className="p-4 sm:px-6 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-end">
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-950/50 transition-all"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
