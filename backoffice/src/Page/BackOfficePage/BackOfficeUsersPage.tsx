import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Logo from '../../Assets/images/Logo_OrizonBlanc.png';
import './BackOfficePage.scss';

type UserBdd = {
    id: number,
    lastname: string,
    firstname: string,
    email: string,
    password: string,
    zip_code: number,
    city: string,
    date_of_birth: string,
    role: string,
    photo: string,
    description: string,
    status: string,
    created_at: string,
    updated_at: string
}


export default function BackOfficePage() {

    const [userBdd, setUserBdd] = useState<UserBdd[]>([]);

    /* State de filtrage par nom prenom */
    const [searchName, setSearchName] = useState('');

    /* State de filtrage par status */
    const [searchStatus, setSearchStatus] = useState('')


    /* State systeme de interupteur bouton bloque / valider */
    const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: string }>({});

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
        const savedStatus = localStorage.getItem("selectedStatus");
        if (savedStatus) {
            setSelectedStatus(JSON.parse(savedStatus));
        }
    }, []);


    /* Function de changement des boutons bloquer / valider */
    const handleClick = async (id: number, status: string) => {
        try {
            const response = await fetch(`http://backend.localhost:81/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // ou adapte selon ta gestion du token
                },
                body: JSON.stringify({ status })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);

                // Mets à jour le statut localement après succès
                setUserBdd(prev =>
                    prev.map(user =>
                        user.id === id ? { ...user, status } : user
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



    /* Fetch de l'API users */
    useEffect(() => {
        async function fetchUsers() {
            try {

                const response = await fetch("http://backend.localhost:81/users");

                const data = await response.json();
                setUserBdd(data);
            } catch (error) {
                console.error("Erreur de chargement utilisateurs :", error);
            }
        }
        fetchUsers();
    }, []);


    /* Filtrage des utilisateurs par nom prénom */
    const filteredUsers = userBdd.filter(user => {
        const fullName = (user.firstname + " " + user.lastname).toLowerCase();

        const matchName = searchName.length < 3
            ? true
            : fullName.includes(searchName.toLowerCase());

        const matchStatus = searchStatus === ""
            ? true
            : user.status.toLowerCase() === searchStatus.toLowerCase();

        return matchName && matchStatus;
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
                        <h1>TABLEAU DE BORD - Utilisateurs</h1>
                        <button onClick={handleLogout}>Deconnexion</button>
                    </div>
                    <div id="elmFilter">
                        <form>
                            <div className="filterName">
                                <label htmlFor="searchName">Recherche par nom/prénom</label>
                                <input type="text"
                                    name="name"
                                    id="nom"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    placeholder="Tapez au moins 3 lettres" />
                            </div>
                            <div className="filterStatus">
                                <label htmlFor="searchName">Recherche par status</label>
                                <select
                                    id="status"
                                    value={searchStatus}
                                    onChange={(e) => setSearchStatus(e.target.value)}>
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
                                Retrouvez toutes les donnees de vos utilisateurs
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="row">id</th>
                                    <th scope="col">lastname</th>
                                    <th scope="col">firstname</th>
                                    <th scope="col">email</th>
                                    <th scope="col">password</th>
                                    <th scope="col">zip_code</th>
                                    <th scope="col">city</th>
                                    <th scope="col">date_of_birth</th>
                                    <th scope="col">role</th>
                                    <th scope="col">photo</th>
                                    <th scope="col">description</th>
                                    <th scope="col">status</th>
                                    <th scope="col">created_at</th>
                                    <th scope="col">updated_at</th>
                                    <th scope="col">Valider/Bloque</th>
                                </tr>
                            </thead>
                            <tbody>


                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="primaryKey">{user.id}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>{user.zip_code}</td>
                                        <td>{user.city}</td>
                                        <td>{user.date_of_birth}</td>
                                        <td>{user.role}</td>
                                        <td>{user.photo}</td>
                                        <td>{user.description}</td>
                                        <td>{user.status}</td>
                                        <td>{user.created_at}</td>
                                        <td>{user.updated_at}</td>
                                        <td>
                                            <div className="modoBtn">
                                                <button
                                                    className={`validateStatus btnValid ${selectedStatus[user.id] === "valide" ? "active" : ""}`}
                                                    onClick={() => handleClick(user.id, "valide")}
                                                >
                                                    Validate
                                                </button>

                                                <button
                                                    className={`blockedStatus btnBlock ${selectedStatus[user.id] === "bloqué" ? "active" : ""}`}
                                                    onClick={() => handleClick(user.id, "bloqué")}
                                                >
                                                    Block
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && <p>Aucun utilisateur trouvé.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}