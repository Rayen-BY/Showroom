Create a register controller for a MERN showroom project.

Requirements:

Use User model.

Register fields:

* nom
* prenom
* email
* motDePasse

Logic:

* check if email already exists
* hash password using bcryptjs
* create user
* role default = utilisateur

Response:

201 Created

{
success: true,
message: "Compte créé avec succès"
}

Use async/await.

Use CommonJS syntax.

Generate only the controller function.
