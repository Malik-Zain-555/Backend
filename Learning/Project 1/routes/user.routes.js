const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get Method
router.get("/", (req, res) => {
  res.render("dashboard");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/community", async (req, res) => {
  const users = await userModel.find();
  res.render("community", { users });
});

// Post Method
router.post(
  "/register",
  [
    body("username").trim().isLength({ min: 3 }),
    body("email").isEmail().isLength({ min: 8 }),
    body("password").trim().isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: errors.array(), message: "Invalid data" });
    }
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    await userModel.create({
      username: username,
      email: email,
      password: hashpassword,
    });

    res.redirect("community");
  }
);
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(400).json({
      message: "username and password is missmatched!",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "username and password are missmatched!",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.redirect("/user");
});

module.exports = router;
