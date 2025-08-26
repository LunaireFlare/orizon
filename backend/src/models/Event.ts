import "dotenv/config";
import { sequelize } from '../database/sequelize/client.js';

import {
    Table,
    Column,
    Model,
    AllowNull,
    DataType,
    Default,
    ForeignKey,
    BelongsTo
    
} from "sequelize-typescript";
import { User } from "./User.js";


@Table({
    tableName: "event",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

export class Event extends Model {

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare name: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare start_date: Date;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare end_date: Date;

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare description: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare address: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT,
        validate: { is: /^\d{5}$/ }
    })
    declare zip_code: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare city: string;

    @AllowNull(false)
    @Default("en_attente")
    @Column(DataType.ENUM("en_attente", "valide", "bloqué"))
    declare status: "en_attente" | "valide" | "bloqué";

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare creator_id: number;

    @BelongsTo(() => User, 'creator_id')
    declare creator: User;
};

sequelize.addModels([Event]);