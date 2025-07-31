"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { storage } from '@/lib/utils';
import { AppError, ErrorCode, logError } from '@/lib/errors';
import { ValidationSchemas } from '@/lib/validation';

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; userData: Partial<User> }
  | { type: 'SET_LAST_ACTIVITY'; lastActivity: Date };

function authReducer(state: AuthState, action: AuthAction): AuthState {
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

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        lastActivity: new Date(),
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
        user: state.user ? { ...state.user, ...action.userData } : null,
      };

    case 'SET_LAST_ACTIVITY':
      return {
        ...state,
        lastActivity: action.lastActivity,
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

// Mock users database (in production, this would be handled by your backend)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@lenskart.com',
    name: 'Demo User',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    isEmailVerified: true,
    isPhoneVerified: false,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Load user from localStorage on mount
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    
    try {
      const savedUser = storage.get<User | null>(STORAGE_KEYS.user, null);
      if (savedUser) {
        dispatch({ type: 'LOGIN_SUCCESS', user: savedUser });
      }
    } catch (error) {
      const appError = new AppError('Failed to load user session', ErrorCode.UNKNOWN_ERROR);
      logError(appError, { context: 'AuthProvider.loadUser' });
      dispatch({ type: 'SET_ERROR', error: 'Failed to load user session' });
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  }, []);

  // Save user to localStorage whenever auth state changes
  useEffect(() => {
    if (!authState.isLoading) {
      if (authState.user) {
        storage.set(STORAGE_KEYS.user, authState.user);
      } else {
        storage.remove(STORAGE_KEYS.user);
      }
    }
  }, [authState.user, authState.isLoading]);

  // Auto-logout after inactivity
  useEffect(() => {
    if (authState.isAuthenticated && authState.lastActivity) {
      const inactivityTimeout = setTimeout(() => {
        const now = new Date();
        const lastActivity = new Date(authState.lastActivity!);
        const timeDiff = now.getTime() - lastActivity.getTime();
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

        if (timeDiff > thirtyMinutes) {
          logout();
        }
      }, 60000); // Check every minute

      return () => clearTimeout(inactivityTimeout);
    }
  }, [authState.isAuthenticated, authState.lastActivity]);

  // Update last activity on user interaction
  useEffect(() => {
    const updateActivity = () => {
      if (authState.isAuthenticated) {
        dispatch({ type: 'SET_LAST_ACTIVITY', lastActivity: new Date() });
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [authState.isAuthenticated]);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    dispatch({ type: 'SET_ERROR', error: null });

    try {
      // Validate input
      const validation = ValidationSchemas.login({ email, password });
      if (!validation.isValid) {
        const errorMessage = validation.errors[0]?.message || 'Invalid input';
        dispatch({ type: 'SET_ERROR', error: errorMessage });
        return false;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication (in production, this would be an API call)
      const user = mockUsers.find(u => u.email === email);
      
      if (!user || password !== 'password123') {
        dispatch({ type: 'SET_ERROR', error: 'Invalid email or password' });
        return false;
      }

      dispatch({ type: 'LOGIN_SUCCESS', user });
      return true;
    } catch (error) {
      const appError = new AppError('Login failed', ErrorCode.INVALID_CREDENTIALS);
      logError(appError, { email, context: 'AuthProvider.login' });
      dispatch({ type: 'SET_ERROR', error: 'Login failed. Please try again.' });
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    dispatch({ type: 'SET_ERROR', error: null });

    try {
      // Validate input
      const validation = ValidationSchemas.signup({ email, password, name, confirmPassword: password });
      if (!validation.isValid) {
        const errorMessage = validation.errors[0]?.message || 'Invalid input';
        dispatch({ type: 'SET_ERROR', error: errorMessage });
        return false;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        dispatch({ type: 'SET_ERROR', error: 'Email already exists' });
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
        isEmailVerified: false,
        isPhoneVerified: false,
      };

      // Add to mock database
      mockUsers.push(newUser);

      dispatch({ type: 'LOGIN_SUCCESS', user: newUser });
      return true;
    } catch (error) {
      const appError = new AppError('Signup failed', ErrorCode.UNKNOWN_ERROR);
      logError(appError, { email, name, context: 'AuthProvider.signup' });
      dispatch({ type: 'SET_ERROR', error: 'Signup failed. Please try again.' });
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', userData });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', error: null });
  };

  return (
    <AuthContext.Provider value={{
      authState,
      login,
      signup,
      logout,
      updateUser,
      clearError,
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