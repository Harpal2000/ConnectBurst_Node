const catchError = (statusCode, errorType, errorMessage) => {
  const error = {
    statusCode,
    errorType,
    message: errorMessage,
    success: false,
  };
  res.status(statusCode).json(error);
};
const throwError = (res, statusCode, errorType, errorMessage) => {
  const error = {
    statusCode,
    errorType,
    message: errorMessage,
    success: false,
  };
  res.status(statusCode).json(error);
};

const sendSuccess = (res, message, data = null, status = 200) => {
  if (status === undefined) {
    status = 200;
  }
  return res.status(status).json({
    status: "success",
    message: message || "Success result",
    data,
  });
};

export { throwError, sendSuccess,catchError };
