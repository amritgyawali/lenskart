export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'eyeglasses' | 'sunglasses' | 'computer-glasses' | 'kids-glasses' | 'reading-glasses';
  frameShape: 'rectangle' | 'round' | 'wayfarer' | 'cat-eye' | 'hexagonal' | 'aviator';
  frameColor: string;
  lensColor?: string;
  material: string;
  size: {
    width: number;
    height: number;
    bridge: number;
  };
  features: string[];
  description: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  collection?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: {
    frameShape?: string;
    favoriteColors?: string[];
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface FilterOptions {
  category?: string[];
  frameShape?: string[];
  priceRange?: [number, number];
  brand?: string[];
  color?: string[];
  material?: string[];
  inStock?: boolean;
}

export interface SearchParams {
  query?: string;
  filters?: FilterOptions;
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest' | 'popular';
}
