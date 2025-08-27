import Logo from '../../Assets/images/Logo_OrizonBlanc.png';
import './BackOfficePage.scss';



export default function BackOfficePage() {

    return (
        <div id="containerTableBoard">
            <div id="tableBoard">
                <div className="leftContainer">
                    <img src={Logo} alt="Logo Orizon"/>
                </div>
                <div className="rightContainer">
                    
                </div>
            </div>
        </div>
    );
}