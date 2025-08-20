// * fichier qui contient la configuration du serveur
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
// Sécurité
app.disable('x-powered-by');

app.use(cors({ origin: "*" }));

// app.use(rateLimit);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test du back
app.get("/", (_req, res) => {
    res.send("Welcome to the backend server!");
});

export { app };
