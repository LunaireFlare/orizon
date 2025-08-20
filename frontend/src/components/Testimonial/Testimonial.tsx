import './Testimonial.scss';

export default function Testimonial() {
    return (
        <div id="testimonials">
            <h2>Lorem Ipsum is simply</h2>
            <div className="containerTesti">
                <div>
                    <img width="200px" src="../../src/assets/images/profil-blandinegallet.png" alt="blandineGallet" />
                    <h4>Blandine GALLET</h4>
                    <p>Commercial</p>
                </div>
                <div>
                    <img width="200px" src="../../src/assets/images/profil-gerarddduchar.png" alt="gerarddduchar" />
                    <h4>Blandine GALLET</h4>
                    <p>Commercial</p>
                </div>
                <div>
                    <img width="200px" src="../../src/assets/images/profil-lucettefrot.png" alt="lucettefrot" />
                    <h4>Blandine GALLET</h4>
                    <p>Commercial</p>
                </div>
                <div>
                    <img width="200px" src="../../src/assets/images/profil-guillaumegentil.png" alt="guillaumegentil" />
                    <h4>Blandine GALLET</h4>
                    <p>Commercial</p>
                </div>
            </div>
        </div>
    )
}