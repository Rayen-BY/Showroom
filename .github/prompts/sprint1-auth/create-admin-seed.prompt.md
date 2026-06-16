Read .github/copilot-instructions.md first.

Problem:

Currently the register endpoint always creates users with:

role: "utilisateur"

This is correct for security reasons.

However, the project has no official way to create the first administrator account.

Implement a secure admin seed script.

Requirements:

1. Create:

backend/scripts/createAdmin.js

2. The script must:

- connect to MongoDB
- check if admin@test.com already exists
- if not exists:
    - hash password with bcrypt
    - create user
    - role = "admin"
- if exists:
    - display message "Admin already exists"

3. Admin data:

email: admin@test.com
password: Admin2026
nom: Admin
prenom: System
role: admin

4. Reuse existing User model.

5. Reuse existing MongoDB connection.

6. Add npm script inside package.json:

"create-admin": "node scripts/createAdmin.js"

7. Display clear console messages.

8. Do not modify register endpoint.

9. Do not allow role to be passed from public registration.

10. Before finishing:
- verify imports
- verify exports
- verify MongoDB connection
- provide execution command

Generate production-ready code.