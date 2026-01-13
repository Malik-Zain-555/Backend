const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trime: true,
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    trime: true,
    unique: true,
    minlength: [8, "Email must be at least 8 characters long"],
  },
  password: {
    type: String,
    required: true,
    trime: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

const userModle = mongoose.model("users", userSchema);

module.exports = userModle;
