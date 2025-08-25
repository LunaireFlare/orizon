import "dotenv/config";
import { sequelize } from '../database/sequelize/client.js';

import { BelongsToManyAddAssociationMixin } from "sequelize";
import {
    Table,
    Column,
    Model,
    AllowNull,
    DataType,
    Unique,
    Default,
    BelongsToMany
} from "sequelize-typescript";

import { Event } from "./Event.js";
import { Event_Participant } from "./Event_Participant.js";

@Table({
    tableName: "user",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

export class User extends Model {
    @AllowNull(false)
    @Column(DataType.TEXT)
    declare lastname: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare firstname: string;

    @AllowNull(false)
    @Unique(true)
    @Column({
        type : DataType.TEXT,
        validate: { isEmail: true }
    })
    declare email: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare password: string;

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
    @Column(DataType.DATE)
    declare date_of_birth: Date;

    @AllowNull(false)
    @Default("user")
    @Column(DataType.TEXT)
    declare role: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    declare photo: string | null;

    @AllowNull(true)
    @Column(DataType.TEXT)
    declare description: string | null;

    @AllowNull(false)
    @Default("en_attente")
    @Column(DataType.ENUM("en_attente", "valide", "bloqué", "désactivé"))
    declare status: "en_attente" | "valide" | "bloqué" | "désactivé";

    @BelongsToMany(() => Event, () => Event_Participant)
    declare participating_events?: Event[];
}

sequelize.addModels([User]);