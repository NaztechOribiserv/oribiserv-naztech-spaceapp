import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideUsers, LucidePlus, LucideSearch, LucideMoreVertical, LucideMail, LucidePhone, LucideBuilding } from 'lucide-react';
import { ledgerService, Client } from '../services/ledgerService';
import { useAuth } from '../AuthContext';

export const CRM: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', companyName: '', billingAddress: '', status: 'active' as const });

  useEffect(() => {
    if (isAdmin) loadClients();
  }, [isAdmin]);

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await ledgerService.getClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ledgerService.createClient(newClient);
      setShowAddModal(false);
      loadClients();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <LucideUsers className="text-brand-500" />
            Client Directory
          </h2>
          <p className="text-muted mt-1">Manage leads, MSP clients, and technical partners.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand-500 hover:bg-brand-600 text-[#032137] px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-retro-brand active:translate-y-[1px] active:shadow-none"
        >
          <LucidePlus size={18} /> Add Client
        </button>
      </div>

      <div className="bg-[#0e2134]/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#050f1a]/50">
          <div className="relative w-full max-w-sm">
            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search clients by name or company..." 
              className="w-full bg-[#050f1a] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:border-brand-500 outline-none transition-colors"
            />
          </div>
          <div className="text-xs font-mono text-muted">
             {clients.length} Total Records
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-brand-500 animate-pulse font-mono text-xs uppercase tracking-widest">Loading Records...</div>
        ) : clients.length === 0 ? (
          <div className="p-12 text-center text-muted">
            <LucideUsers size={48} className="mx-auto mb-4 opacity-20" />
            <p>No clients found in the ledger.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted">
              <thead className="bg-[#050f1a]/50 border-b border-white/10 text-xs uppercase tracking-wider font-mono">
                <tr>
                  <th className="px-6 py-4 font-bold">Client Identity</th>
                  <th className="px-6 py-4 font-bold">Company</th>
                  <th className="px-6 py-4 font-bold">Contact Vector</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 font-bold">
                          {client.name.charAt(0)}
                        </div>
                        <span className="font-bold text-white">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <LucideBuilding size={14} className="opacity-50" />
                        {client.companyName || 'Individual'}
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <LucideMail size={12} className="opacity-50" /> {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <LucidePhone size={12} className="opacity-50" /> {client.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest font-bold ${client.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-white/10 text-muted'}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <LucideMoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0e2134] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-6">New Client Profile</h3>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[0.6rem] font-bold text-brand-400 uppercase tracking-widest">Full Name</label>
                  <input required value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="w-full mt-1 bg-[#050f1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" />
                </div>
                <div>
                  <label className="text-[0.6rem] font-bold text-brand-400 uppercase tracking-widest">Company</label>
                  <input value={newClient.companyName} onChange={e => setNewClient({...newClient, companyName: e.target.value})} className="w-full mt-1 bg-[#050f1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[0.6rem] font-bold text-brand-400 uppercase tracking-widest">Email</label>
                  <input required type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full mt-1 bg-[#050f1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" />
                </div>
                <div>
                  <label className="text-[0.6rem] font-bold text-brand-400 uppercase tracking-widest">Phone</label>
                  <input value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} className="w-full mt-1 bg-[#050f1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[0.6rem] font-bold text-brand-400 uppercase tracking-widest">Billing Address</label>
                <textarea rows={3} value={newClient.billingAddress} onChange={e => setNewClient({...newClient, billingAddress: e.target.value})} className="w-full mt-1 bg-[#050f1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none resize-none"></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 border border-white/10 rounded-xl text-white font-bold hover:bg-white/5">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-brand-500 text-[#032137] rounded-xl font-bold hover:bg-brand-600 shadow-retro-brand">Save Record</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
