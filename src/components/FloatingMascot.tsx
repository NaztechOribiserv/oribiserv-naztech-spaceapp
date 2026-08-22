import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingMascot: React.FC = () => {
  const [isPeeking, setIsPeeking] = useState(false);
  const [position, setPosition] = useState({ bottom: '8rem', right: '2rem', left: 'auto' });
  const [currentJoke, setCurrentJoke] = useState("Protocol: Optimization initiated.");

  const techJokes = [
    "Oribibot says: 'I'm not lazy, I'm just on power-save mode.' Strategic resting completed.",
    "Detection: WiFi router seeking therapy. Reason: Chronic connection issues pinpointed.",
    "Definition: Hardware - The segment of infrastructure susceptible to kinetic adjustment (kicking).",
    "Logic: 10 types of operatives Exist. Binary proficient, and binary deficient.",
    "SQL Event: Query entered bar. Joins requested at identified tables.",
    "Status: System thermal cooling. Reason: Windows left in open state.",
    "Efficiency: 0 engineers required for illumination hardware swap. Infrastructure limitation logged.",
    "Instruction: Real strategists initiate counting at index 0.",
    "Warning: Integrity preserved. Force-push detected. Redundancy active.",
    "DevOps Status: Hide and seek mode enabled. Target: Latent bugs."
  ];

  useEffect(() => {
    // Randomized peeking and jokes
    const peekInterval = setInterval(() => {
      const randomJoke = techJokes[Math.floor(Math.random() * techJokes.length)];
      setCurrentJoke(randomJoke);
      setIsPeeking(true);
      setTimeout(() => setIsPeeking(false), 8000);
    }, 20000);

    // Randomized repositioning every 30-45 seconds for a "live" feel
    const moveInterval = setInterval(() => {
      const positions = [
        { bottom: '8rem', right: '2rem', left: 'auto' },
        { bottom: '15rem', right: '4rem', left: 'auto' },
        { bottom: '2rem', right: 'auto', left: '2rem' },
        { bottom: '12rem', right: 'auto', left: '5rem' },
        { bottom: '30rem', right: '3rem', left: 'auto' },
      ];
      const nextPos = positions[Math.floor(Math.random() * positions.length)];
      setPosition(nextPos);
    }, 35000);

    return () => {
      clearInterval(peekInterval);
      clearInterval(moveInterval);
    };
  }, []);

  return (
    <motion.div
      className="fixed z-[90] pointer-events-none select-none hidden md:block"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        bottom: position.bottom,
        right: position.right,
        left: position.left,
        y: [0, -20, 0],
        rotate: [0, -2, 2, 0]
      }}
      transition={{ 
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        bottom: { duration: 2.5, ease: "circInOut" },
        right: { duration: 2.5, ease: "circInOut" },
        left: { duration: 2.5, ease: "circInOut" },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 }
      }}
    >
      <div className="relative group">
        <AnimatePresence>
          {isPeeking && (
            <motion.div 
              initial={{ opacity: 0, scale: 0, y: 20, x: position.left === 'auto' ? 20 : -20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              className={`absolute -top-20 ${position.left === 'auto' ? 'right-0 rounded-br-none' : 'left-0 rounded-bl-none'} bg-brand-900/90 backdrop-blur-xl text-brand-500 text-[0.6rem] font-bold px-5 py-3 rounded-2xl shadow-2xl border border-brand-500/30 whitespace-normal w-56 text-center uppercase tracking-widest pointer-events-auto shadow-brand-500/10`}
            >
              <div className="absolute inset-0 bg-brand-500/5 circuit-bg opacity-20 pointer-events-none" />
              <div className="relative z-10 font-mono">
                {currentJoke}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Likeness Reconstruction (Enhanced SVG Strategist) */}
        <div className="relative">
            <motion.div 
              className="absolute inset-0 bg-brand-500/20 blur-3xl rounded-full"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <svg width="100" height="120" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-[0_0_15px_rgba(53,187,207,0.4)]">
                <defs>
                    <linearGradient id="roboBody" x1="0" y1="0" x2="400" y2="500">
                        <stop stopColor="#2D6B78" />
                        <stop offset="1" stopColor="#04101a" />
                    </linearGradient>
                    <linearGradient id="roboFace" x1="100" y1="100" x2="300" y2="250">
                        <stop stopColor="#35BBCF" />
                        <stop offset="1" stopColor="#2D6B78" />
                    </linearGradient>
                    <filter id="roboGlow">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                
                {/* Floating Thrusters */}
                <motion.ellipse 
                    cx="200" cy="460" rx="40" ry="10" fill="#35BBCF" opacity="0.6"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                />

                {/* Body */}
                <motion.path 
                    d="M120 300 H280 L300 420 Q200 450 100 420 Z" 
                    fill="url(#roboBody)" 
                    stroke="#35BBCF" strokeWidth="4" 
                />
                
                {/* Head */}
                <motion.g
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <rect x="75" y="80" width="250" height="200" rx="100" fill="url(#roboBody)" stroke="#35BBCF" strokeWidth="6" />
                    
                    {/* Face Panel */}
                    <rect x="100" y="110" width="200" height="140" rx="70" fill="#04101a" stroke="#2D6B78" strokeWidth="2" />
                    
                    {/* Eyes - Dynamic Intelligence */}
                    <motion.g
                        animate={{ scaleY: [1, 0.1, 1] }} 
                        transition={{ duration: 5, repeat: Infinity, repeatDelay: 2.5 }}
                    >
                        <circle cx="160" cy="180" r="25" fill="#1a3a4a" />
                        <circle cx="160" cy="180" r="8" fill="#8DE8F1" filter="url(#roboGlow)" />
                        
                        <circle cx="240" cy="180" r="25" fill="#1a3a4a" />
                        <circle cx="240" cy="180" r="8" fill="#8DE8F1" filter="url(#roboGlow)" />
                    </motion.g>
                    
                    {/* Mouth Line */}
                    <motion.path 
                        d="M170 225 H230" 
                        stroke="#8DE8F1" strokeWidth="2" strokeLinecap="round" opacity="0.5"
                        animate={{ width: [60, 40, 60], x: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </motion.g>
                
                {/* Strategic Chip / Logo Likeness */}
                <rect x="165" y="330" width="70" height="70" rx="12" fill="#04101a" stroke="#8DE8F1" strokeWidth="2" />
                <path 
                    d="M185 380V350H200L215 370V350H225V380H210L195 360V380H185Z" 
                    fill="#35BBCF"
                    className="drop-shadow-glow"
                />
                
                {/* Floating Data Orbs */}
                <motion.circle 
                    cx="100" cy="350" r="10" fill="#8DE8F1" opacity="0.4"
                    animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle 
                    cx="300" cy="380" r="8" fill="#8DE8F1" opacity="0.4"
                    animate={{ y: [10, -10, 10], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </svg>
        </div>
      </div>
    </motion.div>
  );
};
