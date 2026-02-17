const express = require("express");
const authRouter = require("./routes/auth.route");
const appRouter = require("./routes/app.route");
const cookieParser = require("cookie-parser")
const app = express();

app.use(cookieParser());
app.set("view engine", "ejs");
app.set(express.static, "public");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/auth", authRouter);
app.use("/app", appRouter);

module.exports = app;
