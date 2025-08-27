import { useEffect, useState } from 'react';
import Rooftop from '../../components/Rooftop/Rooftop.tsx';
import Banner from '../../components/Banner/Banner.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import CardEvent from '../../components/CardEvent/CardEvent.tsx';

import './EventPage.scss';

import type { Event } from '../../types/index.d.ts';

type Search = {
    code: number;
    nom: string;
    codesPostaux: string[];
};

export default function EventPage() {
    const [options, setOptions] = useState<Search[]>([]);
    const [query, setQuery] = useState<string>('');
    const [filteredCities, setFilteredCities] = useState<Search[]>([]);
    const [selectedCity, setSelectedCity] = useState<Search | null>(null);

    const [keywords, setKeywords] = useState<string>('');
    const [interest, setInterest] = useState<string>('');

    const token = localStorage.getItem('token');

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch villes GeoGouv selon query texte et pas de ville sélectionnée
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

    // Filtrer suggestions villes selon saisie (si aucune ville sélectionnée)
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

    // Charger les événements (uniquement au chargement / token)
    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('http://backend.localhost:81/events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    throw new Error('Erreur lors du chargement des données.');
                }
                const data = await res.json();
                setEvents(data);
            } catch (error) {
                setError('Erreur lors du chargement des données.');
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, [token]);

    // Filtrer localement les événements selon ville sélectionnée, mots clés et centre d’intérêt
    const filteredEvents = events.filter((event) => {
        // Filtre ville
        const cityMatch =
            !selectedCity ||
            (event.city.toLowerCase() === selectedCity.nom.toLowerCase() &&
                event.zip_code === selectedCity.codesPostaux[0]);

        // Filtre mots clés (dans le nom ou la description, en minuscules)
        const keywordMatch =
            keywords.length === 0 ||
            event.name.toLowerCase().includes(keywords.toLowerCase()) ||
            event.description.toLowerCase().includes(keywords.toLowerCase());

        // Filtre centre d’intérêt (les interests sont un tableau {id, name}, on vérifie la présence)
        const interestMatch =
            interest.length === 0 ||
            event.interests.some(
                (i) => i.name.toLowerCase() === interest.toLowerCase()
            );

        return cityMatch && keywordMatch && interestMatch;
    });

    return (
        <div>
            <Rooftop />
            <Banner />

            <div id="containerSearchEvent">
                <div className="searchEvent">
                    <h2>Rechercher un évènement</h2>
                    <form action="/">
                        <label htmlFor="keyword">Mots-clefs</label>
                        <input
                            type="text"
                            id="keyword"
                            name="keyword"
                            placeholder="Tapez un ou plusieurs mots-clef"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
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

            <div id="eventCommunity">
                {loading && <p>Chargement des évènements...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && filteredEvents.length === 0 && (
                    <p>Aucun évènement trouvé.</p>
                )}
                {filteredEvents.map((event) => (
                    <CardEvent key={event.id} event={event} />
                ))}
            </div>

            <Footer />
        </div>
    );
}
