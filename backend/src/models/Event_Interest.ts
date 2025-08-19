import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Event_Interest extends Model {}

Event_Interest.init(
    {
        event_id: {
            type : DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        
        interest_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        sequelize: sequelize,
        tableName: 'event_interest',
        timestamps: false
    }
);

export { Event_Interest };