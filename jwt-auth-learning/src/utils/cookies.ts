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