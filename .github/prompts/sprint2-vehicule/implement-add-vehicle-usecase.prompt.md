Read .github/copilot-instructions.md first.

Implement completely the use case "Ajouter véhicule".

Project context:

- Node.js
- Express
- MongoDB
- Mongoose
- MVC architecture
- JWT authentication already exists
- Admin role already exists

Business classes:

Marque
- nom

Vehicule
- modele
- prix
- carburant
- boiteVitesse
- kilometrage
- annee
- typeVehicule
- nombrePlaces
- consommation
- description
- statut

Relations:

Marque 1 ---- * Vehicule

Requirements:

1. Create model Marque.js
2. Create model Vehicule.js
3. Add mongoose references between Marque and Vehicule.
4. Create vehicleController.js
5. Create addVehicle() controller.
6. Create vehicleRoutes.js.
7. Add POST /api/vehicles route.
8. Protect route with authMiddleware.
9. Allow only admin users.
10. Update app.js.
11. Return clean JSON responses.
12. Do not break existing authentication system.

Before finishing:
- verify imports
- verify exports
- verify route registration in app.js
- list modified files
- provide Postman test examples