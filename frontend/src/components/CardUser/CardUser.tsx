import { Link } from 'react-router';
import './CardUser.scss';
import avatarWoman from '../../assets/images/avatarWomen.webp';
import avatarMan from '../../assets/images/avatarMen.webp';

type Interest = {
    id: number;
    name: string;
};

type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    city: string;
    zip_code: string;
    description: string | null;
    photo: string | null;
    interests?: Interest[];
};

type Props = {
    user: User;
};

export default function CardUser({ user }: Props) {
    return (
        <div className="elmCardUser">
            <Link to={`/profil/${user.id}`} className="profileLink">
                <img
                    src={avatarWoman}
                    width="50px"
                    alt={`Photo de ${user.firstname}`}
                />
            </Link>
            <Link to={`/profil/${user.id}`} className="nameLink">
                <h3>{user.firstname} {user.lastname}</h3>
            </Link>
            <p><strong>{user.city} ({user.zip_code})</strong></p>
            <p>{user.email}</p>
            {user.description && <p>Description : {user.description}</p>}
            {user.interests && user.interests.length > 0 && (
                <div className="interests">
                    <strong>Centres d'intérêt :</strong>
                    <ul>
                        {user.interests.map(interest => (
                            <li key={interest.id}>{interest.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
