import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../models/User.js";

config(); // charge .env

const authController = {
    /**
     * Connexion utilisateur : vérifie email + mot de passe et renvoie un JWT
     */
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Utilisateur non trouvé" });
            }

            const valid = await argon2.verify(user.password, password);
            if (!valid) {
                return (
                    res
                        .status(401)
                        // Mettre un autre message d'erreur pour éviter les attaques par force brute ??
                        .json({ error: "Mot de passe incorrect" })
                );
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: "1h" }
            );

            res.json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },
};

export { authController };
