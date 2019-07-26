const errorHandler = (err, req, res, next) => {
  if (err.code && !isNaN(err.code)) {
    // custom  error
    let errorData = { message: err.message };

    if (err.errors) {
      errorData.errors = err.errors;
    }
    return res.status(err.code).json(errorData);
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "unauthorized" });
  }

  // default 500 server error
  return res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
