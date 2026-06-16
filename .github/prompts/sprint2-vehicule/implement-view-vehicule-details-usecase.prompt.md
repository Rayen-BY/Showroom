Read .github/copilot-instructions.md first.

Implement completely the use case "Consulter fiche véhicule".

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

1. Create getVehiculeById() controller.

2. Route:

GET /:id

3. Public route.

4. Validate ObjectId.

5. Return 404 if vehicle not found.

6. Populate marque.

7. Return:

{
success: true,
data: vehicle
}

8. Update vehicleRoutes.js.

9. Verify imports and exports.

10. Provide Postman tests.

Generate production-ready code.
