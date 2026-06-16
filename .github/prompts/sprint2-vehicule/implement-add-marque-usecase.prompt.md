Read .github/copilot-instructions.md first.

Implement completely the use case "Ajouter marque".

Project context:

* Express
* MongoDB
* Mongoose
* JWT authentication exists
* authMiddleware exists
* adminMiddleware exists
* Marque model already exists

Requirements:

1. Create controllers/marqueController.js

2. Create function:

   * addMarque()

3. Validate:

   * nom is required
   * nom must be unique

4. Create routes/marqueRoutes.js

5. Create route:

POST /

6. Protect route with:

   * authMiddleware
   * adminMiddleware

7. Register route in app.js:

app.use('/api/marques', marqueRoutes);

8. Return JSON responses.

9. Before finishing:

   * verify imports
   * verify exports
   * verify app.js registration
   * provide Postman tests

Generate production-ready code.
