import { Router } from 'express';
import { eventController } from '../controllers/event.js';
import { authMiddleware } from '../middlewares/auth.js';
const eventRouter = Router();

eventRouter.route('/events')
    .get(authMiddleware, eventController.getAllEvents)
    .post(authMiddleware, eventController.createEvent);

eventRouter.route('/events/:id')
    .get(authMiddleware, eventController.getOneEvent);

export { eventRouter };