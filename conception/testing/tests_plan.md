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
|  009  |    Double soumission     | Cliquer deux fois rapidement sur "Créer un compte"  | Un seul compte est créé, le bouton devient inactif pendant le traitement |

_TODO: test pour âge inférieur à 60 ans ou pas ?_

---

## Connexion

|  ID   |           Cas de test          |                      Etapes                   |                  Résultat attendu            |
|  ---  |               ---              |                       ---                     |                        ---                   |
|  001  | Tous les champs sont valides   | Remplir les champs avec données correctes, cliquer sur "Se connecter" | L'utilisateur est redirigé sur la page de profil |
|  002  |          Email invalide        | Entrer un email qui n'existe pas dans la base de données  | Un message d'erreur apparaît ("Les identifiants ne sont pas reconnus. Veuillez réessayer") |
|  003  |     Mot de passe invalide      | Saisir un mot de passe autre que celui associé à l'email  | Un message d'erreur apparaît ("Les identifiants ne sont pas reconnus. Veuillez réessayer") |
|  004  |            Champs vides        | Cliquer sur "Se connecter" sans avoir rempli tous les champs | Le premier champ en erreur est surligné avec un message d'erreur ("Veuillez renseigner ce champ") |
|  005  |        Double soumission       | Cliquer deux fois rapidement sur "Se connecter"  | Le bouton devient inactif pendant le traitement |
|  006  |       Mot de passe oublié      | Cliquer sur le bouton "Mot de passe oublié"  | L'utilisateur est redirigé vers la page adéquate et doit saisir une adresse mail |

---