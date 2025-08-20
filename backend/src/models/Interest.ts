import "dotenv/config";
import { sequelize } from '../database/sequelize/client.js';

import {
    Table,
    Column,
    Model,
    AllowNull,
    DataType,
} from "sequelize-typescript";

@Table({
    tableName: "interest",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

export class Interest extends Model {
    @AllowNull(false)
    @Column(DataType.TEXT)
    declare name: string;
};

sequelize.addModels([Interest]);