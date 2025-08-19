import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class Interest_User extends Model {}

Interest_User.init(
    {
        interest_id: {
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
        tableName: 'interest_user',
        timestamps: false
    }
);

export { Interest_User };