import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image?: string;
  hasMilkOption?: boolean; // Menu için gerekli
}

export interface AppContextType {
  user: string | null;
  stamps: number;
  cart: Product[];
  login: (name: string) => void;
  logout: () => void;
  addToCart: (item: Product) => void;
  removeFromCart: (name: string) => void; // YENİ: Tekli silme
  clearCart: () => void;
  setStamps: (stamps: number) => void;
  addStamp: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));
  const [cart, setCart] = useState<Product[]>([]);
  const [stamps, setStamps] = useState<number>(Number(localStorage.getItem('stamps')) || 0);

  useEffect(() => {
    if (user) localStorage.setItem('user', user);
    else localStorage.removeItem('user');
    localStorage.setItem('stamps', stamps.toString());
  }, [user, stamps]);

  const login = (name: string) => setUser(name);
  const logout = () => { setUser(null); setStamps(0); localStorage.clear(); };
  
  const addToCart = (item: Product) => setCart((prev) => [...prev, item]);

  // YENİ: Sepetten aynı isimli ürünün sadece ilkini siler
  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const index = prev.findIndex(item => item.name === name);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  const clearCart = () => setCart([]);
  const addStamp = () => { console.log("Stamp addition logic triggered"); };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, 
      cart, addToCart, removeFromCart, clearCart, 
      stamps, setStamps, addStamp 
    }}>
      {children}
    </AppContext.Provider>
  );
};