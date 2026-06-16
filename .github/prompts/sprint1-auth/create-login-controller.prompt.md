Create a login controller for a Node.js Express MongoDB application.

Requirements:

Input:

* email
* motDePasse

Logic:

1. Find user by email.
2. If user does not exist return 401.
3. Compare password using bcryptjs.
4. If password is invalid return 401.
5. Generate JWT token using JWT_SECRET.
6. Return:

{
success: true,
token,
user: {
id,
nom,
prenom,
email,
role
}
}

Use async/await.
Use CommonJS syntax.
Generate only the controller function.
