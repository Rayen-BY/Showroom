# Showroom Automobile MERN - Copilot Instructions

## Project Overview

This project is a full-stack MERN application for managing a car showroom.

Backend stack:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

Frontend stack (later):

* React

The backend follows the MVC architecture.

---

## Folder Structure

```text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
└── uploads/
```

---

## Coding Rules

### Models

* Use Mongoose schemas.
* One model per file.
* Export models using CommonJS.

Example:

```js
module.exports = mongoose.model("User", userSchema);
```

---

### Controllers

Controllers must contain business logic only.

Do not define routes inside controllers.

Example:

```js
exports.register = async (req, res) => {
};
```

---

### Routes

Routes must only define endpoints and call controllers.

Example:

```js
router.post("/register", register);
```

---

### Authentication

Use JWT authentication.

Store the token in the Authorization header using:

```text
Bearer <token>
```

Passwords must always be hashed using bcrypt.

Never store plain text passwords.

---

## Main Entities

### User

Fields:

* nom
* prenom
* email
* motDePasse
* telephone
* photoProfil
* role
* emailNotifications

Roles:

* utilisateur
* admin

---

### Marque

Fields:

* nom

---

### Vehicule

Fields:

* marque
* modele
* prix
* carburant
* boiteVitesse
* kilometrage
* annee
* typeVehicule
* nombrePlaces
* consommation
* description
* statut
* images

---

### Favori

Fields:

* utilisateur
* vehicule
* dateAjout

---

### Reservation

Fields:

* utilisateur
* vehicule
* dateReservation
* heureReservation
* telephone
* statut

Statut values:

* En attente
* Acceptée
* Refusée

---

## API Conventions

Use REST API conventions.

Examples:

GET /api/vehicules

GET /api/vehicules/:id

POST /api/vehicules

PUT /api/vehicules/:id

DELETE /api/vehicules/:id

---

## Error Handling

Use async/await.

Return consistent JSON responses.

Success example:

```json
{
  "success": true,
  "data": {}
}
```

Error example:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Code Quality

* Use meaningful variable names.
* Keep controllers small.
* Reuse logic through services when appropriate.
* Validate request data before processing.
* Write clean and maintainable code.

---

## Project Goal

Generate production-like backend code following MVC architecture, Express best practices, MongoDB/Mongoose conventions, and clean REST API design.
