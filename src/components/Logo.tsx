import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-14 h-14", size }) => {
  // Using the new Naztech image as the global app logo. The image is placed in /assets so Vite serves it as a static asset.
  return (
    <motion.img
      src="/assets/NaztechSpacelogo.png"
      alt="Naztech"
      className={`rounded-full object-cover ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6 }}
      style={{ width: size, height: size }}
    />
  );
};
