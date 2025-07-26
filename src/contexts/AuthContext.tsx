"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User, UserId } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/utils';
import { AppError, ErrorCode, AuthenticationError, logError } from '@/lib/errors';
import { ValidationSchemas } from '@/lib/validation';

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshAuth: () => Promise<void>;
  deleteAccount: () => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGIN_FAILURE'; error: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; userData: Partial<User> }
  | { type: 'LOAD_USER'; user: User }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'UPDATE_LAST_ACTIVITY' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'LOGIN_SUCCESS':
      return {
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        lastActivity: new Date(),
      };

    case 'LOGIN_FAILURE':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.error,
        lastActivity: null,
      };

    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        lastActivity: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { 
          ...state.user, 
          ...action.userData,
          updatedAt: new Date(),
        } : null,
      };

    case 'LOAD_USER':
      return {
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        lastActivity: action.user.lastLoginAt || new Date(),
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };

    case 'UPDATE_LAST_ACTIVITY':
      return {
        ...state,
        lastActivity: new Date(),
      };

    default:
      return state;
  }
}

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  lastActivity: null,
};

// Enhanced mock user database with better data structure
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@lenskart.com',
    name: 'Demo User',
    phone: '+91 9876543210',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date(),
    isEmailVerified: true,
    isPhoneVerified: true,
    preferences: {
      frameShape: 'rectangle',
      favoriteColors: ['black', 'blue'],
      preferredBrands: ['Vincent Chase', 'John Jacobs'],
      priceRange: [1000, 3000],
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
    },
    addresses: [
      {
        id: '1',
        type: 'home',
        name: 'Home',
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        isDefault: true,
      },
    ],
  }
  }
];

