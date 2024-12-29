import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
interface JwtPayload {
    user: any;
}

declare global {
    namespace Express {
        // Extend Express Request interface to include user property
        interface Request {
            user?: any;
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        /**
         * The decoded JWT payload containing user information.
         * Result of verifying the JWT token with the secret key.
         * @type {JwtPayload} The decoded JWT payload object
         */
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;