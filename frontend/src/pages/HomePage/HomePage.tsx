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
                    <h2>Lorem Ipsum is simply</h2>

                      <div className="blcFigure">
                        <div className="elemFigure">
                            {/* <img width="150px" src="../src/assets/communauteactive.png" alt="picto-communauté-active" /> */}
                            <h4>COMMUNAUTE ACTIVE</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                        </div>

                        <div className="elemFigure">
                            {/* <img width="150px" src="../src/assets/reseauxsecurise.png" alt="picto-communauté-active" /> */}
                            <h4>RESEAU SECURISE</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                        </div>

                        <div className="elemFigure">
                            {/* <img width="150px" src="../src/assets/messagerieprive.png" alt="picto-communauté-active" /> */}
                            <h4>MESSAGERIE PRIVEE</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                        </div>

                        <div className="elemFigure">
                            {/* <img width="150px" src="../src/assets/evenement.png" alt="picto-communauté-active" /> */}
                            <h4>EVENEMENTS</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                        </div>
                      </div>
                </div>

                <div id="about">
                    <div className="containerAboutOne">
                        <div>
                            <h2>Lorem Ipsum is simply</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                                has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                                took a galley of type and scrambled it to make a type specimen book. It has survived not 
                                only five centuries, but also the leap into electronic typesetting, remaining essentially 
                                unchanged.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                                has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                                took a galley of type and scrambled it to make a type specimen book. It has survived not 
                                only five centuries, but also the leap into electronic typesetting, remaining essentially 
                                unchanged.
                            </p>
                        </div>
                        <div>
                            {/* <img src="../src/assets/retraiteorizon.png" alt="picto-communauté-active" /> */}
                        </div>
                    </div>
                    <div className="containerAboutTwo">
                        <div>
                            {/* <img src="../src/assets/rencontreorizon.png" alt="picto-communauté-active" /> */}
                        </div>
                    
                        <div>
                            <h2>Lorem Ipsum is simply</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                                has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                                took a galley of type and scrambled it to make a type specimen book. It has survived not 
                                only five centuries, but also the leap into electronic typesetting, remaining essentially 
                                unchanged.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                                has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                                took a galley of type and scrambled it to make a type specimen book. It has survived not 
                                only five centuries, but also the leap into electronic typesetting, remaining essentially 
                                unchanged.
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