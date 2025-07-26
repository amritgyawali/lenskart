"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem, Product, ProductId } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/utils';
import { AppError, ErrorCode, logError } from '@/lib/errors';

interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  error: AppError | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: ProductId) => void;
  updateQuantity: (productId: ProductId, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: ProductId) => boolean;
  getCartItemQuantity: (productId: ProductId) => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  validateCart: () => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: ProductId }
  | { type: 'UPDATE_QUANTITY'; productId: ProductId; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; cart: Cart }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_ERROR'; error: AppError | null }
  | { type: 'VALIDATE_CART' };

interface CartState extends Cart {
  isLoading: boolean;
  error: AppError | null;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };

    case 'ADD_TO_CART': {
      // Validate product stock
      if (!action.product.inStock || action.product.stockQuantity < action.quantity) {
        return {
          ...state,
          error: new AppError('Product is out of stock', ErrorCode.OUT_OF_STOCK),
        };
      }

      const existingItem = state.items.find(item => item.product.id === action.product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + action.quantity;
        
        // Check if new quantity exceeds stock
        if (newQuantity > action.product.stockQuantity) {
          return {
            ...state,
            error: new AppError('Not enough stock available', ErrorCode.OUT_OF_STOCK),
          };
        }

        const updatedItems = state.items.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
        
        const updatedCart = calculateCartTotals(updatedItems);
        return {
          ...state,
          ...updatedCart,
          error: null,
          updatedAt: new Date(),
        };
      } else {
        const newItems = [...state.items, { 
          product: action.product, 
          quantity: action.quantity,
          addedAt: new Date(),
          maxQuantity: action.product.stockQuantity,
        }];
        
        const updatedCart = calculateCartTotals(newItems);
        return {
          ...state,
          ...updatedCart,
          error: null,
          updatedAt: new Date(),
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.productId);
      const updatedCart = calculateCartTotals(newItems);
      return {
        ...state,
        ...updatedCart,
        error: null,
        updatedAt: new Date(),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId });
      }

      // Find the item to validate stock
      const item = state.items.find(item => item.product.id === action.productId);
      if (item && action.quantity > item.product.stockQuantity) {
        return {
          ...state,
          error: new AppError('Not enough stock available', ErrorCode.OUT_OF_STOCK),
        };
      }

      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      
      const updatedCart = calculateCartTotals(updatedItems);
      return {
        ...state,
        ...updatedCart,
        error: null,
        updatedAt: new Date(),
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        discount: 0,
        itemCount: 0
        updatedAt: new Date(),
        error: null,
      };

    case 'LOAD_CART':
      return {
        ...state,
        ...action.cart,
        error: null,
      };

    case 'VALIDATE_CART': {
      // Validate all items in cart
      const validItems = state.items.filter(item => {
        return item.product.inStock && item.quantity <= item.product.stockQuantity;
      });

      if (validItems.length !== state.items.length) {
        const updatedCart = calculateCartTotals(validItems);
        return {
          ...state,
          ...updatedCart,
          error: new AppError('Some items in your cart are no longer available', ErrorCode.OUT_OF_STOCK),
          updatedAt: new Date(),
        };
      }

      return state;
    }

    default:
      return state;
  }
}

// Enhanced cart calculations with tax and shipping
function calculateCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  // Calculate tax (example: 18% GST)
  const tax = Math.round(subtotal * 0.18);
  
  // Calculate shipping (free above ₹1000)
  const shipping = subtotal >= 1000 ? 0 : 100;
  
  // Calculate discount (can be enhanced with coupon logic)
  const discount = 0;
  
  const total = subtotal + tax + shipping - discount;

  return {
    items,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    itemCount,
  };
}

const initialCartState: CartState = {
  items: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  itemCount: 0
  updatedAt: new Date(),
  isLoading: false,
  error: null,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    
    try {
      const savedCart = storage.get<Cart>(STORAGE_KEYS.cart, initialCartState);
      dispatch({ type: 'LOAD_CART', cart: savedCart });
    } catch (error) {
      const appError = new AppError('Failed to load cart', ErrorCode.UNKNOWN_ERROR);
      logError(appError, { context: 'CartProvider.loadCart' });
      dispatch({ type: 'SET_ERROR', error: appError });
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!cartState.isLoading) {
      const cartToSave: Cart = {
        items: cartState.items,
        total: cartState.total,
        subtotal: cartState.subtotal,
        tax: cartState.tax,
        shipping: cartState.shipping,
        discount: cartState.discount,
        itemCount: cartState.itemCount,
        updatedAt: cartState.updatedAt,
      };
      
      storage.set(STORAGE_KEYS.cart, cartToSave);
    }
  }, [cartState]);

  // Validate cart periodically
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'VALIDATE_CART' });
    }, 60000); // Validate every minute

    return () => clearInterval(interval);
  }, []);
  const addToCart = (product: Product, quantity: number = 1) => {
    if (quantity <= 0) {
      dispatch({ type: 'SET_ERROR', error: new AppError('Invalid quantity', ErrorCode.INVALID_QUANTITY) });
      return;
    }
    
    dispatch({ type: 'ADD_TO_CART', product, quantity });
  };

  const removeFromCart = (productId: ProductId) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: ProductId, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (productId: ProductId): boolean => {
    return cartState.items.some(item => item.product.id === productId);
  };

  const getCartItemQuantity = (productId: ProductId): number => {
    const item = cartState.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = (): number => {
    return cartState.itemCount;
  };

  const getSubtotal = (): number => {
    return cartState.subtotal;
  };

  const getTax = (): number => {
    return cartState.tax;
  };

  const getShipping = (): number => {
    return cartState.shipping;
  };

  const validateCart = (): boolean => {
    dispatch({ type: 'VALIDATE_CART' });
    return cartState.error === null;
  };

  return (
    <CartContext.Provider value={{
      cart: cartState,
      isLoading: cartState.isLoading,
      error: cartState.error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getCartItemQuantity,
      getTotalItems,
      getSubtotal,
      getTax,
      getShipping,
      validateCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
