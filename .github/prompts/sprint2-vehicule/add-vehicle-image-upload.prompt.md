Read .github/copilot-instructions.md first.

Enhance the "Ajouter véhicule" use case by supporting image uploads.

Project context:

* Node.js
* Express
* MongoDB
* Mongoose
* Multer already installed
* Vehicule model contains:

images: [String]

Requirements:

1. Create folder:

backend/uploads/vehicules

2. Create middleware:

middlewares/uploadVehiculeMiddleware.js

3. Configure Multer:

* destination:
  uploads/vehicules

* filename:
  timestamp-originalname

4. Accept multiple images.

Maximum:
5 images

5. Update vehicleRoutes.js

Use:

upload.array('images', 5)

6. Update vehicleController.js

Store uploaded image paths inside:

images: [String]

Example:

[
"/uploads/vehicules/171856-photo1.jpg",
"/uploads/vehicules/171856-photo2.jpg"
]

7. Keep JWT authentication.

8. Keep admin authorization.

9. Provide Postman testing instructions.

10. Verify all imports and exports.

Generate production-ready code.
