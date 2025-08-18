// * fichier qui contient la configuration du serveur
import 'dotenv/config';
import express from 'express';

const app = express();

// router principal, middlewares d'erreur...

export { app }