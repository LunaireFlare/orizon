import { Request, Response } from "express";
import { User } from "../models/User.js"; // adapte selon ta structure
import { Event } from "../models/Event.js";

export const adminController = {
  async updateUserStatus(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const { status } = req.body;

    const validStatuses = ["en_attente", "valide", "bloqué", "désactivé"];

    if (typeof status !== "string" || !validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Statut invalide. Utilisez l'un des suivants : ${validStatuses.join(
          ", "
        )}.`,
      });
    }

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }

      user.status = status;
      await user.save();

      return res.json({
        message: `Statut mis à jour en '${status}' pour l'utilisateur ${user.email}.`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur serveur." });
    }
  },

  async updateEventStatus(req: Request, res: Response) {
    const eventId = Number(req.params.id);
    const { status } = req.body;

    const allowedStatuses = ["en_attente", "valide", "bloqué"];

    if (typeof status !== "string" || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: `Statut invalide. Utilisez un des suivants : ${allowedStatuses.join(
          ", "
        )}.`,
      });
    }

    try {
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ error: "Événement non trouvé." });
      }

      event.status = status;
      // Cela empêchera Sequelize de revalider les champs start_date et endDate lors d'une mise à jour de status uniquement -> sinon impossible de modifier
      await event.save({ validate: false });

      return res.json({
        message: `Statut mis à jour en '${status}' pour l'événement ${event.name}.`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur serveur." });
    }
  },
};
