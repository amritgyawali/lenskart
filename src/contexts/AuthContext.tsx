"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '@/lib/types';

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; userData: Partial<User> }
  | { type: 'LOAD_USER'; user: User };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true
      };

    case 'LOGIN_SUCCESS':
      return {
        user: action.user,
        isAuthenticated: true,
        isLoading: false
      };

    case 'LOGIN_FAILURE':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.userData } : null
      };

    case 'LOAD_USER':
      return {
        user: action.user,
        isAuthenticated: true,
        isLoading: false
      };

    default:
      return state;
  }
}

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false
};

// Mock user database for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@lenskart.com',
    name: 'Demo User',
    preferences: {
      frameShape: 'rectangle',
      favoriteColors: ['black', 'blue']
    }
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('lenskart-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch({ type: 'LOAD_USER', user: parsedUser });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('lenskart-user');
      }
    }
  }, []);

  // Save user to localStorage whenever auth state changes
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      localStorage.setItem('lenskart-user', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('lenskart-user');
    }
  }, [authState]);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, allow any email/password combination
    // In real app, this would make an API call to authenticate
    if (email && password) {
      let user = mockUsers.find(u => u.email === email);

      if (!user) {
        // Create new user if doesn't exist (for demo)
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
