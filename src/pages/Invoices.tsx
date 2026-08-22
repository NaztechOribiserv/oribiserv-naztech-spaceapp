import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideFileText, LucidePlus, LucideSearch, LucideDownload, LucideSend, LucideCheckCircle2, LucideClock } from 'lucide-react';
import { ledgerService, Invoice } from '../services/ledgerService';
import { useAuth } from '../AuthContext';

export const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) loadInvoices();
  }, [isAdmin]);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const data = await ledgerService.getInvoices();
      setInvoices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'sent': return 'bg-brand-500/10 text-brand-400 border-brand-500/20';
      case 'overdue': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/10 text-muted border-white/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <LucideFileText className="text-brand-500" />
            Billing & Invoices
          </h2>
          <p className="text-muted mt-1">Generate tax-compliant invoices and track payments.</p>
        </div>
        <button 
          className="bg-brand-500 hover:bg-brand-600 text-[#032137] px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-retro-brand active:translate-y-[1px] active:shadow-none"
        >
          <LucidePlus size={18} /> Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <p className="text-sm text-muted mb-2 font-bold">Outstanding Receivables</p>
          <h3 className="text-2xl font-display font-bold text-white">R 45,300.00</h3>
        </div>
        <div className="bg-surface/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <p className="text-sm text-muted mb-2 font-bold">Paid This Month</p>
          <h3 className="text-2xl font-display font-bold text-green-400">R 124,500.00</h3>
        </div>
        <div className="bg-surface/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <p className="text-sm text-muted mb-2 font-bold">Draft Invoices</p>
          <h3 className="text-2xl font-display font-bold text-muted">R 12,400.00</h3>
        </div>
      </div>

      <div className="bg-[#0e2134]/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#050f1a]/50">
          <div className="relative w-full max-w-sm">
            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search invoices by ID or Client..." 
              className="w-full bg-[#050f1a] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:border-brand-500 outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white hover:bg-white/10">Export CSV</button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-brand-500 animate-pulse font-mono text-xs uppercase tracking-widest">Loading Ledger...</div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center text-muted">
            <LucideFileText size={48} className="mx-auto mb-4 opacity-20" />
            <p>No invoices found. Generate your first invoice to start billing.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted">
              <thead className="bg-[#050f1a]/50 border-b border-white/10 text-xs uppercase tracking-wider font-mono">
                <tr>
                  <th className="px-6 py-4 font-bold">Invoice Ref</th>
                  <th className="px-6 py-4 font-bold">Client ID</th>
                  <th className="px-6 py-4 font-bold">Date Issued</th>
                  <th className="px-6 py-4 font-bold">Amount (ZAR)</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-mono font-bold text-white">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-6 py-4">
                      {inv.clientId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <LucideClock size={14} className="opacity-50" />
                        {inv.issueDate?.toDate().toLocaleDateString() || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                      R {inv.total.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest font-bold border ${getStatusColor(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-white" title="Download PDF">
                          <LucideDownload size={16} />
                        </button>
                        <button className="p-2 hover:bg-brand-500/20 rounded-lg text-brand-400" title="Send via WhatsApp">
                          <LucideSend size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
