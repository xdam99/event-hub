// import { createContext } from "react";
// import { useState } from "react";
// import { login as loginApi } from "../api/api";
// import { AuthContextType } from "../context/AuthContext";
// import type { User } from "../api/types";


// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(() => localStorage.getItem(STORAGE_USER) ? JSON.parse(localStorage.getItem(STORAGE_USER) || "") : null);
//   const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_TOKEN));

//   // 🔐 LOGIN
//   const login = async (email: string, password: string) => {
//     const res = await loginApi(email, password);

//     // persistance
//     localStorage.setItem(STORAGE_TOKEN, res.token);
//     localStorage.setItem(STORAGE_USER, JSON.stringify(res.user));

//     // state React
//     setToken(res.token);
//     setUser(res.user);
//   };

//   // 🚪 LOGOUT
//   const logout = () => {
//     localStorage.removeItem(STORAGE_TOKEN);
//     localStorage.removeItem(STORAGE_USER);
//     setUser(null);
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };