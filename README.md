# SeniorLove

## Présentation Générale

- **Quoi ?** Développement d'une plateforme de rencontres en ligne et autour d’événements locaux, "SeniorLove".
- **Qui ?** La société fictive "Happy Retired", spécialisée dans les services aux seniors, souhaite lancer sa propre plateforme de rencontres.
- **Pour qui ?** Retraités actifs de plus de 60 ans, en recherche de compagnie.
- **Comment ?** En équipe à définir (positionnement via un formulaire de voeux) par l'équipe pédagogique. Organisation en méthode agile pour la gestion de projet.
- **Quand ?** En plusieurs sprints qui inclueront des tâches de : conception, code, déploiement, recettage, etc.
- **Pourquoi ?** Pour la réalisation d'un projet fictif à but pédagogique visant l'obtention du Titre Professionnel.

## Présentation du Projet de Développement

### Besoins Fonctionnels (Minimum Viable Product - MVP)

- **Gestion des utilisateurs :** inscription, connexion, profils (avec centres d'intérêts), gestion du compte (modification, suppression).
- **Système d'événements :** création, modification, suppression d'événements locaux, affichage des événements par centres d'intérêt et/ou localisation, inscription des utilisateurs aux événements.
- **Messagerie :** système de messages privés entre 2 utilisateurs, asynchrones.
- **Back-office de modération :** gestion des profils utilisateurs (validation, blocage), gestion des événements.

### Propositions d’évolutions possibles

- Possibilité de signaler des contenus inappropriés et des comportements nuisibles.
- Evolution du back-office : gestion des signalements.
- Messagerie instantanée type chat, entre 2 utilisateurs (via websockets).
- Système de matching avancé basé sur les centres d'intérêts et la localisation.
- Alertes personnalisées : notifications en temps réel ou emails pour prévenir les utilisateurs d’événements pertinents proches de chez eux.
- Système de témoignages et d’évaluations : recueillir les retours utilisateurs sur les événements et les rencontres effectuées.
- Gestion avancée des événements : intégration d'un calendrier interactif pour visualiser clairement les événements à venir.
- Cartographie interactive : visualisation géographique des événements et profils disponibles à proximité.
- Badges ou récompenses virtuelles : valoriser les utilisateurs actifs et impliqués (organisateurs fréquents d’événements, participants réguliers, etc.).
- Application mobile : optimisation poussée pour l'ergonomie et l'accessibilité afin de faciliter l'usage mobile chez les seniors.

### Contraintes Techniques (notamment liées au TP)

- **Technologies** : choix libres mais justifiés.
- **Sécurité :** authentification sécurisée, protection contre les failles courantes (XSS, injections SQL, etc.).
- **Déploiement :** rédaction a minima d'une procédure de déploiement (CI/CD en bonus).
- **Responsive :** application développée en mobile first et responsive.
- **Accessibilité :** respect des normes d'accessibilité web [WCAG](https://www.w3.org/Translations/WCAG20-fr/).
- **RGPD et mentions légales :** mettre en place les mentions légales liées au règlement général sur la protection des données (RGPD).
- **Versionning :** utilisation de Git et GitHub.
- **API** : en consommer au moins une (qu’elle soit interne ou externe). Un seul appel peut être suffisant, l’API ne doit pas forcément être utilisée pour tout le projet.
- **SEO** : appliquer les bonnes pratiques visant à maximiser le référencement du projet.
- **Tests** : plan de tests couvrant les fonctionnalités principales du projet.
- **Conteneurisation (Docker)** : pour l'environnement de développement voire pour le déploiement
- **Démarche d'éco-conception** (optimisation des images, minification des fichiers, etc.).

### Informations & Ressources complémentaires

- Ne pas hésiter à utiliser des contenus “lorem ipsum” au moins le temps d'avoir un MVP fonctionnel.
- Etant donné le public visé, une attention toute particulière devra être donnée à l’ergonomie de l’interface.
- Inspirations graphiques possibles :
  - [DisonsDemain](https://www.disonsdemain.fr/),
  - [Parship](https://www.parship.fr/).

## Pour terminer

- Le projet est libre d'interprétation, l'équipe peut proposer ses propres choix techniques et fonctionnels. Il est donc évolutif et il ne faut pas hésiter à se l'approprier.
- L'accent doit être mis sur l'apprentissage et la mise en pratique des compétences acquises pendant la formation (objectif TP).
- L'équipe pédagogique assure l'accompagnement et conseille tout au long du projet. Elle interviendra aussi lors de la validation des choix techniques et fonctionnels. Elle sera garante de l'évaluation de la progression en vue de se préparer au mieux pour le TP.
- L'équipe pédagogique n'est en aucun cas positionnée en tant que représentante du client fictif du projet proposé.

:arrow_right: [Attendus sur le sprint 0](../.github/ISSUE_TEMPLATE/sp0-suivi-conception.md), dédié à la conception.