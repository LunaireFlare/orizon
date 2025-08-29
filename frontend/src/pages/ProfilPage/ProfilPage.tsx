import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import Rooftop from '../../components/Rooftop/Rooftop';
import Banner from '../../components/Banner/Banner.tsx'
import Footer from '../../components/Footer/Footer.tsx';
import CardEvent from '../../components/CardEvent/CardEvent.tsx';
import Modal from '../../components/Modal/Modal.tsx';
import ModifyAccountModal from '../../components/ModifyAccountModal/ModifyAccountModal.tsx';
import CreateEventModal from '../../components/CreateEventModal/CreateEventModal.tsx';

import './ProfilPage.scss';

import type { User, Interest} from "../../types/index.d.ts"

import { getAge } from '../../utils/getAge.ts';
import { fetchApi } from '../../utils/api';
import { handleEventDelete, handleSubscribe, handleUnsubscribe } from '../../utils/eventHandler.ts';

export default function ProfilPage() {

    const [user, setUser] = useState<User | null>(null);
    const [interests, setInterests] = useState<Interest[]>([]);
    const [formData, setFormData] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = React.useState<{ id: number } | null>(null);
    const [selectedInterest, setSelectedInterest] = useState<string>("");
    const [_success, setSuccess] = useState(false);
    const [_error, setError] = useState<string | null>(null);
    const [_loading, setLoading] = useState(false);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate('/connexion');
        };
    }, [token, navigate]);


    React.useEffect(() => {
        if (token) {
            //Décode le token
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUser({ id: payload.id });
        }
    }, [token]);

    const openModifyModal = () => {
        setFormData(user);
        setActiveModal('modifyAccount');
    };

    const { id } = useParams();

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const [userData, interestsData] = await Promise.all([
                    fetchApi(`users/${id}`),
                    fetchApi('interests')
                ]);

                const forbiddenStatus = ["bloqué", "désactivé", undefined]
                if (forbiddenStatus.includes(userData.status)) {
                    navigate("/404", { replace: true });
                } else {
                    setUser(userData);
                }

                setInterests(interestsData);
            } catch (error) {
                setError('Erreur lors du chargement des données.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddInterest = async () => {
        if (!selectedInterest) return;
        if (!token) {
            alert("Vous devez être connecté");
            return;
        }

        try {
            const response = await fetchApi(`users/${id}/interests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ interest_id: selectedInterest }),
            });

            if (!response) throw new Error("Erreur lors de l'ajout de l'intérêt");

            const addedInterest = interests.find((i) => i.id === parseInt(selectedInterest));
            if (addedInterest && user) {
                setUser({ ...user, interests: [...user.interests, addedInterest] });
            }
            setSelectedInterest("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteInterest = async (interest_id: number) => {
        if (!token) {
            alert("Vous devez être connecté");
            return;
        }

        try {
            const response = await fetchApi(`users/${id}/interests/${interest_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response) {
                throw new Error(`Erreur lors de la suppression : ${response.statusText}`);
            }

            if (user) {
                setUser({
                    ...user,
                    interests: user.interests.filter(i => i.id !== interest_id)
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (!user) {
        return <p>Chargement en cours…</p>;
    }

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
            } else {
                setSuccess(true);
                setUser(null);
                setActiveModal(null);
                localStorage.removeItem('token');
                navigate('/');
            }

        } catch (err) {
            console.error("Erreur lors de la modification :", err);
            setError('Erreur réseau ou serveur.');
        }
    }

    return (
        <div id="fullContainerProfil">
            <Rooftop />
            <Banner />

            <div id="containerProfil">
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
                            <div id='containerInterests'>
                                {user.interests && user.interests.map((interest) => (
                                    <div className="intButton" key={interest.id}>
                                        {interest.name}
                                        {currentUser?.id === user.id && (<span className="" onClick={() => handleDeleteInterest(interest.id)}>X</span>)}
                                    </div>
                                ))}
                            </div>
                            {currentUser?.id === user.id && (
                                <div id='containerSearchInterest'>
                                    <label>Centre d’intérêt</label>
                                    <select
                                        id="interet"
                                        value={selectedInterest}
                                        onChange={(e) => setSelectedInterest(e.target.value)}>
                                        <option value="">-- Choisissez un centre d'intérêt --</option>
                                        {interests?.map((interest) => <option key={interest.id} value={interest.id}>{interest.name}</option>)}
                                    </select>
                                    <button onClick={handleAddInterest} className="pathButton">Ajouter</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div id="eventsCreated">
                <div className="eventOptions">
                    <h2>Les évènements créés par moi</h2>
                    {currentUser?.id === user.id && (<button className="pathButton" onClick={() => setActiveModal('createEvent')}>Créer un évènement</button>)}
                </div>
                <div id="containerCards">
                    {user.events
                        ?.filter(event => event.creator_id === user.id)
                        .map(event => <CardEvent key={event.id} event={event} onDelete={(eventId) => handleEventDelete(user, setUser, eventId)} onSubscribe={(eventId) => handleSubscribe(user, setUser, eventId)} onUnsubscribe={(eventId) => handleUnsubscribe(user, setUser, eventId)} />)
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
                        .filter((event) => new Date(event.end_date) >= new Date())
                        .map((event) => (
                            <CardEvent key={event.id} event={event} onDelete={(eventId) => handleEventDelete(user, setUser, eventId)} onSubscribe={(eventId) => handleSubscribe(user, setUser, eventId)} onUnsubscribe={(eventId) => handleUnsubscribe(user, setUser, eventId)} />
                        ))}
                </div>
            </div>

            <div id="eventsPassed">
                <h2>Les évènements auxquels j'ai participé</h2>
                <div id="containerCards">
                    {user.events
                        ?.filter(event => new Date(event.end_date) < new Date())
                        .map(event => <CardEvent key={event.id} event={event} onDelete={(eventId) => handleEventDelete(user, setUser, eventId)} onSubscribe={(eventId) => handleSubscribe(user, setUser, eventId)} onUnsubscribe={(eventId) => handleUnsubscribe(user, setUser, eventId)} />)
                    }
                </div>
            </div>

            <CreateEventModal 
            isOpen={activeModal === 'createEvent'}
            onClose={() => setActiveModal(null)}
            interests={interests}
            user={user}
            setUser={setUser}
            setActiveModal={setActiveModal} />

            <Modal isOpen={activeModal === 'deleteAccount'} onClose={() => setActiveModal(null)}>
                <div id="containerDeleteAccount">
                    <h2>Supprimer mon compte</h2>
                    <p>Attention ! Vous êtes sur le point de supprimer votre compte. Si vous cliquez sur le bouton "Je confirme", vous n'aurez plus accès au site et vos données personnelles seront effacées. Si vous ne souhaitez pas supprimer votre compte, cliquez sur la croix rouge en haut à droite ou n'importe où en dehors de cet encadré.</p>
                    <p>Êtes-vous sûr(e) de vouloir supprimer votre compte ?</p>
                    <button className="delButton" type='submit' onClick={handleDelete}>Je confirme</button>
                </div>
            </Modal>

            <ModifyAccountModal 
                isOpen={activeModal === "modifyAccount"} 
                onClose={() => setActiveModal(null)}
                formData={formData}
                setFormData={setFormData}
                setUser={setUser}
                setActiveModal={setActiveModal} />

            <Footer />
        </div>
    )
}