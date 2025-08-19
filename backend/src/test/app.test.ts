// tests/app.test.ts
import request from "supertest";
import { app } from "../app.js";

describe("Serveur backend", () => {
    it("devrait répondre 200 et afficher un message de bienvenue sur GET /", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Welcome to the backend server!");
    });

    it("devrait répondre 404 sur une route inconnue", async () => {
        const response = await request(app).get("/not-found");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Not found");
    });
});
