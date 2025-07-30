# Dictionnaire de données

## Table User

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT | L'identifiant de l'utilisateur |
| lastname | TEXT | NOT NULL | Le nom de l'utilisateur |
| firstname | TEXT | NOT NULL | Le prénom de l'utilisateur |
| email | TEXT | NOT NULL | L'email de l'utilisateur |
| password | TEXT | NOT NULL | Le mot de passe de l'utilisateur |
| city | TEXT | NOT NULL | La ville de l'utilisateur |
| age | INT | NOT NULL | L'âge de l'utilisateur |
| role | TEXT | NOT NULL | Le rôle de l'utilisateur |
| isValid | BOOLEAN | NOT NULL DEFAULT TRUE | Le statut de l'utilisateur (valide, bloqué) |
<!-- ? ou is_valid pour garder la même syntaxe ? -->
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création de l'évènement |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification de l'évènement |

## Table Message

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT | L'identifiant du message |
| content | TEXT | NOT NULL | Le contenu du message |
| date | TIMESTAMP | NOT NULL | La date et heure de l'envoi |
| sender_id | ENTITY | NOT NULL | L'expéditeur du message (user_id) |
<!-- | recipient_id | ENTITY | NOT NULL | Le destinataire du message (user_id) | -->
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création du message |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification du message |

## Table Conversation

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT | L'identifiant de la conversation |
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
| zipcode | INT | NOT NULL | Le code postal de la ville |
| city | TEXT | NOT NULL | La ville de l'évènement |
| status | TEXT | NOT NULL | Le statut de l'évènement (à venir, en cours, passé) |
| isValid | BOOLEAN | NOT NULL, DEFAULT TRUE | Le statut de l'évènement (valide, bloqué) |
<!-- ? ou is_valid pour garder la même syntaxe ? -->
| creator_id | ENTITY | NOT NULL | Le créateur de l'évènement (user_id) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création de l'évènement |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification de l'évènement |

## Table Interest

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT | L'identifiant de l'intérêt |
| name | TEXT | NOT NULL | Le nom de l'intérêt |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création de l'intérêt |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification de l'intérêt |
