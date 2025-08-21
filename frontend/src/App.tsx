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
import ConversationsPage from './pages/ConversationPage/ConversationPages.tsx';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profil" element={<ProfilPage />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="*" element={<ErrorPage code={500} title={''} message={''} />} /> {/* Route 404 */}
            </Routes>
        </div>
    )
}

export default App
