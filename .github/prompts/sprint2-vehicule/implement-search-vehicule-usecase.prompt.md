Read .github/copilot-instructions.md first.

Implement completely the use case "Rechercher véhicule".

Project context:

* Express
* MongoDB
* Mongoose

Existing:

* Vehicule model
* Marque model
* vehicleController.js
* vehicleRoutes.js

Requirements:

1. Create searchVehicules() controller.

2. Route:

GET /

3. Public route (no authentication).

4. Support optional filters:

* marque
* modele
* carburant
* boiteVitesse
* prixMin
* prixMax
* annee

5. Populate marque name.

6. Return:

{
success: true,
count: number,
data: [...]
}

7. Ignore missing filters.

8. Use efficient MongoDB queries.

9. Update vehicleRoutes.js.

10. Verify imports and exports.

11. Provide Postman tests.

Generate production-ready code.
