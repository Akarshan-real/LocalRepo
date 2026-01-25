export interface User {
    id : string,
    name : string;
}

export interface LogInRequest {
    name : string,
    password : string;
}

export interface JWTPayLoad {
    sub : string,
    name : string;
}

export interface RefreshTokenPayload  {
    sub : string,
    type : "refresh";
}