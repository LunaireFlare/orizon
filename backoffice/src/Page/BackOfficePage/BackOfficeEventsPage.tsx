import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import Logo from '../../Assets/images/Logo_OrizonBlanc.png';
import './BackOfficePage.scss';

type EventBdd = {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export default function BackOfficeEventsPage() {

    const [eventsBdd, setEventsBdd] = useState<EventBdd[]>([]);

    /* State de filtrage par titre */
    const [searchTitle, setSearchTitle] = useState('');

    /* State de filtrage par status */
    const [searchStatus, setSearchStatus] = useState('')

    /* State systeme de interrupteur bouton bloqué / validé */
    const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: string }>({});

    /* Fonction de changement du status (valider / bloquer) */
    const handleClick = async (id: number, status: string) => {
        try {
            const response = await fetch(`http://backend.localhost:81/events/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);

                setEventsBdd(prev =>
                    prev.map(event =>
                        event.id === id ? { ...event, status } : event
                    )
                );

                setSelectedStatus(prev => ({
                    ...prev,
                    [id]: status
                }));
            } else {
                console.error("Erreur API :", data.error);
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    /* Fetch API events */
    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch("http://backend.localhost:81/events", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setEventsBdd(data);
                } else {
                    console.error("Données reçues invalides", data);
                }
            } catch (error) {
                console.error("Erreur de chargement événements :", error);
            }
        }
        fetchEvents();
    }, []);

    /* Filtrage par titre et status */
    const filteredEvents = eventsBdd.filter(event => {
        const matchTitle = searchTitle.length < 3
            ? true
            : event.title.toLowerCase().includes(searchTitle.toLowerCase());

        const matchStatus = searchStatus === ""
            ? true
            : event.status.toLowerCase() === searchStatus.toLowerCase();

        return matchTitle && matchStatus;
    });


    return (
        <div id="containerTableBoard">
            <div id="tableBoard">
                <div className="leftContainer">
                    <img src={Logo} alt="Logo Orizon" />
                    <div>
                        <Link to="/users">Utilisateurs</Link>
                        <Link to="/evenements">Evènements</Link>
                    </div>
                </div>
                <div className="rightContainer">
                    <div className="headRightContainer">
                        <h1>TABLEAU DE BORD - Événements</h1>
                        <button>Deconnexion</button>
                    </div>
                    <div id="elmFilter">
                        <form>
                            <div className="filterName">
                                <label htmlFor="searchTitle">Recherche par titre</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="searchTitle"
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                    placeholder="Tapez au moins 3 lettres"
                                />
                            </div>
                            <div className="filterStatus">
                                <label htmlFor="status">Recherche par status</label>
                                <select
                                    id="status"
                                    value={searchStatus}
                                    onChange={(e) => setSearchStatus(e.target.value)}
                                >
                                    <option value="">-- status --</option>
                                    <option value="en_attente">En attente</option>
                                    <option value="valide">Valide</option>
                                    <option value="bloqué">Bloqué</option>
                                    <option value="désactivé">Désactivé</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="tableBdd">
                        <table>
                            <caption>
                                Retrouvez toutes les données de vos événements
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Lieu</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Créé le</th>
                                    <th scope="col">Mis à jour le</th>
                                    <th scope="col">Valider/Bloquer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvents.map((event) => (
                                    <tr key={event.id}>
                                        <td className="primaryKey">{event.id}</td>
                                        <td>{event.title}</td>
                                        <td>{event.description}</td>
                                        <td>{event.date}</td>
                                        <td>{event.location}</td>
                                        <td>{event.status}</td>
                                        <td>{event.created_at}</td>
                                        <td>{event.updated_at}</td>
                                        <td>
                                            <div className="modoBtn">
                                                <button
                                                    className={`validateStatus btnValid ${selectedStatus[event.id] === "valide" ? "active" : ""}`}
                                                    onClick={() => handleClick(event.id, "valide")}
                                                >
                                                    Valider
                                                </button>
                                                <button
                                                    className={`blockedStatus btnBlock ${selectedStatus[event.id] === "bloqué" ? "active" : ""}`}
                                                    onClick={() => handleClick(event.id, "bloqué")}
                                                >
                                                    Bloquer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredEvents.length === 0 && <p>Aucun événement trouvé.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}