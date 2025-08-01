# Dictionnaire de données

## Table User

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT | L'identifiant de l'utilisateur |
| lastname | TEXT | NOT NULL | Le nom de l'utilisateur |
| firstname | TEXT | NOT NULL | Le prénom de l'utilisateur |
| email | TEXT | NOT NULL UNIQUE | L'email de l'utilisateur |
| password | TEXT | NOT NULL, CHECK (LENGTH(password) >= 8) | Le mot de passe de l'utilisateur |
| zip_code | VARCHAR(5) | NOT NULL, CHECK (value ~ ‘^\d{5}$’) | Le code postal de l'utilisateur |
| city | TEXT | NOT NULL | La ville de l'utilisateur |
| date_of_birth | DATE | NOT NULL, CHECK (DATE_PART('year', AGE(CURRENT_DATE, date_naissance)) > 60) | L'âge de l'utilisateur |
| role | TEXT | NOT NULL | Le rôle de l'utilisateur |
| status | ENUM | NOT NULL DEFAULT PENDING | Le statut de l'utilisateur (valide, en attente de validation, bloqué, désactivé) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création de l'utilisateur |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification de l'utilisateur |

## Table Message

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT | L'identifiant du message |
| content | TEXT | NOT NULL | Le contenu du message |
| date | TIMESTAMP | NOT NULL | La date et heure de l'envoi |
| sender_id | ENTITY | NOT NULL | L'expéditeur du message (user_id) |
| conversation_id | ENTITY | NOT NULL | L'identifiant de la conversation qui contient le message |
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
| start_date | TIMESTAMP | NOT NULL CHECK (start_date > CURRENT_TIMESTAMP)| La date et l'heure de début de l'évènement |
| end_date | TIMESTAMP | NOT NULL CHECK (end_date > start_date) | La date et l'heure de fin de l'évènement |
| description | TEXT | NOT NULL | La description de l'évènement |
| address | TEXT | NOT NULL | L'adresse de l'évènement |
| zip_code | VARCHAR(5) | NOT NULL, CHECK (value ~ ‘^\d{5}$’) | Le code postal de la ville |
| city | TEXT | NOT NULL | La ville de l'évènement |
| status | ENUM | NOT NULL DEFAULT PENDING | Le statut de l'évènement (valide, en attente de validation, bloqué) |
| creator_id | ENTITY | NOT NULL | Le créateur de l'évènement (user_id) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création de l'évènement |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification de l'évènement |

## Table Interest

| Champ | Type | Spécificités | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY, UNSIGNED, NOT NULL, AUTO_INCREMENT | L'identifiant de l'intérêt |
| name | TEXT | NOT NULL UNIQUE | Le nom de l'intérêt |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de création de l'intérêt |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | La date de dernière modification de l'intérêt |
