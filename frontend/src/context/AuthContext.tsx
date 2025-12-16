import React, { createContext, useContext, useState, useEffect } from "react";
import type { Customer } from "../types/api";

interface AuthContextType {
  user: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize - check for existing token
  useEffect(() => {
    const storedToken = localStorage.getItem("customer_token");
    if (storedToken) {
      setToken(storedToken);
      fetchProfile(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Fetch user profile
  const fetchProfile = async (authToken: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/customers/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Invalid token, clear it
      localStorage.removeItem("customer_token");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login with token
  const login = async (authToken: string) => {
    localStorage.setItem("customer_token", authToken);
    setToken(authToken);
    await fetchProfile(authToken);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("customer_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
