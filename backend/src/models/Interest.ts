import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Interest extends Model {};

Interest.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize: sequelize,
        tableName: 'interest'
    }
);

export { Interest };
