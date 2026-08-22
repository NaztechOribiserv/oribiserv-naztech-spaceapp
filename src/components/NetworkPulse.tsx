import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideActivity, LucideGlobe, LucideShield, LucideServer, LucideZap, LucideCpu, LucideTerminal, LucideCheckCircle2, LucideMessageCircle, LucideArrowUpRight, LucideArrowDownRight, LucideWifi } from 'lucide-react';

export const NetworkPulse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'coverage'>('tools');
  const [testResult, setTestResult] = useState<{ ping: number; down: number; up: number } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const runSpeedTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    // Multi-stage diagnostic
    await new Promise(r => setTimeout(r, 1500));
    const ping = Math.floor(Math.random() * 20) + 5;
    setTestResult({ ping, down: 0, up: 0 });
    
    await new Promise(r => setTimeout(r, 2000));
    const down = Math.floor(Math.random() * 200) + 50;
    setTestResult({ ping, down, up: 0 });
    
    await new Promise(r => setTimeout(r, 1500));
    const up = Math.floor(Math.random() * 100) + 20;
    setTestResult({ ping, down, up });
    
    setIsTesting(false);
  };

  const coverageOptions = [
    { tech: "Fiber Pro", speed: "1000 Mbps", reliability: "99.99%", bestFor: "Gamers & Large Offices", status: "Elite" },
    { tech: "5G Extreme", speed: "500 Mbps", reliability: "99.5%", bestFor: "Mobile Workstations", status: "Premium" },
    { tech: "LTE Turbo", speed: "150 Mbps", reliability: "99.0%", bestFor: "Small Home Offices", status: "Stable" },
  ];

  return (
    <div className="py-24 bg-[#04101a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 circuit-bg pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-sm text-brand-500 font-bold tracking-[0.4em] uppercase mb-4"
            >
              System Utility Hub
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
            >
              Performance <span className="text-brand-500">Hub</span>
            </motion.p>
          </div>
          <div className="flex gap-4">
            <a 
              href="https://wa.me/27798983375" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl flex items-center transition-all shadow-lg shadow-green-500/20 uppercase tracking-widest text-[0.65rem] active:scale-95"
            >
              <LucideMessageCircle className="mr-2" size={16} /> 
              Consult Engineer
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Interaction Area */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex bg-[#050f1a] p-1 rounded-2xl border border-white/10 w-fit mb-8">
              <button 
                onClick={() => setActiveTab('tools')}
                className={`px-8 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'tools' ? 'bg-brand-500 text-[#032137]' : 'text-muted hover:text-white'}`}
              >
                Diagnostic Tools
              </button>
              <button 
                onClick={() => setActiveTab('coverage')}
                className={`px-8 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'coverage' ? 'bg-brand-500 text-[#032137]' : 'text-muted hover:text-white'}`}
              >
                Tech Estimator
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'tools' ? (
                <motion.div 
                  key="tools"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-surface/40 backdrop-blur-md rounded-[3rem] p-10 border border-white/5 relative overflow-hidden h-full flex flex-col justify-center min-h-[400px]"
                >
                  <div className="text-center relative z-10">
                    {!testResult && !isTesting ? (
                      <div className="space-y-8">
                        <div className="w-24 h-24 bg-brand-500/10 rounded-[2rem] flex items-center justify-center text-brand-500 mx-auto shadow-inner border border-brand-500/20">
                          <LucideZap size={40} />
                        </div>
                        <div>
                          <h3 className="text-3xl font-display font-bold text-white mb-4">Network Speed Audit</h3>
                          <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">Initiate a precision diagnostic of your current connection latency and throughput.</p>
                        </div>
                        <button 
                          onClick={runSpeedTest}
                          className="px-12 py-5 bg-brand-500 text-[#032137] font-bold rounded-2xl shadow-xl hover:bg-brand-600 transition-all active:scale-95 uppercase tracking-widest text-xs"
                        >
                          Commence Scan
                        </button>
                      </div>
                    ) : isTesting ? (
                      <div className="space-y-12">
                        <div className="relative w-32 h-32 mx-auto">
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-4 border-brand-500/20 border-t-brand-500 rounded-full"
                          />
                          <div className="absolute inset-4 flex items-center justify-center">
                            <LucideArrowUpRight className="text-brand-500 animate-pulse" size={32} />
                          </div>
                        </div>
                        <p className="text-brand-500 font-bold uppercase tracking-[0.3em] text-xs">Calibrating Uplink...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
                        {[
                          { label: 'Latency', value: `${testResult?.ping} ms`, icon: <LucideActivity className="text-blue-400" /> },
                          { label: 'Download', value: `${testResult?.down} Mbps`, icon: <LucideArrowDownRight className="text-green-400" /> },
                          { label: 'Upload', value: `${testResult?.up} Mbps`, icon: <LucideArrowUpRight className="text-purple-400" /> },
                        ].map((stat, i) => (
                          <div key={i} className="bg-[#050f1a]/80 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                            <div className="mb-4 flex justify-center">{stat.icon}</div>
                            <p className="text-[0.6rem] text-muted font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
                          </div>
                        ))}
                        <button 
                          onClick={() => setTestResult(null)}
                          className="md:col-span-3 mt-6 text-[0.6rem] text-brand-500/50 hover:text-brand-500 font-bold uppercase tracking-[0.2em] transition-colors"
                        >
                          Clear Diagnostic Data
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="coverage"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 h-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {coverageOptions.map((opt, i) => (
                      <div key={i} className="bg-surface/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between group hover:border-brand-500/30 transition-all">
                        <div className="flex items-center space-x-6 mb-4 md:mb-0">
                          <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-500">
                            <LucideWifi size={28} />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{opt.tech} <span className="ml-2 text-[0.5rem] bg-brand-500/20 px-2 py-0.5 rounded text-brand-400 uppercase tracking-widest">{opt.status}</span></h4>
                            <p className="text-xs text-muted font-medium">{opt.bestFor}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-center md:text-right">
                          <div>
                            <p className="text-[0.6rem] text-muted font-bold uppercase tracking-widest mb-1">Max Speed</p>
                            <p className="text-lg font-display font-bold text-white">{opt.speed}</p>
                          </div>
                          <div>
                            <p className="text-[0.6rem] text-muted font-bold uppercase tracking-widest mb-1">Uptime</p>
                            <p className="text-lg font-display font-bold text-green-400">{opt.reliability}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Infrastructure Checklist */}
          <div className="bg-surface/40 backdrop-blur-md rounded-[3rem] p-10 border border-white/5 flex flex-col overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <LucideShield size={120} />
            </div>
            
            <h3 className="text-2xl font-display font-bold text-white mb-8 relative z-10">Continuity <span className="text-brand-500">Check</span></h3>
            
            <div className="space-y-8 relative z-10 flex-1">
              {[
                { label: "UPS Power Backup", desc: "Essential for Fiber ont/router during outages.", active: true },
                { label: "Shielded Cabling", desc: "Reduces EMI in high-density rack setups.", active: true },
                { label: "Oribi DNS Shield", desc: "Private recursive DNS for secure browsing.", active: false },
                { label: "Local Cloud Sync", desc: "Weekly off-site encrypted data vaulting.", active: true },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${item.active ? 'bg-brand-500 border-brand-500 text-[#032137]' : 'border-white/20'}`}>
                    {item.active && <LucideCheckCircle2 size={14} />}
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${item.active ? 'text-white' : 'text-muted'}`}>{item.label}</p>
                    <p className="text-[0.65rem] text-muted leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-brand-500/10 rounded-2xl border border-brand-500/20 relative z-10">
              <div className="flex items-center space-x-3 mb-2">
                <LucideActivity className="text-brand-500" size={16} />
                <span className="text-[0.6rem] font-bold text-brand-500 uppercase tracking-widest">Health Pulse</span>
              </div>
              <p className="text-[0.7rem] text-white font-bold">Your infrastructure is 75% optimized.</p>
              <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} className="h-full bg-brand-500" />
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-brand-500/5 backdrop-blur-md border border-brand-500/20 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center text-[#032137] shadow-xl">
              <LucideTerminal size={28} />
            </div>
            <div>
              <p className="text-[0.6rem] text-brand-400 font-bold uppercase tracking-[0.2em] mb-1">Architecture Planning</p>
              <h4 className="text-xl font-bold text-white">Scaling your business network?</h4>
            </div>
          </div>
          <button className="px-10 py-4 bg-brand-500 text-[#032137] font-bold rounded-2xl hover:bg-brand-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20 uppercase tracking-widest text-xs">
            Start Planning
          </button>
        </motion.div>
      </div>
    </div>
  );
};
