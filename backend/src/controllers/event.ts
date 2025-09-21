import { Response, Request } from 'express';
import { sequelize, Event, User, Interest } from '../models/associations.js';
import { Event_Participant, Event_Interest } from '../models/associations.js';
import { createEventSchema, updateEventSchema } from '../schemas/event.js';

const eventController = {
        /**
         * Retourne la liste des évènements.
         * @param req
         * @param res
        */
        async getAllEvents(req: Request, res: Response) {
            const requestor_id = req.user.id;
            if (!requestor_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
            };
            const events = await Event.findAll({
                    include: [
                        {
                            association: 'interests',
                        }
                    ]}
            );
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

            const {name, start_date, end_date, description, address, zip_code, city} = req.body;

            const { error, data } = createEventSchema.safeParse({name, start_date, end_date, description, address, zip_code, city});

            if (error) {
                return res.status(400).json({ error: error.message });
            };

            const { interest_id } = req.body;

            const eventExists = await Event.findOne({ where: { creator_id, start_date }});

            if (eventExists) {
                return res.status(400).json({ error: 'Vous avez déjà un évènement qui commence à la même heure ce jour-là.' });
            };
    
            const t = await sequelize.transaction();
            try {
                const createdEvent = await Event.create({ name, start_date, end_date, description, address, zip_code, city, creator_id }, {transaction: t});
    
                await Event_Participant.create({ 
                    event_id: createdEvent.id,
                    participant_id: createdEvent.creator_id 
                }, {transaction: t});
    
                await Event_Interest.create({
                    event_id: createdEvent.id,
                    interest_id
                }, {transaction: t});
    
                await t.commit();
                res.status(201).json(createdEvent);
            } catch (error) {
                await t.rollback();
                res.status(500).json({ error: 'Erreur lors de la création de l’événement' });
            }
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
            const requestor_id = req.user.id;
            if (!requestor_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
            };

            const event_id = parseInt(req.params.event_id);
            const user_id = parseInt(req.params.user_id);
            
            // [x] si user essaie d'ajouter autre personne que lui, erreur
            if (requestor_id !== user_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Vous ne pouvez pas inscrire d\'autres personnes que vous.' });
            }

            // [x] date d'évènement doit être dans le futur
            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(400).json({ error: 'Event not found.' });
            } else if (event.start_date < new Date()) {
                return res.status(400).json({ error: 'L\'évènement a déjà commencé, vous ne pouvez plus vous inscrire.'});
            };

            // [x] si créateur, message vous êtes déjà inscrit
            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(400).json({ error: 'User not found.' });
            } else if (user.id === event.creator_id) { 
                return res.status(400).json({ error: 'Vous êtes déjà inscrit(e) à cet évènement.' });
            };

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
            const requestor_id = req.user.id;
            if (!requestor_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
            };

            const event_id = parseInt(req.params.event_id);
            const user_id = parseInt(req.params.user_id);
            
            // [x] si user essaie de supprimer autre personne que lui, erreur
            if (requestor_id !== user_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Vous ne pouvez pas désinscrire d\'autres personnes que vous.' });
            }
            
            // [x] date d'évènement doit être dans le futur
            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(400).json({ error: 'Event not found.' });
            } else if (event.start_date < new Date()) {
                return res.status(400).json({ error: 'L\'évènement a déjà commencé, vous ne pouvez plus vous désinscrire.'});
            };
            
            // [x] si user est créateur, ne peut pas se désinscrire
            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(400).json({ error: 'User not found.' });
            } else if (user.id === event.creator_id) { 
                return res.status(400).json({ error: 'Vous ne pouvez pas vous désinscrire de votre évènement.' });
            };

            const eventToDelete = await Event_Participant.findOne({ where: { 
                event_id,
                participant_id : user_id
            }});

            await eventToDelete?.destroy();

            res.json({ message: 'Vous n\'êtes plus inscrit à cet évènement.'});
        },

        /**
         * Associer un évènement à un intérêt.
         * @param req
         * @param res
         */
        async associateEventToInterest(req: Request, res: Response) {
            const requestor_id = req.user.id;
            if (!requestor_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
            };

            const event_id = parseInt(req.params.event_id);
            const interest_id = parseInt(req.params.interest_id);
            
            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(400).json({ error: 'Event not found.' });
            };
            
            // [x] seulement si personne qui fait requête = creator_id
            if (requestor_id !== event.creator_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Vous ne pouvez pas modifier les évènements d\'autres membres.' });
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
            const requestor_id = req.user.id;
            if (!requestor_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter' });
            };

            const event_id = parseInt(req.params.event_id);
            const interest_id = parseInt(req.params.interest_id);

            const event = await Event.findByPk(event_id);
            if (!event) {
                return res.status(400).json({ error: 'Event not found.' });
            };

            // [x] seulement si personne qui fait requête = creator_id
            if (requestor_id !== event.creator_id) {
                return res.status(401).json({ error: 'Accès non autorisé. Vous ne pouvez pas modifier les évènements d\'autres membres.' });
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