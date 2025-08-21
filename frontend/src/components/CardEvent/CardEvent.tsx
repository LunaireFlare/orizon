import {useState } from 'react';
import './CardEvent.scss';

type Event = {
    id: number,
    photo: string,
    name: string,
    start_date: string,
    end_date: string,
    city: string,
    zip_code: number,
    description: string,
    interest_id: string[]
}

const mockEvent = [
    {
        id: 1,
        photo: "https://cdn.pixabay.com/photo/2022/10/23/19/38/womens-football-7541990_1280.jpg",
        name: "Tournoi de football",
        start_date: "17 juin 2025 à 14h00",
        end_date: "17 juin 2025 à 17h00",
        city: "Paris",
        zip_code: 75000,
        description: "Un grand tournoi de football local avec service boisson et snack.",
        interest_id: ["Sport"]
    },
    {
        id: 1,
        photo: "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg",
        name: "Atelier cuisine",
        start_date: "25 juin 2025 à 9h00",
        end_date: "25 juin 2025 à 11h30",
        city: "Boulogne-Billancourt",
        zip_code: 92100,
        description: "Apprenez à faire des pâtes fraîches, et les secrets de la cuisine italienne.",
        interest_id: ["Cuisine"]
    },
    {
        id: 1,
        photo: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg",
        name: "Concert jazz",
        start_date: "28 juin 2025 à 19h30",
        end_date: "28 juin 2025 à 22h30",
        city: "Saint-Denis",
        zip_code: 93200,
        description: "Concert de jazz en plein air avec des artistes comme Christine and the Queen, et plein d'autres encore...",
        interest_id: ["Musique"]
    }
]

export default function CardEvent() {

    const [events] = useState<Event[]>(mockEvent);

    return (
        <div id="containerCard">
            
                {events.map(event => (
                    <div className="elmCard">
                        <div key={event.id}>
                            <img src={event.photo} alt="photo evenement" />
                            <h3>{event.name}</h3>
                            <p>{event.start_date} au {event.end_date}</p>
                            <p><span>{event.city} ({event.zip_code})</span></p>
                            <p className='eventDescription'>{event.description}</p>
                            <button className="interestEvent">{event.interest_id}</button>
                        </div>
                    </div>
                ))}  
        </div>
    )
}