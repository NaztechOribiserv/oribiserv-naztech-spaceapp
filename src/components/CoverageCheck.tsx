import React, { useState, useEffect } from 'react';
import { LucideMapPin, LucideSearch, LucideCheckCircle2, LucideXCircle, LucideLoader2, LucideWifi, LucideZap, LucideSignal, LucideGlobe, LucideBriefcase, LucideCrosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

interface CoverageCheckProps {
  onNavigate?: (page: string) => void;
}

export const CoverageCheck: React.FC<CoverageCheckProps> = ({ onNavigate }) => {
  const [address, setAddress] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [result, setResult] = useState<{
    fibre: boolean;
    lte: boolean;
    fiveG: boolean;
    locationName?: string;
  } | null>(null);

  const performCheck = (inputAddress: string) => {
    setIsChecking(true);
    setResult(null);

    // Enhanced simulation logic based on common patterns
    const isMajorCity = (str: string) => {
      const cities = ['cape town', 'johannesburg', 'sandton', 'durban', 'pretoria', 'knysna', 'george', 'stellenbosch', 'umhlanga', 'bryanston'];
      return cities.some(city => str.toLowerCase().includes(city));
    };

    const isComplex = inputAddress.length > 15;

    setTimeout(() => {
      setIsChecking(false);
      setResult({
        fibre: isMajorCity(inputAddress) || (isComplex && Math.random() > 0.4),
        lte: true, 
        fiveG: (isMajorCity(inputAddress) && Math.random() > 0.3) || (isComplex && Math.random() > 0.7),
        locationName: isMajorCity(inputAddress) ? inputAddress : undefined
      });
    }, 2500);
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    performCheck(address);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we'd reverse geocode here. 
        // For simulation, we'll use coordinates to "find" a location.
        setTimeout(() => {
          setIsLocating(false);
          const mockAddress = `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)} (Detected Location)`;
          setAddress(mockAddress);
          performCheck(mockAddress);
        }, 1500);
      },
      () => {
        setIsLocating(false);
        alert("Unable to retrieve your location. Please enter your address manually.");
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-surface/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/10 glow-orb relative overflow-hidden group">
            <motion.div 
                className="absolute inset-0 bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <Logo size={64} />
          </div>
        </motion.div>
        <h2 className="text-4xl font-display font-bold text-white tracking-tight">Check Your <span className="text-brand-500">Coverage</span></h2>
        <p className="mt-4 text-lg text-muted">Precision analytics to determine ORIBISERV service accessibility at your topology.</p>
      </div>

      <div className="bg-surface/40 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/10 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 circuit-bg pointer-events-none" />
        <form onSubmit={handleCheck} className="relative z-10">
          <div className="relative flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow w-full">
                <LucideMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500" size={24} />
                <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter street, suburb, or city..."
                className="w-full pl-14 pr-12 py-5 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none text-lg font-medium text-white placeholder:text-muted"
                required
                />
                <button
                    type="button"
                    onClick={handleGeolocation}
                    disabled={isLocating}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-brand-500 transition-colors"
                    title="Use My Location"
                >
                    {isLocating ? <LucideLoader2 className="animate-spin" size={20} /> : <LucideCrosshair size={20} />}
                </button>
            </div>
            <button
              type="submit"
              disabled={isChecking}
              className="w-full md:w-auto px-12 py-5 bg-brand-600 hover:bg-brand-700 text-[#032137] font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center disabled:opacity-50 whitespace-nowrap"
            >
              {isChecking ? (
                <LucideLoader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <LucideSearch size={24} className="mr-2" />
                  Audit
                </>
              )}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12"
            >
              {result.locationName && (
                <div className="mb-6 px-4 py-2 bg-brand-500/10 rounded-xl border border-brand-500/20 inline-flex items-center">
                    <LucideMapPin size={14} className="text-brand-500 mr-2" />
                    <span className="text-[0.65rem] font-bold text-brand-400 uppercase tracking-widest">Optimized for: {result.locationName}</span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <CoverageCard 
                    title="Fibre" 
                    available={result.fibre} 
                    icon={<LucideZap className="text-brand-500" />} 
                    description="Ultra-fast, symmetric broadband (Up to 1Gbps)."
                    onNavigate={onNavigate}
                />
                <CoverageCard 
                    title="5G" 
                    available={result.fiveG} 
                    icon={<LucideSignal className="text-brand-400" />} 
                    description="Next-gen mobile connectivity with sub-10ms latency."
                    onNavigate={onNavigate}
                />
                <CoverageCard 
                    title="LTE-A" 
                    available={result.lte} 
                    icon={<LucideWifi className="text-brand-300" />} 
                    description="Redundant high-speed wireless backup."
                    onNavigate={onNavigate}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div className="p-8 bg-brand-900/40 backdrop-blur-md rounded-[2.5rem] text-white border border-brand-500/20 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Not covered yet?</h3>
            <p className="text-brand-100 mb-6 opacity-80">We're expanding our network rapidly. Register your interest and we'll notify you as soon as we're in your area.</p>
            <button 
              onClick={() => onNavigate?.('support')}
              className="px-8 py-3 bg-brand-500 text-[#032137] font-bold rounded-xl hover:bg-brand-600 transition-all"
            >
              Notify Me
            </button>
          </div>
          <LucideGlobe className="absolute -right-10 -bottom-10 text-brand-500/10 group-hover:scale-110 transition-transform" size={200} />
        </div>
        <div className="p-8 bg-surface/40 backdrop-blur-md rounded-[2.5rem] text-white border border-white/10 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Business Solutions</h3>
            <p className="text-muted mb-6">Need dedicated connectivity for your enterprise? We offer custom solutions regardless of standard coverage.</p>
            <button 
              onClick={() => onNavigate?.('services')}
              className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/10 hover:bg-white/20 transition-all"
            >
              Get a Quote
            </button>
          </div>
          <LucideBriefcase className="absolute -right-10 -bottom-10 text-white/5 group-hover:scale-110 transition-transform" size={200} />
        </div>
      </div>
    </div>
  );
};

const CoverageCard = ({ title, available, icon, description, onNavigate }: { title: string, available: boolean, icon: React.ReactNode, description: string, onNavigate?: (page: string) => void }) => (
  <div className={`p-6 rounded-2xl border transition-all ${available ? 'bg-white/5 border-brand-500/30 shadow-lg' : 'bg-white/2 border-white/5 opacity-50'}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-brand-500/10 rounded-xl">
        {icon}
      </div>
      {available ? (
        <span className="flex items-center text-brand-500 font-bold text-[0.6rem] uppercase tracking-widest bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
          <LucideCheckCircle2 size={12} className="mr-1.5" /> Available
        </span>
      ) : (
        <span className="flex items-center text-red-400 font-bold text-[0.6rem] uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          <LucideXCircle size={12} className="mr-1.5" /> No Coverage
        </span>
      )}
    </div>
    <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
    <p className="text-xs text-muted leading-relaxed">{description}</p>
    {available && (
      <button 
        onClick={() => onNavigate?.('products')}
        className="mt-6 w-full py-3 bg-brand-500 text-[#032137] text-xs font-bold rounded-xl hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20"
      >
        View Plans
      </button>
    )}
  </div>
);
