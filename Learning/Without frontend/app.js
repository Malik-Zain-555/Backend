const express = require("express");
const app = express();
const apiRoute = require("./routes/api.route");

app.get("/", (req, res) => {
  res.json("Working");
});

app.use("/api", apiRoute);

module.exports = app;
