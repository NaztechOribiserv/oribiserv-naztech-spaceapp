import React, { useState } from 'react';
import { LucideWifi, LucideZap, LucideDownload, LucideCheck, LucideSignal, LucideArrowRight, LucideSearch } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

interface ProductsProps {
  onCheckCoverage: () => void;
}

export const Products: React.FC<ProductsProps> = ({ onCheckCoverage }) => {
  const [activeTab, setActiveTab] = useState<'fibre' | 'lte' | '5g'>('fibre');

  const pricingData = {
    fibre: [
      { name: "Fibre Starter", speed: "25/25 Mbps", price: "499", features: ["Uncapped & Unshaped", "Free Installation", "Free Router", "24/7 Support"] },
      { name: "Fibre Pro", speed: "50/50 Mbps", price: "749", features: ["Uncapped & Unshaped", "Free Installation", "Free Router", "Priority Support"], popular: true },
      { name: "Fibre Ultra", speed: "100/100 Mbps", price: "999", features: ["Uncapped & Unshaped", "Free Installation", "Premium Router", "Business Grade SLA"] },
    ],
    lte: [
      { name: "LTE Basic", speed: "Up to 50 Mbps", price: "299", features: ["Uncapped Data", "Plug & Play", "Month-to-Month", "Free Shipping"] },
      { name: "LTE Plus", speed: "Up to 100 Mbps", price: "449", features: ["Uncapped Data", "Plug & Play", "Free LTE Router", "Priority Support"], popular: true },
      { name: "LTE Max", speed: "Up to 150 Mbps", price: "649", features: ["Uncapped Data", "Plug & Play", "High-Gain Router", "Business Grade SLA"] },
    ],
    '5g': [
      { name: "5G Starter", speed: "Up to 200 Mbps", price: "599", features: ["Uncapped Data", "Ultra-Low Latency", "Plug & Play", "Free 5G Router"] },
      { name: "5G Pro", speed: "Up to 500 Mbps", price: "849", features: ["Uncapped Data", "Ultra-Low Latency", "Free 5G Router", "Priority Support"], popular: true },
      { name: "5G Ultra", speed: "Up to 1 Gbps", price: "1299", features: ["Uncapped Data", "Ultra-Low Latency", "Premium 5G Router", "Business Grade SLA"] },
    ]
  };

  const tabs = [
    { id: 'fibre', label: 'Fibre', icon: <LucideZap size={18} /> },
    { id: 'lte', label: 'LTE-A', icon: <LucideWifi size={18} /> },
    { id: '5g', label: '5G', icon: <LucideSignal size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="p-6 bg-surface/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/10 glow-orb">
            <Logo className="w-16 h-16" />
          </div>
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-6">Fast Internet <span className="text-brand-500">Packages</span></h2>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-10">Clear pricing for Fibre, LTE, and 5G. No hidden fees, just stable connections for your home or office.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onCheckCoverage}
            className="flex items-center px-10 py-4 bg-brand-500 text-[#032137] font-bold rounded-2xl shadow-xl hover:bg-brand-600 transition-all transform hover:scale-105 group active:scale-95"
          >
            <LucideSearch size={20} className="mr-3" />
            Check Coverage in Your Area
            <LucideArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Pricing Tabs */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex p-2 bg-surface/40 backdrop-blur-md rounded-[2rem] border border-white/5 shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-8 py-4 rounded-[1.5rem] text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-500 text-[#032137] shadow-xl'
                  : 'text-muted hover:text-brand-500'
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pricingData[activeTab].map((pkg, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative bg-surface/40 backdrop-blur-md rounded-[3rem] shadow-2xl overflow-hidden border-2 flex flex-col transition-all hover:-translate-y-2 ${pkg.popular ? 'border-brand-500/50 ring-8 ring-brand-500/5' : 'border-white/5'}`}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 bg-brand-500 text-[#032137] text-[0.65rem] font-bold px-6 py-2 rounded-bl-[1.5rem] uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className={`p-10 ${pkg.popular ? 'bg-brand-500/5' : ''}`}>
              <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{pkg.name}</h3>
              <div className="flex items-baseline text-white mb-6">
                <span className="text-5xl font-display font-bold tracking-tight">R{pkg.price}</span>
                <span className="ml-2 text-lg font-medium text-muted">/mo</span>
              </div>
              <div className="flex items-center text-sm text-brand-400 font-bold bg-brand-500/10 px-4 py-2 rounded-xl w-fit">
                 <LucideDownload size={18} className="mr-3"/> {pkg.speed}
              </div>
            </div>

            <div className="flex-1 p-10 flex flex-col justify-between border-t border-white/5">
              <ul className="space-y-5">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-sm text-muted font-medium">
                    <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <LucideCheck size={12} className="text-brand-500" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://naztech.space/crm"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-12 w-full py-5 px-8 rounded-2xl shadow-xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center ${pkg.popular ? 'bg-brand-500 text-[#032137] hover:bg-brand-600 shadow-brand-500/20' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
              >
                Get Connected
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Campaign Banner */}
      <div className="mt-24 bg-gradient-to-br from-brand-900 to-[#04101a] rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl border border-white/10">
         <div className="absolute inset-0 opacity-10 circuit-bg pointer-events-none" />
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="text-center lg:text-left">
                <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Enterprise <span className="text-brand-500">Solutions</span></h3>
                <p className="text-muted text-lg max-w-2xl leading-relaxed mb-10">
                    Need dedicated fibre or high-capacity wireless for your office? ORIBISERV provides enterprise-grade solutions with 99.99% uptime and dedicated engineering support.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                  <div className="flex items-center text-sm font-bold tracking-wide"><LucideCheck className="text-brand-500 mr-3" size={20}/> Dedicated Bandwidth</div>
                  <div className="flex items-center text-sm font-bold tracking-wide"><LucideCheck className="text-brand-500 mr-3" size={20}/> 4-Hour SLA</div>
                  <div className="flex items-center text-sm font-bold tracking-wide"><LucideCheck className="text-brand-500 mr-3" size={20}/> Static IP Included</div>
                </div>
            </div>
            <a 
                href="https://naztech.space/crm"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap bg-brand-500 text-[#032137] px-12 py-5 rounded-2xl font-bold shadow-2xl hover:bg-brand-600 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
                Request Enterprise Quote
            </a>
         </div>
         <LucideZap className="absolute -right-20 -bottom-20 text-brand-500 opacity-5 -rotate-12" size={400} />
      </div>
    </div>
  );
};
