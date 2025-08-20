import HomePage from './pages/HomePage/HomePage.tsx';
import ProfilPage from './pages/ProfilPage/ProfilPage.tsx';
import './App.scss';
import './assets/styles/index.scss'

import { Routes, Route } from 'react-router';

function App() {
  return (
    <div>

    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profil" element={<ProfilPage />} />
    </Routes>

    </div>
  )
}

export default App
