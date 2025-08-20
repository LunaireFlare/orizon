import { sequelize } from '../database/sequelize/client.js';

beforeEach(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});