import {useState, useEffect } from 'react';
import Modal from './Modal';
import './CardEvent.scss';
import { format  } from 'date-fns';
import { fr } from "date-fns/locale";

const interestImages: Record<string, string> = {
    Sport: "https://cdn.pixabay.com/photo/2022/10/23/19/38/womens-football-7541990_1280.jpg",
    Cuisine: "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg",
    Musique: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg",
    Voyage:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"
};

import type { Event } from '../../types/index.d.ts';

interface CardEventProps {
    event: Event;
};

export default function CardEvent({ event }: CardEventProps) {

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<Event | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchEvent() {

            setLoading(true);
            setError(null);

            try {                
                const res = await fetch(`http://backend.localhost:81/events/${event.id}`, {
                    headers: {
                    "Authorization": `Bearer ${token}`
                    },
                });
                if (!res.ok) {
                    throw new Error('Erreur lors du chargement des données.')
                };

                const eventSelected = await res.json();

                setSelectedCard(eventSelected);
            } catch (error) {
                setError('Erreur lors du chargement des données.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [token, event.id])

    return (
        <div id="containerCard">
                    <div className="elmCard">
                        <div key={event.id}>
                            <a onClick={() => { setModalOpen(true) }}><img src={interestImages[event.interests[0]?.name]} /></a>
                            <a onClick={() => { setModalOpen(true) }}><h3>{event.name}</h3></a>
                            <p>Début: {format(event.start_date,"d MMMM yyyy 'à' HH'h'mm", { locale: fr })} </p>
                            <p>Fin: {format(event.end_date,"d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                            <p><span>{event.city} ({event.zip_code})</span></p>
                            <p className='eventDescription'>{event.description}</p>
                            {event.interests.map((interest)=> <button key={interest.id} className="interestEvent">{interest.name}</button>)}
                        </div>
                    </div>
                <Modal                     
                    isOpen={isModalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedCard(null);
                        }}
                    >
                        <div>
                            {selectedCard && (
                                <div className="elmCardModal">
                                    <div key={selectedCard.id} 
                                         id="containerModal">
                                        <div id="mdlSection1">
                                            <img src={interestImages[event.interests[0].name]} alt="photo evenement" />
                                            <h3>{selectedCard.name}</h3>
                                            <p>Début: {format(selectedCard.start_date,"d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                                            <p>Fin: {format(selectedCard.end_date,"d MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                                            <p>{selectedCard.city} ({selectedCard.zip_code})</p>
                                            <p>{selectedCard.address}</p>
                                            <p>Organisateur: {selectedCard.creator?.firstname} {selectedCard.creator?.lastname}</p>
                                            <p>{selectedCard.description}</p>
                                            {selectedCard.interests && selectedCard.interests.map((interest)=><button className="interestEvent">{interest.name}</button>)}
                                            <div className="btnChoiseParticiped">
                                                <button className="btnParticiped"> Participer</button>
                                                <button className="btnDeclinePcp">Ne participe plus</button>
                                            </div>
                                            
                                            {/* bouton pour le createur d'evenement
                                            <div className="btnChoisePathDel">
                                                <button className="btnPahtParticiped"> participer</button>
                                                <button className="btnDelParticiped">Ne participe plus</button>
                                            </div> */}

                                        </div>
                                        <div id="mdlSection2">
                                            <h3>Liste des participants</h3>
                                            {selectedCard.users?.map(user => (
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
}