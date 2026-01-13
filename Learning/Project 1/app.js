const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes");
const driveRouter = require("./routes/drive.routes");
const dotenv = require("dotenv");
const connect2DB = require("./config/db");
const cookie = require("cookie-parser");
dotenv.config();
connect2DB();
app.use(cookie());
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/drive", driveRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Started at", process.env.PORT);
});
