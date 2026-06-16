Read .github/copilot-instructions.md first.

Implement completely the use case "Consulter profil".

Project context:

* Express
* MongoDB
* Mongoose
* JWT authentication already implemented
* User model already exists
* authMiddleware already exists

Requirements:

1. Create profileController.js if it does not exist.

2. Create getProfile().

3. Retrieve authenticated user from MongoDB using:

req.user.id

4. Exclude:

motDePasse

5. Return:

{
success: true,
data: user
}

6. Return 404 if user not found.

7. Update profileRoutes.js.

8. Verify imports and exports.

9. Verify route registration.

10. Provide Postman tests.

Important:
Whenever a new controller, route, middleware, model, or service is added or modified, automatically update all impacted imports, exports, route registrations, and app.js integrations.
