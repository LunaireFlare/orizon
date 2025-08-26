import { Response, Request } from 'express';
import { Event, User, Interest } from '../models/associations.js';
import { Event_Participant, Event_Interest } from '../models/associations.js';
import { createEventSchema, updateEventSchema } from '../schemas/event.js';

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
                            association: 'creator',
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

            const { error, data } = createEventSchema.safeParse(body);

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
         * Mise à jour d'un évènement.
         * @param req
         * @param res
         */
        async updateEvent(req: Request, res: Response) {
            const requestor_id = req.user.id;
            if (!requestor_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
            };
            
            const id = parseInt(req.params.id);

            const eventExists = await Event.findByPk(id);
            if (!eventExists) {
                return res.status(400).json({ error: 'Event not found.' });
            };

            const body = req.body;
            
            const { error, data } = updateEventSchema.safeParse(body);
            
            if (error) {
                return res.status(400).json({ error: error.message });
            };
            
            const { name, start_date, end_date, description, address, zip_code, city } = data;
            
            const eventCreatedByRequestor = await Event.findOne({ where: { id: id, creator_id: requestor_id }});

            if (!eventCreatedByRequestor) {
                return res.status(401).json({ error: 'Vous ne pouvez mettre à jour que les évènements que vous avez créés.' });
            };

            const eventUpdated = await Event.update({
                name: name || eventCreatedByRequestor.name,
                start_date: start_date || eventCreatedByRequestor.start_date,
                end_date: end_date || eventCreatedByRequestor.end_date,
                description: description || eventCreatedByRequestor.description,
                address: address || eventCreatedByRequestor.address,
                zip_code: zip_code || eventCreatedByRequestor.zip_code,
                city: city || eventCreatedByRequestor.city
            }, { where: { id: id }, returning: true });

            res.json(eventUpdated);
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

            const eventCreatedByRequestor = await Event.findOne({ where: { creator_id: requestor_id }});

            if (!eventCreatedByRequestor) {
                return res.status(401).json({ error: 'Vous ne pouvez supprimer que les évènements que vous avez créés.' });
            };

            await event.destroy();

            res.status(204).end();
        },

        /**
         * Associer un évènement à un utilisateur.
         * @param req
         * @param res
         */
        async associateEventToParticipant(req: Request, res: Response) {
            const event_id = parseInt(req.params.event_id);
            const user_id = parseInt(req.params.user_id);

            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(400).json({ error: 'Event not found.' });
            };

            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(400).json({ error: 'User not found.' });
            };

            // ajouter des vérifications : 
            // - si user existe déjà dans la liste, message vous êtes déjà inscrit
            // - si user est créateur, participe déjà
            // - si user essaie d'ajouter autre personne que lui, erreur
            // - date d'évènement doit être dans le futur
            
            const eventWithUpdatedParticipants = await Event_Participant.create({
                event_id,
                participant_id : user_id
            });

            res.json(eventWithUpdatedParticipants);
        },

        /**
         * Dissocier un évènement d'un utilisateur.
         * @param req
         * @param res
         */
        async dissociateEventFromParticipant(req: Request, res: Response) {
            const event_id = parseInt(req.params.event_id);
            const user_id = parseInt(req.params.user_id);

            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(400).json({ error: 'Event not found.' });
            };

            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(400).json({ error: 'User not found.' });
            };

            // ajouter des vérifications : 
            // - si user est créateur, ne peut pas se désinscrire, faut supprimer évènement
            // - si user essaie de supprimer autre personne que lui, erreur
            // - date d'évènement doit être dans le futur

            const eventToDelete = await Event_Participant.findOne({ where: { 
                event_id,
                participant_id : user_id
            }})

            await eventToDelete?.destroy();

            res.json({ message: 'Vous n\'êtes plus inscrit à cet évènement.'});
        },

        /**
         * Associer un évènement à un intérêt.
         * @param req
         * @param res
         */
        async associateEventToInterest(req: Request, res: Response) {
            const event_id = parseInt(req.params.event_id);
            const interest_id = parseInt(req.params.interest_id);

            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(400).json({ error: 'Event not found.' });
            };

            const interest = await Interest.findByPk(interest_id);
            if (!interest) {
                return res.status(400).json({ error: 'Interest not found.' });
            };

            const eventWithUpdatedInterests = await Event_Interest.create({
                event_id,
                interest_id
            });

            res.json(eventWithUpdatedInterests);
        },

                /**
         * Dissocier un évènement d'un intérêt.
         * @param req
         * @param res
         */
        async dissociateEventFromInterest(req: Request, res: Response) {
            const event_id = parseInt(req.params.event_id);
            const interest_id = parseInt(req.params.interest_id);

            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(400).json({ error: 'Event not found.' });
            };

            const interest = await Interest.findByPk(interest_id);
            if (!interest) {
                return res.status(400).json({ error: 'Interest not found.' });
            };

            const eventToDelete = await Event_Interest.findOne({ where: { 
                event_id,
                interest_id
            }})

            await eventToDelete?.destroy();

            res.json({ message: 'Cet intérêt n\'est plus associé à cet évènement.'});
        },

};

export { eventController };