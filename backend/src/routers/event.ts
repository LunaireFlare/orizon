import { Router } from 'express';
import { eventController } from '../controllers/event.js';
const eventRouter = Router();

eventRouter.route('/events')
    .get(eventController.getAllEvents)
    .post(eventController.createEvent);

eventRouter.route('/events/:id')
    .get(eventController.getOneEvent);

export { eventRouter };