// Simulate password storage (in real app, this would be hashed)
const mockPasswords: Record<string, string> = {
  'demo@lenskart.com': 'Demo@123',
};
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = storage.get<User | null>(STORAGE_KEYS.user, null);
      if (savedUser) {
        // Validate user data structure
        if (savedUser.id && savedUser.email && savedUser.name) {
          dispatch({ type: 'LOAD_USER', user: savedUser });
        } else {
          storage.remove(STORAGE_KEYS.user);
        }
      }
    } catch (error) {
      const appError = new AppError('Failed to load user session', ErrorCode.UNKNOWN_ERROR);
      logError(appError, { context: 'AuthProvider.loadUser' });
      storage.remove(STORAGE_KEYS.user);
    }
  }, []);

  // Save user to localStorage whenever auth state changes
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      storage.set(STORAGE_KEYS.user, authState.user);
    } else {
      storage.remove(STORAGE_KEYS.user);
    }
  }, [authState]);

  // Update last activity periodically
  useEffect(() => {
    if (authState.isAuthenticated) {
      const interval = setInterval(() => {
        dispatch({ type: 'UPDATE_LAST_ACTIVITY' });
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [authState.isAuthenticated]);

  // Auto-logout after inactivity (30 minutes)
  useEffect(() => {
    if (authState.isAuthenticated && authState.lastActivity) {
      const timeout = setTimeout(() => {
        const now = new Date();
        const lastActivity = new Date(authState.lastActivity);
        const inactiveTime = now.getTime() - lastActivity.getTime();
        const maxInactiveTime = 30 * 60 * 1000; // 30 minutes

        if (inactiveTime >= maxInactiveTime) {
          logout();
        }
      }, 60000); // Check every minute

      return () => clearTimeout(timeout);
    }
  }, [authState.isAuthenticated, authState.lastActivity]);
  const login = async (email: string, password: string): Promise<boolean> => {
    // Validate input
    const validation = ValidationSchemas.login({ email, password });
    if (!validation.isValid) {
      const errorMessage = validation.errors[0]?.message || 'Invalid input';
      dispatch({ type: 'LOGIN_FAILURE', error: errorMessage });
      return false;
    }

    dispatch({ type: 'LOGIN_START' });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Check credentials
      const storedPassword = mockPasswords[email];
      if (!storedPassword || storedPassword !== password) {
        throw new AuthenticationError('Invalid email or password');
      }

      let user = mockUsers.find(u => u.email === email);

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Update last login
      user = {
        ...user,
        lastLoginAt: new Date(),
        updatedAt: new Date(),
      };

      // Update mock database
      const userIndex = mockUsers.findIndex(u => u.id === user!.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = user;
      }

      dispatch({ type: 'LOGIN_SUCCESS', user });
      return true;
    } catch (error) {
      const appError = error instanceof AppError ? error : new AuthenticationError();
      logError(appError, { email, context: 'AuthProvider.login' });
      dispatch({ type: 'LOGIN_FAILURE', error: appError.message });
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Validate input
    const validation = ValidationSchemas.signup({ email, password, name, confirmPassword: password });
    if (!validation.isValid) {
      const errorMessage = validation.errors[0]?.message || 'Invalid input';
      dispatch({ type: 'LOGIN_FAILURE', error: errorMessage });
      return false;
    }

    dispatch({ type: 'LOGIN_START' });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new AppError('Email already exists', ErrorCode.EMAIL_ALREADY_EXISTS);
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
        isEmailVerified: false,
        isPhoneVerified: false,
        preferences: {
          frameShape: 'rectangle',
          favoriteColors: ['black'],
          preferredBrands: [],
          priceRange: [500, 5000],
          notifications: {
            email: true,
            sms: false,
            push: true,
          },
        },
        addresses: [],
      };

      // Add to mock database
      mockUsers.push(newUser);
      mockPasswords[email] = password;

      dispatch({ type: 'LOGIN_SUCCESS', user: newUser });
      return true;
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError('Signup failed', ErrorCode.UNKNOWN_ERROR);
      logError(appError, { email, name, context: 'AuthProvider.signup' });
      dispatch({ type: 'LOGIN_FAILURE', error: appError.message });
      return false;
    }
  };

  const refreshAuth = async (): Promise<void> => {
    if (!authState.user) return;

    try {
      // In real app, this would refresh the auth token
      const user = mockUsers.find(u => u.id === authState.user!.id);
      if (user) {
        dispatch({ type: 'UPDATE_USER', userData: user });
      } else {
        logout();
      }
    } catch (error) {
      const appError = new AppError('Failed to refresh authentication', ErrorCode.UNAUTHORIZED);
      logError(appError, { userId: authState.user.id, context: 'AuthProvider.refreshAuth' });
      logout();
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!authState.user) return false;

    try {
      // Validate current password
      const storedPassword = mockPasswords[authState.user.email];
      if (storedPassword !== currentPassword) {
        throw new AuthenticationError('Current password is incorrect');
      }

      // Validate new password
      const validation = ValidationSchemas.signup({
        email: authState.user.email,
        password: newPassword,
        name: authState.user.name,
        confirmPassword: newPassword,
      });

      if (!validation.isValid) {
        throw new AppError(validation.errors[0]?.message || 'Invalid password', ErrorCode.VALIDATION_ERROR);
      }

      // Update password
      mockPasswords[authState.user.email] = newPassword;

      // Update user
      dispatch({ type: 'UPDATE_USER', userData: { updatedAt: new Date() } });

      return true;
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError('Failed to change password', ErrorCode.UNKNOWN_ERROR);
      logError(appError, { userId: authState.user.id, context: 'AuthProvider.changePassword' });
      dispatch({ type: 'SET_ERROR', error: appError.message });
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!authState.user) return false;

    try {
      // Remove user from mock database
      const userIndex = mockUsers.findIndex(u => u.id === authState.user!.id);
      if (userIndex !== -1) {
        mockUsers.splice(userIndex, 1);
        delete mockPasswords[authState.user.email];
      }

      // Clear all user data
      storage.remove(STORAGE_KEYS.user);
      storage.remove(STORAGE_KEYS.cart);
      storage.remove(STORAGE_KEYS.wishlist);
      storage.remove(STORAGE_KEYS.preferences);

      dispatch({ type: 'LOGOUT' });
      return true;
    } catch (error) {
      const appError = new AppError('Failed to delete account', ErrorCode.UNKNOWN_ERROR);
      logError(appError, { userId: authState.user.id, context: 'AuthProvider.deleteAccount' });
      return false;
    }
  };

  const logout = () => {
    // Clear all stored data
    storage.remove(STORAGE_KEYS.user);
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    if (!authState.user) return;

    // Update in mock database
    const userIndex = mockUsers.findIndex(u => u.id === authState.user!.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData, updatedAt: new Date() };
    }

    dispatch({ type: 'UPDATE_USER', userData });
  };

  return (
    <AuthContext.Provider value={{
      authState,
      login,
      signup,
      logout,
      updateUser,
      refreshAuth,
      deleteAccount,
      changePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
        user = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          preferences: {
            frameShape: 'rectangle',
            favoriteColors: ['black']
          }
        };
        mockUsers.push(user);
      }

      dispatch({ type: 'LOGIN_SUCCESS', user });
      return true;
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      preferences: {
        frameShape: 'rectangle',
        favoriteColors: ['black']
      }
    };

    mockUsers.push(newUser);
    dispatch({ type: 'LOGIN_SUCCESS', user: newUser });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', userData });
  };

  return (
    <AuthContext.Provider value={{
      authState,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
