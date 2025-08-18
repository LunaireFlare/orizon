import { NavLink } from 'react-router';
import logo from '../../assets/images/Logo_Orizon.png';

import './Rooftop.scss';

export default function Rooftop() {
    return (
        <div id="elemRoof">
            <img src={logo} style={{width: "15rem"}} alt="logo orizon"/>

            <div className="buttonBox">
                <div className="buttonHover"><NavLink to="/signup">S'inscrire</NavLink></div>
                <div className="buttonHover2"><NavLink to="/signin">Connexion</NavLink></div>
            </div>
        </div>
    )
};