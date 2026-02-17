const express = require("express");
const userModel = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });
  const userid = user.id;

  if (!user) {
    return res.json({
      success: false,
      message: "User not found!",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.json({
      success: false,
      message: "Invalid credentials!",
    });
  }

  const token = jwt.sign({ userid, username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.redirect("/app/dashboard");
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({ username });

  if (user) {
    return res.json({
      success: false,
      message: "user already existed!",
    });
  }

  await userModel.create({
    username,
    email,
    password,
  });

  res.redirect("/auth/login");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});

module.exports = router;
