import { useEffect, useState } from 'react';
import Rooftop from '../../components/Rooftop/Rooftop.tsx';
import Banner from '../../components/Banner/Banner.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import CardUser from '../../components/CardUser/CardUser.tsx';

import './CommunityPage.scss';
import { useNavigate } from 'react-router';

type Search = {
    code: number,
    nom: string,
    codesPostaux: string[]
}

type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    city: string;
    zip_code: string;
    description: string;
    photo: string;
    interests?: { id: number; name: string }[];
    status?: string;
}

export default function CommunityPage() {
    const [options, setOptions] = useState<Search[]>([]);
    const [query, setQuery] = useState<string>('');
    const [filtered, setFiltered] = useState<Search[]>([]);
    const [selected, setSelected] = useState<string>('');

    const [name, setName] = useState('');
    const [interest, setInterest] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/connexion');
        };
    }, [token, navigate]);

    useEffect(() => {
        const fetchVilles = async () => {
            if (query.length > 2) {
                try {
                    const res = await fetch(`https://geo.api.gouv.fr/communes?nom=${query}&fields=nom,codesPostaux,code`);
                    const data: Search[] = await res.json();
                    setOptions(data);
                    setFiltered(data);
                } catch (err) {
                    console.error("Erreur API :", err);
                }
            } else {
                setOptions([]);
                setFiltered([]);
            }
        };

        fetchVilles();
    }, [query]);

    useEffect(() => {
        if (query.length > 0) {
            const results = options.filter(opt =>
                opt.nom.toLowerCase().includes(query.toLowerCase())
            );
            setFiltered(results);
        } else {
            setFiltered([]);
        }
    }, [query, options]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('http://backend.localhost:81/users');
                const data: User[] = await res.json();

                const forbiddenStatus = ["bloqué", "désactivé", undefined];
                let filteredData = data.filter(user => !forbiddenStatus.includes(user.status));

                if (name.length > 0) {
                    filteredData = filteredData.filter((user: User) =>
                        `${user.firstname} ${user.lastname}`.toLowerCase().includes(name.toLowerCase())
                    );
                }

                if (selected.length > 0) {
                    filteredData = filteredData.filter((user: User) =>
                        user.city?.toLowerCase() === selected.toLowerCase()
                    );
                }

                if (interest.length > 0) {
                    filteredData = filteredData.filter((user: User) =>
                        user.interests?.some(i => i.name.toLowerCase() === interest.toLowerCase())
                    );
                }

                setUsers(filteredData);
            } catch (err) {
                setError('Erreur lors du chargement des utilisateurs.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [name, selected, interest]);

    return (
        <div>
            <Rooftop />
            <Banner />

            <div id="containerSearchUser">
                <div className="searchUser">
                    <h2>Rechercher un utilisateur</h2>
                    <form action="/">
                        <label htmlFor="name">Nom ou prénom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tapez votre nom ou prénom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className="twoForm">
                            <div>
                                <label htmlFor="ville">Ville</label>
                                <input
                                    type="text"
                                    id="ville"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Tapez votre ville"
                                />

                                {filtered.length > 0 && (
                                    <ul className="suggestions">
                                        {filtered.map((opt) => (
                                            <li
                                                key={opt.code}
                                                onClick={() => {
                                                    setSelected(opt.nom);
                                                    setQuery(opt.nom);
                                                    setFiltered([]);
                                                }}
                                            >
                                                {opt.nom} ({opt.codesPostaux.join(', ')})
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {selected && <p>Ville sélectionnée : {selected}</p>}
                            </div>

                            <div>
                                <label htmlFor="interet">Centre d’intérêt</label>
                                <select
                                    id="interet"
                                    value={interest}
                                    onChange={(e) => setInterest(e.target.value)}
                                >
                                    <option value="">-- Choisissez un centre d'intérêt --</option>
                                    <option value="sport">Sport</option>
                                    <option value="musique">Musique</option>
                                    <option value="voyage">Voyage</option>
                                    <option value="cuisine">Cuisine</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div id="containerCardUser">
                {loading && <p>Chargement des utilisateurs...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && users.length === 0 && <p>Aucun utilisateur trouvé.</p>}
                {users.map((user) => (
                    <CardUser key={user.id} user={user} />
                ))}
            </div>

            <Footer />
        </div>
    );
}
