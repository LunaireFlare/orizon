import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize/client.js';

class User extends Model {};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },
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
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.TEXT,
            allowNull: false
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
            // default: ???
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: 'PENDING'
        }

    },
    {
        sequelize: sequelize,
        tableName: 'user'
    }
);

export { User };
