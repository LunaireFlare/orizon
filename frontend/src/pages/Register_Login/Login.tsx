import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import './Register_Login.scss';
import Rooftop from '../../components/Rooftop/Rooftop';
import Footer from '../../components/Footer/Footer';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        setTimeout(() => {
            if (form.email === 'test@test.com' && form.password === '123456') {
                setSuccess(true);
            } else {
                setError("Identifiants incorrects.");
            }
        }, 1000);
    };

    useEffect(() => {
        if (success) {
            // Redirection après 2 secondes
            const timeout = setTimeout(() => {
                navigate('/');
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [success, navigate]);

    return (
        <>
            <Rooftop />
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Connexion</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className='buttonHover'>Se connecter</button>
                {error && <p className="error-msg">{error}</p>}
            </form>

            {success && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Connexion réussie ! Redirection...</p>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
