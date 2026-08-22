import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LucideMail, LucideLock, LucideUser, LucideArrowRight, LucideLoader2, LucideGlobe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

interface AuthProps {
  onSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // You could update profile with name here if needed
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-900/50 rounded-3xl border border-white/10 glow-orb">
                <Logo size={64} />
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join ORIBISERV'}
            </h2>
            <p className="text-brand-200 mt-2 text-sm">
              {isLogin ? 'Log in to manage your services' : 'Register for fast internet and support'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <LucideUser className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-white transition-all"
                  required
                />
              </div>
            )}
            <div className="relative">
              <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-white transition-all"
                required
              />
            </div>
            <div className="relative">
              <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-white transition-all"
                required
              />
            </div>

            {error && <p className="text-red-400 text-xs text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl shadow-lg shadow-brand-900/40 transition-all flex items-center justify-center group"
            >
              {loading ? (
                <LucideLoader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Create Account'}
                  <LucideArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-white/10 w-full"></div>
              <span className="bg-brand-950 px-4 text-xs text-brand-400 uppercase tracking-widest">Or continue with</span>
              <div className="border-t border-white/10 w-full"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-all flex items-center justify-center"
            >
              <LucideGlobe className="mr-2 text-brand-400" size={18} />
              Google Account
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-brand-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-brand-500 font-bold hover:underline"
            >
              {isLogin ? 'Register Now' : 'Log In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
