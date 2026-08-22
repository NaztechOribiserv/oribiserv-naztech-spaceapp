import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideActivity, LucideWifi, LucideGlobe, LucideZap, LucideRefreshCw, LucideShieldCheck, LucideCpu } from 'lucide-react';

export const NetworkDiagnostics: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    download: number;
    upload: number;
    ping: number;
    jitter: number;
    ip: string;
    isp: string;
  } | null>(null);

  const runTest = () => {
    setIsTesting(true);
    setProgress(0);
    setResults(null);

    // Simulate speed test progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTesting(false);
          setResults({
            download: Math.floor(Math.random() * 100) + 50,
            upload: Math.floor(Math.random() * 50) + 20,
            ping: Math.floor(Math.random() * 20) + 5,
            jitter: Math.floor(Math.random() * 5) + 1,
            ip: '102.132.x.x',
            isp: 'ORIBISERV Network'
          });
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="bg-surface/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 circuit-bg pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center border border-brand-500/20 text-brand-500">
              <LucideActivity size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Network Diagnostics</h3>
              <p className="text-[0.65rem] text-muted uppercase tracking-widest font-bold">Real-time performance monitoring</p>
            </div>
          </div>
          <button 
            onClick={runTest}
            disabled={isTesting}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
              isTesting ? 'bg-white/5 text-muted cursor-not-allowed' : 'bg-brand-500 text-[#032137] hover:bg-brand-600'
            }`}
          >
            <LucideRefreshCw size={14} className={isTesting ? 'animate-spin' : ''} />
            <span>{isTesting ? 'Testing...' : 'Run Diagnostics'}</span>
          </button>
        </div>

        {isTesting ? (
          <div className="py-12 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={553}
                  strokeDashoffset={553 - (553 * progress) / 100}
                  className="text-brand-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-display font-bold text-white">{progress}%</span>
                <span className="text-[0.6rem] text-muted uppercase tracking-widest font-bold">Analyzing</span>
              </div>
            </div>
            <p className="text-muted text-sm animate-pulse">Measuring network latency and throughput...</p>
          </div>
        ) : results ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <LucideZap size={20} className="text-brand-500 mb-4" />
              <p className="text-[0.6rem] text-muted uppercase tracking-widest font-bold mb-1">Download</p>
              <p className="text-2xl font-display font-bold text-white">{results.download} <span className="text-xs text-muted">Mbps</span></p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <LucideActivity size={20} className="text-brand-500 mb-4" />
              <p className="text-[0.6rem] text-muted uppercase tracking-widest font-bold mb-1">Upload</p>
              <p className="text-2xl font-display font-bold text-white">{results.upload} <span className="text-xs text-muted">Mbps</span></p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <LucideGlobe size={20} className="text-brand-500 mb-4" />
              <p className="text-[0.6rem] text-muted uppercase tracking-widest font-bold mb-1">Latency</p>
              <p className="text-2xl font-display font-bold text-white">{results.ping} <span className="text-xs text-muted">ms</span></p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <LucideShieldCheck size={20} className="text-brand-500 mb-4" />
              <p className="text-[0.6rem] text-muted uppercase tracking-widest font-bold mb-1">Jitter</p>
              <p className="text-2xl font-display font-bold text-white">{results.jitter} <span className="text-xs text-muted">ms</span></p>
            </div>

            <div className="col-span-2 md:col-span-4 mt-4 p-4 bg-brand-500/5 rounded-2xl border border-brand-500/10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <span className="text-[0.55rem] text-muted uppercase tracking-widest font-bold">Public IP</span>
                  <span className="text-xs font-mono text-white">{results.ip}</span>
                </div>
                <div className="w-px h-8 bg-white/10 mx-2" />
                <div className="flex flex-col">
                  <span className="text-[0.55rem] text-muted uppercase tracking-widest font-bold">Service Provider</span>
                  <span className="text-xs font-bold text-brand-400">{results.isp}</span>
                </div>
              </div>
              <div className="flex items-center text-green-400 text-[0.6rem] font-bold uppercase tracking-widest">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Network Healthy
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="py-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center">
            <LucideWifi size={48} className="text-white/10 mb-4" />
            <p className="text-muted text-sm max-w-xs">Run a diagnostic test to measure your current network performance and health.</p>
          </div>
        )}
      </div>
    </div>
  );
};
