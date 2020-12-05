// custom express error middleware for handling errors
const errorHandler = (err, req, res, next) => {
  // log to console for development
  console.log(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server error',
  });
};

module.exports = errorHandler;
