const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database connnected!");
  } catch (error) {
    console.log("Database connection failed", error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
