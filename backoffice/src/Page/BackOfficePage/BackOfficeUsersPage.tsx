import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Logo from '../../Assets/images/Logo_OrizonBlanc.png';
import './BackOfficePage.scss';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type UserBdd = {
    id: number;
    lastname: string;
    firstname: string;
    email: string;
    zip_code: number;
    city: string;
    date_of_birth: string;
    role: string;
    photo: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
};

export default function BackOfficePage() {
    const [userBdd, setUserBdd] = useState<UserBdd[]>([]);
    const [searchName, setSearchName] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const navigate = useNavigate();

    // Déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    /* Sauvegarder a chaque modification dans le localStorage */
    useEffect(() => {
        const savedStatus = localStorage.getItem("selectedStatus");
        if (savedStatus) {
            setSearchStatus(JSON.parse(savedStatus));
        }
    }, []);


    // Récupère les utilisateurs depuis l'API
    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://backend.localhost:81/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            setUserBdd(data);
        } catch (error) {
            console.error('Erreur de chargement utilisateurs :', error);
        }
    };

    // Initial load
    useEffect(() => {
        fetchUsers();
    }, []);

    // Changement de statut
    const handleClick = async (id: number, status: string) => {
        try {
            const response = await fetch(`http://backend.localhost:81/users/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                console.log(`Statut mis à jour pour l'utilisateur ${id} → ${status}`);
                await fetchUsers();
            } else {
                const data = await response.json();
                console.error('Erreur API :', data.error || data);
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
        }
    };


    // Filtrage par nom / statut
    const filteredUsers = userBdd.filter((user) => {
        const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();

        const matchName =
            searchName.length < 3
                ? true
                : fullName.includes(searchName.toLowerCase());

        const matchStatus =
            searchStatus === ''
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
                        <button onClick={handleLogout}>Déconnexion</button>
                    </div>

                    <div id="elmFilter">
                        <form>
                            <div className="filterName">
                                <label htmlFor="searchName">Recherche par nom/prénom</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="nom"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    placeholder="Tapez au moins 3 lettres"
                                />
                            </div>
                            <div className="filterStatus">
                                <label htmlFor="searchStatus">Recherche par status</label>
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
                                Retrouvez toutes les données de vos utilisateurs
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prénom</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Code_postale</th>
                                    <th scope="col">Ville</th>
                                    <th scope="col">Date_naissance</th>
                                    <th scope="col">Rôle</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Créé le</th>
                                    <th scope="col">Modifié_le</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="primaryKey">{user.id}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.zip_code}</td>
                                        <td>{user.city}</td>
                                        <td>{user.date_of_birth}</td>
                                        <td>{user.role}</td>
                                        <td>{user.photo}</td>
                                        <td>{user.description}</td>
                                        <td>{user.status}</td>
                                        <td>{format(user.created_at, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</td>
                                        <td>{format(user.updated_at, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</td>
                                        <td>
                                            <div className="modoBtn">
                                                <button
                                                    className={`validateStatus btnValid ${user.status === 'valide' ? 'active' : ''}`}
                                                    onClick={() => handleClick(user.id, 'valide')}
                                                    disabled={user.status === 'validé'}
                                                >
                                                    Valider
                                                </button>

                                                <button
                                                    className={`blockedStatus btnBlock ${user.status === 'bloqué' ? 'active' : ''}`}
                                                    onClick={() => handleClick(user.id, 'bloqué')}
                                                    disabled={user.status === 'bloqué'}
                                                >
                                                    Bloquer
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
