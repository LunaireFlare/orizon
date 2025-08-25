import { Response, Request } from "express";
import { Event } from "../models/associations.js";
import { eventSchema } from "../schemas/event.js";

const eventController = {
  /**
   * Retourne la liste des évènements.
   * @param req
   * @param res
   */
  async getAllEvents(_req: Request, res: Response) {
    const events = await Event.findAll();
    res.json(events);
  },

  /**
   * Retourne un évènement à partir de son id.
   * @param req
   * @param res
   */
  async getOneEvent(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const event = await Event.findByPk(id, {
      include: [
        {
          association: "interests",
        },
        {
          association: "users",
        },
      ],
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.json(event);
  },

  /**
   * Création d'un évènement.
   * @param req
   * @param res
   */
  async createEvent(req: Request, res: Response) {
    const body = req.body;
    // TODO: récupérer JWT d'authentification
    const { error, data } = eventSchema.safeParse(body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { name, start_date, end_date, description, address, zip_code, city } =
      data;

    // ? vérification qu'évènement existe déjà ?

    const createdEvent = await Event.create({
      name,
      start_date,
      end_date,
      description,
      address,
      zip_code,
      city,
    });

    res.status(201).json(createdEvent);
  },
};

export { eventController };
