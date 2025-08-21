import { Response, Request } from "express";
import * as argon2 from "argon2";
import { User } from "../models/associations.js";
import { userSchema } from "../schemas/user.js";

const userController = {
    /**
     * Retourne la liste des utilisateurs.
     * @param req
     * @param res
     */
    async getAllUsers(req: Request, res: Response) {
        const users = await User
            .findAll
            //     {
            //     include: [
            //         {
            //             association: 'interests',
            //         },
            //         {
            //             association: 'events',
            //         },
            //     ]
            // }
            ();
        const usersWithoutPasswords = users.map((u) => {
            const { password, ...rest } = u.toJSON();
            return rest;
        });
        res.json(usersWithoutPasswords);
    },

    /**
     * Retourne un utilisateur à partir de son id.
     * @param req
     * @param res
     */
    async getOneUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const { password, ...userWithoutPassword } = user.toJSON();
        res.json(userWithoutPassword);
    },

    /**
     * Création d'un utilisateur.
     * @param req
     * @param res
     */
    async createUser(req: Request, res: Response) {
        const body = req.body;
        const { error, data } = userSchema.safeParse(body);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const {
            lastname,
            firstname,
            email,
            password,
            zip_code,
            city,
            date_of_birth,
            photo,
            description,
        } = data;
        const userExists = await User.findOne({ where: { email: email } });

        if (userExists !== null) {
            return res.status(400).json({ error: "User already exists." });
        }

        const hashedPassword = await argon2.hash(password);
        const createdUser = await User.create({
            lastname,
            firstname,
            email,
            password: hashedPassword,
            zip_code,
            city,
            date_of_birth,
            photo,
            description,
        });

        res.status(201).json(createdUser);
    },

    /**
     * Mise à jour d'un utilisateur.
     * @param req
     * @param res
     */
    async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const body = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const { error, data } = userSchema.safeParse(body);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const {
            lastname,
            firstname,
            email,
            password,
            zip_code,
            city,
            date_of_birth,
            photo,
            description,
        } = data;
        const userExists = await User.findOne({ where: { email: email } });

        if (userExists !== null && userExists.id !== id) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const hashedPassword = await argon2.hash(password);

        user.lastname = lastname;
        user.firstname = firstname;
        user.email = email;
        user.password = hashedPassword;
        user.zip_code = zip_code;
        user.city = city;
        user.date_of_birth = date_of_birth;
        user.photo = photo;
        user.description = description;

        await user.save();

        res.json(user);
    },

    /**
     * Suppression d'un utilisateur
     * @param req
     * @param res
     */
    async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        await user.destroy();

        res.status(204).end();
    },
};

export { userController };
