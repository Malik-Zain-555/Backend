const jwt = require("jsonwebtoken");

const roleMiddleware = (requiredUser) => {
  return (req, res, next) => {
    if (req.user.role !== requiredUser) {
      return res.send("Access Denied!");
    }
    next()
  };
};

module.exports = roleMiddleware;