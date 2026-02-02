const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/dashboard",authMiddleware, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
