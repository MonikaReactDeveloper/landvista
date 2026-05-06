const Role = require("../modules/rbac/role.model");

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Administrative access required" });
    }
    next();
  };
};

const checkPermission = (requiredModuleOrAction) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      
      // Super Admin / Founder bypass
      if (user.role === "admin" || user.role === "founder") {
        return next();
      }

      // Check dynamic roles
      const roleDoc = await Role.findOne({ name: user.role, isActive: true });
      if (!roleDoc) {
        return res.status(403).json({ message: "Access Denied: Role not found or inactive." });
      }

      const hasModuleAccess = roleDoc.allowedModules.includes(requiredModuleOrAction);
      const hasActionAccess = roleDoc.allowedActions.includes(requiredModuleOrAction);

      if (!hasModuleAccess && !hasActionAccess) {
        return res.status(403).json({ 
          message: `Permission Denied: ${requiredModuleOrAction} required for this action.` 
        });
      }
      
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error during permission check." });
    }
  };
};

module.exports = {
  checkRole,
  checkPermission,
};