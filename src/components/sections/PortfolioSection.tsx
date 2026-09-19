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
  Youtube
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

  const filteredProjects = projectList.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const renderProjectCard = (project: PortfolioProject) => (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-indigo-500/50 shadow-md hover:shadow-indigo-500/10 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 theme-card-glow"
    >
      {/* Thumbnail / Media Window */}
      <div
        onClick={() => setSelectedProject(project)}
        className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950 cursor-pointer"
      >
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />

        {/* Category Pill */}
        <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
          <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-wider text-indigo-300 shadow">
            {project.category === 'Graphic Design' ? 'Graphics' : 'Video'}
          </span>
          {project.videoUrl && (
            <span className="px-1.5 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-bold flex items-center gap-1 shadow">
              <Youtube className="w-2.5 h-2.5" />
              <span>Video</span>
            </span>
          )}
        </div>

        {/* Hover Play/View Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
              title="Add Image or Video Link"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Links</span>
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

        {/* Software tags & detail CTA */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-1">
          <div className="flex flex-wrap gap-1 overflow-hidden max-h-4">
            {(project.softwareUsed || []).slice(0, 2).map((tool, idx) => (
              <span
                key={idx}
                className="px-1 py-0.2 rounded bg-neutral-800/80 text-[8px] text-neutral-300 font-medium border border-neutral-700/60"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMediaLinkModal({
                  isOpen: true,
                  project,
                });
              }}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-0.5 cursor-pointer px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30"
              title="Change YouTube or Photo Link"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Link</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedProject(project)}
              className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-0.5 cursor-pointer"
            >
              <span>View</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
            <div className="space-y-12">
              {/* Row 1: Graphic Design (Top 4) */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                    <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-wide">
                      Graphic Design Portfolio
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
                      {graphicProjects.length} Projects
                    </span>
                  </div>
                  {graphicProjects.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory('Graphic Design')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>View All Graphic Designs</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {graphicProjects.slice(0, 4).map((project) => renderProjectCard(project))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Row 2: Video Editing (Bottom 4) */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                    <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-wide">
                      Video Editing Portfolio
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold border border-red-500/20">
                      {videoProjects.length} Videos
                    </span>
                  </div>
                  {videoProjects.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory('Video Editing')}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>View All Videos</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatePresence>
                    {videoProjects.slice(0, 4).map((project) => renderProjectCard(project))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            /* Specific Category Tab: All projects of that category in 4-column grid */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeCategory === 'Video Editing' ? 'bg-red-500' : 'bg-indigo-500'}`} />
                  <h3 className="text-base sm:text-lg font-bold font-display text-white">
                    {activeCategory} Projects
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-700">
                    {filteredProjects.length} Total
                  </span>
                </div>
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
