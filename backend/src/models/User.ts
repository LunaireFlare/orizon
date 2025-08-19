import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class User extends Model {};

User.init(
    {
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        firstname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
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
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'user'
        },
        photo: {
            type: DataTypes.TEXT,
            allowNull: false,
            // defaultValue: '<link>'
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: 'en_attente'
        }
    },
    {
        sequelize: sequelize,
        tableName: 'user'
    }
);

export { User };
