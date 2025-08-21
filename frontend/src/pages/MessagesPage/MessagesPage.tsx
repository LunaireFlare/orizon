import Rooftop from '../../components/Rooftop/Rooftop.tsx'
import Banner from '../../components/Banner/Banner.tsx'
import Footer from '../../components/Footer/Footer.tsx';

import './MessagesPage.scss';


export default function MessagePage() {

    return (
        <div id="fullContainerMessages">
            <Rooftop />
            <Banner />
            <div id="containerConversation">
                <h2>Votre Conversation</h2>
                <div className="bodyConversation">
                    <div id="headMessages">
                        <img src="../../src/assets/images/profil-blandinegallet.webp" width="50px" alt="photo de profil"></img>
                        <h3>Nadine8905680 feuuuuuuuuuuuuu</h3>
                    </div>
                    <div id="containerMessages">
                        <div className="leftMessages">
                            <img src="../../src/assets/images/profil-blandinegallet.webp" width="50px" alt="photo de profil"></img>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="rightMessages">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <img src="../../src/assets/images/profil-guillaumegentil.webp" width="50px" alt="photo de profil"></img>
                        </div>
                    </div>
                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Entrer votre message"
                        required
                    />
                        
                    <button type="submit" className='sendMessage'>Envoyer</button>
                </div>
            </div>
            <Footer />
        </div>
    )

}