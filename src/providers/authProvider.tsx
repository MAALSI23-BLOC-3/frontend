// auth.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, UserLogin } from "../types/User";
import authService from "../service/authService";

type AuthContextType = {
  user: User | null;
  login: (user: UserLogin) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user/token when app loads
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Validate token with your backend
          const user = await authService.validateToken(token);
          setUser(user);
        }
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (userLogin: UserLogin) => {
    try {
      // Replace with your actual API call
      const { user, token } = await authService.login(userLogin);

      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (userReg: User) => {
    try {
      // Replace with your actual API call
      const { user, token } = await authService.register(userReg);
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      console.error("Register failed", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
