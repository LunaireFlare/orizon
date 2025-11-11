import { Request, Response, NextFunction } from "express";

export function authorizeRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ 
        error: "Vous devez vous connecter." 
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        error: "Vous n'êtes pas autorisé à accéder à la ressource.",
      });
    }

    next();
  };
}
