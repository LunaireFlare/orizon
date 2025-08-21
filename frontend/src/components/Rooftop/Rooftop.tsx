import { NavLink } from 'react-router';
import logo from '../../assets/images/Logo_Orizon.png';
import pictonav from '../../assets/images/navburger.png';

import './Rooftop.scss';

export default function Rooftop() {
    return (
        <div>
            <div id="navMobile">
                <NavLink to="/"> {/* ✅ Redirection via logo mobile */}
                    <img src={logo} alt="logo orizon" />
                </NavLink>
                <div className="navButton">
                    <img width="20px" src={pictonav} alt="navigation" />
                </div>
            </div>

            <div id="elemRoof">
                <NavLink to="/"> {/*  Redirection via logo desktop */}
                    <img src={logo} style={{ width: "15rem" }} alt="logo orizon" />
                </NavLink>

                <div className="buttonBox">
                    <div className="buttonHover"><NavLink to="/register">S'inscrire</NavLink></div>
                    <div className="buttonHover2"><NavLink to="/login">Connexion</NavLink></div>
                </div>
            </div>
        </div>
    );
};
