const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  task: String,
});

const tasks = mongoose.model("taskModle", taskSchema);

module.exports = tasks;
