

const LoggerMW = (req, res, next) => {
      console.log(`[ Request Method: ${req.method}, Request URL: ${req.originalUrl}]`);
      next();
}

export default LoggerMW
