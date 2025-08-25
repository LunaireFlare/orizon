import { Response, Request } from 'express';
import { Event } from '../models/associations.js';
import { eventSchema } from '../schemas/event.js';

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
        * Retourne un évènement avec intérêts et participants à partir de son id.
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

        /**
         * Création d'un évènement.
         * @param req
         * @param res 
         */
        async createEvent(req: Request, res: Response) {
            const creator_id = req.user.id;
            if (!creator_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
            }

            const body = req.body;

            const { error, data } = eventSchema.safeParse(body);

            if (error) {
                return res.status(400).json({ error: error.message });
            };

            const { name, start_date, end_date, description, address, zip_code, city } = data;

            const eventExists = await Event.findOne({ where: { creator_id, start_date }});

            if (eventExists) {
                return res.status(400).json({ error: 'Vous avez déjà un évènement qui commence à la même heure ce jour-là.' });
            };
    
            const createdEvent = await Event.create({ name, start_date, end_date, description, address, zip_code, city, creator_id });
    
            res.status(201).json(createdEvent);
        },

        /**
         * Suppression d'un évènement.
         * @param req
         * @param res
         */
        async deleteEvent(req: Request, res: Response) {
            const requestor_id = req.user.id;
            if (!requestor_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
            };

            const id = parseInt(req.params.id);

            const event = await Event.findByPk(id);

            if (!event) {
                return res.status(404).json({ error: 'Event not found.'})
            };

            const eventCreatedByRequestor = await Event.findOne ({ where: { creator_id: requestor_id }});

            if (!eventCreatedByRequestor) {
                return res.status(401).json({ error: 'Vous ne pouvez supprimer que les évènements que vous avez créés.' });
            };

            // TODO: erreur ==> update or delete on table \"event\" violates foreign key constraint \"event_participant_event_id_fkey\" on table \"event_participant\". Faut d'abord supprimer enregistrements event_participant associés à cet évènement car utilisent clef primaire de event et donc event ne peut pas être supprimé avant les enregistrements qui en dépendent.

            await event.destroy();

            res.status(204).end();

        }

};

export { eventController };
