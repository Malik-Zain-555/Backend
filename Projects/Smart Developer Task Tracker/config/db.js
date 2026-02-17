const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected!");
  } catch (error) {
    console.log("Getting this error: ", error.message);
    process.exit();
  }
};

module.exports = dbConnection;
