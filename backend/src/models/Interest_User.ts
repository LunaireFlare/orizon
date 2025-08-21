import "dotenv/config";
import { sequelize } from '../database/sequelize/client.js';

import {
    Table,
    Column,
    Model,
    AllowNull,
    DataType,
    PrimaryKey
} from "sequelize-typescript";

@Table({
    tableName: "interest_user",
    timestamps: false,
})

export class Interest_User extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare interest_id: number;

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare user_id: number;
}

sequelize.addModels([Interest_User]);