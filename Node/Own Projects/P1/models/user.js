const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username must be unique"],
    required: [true, "Username must be required"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username cannot exceed 20 characters"],
    trim: true,
  },
  email: {
    type: String,
    unique: [true, "mail must be unique"],
    required: [true, "mail must be required"],
    minlength: [12, "mail must be at least 12 characters long"],
    trim: true,
  },
  password: {
    type: String,
    minlength: [5, "Password must be at least 5 characters long"],
    required: [true, "Password must be required"],
    trim: true,
  },
});

const userModle = mongoose.model("user", userSchema);

module.exports = userModle;
