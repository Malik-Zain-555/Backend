const express = require("express");
const app = express();
const note = require("./routes/note.route");

app.set("view engine","ejs")

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/notes", note);

module.exports = app;
