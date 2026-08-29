import React, { useEffect, useState } from 'react';
import { LucideLock, LucideShieldCheck, LucideServer, LucideExternalLink, LucideCreditCard, LucideHistory, LucideMessageSquare, LucideLoader2, LucideCheckCircle2, LucideAlertTriangle } from 'lucide-react';
import { Logo } from './Logo';
import { motion } from 'framer-motion';
import { NetworkDiagnostics } from './NetworkDiagnostics';
import { useAuth } from '../AuthContext';
import { firestoreService, OrderData, TicketData } from '../services/firestoreService';

export const BalanceCheck: React.FC = () => {
  const { user } = useAuth();
  
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDatabaseRecords = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const [fetchedOrders, fetchedTickets] = await Promise.all([
        firestoreService.getOrders(user.uid),
        firestoreService.getTickets(user.uid)
      ]);
      setOrders(fetchedOrders);
      setTickets(fetchedTickets);
    } catch (err: any) {
      console.error("Failed loading customer data records:", err);
      setError('Failed synchronized database handshake: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatabaseRecords();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Network Diagnostics Tool */}
      <NetworkDiagnostics />

      {/* Account Info Details Block */}
      <div className="bg-surface/40 backdrop-blur-xl rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative">
        <div className="absolute inset-0 opacity-5 circuit-bg pointer-events-none" />
        
        <div className="bg-brand-500/10 p-12 text-center border-b border-white/5 relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="p-6 bg-[#050f1a] rounded-[2rem] border border-brand-500/20 shadow-inner glow-orb">
              <Logo size={60} />
            </div>
          </motion.div>
          <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">Secure Account <span className="text-brand-500">Portal</span></h2>
          <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">Access your billing history, manage subscriptions, and monitor your network performance in real-time.</p>
        </div>
        
        <div className="p-12 text-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#050f1a]/60 rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mb-6 border border-brand-500/20">
                <LucideCreditCard className="text-brand-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Billing & Invoices</h3>
              <p className="text-muted text-xs mb-8">View your payment history and download invoices via our secure CRM.</p>
              <a 
                href="https://naztech.space/crm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-brand-500 text-[#032137] font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-brand-600 transition-all"
              >
                <span>Access Billing</span>
                <LucideExternalLink size={14} />
              </a>
            </div>

            <div className="bg-[#050f1a]/60 rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mb-6 border border-brand-500/20">
                <LucideLock className="text-brand-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Privacy & Security</h3>
              <p className="text-muted text-xs mb-8">All data is encrypted and synced with our private local servers.</p>
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <LucideShieldCheck className="text-brand-500 mr-3" size={16} />
                  <span className="text-[0.6rem] font-bold text-white uppercase tracking-widest">E2E Encryption</span>
                </div>
                <div className="flex items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <LucideServer className="text-brand-500 mr-3" size={16} />
                  <span className="text-[0.6rem] font-bold text-white uppercase tracking-widest">Local Sync Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Order Logs and Support Tickets from Firestore */}
          <div className="border-t border-white/5 pt-12 text-left space-y-12">
            
            {/* 1. Hardware Purchases Order List */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <LucideHistory size={20} className="text-brand-500" />
                Store Hardware Order History
              </h3>

              {loading ? (
                <div className="flex items-center justify-center py-8 gap-3 text-muted">
                  <LucideLoader2 size={18} className="animate-spin text-brand-500" />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase">Fetching Order States...</span>
                </div>
              ) : error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-mono">
                  {error}
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white/5 border border-white/5 p-8 rounded-3xl text-center text-muted">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1">No Orders Located</p>
                  <p className="text-xs">Any procurement you perform in the hardware store will list here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/10 transition-all">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono font-bold text-brand-400 bg-brand-500/10 px-2 py-1 rounded">PENDING REQUISITION</span>
                          <span className="text-xs text-muted font-bold font-mono">Total: R{order.total.toLocaleString()}</span>
                        </div>
                        <p className="text-sm font-bold text-white mb-1">Delivery to: {order.name}</p>
                        <p className="text-xs text-muted mb-2 max-w-md">{order.address}</p>
                        <div className="text-[0.65rem] text-muted-foreground uppercase font-mono flex flex-wrap gap-2">
                          {order.items.map((item, i) => (
                            <span key={i} className="bg-white/5 px-2 py-0.5 rounded border border-white/10">{item.name} (x{item.qty})</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <LucideCheckCircle2 size={16} className="text-green-500" />
                        <span className="text-xs font-bold text-green-400 uppercase tracking-widest font-mono">Synced</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Logged Support Ticket List */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <LucideMessageSquare size={20} className="text-brand-500" />
                Strategic Support Uplinks
              </h3>

              {loading ? (
                <div className="flex items-center justify-center py-8 gap-3 text-muted">
                  <LucideLoader2 size={18} className="animate-spin text-brand-500" />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase">Fetching Support Handshakes...</span>
                </div>
              ) : error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-mono">
                  {error}
                </div>
              ) : tickets.length === 0 ? (
                <div className="bg-white/5 border border-white/5 p-8 rounded-3xl text-center text-muted">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1">No Support Uplinks</p>
                  <p className="text-xs">Submitted priorities inside technical handshake queues will register here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4 hover:bg-white/10 transition-all">
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold bg-brand-500/10 text-brand-400 px-2 py-1 rounded">STATUS: {ticket.status.toUpperCase()}</span>
                          <span className="text-xs text-muted font-mono">{ticket.sector}</span>
                        </div>
                        <span className="text-[0.65rem] text-muted uppercase font-mono font-bold">Ref: {ticket.operationalId}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-200 mb-1">Description Payload:</p>
                        <p className="text-xs text-muted leading-relaxed font-mono whitespace-pre-wrap">{ticket.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
          
          <div className="mt-12">
            <p className="text-[0.6rem] text-muted/50 uppercase tracking-[0.2em] font-bold">
              ORIBISERV Infrastructure • Secure Client Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
