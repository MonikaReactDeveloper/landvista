const { verifyToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const User = require("../modules/auth/auth.model");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    if (user.status === "suspended") {
      return res.status(403).json({ message: "Your institutional access has been suspended." });
    }

    if (decoded.tokenVersion !== undefined && user.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({ message: "Session expired. Your access privileges were updated. Please log in again." });
    }

    // Attach full user object to request
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Session invalid or expired" });
  }

};

module.exports = {
  authMiddleware,
};