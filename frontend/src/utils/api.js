const baseUrl = 'http://backend.localhost:81/'

export async function fetchApi(path, options = {}) {
    // On cherche à récupérer le token d'authentification
    const token = localStorage.getItem('token');

    try {
        // Si on a un token d'authentification…
        if (token) {
            // …on ajoute les headers aux options de la requête s'il n'y en a pas encore
            if (!options.headers) {
                options.headers = {}
            }
            // …puis on renseigne le header "Authorization" avec le token
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        // On construit l'URL complète de la requête
        const url = `${baseUrl}${path}`;
        // On lance la requête HTTP, on attend et on récupère la réponse du serveur
        const response = await fetch(url, options);

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP error ${response.status}: ${text}`);
        }

        // On extrait les données de la réponses
        const data = await response.json();
        // On retourne les données renvoyées par l'API
        return data;

    } catch (error) {
        // On gère l'erreur en l'affichant dans la console (à modifier selon vos souhaits)
        console.error(error);
        return null;
    }
}