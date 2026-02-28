import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";
import { JWTPayLoad } from "../types/types";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayLoad;
        }
    }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[authHeader.length-1]; // `Bearer ${token}`

    if (!token) {
        return res.status(401).json({ message: 'Access token needed' });
    };

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        console.log(`✅ Token verified for user :, ${decoded.name}`);
        next();
    } catch (error) {
        console.log(`Error invalid token ${error}`);
        return res.status(401).json({ message : `Invalid || expired token`});
    }
}
