import "dotenv/config";
import { config } from "../utils/getConfig.js";

const API_PORT = config.port || 3000;
const API_URL = `http://localhost:${API_PORT}/users`;

describe('Users API', () => {

    describe('GET routes', () => {

    // retourne tous les utilisateurs
        test('GET /users', async() => {
            const response = await fetch(API_URL);
            const users = await response.json();

            expect(response.status).toEqual(200);
            expect(users.length).toEqual(6);
        });
})});