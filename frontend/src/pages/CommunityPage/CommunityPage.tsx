import { useEffect, useState } from 'react';
import Rooftop from '../../components/Rooftop/Rooftop.tsx';
import Banner from '../../components/Banner/Banner.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import CardUser from '../../components/CardUser/CardUser.tsx';

import './CommunityPage.scss';

type Search = {
    code: number,
    nom: string,
    codesPostaux: string[]
}


export default function EventPage() {

    const [ options, setOptions ] = useState<Search[]>([]); 
    const [ query, setQuery ] = useState<string>("");
    const [ filtered, setFiltered ] = useState<Search[]>([]);
    const [ selected, setSelected ] = useState<string>("");


    // Appel de l'Api 
    useEffect(() => {
        if (query.length > 2) { // attendre au moins 3 lettres
        fetch(`https://geo.api.gouv.fr/communes?nom=${query}&fields=nom,codesPostaux,code`)
            .then(res => res.json())
            .then((data: Search[]) => {
            setOptions(data);
            setFiltered(data); // suggestions directes
            })
            .catch(err => console.error("Erreur API :", err));
        } else {
        setOptions([]);
        setFiltered([]);
        }
    }, [query]);


  // Filtrer les résultats dès que l'utilisateur tape quelque chose
  useEffect(() => {
    if (query.length > 0) {
        const results = options.filter(opt =>
            opt.nom.toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(results);
    } else {
        setFiltered([]);
    }
  }, [query, options]);


    return (
        <div>
            <Rooftop />
            <Banner />

            <div id="containerSearchUser">
                <div className="searchUser">
                    <h2>Rechercher un utilisateur</h2>
                    <form action="/">
                        <label htmlFor="">Nom ou prénom</label>
                        <input type="text" id="name" name="name" placeholder="Tapez votre nom ou prénom"/>

                        <div className="twoForm">
                            <div>
                                <label htmlFor="Ville">Ville</label>
                                <input
                                    type="text" 
                                    id="ville" 
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Tapez votre ville" />

                                {/* Liste de suggestions */}
                                {filtered.length > 0 && (
                                    <ul className="suggestions">
                                    {filtered.map(opt => (
                                        <div id="contentFilter">
                                            <li
                                            key={opt.code}
                                            onClick={() => {
                                                setSelected(opt.nom);
                                                setQuery(opt.nom); // Remplit l'input
                                                setFiltered([]); // Ferme la liste
                                            }}
                                            >
                                            {opt.nom} ({opt.codesPostaux})
                                            </li>
                                        </div>
                                    ))}
                                    </ul>
                                )}

                                {/* Valeur choisie (pour debug) */}
                                { selected && <p>Catégorie choisie : {selected}</p> }


                            </div>
                            <div>
                                <label>Centre d’intérêt</label>
                                <select id="interet">
                                    <option value="">-- Choisissez un centre d'interêt --</option>
                                    <option value="sport">Sport</option>
                                    <option value="musique">Musique</option>
                                    <option value="voyage">Voyage</option>
                                    <option value="cuisine">Cuisine</option>
                                </select>
                            </div>
                        </div>
                    </form>

                </div> 
            </div>
            <div id="userCommunity">
                <CardUser />
            </div>

            <Footer />
        </div>
    )
}