import { cookieStuff } from "./cookies";
import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/bomboclat';

// Access Token Management
let accessToken: string | null = null;

export const atm = { // access token manager
    setAccessToken: (token: string): void => {
        accessToken = token;
    },
    getAccessToken: (): string | null => accessToken,
    clearAccessToken: (): void => {
        accessToken = null;
    }
};

// Axios Instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Refresh token management
let isRefreshing: boolean = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (value?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(promise => {
        if (error) {
            promise.reject(error);
        }
        else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};

// Request Interceptors ==================== Runs after every request
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        };

        console.log(`${config.method?.toUpperCase()} ${config.url}`);
        return config;
    }
    ,
    (error: AxiosError) => {
        console.log(`Error -> ${error}`);
        return Promise.reject(error);
    }
);

// Response Interceptors =================== Runs after every response
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(`${response.config.method?.toUpperCase()} ${response.config.url}`);
        return response;
    }
    ,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        console.log(`Response Error : ${error.response?.status} , ${error.message}`);

        if (error.response?.status === 401 && !originalRequest._retry) {
            // If refresh endpoint itself failed, logout
            if (originalRequest.url === '/refresh') {
                console.log(`Refresh token expired`);
                atm.clearAccessToken();
                window.location.href = '/login';
                return Promise.reject(error);
            };
            // If already refreshing, queue this request 
            if (isRefreshing) {
                try {
                    const token = await new Promise<string>((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    };
                    return axiosInstance(originalRequest);
                    
                } catch (err) {
                    return Promise.reject(err);
                };
            };
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                console.log(`Access Token expired - Refreshing...`);
                const response = await axiosInstance.post('/refresh');
                const newAccessToken = response.data.accessToken;

                atm.setAccessToken(newAccessToken);
                console.log(`Token refresh successful`);

                processQueue(null, newAccessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log(`Refresh failed - logging out`);
                processQueue(refreshError as AxiosError, null);
                atm.clearAccessToken();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        if (error.response?.status === 403) {
            console.log(`No permission lil bro`);
        }
        if (error.response?.status === 500) {
            console.log(`Server Error`);
        }
        return Promise.reject(error);
    }
);

export const api = {
    get: (endPoint: string) => axiosInstance.get(endPoint),
    post: (endPoint: string, data?: unknown) => axiosInstance.post(endPoint, data),
    put: (endPoint: string, data?: unknown) => axiosInstance.put(endPoint, data),
    delete: (endPoint: string) => axiosInstance.delete(endPoint)
};

// Normal way without interceptors ====================================================================================================
// Ignore code below
// ====================================================================================================================================

function getConfig(customConfig: AxiosRequestConfig = {}): AxiosRequestConfig {
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
}

const handleApiError = (error: any) => {
    if (error.response?.status === 401) {
        cookieStuff.removeToken();
        window.location.href = '/login';
        throw new Error("Unauthorized - redirecting to login");
    }
    console.error(`API call error ${error}`);
    throw error;
};

export const api_ = {
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
