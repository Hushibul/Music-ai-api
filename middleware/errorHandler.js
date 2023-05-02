const errorHandler = (err, req, res, next) => {
  console.log("Middleware handling Error");

  const errStatus = err.statusCode || 500;

  const errMessage = err.message || "Internal Server Error";

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
};

module.exports = errorHandler;
