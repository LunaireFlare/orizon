import { Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import Logo from '../../Assets/images/Logo_OrizonBlanc.png';
import './BackOfficePage.scss';

interface User {
    id: string;
    // ajoute d'autres propriétés si besoin
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
            } else if (data?.token && data?.user) {
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
        if (success && user) {
            const timeout = setTimeout(() => {
                navigate(`/profil/${user.id}`);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [success, user, navigate]);




    return (
        <div id="containerTableBoard">
            <div id="tableBoard">
                <div className="leftContainer">
                    <img src={Logo} alt="Logo Orizon"/>
                </div>
                <div className="rightContainer">
                    <div>
                    <form onSubmit={handleSubmit}  className="boxConexion">
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