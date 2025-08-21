import { Router } from 'express';
import { eventController } from '../controllers/event.js';
const eventRouter = Router();

eventRouter.route('/events')
    .get(eventController.getAllEvents);

eventRouter.route('/events/:id')
    .get(eventController.getOneEvent);

export { eventRouter };