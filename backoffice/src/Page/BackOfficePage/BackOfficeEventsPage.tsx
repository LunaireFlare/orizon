import { Link } from 'react-router';
import { useState } from 'react';
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

const mockUser = [
    {
        id: 1,
        lastname: "NOVI",
        firstname: "Victor",
        email: "victornovi@hotmail.fr",
        password: "25082025HUHUjksjjajhhjgsag",
        zip_code: 75013,
        city: "Paris",
        date_of_birth: "11/09/1956",
        role: "utilisateur",
        photo: "string",
        description: "Je suis fan de musique et de cuisine cubaine",
        status: "en attente",
        created_at: "20/08/2025",
        updated_at: "23/08/2025"
    },
    {
        id: 2,
        lastname: "BEAUX",
        firstname: "Thomas",
        email: "toto59@hotmail.fr",
        password: "25082025Hhsgidxgssgzg345",
        zip_code: 59000,
        city: "Lille",
        date_of_birth: "11/09/1976",
        role: "utilisateur",
        photo: "string",
        description: "Je suis fan de danse classique et de theatre",
        status: "en attente",
        created_at: "10/06/2025",
        updated_at: "23/08/2025"
    }
]

export default function BackOfficePage() {

    const [ userBdd ] = useState<UserBdd[]>(mockUser)

    return (
        <div id="containerTableBoard">
            <div id="tableBoard">
                <div className="leftContainer">
                    <img src={Logo} alt="Logo Orizon"/>
                    <div>
                        <Link to="/">Utilisateurs</Link>
                        <Link to="/">Evènements</Link>
                    </div>
                </div>
                <div className="rightContainer">
                    <h1>TABLEAU DE BORD - Evenements</h1>
                    <div id="elmFilter">
                        <form>
                            <div className="filterName">
                                <label htmlFor="searchName">Recherche par nom/prenom</label>
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
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {userBdd.map((user) => (
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