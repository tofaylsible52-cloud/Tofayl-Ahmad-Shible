/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Image as ImageIcon,
  Youtube,
  Video,
  Upload,
  ExternalLink,
  Check,
  Sparkles,
  Link as LinkIcon,
  HelpCircle
} from 'lucide-react';
import { parseVideoUrl } from '../../utils/videoUtils';
import { normalizeImageUrl, isPostimagesPageUrl, isImgbbPageUrl, autoResolveImageUrl } from '../../utils/imageUtils';
import { PortfolioProject } from '../../types';

interface MediaLinkModalProps {
  isOpen: boolean;
  project: PortfolioProject | null;
  onClose: () => void;
  onSave: (updated: {
    videoUrl?: string;
    thumbnailUrl?: string;
    title?: string;
    category?: 'Video Editing' | 'Graphic Design';
    subCategory?: string;
  }) => void;
}

export const MediaLinkModal: React.FC<MediaLinkModalProps> = ({
  isOpen,
  project,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Graphic Design' | 'Video Editing'>('Graphic Design');
  const [imageError, setImageError] = useState(false);
  const [isResolvingImage, setIsResolvingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resolve image url if postimages or ibb page URL is given
  const handleImageUrlChange = async (val: string) => {
    const normalized = normalizeImageUrl(val);
    setImageUrl(normalized);
    setImageError(false);

    if (isPostimagesPageUrl(normalized) || isImgbbPageUrl(normalized)) {
      setIsResolvingImage(true);
      try {
        const resolved = await autoResolveImageUrl(normalized);
        if (resolved && resolved !== normalized) {
          setImageUrl(resolved);
          setImageError(false);
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setIsResolvingImage(false);
      }
    }
  };

  useEffect(() => {
    if (project) {
      setImageUrl(project.thumbnailUrl || '');
      setVideoUrl(project.videoUrl || '');
      setTitle(project.title || '');
      setCategory(project.category);
      // Auto select tab based on project category or existence of video
      if (project.category === 'Video Editing' || project.videoUrl) {
        setActiveTab('video');
      } else {
        setActiveTab('image');
      }
      setImageError(false);
    }
  }, [project, isOpen]);

  if (!isOpen || !project) return null;

  const parsedVideo = videoUrl ? parseVideoUrl(videoUrl) : null;
  const hasValidVideo = Boolean(parsedVideo && parsedVideo.embedUrl);
  const ytThumbnail = parsedVideo?.videoId
    ? `https://img.youtube.com/vi/${parsedVideo.videoId}/hqdefault.jpg`
    : '';

  // Local File selection (converts to base64 Data URL so it persists permanently in browser)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Image size is too large (max 8MB). Please choose a compressed image or use Postimages/ImgBB direct link.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImageUrl(base64);
      setImageError(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'image') {
      onSave({
        thumbnailUrl: imageUrl.trim() || project.thumbnailUrl,
        title: title.trim() || project.title,
        category: 'Graphic Design',
        videoUrl: '', // remove video if switching to pure image graphic
      });
    } else {
      onSave({
        videoUrl: videoUrl.trim(),
        thumbnailUrl: ytThumbnail || imageUrl.trim() || project.thumbnailUrl,
        title: title.trim() || project.title,
        category: 'Video Editing',
      });
    }

    onClose();
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
          className="relative w-full max-w-xl rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl p-5 sm:p-7 z-10 text-neutral-100 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Media Linker & Image Manager</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Update images via Postimages / ImgBB or link YouTube videos
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

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-950 rounded-2xl border border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab('image')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'image'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photo / Image Link</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube Video Link</span>
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* TAB 1: Photo / Graphic Direct Image Link */}
            {activeTab === 'image' && (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Direct Image Link (Postimages / ImgBB / Drive / Direct URL)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload from Device</span>
                    </button>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      placeholder="e.g. https://postimg.cc/... or https://i.postimg.cc/... or Google Drive / ImgBB"
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    {isResolvingImage && (
                      <div className="absolute right-3 top-2.5 flex items-center gap-1.5 text-xs text-indigo-400 bg-neutral-900 px-2 py-0.5 rounded-md border border-neutral-700">
                        <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                        <span>Resolving Direct Image...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Postimages Page Link Warning / Helper */}
                {isPostimagesPageUrl(imageUrl) && (
                  <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-500/50 space-y-2 text-xs text-amber-200">
                    <div className="font-bold flex items-center gap-1.5 text-amber-300">
                      <span>⚠️ আপনি Postimages এর Webpage লিংক দিয়েছেন (`postimg.cc/..`)</span>
                    </div>
                    <p className="text-[11px] text-amber-200/90 leading-relaxed">
                      ছবিটি যাতে সরাসরি প্রদর্শিত হতে পারে, সেজন্য Postimages পেইজ থেকে <strong>"Direct link"</strong> (যা সাধারণত <code>https://i.postimg.cc/...</code> দিয়ে শুরু হয়) কপি করে এখানে পেস্ট করুন।
                    </p>
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>বা সরাসরি ডিভাইস থেকে ছবি সিলেক্ট করুন</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Free Permanent Image Host Recommendations */}
                <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Recommended Permanent Free Image Hosts & Upload:</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>📁 Upload File from Computer / Mobile</span>
                    </button>
                    <a
                      href="https://postimages.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 hover:text-white text-[11px] font-medium flex items-center gap-1 hover:bg-indigo-900/60 transition-colors cursor-pointer"
                    >
                      <span>Postimages.org</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <a
                      href="https://imgbb.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white text-[11px] font-medium flex items-center gap-1 hover:bg-purple-900/60 transition-colors cursor-pointer"
                    >
                      <span>ImgBB.com</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-tight">
                    💡 <strong>নিয়ম:</strong> Postimages বা ImgBB-তে ছবি আপলোড করার পর <strong>"Direct link"</strong> (সরাসরি লিংক) কপি করে পেস্ট করুন। অথবা সরাসরি <strong>"Upload File"</strong> চেপে ছবি বেছে নিন।
                  </p>
                </div>

                {/* Image Live Preview */}
                {imageUrl && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-neutral-400">Live Image Preview:</span>
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-neutral-800 flex items-center justify-center">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        onError={() => setImageError(true)}
                        onLoad={() => setImageError(false)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                      {imageError && (
                        <div className="absolute inset-0 bg-neutral-950/95 flex flex-col items-center justify-center p-4 text-center text-xs space-y-2">
                          <span className="text-rose-400 font-semibold">Could not load direct image from this URL.</span>
                          <p className="text-[11px] text-neutral-300 max-w-sm">
                            Make sure you copied the <strong>"Direct link"</strong> (starts with <code>i.postimg.cc</code> or ends in .jpg/.png), or simply click below to upload directly from your device:
                          </p>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image from Device</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: YouTube / Video URL Link */}
            {activeTab === 'video' && (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-red-400" />
                    <span>YouTube Video / Shorts / Reel URL</span>
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="e.g. https://youtu.be/... or https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 font-mono"
                  />
                  <p className="text-[11px] text-neutral-500">
                    Supports YouTube videos, YouTube Shorts, Vimeo, or direct MP4 links.
                  </p>
                </div>

                {/* Video Live Preview */}
                {hasValidVideo && (
                  <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Video Verified
                      </span>
                      <span className="text-[10px] uppercase text-neutral-400">{parsedVideo?.platform}</span>
                    </div>

                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-neutral-800">
                      {ytThumbnail ? (
                        <img
                          src={ytThumbnail}
                          alt="Thumbnail Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                          Video Ready
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Project Title Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Brand Logo Design / Motion Ad"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-950/50 transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Project Media</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
