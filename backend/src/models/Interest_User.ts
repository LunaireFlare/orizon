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
    tableName: "user",
    timestamps: true,
})

export class Interest_User extends Model {
    @AllowNull(false)
    @Column(DataType.INTEGER)
    @PrimaryKey
    declare interest_id: Number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    @PrimaryKey
    declare user_id: Number;
}

sequelize.addModels([Interest_User]);