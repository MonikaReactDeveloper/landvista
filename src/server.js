require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./config/passport'); // Load passport config
const connectDB = require('./config/db');
const app = express();

// 🛡️ SECURITY & PERFORMANCE MIDDLEWARE
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
}));
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN || true, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// 🚦 RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000,
  message: "Too many requests, please try again later."
});
app.use("/api", limiter);

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(passport.initialize());

// Global Request Logger
app.use((req, res, next) => {
  console.log(`\n------------------------------------------------`);
  console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = "********";
    console.log(`📦 BODY: ${JSON.stringify(safeBody)}`);
  }
  console.log(`------------------------------------------------\n`);
  next();
});

// serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// routes
const propertyRoutes = require('./routes/propertyRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const insightRoutes = require('./routes/insightRoutes');
const homeRoutes     = require('./modules/home/home.routes');
const advisoryRoutes = require('./modules/advisory/advisory.routes');
const policyRoutes       = require('./modules/policy/policy.routes');
const intelligenceRoutes = require('./modules/intelligence/intelligence.routes');
const authRoutes         = require('./modules/auth/auth.routes');
const investorRoutes     = require('./modules/investor/investor.routes');
const intelligenceHubRoutes = require('./modules/intelligence-hub/hub.routes');
const mandateRoutes       = require('./modules/mandates/mandate.routes');
const vaultRoutes         = require('./modules/document-vault/vault.routes');
const alertRoutes         = require('./modules/alerts/alert.routes');
const rbacRoutes          = require('./modules/rbac/rbac.routes');
const ndaRoutes           = require('./modules/nda/nda.routes');
const auditLogRoutes      = require('./modules/audit-logs/audit.routes');
const settingsRoutes      = require('./modules/settings/settings.routes');
const careerRoutes        = require('./modules/careers/career.routes');
const warRoomRoutes       = require('./modules/war-room/war-room.routes');
const zoneRoutes          = require('./modules/zones/zones.routes');
const engagementRoutes    = require('./modules/engagement/engagement.routes');
const analyticsRoutes     = require('./modules/analytics/analytics.routes');
const slaRoutes           = require('./modules/sla/sla.routes');

// ✅ Root API test route
app.get('/api', (req, res) => {
  res.send("API Working 🚀");
});

app.use('/api/properties', propertyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/home',     homeRoutes);
app.use('/api/advisory', advisoryRoutes);
app.use('/api/policy',        policyRoutes);
app.use('/api/intelligence',  intelligenceRoutes);
app.use('/api/auth',          authRoutes);
app.use('/api/investor',      investorRoutes);
app.use('/api/intelligence-hub', intelligenceHubRoutes);
app.use('/api/mandates',         mandateRoutes);
app.use('/api/documents',        vaultRoutes);
app.use('/api/alerts',           alertRoutes);
app.use('/api/rbac',             rbacRoutes);
app.use('/api/nda',              ndaRoutes);
app.use('/api/audit',            auditLogRoutes);
app.use('/api/settings',         settingsRoutes);
app.use('/api/careers',          careerRoutes);
app.use('/api/zones-sectors',    zoneRoutes);
app.use('/api/engagement',       engagementRoutes);
app.use('/api/analytics',        analyticsRoutes);
app.use('/api/sla',              slaRoutes);
app.use('/api/governance',       require('./modules/common/governance.routes'));


// Alias route for testing
const { getDocumentAccessLogs } = require('./modules/audit-logs/audit.controller');
const { authMiddleware } = require('./middleware/auth.middleware');
const { checkRole } = require('./middleware/role.middleware');
app.get('/api/document-access-logs', authMiddleware, checkRole("admin"), getDocumentAccessLogs);
app.use('/api/admin',            warRoomRoutes);

// 📊 Platform Stats (Admin Only)
const User = require('./modules/auth/auth.model');
const Mandate = require('./modules/mandates/mandate.model');
const VaultDocument = require('./modules/document-vault/vault.model');

app.get('/api/platform-stats', authMiddleware, checkRole("admin"), async (req, res) => {
  try {
    const [userCount, mandateCount, docCount, pendingUsers] = await Promise.all([
      User.countDocuments(),
      Mandate.countDocuments(),
      VaultDocument.countDocuments(),
      User.countDocuments({ status: "pending" })
    ]);

    res.json({
      users: userCount,
      mandates: mandateCount,
      documents: docCount,
      pending: pendingUsers,
      health: "Optimal"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// test route
app.get('/', (req, res) => {
  res.send("🚀 LandVista API Running");
});

// 🧪 Diagnostic Delete Route
app.delete('/api/test-delete/:id', async (req, res) => {
  res.status(200).json({ message: "DELETE method is reachable", id: req.params.id });
});

// 🚨 GLOBAL PRODUCTION ERROR HANDLER
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[ERROR] ${req.method} ${req.url}:`, err.message);
  
  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? "An internal server error occurred" 
      : err.message,
    code: err.code || "INTERNAL_ERROR"
  });
});

const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
  res.json({ status: "Active", time: new Date().toISOString() });
});

// Connect to MongoDB and start server
const { processSLAs } = require('./modules/sla/sla.service');

const startServer = async () => {
  try {
    await connectDB();
    
    // Start SLA Engine Loop (Runs every minute)
    setInterval(async () => {
      try {
        await processSLAs();
      } catch (err) {
        console.error("[SLA Engine Error]", err);
      }
    }, 60000);

    app.listen(PORT, () => {
      console.log(`\n🚀 LANDVISTA BACKEND CORE INITIALIZED ON PORT: ${PORT}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();