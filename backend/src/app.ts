// * fichier qui contient la configuration du serveur
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from './config/rate_limit.js';

import { router } from './routers/router.js';
import { notFound, errorHandler } from './middlewares/error.js';

const app = express();
// Sécurité
app.disable('x-powered-by');

// router principal, middlewares d'erreur...
app.use(cors({ origin: '*' }));
app.use(rateLimit);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

export { app };
