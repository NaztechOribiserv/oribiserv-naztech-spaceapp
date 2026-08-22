import React from 'react';
import { motion } from 'framer-motion';

export const TechBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-slate-50">
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#0d9488 1px, transparent 1px), linear-gradient(90deg, #0d9488 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Moving Tech Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-brand-500 rounded-full opacity-20"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            scale: Math.random() * 2
          }}
          animate={{ 
            y: [null, Math.random() * 100 + '%'],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}

      {/* Subtle Glowing Traces */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`trace-${i}`}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-10"
          style={{ 
            width: Math.random() * 300 + 200,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scaleX: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: Math.random() * 10 + 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      ))}
    </div>
  );
};
