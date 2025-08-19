import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Conversation_User extends Model {}

Conversation_User.init(
    {
        conversation_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER
    },

    {
        sequelize: sequelize,
        tableName: 'conversation_user'
    }
);

export { Conversation_User };