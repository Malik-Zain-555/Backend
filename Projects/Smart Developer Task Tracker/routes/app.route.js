const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlwares/auth.middlware");
const userModel = require("../models/User");
const taskModel = require("../models/Task");
const jwt = require("jsonwebtoken");

router.get("/dashboard", authMiddleware, async (req, res) => {
  const token = req.cookies.token;
  const decode = jwt.decode(token);
  const { userid } = decode;
  const tasks = await taskModel.find({ userid });
  res.render("dashboard", { tasks });
});
router.get("/profile", authMiddleware, (req, res) => {
  res.render("profile");
});
router.get("/tasks", authMiddleware, (req, res) => {
  res.render("tasks");
});
router.post("/newTask", authMiddleware, async (req, res) => {
  const { title, description, priority, dependencies, deadline } = req.body;

  const token = req.cookies.token;
  const decode = jwt.decode(token);
  const { userid } = decode;

  if (!dependencies) {
    await taskModel.create({
      userid,
      taskTitle: title,
      description,
      priority,
      deadline,
    });

    return res.redirect("/app/tasks");
  }

  const dependetTask = await taskModel.findOne({ taskTitle: dependencies });
  
  await taskModel.create({
    userid,
    taskTitle: title,
    description,
    priority,
    deadline,
    dependencies: dependetTask.id,
  });

  res.redirect("/app/tasks");
});

module.exports = router;
