const AppError = require("../utils/AppError");

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const message = `Duplicate field value: ${value[0]}. Please use another value.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  if (!req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
  res.status(500).json({
    status: "error",
    message: "Something gone wrong",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode | 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  }
  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if ((error.code = 11000)) error = handleDuplicateFieldsDB(error);
    sendErrorProd(error, req, res);
  }
};
