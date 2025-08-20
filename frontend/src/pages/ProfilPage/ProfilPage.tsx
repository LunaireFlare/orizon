import { useState } from 'react';
import Rooftop from '../../components/Rooftop/Rooftop.tsx'
import Banner from '../../components/Banner/Banner.tsx'
import Footer from '../../components/Footer/Footer.tsx';
import CardEvent from '../../components/CardEvent/CardEvent.tsx';

import './ProfilPage.scss';


type User = {
    id: number,
    name: string,
    zip_code: number,
    date_of_birth: number,
    city: string,
    description: string
}

type Interest = {
    id: number,
    name: string
}


const mockUser = {
    id: 1,
    name: "Nadine FEU",
    city: "Paris",
    date_of_birth: 62,
    zip_code: 75000,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
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
        <div id="fullContainerProfil">
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

                        {/* Pour fiche profil autre utilisateur */}
                         {/* <button className="buttonOnWhite">Contacter</button> */}
                    </div>

                    {/* Infos user */}
                    <div className="contentInfo">
                        <div>
                            {user && (
                                <div key={user.id}>
                                <h3>{user.name}</h3>
                                <p>{user.date_of_birth} ans</p>
                                <div>{user.city} ({user.zip_code})</div>
                                <p className="bioDescription">Bio: {user.description}</p>
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
            <div id="eventCreate">
                <h2>Les évènements créés par moi</h2>
                <CardEvent />  
            </div>

            <div id="eventParticped">
                <h2>Les évènements auxquels je participe</h2>
                <CardEvent />  
            </div>

            <div id="ctnParticped">
                <h2>Les évènements auxquels je participe</h2>
                <CardEvent />  
            </div>



            <Footer />
        </div>
    )
}