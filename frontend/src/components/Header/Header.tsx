import { NavLink } from 'react-router';

import Seniorblue from '../../assets/images/Orizon1.png';
import Seniorgreen from '../../assets/images/Orizon2.png';
import Senioryellow from '../../assets/images/Orizon3.png';

import './Header.scss';

export default function Header() {
    return (
        <div id='containerHead'>
            <div className='one'>
                <h1 className='title'>Restez connectés, engagés et inspirés — à tout âge !</h1>
                <p className='description'>Rejoignez la communauté des retraités actifs : échangez en toute simplicité, participez à des événements près de chez vous, et partagez vos passions dans un espace convivial, sécurisé et modéré.</p>
                <button className='buttonOnWhite'><NavLink to='/register' className='link'>Inscription</NavLink></button>
            </div>
            <div className='two'>
                <img src={Seniorblue} alt='photo senior 1' />
            </div>
            <div className='three'>
                <img src={Seniorgreen} alt='photo senior 2' />
                <img src={Senioryellow} alt='photo senior 3' />
            </div>
        </div>
    );
}