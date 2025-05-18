import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  type: 'customer' | 'seller';
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  currentUser: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('inamify_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('inamify_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('inamify_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};