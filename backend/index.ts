// * fichier qui contient juste le serveur lui-même et port d'écoute
import { app } from './src/app.js';
const server = app;

server.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});