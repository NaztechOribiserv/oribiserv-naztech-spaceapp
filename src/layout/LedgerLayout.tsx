import React from 'react';
import { motion } from 'framer-motion';
import { 
  LucideLayoutDashboard, 
  LucideFileText, 
  LucideCreditCard, 
  LucideUsers, 
  LucideBox, 
  LucideBriefcase,
  LucidePieChart,
  LucideSettings,
  LucideBell,
  LucideSearch,
  LucideMenu,
  LucideX
} from 'lucide-react';
import { Logo } from '../components/Logo';

interface LedgerLayoutProps {
  children: React.ReactNode;
  activeView: string;
  onNavigate: (view: string) => void;
}

export const LedgerLayout: React.FC<LedgerLayoutProps> = ({ children, activeView, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: LucideLayoutDashboard },
    { name: 'Accounting', id: 'accounting', icon: LucidePieChart },
    { name: 'Invoices', id: 'invoices', icon: LucideFileText },
    { name: 'Payments', id: 'payments', icon: LucideCreditCard },
    { name: 'CRM', id: 'crm', icon: LucideUsers },
    { name: 'Inventory', id: 'inventory', icon: LucideBox },
    { name: 'Projects', id: 'projects', icon: LucideBriefcase },
    { name: 'Settings', id: 'settings', icon: LucideSettings },
  ];

  return (
    <div className="min-h-screen bg-[#04101a] text-brand-50 flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        className="fixed lg:relative z-40 w-64 h-screen bg-[#081c2f]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col shrink-0"
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo size={24} />
            <span className="font-display font-bold text-white text-lg tracking-tight">OribiLedger</span>
          </div>
          <button className="lg:hidden text-muted hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <LucideX size={20} />
          </button>
        </div>

        <div className="px-4 pb-4">
            <div className="relative">
                <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-[#050f1a] border border-white/5 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                />
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-brand-500/10 text-brand-400' 
                    : 'text-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-brand-500' : 'text-muted'} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
              <span className="text-brand-400 font-bold text-xs">NK</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Naz Kamwendo</p>
              <p className="text-xs text-muted truncate">Admin</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
        
        {/* Topbar */}
        <header className="h-16 border-b border-white/5 bg-[#04101a]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex items-center">
            <button className="lg:hidden text-muted hover:text-white mr-4" onClick={() => setIsSidebarOpen(true)}>
              <LucideMenu size={20} />
            </button>
            <h1 className="text-lg font-display font-bold text-white capitalize">{activeView.replace('-', ' ')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative text-muted hover:text-white transition-colors">
              <LucideBell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-500 rounded-full border border-[#04101a]"></span>
            </button>
            <button 
              onClick={() => onNavigate('portal')}
              className="text-xs font-bold text-[#032137] bg-brand-500 px-3 py-1.5 rounded-lg hover:bg-brand-600 transition-colors shadow-retro-brand active:translate-y-[1px] active:shadow-none"
            >
              Client Portal
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide relative z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
