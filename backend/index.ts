// fichier qui contient le server lui-même et le port d'écoute
import { app } from './src/app.ts';
const server = app;

server.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});