export const setAuth = (data) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

export const getAuth = () => {
  const auth = localStorage.getItem("auth");
  
  // 🔄 Institutional Session Migration (Legacy to Consolidated)
  if (!auth) {
    const legacyUser = localStorage.getItem("currentUser");
    const legacyToken = localStorage.getItem("token");
    const legacyRole = localStorage.getItem("role");

    if (legacyUser && legacyToken) {
      const migratedData = {
        token: legacyToken,
        role: legacyRole || "user",
        user: JSON.parse(legacyUser)
      };
      localStorage.setItem("auth", JSON.stringify(migratedData));
      return migratedData;
    }
    return null;
  }

  try {
    return auth ? JSON.parse(auth) : null;
  } catch (e) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("refreshToken");
};

// --- ADMIN AUTH ---

export const setAdminAuth = (data) => {
  localStorage.setItem("admin_auth", JSON.stringify(data));
};

export const getAdminAuth = () => {
  const auth = localStorage.getItem("admin_auth");
  try {
    return auth ? JSON.parse(auth) : null;
  } catch (e) {
    return null;
  }
};

export const adminLogout = () => {
  localStorage.removeItem("admin_auth");
};

export const isAdmin = () => {
  const auth = getAdminAuth();
  return auth?.role === 'admin';
};