import { Request, Response, NextFunction } from "express";

export function authorizeRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res
        .status(401)
        .json({ error: "Rôle utilisateur non défini dans le token." });
    }

    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({
          error: `Accès interdit : rôle requis (${allowedRoles.join(" ou ")})`,
        });
    }

    next();
  };
}
