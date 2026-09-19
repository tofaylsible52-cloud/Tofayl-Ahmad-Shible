/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Video,
  Heart,
  MessageSquare,
  Download,
  Eye,
  Send,
  Sparkles
} from 'lucide-react';
import { parseVideoUrl } from '../../utils/videoUtils';

export const ProjectModal: React.FC = () => {
  const {
    data,
    selectedProject,
    setSelectedProject,
    isEditMode,
    language,
    openAdminModal,
    openImagePicker,
    updateProject,
    likeProject,
    addProjectComment,
    incrementProjectView,
  } = usePortfolio();

  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // Sync with live context project
  const currentProject = selectedProject
    ? data.projects.find((p) => p.id === selectedProject.id) || selectedProject
    : null;

  // Track project view once on modal open
  useEffect(() => {
    if (selectedProject?.id) {
      incrementProjectView(selectedProject.id);
    }
  }, [selectedProject?.id, incrementProjectView]);

  if (!selectedProject || !currentProject) return null;

  const isGraphic = currentProject.category === 'Graphic Design';
  const parsedVideo = currentProject.videoUrl ? parseVideoUrl(currentProject.videoUrl) : null;

  const handleApplyVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVideoUrl.trim()) return;

    const parsed = parseVideoUrl(customVideoUrl.trim());
    const newThumbnail = parsed.videoId
      ? `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`
      : currentProject.thumbnailUrl;

    const updated = {
      ...currentProject,
      videoUrl: customVideoUrl.trim(),
      thumbnailUrl: newThumbnail,
      category: 'Video Editing' as const,
    };

    updateProject(currentProject.id, updated);
    setSelectedProject(updated);
    setCustomVideoUrl('');
    setShowVideoInput(false);
  };

  const handleDownloadImage = async () => {
    if (!currentProject.thumbnailUrl) return;
    setIsDownloading(true);
    try {
      const response = await fetch(currentProject.thumbnailUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const cleanName = currentProject.title.replace(/[^a-zA-Z0-9_-]/g, '_');
      link.download = `${cleanName || 'project_design'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // Direct opening if cross-origin blocked
      const link = document.createElement('a');
      link.href = currentProject.thumbnailUrl;
      link.target = '_blank';
      link.download = `${currentProject.title}.jpg`;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addProjectComment(currentProject.id, commentName, commentText);
    setCommentText('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col z-10 text-neutral-100 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 sm:px-6 border-b border-neutral-800 bg-neutral-950/80">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {currentProject.category}
              </span>
              {currentProject.subCategory && (
                <span className="text-xs text-neutral-400 hidden sm:inline">
                  • {currentProject.subCategory}
                </span>
              )}
              {/* Admin-only Project Views indicator */}
              {isEditMode && (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                  <Eye className="w-3 h-3 text-amber-400" />
                  <span>{currentProject.viewsCount || 0} Views (Admin Only)</span>
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
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded-xl border border-indigo-500/30 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CMS</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Media Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Visual Media Showcase - 100% Full Uncropped View */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex items-center justify-center min-h-[260px]">
              {parsedVideo && parsedVideo.embedUrl ? (
                <div className="relative aspect-video w-full">
                  {parsedVideo.isDirect ? (
                    <video
                      src={parsedVideo.embedUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={`${parsedVideo.embedUrl}${parsedVideo.embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                      title={currentProject.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              ) : (
                <div className="relative w-full max-h-[72vh] flex items-center justify-center p-2 sm:p-4 overflow-hidden group">
                  {/* Subtle Ambient Backdrop */}
                  <img
                    src={currentProject.thumbnailUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 pointer-events-none"
                  />
                  {/* 100% Uncropped Graphic / Poster */}
                  <img
                    src={currentProject.thumbnailUrl}
                    alt={currentProject.title}
                    referrerPolicy="no-referrer"
                    className="relative z-0 max-h-[68vh] max-w-full w-auto object-contain rounded-xl shadow-2xl transition-transform hover:scale-[1.01]"
                  />
                </div>
              )}

              {isEditMode && (
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomVideoUrl(currentProject.videoUrl || '');
                      setShowVideoInput((prev) => !prev);
                    }}
                    className="px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold rounded-xl border border-red-400 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>{currentProject.videoUrl ? 'Change Video' : 'Add Video'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openImagePicker(
                        `Change ${currentProject.title} Image`,
                        currentProject.thumbnailUrl,
                        (url) => {
                          updateProject(currentProject.id, { thumbnailUrl: url });
                          setSelectedProject({ ...currentProject, thumbnailUrl: url });
                        }
                      )
                    }
                    className="px-3 py-1.5 bg-black/80 hover:bg-black text-white text-xs font-semibold rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Change Image</span>
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
                    className="text-neutral-500 hover:text-white text-xs cursor-pointer"
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

            {/* Interactive Action Bar: Like, Download, & Socials */}
            <div className="p-3 sm:p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-wrap items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Love React Button */}
                <button
                  type="button"
                  onClick={() => likeProject(currentProject.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer group"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 group-hover:scale-125 transition-transform" />
                  <span>{language === 'bn' ? 'লাভ রিঅ্যাক্ট' : 'Love'} ({currentProject.likesCount || 0})</span>
                </button>

                {/* Comment Counter Indicator */}
                <a
                  href="#project-comments"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>{(currentProject.comments || []).length} {language === 'bn' ? 'মন্তব্য' : 'Comments'}</span>
                </a>
              </div>

              {/* Download Image Button */}
              {currentProject.thumbnailUrl && (
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-950/60 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  title="Download High-Resolution Image"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? (language === 'bn' ? 'ডাউনলোড হচ্ছে...' : 'Downloading...') : (language === 'bn' ? 'ছবি ডাউনলোড করুন (HD)' : 'Download Image (HD)')}</span>
                </button>
              )}
            </div>

            {/* Title & Metadata */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                {currentProject.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                {currentProject.clientName && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Client: <strong className="text-neutral-200">{currentProject.clientName}</strong></span>
                  </div>
                )}
                {currentProject.projectDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Year: <strong className="text-neutral-200">{currentProject.projectDate}</strong></span>
                  </div>
                )}
              </div>

              <div className="h-px w-full bg-neutral-800" />

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Project Overview</h4>
                <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                  {currentProject.description}
                </p>
              </div>

              {/* Software Used */}
              {currentProject.softwareUsed && (currentProject.softwareUsed || []).length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Software & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {(currentProject.softwareUsed || []).map((tool, idx) => (
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

            {/* Public Comments Section */}
            <div id="project-comments" className="pt-6 border-t border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm sm:text-base font-bold text-white font-display">
                    {language === 'bn' ? 'মন্তব্য ও ফিডব্যাক' : 'Comments & Feedback'}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-xs font-semibold">
                    {(currentProject.comments || []).length}
                  </span>
                </div>
              </div>

              {/* Comment Input Form */}
              <form onSubmit={handleSubmitComment} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <input
                      type="text"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder={language === 'bn' ? 'আপনার নাম' : 'Your Name (optional)'}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={language === 'bn' ? 'আপনার মন্তব্য লিখুন...' : 'Write a comment or feedback...'}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow cursor-pointer transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'মন্তব্য পোস্ট করুন' : 'Post Comment'}</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {(currentProject.comments || []).length === 0 ? (
                  <div className="text-center py-6 text-neutral-500 text-xs">
                    {language === 'bn' ? 'এখনও কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনি করুন!' : 'No comments yet. Be the first to leave feedback!'}
                  </div>
                ) : (
                  (currentProject.comments || []).map((com) => (
                    <div
                      key={com.id}
                      className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-500/20">
                        {com.authorName.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white truncate">{com.authorName}</span>
                          <span className="text-[10px] text-neutral-500 shrink-0">{com.createdAt}</span>
                        </div>
                        <p className="text-xs text-neutral-300 break-words leading-relaxed">{com.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          {currentProject.demoUrl && (
            <div className="p-4 sm:px-6 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-end">
              <a
                href={currentProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-950/50 transition-all cursor-pointer"
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
