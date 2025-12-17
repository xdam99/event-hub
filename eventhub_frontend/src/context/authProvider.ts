import { createContext } from "react";
import { AuthContextType } from "../api/types";
import { User } from "../api/types";


interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);