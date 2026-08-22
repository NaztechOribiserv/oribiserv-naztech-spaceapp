import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideMessageCircle, LucideX, LucideHeadphones, LucideBot, LucideZap, LucidePhone } from 'lucide-react';
import { ChatBot } from './ChatBot';
import { Logo } from './Logo';

export const SupportHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAi, setShowAi] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-80 bg-surface/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-6"
          >
            <div className="flex items-center space-x-4 mb-6 pt-2">
              <Logo className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-display font-bold text-white leading-none mb-1">Support Hub</h3>
                <p className="text-[0.6rem] text-brand-500 font-bold uppercase tracking-[0.2em]">Oribi is Active</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* WhatsApp Path */}
              <a 
                href="https://wa.me/27798983375"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-2xl transition-all"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-[#032137] shrink-0">
                  <LucideMessageCircle size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">Chat to a Human</p>
                  <p className="text-[0.6rem] text-muted uppercase tracking-widest font-bold">Fast Response via WhatsApp</p>
                </div>
              </a>

              {/* AI Path */}
              <button 
                onClick={() => {
                  setShowAi(true);
                  setIsOpen(false);
                }}
                className="w-full group flex items-center p-4 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 rounded-2xl transition-all text-left"
              >
                <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center text-[#032137] shrink-0">
                  <LucideBot size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-bold text-white group-hover:text-brand-400 transition-colors">Oribibot AI Strategist</p>
                  <p className="text-[0.6rem] text-muted uppercase tracking-widest font-bold">Instant IT Support & IQ</p>
                </div>
              </button>

              <div className="pt-4 border-t border-white/5">
                <a href="tel:0878213442" className="flex items-center text-[0.65rem] text-muted hover:text-white transition-colors">
                  <LucidePhone size={12} className="mr-2" /> Urgent? Call 087 821 3442
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center border-4 border-[#04101a] transition-all transform active:scale-95 z-50 ${
          isOpen ? 'bg-white/10 text-white' : 'bg-brand-500 text-[#032137]'
        }`}
      >
        {isOpen ? <LucideX size={28} /> : <LucideHeadphones size={32} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[0.6rem] font-bold px-2 py-1 rounded-full animate-bounce shadow-lg">?</span>
        )}
      </button>

      {/* AI ChatBot Overlay */}
      {showAi && (
        <ChatBot forceOpen={true} onClose={() => setShowAi(false)} />
      )}
    </div>
  );
};
