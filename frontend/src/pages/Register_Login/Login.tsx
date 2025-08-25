import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

import './Register_Login.scss';
import Rooftop from '../../components/Rooftop/Rooftop';
import Footer from '../../components/Footer/Footer';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<{ id: number } | null>(null); // 

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('http://backend.localhost:81/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (!response.ok) {
                setError(data?.error || 'Identifiants incorrects.');
            } else if (data?.token) {
                // Stockage du token
                localStorage.setItem('token', data.token);
                setUser(data.user);
                setSuccess(true);
            } else {
                setError('Réponse invalide du serveur.');
            }
        } catch (err) {
            console.error('Erreur lors de la connexion :', err);
            setError('Erreur serveur ou réseau.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                navigate(`/profil/${user.id}`);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [success, navigate]);

    return (
        <div id="testVH">
            <Rooftop />
            <div id="containerLogin">
                <div className="auth-header">

                    <Link to="/" className="link">&#8626; Retour à l'accueil du site</Link>

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
                        <div className="forgot-password">
                            <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
                        </div>
                        <button type="submit" className='buttonHover'>Se connecter</button>
                        {error && <p className="error-msg">{error}</p>}
                    </form>
                </div>

                {success && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Connexion réussie ! Redirection...</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />

        </div>
    );
}
function setUser(user: any) {
    throw new Error('Function not implemented.');
}

