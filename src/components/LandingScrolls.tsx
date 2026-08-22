import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LucideGlobe, LucideWrench, LucideCloud, LucideCheckCircle2, LucideAlertCircle } from 'lucide-react';

export const ServiceStatus: React.FC = () => {
  const [status, setStatus] = React.useState({
    fiber: 'operational',
    lte: 'operational',
    hosting: 'operational',
    lastChecked: new Date().toLocaleTimeString()
  });

  // Simulate Axxess Status Sync
  React.useEffect(() => {
    const updateStatus = () => {
      // Logic would normally fetch from axxess.statuspage.io or similar
      setStatus(prev => ({
        ...prev,
        lastChecked: new Date().toLocaleTimeString()
      }));
    };
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (s: string) => {
    switch(s) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'outage': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-[#050f1a] border-y border-white/5 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${getStatusColor(status.fiber)} rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse`} />
            <span className="text-[0.6rem] font-bold text-white uppercase tracking-widest leading-none">Fiber: Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${getStatusColor(status.lte)} rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]`} />
            <span className="text-[0.6rem] font-bold text-white uppercase tracking-widest leading-none">LTE/5G: Optimized</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${getStatusColor(status.hosting)} rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse`} />
            <span className="text-[0.6rem] font-bold text-white uppercase tracking-widest leading-none">Cloud Hosting: Stable</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[0.55rem] text-muted font-mono uppercase">Synced with Axxess Backbone: {status.lastChecked}</span>
          <div className="flex items-center gap-2 text-brand-500 text-[0.6rem] font-bold uppercase tracking-widest">
            <LucideCheckCircle2 size={12} />
            Systems Normal
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConnectivityScroll: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [-500, 500]);

  return (
    <section className="py-32 bg-[#04101a] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-hidden pointer-events-none opacity-5">
        <motion.div style={{ x }} className="text-[20vw] font-display font-black whitespace-nowrap text-white">
          UNINTERRUPTED UNINTERRUPTED UNINTERRUPTED
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tighter">Speed without the Stress.</h2>
          <p className="text-lg text-muted leading-relaxed font-medium mb-8 border-l-4 border-brand-500 pl-6 py-2">
            Whether it’s high-speed Fiber for the office or 5G for the home, we keep you in the stream. No lag. No limits. Just pure performance.
          </p>
          <button 
            onClick={() => (window as any).navigateTo?.('coverage')}
            className="px-8 py-4 bg-brand-500 text-[#032137] font-bold rounded-2xl shadow-retro hover:shadow-retro-hover transition-all active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-widest text-xs"
          >
            Check Coverage
          </button>
        </div>
        <div className="flex-1 w-full aspect-video rounded-[3rem] bg-brand-950 border-4 border-[#04101a] brutal-card relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-brand-500/10 rounded-full blur-3xl animate-pulse" />
           </div>
        </div>
      </div>
    </section>
  );
};

export const AutomationSecurityScroll: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.1, 1, 0.1]);

  return (
    <section className="py-32 bg-[#030c16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ opacity }} className="text-center mb-24">
          <h3 className="text-2xl md:text-4xl font-display font-bold text-brand-500 tracking-widest uppercase">
            ALWAYS WATCHING. ALWAYS SMART.
          </h3>
        </motion.div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tighter uppercase">Your World, Under Control.</h2>
            <p className="text-lg text-muted leading-relaxed font-medium mb-8 border-r-4 border-brand-500 pr-6 py-2 text-right">
              Elevate your environment with intelligent CCTV and seamless automation. From TV boxes that entertain to smart systems that protect—take command from the palm of your hand.
            </p>
            <div className="flex justify-end">
                <button 
                onClick={() => (window as any).navigateTo?.('store')}
                className="px-8 py-4 bg-white/5 text-white border-2 border-white/10 font-bold rounded-2xl shadow-retro hover:shadow-retro-hover transition-all active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-widest text-xs"
                >
                Explore Smart Tech
                </button>
            </div>
          </div>
          <div className="flex-1 w-full aspect-square md:aspect-video rounded-[3rem] bg-brand-950 border-4 border-[#04101a] brutal-card relative overflow-hidden">
             <div className="absolute inset-x-0 top-0 h-1 bg-brand-500/50 blur-sm" />
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-40 grayscale" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const EcosystemScroll: React.FC = () => {
  return (
    <section className="py-32 bg-[#04101a] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tighter uppercase">The Digital Backbone.</h2>
            <p className="text-lg text-muted leading-relaxed font-medium mb-10 border-l-4 border-brand-500 pl-6 py-2">
              We repair the hardware, supply the software, and host the domains. Consider us your outsourced IT department, dedicated to keeping your digital world online and optimized.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Web', icon: <LucideGlobe size={24} /> },
                { label: 'Repair', icon: <LucideWrench size={24} /> },
                { label: 'Cloud', icon: <LucideCloud size={24} /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, x: -5 }}
                  className="aspect-square rounded-3xl bg-brand-950 border-2 border-[#04101a] shadow-retro hover:shadow-retro-brand flex flex-col items-center justify-center text-brand-500 gap-3 transition-all duration-200"
                >
                  {item.icon}
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/50">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-8 w-full">
            <div className="aspect-[3/4] rounded-[2.5rem] bg-brand-950 border-4 border-[#04101a] shadow-retro p-10 flex flex-col justify-end group hover:shadow-retro-hover transition-all">
              <h4 className="text-2xl font-display font-black text-white mb-2 uppercase tracking-tight group-hover:text-brand-500 transition-colors">Hardware</h4>
              <p className="text-[0.6rem] text-muted mb-6 font-bold uppercase tracking-widest opacity-70">Supply & Support</p>
              <div className="w-full h-2 bg-brand-500/10 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    className="h-full bg-brand-500" 
                />
              </div>
            </div>
            <div className="aspect-[3/4] rounded-[2.5rem] bg-brand-500 shadow-retro-brand border-4 border-brand-950 mt-12 p-10 flex flex-col justify-end group hover:translate-y-[-4px] transition-all">
              <h4 className="text-2xl font-display font-black text-brand-950 mb-2 uppercase tracking-tight">Software</h4>
              <p className="text-[0.6rem] text-brand-900 mb-6 font-bold uppercase tracking-widest opacity-70">Licensing & Dev</p>
              <div className="w-full h-2 bg-brand-950/20 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    className="h-full bg-brand-950" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
