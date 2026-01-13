const mongoose = require("mongoose");

function connect2DB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected!");
  });
}

module.exports = connect2DB;
