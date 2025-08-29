import { useState, useEffect } from 'react';
import Modal from './Modal.tsx';
import type { Event } from '../../types/index.d.ts';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import './CardEvent.scss';

const interestImages: Record<string, string> = {
    'Sport': 'https://cdn.pixabay.com/photo/2022/10/23/19/38/womens-football-7541990_1280.jpg',
    'Musique': 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg',
    'Voyage':'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg',
    'Cuisine': 'https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg',
    'Photographie': 'https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg',
    'Jeux de société': 'https://images.pexels.com/photos/277124/pexels-photo-277124.jpeg',
    'Randonnée': 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
    'Lecture': 'https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg'
};

interface CardEventProps {
    event: Event;
    onDelete?: (id: number) => void;
    onSubscribe?: (id: number) => void;
    onUnsubscribe?: (id: number) => void;
};

export default function CardEvent({ event, onDelete, onSubscribe, onUnsubscribe }: CardEventProps) {

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const [_loading, setLoading] = useState(false);
    const [_error, setError] = useState<string | null>(null);

    const [currentUser, setCurrentUser] = useState<{ id: number } | null>(null);
    const [info, setInfo] = useState<string | null>(null);

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

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
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

            onDelete?.(event.id);

            setSelectedEvent(null);
            setModalOpen(false);

        } catch (error) {
            setError('Erreur lors du chargement des données.');
        }
    };

    async function subscribeToEvent() {
        if (!token) {
            alert('Vous devez être connecté');
            return;
        };

        if (selectedEvent?.users.some(user => user.id === currentUser?.id)) {
            setInfo("Vous êtes déjà inscrit(e) à cet évènement.");
            setTimeout(() => setInfo(null), 3000);
            return;
        };

        setLoading(true);
        setError(null);

        try {
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

            if (!selectedEvent) return;
            const resWithNewParticipant = await fetch(`http://backend.localhost:81/events/${selectedEvent.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const updatedEvent = await resWithNewParticipant.json();

            setSelectedEvent(updatedEvent);

            onSubscribe?.(event.id);

            setInfo('Vous êtes bien inscrit à l\'évènement.');

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
                setInfo('Vous n\'êtes pas inscrit(e) à cet évènement.');
                setTimeout(() => setInfo(null), 3000);
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

            setSelectedEvent(prev =>
                prev
                    ? {
                        ...prev,
                        users: prev.users.filter(u => u.id !== currentUser?.id)
                    }
                    : prev
            );

            onUnsubscribe?.(event.id);
            setInfo('Vous êtes bien désinscrit de l\'évènement.');

        } catch (error) {
            setError('Erreur lors du chargement des données.');
        } finally {
            setLoading(false);
        };
    }

    return (
        <div id='containerCard'>

            <div className='elmCard'>
                <div key={event.id}>
                    <a onClick={() => { setModalOpen(true) }}>
                        <img src={interestImages[event.interests[0]?.name]} alt="photo de l'évènement"/>
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

            <Modal
                isOpen={isModalOpen}
                onClose={() => { setModalOpen(false) }}
            >
                <div>
                    {selectedEvent && (
                        <div className='elmCardModal'>
                            <div key={selectedEvent.id} id='containerModal'>

                                <div id='mdlSection1'>

                                    <img src={interestImages[event.interests[0]?.name]} alt='photo evenement' />
                                    <h3>{selectedEvent.name}</h3>
                                    <p>Début: {format(selectedEvent.start_date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                                    <p>Fin: {format(selectedEvent.end_date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                                    <p>{selectedEvent.city} ({selectedEvent.zip_code})</p>
                                    <p>{selectedEvent.address}</p>
                                    <p>Organisateur: {selectedEvent.creator?.firstname} {selectedEvent.creator?.lastname}</p>
                                    <p>{selectedEvent.description}</p>
                                    {selectedEvent.interests?.map((interest) => <button key={interest.id} className='interestEvent'>{interest.name}</button>)}
                                    {info && <p className="infoMessage">{info}</p>}

                                    <div className='btnEventOptions'>
                                        {currentUser?.id === selectedEvent.creator_id ? (
                                            <>
                                                <button className='btnUpdate'>Modifier</button>
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
        </div>
    )
};