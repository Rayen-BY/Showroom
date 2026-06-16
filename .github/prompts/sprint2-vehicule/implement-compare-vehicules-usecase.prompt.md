Read .github/copilot-instructions.md first.

Implement completely the use case "Comparer véhicules".

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

1. Create compareVehicules() controller.

2. Route:

GET /comparer

3. Public route.

4. Accept query parameter:

ids=id1,id2,id3

5. Minimum:
   2 vehicles

6. Maximum:
   3 vehicles

7. Validate ObjectIds.

8. Populate marque.

9. Return:

{
success: true,
count: number,
data: [...]
}

10. Return 400 if less than 2 vehicles.

11. Return 400 if more than 3 vehicles.

12. Update vehicleRoutes.js.

13. Verify imports and exports.

14. Provide Postman tests.

Generate production-ready code.
