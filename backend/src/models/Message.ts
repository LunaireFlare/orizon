import { sequelize } from '../database/sequelize/client.js';

import {
    Table,
    Column,
    Model,
    AllowNull,
    DataType,
} from "sequelize-typescript";

@Table({
    tableName: "message",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

export class Message extends Model {
    @AllowNull(false)
    @Column(DataType.TEXT)
    declare content: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare date: Date;
};

sequelize.addModels([Message]);