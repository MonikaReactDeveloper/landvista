const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.JWT_SECRET || "supersecretkey";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshkey";

const generateToken = (payload) => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "30d" }); // Extended for persistent sessions
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_SECRET);
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken
};