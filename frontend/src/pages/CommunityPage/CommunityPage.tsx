import { useEffect, useState } from 'react';
import Rooftop from '../../components/Rooftop/Rooftop.tsx';
import Banner from '../../components/Banner/Banner.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import CardUser from '../../components/CardUser/CardUser.tsx';
import InterestSelect from '../../components/InterestFilter/InterestSelect.tsx';

import './CommunityPage.scss';

type Search = {
    code: number;
    nom: string;
    codesPostaux: string[];
};

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
};

export default function CommunityPage() {
    const [options, setOptions] = useState<Search[]>([]);
    const [query, setQuery] = useState<string>('');
    const [filteredCities, setFilteredCities] = useState<Search[]>([]);
    const [selectedCity, setSelectedCity] = useState<Search | null>(null);

    const [name, setName] = useState('');
    const [interest, setInterest] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Requête API villes GeoGouv
    useEffect(() => {
        const fetchVilles = async () => {
            if (query.length > 2 && !selectedCity) {
                try {
                    const res = await fetch(
                        `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom,codesPostaux,code`
                    );
                    const data: Search[] = await res.json();
                    setOptions(data);
                    setFilteredCities(data);
                } catch (err) {
                    console.error('Erreur API :', err);
                    setOptions([]);
                    setFilteredCities([]);
                }
            } else {
                setOptions([]);
                setFilteredCities([]);
            }
        };
        fetchVilles();
    }, [query, selectedCity]);

    // Filtrer suggestions selon saisie
    useEffect(() => {
        if (query.length > 0 && !selectedCity) {
            const results = options.filter((opt) =>
                opt.nom.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCities(results);
        } else {
            setFilteredCities([]);
        }
    }, [query, options, selectedCity]);

    // Chargement des utilisateurs avec filtres dynamiques
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('http://backend.localhost:81/users');
                const data: User[] = await res.json();

                const forbiddenStatus = ['bloqué', 'désactivé', undefined];
                let filteredData = data.filter(
                    (user) => !forbiddenStatus.includes(user.status)
                );

                if (name.length > 0) {
                    filteredData = filteredData.filter((user: User) =>
                        `${user.firstname} ${user.lastname}`
                            .toLowerCase()
                            .includes(name.toLowerCase())
                    );
                }

                if (selectedCity) {
                    filteredData = filteredData.filter(
                        (user: User) =>
                            user.city.toLowerCase() === selectedCity.nom.toLowerCase() &&
                            user.zip_code === selectedCity.codesPostaux[0]
                    );
                }

                if (interest.length > 0) {
                    filteredData = filteredData.filter((user: User) =>
                        user.interests?.some(
                            (i) => i.name.toLowerCase() === interest.toLowerCase()
                        )
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
    }, [name, selectedCity, interest]);

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
                                    value={
                                        selectedCity
                                            ? `${selectedCity.nom} (${selectedCity.codesPostaux[0]})`
                                            : query
                                    }
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setSelectedCity(null);
                                    }}
                                    placeholder="Tapez votre ville"
                                    autoComplete="off"
                                />

                                {!selectedCity && filteredCities.length > 0 && (
                                    <ul className="suggestions">
                                        {filteredCities.map((opt) => (
                                            <li
                                                key={opt.code}
                                                onClick={() => {
                                                    setSelectedCity(opt);
                                                    setQuery(`${opt.nom} (${opt.codesPostaux[0]})`);
                                                    setFilteredCities([]);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {opt.nom} ({opt.codesPostaux[0]})
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Plus d'affichage de la ville sélectionnée en dessous */}
                            </div>

                            <div>
                                <InterestSelect value={interest} onChange={setInterest} />
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
