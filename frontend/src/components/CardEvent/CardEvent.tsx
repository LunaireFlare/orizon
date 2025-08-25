import { useState } from 'react';
import Modal from './Modal';
import './CardEvent.scss';

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
    creator_id: string,
    interest_id: string[]
}

type User = {
    id: number,
    firstname: string,
    lastname: string
}

const mockEvent = [
    {
        id: 1,
        photo: "https://cdn.pixabay.com/photo/2022/10/23/19/38/womens-football-7541990_1280.jpg",
        name: "Tournoi de football",
        start_date: "17 juin 2025 à 14h00",
        end_date: "17 juin 2025 à 17h00",
        address: "4 rue de la paix",
        city: "Paris",
        zip_code: 75000,
        description: "Un grand tournoi de football local avec service boisson et snack.",
        creator_id: "Vincent FLAVI",
        interest_id: ["Sport"]
    },
    {
        id: 2,
        photo: "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg",
        name: "Atelier cuisine",
        start_date: "25 juin 2025 à 9h00",
        end_date: "25 juin 2025 à 11h30",
        address: "50 route de la reine",
        city: "Boulogne-Billancourt",
        zip_code: 92100,
        description: "Apprenez à faire des pâtes fraîches, et les secrets de la cuisine italienne.",
        creator_id: "Elodie VINCENT",
        interest_id: ["Cuisine", "Musique"]
    },
    {
        id: 3,
        photo: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg",
        name: "Concert jazz",
        start_date: "28 juin 2025 à 19h30",
        end_date: "28 juin 2025 à 22h30",
        address: "10 rue du général de Gaulle",
        city: "Saint-Denis",
        zip_code: 93200,
        description: "Concert de jazz en plein air avec des artistes comme Christine and the Queen, et plein d'autres encore...",
        creator_id: "Julien VIDAL",
        interest_id: ["Musique"]
    }
];

const mockUser = [
    {
        id: 1,
        firstname: "Julie",
        lastname: "ANTOINE"
    },
    {
        id: 2,
        firstname: "Jean",
        lastname: "ETIENNE"
    },
    {
        id: 3,
        firstname: "Franck",
        lastname: "VICTOIRE"
    }
];

export default function CardEvent() {
    const [events] = useState<Event[]>(mockEvent);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<Event | null>(null);
    const [users] = useState<User[]>(mockUser);

    return (
        <div id="containerCard">
            {events.map(event => (
                <div className="elmCard" key={event.id}>
                    <div>
                        <a onClick={() => { setSelectedCard(event); setModalOpen(true); }}>
                            <img src={event.photo} alt="photo évènement" />
                        </a>
                        <a onClick={() => { setSelectedCard(event); setModalOpen(true); }}>
                            <h3>{event.name}</h3>
                        </a>
                        <p>{event.start_date} au {event.end_date}</p>
                        <p><span>{event.city} ({event.zip_code})</span></p>
                        <p className='eventDescription'>{event.description}</p>

                        {event.interest_id.map((interest, index) => (
                            <button key={index} className="interestEvent">
                                {interest}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

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
