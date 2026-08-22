import React, { useState, useEffect } from 'react';
import { Layout as PortalLayout } from './components/Layout';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { ITServices } from './components/ITServices';
import { BalanceCheck } from './components/BalanceCheck';
import { TicketForm } from './components/TicketForm';
import { SupportHub } from './components/SupportHub';
import { TechNews } from './components/TechNews';
import { ServiceStatus, ConnectivityScroll, AutomationSecurityScroll, EcosystemScroll } from './components/LandingScrolls';

import { Store } from './components/Store';
import { NetworkPulse } from './components/NetworkPulse';
import { FloatingMascot } from './components/FloatingMascot';
import { Checkout } from './components/Checkout';
import { CoverageCheck } from './components/CoverageCheck';
import { Rewards } from './components/Rewards';
import { MemberCard } from './components/MemberCard';
import { AuthProvider, useAuth } from './AuthContext';
import { Auth } from './components/Auth';
import { LucideWifi, LucideWrench, LucideHome, LucideCpu, LucideArrowRight, LucideZap, LucideShieldCheck, LucideShoppingBag, LucideLock, LucideGlobe, LucideMessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// OribiLedger Imports
import { LedgerLayout } from './layout/LedgerLayout';
import { Dashboard as LedgerDashboard } from './pages/Dashboard';
import { CRM as LedgerCRM } from './pages/CRM';
import { Invoices as LedgerInvoices } from './pages/Invoices';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    (window as any).navigateTo = setActivePage;
    return () => {
      delete (window as any).navigateTo;
    };
  }, []);

  // Determine if we are in the Ledger (Admin/Accounting) views
  const isLedgerView = ['dashboard', 'accounting', 'invoices', 'payments', 'crm', 'inventory', 'projects', 'settings'].includes(activePage);

  if (isLedgerView) {
    // If not admin, you shouldn't be here, but for demo we allow it or check auth
    // In production, we'd wrap this in a strict auth check
    return (
      <LedgerLayout activeView={activePage} onNavigate={setActivePage}>
        <AnimatePresence mode="wait">
          {activePage === 'dashboard' && <motion.div key="dashboard" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><LedgerDashboard /></motion.div>}
          {activePage === 'crm' && <motion.div key="crm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><LedgerCRM /></motion.div>}
          {activePage === 'invoices' && <motion.div key="invoices" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><LedgerInvoices /></motion.div>}
          {/* We will add more ledger pages incrementally */}
        </AnimatePresence>
      </LedgerLayout>
    );
  }

  const renderContent = () => {
    // Protected pages
    if ((activePage === 'balance' || activePage === 'checkout' || activePage === 'rewards' || activePage === 'member-card') && !user) {
      return (
        <motion.div
          key="auth"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "circOut" }}
        >
          <Auth onSuccess={() => {}} />
        </motion.div>
      );
    }

    // Store Access Prompt for non-logged in users
    if (activePage === 'store' && !user) {
      return (
        <div className="py-24 px-4 max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface/40 backdrop-blur-xl rounded-[3rem] p-16 border border-white/10 shadow-2xl inline-block max-w-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-brand-500/10 flex items-center justify-center mb-8 border border-brand-500/20 mx-auto">
              <LucideLock className="text-brand-500" size={32} />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Member Exclusive Store</h2>
            <p className="text-muted text-lg mb-10 leading-relaxed">Login to access member deals, exclusive hardware, and specialized services at discounted rates.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setActivePage('balance')}
                className="w-full sm:w-auto px-12 py-4 bg-brand-500 text-[#032137] font-bold rounded-2xl shadow-xl hover:bg-brand-600 transition-all transform hover:scale-105 active:scale-95"
              >
                Login to Portal
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    switch (activePage) {
      case 'home':
      case 'portal':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onCtaClick={() => setActivePage('products')} />
            
            <ConnectivityScroll />
            <AutomationSecurityScroll />
            <EcosystemScroll />

            {/* News & Strategy Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <TechNews />
                </div>
                
                <div className="lg:col-span-2 space-y-8">
                     <div className="bg-surface/60 backdrop-blur-md rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between border border-white/10">
                        <div className="mb-6 md:mb-0 max-w-md">
                           <h3 className="text-2xl font-bold text-white mb-2">Build Your Technical Roadmap</h3>
                           <p className="text-muted leading-relaxed">Strategic IT consulting to help your business transition from legacy systems to elite cloud infrastructure.</p>
                        </div>
                        <button onClick={() => setActivePage('services')} className="px-10 py-5 bg-brand-500 text-[#032137] shadow-xl shadow-brand-500/10 font-bold rounded-2xl hover:bg-brand-600 transition-all uppercase tracking-widest text-xs">
                           Consult Now
                        </button>
                     </div>

                     <div className="bg-gradient-to-br from-brand-900/50 to-brand-500/10 backdrop-blur-md rounded-[3rem] p-12 text-white border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-10 circ-bg group-hover:opacity-20 transition-opacity" />
                        <h3 className="text-3xl font-display font-bold mb-4 relative z-10">OribiLedger Platform</h3>
                        <p className="mb-10 text-brand-100 max-w-xl relative z-10 leading-relaxed font-medium">South Africa's premiere IT freelancer accounting software. Manage quotes, hardware inventory, and CRM all in one place.</p>
                        <button onClick={() => setActivePage('dashboard')} className="bg-white text-brand-900 font-bold py-4 px-12 rounded-2xl shadow-2xl transition-all transform hover:scale-105 relative z-10 uppercase tracking-widest text-xs">
                           Access Ledger
                        </button>
                     </div>
                </div>
            </div>
          </motion.div>
        );
      case 'products':
        return <motion.div key="products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}><Products onCheckCoverage={() => setActivePage('coverage')} /></motion.div>;
      case 'coverage':
        return <motion.div key="coverage" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}><CoverageCheck onNavigate={setActivePage} /></motion.div>;
      case 'store':
        return <motion.div key="store" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}><Store onNavigate={setActivePage} /></motion.div>;
      case 'pulse':
        return <motion.div key="pulse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}><NetworkPulse /></motion.div>;
      case 'checkout':
        return <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}><Checkout onNavigate={setActivePage} /></motion.div>;
      case 'services':
        return <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}><ITServices /></motion.div>;
      case 'rewards':
        return <motion.div key="rewards" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}><Rewards /></motion.div>;
      case 'member-card':
        return <motion.div key="card" initial={{ opacity: 0, rotateY: 20 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -20 }} transition={{ duration: 0.6 }}><MemberCard /></motion.div>;
      case 'balance':
        return (
          <motion.div 
            key="balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="py-16 px-4"
          >
             <BalanceCheck />
          </motion.div>
        );
      case 'support':
        return (
          <motion.div 
            key="support"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-4"
          >
             <div className="text-center mb-12">
               <h2 className="text-4xl font-display font-bold text-white mb-4">Strategic Engineering Support</h2>
               <p className="max-w-xl mx-auto text-lg text-brand-200">Encountering an infrastructure bottleneck? Our engineers are on standby.</p>
             </div>
             <TicketForm />
          </motion.div>
        );
      case 'admin':
        return (
          <div className="py-24 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-white mb-8">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">OribiLedger</h3>
                <p className="text-muted text-sm mb-6">Launch the accounting, inventory, and CRM platform.</p>
                <button 
                  onClick={() => setActivePage('dashboard')}
                  className="w-full py-3 bg-brand-500 text-[#032137] font-bold rounded-xl flex items-center justify-center"
                >
                  Access Ledger
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <Hero onCtaClick={() => setActivePage('products')} />;
    }
  };

  return (
    <>
      <PortalLayout activePage={activePage} onNavigate={setActivePage}>
        <AnimatePresence mode="wait">
            {renderContent()}
        </AnimatePresence>
      </PortalLayout>
      <SupportHub />
      <FloatingMascot />
      
      {/* Floating WhatsApp Action */}
      <motion.a 
        href="https://wa.me/27798983375"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 border-4 border-white/10 group"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#050f1a] text-white text-[0.6rem] px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold uppercase tracking-widest pointer-events-none">
          Live Engineer
        </div>
        <LucideMessageCircle size={28} />
      </motion.a>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
