import { Request, Response, NextFunction } from "express";

export function authorizeRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res
        .status(401)
        .json({ error: "Oh non vous n'êtes pas autorisé :( " });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        error: "Oh non vous l'accès est interdit... ",
      });
    }

    next();
  };
}
