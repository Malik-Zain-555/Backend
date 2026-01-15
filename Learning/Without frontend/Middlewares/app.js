const express = require("express");
const app = express();
const { loggerMiddleware } = require("./middleware/logger");

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "Logger Worked!" });
});

app.listen(3000);
