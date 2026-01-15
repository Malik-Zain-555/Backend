const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    task: String,
  },
  { timestamps: true }
);

const tasks = mongoose.model("tasks", taskSchema);

module.exports = tasks;
