import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { LucideDownload, LucideQrCode, LucideShieldCheck, LucideWifi, LucideCpu } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { Logo } from './Logo';

export const MemberCard: React.FC = () => {
  const { user, membershipTier } = useAuth();
  const cardRef = useRef<HTMLDivElement>(null);

  const memberId = user?.uid ? `ORB-${user.uid.substring(0, 8).toUpperCase()}` : 'ORB-GUEST';

  const downloadCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1012;
    canvas.height = 638;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 1012, 638);
    if (membershipTier === 'Premium') {
      gradient.addColorStop(0, '#805AF8');
      gradient.addColorStop(0.5, '#0B2234');
      gradient.addColorStop(1, '#04101a');
    } else if (membershipTier === 'Plus') {
      gradient.addColorStop(0, '#5dd9ea');
      gradient.addColorStop(0.5, '#0d9488');
      gradient.addColorStop(1, '#030c16');
    } else {
      gradient.addColorStop(0, '#374151');
      gradient.addColorStop(1, '#000000');
    }
    
    ctx.fillStyle = gradient;
    ctx.roundRect?.(0, 0, 1012, 638, 40);
    ctx.fill();

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.fillText('ORIBISERV', 80, 100);
    
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('MEMBER NAME', 80, 450);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px Inter, sans-serif';
    ctx.fillText(user?.displayName || 'Valued Member', 80, 510);
    
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('MEMBER ID', 80, 580);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px monospace';
    ctx.fillText(memberId, 240, 580);

    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillStyle = membershipTier === 'Premium' ? '#5dd9ea' : '#ffffff';
    ctx.fillText(`${membershipTier} Member`, 750, 100);

    // Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `ORIBISERV-${memberId}.png`;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Virtual <span className="text-brand-500">Membership</span> Card</h2>
        <p className="text-muted max-w-2xl mx-auto">Your digital key to OribiServ services. Present this card for priority support and in-store benefits.</p>
      </div>

      <div className="flex flex-col items-center gap-12">
        {/* The Card */}
        <motion.div 
          ref={cardRef}
          initial={{ rotateY: -20, opacity: 0, scale: 0.9 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          whileHover={{ rotateY: 5, rotateX: 5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-md aspect-[1.586/1] rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-default perspective-1000"
        >
          {/* Card Background */}
          <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-500 ${
            membershipTier === 'Premium' ? 'from-brand-600 via-brand-900 to-[#04101a]' :
            membershipTier === 'Plus' ? 'from-brand-500 via-brand-800 to-[#030c16]' :
            'from-gray-700 via-gray-900 to-black'
          }`} />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10 circuit-bg pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl" />

          {/* Card Content */}
          <div className="relative h-full p-8 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                  <Logo size={32} />
                </div>
                <span className="font-display font-bold text-white tracking-widest text-lg">ORIBISERV</span>
              </div>
              <div className={`px-4 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-[0.2em] border border-white/20 backdrop-blur-md ${
                membershipTier === 'Premium' ? 'bg-brand-500 text-[#032137]' : 'bg-white/10 text-white'
              }`}>
                {membershipTier} Member
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[0.6rem] text-white/50 uppercase tracking-widest font-bold mb-1">Member Name</p>
                <h4 className="text-xl font-bold text-white tracking-tight">{user?.displayName || 'Valued Member'}</h4>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[0.6rem] text-white/50 uppercase tracking-widest font-bold mb-1">Member ID</p>
                  <p className="font-mono text-lg text-white tracking-widest">{memberId}</p>
                </div>
                <div className="p-3 bg-white rounded-xl shadow-inner">
                  <LucideQrCode size={48} className="text-[#032137]" />
                </div>
              </div>
            </div>
          </div>

          {/* Glass Overlay */}
          <div className="absolute inset-0 border border-white/20 rounded-[2.5rem] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </motion.div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={downloadCard}
            className="flex items-center px-10 py-4 bg-brand-500 text-[#032137] font-bold rounded-2xl shadow-xl hover:bg-brand-600 transition-all transform hover:scale-105 active:scale-95 group"
          >
            <LucideDownload size={20} className="mr-3 group-hover:-translate-y-1 transition-transform" />
            Save to Device
          </button>
          <div className="flex items-center gap-8 px-8 py-4 bg-surface/40 backdrop-blur-md rounded-2xl border border-white/5">
            <div className="flex items-center text-xs font-bold text-white/70 uppercase tracking-widest">
              <LucideShieldCheck size={16} className="text-brand-500 mr-2" />
              Verified
            </div>
            <div className="flex items-center text-xs font-bold text-white/70 uppercase tracking-widest">
              <LucideWifi size={16} className="text-brand-500 mr-2" />
              Active
            </div>
            <div className="flex items-center text-xs font-bold text-white/70 uppercase tracking-widest">
              <LucideCpu size={16} className="text-brand-500 mr-2" />
              NFC Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
