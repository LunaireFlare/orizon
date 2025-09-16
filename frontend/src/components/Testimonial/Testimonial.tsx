import './Testimonial.scss';

import imgBlandine from '../../assets/images/profil-blandinegallet.webp';
import imgGerard from '../../assets/images/profil-gerarddduchar.webp';
import imgLucette from '../../assets/images/profil-lucettefrot.webp';
import imgGuillaume from '../../assets/images/profil-guillaumegentil.webp';

export default function Testimonial() {
    return (
        <div id='testimonials'>
            <h2>Nos membres en parlent mieux que nous...</h2>
            <div className='containerTesti'>
                <div className='profilT'>
                    <img width='200px' src={imgBlandine} alt='Blandine Gallet' />
                    <h4>Blandine GALLET</h4>
                    <p><span>65 ans</span></p>
                    <p>"J’ai retrouvé le plaisir de discuter tous les jours avec des gens qui partagent mes passions."</p>
                </div>

                <div className='profilT'>
                    <img width='200px' src={imgGerard} alt='Gérard Duchar' />
                    <h4>Gérard DUCHAR</h4>
                    <p><span>71 ans</span></p>
                    <p>"Même à la retraite, on peut faire de belles rencontres et rester actif. Ce site m’a redonné un vrai élan !"</p>
                </div>

                <div className='profilT'>
                    <img width='200px' src={imgLucette} alt='Lucette Frot' />
                    <h4>Lucette FROT</h4>
                    <p><span>62 ans</span></p>
                    <p>"Grâce aux événements du site, j’ai enfin osé participer à une sortie près de chez moi… et j’y ai trouvé de vrais amis."</p>
                </div>

                <div className='profilT'>
                    <img width='200px' src={imgGuillaume} alt='Guillaume Gentil' />
                    <h4>Guillaume GENTIL</h4>
                    <p><span>63 ans</span></p>
                    <p>"Je vis à la campagne et je me sentais isolé... Maintenant, je participe toutes les semaines à des ateliers de groupe."</p>
                </div>
            </div>
        </div>
    )
}
