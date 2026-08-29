import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-14 h-14", size }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Outer glowing ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.15), rgba(14,165,255,0.18), rgba(124,58,237,0.12))',
          mixBlendMode: 'screen',
        }}
        animate={{
          rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          opacity: [0.18, 0.36, 0.18],
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Pulsing glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: '2px solid rgba(14,165,255,0.15)' }}
        animate={{
          boxShadow: [
            '0 0 8px rgba(14, 165, 255, 0.12)',
            '0 0 28px rgba(14, 165, 255, 0.45)',
            '0 0 8px rgba(14, 165, 255, 0.12)'
          ],
          scale: [1, 1.035, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Main logo image with hover and rotation */}
      <motion.img
        src="/assets/MainLogo.png"
        alt="Main Logo"
        className="w-full h-full object-contain rounded-full"
        whileHover={{
          scale: 1.12,
          rotateZ: [0, 6, -6, 0],
          filter: 'brightness(1.25) drop-shadow(0 8px 30px rgba(14,165,255,0.35))',
        }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          rotateZ: {
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
          },
          hover: {
            duration: 0.28,
          },
        }}
      />

      {/* Inner glowing core */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 255, 0.15) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};
