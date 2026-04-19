const errorMiddleware = (err, req, res, next) => {
  console.error(err); // later replace with logger

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: err.status || "error",
    message: err.message || "Something went wrong",
  });
};

module.exports = errorMiddleware;
