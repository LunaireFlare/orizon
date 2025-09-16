BEGIN;

INSERT INTO "user" (lastname, firstname, email, password, zip_code, city, date_of_birth, role, photo,description, status)
VALUES 
('Dupont', 'Jean', 'jean.dupont@example.com', '$argon2id$v=19$m=65536,t=3,p=4$9tmgBGeVmvCBtrsfqukeWw$aS36cPoTBLkGWELbXTPj0wpNWgQaSLaiTNOXwVHgpIc', '75001', 'Paris', '1990-05-15', 'user', NULL,'Bonjour, je suis passionné de foot', 'valide'),
('Martin', 'Claire', 'claire.martin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$ZEzwMwwspVgLS2xjrf57mQ$88DkpyyEGjZMLeydUBErVvu0lhCcxIr0smBS8AJGP0k', '69001', 'Lyon', '1985-03-22', 'user', NULL, 'Bonjour, je suis passionné de couture', 'valide'),
('Durand', 'Paul', 'paul.durand@example.com', '$argon2id$v=19$m=65536,t=3,p=4$ZkJ911yOAj/V5LsF9jIUDg$MKq24UyO4J4hc6+yEwUbSKPeWPQerihiFJplIDkUefY', '31000', 'Toulouse', '1995-07-09', 'admin', NULL,'Bonjour, je suis passionné de cuisine', 'valide'),
('Leclerc', 'Sophie', 'sophie.leclerc@example.com', '$argon2id$v=19$m=65536,t=3,p=4$abc$xyz', '13000', 'Marseille', '1942-08-14', 'user', NULL,'Je suis passionnée par la randonnée', 'bloqué'),
('Nguyen', 'Thierry', 'thierry.nguyen@example.com', '$argon2id$v=19$m=65536,t=3,p=4$abc$xyz2', '67000', 'Strasbourg', '1963-11-03', 'user', NULL,'Fan de jeux de société', 'en_attente'),
('Bernard', 'Lucie', 'lucie.bernard@example.com', '$argon2id$v=19$m=65536,t=3,p=4$abc$xyz3', '44000', 'Nantes', '1960-02-19', 'user', NULL,'J’adore la photographie', 'désactivé'),
('Petit', 'Nicolas', 'nicolas.petit@example.com', '$argon2id$v=19$m=65536,t=3,p=4$abc$xyz4', '75015', 'Paris', '1991-10-10', 'user', NULL, 'Passionné de lecture et de sport', 'valide'),
('Garcia', 'Laura', 'laura.garcia@example.com', '$argon2id$v=19$m=65536,t=3,p=4$abc$xyz5', '33000', 'Bordeaux', '1993-04-08', 'user', NULL, 'Adepte de cuisine et jeux de société', 'valide'),
('Moreau', 'Antoine', 'antoine.moreau@example.com', '$argon2id$v=19$m=65536,t=3,p=4$abc$xyz6', '06000', 'Nice', '1989-06-25', 'user', NULL, 'Amateur de musique et photographie', 'valide');

INSERT INTO "interest" (name) VALUES
('Sport'),
('Musique'),
('Voyage'),
('Cuisine'),
('Photographie'),
('Jeux de société'),
('Randonnée'),
('Lecture');

INSERT INTO "event" (name, start_date, end_date, description, address, zip_code, city, status, creator_id) 
VALUES
('Tournoi de foot', NOW() + INTERVAL '10 days', NOW() + INTERVAL '11 days',
'Un grand tournoi de football local', 'Stade Municipal', '75001', 'Paris', 'valide', 1),

('Concert jazz', NOW() + INTERVAL '20 days', NOW() + INTERVAL '21 days 2 hours',
'Concert de jazz en plein air', 'Parc Central', '69001', 'Lyon', 'valide', 2),

('Atelier cuisine italienne', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days 3 hours',
'Apprenez à faire des pâtes fraîches', 'Maison de la culture', '31000', 'Toulouse', 'en_attente', 3),

('Randonnée dans les Calanques', NOW() + INTERVAL '15 days', NOW() + INTERVAL '15 days 6 hours',
'Exploration des sentiers en bord de mer', 'Départ Vieux-Port', '13000', 'Marseille', 'valide', 4),

('Soirée jeux de société', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 4 hours',
'Venez découvrir et jouer à vos jeux préférés', 'Café des jeux', '67000', 'Strasbourg', 'valide', 5),

('Sortie photo au coucher du soleil', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days 2 hours',
'Prenez des clichés incroyables au bord de Loire', 'Quai de la Fosse', '44000', 'Nantes', 'bloqué', 6),

('Atelier photographie urbaine', NOW() + INTERVAL '12 days', NOW() + INTERVAL '12 days 4 hours',
'Découverte de la photo de rue dans le centre-ville', 'Place Royale', '44000', 'Nantes', 'valide', 6),

('Club de lecture mensuel', NOW() + INTERVAL '18 days', NOW() + INTERVAL '18 days 2 hours',
'Rejoignez-nous pour discuter autour du roman du mois', 'Bibliothèque municipale', '69001', 'Lyon', 'en_attente', 2),

('Tournoi de jeux de société', NOW() + INTERVAL '25 days', NOW() + INTERVAL '25 days 6 hours',
'Affrontez d''autres joueurs lors d''un tournoi convivial', 'Maison des associations', '67000', 'Strasbourg', 'valide', 5);

INSERT INTO "event_participant" (event_id, participant_id) VALUES
(1, 2),
(1, 1),
(2, 1), 
(2, 2),
(3, 1),
(3, 3),  
(3, 2),
(4, 4),
(4, 1),
(4, 2),
(5, 5),
(5, 2),
(6, 6),
(6, 3),
(7, 6),
(7, 3),
(7, 2),
(8, 2),
(8, 1),
(8, 4),
(9, 5),
(9, 2),
(9, 1),
(1, 7),
(8, 7),
(3, 8),
(9, 8),
(2, 9),
(7, 9); 

INSERT INTO "event_interest" (event_id, interest_id) VALUES
(1, 1),
(2, 2), 
(3, 4),
(4, 7),
(5, 6),
(6, 5),
(7, 5),
(8, 8),
(9, 6);

INSERT INTO "interest_user" (interest_id, user_id) VALUES
(1, 1),
(2, 1), 
(3, 2), 
(4, 3),
(5, 6),
(6, 5),
(7, 4),
(7, 1),
(8, 2),
(1, 7),
(8, 7),
(4, 8),
(6, 8),
(2, 9),
(5, 9);

INSERT INTO "conversation" DEFAULT VALUES RETURNING id;

INSERT INTO "conversation_user" (conversation_id, user_id) VALUES
(1, 1),
(1, 2);

INSERT INTO "message" (content, date, sender_id, conversation_id) VALUES
('Salut Claire, tu viens au tournoi ?', NOW(), 1, 1),
('Oui Jean, je serai là !', NOW(), 2, 1);

COMMIT;