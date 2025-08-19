import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Conversation extends Model {};

Conversation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        }
    },
    {
        sequelize: sequelize,
        tableName: 'conversation'
    }
);

export { Conversation };
