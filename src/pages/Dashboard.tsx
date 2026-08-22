import React from 'react';
import { motion } from 'framer-motion';
import { 
  LucideTrendingUp, 
  LucideArrowUpRight, 
  LucideArrowDownRight, 
  LucideClock, 
  LucideActivity,
  LucideCheckCircle2,
  LucideAlertCircle
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Revenue (YTD)', value: 'R 845,200', change: '+12.5%', positive: true },
    { label: 'MRR', value: 'R 124,500', change: '+5.2%', positive: true },
    { label: 'Outstanding', value: 'R 45,300', change: '-2.1%', positive: false },
    { label: 'Tech Utilisation', value: '86%', change: '+4.0%', positive: true },
  ];

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0e2134]/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-[#0e2134]/80 transition-colors"
          >
            <p className="text-sm font-medium text-muted mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-display font-bold text-white">{stat.value}</h3>
              <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${stat.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {stat.positive ? <LucideArrowUpRight size={14} className="mr-1" /> : <LucideArrowDownRight size={14} className="mr-1" />}
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Mock for now) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#0e2134]/50 backdrop-blur-md border border-white/10 rounded-3xl p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white font-display flex items-center">
              <LucideActivity className="mr-3 text-brand-500" size={20} />
              Cashflow Overview
            </h3>
            <select className="bg-[#050f1a] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
              <option>All Time</option>
            </select>
          </div>
          
          {/* Simulated Chart */}
          <div className="h-64 flex items-end justify-between gap-2 border-b border-white/5 pb-4">
            {[40, 60, 45, 80, 55, 90].map((height, i) => (
              <div key={i} className="w-full flex flex-col justify-end gap-1 group">
                <div className="w-full bg-brand-500/20 rounded-t-sm hover:bg-brand-500/40 transition-colors" style={{ height: `${height}%` }}>
                  <div className="w-full bg-brand-500 rounded-t-sm shadow-[0_0_10px_rgba(93,217,234,0.5)]" style={{ height: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-mono text-muted">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </motion.div>

        {/* Side Panel */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#0e2134]/50 backdrop-blur-md border border-white/10 rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold text-white font-display mb-6 flex items-center">
              <LucideClock className="mr-3 text-brand-500" size={20} />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Invoice INV-2023-042 Paid', desc: 'Nexus Corp via EFT', time: '2 hours ago', icon: LucideCheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' },
                { title: 'Quote Approved', desc: 'Server Migration for Alpha Ltd', time: '5 hours ago', icon: LucideTrendingUp, color: 'text-brand-400', bg: 'bg-brand-500/10' },
                { title: 'License Renewal Due', desc: 'Microsoft 365 for 15 users', time: 'Tomorrow', icon: LucideAlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`mt-1 p-2 rounded-xl ${item.bg} ${item.color}`}>
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-muted">{item.desc}</p>
                    <p className="text-[10px] font-mono text-muted/60 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
