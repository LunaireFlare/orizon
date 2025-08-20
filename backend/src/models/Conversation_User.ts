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

export class Conversation_User extends Model {
    @AllowNull(false)
    @Column(DataType.INTEGER)
    @PrimaryKey
    declare conversation_id: Number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    @PrimaryKey
    declare user_id: Number;
}

sequelize.addModels([Conversation_User]);

