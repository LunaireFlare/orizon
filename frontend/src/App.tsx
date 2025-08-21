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

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profil" element={<ProfilPage />} />
                <Route path="/communaute" element={<CommunityPage />} />
                <Route path="/evenements" element={<EventPage />} />
                <Route path="/messages" element={<MessagePage />} />
<<<<<<< HEAD

                <Route path="/inscription" element={<Register />} />
                <Route path="/connexion" element={<Login />} />

                <Route path="" element={<ErrorPage code={500} title={''} message={''} />} /> {/ Route 404 */}
=======
                
                <Route path="/inscription" element={<Register />} />
                <Route path="/connexion" element={<Login />} />
            
                <Route path="*" element={<ErrorPage code={500} title={''} message={''} />} /> {/* Route 404 */}
>>>>>>> a4047962fc399c9061b5c747ecdd62b711f1ed60
            </Routes>
        </div>
    )
}

export default App