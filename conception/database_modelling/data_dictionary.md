# Dictionnaire de données

## Table User

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- | 
| code_utilisateur | INT| PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT | L'identifiant de l'utilisateur |
| lastname | TEXT | NOT NULL | Le nom de l'utilisateur |
| firstname | TEXT | NOT NULL | Le prénom de l'utilisateur |
| email | TEXT | NOT NULL | L'email de l'utilisateur |
| mot de passe | TEXT | NOT NULL | Le mot de passe de l'utilisateur |
| ville | TEXT | NOT NULL | La ville de l'utilisateur |
| âge | INT | NOT NULL |L'âge de l'utilisateur |
| rôle | TEXT | NOT NULL | Le rôle de l'utilisateur |
| est_valide | BOOLEAN | NOT NULL DEFAULT false | Le statut de l'utilisateur (valide, bloqué) |
| cree_le | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création de l'évènement |
| mis_a_jour_le | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification de l'évènement |

## Table Message

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| code_message | INT| PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT| L'identifiant de l'image  |
| content | TEXT | NOT NULL | contenu du message |
| date | TIMESTAMP | NOT NULL | Date et heure de l'envoi |
| code_expéditeur | Description | Type | Commentaire |
| Nom | Description | Type | Commentaire |
| cree_le | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création du message |
| mis_a_jour_le | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification du message |

## Table Conversation

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| code_utilisateur | INT| texte court | - | Utilisateur |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création de la conversation |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification de la conversation |

## Table Event

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT | L'identifiant de l'évènement |
| name | TEXT | NOT NULL | Le  nom de l'évènement |
| date | TIMESTAMP | NOT NULL | La date et l'heure de l'évènement |
| description | TEXT | NOT NULL | La description de l'évènement |
| address | TEXT | NOT NULL | L'adresse de l'évènement |
| zipcode | INT | NOT NULL | Le code postal de la ville
| city | TEXT | NOT NULL | La ville de l'évènement |
| status | TEXT | NOT NULL | Le statut de l'évènement (à venir, en cours, passé) |
| isValid | BOOLEAN | NOT NULL, DEFAULT TRUE | Le statut de l'évènement (valide, bloqué) |
| creator_id | ENTITY | NOT NULL | Le créateur de l'évènement (code_utilisateur) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création de l'évènement |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification de l'évènement |

## Table Interest

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| code_utilisateur | INT| texte court | - | Utilisateur |
| Nom | Description | Type | Commentaire |
| Nom | Description | Type | Commentaire |
| Nom | Description | Type | Commentaire |
| Nom | Description | Type | Commentaire |