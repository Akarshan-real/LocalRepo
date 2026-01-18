import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { cookieStuff } from "../utils/cookies";
import { type User, type AuthContextType } from "../types/auth.types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const token = cookieStuff.getToken();
        if (token) {
            try {
                const decode = jwtDecode<User>(token);

                if (decode.exp < Date.now() / 1000) {
                    cookieStuff.removeToken();
                    setUser(null);
                }
                else {
                    setUser(decode);
                }
            }
            catch (error) {
                console.error(`Invalid token ${error}`);
                cookieStuff.removeToken();
                setUser(null);
            };
        };
        setLoading(false);
    }, []);

    const login = (token: string): void => {
        cookieStuff.setToken(token);

        const decode = jwtDecode<User>(token);
        setUser(decode);
    };

    const logout = (): void => {
        cookieStuff.removeToken();
    };

    const getToken = (): string | undefined => {
        return cookieStuff.getToken();
    };

    const isAuthenticated = (): boolean => {
        return user !== null;
    };

    const value: AuthContextType = { user, loading, login, logout, getToken, isAuthenticated };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(`useAuth must be within AuthProvider`);
    }

    return context;
}; 