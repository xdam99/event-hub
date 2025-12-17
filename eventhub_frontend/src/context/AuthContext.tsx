import React, { createContext, useContext, useState } from "react";

import type { User } from "../api/types";
import { login as loginApi } from "../api/api";

// tu appelles ton interface si ce n'est déjà pas fait
interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// tu crées le contexte ici
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔑 clés de stockage (on les centralise)
const STORAGE_TOKEN = "eventhub_token";
const STORAGE_USER = "eventhub_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => localStorage.getItem(STORAGE_USER) ? JSON.parse(localStorage.getItem(STORAGE_USER) || "") : null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_TOKEN));



  // 🔐 LOGIN
  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password);

    // persistance
    localStorage.setItem(STORAGE_TOKEN, res.token);
    localStorage.setItem(STORAGE_USER, JSON.stringify(res.user));

    // state React
    setToken(res.token);
    setUser(res.user);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// à la fin tu ajoute ton useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
// je sais pas peut être une gestion d'erreur ici (optionnel au début)
  return context;
};