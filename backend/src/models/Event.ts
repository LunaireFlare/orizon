import "dotenv/config";
import { sequelize } from '../database/sequelize/client.js';

// import { BelongsToManyAddAssociationMixin } from "sequelize";
import {
    Table,
    Column,
    Model,
    AllowNull,
    DataType,
    Default,
    BelongsToMany
} from "sequelize-typescript";

// import { User } from "./User.js";
// import { Event_Participant } from "./Event_Participant.js";

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

    // @BelongsToMany(() => User, () => Event_Participant)
    // declare users?: User[];

    // addUser!: BelongsToManyAddAssociationMixin<User, number>;
};

sequelize.addModels([Event]);