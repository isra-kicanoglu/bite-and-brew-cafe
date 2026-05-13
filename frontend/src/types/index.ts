export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl?: string; 
  hasMilkOption?: boolean; 
}

export interface AppContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  cart: Product[];
  addToCart: (item: Product) => void;
  clearCart: () => void;
  stamps: number;
  addStamp: () => void;
}