// import express from "express";
// import authRoutes from "../modules/auth/auth.routes.js";

// const router = express.Router();

// router.use("/auth", authRoutes);

// export default router;

import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import serviceRoutes from "./serviceRoutes.js";
import insightRoutes from "./insightRoutes.js";
import homeRoutes from "../modules/home/home.routes.js";

const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// ✅ mount auth routes
router.use("/auth", authRoutes);
router.use("/services", serviceRoutes);
router.use("/insights", insightRoutes);
router.use("/home", homeRoutes);

// ✅ Admin route
// 🔥 ADMIN
router.get(
  "/admin",
  authMiddleware,
  checkRole("admin"),
  (req, res) => {
    res.send("Admin Dashboard 🚀");
  }
);

// 💰 INVESTOR
router.get(
  "/investor",
  authMiddleware,
  checkRole("investor"),
  (req, res) => {
    res.send("Investor Dashboard 💰");
  }
);


// 🚀 FOUNDER
router.get(
  "/founder",
  authMiddleware,
  checkRole("founder"),
  (req, res) => {
    res.send("Founder Dashboard 🚀");
  }
);

// 📊 ANALYST
router.get(
  "/analyst",
  authMiddleware,
  checkRole("analyst"),
  (req, res) => {
    res.send("Analyst Dashboard 📊");
  }
);

// ✅ Logged-in user route
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({ user: req.user });
  }
);

// ✅ Total users route
// router.get(
//   "/total-users",
//   authMiddleware,
//   getTotalUsers
// );


export default router;