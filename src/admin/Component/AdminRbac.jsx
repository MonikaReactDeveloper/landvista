import React, { useState, useEffect } from "react";

const defaultRoles = ["Super Admin", "Admin", "Analyst", "Legal"];

const modules = [
  "Users",
  "RBAC",
  "NDA",
  "Intelligence",
  "Zones",
  "Vault",
  "Pipeline",
  "Alerts",
];

const actions = ["view", "create", "edit", "delete", "approve"];

const tiers = ["Visitor", "Applicant", "Investor", "Mandate"];

export default function AdminRbac() {
  const [roles, setRoles] = useState(defaultRoles);
  const [selectedRole, setSelectedRole] = useState(defaultRoles[0]);
  const [permissions, setPermissions] = useState({});
  const [tierAccess, setTierAccess] = useState({});
  const [routes, setRoutes] = useState({});
  const [newRole, setNewRole] = useState("");

  const [pendingRequests, setPendingRequests] = useState([]);

  // LOAD PERMISSIONS
  useEffect(() => {
    const saved = localStorage.getItem(`rbac_${selectedRole}`);
    if (saved) {
      const data = JSON.parse(saved);
      setPermissions(data.permissions || {});
      setTierAccess(data.tiers || {});
      setRoutes(data.routes || {});
    } else {
      setPermissions({});
      setTierAccess({});
      setRoutes({});
    }
  }, [selectedRole]);

  // TOGGLE PERMISSION
  const togglePermission = (module, action) => {
    const key = `${module}_${action}`;
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // TOGGLE TIER
  const toggleTier = (tier) => {
    setTierAccess((prev) => ({
      ...prev,
      [tier]: !prev[tier],
    }));
  };

  // TOGGLE ROUTE
  const toggleRoute = (module) => {
    setRoutes((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  // SAVE (goes to approval queue)
  const handleSave = () => {
    const request = {
      role: selectedRole,
      permissions,
      tiers: tierAccess,
      routes,
      id: Date.now(),
    };

    setPendingRequests((prev) => [...prev, request]);
    alert("Change sent for approval");
  };

  // APPROVE
  const approveRequest = (req) => {
    localStorage.setItem(`rbac_${req.role}`, JSON.stringify(req));

    setPendingRequests((prev) =>
      prev.filter((r) => r.id !== req.id)
    );
  };

  // REJECT
  const rejectRequest = (id) => {
    setPendingRequests((prev) =>
      prev.filter((r) => r.id !== id)
    );
  };

  // ADD ROLE
  const addRole = () => {
    if (!newRole) return;
    setRoles([...roles, newRole]);
    setNewRole("");
  };

  // DELETE ROLE
  const deleteRole = (role) => {
    setRoles(roles.filter((r) => r !== role));
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6">

      {/* LEFT: ROLES */}
      <div className="lg:col-span-3 bg-white p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Roles</h3>

        <div className="space-y-2">
          {roles.map((role) => (
            <div
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`p-2 rounded cursor-pointer flex justify-between
                ${selectedRole === role && "bg-landvista-blue text-white"}
              `}
            >
              {role}
              <button
                onClick={() => deleteRole(role)}
                className="bg-landvista-blue text-white px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="New role"
            className="border p-1 w-full text-sm"
          />
          <button onClick={addRole} className="bg-blue-500 text-white px-2">
            +
          </button>
        </div>
      </div>

      {/* CENTER: PERMISSIONS */}
      <div className="lg:col-span-6 bg-white p-4 rounded-lg overflow-auto">
        <h3 className="font-semibold mb-3">
          Permissions — {selectedRole}
        </h3>

        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th>Module</th>
              {actions.map((a) => (
                <th key={a}>{a}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {modules.map((module) => (
              <tr key={module}>
                <td className="p-2">{module}</td>

                {actions.map((action) => {
                  const key = `${module}_${action}`;
                  return (
                    <td key={key} className="text-center">
                      <input
                        type="checkbox"
                        checked={permissions[key] || false}
                        onChange={() =>
                          togglePermission(module, action)
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT: TIER + ROUTES */}
      <div className="lg:col-span-3 space-y-4">

        {/* TIERS */}
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Tier Visibility</h3>

          {tiers.map((tier) => (
            <label key={tier} className="block text-sm">
              <input
                type="checkbox"
                checked={tierAccess[tier] || false}
                onChange={() => toggleTier(tier)}
              />{" "}
              {tier}
            </label>
          ))}
        </div>

        {/* ROUTES */}
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Module Access</h3>

          {modules.map((m) => (
            <label key={m} className="block text-sm">
              <input
                type="checkbox"
                checked={routes[m] || false}
                onChange={() => toggleRoute(m)}
              />{" "}
              {m}
            </label>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-landvista-blue text-white py-2 rounded"
        >
          Save (Send for Approval)
        </button>
      </div>

      {/* APPROVAL QUEUE */}
      <div className="lg:col-span-12 bg-white p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Approval Requests</h3>

        {pendingRequests.length === 0 && (
          <p className="text-sm text-gray-500">No pending requests</p>
        )}

        {pendingRequests.map((req) => (
          <div
            key={req.id}
            className="flex justify-between items-center border p-2 mb-2"
          >
            <span>{req.role}</span>

            <div className="flex gap-2">
              <button
                onClick={() => approveRequest(req)}
                className="bg-landvista-blue text-white px-2"
              >
                Approve
              </button>

              <button
                onClick={() => rejectRequest(req.id)}
                className="bg-landvista-blue text-white px-2"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}