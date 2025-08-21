import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import './Register_Login.scss';
import Rooftop from '../../components/Rooftop/Rooftop';
import Footer from '../../components/Footer/Footer';

export default function Register() {
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (form.password !== form.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (form.password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        setTimeout(() => {
            // Simulation succès inscription
            setSuccess(true);
        }, 1000);
    };

    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                navigate('/');
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [success, navigate]);

    if (success) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <p>Inscription réussie ! Redirection...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Rooftop />
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Inscription</h2>
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
                    placeholder="Mot de passe (min 6 caractères)"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmer le mot de passe"
                    onChange={handleChange}
                    required
                />
                <button className="buttonHover" type="submit">S'inscrire</button>
                {error && <p className="error-msg">{error}</p>}
            </form>
            {'}'}
            <Footer />
        </>
    );
}
