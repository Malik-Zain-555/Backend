const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.send("Inside user stuff.\n Folder construction done");
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/normal", (req, res) => {
  res.render("normalPage");
});
router.get("/normallogout", (req, res) => {
  res.render("normalLogout");
});
router.get("/admin", (req, res) => {
  res.render("adminPage");
});
router.get("/adminlogout", (req, res) => {
  res.render("adminLogout");
});
router.get("/adminlogin", (req, res) => {
  res.render("adminLogin");
});

router.post("/login",loginUser)
router.post("/adminlogin", registerUser)
router.post("/register", registerUser)

module.exports = router;
