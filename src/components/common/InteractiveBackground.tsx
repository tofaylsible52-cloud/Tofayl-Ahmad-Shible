/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const InteractiveBackground: React.FC = () => {
  const { colorTheme } = usePortfolio();
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Smooth mouse coordinates with spring physics
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 300, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Soft trailing aura spring
  const auraSpringConfig = { damping: 35, stiffness: 150, mass: 0.6 };
  const auraX = useSpring(mouseX, auraSpringConfig);
  const auraY = useSpring(mouseY, auraSpringConfig);

  // Theme-based dynamic gradients & colors configuration
  const themeConfig = useMemo(() => {
    switch (colorTheme) {
      case 'emerald-cyan':
        return {
          blob1: 'from-emerald-600/35 via-teal-600/30 to-cyan-500/25',
          blob2: 'from-cyan-500/30 via-emerald-600/25 to-blue-600/25',
          blob3: 'from-teal-500/25 via-emerald-600/25 to-lime-500/20',
          cursorShadow: '0 0 16px #10b981, 0 0 30px #06b6d4',
          cursorBg: 'bg-emerald-400',
          gridDotColor: '#10b981',
          accentBorder: 'border-emerald-400/50',
          accentBg: 'bg-emerald-500/10',
          ripples: ['rgba(16, 185, 129, 0.8)', 'rgba(6, 182, 212, 0.8)', 'rgba(20, 184, 166, 0.8)'],
        };
      case 'sunset-amber':
        return {
          blob1: 'from-amber-600/35 via-orange-600/30 to-rose-600/25',
          blob2: 'from-rose-500/30 via-pink-600/25 to-amber-600/25',
          blob3: 'from-fuchsia-600/25 via-orange-600/25 to-yellow-500/20',
          cursorShadow: '0 0 16px #f59e0b, 0 0 30px #f43f5e',
          cursorBg: 'bg-amber-400',
          gridDotColor: '#f59e0b',
          accentBorder: 'border-amber-400/50',
          accentBg: 'bg-amber-500/10',
          ripples: ['rgba(245, 158, 11, 0.8)', 'rgba(244, 63, 94, 0.8)', 'rgba(217, 70, 239, 0.8)'],
        };
      case 'cosmic-aurora':
        return {
          blob1: 'from-fuchsia-600/40 via-purple-600/35 to-cyan-400/30',
          blob2: 'from-cyan-400/35 via-blue-600/30 to-pink-500/35',
          blob3: 'from-emerald-400/25 via-indigo-600/30 to-rose-500/30',
          cursorShadow: '0 0 18px #d946ef, 0 0 32px #06b6d4',
          cursorBg: 'bg-fuchsia-400',
          gridDotColor: '#d946ef',
          accentBorder: 'border-fuchsia-400/50',
          accentBg: 'bg-fuchsia-500/10',
          ripples: ['rgba(217, 70, 239, 0.8)', 'rgba(6, 182, 212, 0.8)', 'rgba(168, 85, 247, 0.8)'],
        };
      case 'obsidian-gold':
        return {
          blob1: 'from-amber-500/30 via-yellow-600/25 to-blue-900/35',
          blob2: 'from-blue-600/30 via-indigo-800/30 to-amber-500/25',
          blob3: 'from-yellow-600/25 via-amber-700/25 to-blue-700/20',
          cursorShadow: '0 0 16px #eab308, 0 0 30px #3b82f6',
          cursorBg: 'bg-yellow-400',
          gridDotColor: '#eab308',
          accentBorder: 'border-amber-400/50',
          accentBg: 'bg-amber-500/10',
          ripples: ['rgba(234, 179, 8, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(245, 158, 11, 0.8)'],
        };
      case 'cyber-indigo':
      default:
        return {
          blob1: 'from-indigo-600/35 via-purple-600/30 to-pink-500/25',
          blob2: 'from-cyan-500/30 via-blue-600/25 to-violet-600/35',
          blob3: 'from-emerald-500/20 via-indigo-600/25 to-fuchsia-600/30',
          cursorShadow: '0 0 16px #6366f1, 0 0 30px #a855f7',
          cursorBg: 'bg-indigo-400',
          gridDotColor: '#6366f1',
          accentBorder: 'border-indigo-400/50',
          accentBg: 'bg-indigo-500/10',
          ripples: ['rgba(99, 102, 241, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(236, 72, 153, 0.8)'],
        };
    }
  }, [colorTheme]);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!cursorVisible) setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    const handleClickOrTouch = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      if (clientX === 0 && clientY === 0) return;

      const randomColor = themeConfig.ripples[Math.floor(Math.random() * themeConfig.ripples.length)];
      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        color: randomColor,
      };

      setRipples((prev) => [...prev.slice(-6), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('pointerdown', handleClickOrTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('pointerdown', handleClickOrTouch);
    };
  }, [mouseX, mouseY, cursorVisible, themeConfig]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Colorful Smart Ambient Aurora Gradients (Dynamic with active theme) */}
      <motion.div
        animate={{
          x: [0, 70, -50, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.25, 0.95, 1],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -top-32 -left-20 w-[650px] h-[650px] rounded-full bg-gradient-to-tr ${themeConfig.blob1} blur-[140px] transition-all duration-1000`}
      />

      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 70, -50, 0],
          scale: [0.95, 1.3, 1, 0.95],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/4 -right-24 w-[700px] h-[700px] rounded-full bg-gradient-to-bl ${themeConfig.blob2} blur-[150px] transition-all duration-1000`}
      />

      <motion.div
        animate={{
          x: [0, 60, -70, 0],
          y: [0, -50, 60, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute bottom-10 left-1/3 w-[750px] h-[750px] rounded-full bg-gradient-to-tr ${themeConfig.blob3} blur-[160px] transition-all duration-1000`}
      />

      {/* 2. Motion Graphics Floating Geometric & Video Design Elements */}
      {/* Rotating Motion Keyframe Diamond (Top Left) */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [45, 225, 405],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-[18%] left-[7%] w-10 h-10 border-2 ${themeConfig.accentBorder} ${themeConfig.accentBg} backdrop-blur-xs rounded-lg transition-colors duration-700`}
      />

      {/* Pulsing Motion Camera Crosshair (Top Right) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[28%] right-[12%] w-12 h-12 flex items-center justify-center"
      >
        <div className="w-full h-[1.5px] bg-cyan-400/40 absolute" />
        <div className="h-full w-[1.5px] bg-cyan-400/40 absolute" />
        <div className="w-6 h-6 rounded-full border border-cyan-400/60" />
      </motion.div>

      {/* Floating Motion Wave / Curve (Center Left) */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -25, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[52%] left-[10%] w-32 h-16 opacity-30"
      >
        <svg viewBox="0 0 100 40" className="w-full h-full stroke-purple-400 fill-none stroke-[1.5]">
          <path d="M0 20 Q 25 0, 50 20 T 100 20" />
        </svg>
      </motion.div>

      {/* Floating 3D Motion Ring (Center Right) */}
      <motion.div
        animate={{
          y: [0, 35, 0],
          rotate: [360, 180, 0],
          scale: [0.9, 1.15, 0.9],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[65%] right-[8%] w-16 h-16 rounded-full border-2 border-dashed border-pink-400/40 bg-pink-500/5 backdrop-blur-xs"
      />

      {/* Video Timeline Keyframe Node (Bottom Left) */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
          rotate: [0, 180, 360],
          opacity: [0.25, 0.6, 0.25],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[20%] left-[18%] w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400/30 to-rose-500/30 border border-amber-400/40 rotate-12"
      />

      {/* Luminous Motion Grid Coordinate Dots */}
      <div
        className="absolute inset-0 opacity-[0.15] transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(${themeConfig.gridDotColor} 1.2px, transparent 1.2px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 3. Interactive Point Light / Glowing Dot Cursor */}
      {!isTouchDevice && cursorVisible && (
        <>
          <motion.div
            style={{
              x: auraX,
              y: auraY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className={`w-16 h-16 rounded-full bg-gradient-to-tr ${themeConfig.blob1} blur-md pointer-events-none`}
          />

          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%',
              boxShadow: themeConfig.cursorShadow,
            }}
            className={`w-3.5 h-3.5 rounded-full ${themeConfig.cursorBg} border border-white/80 pointer-events-none flex items-center justify-center`}
          >
            <span className="w-1 h-1 rounded-full bg-white" />
          </motion.div>
        </>
      )}

      {/* 4. Interactive Touch / Click Neon Color Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{
            scale: 0,
            opacity: 1,
          }}
          animate={{
            scale: 3.5,
            opacity: 0,
          }}
          transition={{
            duration: 0.75,
            ease: 'easeOut',
          }}
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: ripple.color,
            boxShadow: `0 0 35px ${ripple.color}`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 bg-white/10 backdrop-blur-xs pointer-events-none"
        />
      ))}
    </div>
  );
};

