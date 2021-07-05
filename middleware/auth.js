const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).send("You dont have the permission for that");
  try {
    jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    return res.status(400).send("Invalid token");
  }

  next();
}

module.exports = auth;
