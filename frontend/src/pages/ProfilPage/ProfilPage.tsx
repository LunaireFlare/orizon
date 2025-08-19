import { useState } from 'react';
import Rooftop from '../../components/Rooftop/Rooftop.tsx'
import Banner from '../../components/Banner/Banner.tsx'
import Footer from '../../components/Footer/Footer.tsx';

import './ProfilPage.scss';


type User = {
    id: number,
    name: string,
    zip_code: number,
    city: string
}

type Interest = {
    id: number,
    name: string
}


const mockUser = {
    id: 1,
    name: "Nadine",
    city: "Paris",
    zip_code: 75000
};

const mockInterests: Interest[] = [
    { id: 1, name: "cuisine" },
    { id: 2, name: "sport" },
    { id: 3, name: "cinema" }
  ];


export default function ProfilPage() {

    const [user] = useState<User>(mockUser);
    const [interests] = useState<Interest[]>(mockInterests);

    return (
        <div>
            <Rooftop />
            <Banner />

            <div  id="containerProfil">
                <div className="widthProfil">
                    <div className="headProfil">
                        <div>
                            <h2>Mon profil</h2>
                        </div>
                        <div>
                            <button className="pathButton">Modifier</button>
                            <button className="delButton">Supprimer</button>
                        </div>
                    </div>
                    <div className="bodyProfil">
                    <div>
                        <img src="../../src/assets/images/avatarWomen.webp" width="120px" alt="photo de profil" />
                    </div>

                    {/* Infos user */}
                    <div className="contentInfo">
                        <div>
                            {user && (
                                <div key={user.id}>
                                <h3>{user.name}</h3>
                                <div>{user.city} ({user.zip_code})</div>
                                </div>
                            )}
                        </div>
                        <div className="contentInterest">
                            {/* Infos Interets */}
                                {interests.map((interest) => (
                                <div key={interest.id}>
                                <button className="intButton">{interest.name}</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}