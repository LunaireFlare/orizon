import Rooftop from '../../components/Rooftop/Rooftop.tsx';
import Header from '../../components/Header/Header.tsx';
import Testimonial from '../../components/Testimonial/Testimonial.tsx';
import Footer from '../../components/Footer/Footer.tsx';

import './HomePage.scss';

export default function HomePage() {
    return (
        <>
            <Rooftop />
            <Header />

            <div id="container-content">
                <div className="keyFigure">
                    <h2>Le réseau social pensé <span>pour les retraités</span></h2>

                    <div className="blcFigure">
                        <div className="elemFigure">
                            <img width="150px" src="../../src/assets/images/communauteactive.webp" alt="picto-communauté-active" />
                            <h4>COMMUNAUTÉ ACTIVE</h4>
                            <p>Rejoignez un espace bienveillant où entraide, bonne humeur et échanges authentiques sont au cœur de chaque interaction.</p>
                        </div>

                        <div className="elemFigure">
                            <img width="150px" src="../../src/assets/images/reseauxsecurise.webp" alt="picto-communauté-active" />
                            <h4>RÉSEAU SÉCURISÉ</h4>
                            <p>Profitez d’un environnement sécurisé : chaque inscription est validée par nos modérateurs pour garantir un espace respectueux et de confiance.</p>
                        </div>

                        <div className="elemFigure">
                            <img width="150px" src="../../src/assets/images/messagerieprive.webp" alt="picto-communauté-active" />
                            <h4>MESSAGERIE PRIVÉE</h4>
                            <p>Discutez avec vos amis ou faites de nouvelles connaissances grâce à notre système de messagerie simple et sécurisé.</p>
                        </div>

                        <div className="elemFigure">
                            <img width="150px" src="../../src/assets/images/evenement.webp" alt="picto-communauté-active" />
                            <h4>ÉVÉNEMENTS LOCAUX</h4>
                            <p>Trouvez et organisez des événements : randonnées, ateliers, sorties culturelles… Il se passe toujours quelque chose près de chez vous !</p>
                        </div>
                    </div>
                </div>

                <div id="about">
                    <div className="containerAboutOne">
                        <div>
                            <h2>Une communauté active, bienveillante et sécurisée</h2>
                            <p>Rejoignez un espace pensé pour favoriser les échanges authentiques entre retraités actifs, dans une ambiance conviviale et respectueuse.
                                Créez votre profil et choisissez vos centres d’intérêt pour trouver facilement des événements qui vous ressemblent.
                                Discutez en toute simplicité grâce à notre messagerie privée : un outil intuitif pour rester en contact, échanger des idées ou faire connaissance en toute tranquillité.
                                Chaque nouveau membre est validé par notre équipe pour garantir un environnement sûr. Ici, chacun trouve sa place, à son rythme, dans un environnement sûr et accueillant. Rejoignez-nous, et redonnez tout son sens au mot "lien social".
                            </p>
                        </div>
                        <div>
                            <img src="../../src/assets/images/retraiteorizon.webp" alt="picto-communauté-active" />
                        </div>
                    </div>
                    <div className="containerAboutTwo">
                        <div>
                            <img src="../../src/assets/images/rencontreorizon.webp" alt="picto-communauté-active" />
                        </div>

                        <div>
                            <h2>Événements locaux : créez, découvrez, participez !</h2>
                            <p>Vous cherchez des sorties intéressantes, près de chez vous, avec des gens qui partagent vos passions ? Grâce à notre système d’événements locaux, explorez facilement les activités proposées par la communauté : randonnées, ateliers créatifs, conférences, jeux, repas partagés, et bien plus encore.
                                Chaque membre peut aussi créer ses propres événements en quelques clics et inviter d'autres utilisateurs à y participer.
                                Que vous soyez plutôt actif ou contemplatif, vous trouverez toujours une activité adaptée à vos envies.
                                C’est le moyen idéal pour rencontrer de nouvelles personnes et vivre de belles expériences dans la vraie vie, en toute simplicité.
                            </p>
                        </div>
                    </div>
                </div>

                <Testimonial />
                <Footer />


            </div>
        </>
    );
}