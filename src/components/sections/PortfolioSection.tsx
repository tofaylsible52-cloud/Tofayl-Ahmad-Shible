/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderKanban,
  Play,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  ImageIcon,
  Eye,
  Film,
  Sparkles,
  Layers,
  Video,
  Youtube,
  Heart,
  MessageSquare
} from 'lucide-react';
import { PortfolioProject } from '../../types';
import { InlineEditField } from '../common/InlineEditField';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { MediaLinkModal } from '../modals/MediaLinkModal';

export const PortfolioSection: React.FC = () => {
  const {
    data,
    language,
    t,
    isEditMode,
    addProject,
    updateProject,
    deleteProject,
    setSelectedProject,
    openImagePicker,
    openAdminModal,
    likeProject,
  } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<'All' | 'Graphic Design' | 'Video Editing'>('All');
  const [mediaLinkModal, setMediaLinkModal] = useState<{
    isOpen: boolean;
    project: PortfolioProject | null;
  }>({
    isOpen: false,
    project: null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    projectId: string;
    projectTitle: string;
  }>({
    isOpen: false,
    projectId: '',
    projectTitle: '',
  });

  const projectList = data.projects || [];
  const graphicProjects = projectList.filter((p) => p.category === 'Graphic Design');
  const videoProjects = projectList.filter((p) => p.category === 'Video Editing');

  // Top 4 Pinned Graphic Projects sorted by pinOrder or index
  const pinnedGraphicProjects = [...graphicProjects]
    .sort((a, b) => {
      const aPinned = a.isPinned !== false ? 1 : 0;
      const bPinned = b.isPinned !== false ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;
      return (a.pinOrder || 99) - (b.pinOrder || 99);
    })
    .slice(0, 4);

  // Top 4 Pinned Video Projects sorted by pinOrder or index
  const pinnedVideoProjects = [...videoProjects]
    .sort((a, b) => {
      const aPinned = a.isPinned !== false ? 1 : 0;
      const bPinned = b.isPinned !== false ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;
      return (a.pinOrder || 99) - (b.pinOrder || 99);
    })
    .slice(0, 4);

  const filteredProjects = projectList.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const renderProjectCard = (project: PortfolioProject, isPinnedSlot?: boolean, slotNumber?: number) => {
    const isGraphic = project.category === 'Graphic Design';

    return (
      <motion.div
        key={project.id}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="group relative rounded-2xl bg-neutral-900/95 border border-neutral-800 hover:border-indigo-500/50 shadow-md hover:shadow-indigo-500/10 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 theme-card-glow"
      >
        {/* Thumbnail / Media Window - 100% Uncropped with ambient backdrop */}
        <div
          onClick={() => setSelectedProject(project)}
          className={`relative ${
            isGraphic ? 'aspect-[4/5] sm:aspect-square' : 'aspect-video'
          } w-full overflow-hidden bg-neutral-950 cursor-pointer flex items-center justify-center`}
        >
          {/* Ambient blurred backdrop to look ultra sleek */}
          <img
            src={project.thumbnailUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-110 pointer-events-none"
          />

          {/* Full uncropped image display */}
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className={`relative z-0 ${
              isGraphic
                ? 'max-h-full max-w-full object-contain p-1.5'
                : 'w-full h-full object-cover'
            } group-hover:scale-105 transition-transform duration-500`}
          />

          {/* Subtle bottom shadow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Category & Pin Indicator Pill */}
          <div className="absolute top-2 left-2 flex items-center gap-1 z-10 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-wider text-indigo-300 shadow">
              {project.category === 'Graphic Design' ? 'Graphics' : 'Video'}
            </span>
            {isPinnedSlot && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[9px] font-extrabold flex items-center gap-1 shadow">
                <Sparkles className="w-2.5 h-2.5" />
                <span>PIN #{slotNumber || project.pinOrder || 1}</span>
              </span>
            )}
            {project.videoUrl && (
              <span className="px-1.5 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-bold flex items-center gap-1 shadow">
                <Youtube className="w-2.5 h-2.5" />
                <span>Video</span>
              </span>
            )}
          </div>

          {/* Hover Play/View Indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg scale-75 group-hover:scale-100 transition-transform">
              {project.category === 'Video Editing' || project.videoUrl ? (
                <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
            </div>
          </div>

          {/* Quick Edit triggers in edit mode */}
          {isEditMode && (
            <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMediaLinkModal({
                    isOpen: true,
                    project,
                  });
                }}
                className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-lg border border-indigo-400 shadow-md flex items-center gap-1 transition-all cursor-pointer"
                title="Add Image or Video Link / Pin Slot"
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>Edit / Pin</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteConfirm({
                    isOpen: true,
                    projectId: project.id,
                    projectTitle: project.title,
                  });
                }}
                className="p-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg border border-rose-800/40 shadow cursor-pointer"
                title="Delete project"
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9px] text-neutral-400">
              <span className="truncate max-w-[65%] font-medium">
                <InlineEditField
                  value={project.clientName}
                  placeholder="Client"
                  onSave={(val) => updateProject(project.id, { clientName: val })}
                />
              </span>
              <span>{project.projectDate || '2025'}</span>
            </div>

            <h3
              onClick={() => setSelectedProject(project)}
              className="text-xs sm:text-sm font-bold font-display text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
            >
              <InlineEditField
                value={project.title}
                placeholder="Project Title"
                onSave={(val) => updateProject(project.id, { title: val })}
              />
            </h3>

            <p className="text-[10px] text-neutral-400 line-clamp-1 leading-snug">
              <InlineEditField
                value={project.description}
                placeholder="Description..."
                onSave={(val) => updateProject(project.id, { description: val })}
              />
            </p>
          </div>

          {/* Social Engagement Actions: Like, Comment, and Admin-only Views */}
          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-1 flex-wrap">
            <div className="flex items-center gap-1.5">
              {/* Like / Love React */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  likeProject(project.id);
                }}
                className="flex items-center gap-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 px-2 py-0.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 transition-all cursor-pointer shadow-sm active:scale-95"
                title="Love React"
              >
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                <span>{project.likesCount || 0}</span>
              </button>

              {/* Comment trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
                className="flex items-center gap-1 text-[10px] font-semibold text-neutral-300 hover:text-white px-2 py-0.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 transition-all cursor-pointer shadow-sm"
                title="Comments"
              >
                <MessageSquare className="w-3 h-3 text-indigo-400" />
                <span>{(project.comments || []).length}</span>
              </button>

              {/* Admin Only Views Count */}
              {isEditMode && (
                <span
                  className="flex items-center gap-1 text-[9px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-1.5 py-0.5 rounded-lg"
                  title="Project Views (Visible ONLY to Admin)"
                >
                  <Eye className="w-2.5 h-2.5 text-amber-400" />
                  <span>{project.viewsCount || 0} views</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-0.5 cursor-pointer px-2 py-0.5 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-500/30"
              >
                <span>View</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <ConfirmationModal
        isOpen={deleteConfirm.isOpen}
        title={`Delete "${deleteConfirm.projectTitle}"?`}
        message="Are you sure you want to delete this project from your portfolio? This action cannot be undone."
        confirmText="Delete Project"
        isDangerous={true}
        onConfirm={() => {
          deleteProject(deleteConfirm.projectId);
          setDeleteConfirm({ isOpen: false, projectId: '', projectTitle: '' });
        }}
        onCancel={() => setDeleteConfirm({ isOpen: false, projectId: '', projectTitle: '' })}
      />

      <MediaLinkModal
        isOpen={mediaLinkModal.isOpen}
        project={mediaLinkModal.project}
        onClose={() => setMediaLinkModal({ isOpen: false, project: null })}
        onSave={(updated) => {
          if (mediaLinkModal.project) {
            updateProject(mediaLinkModal.project.id, updated);
          }
        }}
      />

      <section id="portfolio" className="py-24 bg-neutral-950 relative border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                <FolderKanban className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ক্রিয়েটিভ শোকেস' : 'Creative Showcase'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                {language === 'bn' ? 'পোর্টফোলিও প্রোজেক্টসমূহ' : 'Featured Portfolio Projects'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-400">
                {language === 'bn'
                  ? 'ভিডিও এডিটিং, মোশন গ্রাফিক্স, ইউটিউব কনটেন্ট এবং গ্রাফিক্স ডিজাইন কাজের নমুনা।'
                  : 'Explore client collaborations, YouTube edits, short-form reels, and brand design packages.'}
              </p>
            </div>

            {/* Filter Tabs & Add Button */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Behance Link Badge */}
              <a
                href="https://www.behance.net/tofayelshible"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md hover:shadow-indigo-500/25 transition-all cursor-pointer"
              >
                <span>Behance Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex p-1 bg-neutral-900 rounded-2xl border border-neutral-800">
                {(['All', 'Graphic Design', 'Video Editing'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeCategory === cat
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {language === 'bn'
                      ? cat === 'All'
                        ? 'সকল'
                        : cat === 'Graphic Design'
                        ? 'গ্রাফিক্স ডিজাইন'
                        : 'ভিডিও এডিটিং'
                      : cat}
                  </button>
                ))}
              </div>

              {/* Quick Add Media Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const newId = `proj-${Date.now()}`;
                    const emptyProj: PortfolioProject = {
                      id: newId,
                      title: 'New Video Project',
                      category: 'Video Editing',
                      subCategory: 'YouTube Video',
                      thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=900&q=80',
                      description: 'Enter your video description here.',
                      clientName: 'Tofayel Ahmad Shible',
                      softwareUsed: ['Premiere Pro', 'CapCut'],
                      featured: true,
                      projectDate: '2025',
                      aspectRatio: '16:9',
                    };
                    addProject(emptyProj);
                    setMediaLinkModal({
                      isOpen: true,
                      project: { ...emptyProj, id: newId },
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all cursor-pointer"
                  title="Paste YouTube Video or Shorts URL"
                >
                  <Youtube className="w-4 h-4" />
                  <span>{language === 'bn' ? '+ ভিডিও লিংক যোগ' : '+ Add YouTube Video'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const newId = `proj-${Date.now()}`;
                    const emptyGraphicProj: PortfolioProject = {
                      id: newId,
                      title: 'New Graphic Project',
                      category: 'Graphic Design',
                      subCategory: 'Showcase',
                      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
                      description: 'Enter your project description with details on technique, client goals, and software used.',
                      clientName: 'Tofayel Ahmad Shible',
                      softwareUsed: ['Photoshop', 'Illustrator'],
                      featured: true,
                      projectDate: '2025',
                      aspectRatio: '16:9',
                    };
                    addProject(emptyGraphicProj);
                    setMediaLinkModal({
                      isOpen: true,
                      project: { ...emptyGraphicProj, id: newId },
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all cursor-pointer"
                  title="Paste Postimages / ImgBB / Image link or upload"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'bn' ? '+ ফটো / ইমেজ যোগ' : '+ Add Image / Graphic'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Projects Display */}
          {activeCategory === 'All' ? (
            <div className="space-y-16">
              {/* Row 1: Graphic Design Top 4 Pinned Section */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800/80 pb-3 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                    <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-wide">
                      {language === 'bn' ? 'গ্রাফিক্স ডিজাইন পোর্টফোলিও (টপ ৪ পিন্ড)' : 'Graphic Design Portfolio'}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
                      Top 4 Pinned
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('Graphic Design')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-950/40 hover:bg-indigo-950/80 border border-indigo-500/30 transition-all cursor-pointer w-fit"
                  >
                    <span>{language === 'bn' ? 'সবগুলো গ্রাফিক্স প্রজেক্ট দেখুন' : 'See All Graphic Designs'}</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-indigo-600 text-white rounded-full">({graphicProjects.length})</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {pinnedGraphicProjects.map((project, idx) => renderProjectCard(project, true, idx + 1))}
                  </AnimatePresence>
                </div>

                {/* Direct 'See All' Action Bar below Graphic Design 4-cards */}
                <div className="pt-2 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('Graphic Design')}
                    className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-neutral-900 hover:bg-indigo-600/20 text-neutral-300 hover:text-white border border-neutral-800 hover:border-indigo-500/50 text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'আরও সকল গ্রাফিক্স ডিজাইন প্রজেক্ট দেখুন' : 'See All Graphic Design Projects'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-800 group-hover:bg-indigo-600 text-white text-xs">
                      {graphicProjects.length}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Row 2: Video Editing Top 4 Pinned Section */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800/80 pb-3 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                    <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-wide">
                      {language === 'bn' ? 'ভিডিও এডিটিং পোর্টফোলিও (টপ ৪ পিন্ড)' : 'Video Editing Portfolio'}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold border border-red-500/20">
                      Top 4 Pinned
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('Video Editing')}
                    className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-950/40 hover:bg-red-950/80 border border-red-500/30 transition-all cursor-pointer w-fit"
                  >
                    <span>{language === 'bn' ? 'সবগুলো ভিডিও প্রজেক্ট দেখুন' : 'See All Videos'}</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-red-600 text-white rounded-full">({videoProjects.length})</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {pinnedVideoProjects.map((project, idx) => renderProjectCard(project, true, idx + 1))}
                  </AnimatePresence>
                </div>

                {/* Direct 'See All' Action Bar below Video Editing 4-cards */}
                <div className="pt-2 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('Video Editing')}
                    className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-neutral-900 hover:bg-red-600/20 text-neutral-300 hover:text-white border border-neutral-800 hover:border-red-500/50 text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'আরও সকল ভিডিও এডিটিং কাজ দেখুন' : 'See All Video Projects'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-800 group-hover:bg-red-600 text-white text-xs">
                      {videoProjects.length}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Specific Category Tab: All projects of that category in full grid */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800/80 pb-3 gap-3">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeCategory === 'Video Editing' ? 'bg-red-500' : 'bg-indigo-500'}`} />
                  <h3 className="text-base sm:text-lg font-bold font-display text-white">
                    {activeCategory} — {language === 'bn' ? 'সকল প্রজেক্ট গ্যালারি' : 'Full Gallery'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-700">
                    {filteredProjects.length} Total
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCategory('All')}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-semibold px-3 py-1 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 cursor-pointer w-fit"
                >
                  <span>← {language === 'bn' ? 'হোমপেজ টপ ৪ ভিউতে ফিরুন' : 'Back to Main Overview'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <AnimatePresence>
                  {filteredProjects.map((project) => renderProjectCard(project))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-neutral-900/50 border border-neutral-800 space-y-3">
              <p className="text-sm text-neutral-400">No projects found in this category.</p>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => openAdminModal('projects')}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
                >
                  Open CMS to Add Projects
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
