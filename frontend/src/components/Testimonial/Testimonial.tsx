import './Testimonial.scss';

export default function Testimonial() {
    return (
        <div id='testimonials'>
            <h2>Nos membres en parlent mieux que nous...</h2>
            <div className='containerTesti'>
                <div className='profilT'>
                    <img width='200px' src='../../src/assets/images/profil-blandinegallet.png' alt='blandineGallet' />
                    <h4>Blandine GALLET</h4>
                    <p><span>65 ans</span></p>
                    <p>'J’ai retrouvé le plaisir de discuter tous les jours avec des gens qui partagent mes passions.'</p>
                </div>
                <div className='profilT'>
                    <img width='200px' src='../../src/assets/images/profil-gerarddduchar.png' alt='gerarddduchar' />
                    <h4>Gérard DUCHAR</h4>
                    <p><span>71 ans</span></p>
                    <p>'Même à la retraite, on peut faire de belles rencontres et rester actif. Ce site m’a redonné un vrai élan !'</p>
                </div>
                <div className='profilT'>
                    <img width='200px' src='../../src/assets/images/profil-lucettefrot.png' alt='lucettefrot' />
                    <h4>Lucette FROT</h4>
                    <p><span>62 ans</span></p>
                    <p>'Grâce aux événements du site, j’ai enfin osé participer à une sortie près de chez moi… et j’y ai trouvé de vrais amis.'</p>
                </div>
                <div className='profilT'>
                    <img width='200px' src='../../src/assets/images/profil-guillaumegentil.png' alt='guillaumegentil' />
                    <h4>Guillaume GENTIL</h4>
                    <p><span>63 ans</span></p>
                    <p>'Je vis à la campagne et je me sentais isolé... Maintenant, je participe toutes les semaines à des ateliers de groupe.'</p>
                </div>
            </div>
        </div>
    )
}