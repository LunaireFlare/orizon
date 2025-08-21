BEGIN;

DROP TABLE IF EXISTS conversation_user;
DROP TABLE IF EXISTS event_participant;
DROP TABLE IF EXISTS event_interest;
DROP TABLE IF EXISTS interest_user;
DROP TYPE IF EXISTS status_event CASCADE;
DROP TYPE IF EXISTS status_user CASCADE;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS conversation;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS interest;
DROP TABLE IF EXISTS "user";

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
    interest_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (interest_id, user_id)
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

CREATE TABLE "user" (
    id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    lastname TEXT NOT NULL,
    firstname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    zip_code VARCHAR(5) NOT NULL CHECK ( zip_code ~ '^\d{5}$'),
    city TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    role TEXT NOT NULL,
    photo TEXT,
    description TEXT NOT NULL,
    status status_user DEFAULT 'en_attente',
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz
);

CREATE TABLE message (
    id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    content TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    sender_id INT NOT NULL,
    conversation_id INT NOT NULL,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz
);

CREATE TABLE conversation (
    id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz
);

CREATE TYPE status_event AS ENUM (
    'en_attente', 
    'valide', 
    'bloqué'
);

CREATE TABLE event (
    id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL CHECK (start_date > CURRENT_TIMESTAMP),
    end_date TIMESTAMP NOT NULL CHECK ( end_date > start_date),
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    zip_code VARCHAR(5) NOT NULL CHECK ( zip_code ~ '^\d{5}$'),
    city TEXT NOT NULL,
    status status_event DEFAULT 'en_attente',
    creator_id INT NOT NULL,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz
);

CREATE TABLE interest (
    id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz
);

ALTER TABLE conversation_user ADD FOREIGN KEY (conversation_id) REFERENCES conversation (id);
ALTER TABLE conversation_user ADD FOREIGN KEY (user_id) REFERENCES "user" (id);

ALTER TABLE event_participant ADD FOREIGN KEY (event_id) REFERENCES event (id);
ALTER TABLE event_participant ADD FOREIGN KEY (participant_id) REFERENCES "user" (id);

ALTER TABLE interest_user ADD FOREIGN KEY (interest_id) REFERENCES interest (id);
ALTER TABLE interest_user ADD FOREIGN KEY (user_id) REFERENCES "user" (id);

ALTER TABLE event_interest ADD FOREIGN KEY (event_id) REFERENCES event (id);
ALTER TABLE event_interest ADD FOREIGN KEY (interest_id) REFERENCES interest (id);

ALTER TABLE message ADD FOREIGN KEY (sender_id) REFERENCES "user" (id);
ALTER TABLE message ADD FOREIGN KEY (conversation_id) REFERENCES conversation (id);

ALTER TABLE event ADD FOREIGN KEY (creator_id) REFERENCES "user" (id);

COMMIT;