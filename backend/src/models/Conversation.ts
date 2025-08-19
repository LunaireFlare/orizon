import { Model } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Conversation extends Model {};

Conversation.init(
    {},
    {
        sequelize: sequelize,
        tableName: 'conversation'
    }
);

export { Conversation };
