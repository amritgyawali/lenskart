/**
 * Application-wide constants and configuration
 * Centralized configuration management for better maintainability
 */

export const APP_CONFIG = {
  name: 'Lenskart',
  version: '2.0.0',
  description: 'Premium Eyewear E-commerce Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://lenskart.com',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 10000,
  },
} as const;

export const STORAGE_KEYS = {
  cart: 'lenskart-cart',
  user: 'lenskart-user',
  preferences: 'lenskart-preferences',
  wishlist: 'lenskart-wishlist',
} as const;

export const ROUTES = {
  home: '/',
  products: '/products',
  product: (id: string) => `/products/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  profile: '/profile',
  auth: '/auth',
} as const;

export const PRODUCT_CATEGORIES = {
  EYEGLASSES: 'eyeglasses',
  SUNGLASSES: 'sunglasses',
  COMPUTER_GLASSES: 'computer-glasses',
  KIDS_GLASSES: 'kids-glasses',
  READING_GLASSES: 'reading-glasses',
  NEW_ARRIVALS: 'new-arrivals',
  PRESCRIPTION_SUNGLASSES: 'prescription-sunglasses',
} as const;

export const FRAME_SHAPES = {
  RECTANGLE: 'rectangle',
  ROUND: 'round',
  WAYFARER: 'wayfarer',
  CAT_EYE: 'cat-eye',
  HEXAGONAL: 'hexagonal',
  AVIATOR: 'aviator',
} as const;

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
} as const;

export const UI_CONFIG = {
  debounceDelay: 300,
  animationDuration: 200,
  toastDuration: 5000,
  maxImageSize: 5 * 1024 * 1024, // 5MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

export const CAMERA_CONFIG = {
  video: {
    width: { ideal: 640 },
    height: { ideal: 480 },
    facingMode: 'user',
  },
  constraints: {
    audio: false,
    video: true,
  },
} as const;