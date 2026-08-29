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
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 255, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-blue-400/40"
        animate={{
          boxShadow: [
            '0 0 10px rgba(14, 165, 255, 0.3)',
            '0 0 30px rgba(14, 165, 255, 0.8)',
            '0 0 10px rgba(14, 165, 255, 0.3)',
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main logo image with hover and rotation */}
      <motion.img
        src="/assets/NaztechLogo.png"
        alt="Naztech"
        className="w-full h-full object-contain rounded-full"
        whileHover={{
          scale: 1.08,
          filter: 'brightness(1.2)',
        }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          rotateZ: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
          hover: {
            duration: 0.3,
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
