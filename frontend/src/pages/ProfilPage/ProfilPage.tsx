import { useState } from 'react';
import { Link } from 'react-router';

import RooftopConnected from '../../components/Rooftop/RooftopConnected';
import Banner from '../../components/Banner/Banner.tsx'
import Footer from '../../components/Footer/Footer.tsx';
import CardEvent from '../../components/CardEvent/CardEvent.tsx';
import Modal from '../../components/Modal/Modal.tsx';

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
    // const [ isModalOpen, setModalOpen ] = useState<boolean>(false);

    const [ activeModal, setActiveModal ] = useState<string | null>(null);

    return (
        <div id="fullContainerProfil">
            <RooftopConnected />
            <Banner />

            <div  id="containerProfil">
                <div className="widthProfil">
                    <div className="headProfil">
                        <div>
                            <h2>Mon profil</h2>
                        </div>
                        <div>
                            <button className="pathButton">Modifier mon profil</button>
                            <button className="delButton" onClick={() => setActiveModal('deleteAccount')}>Supprimer mon compte</button>
                        </div>
                    </div>
                    <div className="bodyProfil">
                    <div>
                        <img src="../../src/assets/images/avatarWomen.webp" width="120px" alt="photo de profil" />

                        {/* Pour fiche profil autre utilisateur */}
                         {/* <button className="buttonOnWhite">Contacter</button> */}
                    </div>

                    <div className="contentInfo">
                        <div>
                            {user && (
                                <div key={user.id}>
                                <h3>{user.name}</h3>
                                <p>{user.date_of_birth} ans</p>
                                <div><span>{user.city} ({user.zip_code})</span></div>
                                <p className="bioDescription">{user.description}</p>
                                </div>
                            )}
                        </div>
                        <div className="contentInterest">
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

            <div id="eventsCreated">
                <div className="eventOptions">
                    <h2>Les évènements créés par moi</h2>
                    <button className="pathButton" onClick={() => setActiveModal('createEvent')}>
                        Créer un évènement</button>
                </div>
                <CardEvent />  
            </div>

            <div id="eventsParticiped">
                <div className="eventOptions">
                    <h2>Les évènements auxquels je participe</h2>
                    <button className="pathButton"><Link to="/evenements" className="link">Trouver d'autres évènements</Link></button>
                </div>
                <CardEvent />  
            </div>

            <div id="eventsPassed">
                <h2>Les évènements auxquels j'ai participé</h2>
                <CardEvent />  
            </div>

            <Modal isOpen={activeModal === 'createEvent'} onClose={() => setActiveModal(null)}>
                <div id="containerCreateEvent">
                    <h2>Créer un évènement</h2>

                    <p>Tous les champs doivent obligatoirement être remplis.</p>
                    
                    <form className='eventForm'>
                        <label htmlFor="eventName">Nom de l'évènement</label>
                        <input
                                type="text"
                                name="eventName"
                                placeholder="Cours de cuisine, exposition au musée..."
                                // onChange={handleChange}
                                required
                        />

                        <label htmlFor="eventStartDate">Date et heure de début de l'évènement</label>
                        <input
                            type="datetime-local"
                            name="eventStartDate"
                            // onChange={handleChange}
                            required
                        />

                        <label htmlFor="eventEndDate">Date et heure de fin de l'évènement</label>
                        <input
                            type="datetime-local"
                            name="eventEndDate"
                            // onChange={handleChange}
                            required
                        />

                        <label htmlFor="eventDescription">Description</label>
                        <textarea
                                name="eventDescription"
                                placeholder="Décrivez votre évènement en quelques lignes !"
                                // onChange={handleChange}
                                required
                        />

                        <label htmlFor="eventAddress">Adresse</label>
                        <input
                                type="text"
                                name="eventAddress"
                                placeholder="75 rue Honoré de Balzac"
                                // onChange={handleChange}
                                required
                        />

                        <div className="eventAddressDetails">
                            <label htmlFor="eventCity">Ville</label>
                            <input
                                    type="text"
                                    name="eventCity"
                                    placeholder="Paris"
                                    // onChange={handleChange}
                                    required
                            />

                            <label htmlFor="eventZipCode">Code postal</label>
                            <input
                                    type="text"
                                    name="eventZipCode"
                                    placeholder="75000"
                                    // onChange={handleChange}
                                    required
                            />
                        </div>

                        <input type="submit" value="Valider" className=""></input>
                    </form>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'deleteAccount'} onClose={() => setActiveModal(null)}>
                <div id="containerDeleteAccount">
                    <h2>Supprimer mon compte</h2>
                    <p>Attention ! Vous êtes sur le point de supprimer votre compte. Si vous cliquez sur le bouton "Je confirme", vous n'aurez plus accès au site et vos données personnelles seront effacées. Si vous ne souhaitez pas supprimer votre compte, cliquez sur la croix rouge en haut à droite ou n'importe où en dehors de cet encadré.</p>
                    <p>Êtes-vous sûr(e) de vouloir supprimer votre compte ?</p>

                    <button className="delButton">Je confirme</button>
                </div>
            </Modal>

            <Footer />
        </div>
    )
}