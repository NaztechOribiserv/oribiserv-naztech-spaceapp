import React, { useEffect, useRef, useState } from 'react';
import { LucideArrowRight, LucidePlay, LucidePause } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Logo } from './Logo';

export const Hero: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms for content
  const contentX = useTransform(springX, [0, 1], [-15, 15]);
  const contentY = useTransform(springY, [0, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Check for reduced motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay 
        muted 
        loop 
        playsInline 
        poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80"
      >
        <source src="https://videos.pexels.com/video-files/4496268/4496268-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030c16]/90 via-[#030c16]/70 to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div 
          style={{ x: contentX, y: contentY }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 inline-block p-4 bg-brand-500/10 backdrop-blur-xl rounded-3xl border-2 border-brand-500/30 shadow-retro-brand"
            >
              <Logo className="w-16 h-16" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.85] mb-8"
            >
              Elite Tech <br/><span className="text-brand-500">Mastery.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-brand-50 leading-relaxed font-medium mb-12 max-w-xl border-l-4 border-brand-500 pl-6 bg-brand-500/5 py-4"
            >
              From ultra-fast Fiber and 5G to bespoke smart home automation. We don't just provide services; we architect your digital sovereignty.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <button 
                onClick={onCtaClick}
                className="px-10 py-5 bg-brand-500 hover:bg-brand-600 text-[#032137] font-bold rounded-2xl transition-all flex items-center group shadow-retro active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-widest text-xs"
              >
                Launch Audit
                <LucideArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={18} />
              </button>
              <button 
                onClick={toggleVideo}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all flex items-center backdrop-blur-md"
              >
                {isPlaying ? (
                  <><LucidePause className="mr-2" size={18} /> Pause Motion</>
                ) : (
                  <><LucidePlay className="mr-2" size={18} /> Resume Motion</>
                )}
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="brutal-card p-10 rounded-[3rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Logo size={120} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Topology Scan</h3>
               <p className="text-muted text-sm mb-8 relative z-10">Instant service availability audit for your coordinates.</p>
               
               <form className="space-y-4 relative z-10" onSubmit={(e) => { e.preventDefault(); (window as any).navigateTo('coverage'); }}>
                  <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Enter coordinate/address..." 
                        className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                  <button type="submit" className="w-full py-4 bg-brand-500 text-brand-950 font-bold rounded-2xl shadow-retro hover:shadow-retro-hover transition-all flex items-center justify-center uppercase tracking-widest text-xs">
                    Begin Extraction
                  </button>
               </form>

               <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] text-muted font-bold uppercase tracking-widest">Active Latency</span>
                    <span className="text-brand-400 font-mono text-lg">2ms</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] text-muted font-bold uppercase tracking-widest">Uptime Pulse</span>
                    <span className="text-brand-400 font-mono text-lg">99.9%</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
