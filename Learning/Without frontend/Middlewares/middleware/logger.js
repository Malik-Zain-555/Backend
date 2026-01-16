exports.loggerMiddleware = (req, res, next) => {
  const apikey = req.headers["x-api-key"];
  if (apikey !== "admin") {
    const error = new Error("Unauthorized user");
    error.status = 401;
    return next(error);
  }
  console.log("Admin allowed at", req.url);
  next();
};
