import HomePage from './pages/HomePage/HomePage.tsx';
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
                <Route path="*" element={<ErrorPage code={500} title={''} message={''} />} /> {/* Route 404 */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/signup" element={<Signup />} /> */}
            </Routes>

        </div>
    )
}

export default App
