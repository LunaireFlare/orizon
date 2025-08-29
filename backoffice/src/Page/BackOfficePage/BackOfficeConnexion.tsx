import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../../Assets/images/Logo_OrizonBlanc.png';
import './BackOfficePage.scss';

interface User {
    id: string;
    email: string;
    role: string;
}

export default function BackOfficePage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (!response.ok) {
                setError(data?.error || 'Identifiants incorrects.');
                return;
            }

            if (data?.user?.role !== 'admin') {
                setError("Accès réservé aux administrateurs.");
                return;
            }

            // Stockage du token et de l'utilisateur
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            setSuccess(true);
        } catch (err) {
            console.error('Erreur lors de la connexion :', err);
            setError('Erreur serveur ou réseau.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success && user?.role === 'admin') {
            const timeout = setTimeout(() => {
                navigate('/users');
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [success, user, navigate]);

    return (
        <div id="containerTableBoard">
            <div id="tableBoard">
                <div className="leftContainer">
                    <img src={Logo} alt="Logo Orizon" />
                </div>
                <div className="rightContainer">
                    <div className="containerBoxCnx">
                        <form onSubmit={handleSubmit} className="boxConexion">
                            <h2>Connexion</h2>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                                value={form.email}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                onChange={handleChange}
                                required
                                value={form.password}
                            />
                            <div className="forgot-password">
                                <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
                            </div>
                            <button type="submit" className="buttonHover" disabled={loading}>
                                {loading ? 'Chargement...' : 'Se connecter'}
                            </button>
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
            </div>
        </div>
    );
}
