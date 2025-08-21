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
    tableName: "event_participant",
    timestamps: false,
})

export class Event_Participant extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare event_id: number;

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare participant_id: number;
}

sequelize.addModels([Event_Participant]);
