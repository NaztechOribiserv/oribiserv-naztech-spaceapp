import React, { useState } from 'react';
import { 
  LucideMenu, LucideX, LucidePhone, LucideMessageCircle, LucideGlobe, 
  LucideCreditCard, LucideTicket, LucideBriefcase, LucideShoppingBag, 
  LucideActivity, LucideShoppingCart, LucideWifi, LucideMapPin, LucideLogOut,
  LucideShield, LucideGift, LucideUser, LucideExternalLink, LucideZap, LucideArrowRight
} from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../AuthContext';
import { auth } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

import { SupportHub } from './SupportHub';

import { ServiceStatus } from './LandingScrolls';

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: <LucideGlobe size={18} /> },
    { id: 'products', label: 'Internet', icon: <LucideWifi size={18} /> },
    { id: 'coverage', label: 'Coverage', icon: <LucideMapPin size={18} /> },
    { id: 'store', label: 'Store', icon: <LucideShoppingBag size={18} /> },
    ...(user ? [
      { id: 'pulse', label: 'Performance', icon: <LucideZap size={18} /> },
      { id: 'rewards', label: 'Rewards', icon: <LucideGift size={18} /> },
      { id: 'member-card', label: 'Member Card', icon: <LucideUser size={18} /> }
    ] : []),
    { id: 'services', label: 'Services', icon: <LucideBriefcase size={18} /> },
    { id: 'balance', label: 'Account', icon: <LucideCreditCard size={18} /> },
    { id: 'support', label: 'Support', icon: <LucideTicket size={18} /> },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: <LucideShield size={18} /> }] : []),
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    onNavigate('home');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#04101a]">
      <ServiceStatus />
      
      {/* Top Bar - Professional Contact Info */}
      <div className="bg-[#050f1a]/90 backdrop-blur-md text-white text-[0.65rem] py-2 px-4 flex flex-col md:flex-row justify-between items-center gap-2 z-50 border-b border-white/5 uppercase tracking-widest font-bold">
        <div className="flex items-center space-x-6">
          <span className="opacity-70 flex items-center"><LucideMessageCircle size={10} className="mr-1.5 text-brand-500" /> WhatsApp: <a href="https://wa.me/27798983375" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 transition-colors ml-1">079 898 3375</a></span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="opacity-70">Email: <a href="mailto:info@naztech.space" className="hover:text-brand-300 transition-colors">info@naztech.space</a></span>
          {user && (
            <button onClick={handleLogout} className="flex items-center text-red-400 hover:text-red-300 transition-colors">
              <LucideLogOut size={12} className="mr-1" /> Logout
            </button>
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav className="site-header sticky top-0 z-50 backdrop-blur-md bg-[#050f1a]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
              <Logo className="w-12 h-12" />
              <div className="ml-3 flex flex-col">
                <span className="font-display font-extrabold text-xl text-white tracking-widest leading-none group-hover:text-brand-500 transition-colors">ORIBISERV</span>
                <span className="text-[0.55rem] text-brand-400 font-mono uppercase tracking-[0.2em] mt-1">IT Solutions & Beyond</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activePage === item.id
                      ? 'text-white bg-white/10 shadow-inner'
                      : 'text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`mb-1.5 ${activePage === item.id ? 'text-brand-500' : 'opacity-70'}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              
              <div className="h-8 w-px bg-white/10 mx-3" />
              
              <a 
                href="https://naztech.space/crm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center px-4 py-1.5 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest text-brand-500 hover:bg-brand-500/10 transition-all duration-300 border border-brand-500/20"
              >
                <LucideExternalLink size={18} className="mb-1.5" />
                <span>Client Portal</span>
              </a>

              {user && (
                <button
                  onClick={() => handleNavClick('checkout')}
                  className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activePage === 'checkout'
                      ? 'bg-brand-500 text-[#032137] shadow-lg shadow-brand-500/20'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <LucideShoppingCart size={18} className="mb-1.5" />
                  <span>Cart</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center xl:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <LucideX size={24} /> : <LucideMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#050f1a] border-t border-white/10 p-4 space-y-2 animate-in slide-in-from-top duration-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${
                  activePage === item.id
                    ? 'text-white bg-white/10'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={activePage === item.id ? 'text-brand-500' : 'opacity-70'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            
            <a 
              href="https://naztech.space/crm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-500 bg-brand-500/10 border border-brand-500/20"
            >
              <LucideExternalLink size={18} />
              <span>Client Portal</span>
            </a>

            {user && (
              <button
                onClick={() => handleNavClick('checkout')}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${
                  activePage === 'checkout'
                    ? 'bg-brand-500 text-[#032137]'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <LucideShoppingCart size={18} />
                <span>Cart</span>
              </button>
            )}
            
            {user ? (
              <div className="space-y-2 mt-4 border-t border-white/5 pt-4">
                <div className="px-4 py-2 bg-brand-500/10 rounded-xl border border-brand-500/20">
                  <p className="text-[0.6rem] text-brand-400 font-bold uppercase tracking-widest mb-2">Member Perks</p>
                  <ul className="space-y-1 text-[0.65rem] text-muted font-medium">
                    <li className="flex items-center"><span className="w-1 h-1 bg-brand-500 rounded-full mr-2" /> Priority Support</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-brand-500 rounded-full mr-2" /> Exclusive Member Deals</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-brand-500 rounded-full mr-2" /> Network Health Check</li>
                  </ul>
                </div>
                <a 
                  href="https://wa.me/27798983375" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  <LucideMessageCircle size={18} />
                  <span>Chat to a Human</span>
                </a>
                <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-colors">
                  <LucideLogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button onClick={() => handleNavClick('balance')} className="w-full py-4 bg-brand-500 text-[#032137] font-bold rounded-xl uppercase tracking-widest text-xs mt-4">
                Login / Register
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-20 border-t-4 border-[#04101a] bg-[#050f1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 circuit-bg pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-8 group cursor-pointer" onClick={() => handleNavClick('home')}>
                <div className="bg-brand-500/10 p-3 rounded-2xl border border-brand-500/20 group-hover:shadow-retro-brand transition-all">
                  <Logo className="w-12 h-12" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-2xl text-white tracking-widest leading-none">ORIBISERV</span>
                  <span className="text-[0.6rem] text-brand-400 font-mono uppercase tracking-[0.3em] mt-1">IT Solutions & Beyond</span>
                </div>
              </div>
              <p className="text-muted text-lg max-w-md leading-relaxed mb-8 border-l-2 border-brand-500/30 pl-6">
                Redefining the standard for IT infrastructure since inception. We deliver high-speed connectivity, mission-critical security, and elite strategy.
              </p>
              <div className="flex flex-col space-y-4">
                <div className="text-brand-500 font-bold flex items-center hover:text-brand-400 transition-colors cursor-pointer">
                  <LucideGlobe size={18} className="mr-3" /> info@naztech.space
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 flex items-center">
                <span className="w-2 h-2 bg-brand-500 rounded-full mr-3" />
                Sectors
              </h4>
              <ul className="space-y-4 text-muted text-sm font-bold uppercase tracking-wider">
                <li><button onClick={() => handleNavClick('products')} className="hover:text-brand-500 transition-colors text-left flex items-center group"><LucideArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Internet</button></li>
                <li><button onClick={() => handleNavClick('coverage')} className="hover:text-brand-500 transition-colors text-left flex items-center group"><LucideArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Coverage</button></li>
                <li><button onClick={() => handleNavClick('store')} className="hover:text-brand-500 transition-colors text-left flex items-center group"><LucideArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Store</button></li>
                <li><button onClick={() => handleNavClick('services')} className="hover:text-brand-500 transition-colors text-left flex items-center group"><LucideArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Consulting</button></li>
              </ul>
            </div>
            
            <div className="bg-brand-500/5 p-8 rounded-3xl border border-brand-500/10 shadow-retro-brand">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 flex items-center">
                <span className="w-2 h-2 bg-brand-500 rounded-full mr-3" />
                Uplink
              </h4>
              <ul className="space-y-4 text-muted text-sm font-bold uppercase tracking-wider">
                <li><button onClick={() => handleNavClick('support')} className="hover:text-brand-500 transition-colors text-left flex items-center group"><LucideArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Support</button></li>
                <li><button onClick={() => handleNavClick('balance')} className="hover:text-brand-500 transition-colors text-left flex items-center group"><LucideArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Account</button></li>
                <li><a href="https://wa.me/27798983375" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors flex items-center group"><LucideArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Engineer Chat</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t-2 border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
               <p className="text-muted text-[0.7rem] uppercase tracking-[0.3em] font-black mb-1">
                 © {new Date().getFullYear()} OribiServ HQ
               </p>
               <p className="text-brand-500/40 text-[0.55rem] uppercase tracking-[0.5em] font-bold">
                 Architected for Digital Sovereignty
               </p>
            </div>
            <div className="flex space-x-12 text-muted text-[0.65rem] uppercase tracking-[0.2em] font-black">
              <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors">Privacy Protocol</button>
              <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors">Service Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


// Helper Icon component for Nav
const LucideWifiIcon = ({size, className}: {size?: number, className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
);
