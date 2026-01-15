exports.loggerMiddleware = (req, res, next) => {
  if (req.body === "admin") {
    console.log("Users are not allowed! at", req.url);
    return;
  }
  console.log("Admin Logged In! at", req.url);
  next();
};
