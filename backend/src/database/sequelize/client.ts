import { Sequelize } from 'sequelize';
import { config } from '../../../utils/getConfig.js'

if (!config.pg_url) {
    throw new Error("config.pg_url est manquant !");
}

const sequelize = new Sequelize(config.pg_url, {
    // logging false pour ne pas polluer le terminal avec les requêtes
    // si on veut voir les requêtes, il faut enlever cette ligne
    // logging: false,
    dialect: 'postgres',
    define: {
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    },
});

export { sequelize } ;
