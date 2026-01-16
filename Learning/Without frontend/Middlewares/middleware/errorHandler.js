exports.errorHandler = (err, req, res, next) => {
  const statuscode = err.status || 500;
  res.status(statuscode).json({
    success: false,
    message: err.message || "Internal Server Error!",
  });
};
