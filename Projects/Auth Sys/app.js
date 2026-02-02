const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");
const appRouter = require("./routes/app.routes");
const cookieParser = require("cookie-parser");
const roleMiddleware = require("./middlewares/roleMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");

app.use(cookieParser());

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "working" });
});

app.use("/auth", authRouter);
app.use("/app", appRouter);

app.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.render("adminDashboard");
});

module.exports = app;
