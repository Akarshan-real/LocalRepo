import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateToken);

router.get('/profile', (req: Request, res: Response) => {
    const user = req.user!;

    console.log(`Profile request from: ${user.name}`);

    res.json({
        id: user.sub,
        name: user.name,
        email: `${user.name}@lol.com`,
        message: 'This is protected data'
    });
});

router.get('/dashboard', (req: Request, res: Response) => {
    const user = req.user!;

    console.log(`Dashboard request from : ${user.name}`);

    res.json({
        message: `Welcome to your dashboard , ${user.name}`,
        stats: {
            posts: 42,
            followers: 1311,
            following: 133
        },
        recentActivity: [
            { action: 'Posted a photo', timestamp: new Date().toISOString() },
            { action: 'Liked a post', timestamp: new Date().toISOString() }
        ]
    });
});

export default router;