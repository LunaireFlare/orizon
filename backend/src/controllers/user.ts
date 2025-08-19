import { Response, Request } from "express";
import argon2 from "argon2";
import { User } from '../models/associations.js';
import { z } from "zod";

const userController = {
    async getAllUsers(req: Request, res: Response) {
        const users = await User.findAll();
        res.json(users);
    },

    async createUser(req: Request, res: Response) {
        const body = req.body;

        const sixtyYearsAgo = (): Date => {
            const today = new Date();
            return new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
        };

        const userSchema = z.object({
            lastname: z.string().min(1).max(255),
            firstname: z.string().min(1).max(255),
            email: z.email(),
            password: z.string().min(12).max(255),
            zip_code: z.string().length(5).regex(/^\d{5}$/),
            city: z.string().min(1).max(255),
            date_of_birth: z.preprocess(
                (val) => (val ? new Date(val as string) : val),
                z.date().max(sixtyYearsAgo(), "Vous devez avoir au moins 60 ans")
            ),
            role: z.string().default("user"),
            photo: z.string().nullable().default(null),
            status: z.enum(["en_attente", "valide", "bloqué", "désactivé"]).default("en_attente")
        });

        const { error, data } = userSchema.safeParse(body);

        if (error) {
            return res.status(400).json({ error: error.message });
        };

        const { lastname, firstname, email, password, zip_code, city, date_of_birth, role, photo, status } = data;

        const userExists = await User.findOne({ where: { email: email } });

        if (userExists !== null) {
            return res.status(400).json({ error: 'User already exists.' });
        };

        const hashedPassword = await argon2.hash(password);

        const createdUser = await User.create({ lastname, firstname, email, password: hashedPassword, zip_code, city, date_of_birth, role, photo, status });

        res.status(201).json(createdUser);
    },

}

export { userController }