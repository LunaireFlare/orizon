import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Message extends Model {};

Message.init(
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize: sequelize,
        tableName: 'message'
    }
);

export { Message };
