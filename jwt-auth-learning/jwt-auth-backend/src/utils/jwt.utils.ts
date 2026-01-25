import Jwt from "jsonwebtoken";
import { JWTPayLoad, RefreshTokenPayload } from "../types/types";

const JWT_SECRET = process.env.JWT_SECRET || 'lol';

export const generateAccessToken = (userID: string, name: string): string => {
    const payload: JWTPayLoad = {
        sub: userID,
        name: name,
    };
    return Jwt.sign(payload,JWT_SECRET,{expiresIn : '15m'});
};

export const generateRefreshToken = (userID : string) : string => {
    const payload : RefreshTokenPayload = {
        sub : userID,
        type : "refresh",
    };
    return Jwt.sign(payload,JWT_SECRET,{expiresIn : '7d'});
};

export const verifyAccessToken = (token : string) : JWTPayLoad => {
    return Jwt.verify(token , JWT_SECRET) as JWTPayLoad;
};

export const verifyRefreshToken = (token : string) : RefreshTokenPayload => {
    return Jwt.verify(token,JWT_SECRET) as RefreshTokenPayload;
};

