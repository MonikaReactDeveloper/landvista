const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      default: "user",
    },
    subRole: { 
      type: String, 
      enum: ["SUPER_ADMIN", "OPS", "LEGAL", "ANALYST"], 
      default: null 
    },
    phone: { type: String, default: "" },
    organization: { type: String, default: "" },
    designation: { type: String, default: "" },
    sourceChannel: { type: String, default: "" },
    
    // INVESTOR SPECIFIC INFO
    investorType: { type: String, default: "" },
    capitalBand: { type: String, default: "" },
    ticketSize: { type: String, default: "" }, // institutional qualification
    geography: { type: String, default: "" },
    interestArea: { type: String, default: "" }, // zone/sector interest
    purpose: { type: String, default: "" },
    expectedTimeline: { type: String, default: "" },
    engagementType: { type: String, default: "" },
    
    // RBAC & ACCESS MANAGEMENT
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected", "suspended"], 
      default: "pending" 
    },
    tier: { 
      type: String, 
      enum: ["Tier 0", "Tier 1", "Tier 2", "Tier 3", "Tier 4"], 
      default: "Tier 1" 
    },
    tokenVersion: {
      type: Number,
      default: 0
    },

    ndaStatus: { 
      type: String, 
      enum: ["not_signed", "pending", "signed"], 
      default: "not_signed" 
    },

    // TRACKING & AUDIT
    loginHistory: [{
      ip: String,
      device: String,
      browser: String,
      loggedAt: { type: Date, default: Date.now }
    }],
    lastLoginAt: Date,

    // ADMIN ACTIONS
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,
    rejectionReason: { type: String, default: "" },
    suspensionReason: { type: String, default: "" },
    internalNotes: { type: String, default: "" },
    intentScore: { type: Number, default: 0 },
    engagementScore: { type: Number, default: 0 }, // institutional engagement
    slaBreaches: { type: Number, default: 0 }, // performance tracking
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,

    
    googleId: String,
    provider: { type: String, default: 'local' },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isTwoFactorEnabled: {
      type: Boolean,
      default: true, // Default to true for institutional security
    },
    refreshTokens: [String],
    otp: {
      code: String,
      expiresAt: Date,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);


module.exports = User;
