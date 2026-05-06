const User = require("./auth.model");
const OTP = require("../../models/otp.model");
const Mandate = require("../mandates/mandate.model");
const auditService = require("../audit-logs/audit.service");
const logger = require("../../utils/logger");
const { generateToken, generateRefreshToken, verifyRefreshToken } = require("../../utils/jwt");
const sendEmail = require("../../utils/sendEmail");
const alertService = require("../alerts/alert.service");

// Helper: Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * 🌍 REGISTRATION
 */
const register = async (req, res) => {
  try {
    const { 
      name, email, password, role, phone, 
      organization, designation, sourceChannel, 
      investorType, capitalBand, geography, purpose,
      ticketSize, interestArea, expectedTimeline, engagementType
    } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        console.log(`[AUTH] Registration failed: User already exists (${email})`);
        return res.status(400).json({ message: "User already exists" });
    }

    const otpCode = generateOTP();
    console.log(`[AUTH] Generating Registration OTP for: ${email} -> ${otpCode}`);
    
    // Save Registration OTP to dedicated model
    try {
        await OTP.findOneAndUpdate(
            { email, type: 'registration' },
            { otp: otpCode, createdAt: new Date() },
            { upsert: true, new: true }
        );
    } catch (otpErr) {
        console.error(`[AUTH] Failed to save Registration OTP to DB:`, otpErr);
        return res.status(500).json({ message: "Internal security error during registration." });
    }

    const newUser = new User({
      fullName: name,
      email,
      password,
      role: role || "user",
      status: "pending", 
      isVerified: false,      
      phone,
      organization,
      designation,
      sourceChannel,
      investorType,
      capitalBand,
      geography,
      purpose,
      ticketSize,
      interestArea,
      expectedTimeline,
      engagementType
    });

    await newUser.save();
    console.log(`\n🚀 [REGISTRATION OTP] ${email}: ${otpCode}\n`);

    await alertService.createAlertLog({
      category: "Access",
      severity: "Warning",
      title: "New Access Request",
      message: `User ${email} from ${organization} has requested platform access.`,
      metadata: { userId: newUser._id, email, organization }
    });

    try {
      await sendEmail({
        email,
        subject: "Verify Your LandVista Account",
        message: `Your registration OTP is ${otpCode}. It expires in 5 minutes.`,
        otp: otpCode,
      });
      res.status(201).json({ message: "OTP sent for email verification", email });
    } catch (err) {
      res.status(201).json({ message: "User created. Failed to send email.", email });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ VERIFY REGISTRATION OTP
 */
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp, type: 'registration' });
    
    if (!otpRecord) return res.status(400).json({ message: "Invalid or expired OTP" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();
    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: "Email verified successfully. Please wait for admin approval." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔒 CORE LOGIN LOGIC (Shared)
 */
const performLogin = async (req, res, isAdminLogin = false) => {
  try {
    const { email, password } = req.body;
    console.log(`\n[AUTH] Login attempt initiated for: ${email} (Portal: ${isAdminLogin ? 'ADMIN' : 'USER'})`);
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`[AUTH] User not found: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🛡️ ROLE ENFORCEMENT
    if (isAdminLogin && user.role !== "admin") {
        console.log(`[AUTH] Admin portal access denied for: ${email}`);
        return res.status(403).json({ message: "Access denied. Administrative privileges required." });
    }
    
    if (!isAdminLogin && user.role === "admin") {
        console.log(`[AUTH] Administrator redirected from user portal: ${email}`);
        return res.status(403).json({ message: "Administrators must use the dedicated Admin Console for security reasons." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`[AUTH] Password mismatch for: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      console.log(`[AUTH] Account not verified: ${email}`);
      if (user.role === 'admin') {
        user.isVerified = true;
        await user.save();
        console.log(`[AUTH] Auto-verified administrative identity: ${email}`);
      } else {
        return res.status(403).json({ message: "Email not verified", requiresVerification: true });
      }
    }

    // Check Approval Status
    if (user.status === "rejected" || user.status === "suspended") {
        return res.status(403).json({ message: `Your account status is: ${user.status}. Access restricted.` });
    }

    if (user.status === "pending" && user.ndaStatus === "not_signed") {
        console.log(`[AUTH] Login blocked. Status: pending for: ${email}`);
        return res.status(403).json({ message: "Your account is in the institutional review queue. Please wait for qualification." });
    }

    // Two-Step Verification Required
    const otpCode = generateOTP();
    console.log(`[AUTH] Generating 2FA OTP for: ${email}`);
    
    try {
        await OTP.findOneAndUpdate(
            { email, type: 'login' },
            { otp: otpCode, createdAt: new Date() },
            { upsert: true, new: true }
        );
    } catch (otpErr) {
        console.error(`[AUTH] Failed to save OTP to DB:`, otpErr);
        return res.status(500).json({ message: "Internal security error. Please try again." });
    }

    console.log("\n" + "=".repeat(50));
    console.log(`🔓 [LANDVISTA SECURE ${isAdminLogin ? 'ADMIN' : 'USER'} CODE]`);
    console.log("=".repeat(50));
    console.log(`USER: ${email}`);
    console.log(`CODE: ${otpCode}`);
    console.log("=".repeat(50) + "\n");

    try {
      await sendEmail({
        email,
        subject: `LandVista ${isAdminLogin ? 'Admin ' : ''}Login: 2-Step Verification`,
        message: `Your login verification code is ${otpCode}.`,
        otp: otpCode,
      });
      console.log(`[AUTH] 2FA Email sent to: ${email}`);
    } catch (e) {
      console.error("[AUTH] 2FA Email Failed (Check .env credentials):", e.message);
    }

    res.json({ 
        success: true, 
        message: "2-Step verification required. OTP sent.", 
        requires2FA: true,
        email 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🛡️ USER LOGIN
 */
const login = async (req, res) => {
    return performLogin(req, res, false);
};

/**
 * 🛡️ LOGIN STEP 2: VERIFY 2FA OTP & ISSUE TOKENS
 */
const verifyLoginOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const otpRecord = await OTP.findOne({ email, otp, type: 'login' });

        if (!otpRecord) return res.status(400).json({ success: false, message: "Invalid or expired verification code" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate Tokens
        const accessToken = generateToken({ id: user._id, email: user.email, role: user.role, tokenVersion: user.tokenVersion });
        const refreshToken = generateRefreshToken({ id: user._id, tokenVersion: user.tokenVersion });

        // Save Refresh Token and Tracking Data
        user.refreshTokens.push(refreshToken);
        user.lastLoginAt = new Date();
        
        // Track Institutional Login History
        user.loginHistory.push({
            ip: req.ip || req.connection.remoteAddress,
            device: req.headers['user-agent']?.split('(')[1]?.split(')')[0] || 'Unknown',
            browser: req.headers['user-agent']?.split(' ').pop() || 'Unknown',
            loggedAt: new Date()
        });

        // 📝 Log institutional login in Audit Logs
        await auditService.createLog({
            user: user._id,
            action: "LOGIN",
            module: "AUTH",
            details: `Secure login from IP: ${req.ip}`,
            ip: req.ip
        });

        await user.save();
        await OTP.deleteOne({ _id: otpRecord._id });

        res.json({
            success: true,
            token: accessToken,
            refreshToken,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                status: user.status,
                ndaStatus: user.ndaStatus
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 🔄 REFRESH TOKEN ROTATION
 */
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded.id);

        if (!user || !user.refreshTokens.includes(refreshToken)) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Generate new pair
        const newAccessToken = generateToken({ id: user._id, email: user.email, role: user.role, tokenVersion: user.tokenVersion });
        const newRefreshToken = generateRefreshToken({ id: user._id, tokenVersion: user.tokenVersion });

        // Rotate
        user.refreshTokens = user.refreshTokens.filter(t => t !== refreshToken);
        user.refreshTokens.push(newRefreshToken);
        await user.save();

        res.json({ token: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        res.status(403).json({ message: "Session expired" });
    }
};

/**
 * 🚪 LOGOUT
 */
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const user = await User.findOne({ refreshTokens: refreshToken });
        if (user) {
            user.refreshTokens = user.refreshTokens.filter(t => t !== refreshToken);
            await user.save();

            // 📝 Audit Log Logout
            await auditService.createLog({
                user: user._id,
                action: "LOGOUT",
                module: "AUTH",
                details: `User logged out from IP: ${req.ip}`,
                ip: req.ip
            });
        }
        res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 🛠 ADMIN LOGIN
 */
const adminLogin = async (req, res) => {
    return performLogin(req, res, true);
};

const adminRegister = async (req, res) => {
  try {
    const { name, fullName, email, password, adminSecret } = req.body;
    const serverSecret = process.env.ADMIN_SECRET || "ADMIN123";
    if (adminSecret !== serverSecret) return res.status(403).json({ message: "Invalid admin secret" });

    let user = await User.findOne({ email });
    
    if (user) {
        console.log(`[AUTH] Promoting existing account to ADMIN: ${email}`);
        user.role = "admin";
        user.status = "approved";
        user.isVerified = true;
        if (password) user.password = password;
        await user.save();
        return res.status(200).json({ message: "Existing account successfully promoted to Administrative status." });
    }

    user = new User({
      fullName: name || fullName,
      email,
      password,
      role: "admin",
      status: "approved", 
      isVerified: true,    
    });

    await user.save();
    res.status(201).json({ message: "Administrative identity established successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -refreshTokens");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).select("-password -refreshTokens");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleUserAction = async (req, res) => {
    try {
        const { userId, action, reason, tier } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        console.log(`[ADMIN ACTION] ${action} performed on user ${user.email} by ${req.user.email}`);

        switch (action) {
            case "approve":
                user.status = "approved";
                user.tier = tier || "Tier 1";
                user.isVerified = true;
                user.reviewedBy = req.user.id;
                user.reviewedAt = new Date();
                user.approvedAt = new Date();
                user.approvedBy = req.user.id;
                break;

            case "qualify_nda":
                user.ndaStatus = "pending";
                user.reviewedBy = req.user.id;
                user.reviewedAt = new Date();
                // Optionally set tier to Tier 1 as they are now an 'Applicant'
                user.tier = tier || "Tier 1"; 
                break;

            case "hold":
                user.status = "pending";
                user.internalNotes = reason || "Profile put on hold for further review.";
                user.reviewedBy = req.user.id;
                user.reviewedAt = new Date();
                break;

            case "reject":
                user.status = "rejected";
                user.rejectionReason = reason;
                user.reviewedBy = req.user.id;
                user.reviewedAt = new Date();
                break;

            case "suspend":
                user.status = "suspended";
                user.suspensionReason = reason;
                break;

            case "map_mandate":
                if (!reason) return res.status(400).json({ message: "Mandate ID required in 'reason' field" });
                const mandate = await Mandate.findById(reason);
                if (!mandate) return res.status(404).json({ message: "Mandate not found" });
                
                // Link investor to mandate
                mandate.investor = user._id;
                await mandate.save();
                
                // Promote user to Tier 3 (Mandate Participant) if they are approved
                if (user.status === "approved") {
                    user.tier = "Tier 3";
                }
                break;

            default:
                return res.status(400).json({ message: "Invalid action type" });
        }

        await user.save();

        // 📝 Create Administrative Audit Log
        await auditService.createLog({
            user: req.user.id,
            action: `USER_${action.toUpperCase()}`,
            module: "ADMIN",
            details: `Admin ${req.user.email} performed ${action} on ${user.email}. Reason: ${reason || 'N/A'}`,
            ip: req.ip
        });

        res.status(200).json({ message: `User action '${action}' completed successfully`, user });
    } catch (error) {
        console.error(`[ADMIN ACTION ERROR]`, error);
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔑 FORGOT PASSWORD: STEP 1 (REQUEST OTP)
 */
const requestForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // For security, we don't reveal if a user exists. But in this institutional app, 
      // clear feedback is often preferred. We'll stick to a slightly vague but helpful message.
      return res.status(404).json({ message: "No account associated with this institutional email." });
    }

    const otpCode = generateOTP();
    console.log(`[AUTH] Forgot Password OTP for: ${email} -> ${otpCode}`);

    // Save Password Reset OTP
    await OTP.findOneAndUpdate(
      { email, type: 'password_reset' },
      { otp: otpCode, createdAt: new Date() },
      { upsert: true, new: true }
    );

    try {
      await sendEmail({
        email,
        subject: "Password Reset Request: LandVista Security",
        message: `You requested a password reset. Your verification code is ${otpCode}. It expires in 5 minutes.`,
        otp: otpCode,
      });
      res.json({ success: true, message: "Security code sent to your institutional email." });
    } catch (err) {
      console.error("[AUTH] Forgot Pass Email Failed:", err.message);
      res.status(500).json({ message: "Failed to send security code. Please contact IT support." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔑 FORGOT PASSWORD: STEP 2 (VERIFY OTP & RESET)
 */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpRecord = await OTP.findOne({ email, otp, type: 'password_reset' });
    if (!otpRecord) return res.status(400).json({ message: "Invalid or expired security code." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update Password
    user.password = newPassword;
    // Clear all refresh tokens to force re-login on all devices
    user.refreshTokens = [];
    await user.save();

    // Clean up OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // 📝 Audit Log
    await auditService.createLog({
      user: user._id,
      action: "PASSWORD_RESET",
      module: "AUTH",
      details: "Password successfully reset via OTP verification",
      ip: req.ip
    });

    res.json({ success: true, message: "Password updated successfully. You may now log in with your new credentials." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  verifyOTP,
  login,
  verifyLoginOTP,
  refreshToken,
  logout,
  adminLogin,
  adminRegister,
  getMe,
  getAllUsers,
  handleUserAction,
  deleteUser,
  requestForgotPassword,
  resetPassword
};