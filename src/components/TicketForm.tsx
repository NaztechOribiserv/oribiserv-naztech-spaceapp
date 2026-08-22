import React, { useState } from 'react';
import { LucideCheckCircle, LucideSend, LucideLoader2 } from 'lucide-react';
import { Logo } from './Logo';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { firestoreService } from '../services/firestoreService';

export const TicketForm: React.FC = () => {
  const { user } = useAuth();
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [referenceHash, setReferenceHash] = useState('');

  // Controlled form inputs
  const [name, setName] = useState(user?.displayName || '');
  const [operationalId, setOperationalId] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [sector, setSector] = useState('Critical: Connectivity Down');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Detailed defensive validations
    if (!name.trim() || !email.trim() || !phone.trim() || !description.trim()) {
      setError('Please fill in all mandatory communication fields.');
      setLoading(false);
      return;
    }

    try {
      console.log("Routing ticket details securely to the priority queue...");
      const finalHash = await firestoreService.createTicket({
        userId: user?.uid || 'anonymous',
        name,
        email,
        phone,
        operationalId: operationalId || 'ORB-GUEST',
        sector,
        description,
        status: 'open'
      });

      setReferenceHash(finalHash);
      setSubmitted(true);
      
      // Clear description
      setDescription('');
    } catch (err: any) {
      console.error("Ticket transmission failure:", err);
      setError('Technical handshake failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 50, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        className="brutal-card p-12 text-center max-w-lg mx-auto rounded-[3rem]"
      >
        <motion.div 
            className="w-32 h-32 mx-auto mb-8 bg-brand-500/10 rounded-full flex items-center justify-center p-6 border-2 border-brand-500/20"
            animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
        >
          <Logo />
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
        >
            <div className="inline-flex items-center space-x-2 px-4 py-1 bg-green-500/20 rounded-full border border-green-500/30 mb-4">
                <LucideCheckCircle size={14} className="text-green-500" />
                <span className="text-[0.6rem] font-bold text-green-400 uppercase tracking-widest">Protocol Success</span>
            </div>
            <h3 className="text-4xl font-display font-bold text-white mb-4 tracking-tighter">Transmission Complete!</h3>
        </motion.div>

        <p className="text-muted mb-10 leading-relaxed text-lg">
          Our core engine has successfully registered your operational query in Firestore and queued a notification payload to <span className="text-brand-400 font-bold">naz.kamwendo@gmail.com</span>.
          <br/><br/>
          Reference Hash: <span className="font-mono font-bold text-brand-400 bg-brand-500/10 px-2 py-1 rounded">{referenceHash}</span>
        </p>
        
        <button 
          onClick={() => setSubmitted(false)}
          className="w-full py-5 bg-brand-500 text-brand-950 font-bold rounded-2xl shadow-retro hover:shadow-retro-hover transition-all uppercase tracking-widest text-xs"
        >
          Log New Sequence
        </button>
      </motion.div>
    );
  }

  return (
    <div className="brutal-card rounded-[3rem] p-8 sm:p-14 max-w-4xl mx-auto relative overflow-hidden transition-none">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Logo size={200} />
      </div>
      
      <div className="mb-12 relative z-10">
        <div className="inline-block px-4 py-1 bg-brand-500/10 rounded-full border border-brand-500/20 mb-4">
            <span className="text-[0.6rem] font-bold text-brand-400 uppercase tracking-widest">Priority Queue</span>
        </div>
        <h2 className="text-5xl font-display font-bold text-white tracking-tighter">Support <span className="text-brand-500">Uplink</span></h2>
        <p className="text-muted mt-2 text-lg">Initialize a technical handshake with our engineering team.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[0.7rem] font-bold text-brand-400 uppercase tracking-[0.2em]">Full Name</label>
            <input 
              required 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-8 py-5 rounded-2xl bg-[#050f1a] border-2 border-white/5 text-white focus:border-brand-500 outline-none transition-all placeholder:text-white/10" 
              placeholder="Agent Name" 
            />
          </div>
          <div className="space-y-3">
            <label className="text-[0.7rem] font-bold text-brand-400 uppercase tracking-[0.2em]">Operational ID</label>
            <input 
              type="text" 
              value={operationalId}
              onChange={(e) => setOperationalId(e.target.value)}
              className="w-full px-8 py-5 rounded-2xl bg-[#050f1a] border-2 border-white/5 text-white focus:border-brand-500 outline-none transition-all placeholder:text-white/10" 
              placeholder="ORB-0000 (Optional)" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
                <label className="text-[0.7rem] font-bold text-brand-400 uppercase tracking-[0.2em]">Contact Email</label>
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-8 py-5 rounded-2xl bg-[#050f1a] border-2 border-white/5 text-white focus:border-brand-500 outline-none transition-all placeholder:text-white/10" 
                  placeholder="email@nexus.com" 
                />
            </div>
            <div className="space-y-3">
                <label className="text-[0.7rem] font-bold text-brand-400 uppercase tracking-[0.2em]">Signal Number</label>
                <input 
                  required 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-8 py-5 rounded-2xl bg-[#050f1a] border-2 border-white/5 text-white focus:border-brand-500 outline-none transition-all placeholder:text-white/10" 
                  placeholder="+27..." 
                />
            </div>
        </div>

        <div className="space-y-3">
          <label className="text-[0.7rem] font-bold text-brand-400 uppercase tracking-[0.2em]">Sector Priority</label>
          <div className="relative">
            <select 
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-8 py-5 rounded-2xl bg-[#050f1a] border-2 border-white/5 text-white focus:border-brand-500 outline-none appearance-none cursor-pointer"
            >
                <option className="bg-[#050f1a]" value="Critical: Connectivity Down">Critical: Connectivity Down</option>
                <option className="bg-[#050f1a]" value="Severe: Performance Degraded">Severe: Performance Degraded</option>
                <option className="bg-[#050f1a]" value="Inquiry: Billing & Ledger">Inquiry: Billing & Ledger</option>
                <option className="bg-[#050f1a]" value="Fault: Hardware Integrity">Fault: Hardware Integrity</option>
                <option className="bg-[#050f1a]" value="Request: Capacity Upgrade">Request: Capacity Upgrade</option>
            </select>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-brand-500 opacity-50">▼</div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[0.7rem] font-bold text-brand-400 uppercase tracking-[0.2em]">Packet Description</label>
          <textarea 
            required 
            rows={5} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-8 py-5 rounded-2xl bg-[#050f1a] border-2 border-white/5 text-white focus-border-brand-500 outline-none resize-none transition-all placeholder:text-white/10" 
            placeholder="Provide full spectrum details of the bottleneck..."
          ></textarea>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl text-xs font-mono">
            Error submitting uplink: {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-500 hover:bg-brand-600 text-[#032137] font-bold py-6 rounded-2xl flex items-center justify-center transition-all shadow-retro hover:shadow-retro-hover active:translate-x-1 active:translate-y-1 active:shadow-none text-xl disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest"
        >
          {loading ? (
             <LucideLoader2 className="animate-spin" size={24} />
          ) : (
             <><LucideSend size={24} className="mr-3" /> Initiate Transmission</>
          )}
        </button>
      </form>
    </div>
  );
};
