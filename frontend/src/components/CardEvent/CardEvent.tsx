import { useState } from 'react';
import Modal from './Modal';
import './CardEvent.scss';
import { format  } from 'date-fns';
import { fr } from "date-fns/locale";

const interestImages: Record<string, string> = {
    Sport: "https://cdn.pixabay.com/photo/2022/10/23/19/38/womens-football-7541990_1280.jpg",
    Cuisine: "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg",
    Musique: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"
};

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

type User = {
    id: number,
    firstname: string,
    lastname: string
}


interface CardEventProps {
    event: Event;
}

export default function CardEvent({ event }: CardEventProps) {

    // const [events] = useState<Event[]>(mockEvent);

    //States ouverture fermeture Modal
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<Event | null>(null);
    const [users] = useState<User[]>(mockUser);

    return (
        <div id="containerCard">
                    <div className="elmCard">
                        <div key={event.id}>
                            <a onClick={() => { setSelectedCard(event); setModalOpen(true);}}><img src={interestImages[event.interests[0].name]} /></a>
                            <a onClick={() => { setSelectedCard(event); setModalOpen(true);}}><h3>{event.name}</h3></a>
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
                                            <p>Organisateur: {selectedCard.creator_id}</p>
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
                            <div key={selectedCard.id} id="containerModal">
                                <div id="mdlSection1">
                                    <img src={selectedCard.photo} alt="photo évènement" />
                                    <h3>{selectedCard.name}</h3>
                                    <p>{selectedCard.start_date} au {selectedCard.end_date}</p>
                                    <p>{selectedCard.city} ({selectedCard.zip_code})</p>
                                    <p>{selectedCard.address}</p>
                                    <p>Organisateur: {selectedCard.creator_id}</p>
                                    <p>{selectedCard.description}</p>

                                    {selectedCard.interest_id.map((interest, index) => (
                                        <button key={index} className="interestEvent">
                                            {interest}
                                        </button>
                                    ))}

                                    <div className="btnChoiseParticiped">
                                        <button className="btnParticiped">Participer</button>
                                        <button className="btnDeclinePcp">Ne participe plus</button>
                                    </div>
                                </div>

                                <div id="mdlSection2">
                                    <h3>Liste des participants</h3>
                                    {users.map(user => (
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
    );
}
