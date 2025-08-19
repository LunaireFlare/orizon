import Rooftop from '../../components/Rooftop/Rooftop.tsx';
import Footer from '../../components/Footer/Footer.tsx';

import './ErrorPage.scss';

interface ErrorPageProps {
    code: number;        // ex: 404, 500
    title: string;       // ex: "Page non trouvée"
    message: string;     // ex: "La page demandée n'existe pas."
}

export default function ErrorPage({
    code = 500, // Code d'erreur par défaut A DYNAMISER
    title,
    message,
}: ErrorPageProps) {

    // Titres par défaut selon code
    const defaultTitles: Record<number, string> = {
        404: "Page non trouvée",
        500: "Erreur serveur",
    };

    const defaultMessages: Record<number, string> = {
        404: "La page que vous cherchez n'existe pas ou a été déplacée.",
        500: "Un problème est survenu côté serveur. Merci de réessayer plus tard.",
    };

    const errorTitle = title || defaultTitles[code] || "Erreur";
    const errorMessage = message || defaultMessages[code] || "Une erreur est survenue.";

    return (
        <>
            <Rooftop />
            <div className="error-container">
                <h1>{code} - {errorTitle}</h1>
                <p>{errorMessage}</p>
                <button onClick={() => window.location.href = '/'}>Retour à l'accueil</button>
            </div>
            {'}'}
            <Footer />
        </>
    );
}