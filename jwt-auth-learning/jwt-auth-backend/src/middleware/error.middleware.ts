import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req : Request , res : Response) => {
    res.status(401).json({
        message : 'Endpoint not found',
        path : req.path
    });
};

//Global Error Handler 
export const errorHandler = (err : Error , req : Request , res : Response , next: NextFunction) => {
    console.log(`Server error ${err}`);
    res.status(500).json({
        message : `Internal server error`,
        error : process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};