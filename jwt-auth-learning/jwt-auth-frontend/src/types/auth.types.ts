export interface User {
    sub: string;
    name: string;
    exp: number;
}

export interface LoginCredentials {
    name: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout : () => void ;
    getToken : () => string | undefined;
    isAuthenticated : () => boolean;
}