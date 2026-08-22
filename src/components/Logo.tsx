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
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        filter: ["drop-shadow(0 0 0px rgba(53,187,207,0))", "drop-shadow(0 0 10px rgba(53,187,207,0.3))", "drop-shadow(0 0 0px rgba(53,187,207,0))"]
      }}
      whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
      transition={{ 
        duration: 3, 
        repeat: Infinity,
        repeatType: "mirror"
      }}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 512 512" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full shadow-2xl rounded-full"
      >
        <defs>
          <linearGradient id="circuitGrad" x1="0" y1="0" x2="512" y2="512">
            <stop stopColor="#0B2234" />
            <stop offset="1" stopColor="#1a3a4a" />
          </linearGradient>
          <linearGradient id="nGrad" x1="256" y1="130" x2="256" y2="334">
            <stop stopColor="#8DE8F1" />
            <stop offset="1" stopColor="#35BBCF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Ring - Dynamic Animation */}
        <motion.circle 
            cx="256" cy="256" r="250" 
            stroke="#805AF8" strokeWidth="8" 
            animate={{ strokeDasharray: ["0, 1570", "1570, 0"], strokeDashoffset: [0, -1570] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Circuit Pattern Background */}
        <circle cx="256" cy="256" r="242" fill="url(#circuitGrad)" />
        
        {/* Animated Circuit lines */}
        <motion.g 
          stroke="#35BBCF" 
          strokeWidth="1" 
          strokeOpacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Pulsing Grid */}
          {Array.from({ length: 15 }).map((_, i) => (
            <React.Fragment key={i}>
              <motion.line 
                x1="50" y1={80 + i * 25} x2="462" y2={80 + i * 25} 
                strokeOpacity={0.05} 
                animate={{ strokeOpacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
              />
              <motion.line 
                x1={80 + i * 25} y1="50" x2={80 + i * 25} y2="462" 
                strokeOpacity={0.05} 
                animate={{ strokeOpacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
              />
            </React.Fragment>
          ))}
          
          {/* Active Data Traces */}
          <motion.path 
            d="M256 50 V150 M256 362 V462 M50 256 H150 M362 256 H462" 
            strokeWidth="3" 
            stroke="#8DE8F1"
            animate={{ strokeOpacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>

        {/* The 'N' with High Integrity Bevel */}
        <motion.path 
          d="M170 340V140H225L305 280V140H345V340H300L220 200V340H170Z" 
          fill="url(#nGrad)"
          filter="url(#glow)"
          stroke="#8DE8F1"
          strokeWidth="2"
          animate={{ 
            fill: ["url(#nGrad)", "rgba(141, 232, 241, 0.8)", "url(#nGrad)"],
            filter: ["drop-shadow(0 0 5px #35BBCF)", "drop-shadow(0 0 20px #35BBCF)", "drop-shadow(0 0 5px #35BBCF)"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Scanning Light Effect */}
        <motion.rect 
            x="150" y="100" width="10" height="300" 
            fill="white" opacity="0.1"
            animate={{ x: [150, 350, 150] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
};
