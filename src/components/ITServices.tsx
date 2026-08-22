import React, { useState } from 'react';
import { LucideMonitor, LucideServer, LucideGlobe, LucideCpu, LucideBriefcase, LucideShieldCheck, LucideWrench, LucideHome, LucideZap, LucideChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

export const ITServices: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const services = [
    {
      title: "ISP Services",
      description: "Ultra-fast Fibre, 5G, and LTE connectivity solutions with 99.9% uptime and local support.",
      icon: <LucideGlobe size={32} className="text-brand-500" />,
      color: "bg-brand-500/10",
      details: "Get dedicated bandwidth for your business or home office with our premium ISP packages."
    },
    {
      title: "Network Installations",
      description: "Professional structural cabling, Wi-Fi mesh optimization, and server room setups for home and office.",
      icon: <LucideZap size={32} className="text-brand-500" />,
      color: "bg-brand-500/10",
      details: "Our certified technicians ensure your local network is scalable, secure, and interference-free."
    },
    {
      title: "Domain & Hosting",
      description: "Secure web hosting, domain registration, and enterprise email solutions (Microsoft 365/Google Workspace).",
      icon: <LucideServer size={32} className="text-brand-500" />,
      color: "bg-brand-500/10",
      details: "High-performance servers with SSD storage and enterprise-grade security for your digital assets."
    },
    {
      title: "Website Development",
      description: "High-performance business websites, e-commerce platforms, and custom web applications tailored to your brand.",
      icon: <LucideMonitor size={32} className="text-brand-400" />,
      color: "bg-brand-400/10",
      details: "Custom solutions built on modern tech stacks like React and Node.js for maximum performance."
    },
    {
      title: "Computer Repair",
      description: "Professional diagnostics and hardware repairs for laptops, desktops, and servers. Quick turnaround guaranteed.",
      icon: <LucideWrench size={32} className="text-brand-400" />,
      color: "bg-brand-400/10",
      details: "From component-level fixes to OS optimizations, we restore your productivity quickly."
    },
    {
      title: "Software Solutions",
      description: "Expert implementation of ERP/CRM systems, specializing in localhost systems like Dolibarr for business management.",
      icon: <LucideCpu size={32} className="text-brand-500" />,
      color: "bg-brand-500/10",
      details: "We specialize in Dolibarr CRM/ERP deployment on local servers to keep your business data private."
    },
    {
      title: "System Security",
      description: "Advanced cybersecurity audits, firewall management, and 4K AI-powered surveillance solutions.",
      icon: <LucideShieldCheck size={32} className="text-brand-400" />,
      color: "bg-brand-400/10",
      details: "Protect your intellectual property with our comprehensive multi-layer security protocols."
    },
    {
      title: "Home Automation",
      description: "Smart lighting, security systems, and climate control integrated into a single, easy-to-use interface.",
      icon: <LucideHome size={32} className="text-brand-300" />,
      color: "bg-brand-300/10",
      details: "Turn your living space into an intelligent environment that learns and adapts to your lifestyle."
    },
    {
      title: "IT Consulting",
      description: "Strategic technology planning to help your business scale efficiently and securely.",
      icon: <LucideBriefcase size={32} className="text-brand-300" />,
      color: "bg-brand-300/10",
      details: "Get expert advice on infrastructure scaling, technical strategy, and digital transformation."
    }
  ];

  return (
    <div className="py-24 bg-[#04101a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="p-4 bg-surface/50 backdrop-blur-xl rounded-3xl border border-white/10 glow-orb">
              <Logo className="w-16 h-16" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-brand-500 font-bold tracking-[0.4em] uppercase mb-4"
          >
            Core Infrastructure Specialists
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-6"
          >
            Elite Technology <span className="text-brand-500">Architecture</span>
          </motion.p>
          <p className="max-w-2xl text-lg text-muted mx-auto leading-relaxed">
            We don't just provide services; we design and deploy the technical foundations that empower your business to grow without limits.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div 
              key={idx} 
              layout
              onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer group bg-surface/40 backdrop-blur-md p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                activeIdx === idx 
                  ? 'border-brand-500 ring-2 ring-brand-500/20 scale-105 z-20 shadow-[0_0_50px_rgba(128,90,248,0.15)]' 
                  : 'border-white/5 hover:border-brand-500/30'
              }`}
            >
              <div className={`rounded-2xl inline-flex p-4 ${service.color} border border-white/5 shadow-inner mb-8 transition-transform duration-500 group-hover:scale-110`}>
                {service.icon}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-500 transition-colors flex items-center">
                  {service.title}
                  {activeIdx === idx && (
                    <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="ml-2">
                       <LucideChevronRight size={18} className="text-brand-500" />
                    </motion.span>
                  )}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {service.description}
                </p>
                
                <AnimatePresence>
                  {activeIdx === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-white/10"
                    >
                      <p className="text-xs text-brand-400 font-bold uppercase tracking-widest mb-2">Service Highlight</p>
                      <p className="text-sm text-white/80 leading-relaxed font-medium">
                        {service.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="absolute top-8 right-8 text-white/5 group-hover:text-brand-500/20 transition-colors">
                <LucideBriefcase size={40} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 bg-surface/30 backdrop-blur-xl rounded-[4rem] p-12 text-center border border-white/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 circuit-bg pointer-events-none" />
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 relative z-10">Launch Your <span className="text-brand-500">Elite Infrastructure</span></h3>
          <p className="text-muted max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed font-medium">
            Contact ORIBISERV today for professional Dolibarr implementation, core network upgrades, or enterprise-grade server procurement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
             <a href="tel:0878213442" className="inline-flex items-center px-10 py-5 border border-transparent text-sm font-bold rounded-2xl shadow-2xl text-[#032137] bg-brand-500 hover:bg-brand-600 transition-all transform hover:scale-105 uppercase tracking-widest">
               Call Strategist
             </a>
             <a href="https://naztech.space/doli/index.php?mainmenu=home&leftmenu=home" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-10 py-5 border border-brand-500/20 shadow-xl text-sm font-bold rounded-2xl text-brand-500 bg-brand-500/10 hover:bg-brand-500/20 transition-all transform hover:scale-105 uppercase tracking-widest">
               Client Portal
             </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
