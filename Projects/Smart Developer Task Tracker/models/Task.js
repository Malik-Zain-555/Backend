const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "blocked", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    deadline: {
      type: Date,
    },
    dependencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
        default: null,
      },
    ],
    progressPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    createdAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
