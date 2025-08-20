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
    tableName: "event_interest",
    timestamps: false,
})

export class Event_Interest extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare event_id: number;

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare interest_id: number;
}

sequelize.addModels([Event_Interest]);
