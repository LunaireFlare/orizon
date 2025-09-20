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
    tableName: "conversation_user",
    timestamps: false,
})

export class Conversation_User extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare conversation_id: number;

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare user_id: number;
}

sequelize.addModels([Conversation_User]);

