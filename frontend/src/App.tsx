import HomePage from './pages/HomePage/HomePage.tsx';
import ProfilPage from './pages/ProfilPage/ProfilPage.tsx';
import CommunityPage from './pages/CommunityPage/CommunityPage.tsx';
import EventPage from './pages/EventPage/EventPage.tsx';
import MessagePage from './pages/MessagesPage/MessagesPage.tsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';

import './App.scss';
import './assets/styles/index.scss'

import { Routes, Route } from 'react-router';
import Register from './pages/Register_Login/Register.tsx';
import Login from './pages/Register_Login/Login.tsx';
<<<<<<< HEAD
/* import ConversationsPage from './pages/ConversationPage/ConversationPages.tsx'; */
=======
import ConversationsPage from './pages/ConversationPage/ConversationPages.tsx';
>>>>>>> 8e11b290aeccf4d08c2edc26b5beaf5869aabe76

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profil" element={<ProfilPage />} />
                <Route path="/communaute" element={<CommunityPage />} />
                <Route path="/evenements" element={<EventPage />} />
<<<<<<< HEAD
                {/* <Route path="/conversations" element={<ConversationsPage />} /> */}
=======
                <Route path="/conversations" element={<ConversationsPage />} />
>>>>>>> 8e11b290aeccf4d08c2edc26b5beaf5869aabe76
                <Route path="/messages" element={<MessagePage />} />
                
                <Route path="/inscription" element={<Register />} />
                <Route path="/connexion" element={<Login />} />
            
                <Route path="*" element={<ErrorPage code={500} title={''} message={''} />} /> {/* Route 404 */}
            </Routes>
        </div>
    )
}

export default App