const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");
const healthRoutes = require("./routes/health.routes");

app.set("view engine", "ejs");

app.use(express.static("public"));

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/health", healthRoutes);

module.exports = app;
