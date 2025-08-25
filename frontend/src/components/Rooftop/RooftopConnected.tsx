import { NavLink } from 'react-router';
import logo from '../../assets/images/Logo_Orizon.webp';
import pictonav from '../../assets/images/navburger.webp';

import './Rooftop.scss';

export default function RooftopConnected() {
    return (
        <div>
            <div id='navMobile'>
                <NavLink to='/'>
                    <img src={logo} alt='logo orizon' />
                </NavLink>
                <div className='navButton'>
                    <img width='20px' src={pictonav} alt='navigation' />
                </div>
            </div>

            <div id='elemRoof'>
                <NavLink to='/'>
                    <img src={logo} style={{ width: '15rem' }} alt='logo orizon' />
                </NavLink>

                <div className='buttonBox'>
                    <div className='buttonHover'><NavLink to='/evenements'>Événements</NavLink></div>
                    <div className='buttonHover'><NavLink to='/communaute'>Communauté</NavLink></div>
                    <div className='buttonHover'><NavLink to='/profil'>Profil</NavLink></div>
                    <div className='buttonHover'><NavLink to='/conversations'>Messagerie</NavLink></div>
                    <div className='buttonHover3'><NavLink to='/'>Déconnexion</NavLink></div>
                </div>
            </div>
        </div>
    );
};