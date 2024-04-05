const catchError = (statusCode, errorType, errorMessage) => {
  const error = {
    statusCode,
    errorType,
    message: errorMessage,
    success: false,
  };
  res.status(statusCode).json(error);
};
const throwError = (res, status, errorType, errorMessage) => {
  const error = {
    status,
    errorType,
    message: errorMessage,
    success: false,
  };
  res.status(status).json(error);
};

const sendSuccess = (res, message, data = null, status = 200) => {
  if (status === undefined) {
    status = 200;
  }
  return res.status(status).json({
    status: 200,
    success: true,
    message: message || "Success result",
    data,
  });
};

export { throwError, sendSuccess, catchError };
