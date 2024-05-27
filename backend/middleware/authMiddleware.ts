import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    const token = request.header('Authorization')?.split(' ')[1];

    if (!token) return response.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        request.params.id = typeof decoded !== "string" && decoded.userId;

        next();
    } catch (error) {
        response.status(401).json({ error: 'Invalid token' });
    }
};