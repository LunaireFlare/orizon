import { Router } from 'express';
import { eventController } from '../controllers/event.js';
import { authMiddleware } from '../middlewares/auth.js';
const eventRouter = Router();

eventRouter.route('/events')
    .get(authMiddleware, eventController.getAllEvents)
    .post(authMiddleware, eventController.createEvent);

eventRouter.route('/events/:id')
    .get(authMiddleware, eventController.getOneEvent)
    .patch(authMiddleware, eventController.updateEvent)
    .delete(authMiddleware, eventController.deleteEvent);

eventRouter.route('/events/:event_id/users/:user_id')
    .post(authMiddleware, eventController.associateEventToParticipant)
    .delete(authMiddleware, eventController.dissociateEventFromParticipant);

eventRouter.route('/events/:event_id/interests/:interest_id')
    .post(authMiddleware, eventController.associateEventToInterest);

export { eventRouter };