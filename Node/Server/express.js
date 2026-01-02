const express = require("express");
const morgan = require("morgan");
const app = express();
const dbConnection = require("./config/db");
const usermodle = require("./models/user");

//Setting View Engine - EJS
app.set("view engine", "ejs");

//Built-In Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Thirdpary Middleware - Morgan
app.use(morgan("dev"));

//Custom Middleware
app.use((req, res, next) => {
  console.log("Middleware with", req.url);
  next();
});

// Get Method
app.get(
  "/",
  (req, res, next) => {
    //Inline Middleware
    console.log("Inline Middleware is working only on Home Page");
    next();
  },
  (req, res) => {
    res.render("index");
  }
);
app.get("/profile", (req, res) => {
  res.render("profile");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/users", async (req, res) => {
  const users = await usermodle.find();
  res.render("users", { users });
});
app.get("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  await usermodle.deleteOne({
    _id: id,
  });
  res.redirect("/users");
});

//Post Method
app.post("/sign-up-data", (req, res) => {
  const { username, email, password } = req.body;
  usermodle.create({
    username: username,
    email: email,
    password: password,
  });
  console.log(req.body);
  res.redirect("users");
});
app.post("/getting-form-data", (req, res) => {
  console.log(req.body);
  res.send("Data Received");
});
app.post("/users/update/:id", async (req, res) => {
  const id = req.params.id;
  const { username } = req.body;
  await usermodle.findOneAndUpdate(
    {
      _id: id,
    },
    {
      username: username,
    }
  );
  res.redirect("/users");
});

// PORT Listening
app.listen(3000, () => {
  console.log("Server Started");
});
