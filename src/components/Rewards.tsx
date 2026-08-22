import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideGift, LucideTrendingUp, LucideStar, LucideZap, LucideShieldCheck, LucideCreditCard, LucideHistory, LucideChevronLeft, LucideChevronRight, LucideShoppingBag } from 'lucide-react';
import { useAuth } from '../AuthContext';

export const Rewards: React.FC = () => {
  const { loyaltyPoints, membershipTier } = useAuth();
  const [activeRewardIndex, setActiveRewardIndex] = React.useState(0);

  const benefits = [
    { icon: <LucideZap size={20} />, title: 'Priority Support', description: 'Get to the front of the queue for all technical queries.' },
    { icon: <LucideShieldCheck size={20} />, title: 'Extended Warranty', description: 'Additional 6 months warranty on all hardware repairs.' },
    { icon: <LucideCreditCard size={20} />, title: 'Member Discounts', description: 'Exclusive 5% markup discount on all store items.' },
    { icon: <LucideStar size={20} />, title: 'Early Access', description: 'Be the first to know about new coverage areas and tech.' },
  ];

  const transactionHistory = [
    { id: 1, type: 'earned', amount: 500, description: 'Fibre Installation Bonus', date: '2024-03-15' },
    { id: 2, type: 'earned', amount: 150, description: 'Monthly Subscription Payment', date: '2024-03-01' },
    { id: 3, type: 'redeemed', amount: 200, description: 'Hardware Repair Discount', date: '2024-02-20' },
    { id: 4, type: 'earned', amount: 1000, description: 'Referral Bonus', date: '2024-02-10' },
  ];

  const availableRewards = [
    { id: 1, title: 'R100 ISP Discount', cost: 500, image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'R50 Domain Discount', cost: 250, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: '1 Month Free (Basic)', cost: 2500, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80' },
    { id: 4, title: 'Domain Renewal Pts', cost: 1000, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80' },
  ];

  const nextReward = () => setActiveRewardIndex((prev) => (prev + 1) % availableRewards.length);
  const prevReward = () => setActiveRewardIndex((prev) => (prev - 1 + availableRewards.length) % availableRewards.length);

  const tiers = [
    { name: 'Basic', minPoints: 0, color: 'text-gray-400', bg: 'bg-gray-400/10' },
    { name: 'Plus', minPoints: 1000, color: 'text-brand-400', bg: 'bg-brand-400/10' },
    { name: 'Premium', minPoints: 5000, color: 'text-brand-500', bg: 'bg-brand-500/10' },
  ];

  const currentTierIndex = tiers.findIndex(t => t.name === membershipTier);
  const nextTier = tiers[currentTierIndex + 1];
  const progress = nextTier ? (loyaltyPoints / nextTier.minPoints) * 100 : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
        <h2 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">My <span className="text-brand-500">Rewards</span></h2>
        <p className="text-muted max-w-2xl">Earn points with every payment and purchase. Unlock exclusive benefits as you climb the tiers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Points Summary */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <LucideGift size={80} className="text-brand-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-6">Points Balance</h3>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-display font-bold text-brand-500">{loyaltyPoints.toLocaleString()}</span>
              <span className="text-muted font-bold uppercase tracking-widest text-xs">Points</span>
            </div>
            <p className="text-muted text-sm mb-8">You've earned {loyaltyPoints} points this year.</p>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-white">Next Tier: {nextTier?.name || 'Max Tier'}</span>
                <span className="text-brand-500">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-brand-500"
                />
              </div>
              {nextTier && (
                <p className="text-[0.65rem] text-muted uppercase tracking-widest font-bold">
                  {nextTier.minPoints - loyaltyPoints} points until {nextTier.name}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5"
          >
            <h3 className="text-lg font-bold text-white mb-6">Membership Tier</h3>
            <div className={`inline-flex items-center px-4 py-2 rounded-xl border border-white/10 ${tiers[currentTierIndex].bg} ${tiers[currentTierIndex].color} font-bold mb-4`}>
              <LucideStar size={18} className="mr-2" />
              {membershipTier} Member
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Your {membershipTier} status gives you access to specialized support and exclusive store pricing.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-surface/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 hover:border-brand-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-6 border border-brand-500/20 text-brand-500 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Available Rewards Carousel */}
          <div className="bg-surface/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white flex items-center">
                <LucideShoppingBag className="mr-3 text-brand-500" size={24} />
                Available Rewards
              </h3>
              <div className="flex space-x-2">
                <button onClick={prevReward} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all">
                  <LucideChevronLeft size={20} />
                </button>
                <button onClick={nextReward} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all">
                  <LucideChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="relative h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRewardIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="absolute inset-0 flex flex-col md:flex-row gap-8"
                >
                  <div className="w-full md:w-1/2 h-40 md:h-full rounded-2xl overflow-hidden border border-white/10">
                    <img 
                      src={availableRewards[activeRewardIndex].image} 
                      alt={availableRewards[activeRewardIndex].title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-2xl font-bold text-white mb-2">{availableRewards[activeRewardIndex].title}</h4>
                    <div className="flex items-center text-brand-500 font-bold mb-6">
                      <LucideZap size={16} className="mr-2" />
                      {availableRewards[activeRewardIndex].cost} Points
                    </div>
                    <button 
                      disabled={loyaltyPoints < availableRewards[activeRewardIndex].cost}
                      className={`px-8 py-3 rounded-xl font-bold transition-all ${loyaltyPoints >= availableRewards[activeRewardIndex].cost ? 'bg-brand-500 text-[#032137] hover:bg-brand-600' : 'bg-white/5 text-muted cursor-not-allowed'}`}
                    >
                      {loyaltyPoints >= availableRewards[activeRewardIndex].cost ? 'Redeem Reward' : 'Insufficient Points'}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-surface/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center">
              <LucideHistory className="mr-3 text-brand-500" size={24} />
              Points History
            </h3>
            <div className="space-y-4">
              {transactionHistory.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'earned' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {tx.type === 'earned' ? <LucideTrendingUp size={20} /> : <LucideGift size={20} />}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">{tx.description}</h5>
                      <p className="text-[0.65rem] text-muted uppercase tracking-widest font-bold">{tx.date}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${tx.type === 'earned' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.type === 'earned' ? '+' : '-'}{tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-brand-500/10 rounded-[2.5rem] p-8 border border-brand-500/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center text-[#032137]">
                <LucideTrendingUp size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Earn More Points</h4>
                <p className="text-muted text-sm">Refer a friend to OribiServ and get 500 points instantly.</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-brand-500 text-[#032137] font-bold rounded-xl hover:bg-brand-600 transition-all">
              Refer Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
