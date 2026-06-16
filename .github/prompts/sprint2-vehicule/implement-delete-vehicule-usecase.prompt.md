Read .github/copilot-instructions.md first.

Implement completely the use case "Supprimer véhicule".

Project context:

* Express
* MongoDB
* Mongoose
* JWT authentication
* Admin authorization

Existing:

* Vehicule model
* vehicleController.js
* vehicleRoutes.js

Requirements:

1. Create deleteVehicule() controller.

2. Route:

DELETE /:id

3. Only admin users can delete vehicles.

4. Validate ObjectId.

5. Return 404 if vehicle does not exist.

6. Delete uploaded image files from uploads/vehicules if they exist.

7. Return:

{
success: true,
message: "Véhicule supprimé avec succès"
}

8. Update vehicleRoutes.js.

9. Verify imports and exports.

10. Provide Postman tests.

Generate production-ready code.
