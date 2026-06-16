Read .github/copilot-instructions.md first.

Implement completely the use case "Modifier véhicule".

Project context:

* Express
* MongoDB
* Mongoose
* JWT authentication
* Admin authorization
* Multer image upload already implemented

Existing:

* Vehicule model
* vehicleController.js
* vehicleRoutes.js

Requirements:

1. Create updateVehicule() controller.

2. Route:

PUT /:id

3. Only admin users can update.

4. Allow updating:

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

5. Allow replacing uploaded images.

6. Return updated vehicle.

7. Handle:

* invalid id
* vehicle not found

8. Update vehicleRoutes.js.

9. Verify imports and exports.

10. Provide Postman tests.

Generate production-ready code.
