import { Routes, Route } from 'react-router';

import HomePage from './pages/HomePage/HomePage.tsx';
import Register from './pages/Register_Login/Register.tsx';
import Login from './pages/Register_Login/Login.tsx';
import ProfilPage from './pages/ProfilPage/ProfilPage.tsx';
import CommunityPage from './pages/CommunityPage/CommunityPage.tsx';
import EventPage from './pages/EventPage/EventPage.tsx';
import ConversationsPage from './pages/ConversationsPage/ConversationsPage.tsx';
import MessagesPage from './pages/MessagesPage/MessagesPage.tsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';

import './App.scss';
import './assets/styles/index.scss'

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profil" element={<ProfilPage />} />
                <Route path="/profil/:id" element={<ProfilPage />} />

                <Route path="/communaute" element={<CommunityPage />} />
                <Route path="/evenements" element={<EventPage />} />
                <Route path="/conversations" element={<ConversationsPage />} />
                <Route path="/messages" element={<MessagesPage />} />

                <Route path="/inscription" element={<Register />} />
                <Route path="/connexion" element={<Login />} />


                <Route path="*" element={<ErrorPage code={500} title={''} message={''} />} /> {/* Route 404 */}
            </Routes>
        </div>
    )
}

export default App