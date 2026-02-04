const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const resetPasswordEmail = require("../utils/passwordResetEmail");

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/resetPassword", (req, res) => {
  res.render("resetPassword");
});
router.get("/resettoken", (req, res) => {
  res.render("resettoken");
});
router.get("/changepassword", (req, res) => {
  res.render("changepassword");
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

const resetUrl = "http://localhost:3000/auth/resettoken";

router.post("/resetpassword", async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({
      message: "User isn't existed!.",
    });
  }

  const rt = crypto.randomBytes(5).toString("hex");

  user.resetToken = rt;
  await user.save();

  await resetPasswordEmail(
    email,
    "Reset Your Password",
    `<h2>Copy Reset token below: </h2>
    <h2>${rt}</h2>
    <a href="${resetUrl}">Reset Password</a>`,
  );

  res.send("Reset Mail Sended!");
});

router.post("/resettoken", async (req, res) => {
  const { token } = req.body;
  const user = await userModel.findOne({ resetToken: token });

  if (!user)
    return res.json({
      message: "Your reset isn't existed or wrong.",
    });

  res.render("changepassword", { token });
});

router.post("/changepassword", async (req, res) => {
  const { token, newpassword } = req.body;

  const user = await userModel.findOne({
    resetToken: token,
  });

  user.password = newpassword;
  user.resetToken = undefined;

  await user.save();

  res.redirect("/auth/login");
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
