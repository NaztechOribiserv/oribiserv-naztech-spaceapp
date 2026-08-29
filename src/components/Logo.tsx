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

      {/* Main logo image (static) with bold styling and hover tilt */}
      <motion.img
        src="/assets/MainLogo.png"
        alt="Main Logo"
        className="w-full h-full object-contain rounded-full"
        style={{
          border: '3px solid rgba(14,165,255,0.12)',
          boxShadow: '0 10px 40px rgba(2,6,23,0.6), 0 0 40px rgba(14,165,255,0.08)'
        }}
        whileHover={{
          scale: 1.08,
          rotateZ: [0, 5, -5, 0],
          filter: 'brightness(1.18) drop-shadow(0 12px 40px rgba(14,165,255,0.3))',
        }}
        transition={{
          hover: { duration: 0.28 },
        }}
      />

      {/* Orbiting spark */}
      <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ width: '160%', height: '160%', position: 'relative' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ position: 'absolute', top: '6%', left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: 9999, background: 'radial-gradient(circle, #ffffff, #7dd3fc)', boxShadow: '0 0 12px rgba(125,211,252,0.9), 0 0 24px rgba(14,165,255,0.25)' }} />
        </motion.div>
      </motion.div>

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
