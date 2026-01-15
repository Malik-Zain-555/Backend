const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connection.on("connected", () => {
  console.log("MongoDB event: connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB event: disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB event: error ->", err.message);
});

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
