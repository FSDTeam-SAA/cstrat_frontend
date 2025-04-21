'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
  address?: string;
  gender?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, userData?: Partial<User>) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  refetchUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse user data', error);
        }
      }
    }

    setLoading(false);
  }, []);

  const login = (newToken: string, userData?: Partial<User>) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem('auth_token', newToken);

    try {
      const tokenParts = newToken.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const extractedUser = {
          id: payload.id || '',
          name: payload.name || 'User',
          email: payload.email || '',
          role: payload.role || '',
          avatar: payload.avatar ? `${payload.avatar}?cb=${Date.now()}` : undefined,
          ...userData,
        };

        setUser(extractedUser as User);
        localStorage.setItem('auth_user', JSON.stringify(extractedUser));
      }
    } catch (error) {
      console.error('Failed to parse token', error);

      if (userData) {
        const newUser = {
          id: userData.id || '',
          name: userData.name || 'User',
          email: userData.email || '',
          role: userData.role || '',
          avatar: userData.avatar ? `${userData.avatar}?cb=${Date.now()}` : undefined,
        };
        setUser(newUser as User);
        localStorage.setItem('auth_user', JSON.stringify(newUser));
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    router.push('/');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  const refetchUser = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await res.json();
      const updatedUser = {
        ...data.user,
        avatar: data.user.avatar ? `${data.user.avatar}?cb=${Date.now()}` : undefined,
      };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Failed to refetch user', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        updateUser,
        refetchUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
