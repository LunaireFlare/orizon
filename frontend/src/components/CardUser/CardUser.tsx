import {useState } from 'react';
import './CardUser.scss';

type User = {
    id: number,
    photo: string,
    firstname: string,
    lastname: string,
    date_of_birth: number,
    city: string,
    zip_code: number,
    description: string,
    interest_id: string
}

const mockUser = [
    {
        id: 1,
        photo: "../../src/assets/images/avatarWomen.webp",
        firstname: "Nadine",
        lastname: "FEU",
        date_of_birth: 65,
        city: "Paris",
        zip_code: 75000,
        description: "Bonjour, je suis passionné de cuisine",
        interest_id: "Sport"
    },
    {
        id: 1,
        photo: "../../src/assets/images/avatarMen.webp",
        firstname: "Pascal",
        lastname: "OBISPO",
        date_of_birth: 60,
        city: "Vanve",
        zip_code: 75000,
        description: "Bonjour, je suis passionné de musique",
        interest_id: "Sport"
    },
    {
        id: 1,
        photo: "../../src/assets/images/avatarMen.webp",
        firstname: "Killian",
        lastname: "Mbape",
        date_of_birth: 70,
        city: "Bondy",
        zip_code: 93010,
        description: "Bonjour, je suis passionné de foot",
        interest_id: "Sport"
    },

]

export default function CardEvent() {

    const [users] = useState<User[]>(mockUser);

    return (
        <div id="containerCardUser">
            
                {users.map(user => (
                    <div className="elmCardUser">
                        <div key={user.id}>
                            <img src={user.photo} alt="photo de profil" />
                            <h3>{user.firstname} {user.lastname}</h3>
                            <p>{user.date_of_birth} ans</p>
                            <p><strong>{user.city}({user.zip_code})</strong></p>
                            <p>Desciption: {user.description}</p>
                            <button className="interestUser">{user.interest_id}</button>
                        </div>
                    </div>
                ))}  
        </div>
    )
}