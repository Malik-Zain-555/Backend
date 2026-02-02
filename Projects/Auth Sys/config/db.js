const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database Connected!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
