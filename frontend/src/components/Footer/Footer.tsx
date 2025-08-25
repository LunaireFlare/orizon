import { Link } from 'react-router';
import logo from '../../assets/images/Logo_OrizonBlanc.png';

import './Footer.scss';

export default function Footer() {
    return (
        <div id="footer">
            <div className="containerFooter">
                <div>
                    <Link to="/">Sitemap</Link>
                    <Link to="/">Mentions lgales</Link>
                    <Link to="/">Politiques de confidentialité</Link>
                    <Link to="/">Cookie</Link>
                </div>
                <div>
                    <h5>Orizon</h5>
                    <p>29 Rue Charcot Paris 75013 - France</p>
                    <p>01 45 84 27 45</p>
                </div>
                <div>
                    <img width="350px" src={logo} alt="logo-orizon" />
                </div>
            </div>
                <p>leap into electronic typesetting, remaining essentially</p>
        </div>
    )
}