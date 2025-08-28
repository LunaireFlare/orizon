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

    const [ userBdd, setUserBdd ] = useState<UserBdd[]>([]);

    /* State de filtrage par nom prenom */
    const [ searchName, setSearchName ] = useState('');

    /* State de filtrage par status */
    const [ searchStatus, setSearchStatus ] = useState('')


    /* State systeme de interupteur bouton bloque / valider */
    const [ selectedStatus, setSelectedStatus ] = useState<{ [key: number]: string }>({});

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


    /* Function de changement des boutons bloquer / valider + changement du status en BBD */
    const handleClick = async (id: number, status: string) => {
    const newStatus = status === "validate" ? "valide" : "bloqué";

        setSelectedStatus(prev => {
            const newSelected = { ...prev, [id]: status };
            localStorage.setItem("selectedStatus", JSON.stringify(newSelected));
            return newSelected;
        });

        setUserBdd(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));

        try {
            const token = localStorage.getItem("token")

            await fetch(`http://backend.localhost:81/users/${id}`, {
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

        /* Filtrage des utilisateurs par nom prenom */
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
                    <img src={Logo} alt="Logo Orizon"/>
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
                                <label htmlFor="searchName">Recherche par nom/prenom</label>
                                <input type="text" 
                                    name="name" 
                                    id="nom"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    placeholder="Tapez au moins 3 lettres"/>
                            </div>
                            <div className="filterStatus">
                                <label htmlFor="searchName">Recherche par status</label>
                                <select
                                  id="status"
                                  value={searchStatus}
                                  onChange={(e) => setSearchStatus(e.target.value)}>
                                    <option value="">-- status --</option>
                                    <option value="en attente">En attente</option>
                                    <option value="valide">Valide</option>
                                    <option value="bloqué">Bloqué</option>
                                    <option value="desactivé">Désactivé</option>
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
                                            <td>{selectedStatus[user.id]
                                                    ? {
                                                        pending: "en attente",
                                                        validate: "valide",
                                                        block: "bloqué",
                                                        disable: "désactivé",     
                                                    } [selectedStatus[user.id]] || user.status
                                                    : user.status}</td>
                                            <td>{user.created_at}</td>
                                            <td>{user.updated_at}</td>
                                            <td>
                                                <div className="modoBtn">
                                                    <button className={ `validateStatus btnValid 
                                                        ${selectedStatus[user.id] === "validate" ? "active" : "" }`} 
                                                        onClick={() => handleClick(user.id, "validate")}>
                                                            Valider
                                                        </button>

                                                    <button className={ `blockedStatus btnBlock 
                                                        ${selectedStatus[user.id] === "block" ? "active" : "" }`} 
                                                        onClick={() => handleClick(user.id, "block")}>
                                                            Bloqué
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