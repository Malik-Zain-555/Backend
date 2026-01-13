const userModel = require("../models/user");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(404).json({
      message: "User Not available.",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      message: "Email and password missmatched.",
    });
  }
  console.log(user);
  res.redirect("normal");
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);
  const newUserCreation = await userModel.create({
    username: username,
    email: email,
    password: hashpassword,
  });
  console.log(newUserCreation);
  res.redirect("login");
};

exports.adminlogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(404).json({
      message: "User Not available.",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      message: "Email and password missmatched.",
    });
  }
  console.log(user);
  res.redirect("adminPage");
};
