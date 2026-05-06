const express = require("express");
const { 
  register, 
  login, 
  verifyLoginOTP,
  refreshToken,
  logout,
  adminLogin, 
  adminRegister, 
  verifyOTP, 
  getMe,
  getAllUsers,
  handleUserAction,
  deleteUser,
  requestForgotPassword,
  resetPassword
} = require("./auth.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");

const router = express.Router();

// 🔑 AUTH ENDPOINTS
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/verify-login-otp", verifyLoginOTP);
router.post("/forgot-password", requestForgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

// 🌐 GOOGLE OAUTH
const passport = require('passport');
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login?error=OAuthFailed', session: false }),
    (req, res) => {
        // Redirect logic similar to BINJWA pattern but adapted for this system
        // We'll use the controller's callback logic if we want to be clean
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3001'}/login?oauth_success=true&token=${req.user.id}`);
    }
);

// 🛡️ ADMIN AUTH
router.post("/admin-register", adminRegister);
router.post("/admin-login", adminLogin);

// 👤 USER PROFILE
router.get("/me", authMiddleware, getMe);

// 🛠️ ADMIN USER MANAGEMENT
router.get("/me/all", authMiddleware, checkRole("admin"), getAllUsers);
router.post("/admin/user-action", authMiddleware, checkRole("admin"), handleUserAction);
router.delete("/admin/users/:id", authMiddleware, checkRole("admin"), deleteUser);

module.exports = router;