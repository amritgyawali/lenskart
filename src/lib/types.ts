/**
 * Enhanced type definitions with better type safety and documentation
 * Includes comprehensive interfaces for all application entities
 */

// Base types for better type safety
export type ProductId = string;
export type UserId = string;
export type CategoryType = 'eyeglasses' | 'sunglasses' | 'computer-glasses' | 'kids-glasses' | 'reading-glasses' | 'new-arrivals' | 'prescription-sunglasses';
export type FrameShapeType = 'rectangle' | 'round' | 'wayfarer' | 'cat-eye' | 'hexagonal' | 'aviator';
export type SortOption = 'price-low' | 'price-high' | 'rating' | 'newest' | 'popular';

// Enhanced Product interface with better validation
export interface Product {
  id: ProductId;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: CategoryType;
  frameShape: FrameShapeType;
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
  stockQuantity: number;
  rating: number;
  reviewsCount: number;
  collection?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  seoTitle?: string;
  seoDescription?: string;
  weight?: number; // in grams
  warranty?: string;
  careInstructions?: string[];
}

// Enhanced CartItem with validation
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  addedAt: Date;
  maxQuantity?: number;
}

// Enhanced Cart with better state management
export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  updatedAt: Date;
}

// Enhanced User interface with preferences and security
export interface User {
  id: UserId;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  preferences?: {
    frameShape?: FrameShapeType;
    favoriteColors?: string[];
    preferredBrands?: string[];
    priceRange?: [number, number];
    notifications?: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  addresses?: Address[];
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

// Address interface for user profiles
export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// Enhanced AuthState with better error handling
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: Date | null;
}

// Enhanced FilterOptions with better type safety
export interface FilterOptions {
  category?: CategoryType[];
  frameShape?: FrameShapeType[];
  priceRange?: [number, number];
  brand?: string[];
  color?: string[];
  material?: string[];
  inStock?: boolean;
  rating?: number;
  hasDiscount?: boolean;
  collections?: string[];
}

// Enhanced SearchParams
export interface SearchParams {
  query?: string;
  filters?: FilterOptions;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Order and checkout types
export interface Order {
  id: string;
  userId: UserId;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Review and rating types
export interface Review {
  id: string;
  productId: ProductId;
  userId: UserId;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

// Wishlist types
export interface WishlistItem {
  productId: ProductId;
  addedAt: Date;
}

export interface Wishlist {
  userId: UserId;
  items: WishlistItem[];
  updatedAt: Date;
}

// Virtual try-on types
export interface TryOnSession {
  id: string;
  userId?: UserId;
  productId: ProductId;
  imageUrl?: string;
  settings: {
    position: { x: number; y: number };
    scale: number;
    rotation: number;
  };
  createdAt: Date;
}

// Analytics and tracking types
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  userId?: UserId;
  sessionId: string;
  timestamp: Date;
}

// Notification types
export interface Notification {
  id: string;
  userId: UserId;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Form validation types
export interface FormField<T = any> {
  value: T;
  error?: string;
  touched: boolean;
  valid: boolean;
}

export interface FormState<T extends Record<string, any>> {
  fields: { [K in keyof T]: FormField<T[K]> };
  isValid: boolean;
  isSubmitting: boolean;
  submitCount: number;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
}

// Theme and styling types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
}