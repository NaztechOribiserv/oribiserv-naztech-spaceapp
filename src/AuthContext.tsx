import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { firestoreService, UserProfileData } from './services/firestoreService';

export interface CartItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  loyaltyPoints: number;
  membershipTier: 'Basic' | 'Plus' | 'Premium';
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: number) => void;
  updateCartQty: (id: number, qty: number) => void;
  clearCart: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  isAdmin: false,
  loyaltyPoints: 0,
  membershipTier: 'Basic',
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQty: () => {},
  clearCart: () => {},
  refreshProfile: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [membershipTier, setMembershipTier] = useState<'Basic' | 'Plus' | 'Premium'>('Basic');
  
  // Shopping cart internal state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('oribi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('oribi_cart', JSON.stringify(cart));
  }, [cart]);

  // Read profile directly from database dynamically
  const loadProfile = async (currentUser: User) => {
    try {
      let profile = await firestoreService.getUserProfile(currentUser.uid);
      if (!profile) {
        // Safe lazy profile provisioning on first authenticated login
        profile = await firestoreService.createUserProfile(currentUser.uid, currentUser.email || '');
      }
      setLoyaltyPoints(profile.loyaltyPoints);
      setMembershipTier(profile.membershipTier);
    } catch (err) {
      console.error("Error synchronizing profile payload:", err);
      // Fail-safe defaults
      setLoyaltyPoints(0);
      setMembershipTier('Basic');
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadProfile(user);
    }
  };

  useEffect(() => {
    // Run connectivity test sanitization
    firestoreService.testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      setUser(newUser);
      if (newUser) {
        setIsAdmin(newUser.email === 'naz.kamwendo@gmail.com');
        await loadProfile(newUser);
      } else {
        setIsAdmin(false);
        setLoyaltyPoints(0);
        setMembershipTier('Basic');
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Cart operations
  const addToCart = (product: Omit<CartItem, 'qty'>) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQty = (id: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAdmin, 
      loyaltyPoints, 
      membershipTier,
      cart,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      refreshProfile
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
