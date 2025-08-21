import { Request, Response, NextFunction } from "express";

// Middleware pour les routes non trouvées (404)
function notFound(_req: Request, _res: Response, next: NextFunction): void {
    const error = new Error("Not found") as Error & { statusCode?: number };
    error.statusCode = 404;
    next(error);
}

// Middleware de gestion des erreurs
function errorHandler(
    error: Error & { statusCode?: number },
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
}

export { notFound, errorHandler };
