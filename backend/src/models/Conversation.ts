import "dotenv/config";
import { sequelize } from '../database/sequelize/client.js';

import {
    Table,
    Model,
} from "sequelize-typescript";

@Table({
    tableName: "conversation",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

export class Conversation extends Model {};

sequelize.addModels([Conversation]);