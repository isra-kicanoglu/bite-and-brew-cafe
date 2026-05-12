import React, { createContext, useState, ReactNode } from 'react';
import { Product, AppContextType } from '../types';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [stamps, setStamps] = useState<number>(0);

  const login = (username: string) => setUser(username);
  const logout = () => { setUser(null); setCart([]); setStamps(0); };
  
  const addToCart = (item: Product) => setCart([...cart, item]);
  const clearCart = () => setCart([]);

  const addStamp = () => {
    if (stamps < 5) {
      setStamps(prev => prev + 1);
    } else {
      setStamps(0);
      alert("🎉 Tebrikler! 6 kahveyi tamamladın, bir sonraki kahven bizden BEDAVA!");
    }
  };

  return (
    <AppContext.Provider value={{ user, login, logout, cart, addToCart, clearCart, stamps, addStamp }}>
      {children}
    </AppContext.Provider>
  );
};