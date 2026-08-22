import React, { useState } from 'react';
import { LucideShoppingCart, LucideCreditCard, LucideTruck, LucideCheckCircle, LucideChevronRight, LucideShield, LucidePlus, LucideMinus, LucideTrash2, LucideLoader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { useAuth } from '../AuthContext';
import { firestoreService } from '../services/firestoreService';

interface CheckoutProps {
  onNavigate?: (page: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const { user, cart, updateCartQty, removeFromCart, clearCart, refreshProfile } = useAuth();
  
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [orderHash, setOrderHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Shipping Form details
  const [name, setName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleNext = async () => {
    setError('');
    
    if (step === 1) {
      if (cart.length === 0) {
        setError('Your shopping cart is currently empty.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!name.trim() || !phone.trim() || !address.trim()) {
        setError('Please complete all shipping address and contact fields.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setLoading(true);
      try {
        // Prepare database order payload (15% VAT included)
        const orderTotalWithVat = Math.round(total * 1.15);
        const newOrderHash = await firestoreService.createOrder({
          userId: user?.uid || 'anonymous',
          name,
          phone,
          address,
          paymentMethod: 'Credit / Debit Card',
          items: cart,
          total: orderTotalWithVat,
          status: 'pending'
        });

        // Earn loyalty rewards (1 point per R10 spent)
        const pointsEarned = Math.floor(orderTotalWithVat / 10);
        if (pointsEarned > 0 && user) {
          await firestoreService.addLoyaltyPoints(user.uid, pointsEarned);
          await refreshProfile();
        }

        setOrderHash(newOrderHash);
        clearCart();
        setIsComplete(true);
      } catch (err: any) {
        console.error("Order process error:", err);
        setError('Transaction signature failed: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // 1. Order Confirmed Screen
  if (isComplete) {
    return (
      <div className="py-24 px-4 max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
          >
            <LucideCheckCircle size={64} />
          </motion.div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4 font-display">Order Transmitted!</h2>
        <p className="text-lg text-muted mb-4">Thank you for choosing ORIBISERV. Your order has been registered securely in our database.</p>
        <div className="mb-8 inline-block bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
          <span className="text-xs text-brand-400 font-mono font-bold uppercase tracking-widest">Order Hash: {orderHash}</span>
        </div>
        <br />
        <button 
          onClick={() => onNavigate?.('home')} 
          className="px-10 py-4 bg-brand-500 text-[#032137] rounded-2xl font-bold hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20 active:scale-95"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // 2. Empty Cart Guard
  if (cart.length === 0) {
    return (
      <div className="py-24 px-4 max-w-2xl mx-auto text-center md:py-32">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-brand-500/10 rounded-full flex items-center justify-center text-brand-400 border border-brand-500/20 shadow-inner">
            <LucideShoppingCart size={40} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 font-display">Your Basket is Empty</h2>
        <p className="text-muted mb-10 text-base leading-relaxed">You haven't added any enterprise networking equipment, fiber nodes, or software configurations to your order queue yet.</p>
        <button 
          onClick={() => onNavigate?.('store')} 
          className="px-8 py-4 bg-brand-500 text-[#032137] rounded-xl font-bold hover:bg-brand-600 transition-all shadow-lg active:scale-95"
        >
          Explore ORIBISERV Store
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">
      {/* Checkout Breadcrumbs / Steps Indicator */}
      <div className="flex items-center justify-center mb-16 space-x-4">
        <div className={`flex items-center space-x-3 ${step >= 1 ? 'text-brand-500' : 'text-muted'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border-2 transition-all ${step >= 1 ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-white/10 bg-white/5'}`}>1</div>
          <span className="text-xs font-bold uppercase tracking-widest">Cart</span>
        </div>
        <div className={`w-16 h-0.5 transition-all ${step >= 2 ? 'bg-brand-500' : 'bg-white/10'}`}></div>
        <div className={`flex items-center space-x-3 ${step >= 2 ? 'text-brand-500' : 'text-muted'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border-2 transition-all ${step >= 2 ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-white/10 bg-white/5'}`}>2</div>
          <span className="text-xs font-bold uppercase tracking-widest">Shipping</span>
        </div>
        <div className={`w-16 h-0.5 transition-all ${step >= 3 ? 'bg-brand-500' : 'bg-white/10'}`}></div>
        <div className={`flex items-center space-x-3 ${step >= 3 ? 'text-brand-500' : 'text-muted'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border-2 transition-all ${step >= 3 ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-white/10 bg-white/5'}`}>3</div>
          <span className="text-xs font-bold uppercase tracking-widest">Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-surface/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <LucideShoppingCart size={28} className="mr-4 text-brand-500" />
                    Your Shopping Cart
                  </h3>
                  <button 
                    onClick={clearCart} 
                    className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-white/5 last:border-0 gap-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-500 border border-white/10">
                          <LucideShoppingCart size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{item.name}</h4>
                          <span className="text-brand-400 font-bold text-sm">R{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-6">
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-2">
                          <button 
                            onClick={() => updateCartQty(item.id, item.qty - 1)}
                            className="p-1.5 hover:bg-white/5 text-muted hover:text-white rounded-lg transition-all"
                          >
                            <LucideMinus size={14} />
                          </button>
                          <span className="w-8 text-center text-white font-bold text-xs">{item.qty}</span>
                          <button 
                            onClick={() => updateCartQty(item.id, item.qty + 1)}
                            className="p-1.5 hover:bg-white/5 text-muted hover:text-white rounded-lg transition-all"
                          >
                            <LucidePlus size={14} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <LucideTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-surface/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10"
              >
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <LucideTruck size={28} className="mr-4 text-brand-500" />
                  Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[0.65rem] font-bold text-muted uppercase tracking-[0.2em]">Contact Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                      placeholder="e.g. Naz Kamwendo" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[0.65rem] font-bold text-muted uppercase tracking-[0.2em]">Phone Number</label>
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                      placeholder="e.g. 079 898 3375" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[0.65rem] font-bold text-muted uppercase tracking-[0.2em]">Delivery Address</label>
                    <textarea 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-brand-500 outline-none h-32 transition-all resize-none" 
                      placeholder="Street number, building name, suburb, city, postal code"
                    ></textarea>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-surface/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10"
              >
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <LucideCreditCard size={28} className="mr-4 text-brand-500" />
                  Payment Method
                </h3>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl border-2 border-brand-500 bg-brand-500/10 flex items-center justify-between cursor-pointer group transition-all">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-500">
                        <LucideCreditCard size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Credit / Debit Card</h4>
                        <p className="text-xs text-muted">Pay securely using custom gateway</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-4 border-brand-500 bg-white"></div>
                  </div>
                  
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all group">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-muted group-hover:text-white transition-colors">
                        <LucideCheckCircle size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Instant EFT</h4>
                        <p className="text-xs text-muted">Secure direct bank transfer clearance</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-white/20 bg-transparent"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-xs font-bold font-mono">
              Error: {error}
            </div>
          )}
        </div>

        {/* Right Sticky Order Summary Panel */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-900/40 backdrop-blur-xl rounded-[2.5rem] p-10 text-white sticky top-24 border border-brand-500/20 shadow-2xl"
          >
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-12 h-12 bg-brand-500/20 rounded-2xl flex items-center justify-center border border-brand-500/30">
                <Logo size={28} />
              </div>
              <h3 className="text-xl font-bold font-display">Order Summary</h3>
            </div>
            
            <div className="space-y-5 mb-10">
              <div className="flex justify-between text-sm font-medium text-muted">
                <span>Subtotal</span>
                <span className="text-white">R{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-muted">
                <span>Shipping</span>
                <span className="text-green-400 font-bold uppercase tracking-widest text-[0.6rem]">Free</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-muted">
                <span>Tax (15% VAT)</span>
                <span className="text-white">R{Math.round(total * 0.15).toLocaleString()}</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[0.6rem] text-muted uppercase tracking-widest font-bold mb-1">Total Amount</p>
                  <span className="text-3xl font-display font-bold text-brand-400">R{Math.round(total * 1.15).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              disabled={loading}
              className="w-full py-5 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-550/50 disabled:cursor-not-allowed text-[#032137] rounded-2xl font-bold flex items-center justify-center transition-all shadow-xl shadow-brand-500/20 active:scale-95 text-lg"
            >
              {loading ? (
                <LucideLoader2 className="animate-spin mr-2" size={24} />
              ) : (
                <>
                  {step === 3 ? 'Place Order' : 'Continue'}
                  <LucideChevronRight size={24} className="ml-2" />
                </>
              )}
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 opacity-40">
              <LucideShield size={14} />
              <p className="text-[0.6rem] uppercase tracking-widest font-bold">Secure Checkout</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
