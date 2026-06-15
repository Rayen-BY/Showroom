Read .github/copilot-instructions.md first.

I am debugging the user registration feature.

Context:

* Node.js
* Express
* MongoDB
* Mongoose
* bcryptjs

Current error:

HTTP 500

Response:

{
"success": false,
"message": "Illegal arguments: undefined, number"
}

Tasks:

1. Analyze authController.js.
2. Analyze authRoutes.js.
3. Analyze User.js.
4. Explain the root cause of the error.
5. Identify which variable is undefined.
6. Verify if req.body is received correctly.
7. Verify if bcrypt.hash() receives valid arguments.
8. Suggest the smallest possible fix.
9. Explain why the error occurs.
10. Do not rewrite the whole project.

Show:

* Problem
* Root cause
* Fix
* Explanation
