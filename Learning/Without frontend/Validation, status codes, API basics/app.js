const express = require("express");
const app = express();
const apiRoute = require("./routes/api.route");
const { body } = require("express-validator");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Working");
});

app.use("/api", apiRoute);

module.exports = app;
