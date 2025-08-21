import { Sequelize } from 'sequelize-typescript';
import { config } from '../../../utils/getConfig.js';

if (!config.pg_url) {
    throw new Error("config.pg_url est manquant !");
}

const sequelize = new Sequelize(config.pg_url, {
    dialect: 'postgres',
    logging: false,
});

export { sequelize } ;
