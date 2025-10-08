import { Response, Request } from "express";
import * as argon2 from "argon2";
import { Interest_User, User } from "../models/associations.js";
import { userSchema } from "../schemas/user.js";

const userController = {
  /**
   * Retourne la liste des utilisateurs.
   * @param req
   * @param res
   */
  async getAllUsers(req: Request, res: Response) {

    const requestor_id = req.user.id;

    if (!requestor_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
    };

    const users = await User.findAll({
      include: [
        {
          association: "interests",
          attributes: ["id", "name"],
        },
      ],
    });

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

    const requestor_id = req.user.id;

    if (!requestor_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
    };

    const user = await User.findByPk(id, {
      include: [
        {
          association: "interests",
        },
        {
          association: "events",
          include: [
            {
              association: "interests",
            },
          ],
        },
      ],
    });

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
      return res.status(409).json({ error: "User already exists." });
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

    const { password: undefined, ...userWithoutPassword } =
      createdUser.toJSON();

    res.status(201).json(userWithoutPassword);
  },

  /**
   * Mise à jour d'un utilisateur.
   * @param req
   * @param res
   */
  async updateUser(req: Request, res: Response) {
    const requestor_id = req.user.id;

    if (!requestor_id) {
        return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
    };
    
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

    const { password: undefined, ...userWithoutPassword } = user.toJSON();

    res.json(userWithoutPassword);
  },

  /**
   * Suppression d'un utilisateur
   * @param req
   * @param res
   */
  async deleteUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const requestor_id = req.user.id;

    if (id != requestor_id) {
      return res.status(401).json({
        error: "Vous n'êtes pas autorisé à supprimer cet utilisateur",
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.lastname = "";
    user.firstname = "";
    user.password = "";
    user.zip_code = "00000";
    user.city = "";
    user.date_of_birth = new Date("1900-01-01");
    user.photo = null;
    user.description = null;
    user.status = "désactivé";

    await user.save();

    res.status(204).end();
  },

  async addOneInterestToUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const requestor_id = req.user.id;

    if (id != requestor_id) {
      return res.status(401).json({
        error: "Vous n'êtes pas autorisé à supprimer cet utilisateur",
      });
    }

    const user = await User.findByPk(id);
    const { interest_id } = req.body;
    if (!user || !interest_id)
      return res.status(400).json({ error: "Not found" });

    const createdInterest = await Interest_User.create({
      interest_id,
      user_id: id,
    });

    res.status(201).json(createdInterest);
  },

  async deleteOneInterestToUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const requestor_id = req.user.id;

    if (id != requestor_id) {
      return res.status(401).json({
        error: "Vous n'êtes pas autorisé à supprimer cet utilisateur",
      });
    }

    const interest_id = parseInt(req.params.interest_id);
    if (!id || !interest_id)
      return res.status(400).json({ error: "Not found" });

    const association = await Interest_User.findOne({
      where: { interest_id, user_id: id },
    });

    if (!association) {
      return res
        .status(404)
        .json({ error: "Intérêt non trouvé pour cet utilisateur" });
    }

    await association.destroy();

    res.status(200).json({ message: "Intérêt supprimé avec succès" });
  },
};

export { userController };
