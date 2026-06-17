Read .github/copilot-instructions.md first.

Implement completely the use case "Modifier profil".

Project context:

* Express
* MongoDB
* Mongoose
* JWT authentication already implemented
* User model already exists
* authMiddleware already exists
* profileController.js already exists

Requirements:

1. Create updateProfile().

2. Route:

PUT /api/profile

3. JWT required.

4. Update only:

* nom
* prenom
* telephone
* photoProfil
* emailNotifications

5. Do NOT allow updating:

* email
* role
* motDePasse

6. Return updated user.

7. Exclude motDePasse from response.

8. Return 404 if user not found.

9. Update profileRoutes.js.

10. Verify imports and exports.

11. Provide Postman tests.

Important:
Whenever a file is modified, automatically update all impacted imports, exports, and route registrations.
