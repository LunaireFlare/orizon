import { useState } from 'react';
import './CardUser.scss';

// ✅ Import des images correctement
import avatarWoman from '../../assets/images/avatarWomen.webp';
import avatarMan from '../../assets/images/avatarMen.webp';

// ✅ Type utilisateur
type User = {
    id: number;
    photo: string;
    firstname: string;
    lastname: string;
    date_of_birth: number;
    city: string;
    zip_code: number;
    description: string;
    interest_id: string;
};

// ✅ Mock utilisateurs avec images importées
const mockUser: User[] = [
    {
        id: 1,
        photo: avatarWoman,
        firstname: "Nadine",
        lastname: "FEU",
        date_of_birth: 65,
        city: "Paris",
        zip_code: 75000,
        description: "Bonjour, je suis passionnée de cuisine",
        interest_id: "Cuisine"
    },
    {
        id: 2,
        photo: avatarMan,
        firstname: "Pascal",
        lastname: "OBISPO",
        date_of_birth: 60,
        city: "Vanves",
        zip_code: 75000,
        description: "Bonjour, je suis passionné de musique",
        interest_id: "Musique"
    },
    {
        id: 3,
        photo: avatarMan,
        firstname: "Killian",
        lastname: "Mbappé",
        date_of_birth: 70,
        city: "Bondy",
        zip_code: 93010,
        description: "Bonjour, je suis passionné de foot",
        interest_id: "Sport"
    },
];

export default function CardEvent() {
    const [users] = useState<User[]>(mockUser);

    return (
        <div id="containerCardUser">
            {users.map(user => (
                <div className="elmCardUser" key={user.id}>
                    <img src={user.photo} alt={`photo de ${user.firstname}`} />
                    <h3>{user.firstname} {user.lastname}</h3>
                    <p>{user.date_of_birth} ans</p>
                    <p><strong>{user.city} ({user.zip_code})</strong></p>
                    <p>Description : {user.description}</p>
                    <button className="interestUser">{user.interest_id}</button>
                </div>
            ))}
        </div>
    );
}
