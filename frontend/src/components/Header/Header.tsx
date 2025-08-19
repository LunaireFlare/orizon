import Seniorblue from '../../assets/images/Orizon1.png';
import Seniorgreen from '../../assets/images/Orizon2.png';
import Senioryellow from '../../assets/images/Orizon3.png';

import './Header.scss';

export default function Header() {
    return (
        <div id="containerHead">
            <div className="one">
                <h1>Lorem Ipsum is simply dummy text</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                <button className="buttonOnWhite">Inscription</button>
            </div>
            <div className="two">
                <img src={Seniorblue} alt="photo senior 1" />
            </div>
            <div className="three">
                <img src={Seniorgreen} alt="photo senior 2" />
                <img src={Senioryellow} alt="photo senior 3" />
            </div>
        </div>
    );
}