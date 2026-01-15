const taskModle = require("../modle/tasks");
const { validationResult } = require("express-validator");
exports.createTask = async (req, res) => {
  const { task } = req.body;

  if (!task || task.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "task is required or your task lenght must be greater than 3 letters.",
    });
  }

  await taskModle.create({
    task,
  });
  res.status(201).json({
    success:true,
    message:"New task created!"
  })
  // res.send("new task created!");
};
