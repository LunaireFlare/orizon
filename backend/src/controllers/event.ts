import { Response, Request } from "express";
import { Event } from '../models/associations.js';

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

            const event = await Event.findByPk(id, 
                {
                    include: [
                        {
                            association: 'interests',
                        },
                        {
                            association: 'users',
                        }
                    ]
                }
            );

            if (!event) {
                return res.status(404).json({ error: 'Event not found.' });
            };

            res.json(event);
        },

};

export { eventController };
