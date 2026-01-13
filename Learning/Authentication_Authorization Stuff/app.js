const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

dotenv.config();
app.use(cookieParser());

app.get("/", (req, res) => {
  const token = jwt.sign(
    { email: "zainchamp5gmail.com" },
    process.env.JWT_SECRET
  );
  res.cookie("Token", token);
  res.send("Done");
});

app.get("/new", (req, res) => {
  // res.cookie("name","Zain Ali")
  res.send("New Page");
  console.log(req.cookies);
});

app.listen(process.env.PORT, () => {
  console.log("Server Started at", process.env.PORT);
});
