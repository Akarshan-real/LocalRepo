/*
import Cookies from "js-cookie";

const TOKEN_NAME = 'auth_token';

export const cookieStuff = {
    setToken: (token: string): void => { 
        Cookies.set(TOKEN_NAME, token, {
            expires: 7,
            secure: window.location.protocol === 'https:', 
            sameSite: 'Lax',
            path: '/'
        })
    }
    ,
    getToken: (): string | undefined => {
        return Cookies.get(TOKEN_NAME);
    }
    ,
    removeToken: (): void => {
        Cookies.remove(TOKEN_NAME, { path: '/' }); 
    }
}
*/
import { cookieStuff } from "./cookies";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/bomboclat';

const getConfig = (customConfig: AxiosRequestConfig = {}): AxiosRequestConfig => {
    const token = cookieStuff.getToken();

    const config: AxiosRequestConfig = {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            ...customConfig.headers,
        },
        withCredentials: true,
        ...customConfig,
    };

    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`,
        };
    };

    return config;
};

const handleApiError = (error: any) => {
    if (error.response?.status === 401) {
        cookieStuff.removeToken();
        window.location.href = '/login';
        throw new Error("Unauthorized - redirecting to login");
    }
    console.error(`API call error ${error}`);
    throw error;
};

export const api = {
    get: async (endPoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            const res = await axios.get(endPoint, getConfig(config));
            return res;
        }
        catch (error) {
            return handleApiError(error);
        }
    }
    ,
    post: async (endPoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            const res = await axios.post(endPoint, data, getConfig(config));
            return res;
        }
        catch (error) {
            return handleApiError(error);
        };
    }
    ,
    put: async (endPoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            const res = await axios.put(endPoint, data, getConfig(config));
            return res;
        }
        catch (error) {
            return handleApiError(error);
        };
    }
    ,
    delete: async (endPoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            const res = await axios.delete(endPoint, getConfig(config));
            return res;
        }
        catch (error) {
            return handleApiError(error);
        }
    }

};

/*
export const apiCall = async (endPoint: string, options: RequestInit = {}): Promise<Response> => {
    const token = cookieStuff.getToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const url = endPoint.startsWith('http') ? endPoint : `${API_URL}${endPoint}`;

    try {
        const response = await axios.get(url, {
            ...options,
            headers,
            credentials: 'include'
        });

        if (response.status === 401) {
            cookieStuff.removeToken();
            window.location.href = '/login';
            throw new Error('Unauthorize');
        }

        return response;

    } catch (error) {
        console.log(`API call error : ${error}`);
        throw error;
    }
};

export const api = {
    get: (endPoint: string): Promise<Response> => {
        return apiCall(endPoint, {
            method: 'POST'
        });
    }
    ,
    post: (endPoint: string, data: unknown): Promise<Response> => {
        return apiCall(endPoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    ,
    put: (endPoint: string, data: unknown): Promise<Response> => {
        return apiCall(endPoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    ,
    delete: (endPoint: string): Promise<Response> => {
        return apiCall(endPoint, {
            method: 'DELETE',
        });
    }
}
*/
