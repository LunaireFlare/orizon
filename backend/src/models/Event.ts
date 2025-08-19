import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Event extends Model {};

Event.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: /^\d{5}$/
            }
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: 'en_attente'
        }
    },
    {
        sequelize: sequelize,
        tableName: 'event'
    }
);

export { Event };
