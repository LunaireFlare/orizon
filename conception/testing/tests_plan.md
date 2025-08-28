# Plan de tests

## Inscription

|  ID   |           Cas de test          |                      Etapes                   |                  Résultat attendu            |
|  ---  |               ---              |                       ---                     |                        ---                   |
|  001  | Tous les champs sont valides   | Remplir les champs avec données correctes, cliquer sur "S'inscrire" | L'utilisateur est redirigé sur la page de connexion |
|  002  | Date de naissance au mauvais format   | Remplir le champ dédié sous un format autre que `JJ/MM/AAAA` | Un message d'erreur s'affiche sous le champ date de naissance ("Veuillez saisir votre date de naissance au format JJ/MM/AAAA) |
|  003  | Âge inférieur à 60 ans   | Choisir une date de naissance inférieure à TODAY - 60 YEARS  | Un message d'erreur s'affiche sous le champ date de naissance ("Vous devez être âgé(e) de 60 ans révolus pour pouvoir vous inscrire") |
|  004  | Email invalide | Entrer un email sans `@` ou un domaine accepté (`.com`, `.fr`...) | Un message d'erreur s'affiche sous le champ email ("Veuillez inclure @ dans l'adresse email" ou "Veuillez saisir la partie manquante après le symbole @") |
|  005  | Code postal erroné | Entrer un code postal dans un format autre que 5 chiffres | Un message d'erreur s'affiche sous le champ email ("Veuillez saisir un code postal valide") |
|  006  |    Mot de passe trop court     | Saisir un mot de passe de moins de 8 caractères | Un message d'erreur s'affiche sous le champ mot de passe ("Le mot de passe doit contenir au moins 8 caractères") |
|  007  | Confirmation du mot de passe incorrecte | Saisir deux mots de passe différents | Un message d'erreur s'affiche sous le champ mot de passe ("Les mots de passe ne correspondent pas") |
|  008  |    Champs vides     | Cliquer sur "S'inscrire" sans avoir rempli tous les champs | Le premier champ en erreur est surligné avec un message d'erreur ("Veuillez renseigner ce champ") |

---

## Connexion

|  ID   |           Cas de test          |                      Etapes                   |                  Résultat attendu            |
|  ---  |               ---              |                       ---                     |                        ---                   |
|  001  | Tous les champs sont valides   | Remplir les champs avec données correctes, cliquer sur "Se connecter" | L'utilisateur est redirigé sur la page de profil |
|  002  |          Email invalide        | Entrer un email qui n'existe pas dans la base de données  | Un message d'erreur apparaît ("Les identifiants ne sont pas reconnus. Veuillez réessayer") |
|  003  |     Mot de passe invalide      | Saisir un mot de passe autre que celui associé à l'email  | Un message d'erreur apparaît ("Les identifiants ne sont pas reconnus. Veuillez réessayer") |
|  004  |            Champs vides        | Cliquer sur "Se connecter" sans avoir rempli tous les champs | Le premier champ en erreur est surligné avec un message d'erreur ("Veuillez renseigner ce champ") |
|  005  |       Mot de passe oublié      | Cliquer sur le bouton "Mot de passe oublié"  | L'utilisateur est redirigé vers la page adéquate et doit saisir une adresse mail |

---

## CRUD utilisateurs

|  ID   |           Cas de test          |                      Etapes                   |                  Résultat attendu            |
|  ---  |               ---              |                       ---                     |                        ---                   |
|  001  |  Récupération de tous les utilisateurs | Faire une requête `GET /users` | La liste de tous les utilisateurs enregistrés en BDD est retournée sans les mots de passe |
|  002  | Récupération d'un utilisateur **(existant)** | Faire une requête `GET /users/:id` sur un id existant en BDD | L'utilisateur à l'id demandé est retourné sans le mot de passe |
|  003  | Récupération d'un utilisateur **(non existant)** | Faire une requête `GET /users/:id` sur un id non existant en BDD | Un message d'erreur apparaît ("Utilisateur non trouvé") |
|  004  | Création d'un utilisateur **(non existant + champs valides)** | Faire une requête `POST /users` avec tous les champs remplis correctement | L'utilisateur est enregistré en BDD et retourné sans le mot de passe |
|  005  | Création d'un utilisateur **(non existant +  champ(s) erroné(s))** | Faire une requête `POST /users` avec tous les champs remplis mais une erreur de formatage est présente | Un message explicitant l'erreur et le champ concerné apparaît |
|  006  | Création d'un utilisateur **(non existant +  champ(s) vide(s))** | Faire une requête `POST /users` avec un ou plusieurs champs vides | Un message explicitant l'erreur et le champ concerné apparaît |
|  007  | Création d'un utilisateur **(non existant + adresse mail déjà utilisée)** | Faire une requête `POST /users` avec une adresse email déjà enregistrée en BDD | Un message d'erreur apparaît ("L'utilisateur existe déjà") |
|  008  | Mise à jour d'un utilisateur **(existant + champs valides)** | Faire une requête `PUT /users/:id` avec tous les champs remplis correctement | L'utilisateur est enregistré en BDD et retourné sans le mot de passe |
|  009  | Mise à jour d'un utilisateur **(existant + champ(s) erroné(s))** | Faire une requête `PUT /users/:id` avec tous les champs remplis mais une erreur de formatage est présente | Un message explicitant l'erreur et le champ concerné apparaît |
|  010  | Mise à jour d'un utilisateur **(existant + champ(s) vide(s))** | Faire une requête `PUT /users/:id` avec un ou plusieurs champs vides | Un message explicitant l'erreur et le champ concerné apparaît |
|  011  | Mise à jour d'un utilisateur **(existant + adresse mail déjà utilisée)** | Faire une requête `PUT /users/:id` avec une adresse email déjà enregistrée en BDD | Un message d'erreur apparaît ("L'adresse email existe déjà") |
|  012  | Mise à jour d'un utilisateur **(non existant)** | Faire une requête `PUT /users/:id` avec un id d'un utilisateur qui n'existe pas en BDD | Un message d'erreur apparaît ("Utilisateur non trouvé") |
|  013  | Suppression d'un utilisateur **(existant)** | Faire une requête `DELETE /users/:id` avec un id d'un utilisateur qui existe en BDD | Les champs sont tous remis à 0 en BDD sauf l'adresse email |
|  014  | Suppression d'un utilisateur **(non existant)** | Faire une requête `DELETE /users/:id` avec un id d'un utilisateur qui n'existe pas en BDD | Un message d'erreur apparaît ("Utilisateur non trouvé") |
