import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/User.js";

const authController = {
  /**
   * Connexion utilisateur : vérifie email + mot de passe et renvoie un JWT
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Identifiants invalides" });
      }

      const valid = await argon2.verify(user.password, password);
      if (!valid) {
        return (
          res
            .status(401)
            // Message générique pour éviter de donner des infos sur l'existence de l'utilisateur à voir si on est plus implicite pour le besoin des utilisateurs
            .json({ error: "Identifiants invalides" })
        );
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

export { authController };
