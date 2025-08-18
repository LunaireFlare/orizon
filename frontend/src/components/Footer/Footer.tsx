import { Link } from 'react-router';
import logo from '../../assets/images/Logo_OrizonBlanc.png';

import './Footer.scss';

export default function Footer() {
    return (
        <div id="footer">
            <div className="containerFooter">
                <div>
                    <Link to="/">Lorem Ipsum is simply dummy</Link>
                    <Link to="/">Lorem Ipsum is simply dummy</Link>
                    <Link to="/">Lorem Ipsum is simply dummy</Link>
                    <Link to="/">Lorem Ipsum is simply dummy</Link>
                </div>
                <div>
                    <Link to="/">Lorem Ipsum is simply dummy</Link>
                    <Link to="/">Lorem Ipsum is simply dummy</Link>
                    <Link to="/">Lorem Ipsum is simply dummy</Link>
                    <Link to="/">Lorem Ipsum is simply dummy</Link>
                </div>
                <div>
                    <img width="350px" src={logo} alt="logo-orizon" />
                </div>
            </div>
                <p>leap into electronic typesetting, remaining essentially</p>
        </div>
    )
}