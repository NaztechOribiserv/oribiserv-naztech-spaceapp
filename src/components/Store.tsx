import React, { useState, useEffect } from 'react';
import { LucideMonitor, LucideCpu, LucideHardDrive, LucideShield, LucideShoppingCart, LucideCheck, LucideTag, LucideExternalLink, LucideSearch, LucideZap, LucideCrown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { useAuth } from '../AuthContext';

interface StoreProps {
  onNavigate?: (page: string) => void;
}

export const Store: React.FC<StoreProps> = ({ onNavigate }) => {
  const { user, isAdmin, cart, addToCart } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [rotatedProducts, setRotatedProducts] = useState<any[]>([]);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  
  // Base prices with 15% markup as requested
  const markup = 1.15;
  const formatPrice = (price: number) => Math.round(price * markup).toLocaleString();

  const allProducts = [
    {
      id: 1,
      name: "BE800 Wi-Fi 7 Pro Router",
      category: "Networking",
      basePrice: 10499,
      description: "Elite Tri-Band Wi-Fi 7 Router with 10G Ports and LED Screen.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      features: ["Wi-Fi 7 Technology", "Dual 10G Ports", "Matter Support"],
      isBargain: true
    },
    {
      id: 2,
      name: "Network Boot Connector",
      category: "Accessories",
      basePrice: 86.1, // R99.01 after 15% markup
      description: "Gold-plated high-precision RJ45 shielding boot for elite custom cabling.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=800&q=80",
      features: ["EMI Shielding", "Snagless Design", "Pro Grade"],
      isBargain: false
    },
    {
      id: 3,
      name: "Oribi Enterprise Server v4",
      category: "Servers",
      basePrice: 17391.3, // R20,000 after 15% markup
      description: "High-density micro-server cluster for local Dolibarr hosting and automation.",
      image: "https://images.unsplash.com/photo-1558494600-a3939632832a?auto=format&fit=crop&w=800&q=80",
      features: ["64GB ECC RAM", "2TB NVMe Raid", "Dual 10GbE"],
      isBargain: true
    },
    {
      id: 4,
      name: "UniFi Gateway Ultra",
      category: "Networking",
      basePrice: 3399,
      description: "Compact multi-WAN UniFi Cloud Gateway with full security suite.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=800&q=80",
      features: ["Full UniFi OS", "Multi-WAN Support", "IDS/IPS Security"],
      isBargain: true
    },
    {
      id: 15,
      name: "MX Master 3S Professional",
      category: "Peripherals",
      basePrice: 1999,
      description: "Performance wireless mouse with 8K DPI tracking for engineers.",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
      features: ["Quiet Clicks", "MagSpeed Scroll", "Logi Options+"],
      isBargain: false
    },
    {
      id: 5,
      name: "Synology DS224+ Business NAS",
      category: "Storage",
      basePrice: 6500,
      description: "Private cloud storage hub for small teams and efficient backups.",
      image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=800&q=80",
      features: ["Dual-Core CPU", "Btrfs Support", "Surveillance Station"],
      isBargain: true
    },
    {
      id: 6,
      name: "Oribi 2000VA UPS System",
      category: "Power",
      basePrice: 4500,
      description: "Reliable battery backup to keep your network alive during load shedding.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      features: ["2000VA / 1200W", "LCD Display", "AVR Technology"],
      isBargain: false
    },
    {
      id: 7,
      name: "Starlink Standard V4 Kit",
      category: "Internet",
      basePrice: 12500,
      description: "High-speed satellite internet for elite remote connectivity.",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=800&q=80",
      features: ["Self-Aligning", "Wi-Fi 6 Router", "Global Coverage"],
      isBargain: true
    },
    {
      id: 8,
      name: "4K AI Surveillance Camera",
      category: "Security",
      basePrice: 2800,
      description: "Smart 4K outdoor camera with vehicle and person detection.",
      image: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&w=800&q=80",
      features: ["4K Resolution", "Night Vision", "PoE Support"],
      isBargain: false
    },
    {
      id: 9,
      name: "Dolibarr Cloud Hosting (Annual)",
      category: "Software",
      basePrice: 3600,
      description: "Secure Managed hosting for your Dolibarr CRM with daily backups.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      features: ["Daily Backups", "Managed Updates", "Priority Support"],
      isBargain: true
    },
    {
      id: 10,
      name: "Elite Network Audit",
      category: "Service",
      basePrice: 1500,
      description: "One-time technical deep dive into your infrastructure bottlenecks.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
      features: ["Coverage Mapping", "Security Analysis", "Action Report"],
      isBargain: false
    },
    {
      id: 11,
      name: "UniFi Protect G5 Pro",
      category: "Security",
      basePrice: 8900,
      description: "Professional 4K PoE camera with optical zoom and infrared night vision.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=800&q=80",
      features: ["3x Optical Zoom", "AI Analytics", "Weatherproof"],
      isBargain: true
    },
    {
      id: 12,
      name: "Oribi Fiber Mesh System",
      category: "Networking",
      basePrice: 5200,
      description: "Whole-home Wi-Fi 6 mesh system for seamless roaming.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      features: ["Up to 500m²", "WPA3 Security", "Band Steering"],
      isBargain: false
    },
    {
      id: 13,
      name: "UniFi Dream Machine Pro",
      category: "Networking",
      basePrice: 15900,
      description: "All-in-one console with 10G SFP+ and security for enterprise scaling.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=800&q=80",
      features: ["Full Ubiquiti Suite", "10G SFP+ Support", "IPS/IDS Protection"],
      isBargain: true
    },
    {
      id: 14,
      name: "Oribi Cloud Drive (2TB)",
      category: "Software",
      basePrice: 2400,
      description: "Self-hosted Nextcloud instance on Oribi infrastructure for full privacy.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      features: ["E2EE Encryption", "Mobile Sync", "Zero Knowledge"],
      isBargain: false
    }
  ];

  // Show all products by default to meet the "at least 10" requirement
  useEffect(() => {
    setRotatedProducts(allProducts);
  }, []);

  const filteredProducts = searchQuery 
    ? allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : rotatedProducts;

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="p-6 bg-surface/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/10 glow-orb">
            <Logo className="w-20 h-20" />
          </div>
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">ORIBISERV <span className="text-brand-500">Store</span></h2>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-10">Premium hardware curated for elite performance. All prices include professional procurement and deployment markup.</p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-muted group-focus-within:text-brand-500 transition-colors">
            <LucideSearch size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search ORIBISERV products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface/40 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-muted focus:outline-none focus:border-brand-500/50 transition-all shadow-xl"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <span className="text-[0.5rem] font-bold text-muted uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Product Search Active</span>
          </div>
        </div>
        <p className="text-[0.6rem] text-muted/50 mt-4 uppercase tracking-widest font-bold">Prices are subject to change based on market fluctuations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, idx) => (
            <motion.div 
              key={product.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10 }}
              className={`bg-surface/40 backdrop-blur-md rounded-[2rem] border overflow-hidden flex flex-col transition-all group relative ${product.isBargain ? 'border-brand-500/30 ring-1 ring-brand-500/10' : 'border-white/5'}`}
            >
              {product.isBargain && (
                <div className="absolute top-0 right-0 bg-brand-500 text-[#032137] text-[0.6rem] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest z-20 shadow-lg">
                  Elite Bargain
                </div>
              )}
              
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f1a] via-transparent to-transparent opacity-60" />
                
                {user && (
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                    <div className="bg-brand-500/20 backdrop-blur-md border border-brand-500/30 px-3 py-1 rounded-lg flex items-center">
                      <LucideCrown size={12} className="text-brand-500 mr-1.5" />
                      <span className="text-[0.6rem] font-bold text-brand-400 uppercase tracking-widest">Member Price</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-8 flex-1 flex flex-col relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/80 bg-brand-500/10 px-2 py-1 rounded-md">{product.category}</span>
                  <div className="text-right">
                    <span className="text-2xl font-display font-bold text-white">R{formatPrice(product.basePrice)}</span>
                    <p className="text-[0.5rem] text-muted uppercase tracking-tighter">Incl. 15% Markup</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-brand-500 transition-colors">{product.name}</h3>
                <p className="text-xs text-muted mb-6 flex-1 leading-relaxed">{product.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[0.7rem] text-brand-200 font-medium">
                      <div className="w-4 h-4 rounded-full bg-brand-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <LucideCheck size={10} className="text-brand-500" />
                      </div>
                      {feature}
                    </li>
                  ))}
                  {user && (
                    <li className="flex items-center text-[0.7rem] text-green-400 font-bold">
                      <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <LucideZap size={10} className="text-green-400" />
                      </div>
                      Priority Shipping Included
                    </li>
                  )}
                </ul>

                <button 
                  onClick={() => {
                    const priceWithMarkup = Math.round(product.basePrice * markup);
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: priceWithMarkup
                    });
                    setAddedProductId(product.id);
                    setTimeout(() => setAddedProductId(null), 1500);
                  }}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-lg active:scale-95 ${addedProductId === product.id ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-brand-500 hover:bg-brand-600 text-[#032137] shadow-brand-500/20'}`}
                >
                  {addedProductId === product.id ? (
                    <>
                      <LucideCheck size={18} className="mr-2" />
                      Added!
                    </>
                  ) : (
                    <>
                      <LucideShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
                
                {isAdmin && (
                  <button className="mt-4 w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[0.6rem] font-bold uppercase tracking-widest border border-red-500/20 transition-all">
                    Admin: Edit Product
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Member Exclusive Section */}
      {user && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-gradient-to-br from-brand-900/40 to-surface/40 backdrop-blur-xl rounded-[3rem] border border-brand-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 circuit-bg pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="flex items-center space-x-3 mb-4">
                <LucideCrown className="text-brand-500" size={32} />
                <h4 className="text-2xl font-display font-bold text-white">Member Exclusive Benefits</h4>
              </div>
              <p className="text-muted leading-relaxed mb-8">As a registered ORIBISERV member, you unlock priority procurement, discounted deployment rates, and 24/7 engineering support for all hardware purchased through our store.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-xs font-bold text-white"><LucideCheck className="text-brand-500 mr-2" size={16} /> 1-Year Extra Warranty</div>
                <div className="flex items-center text-xs font-bold text-white"><LucideCheck className="text-brand-500 mr-2" size={16} /> Free Setup Assistance</div>
                <div className="flex items-center text-xs font-bold text-white"><LucideCheck className="text-brand-500 mr-2" size={16} /> Priority RMA Handling</div>
                <div className="flex items-center text-xs font-bold text-white"><LucideCheck className="text-brand-500 mr-2" size={16} /> Bulk Order Discounts</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <button 
                onClick={() => onNavigate?.('store')}
                className="px-10 py-4 bg-brand-500 text-[#032137] font-bold rounded-2xl shadow-xl hover:bg-brand-600 transition-all"
              >
                View Member Deals
              </button>
              <button 
                onClick={() => onNavigate?.('support')}
                className="px-10 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Checkout Link */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-24 right-8 z-[90]"
          >
            <button
              onClick={() => onNavigate?.('checkout')}
              className="px-6 py-4 bg-brand-500 text-[#032137] rounded-full font-bold shadow-2xl hover:bg-brand-600 transition-all flex items-center space-x-3 group active:scale-95 border-2 border-[#050f1a]"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span>View Cart & Checkout ({cart.reduce((sum, item) => sum + item.qty, 0)})</span>
              <LucideShoppingCart size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
