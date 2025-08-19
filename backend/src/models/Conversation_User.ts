import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Conversation_User extends Model {}

Conversation_User.init(
    {
        conversation_id: {
            type : DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        sequelize: sequelize,
        tableName: 'conversation_user',
        timestamps: false
    }
);

export { Conversation_User };