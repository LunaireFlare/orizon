import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import logo from '../../assets/images/Logo_Orizon.webp';
import pictonav from '../../assets/images/navburger.webp';

import './Rooftop.scss';

export default function Rooftop() {

    const [ bgrOpen, setBgrOpen ] = useState(false);
    const [currentUser, setCurrentUser] = useState<{ id: number } | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUser({ id: payload.id });
        }
    }, [token]);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <div>

            {!token && (
                <>
                    <div id='navMobile'>
                        <NavLink to='/'>
                            <img src={logo} alt='logo orizon' />
                        </NavLink>
                        <div className='navButton' onClick={() => setBgrOpen(!bgrOpen)}>
                            <img width='20px' src={pictonav} alt='navigation' />
                        </div>
                    </div>

                    {bgrOpen && (
                        <div className="mobileMenu">
                            <NavLink to='/inscription' onClick={() => setBgrOpen(false)}>S'inscrire</NavLink>
                            <NavLink to='/connexion' onClick={() => setBgrOpen(false)}>Connexion</NavLink>
                        </div>
                    )}

                    <div id='elemRoof'>
                        <NavLink to='/'>
                            <img src={logo} style={{ width: '15rem' }} alt='logo orizon' />
                        </NavLink>
        
                        <div className='buttonBox'>
                            <div className='buttonHover'><NavLink to='/inscription'>S'inscrire</NavLink></div>
                            <div className='buttonHover2'><NavLink to='/connexion'>Connexion</NavLink></div>
                        </div>
                    </div>
                </>
            )};

            {token && (
                <>
                    <div>
                        <div id='navMobile'>
                            <NavLink to='/'>
                                <img src={logo} alt='logo orizon' />
                            </NavLink>
                            <div className='navButton' onClick={() => setBgrOpen(!bgrOpen)}>
                                <img width='20px' src={pictonav} alt='navigation' />
                            </div>
                        </div>

                        {bgrOpen && (
                            <div className="mobileMenu">
                                <NavLink to='/evenements' onClick={() => setBgrOpen(false)}>Événements</NavLink>
                                <NavLink to='/communaute' onClick={() => setBgrOpen(false)}>Communauté</NavLink>
                                <NavLink to='/profil' onClick={() => setBgrOpen(false)}>Profil</NavLink>
                                <NavLink to='/conversations' onClick={() => setBgrOpen(false)}>Messagerie</NavLink>
                                <NavLink to='/' onClick={() => setBgrOpen(false)}>Déconnexion</NavLink>
                            </div>
                        )
                        }

                        <div id='elemRoof'>
                            <NavLink to='/'>
                                <img src={logo} style={{ width: '15rem' }} alt='logo orizon' />
                            </NavLink>

                            <div className='buttonBox'>
                                <div className='buttonHover'><NavLink to='/evenements'>Événements</NavLink></div>
                                <div className='buttonHover'><NavLink to='/communaute'>Communauté</NavLink></div>
                                <div className='buttonHover'><NavLink to={`/profil/${currentUser?.id}`}>Profil</NavLink></div>
                                <div className='buttonHover'><NavLink to='/conversations'>Messagerie</NavLink></div>
                                <div className='buttonHover3' onClick={handleLogout}><NavLink to='/'>Déconnexion</NavLink></div>
                            </div>
                        </div>
                    </div>
            
                </>
            )};
        
        </div>
    );
};