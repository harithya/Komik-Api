const errorHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.status).json({
    message: err.message,
  });
};

module.exports = errorHandler;
