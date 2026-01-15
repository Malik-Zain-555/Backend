const express = require("express");
const router = express.Router();
const { createTask } = require("../controllers/api.controller");

router.get("/tasks", (req, res) => {
  res.json("all tasks are showed here.");
});

router.post("/create", createTask);

module.exports = router;
