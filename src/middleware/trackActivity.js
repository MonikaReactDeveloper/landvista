const logger = require("../utils/logger");

const trackActivity = (moduleName) => {
  return async (req, res, next) => {
    // Only track GET requests (viewing activity)
    // POST/PUT/DELETE are usually logged in their respective controllers
    if (req.method === "GET" && req.user) {
      // Log the activity after the response is finished (non-blocking)
      res.on("finish", async () => {
        if (res.statusCode < 400) {
          await logger.info(req, {
            action: "VIEW",
            module: moduleName,
            details: `User viewed ${moduleName} content: ${req.originalUrl}`,
            severity: "Low"
          });
        }
      });
    }
    next();
  };
};

module.exports = trackActivity;
