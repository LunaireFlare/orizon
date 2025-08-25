import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

import './Register_Login.scss';
import Rooftop from '../../components/Rooftop/Rooftop';
import Footer from '../../components/Footer/Footer';

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        firstname: '',
        code: '',
        city: '',
        birth: '',
        email: '',
        password: '',
        confirmPassword: '',
        description: ''
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (form.password !== form.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (form.password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        setLoading(true);

        try {
            // On exclus le confirmPassword de l'envoi au backend (éviter la répétition)
            const { confirmPassword, ...userData } = form;

            const response = await fetch('http://backend.localhost:81/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lastname: userData.name,
                    firstname: userData.firstname,
                    zip_code: userData.code,
                    city: userData.city,
                    date_of_birth: userData.birth,
                    email: userData.email,
                    password: userData.password,
                    photo: null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Erreur lors de l'inscription.");
            } else {
                setSuccess(true);
            }
        } catch (err) {
            console.error("Erreur lors de l'inscription :", err);
            setError('Erreur réseau ou serveur.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                navigate('/connexion');
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [success, navigate]);

    return (
        <>
            <Rooftop />
            <div className="auth-header">

                <Link to="/" className="link">&#8626; Retour à l'accueil du site</Link>

                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Inscription</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Prénom"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="birth"
                        placeholder="Date de naissance (JJ/MM/AAAA)"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="code"
                        placeholder="Code postal"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="Ville"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe (min 8 caractères)"
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
            </div>

            {success && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Inscription réussie ! Redirection...</p>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
