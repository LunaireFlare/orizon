import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import RooftopConnected from '../../components/Rooftop/RooftopConnected';
import Banner from '../../components/Banner/Banner.tsx'
import Footer from '../../components/Footer/Footer.tsx';
import CardEvent from '../../components/CardEvent/CardEvent.tsx';
import Modal from '../../components/Modal/Modal.tsx';

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
    description: string,
    status: "en-attente" | "valide" | "bloqué" | "désactivé",
    interests: Interest[],
    events: Event[]
}

type Event = {
    id: number,
    photo: string,
    name: string,
    start_date: string,
    end_date: string,
    address: string,
    city: string,
    zip_code: number,
    description: string,
    creator_id: number,
    interests:Interest[]
}

type Interest = {
    id: number,
    name: string
}

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
    const [formData, setFormData] = useState<User | null>(null);
    const navigate = useNavigate();
    
    const [currentUser, setCurrentUser] = React.useState<{ id: number } | null>(null);
    const token = localStorage.getItem("token");

    
    
    React.useEffect(() => {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUser({ id: payload.id });
        }
    }, [token]);
    
    const openModifyModal = () => {
        setFormData(user);
        setActiveModal('modifyAccount');
    };

    const {id} = useParams();

    React.useEffect(() => {

        fetch(`http://backend.localhost:81/users/${id}`)
            .then((res) => res.json())
            .then((data: User) => {
                const forbiddenStatus= ["bloqué" , "désactivé"]
                if (forbiddenStatus.includes(data.status)){
                    navigate("/404", { replace: true });
                } else {
                    setUser(data);
                }
            })
            .catch((err) => console.error("Erreur API:", err));

        },  [id]);

    const [_success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [_loading, setLoading] = useState(false);
    const [ activeModal, setActiveModal ] = useState<string | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!user) {
        return <p>Chargement en cours…</p>;
    }

    console.log(user);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        setLoading(true);

        try {
            if (!token) throw new Error("Utilisateur non authentifié");
            const response = await fetch(`http://backend.localhost:81/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, confirmPassword: undefined }),
            });            

            const data = await response.json(); 

            if (!response.ok) {
                setError(data.error || "Erreur lors de la modification.");
            } else {
                setSuccess(true);
                setUser({ ...formData });
                setActiveModal(null);
            }
        } catch (err) {
            console.error("Erreur lors de la modification :", err);
            setError('Erreur réseau ou serveur.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e: React.FormEvent) => { 
        e.preventDefault();
        try {
            if (!token) throw new Error("Utilisateur non authentifié");

            const response = await fetch(`http://backend.localhost:81/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }); 

            if (!response.ok) {
                throw new Error(`Erreur lors de la suppression : ${response.statusText}`);
            } else 
            {
                setSuccess(true);
                setUser(null);
                setActiveModal(null);
                navigate('/');
            }

        } catch (err) {
            console.error("Erreur lors de la modification :", err);
            setError('Erreur réseau ou serveur.');
        }
    }

    return (
        <div id="fullContainerProfil">
            <RooftopConnected />
            <Banner />

            <div  id="containerProfil">
                <div className="widthProfil">
                    <div className="headProfil">
                        <div>
                            <h2>Mon profil</h2>
                        </div>
                        {currentUser?.id === user.id ? (
                        <div>
                            <button onClick={openModifyModal} className="pathButton">Modifier mon profil</button>
                            <button className="delButton" onClick={() => setActiveModal('deleteAccount')}>Supprimer mon compte</button>
                        </div>
                        ) : 
                        (
                            <button className="pathButton">Envoyer un message à {user.firstname}</button>
                        )
                        }
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
                                <h3>{user.firstname} {user.lastname} </h3>
                                <p>{getAge(user.date_of_birth)} ans</p>
                                <div><span>{user.city} ({user.zip_code})</span></div>
                                <p className="bioDescription">{user.description}</p>
                                </div>
                            )}
                        </div>
                        <div className="contentInterest">
                                {user.interests && user.interests.map((interest) => (
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
                    <div className="eventOptions">
                        <h2>Les évènements créés par moi</h2>
                        <button className="pathButton" onClick={() => setActiveModal('createEvent')}>Créer un évènement</button>
                    </div>
                    <div id="containerCards">
                        {user.events
                        ?.filter(event => event.creator_id === user.id)
                        .map(event => <CardEvent key={event.id} event={event} />)
                        }   
                    </div>
                </div>

            <div id="eventsParticiped">
                <div className="eventOptions">
                    <h2>Les évènements auxquels je participe</h2>
                    <button className="pathButton"><Link to="/evenements" className="link">Trouver d'autres évènements</Link></button>
                </div>
                <div id="containerCards">
                    {user.events && user.events
                    .filter((event)=> new Date(event.end_date) >= new Date())
                    .map((event) => (
                        <CardEvent key={event.id} event={event}/> 
                    ))} 
                </div>
            </div>

            <div id="eventsPassed">
                <h2>Les évènements auxquels j'ai participé</h2>
                <div id="containerCards">
                    {user.events
                        ?.filter(event => new Date(event.end_date)  < new Date())
                        .map(event => <CardEvent key={event.id} event={event} />)
                    }   
                </div>         
            </div>

            <Modal isOpen={activeModal === 'createEvent'} onClose={() => setActiveModal(null)}>
                <div id="containerCreateEvent">
                    <h2>Créer un évènement</h2>

                    <p>Tous les champs doivent obligatoirement être remplis.</p>
                    
                    <form className='eventForm'>
                        <label htmlFor="eventName">Nom de l'évènement</label>
                        <input
                                type="text"
                                name="eventName"
                                placeholder="Cours de cuisine, exposition au musée..."
                                // onChange={handleChange}
                                required
                        />

                        <label htmlFor="eventStartDate">Date et heure de début de l'évènement</label>
                        <input
                            type="datetime-local"
                            name="eventStartDate"
                            // onChange={handleChange}
                            required
                        />

                        <label htmlFor="eventEndDate">Date et heure de fin de l'évènement</label>
                        <input
                            type="datetime-local"
                            name="eventEndDate"
                            // onChange={handleChange}
                            required
                        />

                        <label htmlFor="eventDescription">Description</label>
                        <textarea
                                name="eventDescription"
                                placeholder="Décrivez votre évènement en quelques lignes !"
                                // onChange={handleChange}
                                required
                        />

                        <label htmlFor="eventAddress">Adresse</label>
                        <input
                                type="text"
                                name="eventAddress"
                                placeholder="75 rue Honoré de Balzac"
                                // onChange={handleChange}
                                required
                        />

                        <div className="eventAddressDetails">
                            <label htmlFor="eventCity">Ville</label>
                            <input
                                    type="text"
                                    name="eventCity"
                                    placeholder="Paris"
                                    // onChange={handleChange}
                                    required
                            />

                            <label htmlFor="eventZipCode">Code postal</label>
                            <input
                                    type="text"
                                    name="eventZipCode"
                                    placeholder="75000"
                                    // onChange={handleChange}
                                    required
                            />
                        </div>

                        <input type="submit" value="Valider" className=""></input>
                    </form>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'deleteAccount'} onClose={() => setActiveModal(null)}>
                <div id="containerDeleteAccount">
                    <h2>Supprimer mon compte</h2>
                    <p>Attention ! Vous êtes sur le point de supprimer votre compte. Si vous cliquez sur le bouton "Je confirme", vous n'aurez plus accès au site et vos données personnelles seront effacées. Si vous ne souhaitez pas supprimer votre compte, cliquez sur la croix rouge en haut à droite ou n'importe où en dehors de cet encadré.</p>
                    <p>Êtes-vous sûr(e) de vouloir supprimer votre compte ?</p>

                    <button className="delButton" type='submit' onClick={handleDelete}>Je confirme</button>
                </div>
            </Modal>

            

            <Modal isOpen={activeModal === 'modifyAccount'} onClose={() => setActiveModal(null)}>

                <form onSubmit={handleSubmit} className="eventForm">
                    <label htmlFor="lastname">Nom</label>
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Nom*"
                        value={formData?.lastname}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Prénom*"
                        value={formData?.firstname}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="date_of_birth">Date de naissance</label>
                    <input
                        type="text"
                        name="date_of_birth"
                        value={formData?.date_of_birth}
                        placeholder="Date de naissance (JJ/MM/AAAA)*"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData?.email}
                        placeholder="Email*"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="zip_code">Code Postal</label>
                    <input
                        type="text"
                        name="zip_code"
                        value={formData?.zip_code}
                        placeholder="Code postal*"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="city">Ville</label>
                    <input
                        type="text"
                        name="city"
                        value={formData?.city}
                        placeholder="Ville*"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData?.description}
                        placeholder="Description"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe (min 8 caractères)*"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="confirmPassword">Confirmez votre mot de passe</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmer le mot de passe*"
                        onChange={handleChange}
                        required
                    />
                    <input type="submit" value="Valider" className=""></input>
                    {error && <p className="error-msg">{error}</p>}
                </form>
            </Modal>
    <Footer />
        </div>
    )
}