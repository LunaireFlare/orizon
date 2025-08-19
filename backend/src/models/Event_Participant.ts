import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Event_Participant extends Model {}

Event_Participant.init(
    {
        event_id: {
            type : DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        
        participant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        sequelize: sequelize,
        tableName: 'event_participant',
        timestamps: false
    }
);

export { Event_Participant };