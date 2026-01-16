const express = require("express");
const app = express();
const { loggerMiddleware } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(loggerMiddleware);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin Logged-In Successfully!",
  });
});

app.listen(3000);
