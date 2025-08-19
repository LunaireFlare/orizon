import { sequelize } from '../database/sequelize/client.js';

import { User } from './User.js';
import { Message } from './Message.js';
import { Conversation } from './Conversation.js';
import { Event } from './Event.js';

import { Conversation_User } from './Conversation_User.js';
import { Event_Participant } from './Event_Participant.js';

/* USER-MESSAGE */

User.hasMany(Message, {
    foreignKey: 'sender_id',
    as: 'messages'
});

Message.belongsTo(User, {
    foreignKey: 'sender_id',
    as: 'sender'
});

/* USER-CONVERSATION */

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

/* CONVERSATION-MESSAGE */

Conversation.hasMany(Message, {
    foreignKey: 'conversation_id',
    as: 'messages'
});

Message.belongsTo(Conversation, {
    foreignKey: 'conversation_id',
    as: 'conversation'
});

/* USER-EVENT (CREATOR) */

User.hasMany(Event, {
    foreignKey: 'creator_id',
    as: 'events'
});

Event.belongsTo(User, {
    foreignKey: 'creator_id',
    as: 'creator'
});

/* USER-EVENT (PARTICIPANT) */

User.belongsToMany(Event, {
    foreignKey: 'participant_id',
    otherKey: 'event_id',
    through: Event_Participant,
    as: 'events'
});

Event.belongsToMany(User, {
    foreignKey: 'event_id',
    otherKey: 'participant_id',
    through: Event_Participant,
    as: 'users'
});

export { sequelize, User, Conversation, Message, Event, Conversation_User, Event_Participant };