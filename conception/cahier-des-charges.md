# Cahier des charges

## Présentation

Contexte: la société "Happy Retired" spécialisée dans les services aux seniors, souaite lancer sa propre plateforme de rencontres

Objectifs du site:
    -> rencontre entre personnes agées ( 60ans et +) en recherche de compagnie.
    -> faire vivre des petits commerces
    -> développer la vie sociale des personnes senior et l'activité des villes
    -> préparer retraite pour pré-retraités
    -> lutter contre l'isolement et la solitude pendant la transition retraite
    -> se connecter avec de nouvelles personnes via un réseau sécurisé et vérifié
    -> protection et sécurité de ses utilisateurs en vérifiant les profils inscrits

Pour la réalisation d'un projet fictif à but pédagogique visant l'obtention du Titre Professionnel.

## Définition des besoins

- plateforme où les gens peuvent communiquer par chat privé asynchrone ou synchrone
- créer un profil personnalisé (âge, centres d'intérêt, localisation)
- consulter des profils
- créer, modifier, supprimer à des évènements
- participer et voir la liste des évènements existants (par ville ou centres d'intérêt)
- backoffice pour valider/bloquer utilisateurs et modérer évènements

## Fonctionnalités du projet

### Minimum Viable Product

- **Gestion des utilisateurs :** inscription, connexion, profils (avec centres d'intérêts), gestion du compte (modification, suppression).
- **Système d'événements :** création, modification, suppression d'événements locaux, affichage des événements par centres d'intérêt et/ou localisation, inscription des utilisateurs aux événements.
- **Messagerie :** système de messages privés entre 2 utilisateurs, asynchrones.
- **Back-office de modération :** gestion des profils utilisateurs (validation, blocage), gestion des événements.

### Evolutions potentielles

- Possibilité de signaler des contenus inappropriés et des comportements nuisibles.
- Evolution du back-office : gestion des signalements.
- [X] Messagerie instantanée type chat, entre 2 utilisateurs (via websockets).
- Système de matching avancé basé sur les centres d'intérêts et la localisation.
- Alertes personnalisées : notifications en temps réel ou emails pour prévenir les utilisateurs d’événements pertinents proches de chez eux.
- Système de témoignages et d’évaluations : recueillir les retours utilisateurs sur les événements et les rencontres effectuées.
- [X] Gestion avancée des événements : intégration d'un calendrier interactif pour visualiser clairement les événements à venir.
- [X] Cartographie interactive : visualisation géographique des événements et profils disponibles à proximité.
- [X] Badges ou récompenses virtuelles : valoriser les utilisateurs actifs et impliqués (organisateurs fréquents d’événements, participants réguliers, etc.).
- Application mobile : optimisation poussée pour l'ergonomie et l'accessibilité afin de faciliter l'usage mobile chez les seniors.

## Architecture du projet

- Reverse proxy
- Front : SPA
- Back : API Rest avec RBAC
- BDD : unique

*(si possible à compléter par schéma d'architecture)*

## Liste des technologies utilisées (spécifications techniques)

- Versioning : git, GitHub
- Outils : Docker (pour déploiement facilité dans différents environnements de travail + pratique pour travail d'équipe), GitHub Actions, plateforme déploiement (o2switch, surge, coolify ?)
- Design : Figma, Photoshop
- Tests : Insomnia, Jest, Lighthouse
- Sécurité : jeton JWT (obligatoire pour SPA/API), zod, argon2 (comme recommandé par OWASP (https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)), Csrf token, Cors, SanitizeHtml, Express-rate-limit, helmet (les plus utilisés sur npmjs)
- Front : HTML, SASS, React + TypeScript, Vite, *Zustand (?)*
- Back : Nodejs, Express, TypeScript (surcouche JavaScript pour typage fort donc sécurité du code)
- BDD : Postgresql avec ORM Sequelize (requêtes préparées natives contre injections SQL + plus simple pour BDD complexes + gain de temps pour requêtes + sécurité de types avec modèles)

## Cible du projet/public visé

Retraités actifs de plus de 60 ans, en recherche de compagnie et évènements afin de rencontrer des personnes ayant les mêmes intérêts (dans un contexte sécurisé et vérifié)

## Navigateurs compatibles

- Firefox
- Chrome
- Explorer
- Safari

## Arborescence d'application (front)

Chemin utilisateur :

- /home (navbar = `events`, `register`, `login`)
- /auth/register --> profile
- /auth/login --> profile

*(options d'accessibilité : augmenter taille du texte)*

## Liste des routes prévues (back)

- **GET** `/home`
- **POST** `/auth/register & login`
- **RUD** (/auth)/profile

- **GET** /users/
- **GET** /users/:id

- **CRUD** /events

- **GET** /messages
- **POST** /messages

## User stories

(demain)

## Analyse des risques

- Risques techniques : Problème de compatibilité, bug serveur, performances faibles, référencement SEO, risque de perte de donnees, 
- Risque juridique / réglementaire : nouvelle loi, RGPD
- Risques organisationnels : mauvais répartition des rôles, manque de communication, dépassement des délais, 
- Risque de sécurité : faille XSS, injection sql, non respect du rgpd (enregistrement de donné)
- Risques économiques et financiers : mauvaise gestion du budget
- Risques psychosociaux : stress, burnout

## Liste des rôles

- Product Owner : Cheikna
- Scrum Master : Ambre
- Lead Devs : Coralie et Kannann
