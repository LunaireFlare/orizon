import React from 'react';
import type { Conversation } from '../../type/ConversationType';

interface Props {
    conversation: Conversation;
    onClick?: () => void;
}

const ConversationItem: React.FC<Props> = ({ conversation, onClick }) => {
    return (
        <div className="conversation-item" onClick={onClick}>
            <img src={conversation.avatarUrl} alt={conversation.participant} className="avatar" />
            <div className="conversation-text">
                <div className="conversation-header">
                    <h4 className="participant">{conversation.participant}</h4>
                    <span className="timestamp">
                        {new Date(conversation.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                </div>
                <p className="last-message">{conversation.lastMessage}</p>
            </div>
        </div>
    );
};

export default ConversationItem;