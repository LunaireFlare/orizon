CREATE TABLE conversation_user (
    conversation_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE event_participant (
    event_id INTEGER NOT NULL,
    participant_id INTEGER NOT NULL,
    PRIMARY KEY (event_id, participant_id)
);

CREATE TABLE interest_user (
    interest INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (interest, user_id)
);

CREATE TABLE event_interest (
    event_id INTEGER NOT NULL,
    interest_id INTEGER NOT NULL,
    PRIMARY KEY (event_id, interest_id)
);

CREATE TYPE status_user AS ENUM (
    'en_attente', 
    'valide', 
    'bloqué', 
    'désactivé'
);

CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    lastname TEXT NOT NULL,
    firstname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    zip_code VARCHAR(5) NOT NULL CHECK ( zip_code ~ '^\d{5}$'),
    city TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    role TEXT NOT NULL,
    photo TEXT DEFAULT ,
    status status_user DEFAULT 'en_attente',
);

