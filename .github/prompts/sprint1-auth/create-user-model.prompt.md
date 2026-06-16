Create a Mongoose User model for the showroom project.

Requirements:

Fields:

* nom
* prenom
* email
* motDePasse
* telephone
* photoProfil
* role
* emailNotifications

Rules:

* email required
* email unique
* motDePasse required
* role enum:
  * utilisateur
  * admin
* role default = utilisateur
* emailNotifications default = false

Enable timestamps.

Use CommonJS syntax.

Export with module.exports.

Generate only the model code.
