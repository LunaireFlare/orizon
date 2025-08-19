BEGIN;

INSERT INTO "user" (lastname, firstname, email, password, zip_code, city, date_of_birth, role, photo, status)
VALUES 
('Dupont', 'Jean', 'jean.dupont@example.com', 'hashed_password1', '75001', 'Paris', '1990-05-15', 'user', NULL, 'valide'),
('Martin', 'Claire', 'claire.martin@example.com', 'hashed_password2', '69001', 'Lyon', '1985-03-22', 'user', NULL, 'valide'),
('Durand', 'Paul', 'paul.durand@example.com', 'hashed_password3', '31000', 'Toulouse', '1995-07-09', 'admin', NULL, 'valide');

INSERT INTO interest (name) VALUES
('Sport'),
('Musique'),
('Voyage'),
('Cuisine');

INSERT INTO event (name, start_date, end_date, description, address, zip_code, city, status, creator_id)
VALUES
('Tournoi de foot', NOW() + INTERVAL '10 days', NOW() + INTERVAL '11 days',
'Un grand tournoi de football local', 'Stade Municipal', '75001', 'Paris', 'valide', 1),

('Concert jazz', NOW() + INTERVAL '20 days', NOW() + INTERVAL '21 days 2 hours',
'Concert de jazz en plein air', 'Parc Central', '69001', 'Lyon', 'valide', 2),

('Atelier cuisine italienne', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days 3 hours',
'Apprenez à faire des pâtes fraîches', 'Maison de la culture', '31000', 'Toulouse', 'en_attente',3);

INSERT INTO event_participant (event_id, participant_id) VALUES
(1, 2),
(2, 1), 
(3, 1), 
(3, 2);

INSERT INTO event_interest (event_id, interest_id) VALUES
(1, 1),
(2, 2), 
(3, 4);

INSERT INTO interest_user (interest_id, user_id) VALUES
(1, 1),
(2, 1), 
(3, 2), 
(4, 3);

INSERT INTO conversation DEFAULT VALUES RETURNING id;

INSERT INTO conversation_user (conversation_id, user_id) VALUES
(1, 1),
(1, 2);

INSERT INTO message (content, date, sender_id, conversation_id) VALUES
('Salut Claire, tu viens au tournoi ?', NOW(), 1, 1),
('Oui Jean, je serai là !', NOW(), 2, 1);

COMMIT;