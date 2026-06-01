import React, { createContext, useContext, useState } from "react";

export type UserRole = "admin" | "common";

type AuthContextType = {
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (selectedRole: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};