const mongooes = require("mongoose");
const userSchema = new mongooes.Schema({
  username: String,
  email: String,
  password: String,
});

const userModle = mongooes.model("user", userSchema);

module.exports = userModle;
