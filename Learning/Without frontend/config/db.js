const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const dbConnection = mongoose.connect(MONGO_URI).then(() => {
  console.log("DB connected!");
});

module.exports = dbConnection;
