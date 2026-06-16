Read .github/copilot-instructions.md first.

Create an authentication middleware.

Requirements:

* Read Authorization header.
* Format expected:

Bearer <token>

* Verify token using JWT_SECRET.
* Attach decoded user to req.user.
* Return 401 if token missing.
* Return 401 if token invalid.

Use CommonJS syntax.

Generate only the middleware code.
