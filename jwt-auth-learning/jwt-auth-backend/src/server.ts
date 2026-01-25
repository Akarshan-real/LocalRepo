import express , { Request , Response} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import protectedRoutes from './routes/protected.routes';
import { notFoundHandler, errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

app.get('/bomboclat/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        message : 'Backend server is running',
        timeStamp : new Date().toISOString()
    });
});

app.use('/bomboclat',authRoutes);
app.use("/bomboclat",protectedRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT , () => {
    console.log(`${PORT} is running wild af`);
});

export default app;