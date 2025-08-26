import { Link } from 'react-router';
import { useState } from 'react';
import Logo from '../../Assets/images/Logo_OrizonBlanc.png';
import './BackOfficePage.scss';

type UserBdd = {
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

const mockEvent = [
    {
        id: 1,
        name: "Match de foot",
        start_date: "10/09/2025",
        end_date: "10/09/2025",
        description: "Un grand tournoi de football local",
        address: "4 rue de la paix",
        zip_code: "75013",
        city: "Paris",
        status: "e attente",
        creator_id: "Fabien DOCLAIR",
        created_at: "23/08/2025",
        updated_at: "26/08/2025",
    },
    {
        id: 2,
        name: "Match de foot",
        start_date: "10/09/2025",
        end_date: "10/09/2025",
        description: "Un grand tournoi de football local",
        address: "4 rue de la paix",
        zip_code: "75013",
        city: "Paris",
        status: "e attente",
        creator_id: "Fabien DOCLAIR",
        created_at: "23/08/2025",
        updated_at: "26/08/2025",
    }
]

export default function BackOfficePage() {

    const [ userBdd ] = useState<UserBdd[]>(mockEvent)

    return (
        <div id="containerTableBoard">
            <div id="tableBoard">
                <div className="leftContainer">
                    <img src={Logo} alt="Logo Orizon"/>
                    <div>
                        <Link to="/">Utilisateurs</Link>
                        <Link to="/evenements">Evènements</Link>
                    </div>
                </div>
                <div className="rightContainer">
                    <h1>TABLEAU DE BORD - Evenements</h1>
                    <div id="elmFilter">
                        <form>
                            <div className="filterName">
                                <label htmlFor="searchName">Rechercher nom d'evènement</label>
                                <input type="text" name="name" id="nom"/>
                            </div>
                            <div className="filterStatus">
                                <label htmlFor="searchName">Recherche par status</label>
                                <select  id="status">
                                    <option value="">-- status --</option>
                                    <option value="en attente">En attente</option>
                                    <option value="valide">Valide</option>
                                    <option value="bloque">Bloque</option>
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
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {userBdd.map((user) => (
                                            <tr key={user.id}>
                                            <td className="primaryKey">{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.start_date}</td>
                                            <td>{user.end_date}</td>
                                            <td>{user.description}</td>
                                            <td>{user.address}</td>
                                            <td>{user.zip_code}</td>
                                            <td>{user.city}</td>
                                            <td>{user.status}</td>
                                            <td>{user.creator_id}</td>
                                            <td>{user.created_at}</td>
                                            <td>{user.updated_at}</td>
                                        </tr>
                                    ))}
                                
                            </tbody>
                    </table>
                </div>    
                </div>
            </div>
        </div>
    );
}