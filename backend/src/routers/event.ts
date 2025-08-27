import { Router } from 'express';
import { eventController } from '../controllers/event.js';
import { authMiddleware } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { userController } from '../controllers/user.js';

const eventRouter = Router();

eventRouter.route('/events')
    .get(authMiddleware, eventController.getAllEvents)
    .post(authMiddleware, eventController.createEvent);

eventRouter.route('/events/:id')
    .get(authMiddleware, eventController.getOneEvent)
    .patch(authMiddleware, eventController.updateEvent)
    .delete(authMiddleware, eventController.deleteEvent)
    .patch(
        authMiddleware,
        authorizeRoles(["modo", "admin"]),
        eventController.updateStatus
      );


eventRouter.route('/events/:event_id/users/:user_id')
    .post(authMiddleware, eventController.associateEventToParticipant)
    .delete(authMiddleware, eventController.dissociateEventFromParticipant);

eventRouter.route('/events/:event_id/interests/:interest_id')
    .post(authMiddleware, eventController.associateEventToInterest)
    .delete(authMiddleware, eventController.dissociateEventFromInterest);

export { eventRouter };