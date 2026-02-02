const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.redirect("/auth/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid credentials!",
    });
  }

  if (!user.isVerified) {
    return res.status(403).json({
      message: "Please verify your email first",
    });
  }

  const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
  });

  res.redirect("/app/dashboard");
});

router.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;

  const existingUser = await userModel.findOne({ email, role });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "user already exists!",
    });
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await userModel.create({
    email,
    password,
    role,
    verificationToken,
  });

  const verifyUrl = `http://localhost:3000/auth/verify/${verificationToken}`;

  await sendEmail(
    email,
    "Verify Your Email",
    `<h2>Click below to verify:</h2>
     <a href="${verifyUrl}">Verify Email</a>`,
  );

  res.send("Verification email sent!");
});

router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  const user = await userModel.findOne({ verificationToken: token });

  if (!user) {
    return res.send("Invalid or expired token.");
  }

  user.isVerified = true;
  user.verificationToken = undefined;

  await user.save();

  res.send("Email verified successfully! You can now login.");
});

module.exports = router;
