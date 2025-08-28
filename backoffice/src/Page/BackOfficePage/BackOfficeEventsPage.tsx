
import { Link, useNavigate } from 'react-router';

import { useEffect, useState } from 'react';
import Logo from '../../Assets/images/Logo_OrizonBlanc.png';
import './BackOfficePage.scss';

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


export default function BackOfficePage() {

    const [ eventsBdd, setEventsBdd ] = useState<EventBdd[]>([]);

    /* State de filtrage par evenements */
    const [ searchEvents, setSearchEvents] = useState('');

    /* State de filtrage par status de l'evenement */
    const [ searchStatusEvents, setSearchStatusEvents ] = useState('');

    /* State systeme de interupteur bouton bloque / valider */
    const [ selectedStatusEvents, setSelectedStatusEvents ] = useState<{ [key: number]: string }>({});


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


    /* Function de changement des boutons bloquer / valider + changement du status en BBD */
    const handleClick = async (id: number, status: string) => {
        const newStatus = status === "validate" ? "valide" : "bloqué";

        setSelectedStatusEvents(prev => {
            const newSelected = { ...prev, [id]: status };
            localStorage.setItem("selectedStatusEvents", JSON.stringify(newSelected));
            return newSelected;
        });

        setEventsBdd(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));

        try {
            const token = localStorage.getItem("token")

            await fetch(`http://backend.localhost:81/events/${id}`, {
                method: "PATCH", // ou PUT selon ton API
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({ status: newStatus })
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour du status :", error);
        };
    };


    /* Fetch de l'API users */

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch("http://backend.localhost:81/events", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const data = await response.json();
                console.log("Data reçue de l'API :", data);
                setEventsBdd(data);
            } catch (error) {
                console.error("Erreur de chargement utilisateurs :", error);

            }
        }
        fetchEvents();
    }, []);


        /* Filtrage des utilisateurs par nom prenom */
        const filteredEvents = eventsBdd.filter(event => {
            const eventName = (event.name).toLowerCase();
    
            const matchName = searchEvents.length < 3 
                ? true 
                : eventName.includes(searchEvents.toLowerCase());
    
            const matchStatus = searchStatusEvents === "" 
                ? true 
                : event.status.toLowerCase() === searchStatusEvents.toLowerCase();
    
            return matchName && matchStatus;
        });


    return (
        <div id="containerTableBoard">
            <div id="tableBoard">
                <div className="leftContainer">
                    <img src={Logo} alt="Logo Orizon" />
                    <div>
                        <Link to="/users">Utilisateurs</Link>
                        <Link to="/evenements" onClick={handleLogout}>Evènements</Link>
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

                                <label htmlFor="searchName">Rechercher nom d'evènement</label>
                                <input type="text"
                                    name="name" 
                                    id="nom"
                                    value={searchEvents}
                                    onChange={(e) => setSearchEvents(e.target.value)}
                                    placeholder="Tapez au moins 3 lettres"/>
                            </div>
                            <div className="filterStatus">
                                <label htmlFor="searchName">Recherche par status</label>
                                <select  id="status"
                                    value={searchEvents}
                                    onChange={(e) => setSearchStatusEvents(e.target.value)}>

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
                                <th scope="row">id</th>
                                    <th scope="col">name</th>
                                    <th scope="col">start_date</th>
                                    <th scope="col">end_date</th>
                                    <th scope="col">description</th>
                                    <th scope="col">address</th>
                                    <th scope="col">zip_code</th>
                                    <th scope="col">city</th>
                                    <th scope="col">status</th>
                                    <th scope="col">creator_id</th>
                                    <th scope="col">created_at</th>
                                    <th scope="col">updated_at</th>
                                    <th scope="col">Valider/Bloque</th>
                                </tr>
                            </thead>
                            <tbody>

                                
                                    {eventsBdd.map((event) => (
                                            <tr key={event.id}>
                                            <td className="primaryKey">{event.id}</td>
                                            <td>{event.name}</td>
                                            <td>{event.start_date}</td>
                                            <td>{event.end_date}</td>
                                            <td>{event.description}</td>
                                            <td>{event.address}</td>
                                            <td>{event.zip_code}</td>
                                            <td>{event.city}</td>
                                            <td>{selectedStatusEvents[event.id]
                                                    ? {
                                                        pending: "en attente",
                                                        validate: "valide",
                                                        block: "bloqué",
                                                    } [selectedStatusEvents[event.id]] || event.status
                                                    : event.status}</td>
                                            <td>{event.creator_id}</td>
                                            <td>{event.created_at}</td>
                                            <td>{event.updated_at}</td>
                                            <td>
                                                <div className="modoBtn">
                                                    <button className={`validateStatus btnValid 
                                                        ${selectedStatusEvents[event.id]} === "valide" ? "active" : "" }`} 
                                                        onClick={() => handleClick(event.id, "validate")}>
                                                            Validate
                                                        </button>

                                                    <button className={ `blockedStatus btnBlock 
                                                        ${selectedStatusEvents[event.id] === "block" ? "active" : "" }`} 
                                                        onClick={() => handleClick(event.id, "block")}>
                                                            Block
                                                        </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                
                            </tbody>
                    </table>
                    {filteredEvents.length === 0 && <p>Aucun utilisateur trouvé.</p>}
                </div>    

                </div>
            </div>
        </div>
    );
}
