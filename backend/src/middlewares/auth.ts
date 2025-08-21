import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

export interface JwtPayload {
    id: number;
    email: string;
}

// On déclare une propriété personnalisée "user" sur l'objet Request, qui reprends entre autres les informations du JWT.
declare module "express-serve-static-core" {
    interface Request {
        user: JwtPayload;
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token manquant" });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ error: "JWT_SECRET non défini" });
        }

        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalide" });
    }
};
