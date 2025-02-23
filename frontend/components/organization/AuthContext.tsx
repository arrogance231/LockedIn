"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  role: "organization" | "volunteer" | "guest";
}

interface AuthContextType {
  user: User | null;
  loginAsOrg: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const loginAsOrg = () => setUser({ role: "organization" });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginAsOrg, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
