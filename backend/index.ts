// * fichier qui contient juste le serveur lui-même et port d'écoute
import { app } from './src/app.ts';
import { errorHandler, notFound } from './src/middlewares/error.ts';
import { router } from './src/routers/index.ts';
import { bodySanitizerMiddleware } from './src/middlewares/body-sanitizer.ts';

app.use(bodySanitizerMiddleware); // Pour nettoyer les données

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});