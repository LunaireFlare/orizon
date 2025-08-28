import { useEffect, useState } from 'react';
import Rooftop from '../../components/Rooftop/Rooftop.tsx';
import Banner from '../../components/Banner/Banner.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import CardEvent from '../../components/CardEvent/CardEvent.tsx';

import './EventPage.scss';

import type { Event } from '../../types/index.d.ts';
import { useNavigate } from 'react-router';

// type Event = {
//     id: number,
//     photo: string,
//     name: string,
//     start_date: string,
//     end_date: string,
//     address: string,
//     city: string,
//     zip_code: number,
//     description: string,
//     creator_id: number,
//     interests:Interest[]
// }

type Search = {
    code: number,
    nom: string,
    codesPostaux: string[]
}

export default function EventPage() {

    const [options, setOptions] = useState<Search[]>([]);
    const [query, setQuery] = useState<string>("");
    const [filtered, setFiltered] = useState<Search[]>([]);
    const [_selected, setSelected] = useState<string>("");

    const token = localStorage.getItem("token");

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/connexion');
        };
    }, [token, navigate]);

    // Appel de l'API avec async/await
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
                    setOptions([]);
                    setFiltered([]);
                }
            } else {
                setOptions([]);
                setFiltered([]);
            }
        };

        fetchVilles();
    }, [query]);

    // Filtrer les résultats dès que l'utilisateur tape quelque chose
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
        async function fetchEvents() {
            setLoading(true);
            setError(null);

            try {                
                const res = await fetch('http://backend.localhost:81/events', {
                    headers: {
                    "Authorization": `Bearer ${token}`
                    },
                });
                if (!res.ok) {
                    throw new Error('Erreur lors du chargement des données.')
                };

                const events = await res.json();

                setEvents(events);
            } catch (error) {
                setError('Erreur lors du chargement des données.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [token])
    
    return (
        <div>
            <Rooftop />
            <Banner />

            <div id="containerSearchEvent">
                <div className="searchEvent">
                    <h2>Rechercher un évènement</h2>
                    <form action="/">
                        <label htmlFor="keyword">Mots-clefs</label>
                        <input type="text" id="keyword" name="keyword" placeholder="Tapez un ou plusieurs mots-clef" />

                        <div className="twoForm">
                            <div>
                                <label htmlFor="Ville">Ville</label>
                                <input
                                    type="text"
                                    id="ville"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Tapez votre ville" />

                                {/* Liste de suggestions */}
                                {filtered.length > 0 && (
                                    <ul className="suggestions">
                                        {filtered.map(opt => (
                                            <div id="contentFilter" key={opt.code}>
                                                <li
                                                    onClick={() => {
                                                        setSelected(opt.nom);
                                                        setQuery(`${opt.nom} (${opt.codesPostaux[0]})`);
                                                        setFiltered([]);
                                                    }}
                                                >
                                                    {opt.nom} ({opt.codesPostaux[0]})
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label>Centre d’intérêt</label>
                                <select id="interet">
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
                {error && <p>{error}</p>}
                {!loading && events.length === 0 && <p>Aucun évènement trouvé.</p>}
                {events.map((event) => (
                    <CardEvent key={event.id} event={event} />
                ))}
            </div>

            <Footer />
        </div>
    )
}
