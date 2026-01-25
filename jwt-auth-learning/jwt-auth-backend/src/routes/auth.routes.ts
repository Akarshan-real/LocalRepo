import { Router, Request, Response } from "express";
import { LogInRequest } from "../types/types";
import { findUserByName, findUserById } from "../config/database";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.utils";

const router = Router();

router.post('/login', (req: Request, res: Response) => {
    const { name, password }: LogInRequest = req.body;

    console.log(`Login for ${name}`);

    if (!name || !password) {
        return res.status(400).json({ message: `Name and password required` });
    };

    const user = findUserByName(name);

    if (!user || user.password === password) {
        console.log(`Invalid credentials for ${name}`);
        return res.status(401).json({ message: 'Invalid credentails' });
    };

    console.log(`${name} authenticated`);

    const accessToken = generateAccessToken(user.id, user.name);

    const refreshToken = generateRefreshToken(user.id);

    res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 /* days */ * 24 /* hours */ * 60 /* minutes */ * 60 /* seconds */ * 1000 /* milisecond */
    });

    console.log('🍪 Refresh token set in httpOnly cookie');
    console.log('🔑 Access token generated (expires in 15m)');

    res.json({
        accessToken: accessToken,
        message: 'Login successful',
        user: {
            id: user.id,
            name: user.name
        }
    });
});
router.post('/refresh', (req: Request, res: Response) => {
    console.log(`Refresh token request recieved`);

    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        console.log(`No refresh token in cookie`);
        return res.status(401).json({ message: 'User not found' });
    };

    try {
        const decoded = verifyRefreshToken(refreshToken);

        console.log('✅ Refresh token valid for user:', decoded.sub);

        const user = findUserById(decoded.sub);

        if (!user) {
            console.log(`User not found : ${decoded.sub}`);
            return res.status(401).json({ message: 'User not found' })
        }

        const newAccessToken = generateAccessToken(user.id, user.name);

        console.log('New access token generated');

        res.json({
            accessToken: newAccessToken,
            message: 'Token refresh successfully'
        });
    } 
    catch (error) {
        console.log(`Invalid refresh token: ${error}`);
        return res.status(401).json({ meessage : `Invalid || expired token`});
    };
});

router.post('/logout', (req : Request , res : Response) => {
    console.log(`Logout request recieved`);

    res.clearCookie('refresh_token' , {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : 'lax'
    });

    console.log(`Refresh token cookie cleared`);

    res.json({ message : `Logout Successful`});
});

export default router;