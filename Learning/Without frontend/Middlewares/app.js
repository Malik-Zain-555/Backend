const express = require("express");
const app = express();
const { loggerMiddleware } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const AppError = require("./utils/appError");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin Logged-In Successfully!",
  });
});

app.all(/.*/, (req, res, next) => {
  const err = new AppError(
    `The url ${req.url} you are upto is not existed yet!`,
    404,
  );
  next(err)
});

app.use(errorHandler);

app.listen(3000);
