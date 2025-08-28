import { useState, useEffect } from 'react';
import Modal from './Modal.tsx';
import type { Event } from '../../types/index.d.ts';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import './CardEvent.scss';

const interestImages: Record<string, string> = {
    Sport: 'https://cdn.pixabay.com/photo/2022/10/23/19/38/womens-football-7541990_1280.jpg',
    Cuisine: 'https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg',
    Musique: 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg',
    Voyage: 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg'
};

interface CardEventProps {
    event: Event;
    onEventUpdated?: (event: Event) => void;
};

export default function CardEvent({ event, onEventUpdated }: CardEventProps) {

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Nouvel état pour modale édition
    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

    // Formulaire modifiable
    const [formDataEditEvent, setFormDataEditEvent] = useState<{
        id?: number;
        name: string;
        start_date: string;
        end_date: string;
        description: string;
        address: string;
        zip_code: string;
        city: string;
        interestId: number | "";
    }>({
        name: "",
        start_date: "",
        end_date: "",
        description: "",
        address: "",
        zip_code: "",
        city: "",
        interestId: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [currentUser, setCurrentUser] = useState<{ id: number } | null>(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUser({ id: payload.id });
        }
    }, [token]);

    useEffect(() => {
        async function fetchEvent() {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`http://backend.localhost:81/events/${event.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!res.ok) {
                    throw new Error('Erreur lors du chargement des données.');
                };

                const eventSelected = await res.json();

                setSelectedEvent(eventSelected);
            } catch (error) {
                setError('Erreur lors du chargement des données.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [token, event.id]);

    async function handleDelete() {
        if (!token) {
            alert('Vous devez être connecté');
            return;
        };

        const isConfirmed = confirm('Êtes-vous sûr(e) de vouloir supprimer cet évènement ?');

        if (!isConfirmed) {
            setModalOpen(false);
            return;
        }

        try {
            const res = await fetch(`http://backend.localhost:81/events/${event.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!res.ok) {
                throw new Error('Erreur lors de la suppression de l\'évènement');
            }

            setSelectedEvent(null);
            setModalOpen(false);
            if (onEventUpdated) onEventUpdated(updatedEvent);


        } catch (error) {
            setError('Erreur lors du chargement des données.');
        }
    };

    async function subscribeToEvent() {
        if (!token) {
            alert('Vous devez être connecté');
            return;
        };

        try {
            if (selectedEvent?.users.some(user => user.id === currentUser?.id)) {
                alert('Vous êtes déjà inscrit(e) à cet évènement.');
                return;
            };

            const res = await fetch(`http://backend.localhost:81/events/${selectedEvent?.id}/users/${currentUser?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!res.ok) {
                throw new Error('Erreur lors du chargement des données.');
            };

            alert('Vous êtes bien inscrit à l\'évènement.');
            if (onEventUpdated) onEventUpdated(updatedEvent);
            // Mettre à jour localement la liste users si besoin (pas fait ici)

        } catch (error) {
            setError('Erreur lors du chargement des données.');
        } finally {
            setLoading(false);
        };
    }

    async function unsubscribeFromEvent() {
        if (!token) {
            alert('Vous devez être connecté');
            return;
        };

        try {
            if (!selectedEvent?.users.some(user => user.id === currentUser?.id)) {
                alert('Vous n\'êtes pas inscrit(e) à cet évènement.');
                return;
            };

            const res = await fetch(`http://backend.localhost:81/events/${selectedEvent?.id}/users/${currentUser?.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!res.ok) {
                throw new Error('Erreur lors de la désinscription. Veuillez réessayer.');
            };

            alert('Vous êtes bien désinscrit de l\'évènement.');
            if (onEventUpdated) onEventUpdated(updatedEvent);


            // Mettre à jour localement la liste users si besoin (pas fait ici)

        } catch (error) {
            setError('Erreur lors du chargement des données.');
        } finally {
            setLoading(false);
        };
    }

    // --- Nouvelle fonction pour ouvrir modale édition avec données préremplies ---
    async function openEditModal(eventId: number) {
        if (!token) {
            alert('Vous devez être connecté');
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`http://backend.localhost:81/events/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error('Erreur chargement événement');

            const eventData = await res.json();

            setFormDataEditEvent({
                id: eventData.id,
                name: eventData.name || "",
                start_date: eventData.start_date || "",
                end_date: eventData.end_date || "",
                description: eventData.description || "",
                address: eventData.address || "",
                zip_code: eventData.zip_code || "",
                city: eventData.city || "",
                interestId: eventData.interests && eventData.interests.length > 0 ? eventData.interests[0].id : ""
            });

            setEditModalOpen(true);
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement de l\'évènement.');
        } finally {
            setLoading(false);
        }
    }

    // Gestion changement formulaire édition
    function handleChangeEditEvent(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        setFormDataEditEvent(prev => ({
            ...prev,
            [name]: name === "interestId" ? Number(value) : value
        }));
    }

    // Soumission formulaire édition
    async function handleSubmitEditEvent(e: React.FormEvent) {
        e.preventDefault();

        if (!formDataEditEvent.id) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`http://backend.localhost:81/events/${formDataEditEvent.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formDataEditEvent.name,
                    start_date: formDataEditEvent.start_date,
                    end_date: formDataEditEvent.end_date,
                    description: formDataEditEvent.description,
                    address: formDataEditEvent.address,
                    zip_code: formDataEditEvent.zip_code,
                    city: formDataEditEvent.city,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Erreur lors de la modification.');
            }

            const updatedEvent = await res.json();

            // ✅ Met à jour l'event côté parent via callback
            if (onEventUpdated) onEventUpdated(updatedEvent);

            setSelectedEvent(updatedEvent);
            setEditModalOpen(false);
            alert('Évènement modifié avec succès.');

        } catch (err: any) {
            setError(err.message || 'Erreur lors de la modification.');
        } finally {
            setLoading(false);
        }
    }


    return (
        <div id='containerCard'>

            <div className='elmCard'>
                <div key={event.id}>
                    <a onClick={() => { setModalOpen(true) }}>
                        <img src={interestImages[event.interests[0]?.name]} />
                    </a>
                    <a onClick={() => { setModalOpen(true) }}>
                        <h3>{event.name}</h3>
                    </a>
                    <p>Début: {format(event.start_date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })} </p>
                    <p>Fin: {format(event.end_date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                    <p><span>{event.city} ({event.zip_code})</span></p>
                    <p className='eventDescription'>{event.description}</p>
                    {event.interests.map((interest) =>
                        <button key={interest.id} className='interestEvent'>{interest.name}</button>
                    )}
                </div>
            </div>

            {/* Modale détails event */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => { setModalOpen(false) }}
            >
                <div>
                    {selectedEvent && (
                        <div className='elmCardModal'>
                            <div key={selectedEvent.id} id='containerModal'>

                                <div id='mdlSection1'>

                                    <img src={interestImages[selectedEvent.interests[0]?.name]} alt='photo evenement' />
                                    <h3>{selectedEvent.name}</h3>
                                    <p>Début: {format(selectedEvent.start_date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                                    <p>Fin: {format(selectedEvent.end_date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                                    <p>{selectedEvent.city} ({selectedEvent.zip_code})</p>
                                    <p>{selectedEvent.address}</p>
                                    <p>Organisateur: {selectedEvent.creator?.firstname} {selectedEvent.creator?.lastname}</p>
                                    <p>{selectedEvent.description}</p>
                                    {selectedEvent.interests?.map((interest) => <button key={interest.id} className='interestEvent'>{interest.name}</button>)}

                                    <div className='btnEventOptions'>
                                        {currentUser?.id === selectedEvent.creator_id ? (
                                            <>
                                                <button onClick={() => openEditModal(event.id)} className='btnUpdate'>Modifier</button>
                                                <button className='btnDelete' onClick={handleDelete}>Supprimer</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className='btnSubscribe' onClick={subscribeToEvent}> S'inscrire</button>
                                                <button className='btnUnsubscribe' onClick={unsubscribeFromEvent}>Se désinscrire</button>
                                            </>
                                        )}
                                    </div>

                                </div>

                                <div id='mdlSection2'>
                                    <h3>Liste des participants</h3>
                                    {selectedEvent.users?.map(user => (
                                        <div key={user.id}>
                                            <p>{user.firstname} {user.lastname}</p>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </Modal>

            {/* Modale édition d'évènement */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
            >
                <div id="editEventModal">
                    <h2>Modifier l'évènement</h2>

                    <form onSubmit={handleSubmitEditEvent} className="editEventForm">
                        <label htmlFor="name">Nom de l'évènement</label>
                        <input
                            type="text"
                            name="name"
                            value={formDataEditEvent.name}
                            onChange={handleChangeEditEvent}
                            required
                        />

                        <label htmlFor="start_date">Date de début</label>
                        <input
                            type="datetime-local"
                            name="start_date"
                            value={formDataEditEvent.start_date.slice(0, 16)}
                            onChange={handleChangeEditEvent}
                            required
                        />

                        <label htmlFor="end_date">Date de fin</label>
                        <input
                            type="datetime-local"
                            name="end_date"
                            value={formDataEditEvent.end_date.slice(0, 16)}
                            onChange={handleChangeEditEvent}
                            required
                        />

                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            value={formDataEditEvent.description}
                            onChange={handleChangeEditEvent}
                            required
                        />

                        <label htmlFor="address">Adresse</label>
                        <input
                            type="text"
                            name="address"
                            value={formDataEditEvent.address}
                            onChange={handleChangeEditEvent}
                            required
                        />

                        <div className="eventDetails">
                            <div>
                                <label htmlFor="zip_code">Code postal</label>
                                <input
                                    type="text"
                                    name="zip_code"
                                    value={formDataEditEvent.zip_code}
                                    onChange={handleChangeEditEvent}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="city">Ville</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formDataEditEvent.city}
                                    onChange={handleChangeEditEvent}
                                    required
                                />
                            </div>
                        </div>

                        {/* Tu peux ajouter ici un <select> pour modifier l’intérêt si besoin */}

                        {error && <p className="error">{error}</p>}

                        <button type="submit" disabled={loading}>
                            {loading ? 'Modification...' : 'Modifier'}
                        </button>
                    </form>
                </div>
            </Modal>


        </div>
    )
};
