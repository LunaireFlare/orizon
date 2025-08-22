import { useState } from 'react';
import Rooftop from '../../components/Rooftop/Rooftop.tsx'
import Banner from '../../components/Banner/Banner.tsx'
import Footer from '../../components/Footer/Footer.tsx';
import CardEvent from '../../components/CardEvent/CardEvent.tsx';
import Modal from "../../components/Modal/Modal.tsx";

import './ProfilPage.scss';
import React from 'react';
import { useParams } from 'react-router';

type User = {
    id: number,
    lastname: string,
    firstname: string,
    email: string,
    password: string,
    confirmPassword: string,
    zip_code: string,
    city: string,
    date_of_birth: string,
    description: string
}

type Interest = {
    id: number,
    name: string
}

const mockInterests: Interest[] = [
    { id: 1, name: "cuisine" },
    { id: 2, name: "sport" },
    { id: 3, name: "cinema" }
];

function getAge(dateOfBirth: Date | string): number {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}  

export default function ProfilPage() {

    const [user, setUser] = useState<User | null >(null);
    const [interests] = useState<Interest[]>(mockInterests);
    const {id} = useParams();

    React.useEffect(() => {

        fetch(`http://localhost:3000/users/${id}`)
            .then((res) => res.json())
            .then((data: User) => {
                setUser(data);
            })
            .catch((err) => console.error("Erreur API:", err));

        },  [id]);

    const [_success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [_loading, setLoading] = useState(false);

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return;
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    if (!user) {
        return <p>Chargement en cours…</p>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (user.password !== user.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (user.password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        setLoading(true);

        try {

            const { confirmPassword, ...userData } = user;

            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lastname: userData.lastname,
                    firstname: userData.firstname,
                    email: userData.email,
                    password: userData.password,
                    zip_code: userData.zip_code,
                    city: userData.city,
                    date_of_birth: userData.date_of_birth,
                    description: userData.description
                }),
            });            

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Erreur lors de la modification.");
            } else {
                setSuccess(true);
            }
        } catch (err) {
            console.error("Erreur lors de la modification :", err);
            setError('Erreur réseau ou serveur.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="fullContainerProfil">
            <Rooftop />
            <Banner />

            <div  id="containerProfil">
                <div className="widthProfil">
                    <div className="headProfil">
                        <div>
                            <h2>Mon profil</h2>
                        </div>
                        <div>
                            <button onClick={()=> {setModalOpen(true);}} className="pathButton">Modifier mon profil</button>
                            <button className="delButton">Supprimer mon compte</button>
                        </div>
                    </div>
                    <div className="bodyProfil">
                    <div>
                        <img src="../../src/assets/images/avatarWomen.webp" width="120px" alt="photo de profil" />

                        {/* Pour fiche profil autre utilisateur */}
                         {/* <button className="buttonOnWhite">Contacter</button> */}
                    </div>

                    <div className="contentInfo">
                        <div>
                            {user && (
                                <div key={user.id}>
                                <h3>{user.lastname}</h3>
                                <h3>{user.firstname}</h3>
                                <p>{getAge(user.date_of_birth)} ans</p>
                                <div><span>{user.city} ({user.zip_code})</span></div>
                                <p className="bioDescription">{user.description}</p>
                                </div>
                            )}
                        </div>
                        <div className="contentInterest">
                                {interests.map((interest) => (
                                <div key={interest.id}>
                                <button className="intButton">{interest.name}</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    </div>
                </div>
            </div>

            <div id="eventsCreated">
                <h2>Les évènements créés par moi</h2>
                <CardEvent />  
            </div>

            <div id="eventsParticiped">
                <h2>Les évènements auxquels je participe</h2>
                <CardEvent />  
            </div>

            <div id="eventsPassed">
                <h2>Les évènements auxquels j'ai participé</h2>
                <CardEvent />  
            </div>

            <Footer />

            <Modal 
                    isOpen={isModalOpen} 
                    onClose={() => {
                        setModalOpen(false);
                        }}
                    >

                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Nom*"
                        value={user.lastname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Prénom*"
                        value={user.firstname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="date_of_birth"
                        value={user.date_of_birth}
                        placeholder="Date de naissance (JJ/MM/AAAA)*"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        placeholder="Email*"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="zip_code"
                        value={user.zip_code}
                        placeholder="Code postal*"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={user.city}
                        placeholder="Ville*"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="description"
                        value={user.description}
                        placeholder="Description"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe (min 8 caractères)*"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmer le mot de passe*"
                        onChange={handleChange}
                        required
                    />
                    <button className="buttonHover" type="submit">Enregistrer</button>
                    {error && <p className="error-msg">{error}</p>}
                </form>
            </Modal>

        </div>
    )
}