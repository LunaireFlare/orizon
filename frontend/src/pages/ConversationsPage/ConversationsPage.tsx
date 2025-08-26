import React from 'react';
import ConversationItem from '../../components/ConversationItem/ConversationItem';
import type { Conversation } from '../../types';
import './ConversationsPage.scss';
import { useNavigate } from 'react-router';
import RooftopConnected from '../../components/Rooftop/RooftopConnected';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';

const ConversationsPage: React.FC = () => {
    const navigate = useNavigate();
    const conversations: Conversation[] = [
        {
            id: 1,
            participant: 'Nadine Feu',
            lastMessage: 'Salut ! Tu serai dispo demain, petit coquin ?',
            timestamp: '2025-08-21T10:24:00',
            avatarUrl: '../../src/assets/images/avatarWomen.webp',
        },
        {
            id: 2,
            participant: 'Bob Martin',
            lastMessage: 'Parfait, à plus tard.',
            timestamp: '2025-08-21T09:05:00',
            avatarUrl: '../../src/assets/images/avatarWomen.webp',
        },
        {
            id: 3,
            participant: 'Blandine GALLET',
            lastMessage: 'Test de vue',
            timestamp: '2025-08-20T14:42:00',
            avatarUrl: '../../src/assets/images/avatarWomen.webp',
        },
    ];

    return (
        <>
            <RooftopConnected />
            <Banner />
            <div id="container-content">
                <section className="keyFigure">
                    <h2>Mes Conversations</h2>
                    <div className="conversation-list">
                        {conversations.map((conv) => (
                            <ConversationItem
                                key={conv.id}
                                conversation={conv}
                                onClick={() => navigate(`/messages/${conv.id}`)} />
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ConversationsPage;