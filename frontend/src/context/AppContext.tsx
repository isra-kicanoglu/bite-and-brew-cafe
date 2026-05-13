import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image?: string;
}

export interface AppContextType {
  user: string | null;
  stamps: number;
  cart: Product[];
  login: (name: string) => void;
  logout: () => void;
  addToCart: (item: Product) => void;
  clearCart: () => void;
  setStamps: (stamps: number) => void;
  addStamp: () => void; // Hata veren eksik fonksiyonu buraya ekledik
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
  const logout = () => {
    setUser(null);
    setStamps(0);
    localStorage.clear();
  };

  const addToCart = (item: Product) => setCart((prev) => [...prev, item]);
  const clearCart = () => setCart([]);
  
  // Bu fonksiyon Menu sayfasındaki hatayı engeller. 
  // İçini boş bıraktık ki "sepete ekleyince pul artmasın" kuralın bozulmasın.
  const addStamp = () => {
    console.log("Stamp addition skipped (only allowed at checkout).");
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, 
      cart, addToCart, clearCart, 
      stamps, setStamps, addStamp // addStamp artık Context'te var!
    }}>
      {children}
    </AppContext.Provider>
  );
};