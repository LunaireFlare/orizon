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

export class Event_Interest extends Model {
    @AllowNull(false)
    @Column(DataType.INTEGER)
    @PrimaryKey
    declare event_id: Number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    @PrimaryKey
    declare interest_id: Number;
}

sequelize.addModels([Event_Interest]);
