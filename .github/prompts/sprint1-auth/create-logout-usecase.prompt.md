Read .github/copilot-instructions.md first.

Implement the logout use case.

Project context:

* Express
* MongoDB
* JWT authentication already implemented
* authController.js already contains register and login
* authMiddleware.js already exists

Requirements:

1. Add logout() function in authController.js.

2. Create route:

POST /logout

inside authRoutes.js.

3. Protect the route with authMiddleware.

4. No database update.

5. No JWT blacklist.

6. No token storage.

7. Simply verify the JWT through authMiddleware and return:

{
"success": true,
"message": "Déconnexion réussie"
}

8. Add all required imports.

9. Verify authRoutes.js integration.

10. Verify app.js integration.

11. Provide Postman test examples.

12. Follow the existing project architecture and coding style.

Important:
Whenever a new controller, route, middleware, model, or service is added or modified, automatically update all required imports, exports, route registrations, and app.js integrations if necessary.

