// middleware/monitorMiddleware.js

export const requestMonitor = (req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl} | Time: ${new Date().toLocaleString()}`);
  next();
};
