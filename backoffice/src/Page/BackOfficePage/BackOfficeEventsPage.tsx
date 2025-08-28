import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Logo from '../../Assets/images/Logo_OrizonBlanc.png';
import './BackOfficePage.scss';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';


type EventBdd = {
    id: number,
    name: string,
    start_date: string,
    end_date: string,
    description: string,
    address: string,
    zip_code: string,
    city: string,
    status: string,
    creator_id: string,
    created_at: string,
    updated_at: string,
}

export default function BackOfficeEventsPage() {

    const [eventsBdd, setEventsBdd] = useState<EventBdd[]>([]);

    /* State de filtrage par titre */
    const [searchTitle, setSearchTitle] = useState('');

    /* State de filtrage par status */
    const [searchStatus, setSearchStatus] = useState('')

    /* State systeme de interrupteur bouton bloqué / validé */
    const [selectedStatusEvents, setSelectedStatusEvents] = useState<{ [key: number]: string }>({});

    /*--------------------------------------------- */

    /* Constante de navigation */
    const navigate = useNavigate();

    /* Fonction de déconnexion */
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("selectedStatus");
        navigate("/");
    };

    /*---------------------------------------------------- */


    /* Sauvegarder a chaque modification dans le localStorage */
    useEffect(() => {
        const savedStatusEvt = localStorage.getItem("selectedStatus");
        if (savedStatusEvt) {
            setSelectedStatusEvents(JSON.parse(savedStatusEvt));
        }
    }, []);


    /* Fonction de changement du status (valider / bloquer) */
    const handleClick = async (id: number, status: string) => {
        try {
            const response = await fetch(`http://backend.localhost:81/events/${id}/status`, {
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

                setSelectedStatusEvents(prev => {
                    const updated = {
                        ...prev,
                        [id]: status
                    };
                    localStorage.setItem("selectedStatus", JSON.stringify(updated));
                    return updated;
                });
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
            : event.name.toLowerCase().includes(searchTitle.toLowerCase());

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
                        <Link to="/evenements">Événements</Link>
                    </div>
                </div>
                <div className="rightContainer">
                    <div className="headRightContainer">
                        <h1>TABLEAU DE BORD - Événements</h1>
                        <button onClick={handleLogout}>Deconnexion</button>
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
                                <label htmlFor="status">Recherche par statut</label>
                                <select
                                    id="status"
                                    value={searchStatus}
                                    onChange={(e) => setSearchStatus(e.target.value)}
                                >
                                    <option value="">-- Tous --</option>
                                    <option value="en_attente">En attente</option>
                                    <option value="valide">Valide</option>
                                    <option value="bloqué">Bloqué</option>
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
                                    <th scope="col">Début</th>
                                    <th scope="col">Fin</th>
                                    <th scope="col">Adresse</th>
                                    <th scope="col">Code_postale</th>
                                    <th scope="col">Ville</th>
                                    <th scope="col">Statut</th>
                                    <th scope="col">Crée_le</th>
                                    <th scope="col">Modifié_le</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvents.map((event) => (
                                    <tr key={event.id}>
                                        <td className="primaryKey">{event.id}</td>
                                        <td>{event.name}</td>
                                        <td>{event.description}</td>
                                        <td>{format(event.start_date, "d MMMM yyyy ", { locale: fr })}</td>
                                        <td>{format(event.end_date, "d MMMM yyyy ", { locale: fr })}</td>
                                        <td>{event.address}</td>
                                        <td>{event.zip_code}</td>
                                        <td>{event.city}</td>
                                        <td>{selectedStatusEvents[event.id] || event.status}</td>
                                        <td>{format(event.created_at, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</td>
                                        <td>{format(event.updated_at, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</td>
                                        <td>
                                            <div className="modoBtn">
                                                <button
                                                    className={`validateStatus btnValid ${selectedStatusEvents[event.id] === "valide" ? "active" : ""}`}
                                                    onClick={() => handleClick(event.id, "valide")}
                                                >
                                                    Valider
                                                </button>
                                                <button
                                                    className={`blockedStatus btnBlock ${selectedStatusEvents[event.id] === "bloqué" ? "active" : ""}`}
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