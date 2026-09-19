/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Film,
  FolderKanban,
  Briefcase,
  Layers,
  GraduationCap,
  MessageSquareQuote,
  Send,
  Settings,
  Plus,
  Trash2,
  Image as ImageIcon,
  Edit2,
  Check,
  Download,
  Upload,
  RotateCcw,
  Save,
  Sparkles
} from 'lucide-react';
import { PortfolioProject, ServiceItem, SoftwareSkill, TechnicalSkill, EducationItem, TrainingItem, TestimonialItem, SocialLink } from '../../types';
import { ConfirmationModal } from '../common/ConfirmationModal';

export const AdminEditModal: React.FC = () => {
  const {
    data,
    isAdminModalOpen,
    closeAdminModal,
    adminActiveTab,
    openAdminModal,
    updatePersonal,
    updateContact,
    updateDemoReel,
    updateSiteConfig,
    updateResumeData,
    addProject,
    updateProject,
    deleteProject,
    addVideoService,
    updateVideoService,
    deleteVideoService,
    addGraphicService,
    updateGraphicService,
    deleteGraphicService,
    addSoftwareSkill,
    updateSoftwareSkill,
    deleteSoftwareSkill,
    addTechnicalSkill,
    updateTechnicalSkill,
    deleteTechnicalSkill,
    addEducation,
    updateEducation,
    deleteEducation,
    addTraining,
    updateTraining,
    deleteTraining,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    openImagePicker,
    saveChanges,
    resetToDefault,
    exportDataAsJSON,
    importDataFromJSON,
    showNotification,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState(adminActiveTab || 'personal');
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Sync tab with context trigger
  React.useEffect(() => {
    if (adminActiveTab) {
      setActiveTab(adminActiveTab);
    }
  }, [adminActiveTab]);

  if (!isAdminModalOpen) return null;

  const tabs = [
    { id: 'personal', label: 'Personal & Hero', icon: User },
    { id: 'demoreel', label: 'Demo Reel', icon: Film },
    { id: 'projects', label: 'Portfolio Projects', icon: FolderKanban },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'skills', label: 'Software & Skills', icon: Layers },
    { id: 'resume', label: 'Resume & Training', icon: GraduationCap },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'contact', label: 'Contact & Socials', icon: Send },
    { id: 'settings', label: 'Site Config & Backup', icon: Settings },
  ];

  return (
    <>
      <ConfirmationModal
        isOpen={deleteConfirm.isOpen}
        title={deleteConfirm.title}
        message={deleteConfirm.message}
        confirmText="Delete Item"
        isDangerous={true}
        onConfirm={() => {
          deleteConfirm.onConfirm();
          setDeleteConfirm({ isOpen: false, title: '', message: '', onConfirm: () => {} });
        }}
        onCancel={() => setDeleteConfirm({ isOpen: false, title: '', message: '', onConfirm: () => {} })}
      />

      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAdminModal}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-5xl h-[90vh] rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col z-10 text-neutral-100 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-display text-white">Portfolio Content Manager (CMS)</h2>
                  <p className="text-xs text-neutral-400">Edit, add, customize, and manage all your portfolio data in real-time</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    saveChanges();
                    closeAdminModal();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Close</span>
                </button>
                <button
                  type="button"
                  onClick={closeAdminModal}
                  className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body with Sidebar navigation and Content Area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-48 sm:w-60 border-r border-neutral-800 bg-neutral-950/40 p-3 overflow-y-auto space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                        isActive
                          ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-950/50'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Panels */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-900/60">
                {/* 1. PERSONAL & HERO */}
                {activeTab === 'personal' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Personal Profile & Hero Section</h3>
                      <p className="text-xs text-neutral-400">Configure your primary name, titles, bio, and hero presentation.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          value={data.personal.name}
                          onChange={(e) => updatePersonal({ name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Short Name (for Navbar/Logo)</label>
                        <input
                          type="text"
                          value={data.personal.shortName}
                          onChange={(e) => updatePersonal({ shortName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Professional Title</label>
                        <input
                          type="text"
                          value={data.personal.title}
                          onChange={(e) => updatePersonal({ title: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Hero Short Introduction</label>
                        <textarea
                          rows={2}
                          value={data.personal.shortBio}
                          onChange={(e) => updatePersonal({ shortBio: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Full Biography (About Me)</label>
                        <textarea
                          rows={4}
                          value={data.personal.bio}
                          onChange={(e) => updatePersonal({ bio: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Location (Full)</label>
                        <input
                          type="text"
                          value={data.personal.location}
                          onChange={(e) => updatePersonal({ location: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Short Location (for Badges)</label>
                        <input
                          type="text"
                          value={data.personal.shortLocation}
                          onChange={(e) => updatePersonal({ shortLocation: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Training / Learning Highlight</label>
                        <textarea
                          rows={2}
                          value={data.personal.trainingSummary}
                          onChange={(e) => updatePersonal({ trainingSummary: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Image pickers for Avatar and Hero */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-neutral-950/60 rounded-2xl border border-neutral-800 flex items-center gap-4">
                        <img
                          src={data.personal.avatarUrl}
                          alt="Avatar"
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-2xl object-cover border border-neutral-700"
                        />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white mb-1">Profile Photo / Avatar</p>
                          <button
                            type="button"
                            onClick={() => openImagePicker('Update Profile Avatar', data.personal.avatarUrl, (url) => updatePersonal({ avatarUrl: url }))}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 transition-colors"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Change Photo</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-neutral-950/60 rounded-2xl border border-neutral-800 flex items-center gap-4">
                        <img
                          src={data.personal.heroBannerUrl}
                          alt="Banner"
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-2xl object-cover border border-neutral-700"
                        />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white mb-1">Hero Background / Banner</p>
                          <button
                            type="button"
                            onClick={() => openImagePicker('Update Hero Banner', data.personal.heroBannerUrl, (url) => updatePersonal({ heroBannerUrl: url }))}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 transition-colors"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Change Banner</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stats & Freelance Availability */}
                    <div className="p-4 bg-neutral-950/40 rounded-2xl border border-neutral-800 space-y-4">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Availability & Key Metrics</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Availability Text</label>
                          <input
                            type="text"
                            value={data.personal.availabilityText}
                            onChange={(e) => updatePersonal({ availabilityText: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Experience</label>
                          <input
                            type="text"
                            value={data.personal.yearsExperience}
                            onChange={(e) => updatePersonal({ yearsExperience: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Completed Projects</label>
                          <input
                            type="text"
                            value={data.personal.completedProjectsCount}
                            onChange={(e) => updatePersonal({ completedProjectsCount: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Happy Clients</label>
                          <input
                            type="text"
                            value={data.personal.happyClientsCount}
                            onChange={(e) => updatePersonal({ happyClientsCount: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. DEMO REEL */}
                {activeTab === 'demoreel' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Featured Demo Reel</h3>
                      <p className="text-xs text-neutral-400">Configure your primary showreel video link, thumbnail, and role highlights.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Demo Reel Title</label>
                        <input
                          type="text"
                          value={data.demoReel.title}
                          onChange={(e) => updateDemoReel({ title: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Subtitle / Pitch</label>
                        <input
                          type="text"
                          value={data.demoReel.subtitle}
                          onChange={(e) => updateDemoReel({ subtitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Video Player Source Type</label>
                        <select
                          value={data.demoReel.videoType}
                          onChange={(e) => updateDemoReel({ videoType: e.target.value as 'youtube' | 'vimeo' | 'direct' })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        >
                          <option value="youtube">YouTube Embed URL</option>
                          <option value="vimeo">Vimeo Embed URL</option>
                          <option value="direct">Direct MP4 / WebM Link</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Video URL (Embed or Direct)</label>
                        <input
                          type="text"
                          placeholder="https://www.youtube.com/embed/..."
                          value={data.demoReel.videoUrl}
                          onChange={(e) => updateDemoReel({ videoUrl: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Your Role</label>
                        <input
                          type="text"
                          value={data.demoReel.role}
                          onChange={(e) => updateDemoReel({ role: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Detailed Description</label>
                        <textarea
                          rows={3}
                          value={data.demoReel.description}
                          onChange={(e) => updateDemoReel({ description: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Software Used (Comma-separated)</label>
                        <input
                          type="text"
                          value={data.demoReel.softwareUsed.join(', ')}
                          onChange={(e) =>
                            updateDemoReel({
                              softwareUsed: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                            })
                          }
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Thumbnail changer */}
                    <div className="p-4 bg-neutral-950/60 rounded-2xl border border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={data.demoReel.thumbnailUrl}
                          alt="Demo reel thumbnail"
                          referrerPolicy="no-referrer"
                          className="w-24 h-16 rounded-xl object-cover border border-neutral-700"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">Video Poster Thumbnail</p>
                          <p className="text-[11px] text-neutral-400">Displayed before the video plays or as a fallback</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openImagePicker('Update Demo Reel Thumbnail', data.demoReel.thumbnailUrl, (url) => updateDemoReel({ thumbnailUrl: url }))}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 transition-colors"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Change Thumbnail</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. PORTFOLIO PROJECTS */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">Portfolio Projects Manager</h3>
                        <p className="text-xs text-neutral-400">Add, edit, re-categorize, and organize your showcase items.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          addProject({
                            title: 'New Showcase Project',
                            category: 'Video Editing',
                            subCategory: 'Promotional Video',
                            thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=900&q=80',
                            description: 'Add your project description here with details on pacing, storytelling, and results.',
                            clientName: 'Brand Client',
                            softwareUsed: ['Premiere Pro', 'Photoshop'],
                            featured: true,
                            projectDate: '2025',
                            aspectRatio: '16:9',
                          })
                        }
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Project</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.projects.map((proj, idx) => (
                        <div
                          key={proj.id}
                          className="p-4 bg-neutral-950/60 rounded-2xl border border-neutral-800 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={proj.thumbnailUrl}
                                alt={proj.title}
                                referrerPolicy="no-referrer"
                                className="w-16 h-12 rounded-lg object-cover border border-neutral-700 shrink-0"
                              />
                              <div>
                                <span className="text-[10px] uppercase font-bold text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30">
                                  {proj.category}
                                </span>
                                <h4 className="text-sm font-bold text-white mt-1">{proj.title}</h4>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  openImagePicker(`Update ${proj.title} Thumbnail`, proj.thumbnailUrl, (url) =>
                                    updateProject(proj.id, { thumbnailUrl: url })
                                  )
                                }
                                title="Change thumbnail"
                                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteConfirm({
                                    isOpen: true,
                                    title: `Delete "${proj.title}"?`,
                                    message: 'Are you sure you want to remove this project from your portfolio? This action cannot be undone.',
                                    onConfirm: () => deleteProject(proj.id),
                                  })
                                }
                                title="Delete project"
                                className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div>
                              <label className="block text-[11px] text-neutral-400 mb-1">Title</label>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-neutral-400 mb-1">Category</label>
                              <select
                                value={proj.category}
                                onChange={(e) => updateProject(proj.id, { category: e.target.value as 'Video Editing' | 'Graphic Design' })}
                                className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                              >
                                <option value="Video Editing">Video Editing</option>
                                <option value="Graphic Design">Graphic Design</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] text-neutral-400 mb-1">Client Name / Channel</label>
                              <input
                                type="text"
                                value={proj.clientName}
                                onChange={(e) => updateProject(proj.id, { clientName: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] text-neutral-400 mb-1">Description</label>
                              <textarea
                                rows={2}
                                value={proj.description}
                                onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-neutral-400 mb-1">Software (comma-separated)</label>
                              <input
                                type="text"
                                value={proj.softwareUsed.join(', ')}
                                onChange={(e) =>
                                  updateProject(proj.id, {
                                    softwareUsed: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                                  })
                                }
                                className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. SERVICES */}
                {activeTab === 'services' && (
                  <div className="space-y-8">
                    {/* Video Editing Services */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-white mb-0.5">Video Editing Services</h3>
                          <p className="text-xs text-neutral-400">Manage video editing packages and deliverables</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addVideoService({
                              title: 'New Video Service',
                              description: 'Detailed description of this video editing offering.',
                              iconName: 'Video',
                              deliverables: ['Full HD Render', 'Revisions Included', 'Fast Delivery'],
                            })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Video Service</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.videoServices.map((srv) => (
                          <div key={srv.id} className="p-3.5 bg-neutral-950/60 rounded-xl border border-neutral-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={srv.title}
                                onChange={(e) => updateVideoService(srv.id, { title: e.target.value })}
                                className="font-bold text-xs bg-transparent border-b border-transparent hover:border-neutral-700 text-white focus:outline-none w-4/5"
                              />
                              <button
                                type="button"
                                onClick={() => deleteVideoService(srv.id)}
                                className="text-neutral-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={srv.description}
                              onChange={(e) => updateVideoService(srv.id, { description: e.target.value })}
                              className="w-full text-xs p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300"
                            />
                            <div>
                              <label className="text-[10px] text-neutral-500">Deliverables (comma-separated)</label>
                              <input
                                type="text"
                                value={srv.deliverables.join(', ')}
                                onChange={(e) =>
                                  updateVideoService(srv.id, {
                                    deliverables: e.target.value.split(',').map((d) => d.trim()).filter(Boolean),
                                  })
                                }
                                className="w-full text-xs px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-300"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Graphic Design Services */}
                    <div className="space-y-4 pt-4 border-t border-neutral-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-white mb-0.5">Graphic Design Services</h3>
                          <p className="text-xs text-neutral-400">Manage graphic design offerings</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addGraphicService({
                              title: 'New Graphic Service',
                              description: 'Detailed description of this graphic design offering.',
                              iconName: 'Sparkles',
                              deliverables: ['Vector Assets', 'Print Ready', 'Source Files'],
                            })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Design Service</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.graphicServices.map((srv) => (
                          <div key={srv.id} className="p-3.5 bg-neutral-950/60 rounded-xl border border-neutral-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={srv.title}
                                onChange={(e) => updateGraphicService(srv.id, { title: e.target.value })}
                                className="font-bold text-xs bg-transparent border-b border-transparent hover:border-neutral-700 text-white focus:outline-none w-4/5"
                              />
                              <button
                                type="button"
                                onClick={() => deleteGraphicService(srv.id)}
                                className="text-neutral-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={srv.description}
                              onChange={(e) => updateGraphicService(srv.id, { description: e.target.value })}
                              className="w-full text-xs p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300"
                            />
                            <div>
                              <label className="text-[10px] text-neutral-500">Deliverables (comma-separated)</label>
                              <input
                                type="text"
                                value={srv.deliverables.join(', ')}
                                onChange={(e) =>
                                  updateGraphicService(srv.id, {
                                    deliverables: e.target.value.split(',').map((d) => d.trim()).filter(Boolean),
                                  })
                                }
                                className="w-full text-xs px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-300"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. SOFTWARE & SKILLS */}
                {activeTab === 'skills' && (
                  <div className="space-y-8">
                    {/* Software Skills (Glowing Cards) */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-white mb-0.5">Software Tools & Glowing Cards</h3>
                          <p className="text-xs text-neutral-400">Configure glow colors (blue, purple, cyan, orange, pink, emerald), proficiency, and descriptions.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addSoftwareSkill({
                              name: 'New Software',
                              category: 'Design',
                              iconName: 'Sparkles',
                              proficiency: 90,
                              glowColor: 'cyan',
                              description: 'Short summary of proficiency and workflow.',
                              accentHex: '#00C4CC',
                            })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Software</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.softwareSkills.map((sw) => (
                          <div key={sw.id} className="p-3.5 bg-neutral-950/60 rounded-xl border border-neutral-800 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={sw.name}
                                onChange={(e) => updateSoftwareSkill(sw.id, { name: e.target.value })}
                                className="font-bold text-xs bg-transparent text-white border-b border-transparent hover:border-neutral-700 focus:outline-none"
                              />
                              <div className="flex items-center gap-1">
                                <select
                                  value={sw.glowColor}
                                  onChange={(e) =>
                                    updateSoftwareSkill(sw.id, {
                                      glowColor: e.target.value as 'blue' | 'purple' | 'cyan' | 'orange' | 'pink' | 'emerald',
                                    })
                                  }
                                  className="text-[11px] bg-neutral-900 border border-neutral-800 rounded px-2 py-0.5 text-neutral-200"
                                >
                                  <option value="purple">Purple Glow</option>
                                  <option value="blue">Blue Glow</option>
                                  <option value="cyan">Cyan Glow</option>
                                  <option value="orange">Orange Glow</option>
                                  <option value="pink">Pink Glow</option>
                                  <option value="emerald">Emerald Glow</option>
                                </select>
                                <button
                                  type="button"
                                  onClick={() => deleteSoftwareSkill(sw.id)}
                                  className="text-neutral-500 hover:text-rose-400 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[11px] text-neutral-400">Proficiency: {sw.proficiency}%</span>
                              <input
                                type="range"
                                min={50}
                                max={100}
                                value={sw.proficiency}
                                onChange={(e) => updateSoftwareSkill(sw.id, { proficiency: Number(e.target.value) })}
                                className="flex-1 accent-indigo-500"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={sw.description}
                              onChange={(e) => updateSoftwareSkill(sw.id, { description: e.target.value })}
                              className="w-full text-xs p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Skills */}
                    <div className="space-y-4 pt-4 border-t border-neutral-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-white mb-0.5">Technical & Craft Skills</h3>
                          <p className="text-xs text-neutral-400">Storytelling, pacing, typography, sound design, etc.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addTechnicalSkill({
                              name: 'New Technical Skill',
                              category: 'Core Video',
                              level: 'Advanced',
                              description: 'Description of this technical specialty.',
                            })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Skill</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.technicalSkills.map((tech) => (
                          <div key={tech.id} className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={tech.name}
                                onChange={(e) => updateTechnicalSkill(tech.id, { name: e.target.value })}
                                className="text-xs font-bold bg-transparent text-white focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => deleteTechnicalSkill(tech.id)}
                                className="text-neutral-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={tech.description}
                              onChange={(e) => updateTechnicalSkill(tech.id, { description: e.target.value })}
                              className="w-full text-[11px] p-1.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. RESUME & TRAINING */}
                {activeTab === 'resume' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Resume, Education & Training Details</h3>
                      <p className="text-xs text-neutral-400">Manage career objective, education milestones, As-Sunnah training, and references.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Career Objective</label>
                      <textarea
                        rows={3}
                        value={data.resume.careerObjective}
                        onChange={(e) => updateResumeData({ careerObjective: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    {/* Education list */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Education</h4>
                        <button
                          type="button"
                          onClick={() =>
                            addEducation({
                              degree: 'New Qualification',
                              status: 'Completed',
                              institution: 'Institution Name',
                              year: '2025',
                              description: 'Curriculum & achievements description.',
                            })
                          }
                          className="flex items-center gap-1 text-xs text-indigo-400 hover:underline"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Education
                        </button>
                      </div>

                      {data.resume.education.map((edu) => (
                        <div key={edu.id} className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                              className="font-bold text-xs text-white bg-transparent focus:outline-none"
                            />
                            <div className="flex items-center gap-2">
                              <select
                                value={edu.status}
                                onChange={(e) => updateEducation(edu.id, { status: e.target.value as 'Ongoing' | 'Completed' | 'Certified' })}
                                className="text-[11px] bg-neutral-900 border border-neutral-800 rounded px-2 py-0.5 text-neutral-200"
                              >
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Certified">Certified</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => deleteEducation(edu.id)}
                                className="text-neutral-500 hover:text-rose-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <input
                            type="text"
                            placeholder="Institution"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                            className="w-full text-xs p-1.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Training list */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Professional Training & Certifications</h4>
                        <button
                          type="button"
                          onClick={() =>
                            addTraining({
                              title: 'Professional Program',
                              institute: 'As-Sunnah Skill Development Institute',
                              period: 'Completed',
                              description: 'Course summary.',
                              skillsLearned: ['Management', 'Digital Tools'],
                            })
                          }
                          className="flex items-center gap-1 text-xs text-indigo-400 hover:underline"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Training
                        </button>
                      </div>

                      {data.resume.training.map((train) => (
                        <div key={train.id} className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={train.title}
                              onChange={(e) => updateTraining(train.id, { title: e.target.value })}
                              className="font-bold text-xs text-white bg-transparent focus:outline-none w-2/3"
                            />
                            <button
                              type="button"
                              onClick={() => deleteTraining(train.id)}
                              className="text-neutral-500 hover:text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Institute"
                            value={train.institute}
                            onChange={(e) => updateTraining(train.id, { institute: e.target.value })}
                            className="w-full text-xs p-1.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300"
                          />
                          <textarea
                            rows={2}
                            value={train.description}
                            onChange={(e) => updateTraining(train.id, { description: e.target.value })}
                            className="w-full text-xs p-1.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Reference Info */}
                    <div className="p-4 bg-neutral-950/60 rounded-2xl border border-neutral-800 space-y-3">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Professional Reference</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Name</label>
                          <input
                            type="text"
                            value={data.resume.reference.name}
                            onChange={(e) =>
                              updateResumeData({
                                reference: { ...data.resume.reference, name: e.target.value },
                              })
                            }
                            className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Role / Designation</label>
                          <input
                            type="text"
                            value={data.resume.reference.role}
                            onChange={(e) =>
                              updateResumeData({
                                reference: { ...data.resume.reference, role: e.target.value },
                              })
                            }
                            className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Organization</label>
                          <input
                            type="text"
                            value={data.resume.reference.organization}
                            onChange={(e) =>
                              updateResumeData({
                                reference: { ...data.resume.reference, organization: e.target.value },
                              })
                            }
                            className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. TESTIMONIALS */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">Client Testimonials & Feedback</h3>
                        <p className="text-xs text-neutral-400">Manage client reviews, ratings, and avatars.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          addTestimonial({
                            clientName: 'New Client',
                            role: 'Creator / Founder',
                            companyOrChannel: 'Brand / Channel',
                            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                            rating: 5,
                            feedback: 'Add client feedback and appreciation text here.',
                            projectType: 'Video Editing',
                          })
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Testimonial</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.testimonials.map((test) => (
                        <div key={test.id} className="p-4 bg-neutral-950/60 rounded-2xl border border-neutral-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={test.avatarUrl}
                                alt={test.clientName}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                              />
                              <div>
                                <input
                                  type="text"
                                  value={test.clientName}
                                  onChange={(e) => updateTestimonial(test.id, { clientName: e.target.value })}
                                  className="font-bold text-xs text-white bg-transparent focus:outline-none"
                                />
                                <input
                                  type="text"
                                  value={test.companyOrChannel}
                                  onChange={(e) => updateTestimonial(test.id, { companyOrChannel: e.target.value })}
                                  className="text-[11px] text-neutral-400 bg-transparent focus:outline-none block"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  openImagePicker(`Update ${test.clientName} Avatar`, test.avatarUrl, (url) =>
                                    updateTestimonial(test.id, { avatarUrl: url })
                                  )
                                }
                                className="p-1.5 text-neutral-400 hover:text-white"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteTestimonial(test.id)}
                                className="p-1.5 text-neutral-400 hover:text-rose-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <textarea
                            rows={3}
                            value={test.feedback}
                            onChange={(e) => updateTestimonial(test.id, { feedback: e.target.value })}
                            className="w-full text-xs p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. CONTACT & SOCIALS */}
                {activeTab === 'contact' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Contact Channels & Social Media Links</h3>
                      <p className="text-xs text-neutral-400">Configure email, phone, WhatsApp direct link, and social profiles.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={data.contact.email}
                          onChange={(e) => updateContact({ email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Phone Number</label>
                        <input
                          type="text"
                          value={data.contact.phone}
                          onChange={(e) => updateContact({ phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">WhatsApp Number</label>
                        <input
                          type="text"
                          value={data.contact.whatsapp}
                          onChange={(e) => updateContact({ whatsapp: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">WhatsApp Direct URL</label>
                        <input
                          type="text"
                          value={data.contact.whatsappDirectUrl}
                          onChange={(e) => updateContact({ whatsappDirectUrl: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Address Details (Jurain, Dhaka)</label>
                        <input
                          type="text"
                          value={data.contact.addressDetail}
                          onChange={(e) => updateContact({ addressDetail: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white"
                        />
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="space-y-3 pt-4 border-t border-neutral-800">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Social Links</h4>
                        <button
                          type="button"
                          onClick={() =>
                            addSocialLink({
                              platform: 'other',
                              label: 'New Link',
                              url: 'https://',
                              iconName: 'Globe',
                            })
                          }
                          className="flex items-center gap-1 text-xs text-indigo-400 hover:underline"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Link
                        </button>
                      </div>

                      <div className="space-y-2">
                        {data.socialLinks.map((soc) => (
                          <div key={soc.id} className="flex items-center gap-2 p-2 bg-neutral-950/60 rounded-xl border border-neutral-800">
                            <input
                              type="text"
                              value={soc.label}
                              onChange={(e) => updateSocialLink(soc.id, { label: e.target.value })}
                              className="w-28 text-xs font-bold bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1 text-white"
                            />
                            <input
                              type="text"
                              value={soc.url}
                              onChange={(e) => updateSocialLink(soc.id, { url: e.target.value })}
                              className="flex-1 text-xs bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1 text-neutral-300"
                            />
                            <button
                              type="button"
                              onClick={() => deleteSocialLink(soc.id)}
                              className="text-neutral-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. SITE CONFIG & BACKUP */}
                {activeTab === 'settings' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Site Configuration & JSON Backup</h3>
                      <p className="text-xs text-neutral-400">Configure global website branding and manage JSON backups.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Logo Text</label>
                        <input
                          type="text"
                          value={data.siteConfig.logoText}
                          onChange={(e) => updateSiteConfig({ logoText: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Tagline</label>
                        <input
                          type="text"
                          value={data.siteConfig.tagline}
                          onChange={(e) => updateSiteConfig({ tagline: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Copyright Text</label>
                        <input
                          type="text"
                          value={data.siteConfig.copyrightText}
                          onChange={(e) => updateSiteConfig({ copyrightText: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white"
                        />
                      </div>
                    </div>

                    {/* JSON Backup and Restore */}
                    <div className="p-5 bg-neutral-950/60 rounded-2xl border border-neutral-800 space-y-3">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">JSON Data Backup & Restore</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Export your entire portfolio content as a single JSON file to keep offline backups, or import a previously saved JSON file.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={exportDataAsJSON}
                          className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-xl border border-neutral-700 transition-colors"
                        >
                          <Download className="w-4 h-4 text-indigo-400" />
                          <span>Download Backup JSON</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteConfirm({
                              isOpen: true,
                              title: 'Reset Portfolio Content to Default?',
                              message: 'This will reset all your portfolio data back to the default dataset. Make sure you exported a backup if you have important custom content.',
                              onConfirm: resetToDefault,
                            });
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-rose-950/40 hover:bg-rose-900/50 text-xs font-semibold text-rose-300 rounded-xl border border-rose-800/40 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4 text-rose-400" />
                          <span>Reset to Default Content</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};
