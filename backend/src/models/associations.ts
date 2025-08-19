import { sequelize } from '../database/sequelize/client.js';

import { User } from "./User.js";
import { Conversation } from "./Conversation.js";
import { Conversation_User } from './Conversation_User.js';

User.belongsToMany(Conversation, {
    foreignKey: 'user_id',
    otherKey: 'conversation_id',
    through: Conversation_User,
    as: 'conversations'
});

Conversation.belongsToMany(User, {
    foreignKey: 'conversation_id',
    otherKey: 'user_id',
    through: Conversation_User,
    as: 'users'
});

export { sequelize, User, Conversation };