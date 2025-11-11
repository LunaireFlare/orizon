import { useState } from 'react';
import Modal from '../../components/Modal/Modal.tsx';
import type { Event, Interest, User } from '../../types/index';
import { fetchApi } from '../../utils/api.js';

import './CreateEventModal.scss';


interface createEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    interests: Interest[];
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    setActiveModal: React.Dispatch<React.SetStateAction<string | null>>
}

export default function CreateEventModal({
    isOpen,
    onClose,
    interests,
    user,
    setUser,
    setActiveModal
}: createEventModalProps) {

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedInterestEvent, setSelectedInterestEvent] = useState<number>();

    const token = localStorage.getItem("token");

    const [formDataEvent, setFormDataEvent] = useState<Partial<Event>>({
        name: "",
        start_date: "",
        end_date: "",
        description: "",
        address: "",
        zip_code: "",
        city: "",
        interests: []
    });

    const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!formDataEvent) return;
        setFormDataEvent({ ...formDataEvent, [e.target.name]: e.target.value });
    };

    const handleSubmitNewEvent = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formDataEvent) return;
        setError(null);
        setLoading(true);
        try {
            if (!token) throw new Error("Utilisateur non authentifié");

            const data = await fetchApi(`events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formDataEvent, creator_id: user.id, interest_id: selectedInterestEvent, photo: undefined, interests: undefined, creator: undefined }),
            });

            if (!data) {
                setError(data.error || "Erreur lors de la modification.");
            } 

            const addedInterest = interests.find(i => i.id === selectedInterestEvent);
            const eventWithInterest = addedInterest ? { ...data, interests: [addedInterest] } : data;
            if (data.creator_id === user?.id) {
                setUser(prevUser => prevUser ? {
                    ...prevUser,
                    events: [...prevUser.events, eventWithInterest]
                } : prevUser);
            }
            setSuccess(true);
            setActiveModal(null);
            setFormDataEvent({
                name: "",
                start_date: "",
                end_date: "",
                description: "",
                address: "",
                zip_code: "",
                city: "",
                interests: []
            });
        } catch (err) {
            console.error("Erreur lors de la création de l'évènement :", err);
            setError('Erreur réseau ou serveur.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2>Créer un évènement</h2>
                <p>Tous les champs doivent obligatoirement être remplis.</p>

                <form className='eventForm' onSubmit={handleSubmitNewEvent}>

                    <label htmlFor="name">Nom de l'évènement</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Cours de cuisine, exposition au musée..."
                        onChange={handleChangeEvent}
                        required
                        autoFocus
                    />

                    <label htmlFor="interest">Centre d’intérêt</label>
                    <select
                        id="interest"
                        name="interest"
                        value={selectedInterestEvent}
                        onChange={(e) => { setSelectedInterestEvent(Number(e.target.value)); handleChangeEvent(e) }}
                        required
                    >
                        <option value="">-- Choisissez un centre d'intérêt --</option>
                        {interests?.map((interest) => (
                            <option key={interest.id} value={interest.id}>{interest.name}</option>
                        ))}
                    </select>

                    <label htmlFor="start_date">Date et heure de début de l'évènement</label>
                    <input
                        type="datetime-local"
                        id="start_date"
                        name="start_date"
                        onChange={handleChangeEvent}
                        required
                    />

                    <label htmlFor="end_date">Date et heure de fin de l'évènement</label>
                    <input
                        type="datetime-local"
                        id="end_date"
                        name="end_date"
                        onChange={handleChangeEvent}
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"                        
                        name="description"
                        placeholder="Décrivez votre évènement en quelques lignes !"
                        onChange={handleChangeEvent}
                        required
                    />

                    <label htmlFor="address">Adresse</label>
                    <input
                        type="text"
                        id="address"                        
                        name="address"
                        placeholder="75 rue Honoré de Balzac"
                        onChange={handleChangeEvent}
                        required
                    />

                    <div className="eventDetails">
                        <label htmlFor="city">Ville</label>
                        <input
                            type="text"
                            id="city"                            
                            name="city"
                            placeholder="Paris"
                            onChange={handleChangeEvent}
                            required
                        />

                        <label htmlFor="zip_code">Code postal</label>
                        <input
                            type="text"
                            id="zip_code"
                            name="zip_code"
                            placeholder="75000"
                            onChange={handleChangeEvent}
                            required
                        />
                    </div>

                    <input type="submit" value="Valider" className="" />
                </form>
            </div>
        </Modal>

    )
}