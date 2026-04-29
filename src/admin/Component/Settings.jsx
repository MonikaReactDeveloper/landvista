import React, { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("sla");

  const [sla, setSla] = useState({
    pipeline: 24,
    approval: 12,
  });

  const [tiers, setTiers] = useState([
    { id: 1, name: "Visitor", access: "Public" },
    { id: 2, name: "Investor", access: "Restricted" },
  ]);

  const [alerts, setAlerts] = useState({
    sla: true,
    nda: true,
    access: true,
  });

  const [emailTemplates, setEmailTemplates] = useState({
    nda: "Please accept NDA to continue.",
    approval: "Your access has been approved.",
  });

  const [system, setSystem] = useState({
    maintenance: false,
    registrations: true,
  });

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-landvista-blue">
          System Settings
        </h2>
        <p className="text-sm text-gray-500">
          Configure platform rules and global behavior
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b pb-2 text-sm">
        {["sla", "tiers", "alerts", "emails", "system"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize ${
              activeTab === tab
                ? "text-landvista-blue font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SLA SETTINGS */}
      {activeTab === "sla" && (
        <div className="bg-white p-5 rounded-lg space-y-4">
          <h3 className="font-semibold">SLA Thresholds</h3>

          <input
            type="number"
            value={sla.pipeline}
            onChange={(e) =>
              setSla({ ...sla, pipeline: e.target.value })
            }
            className="border p-2 w-full"
            placeholder="Pipeline SLA (hrs)"
          />

          <input
            type="number"
            value={sla.approval}
            onChange={(e) =>
              setSla({ ...sla, approval: e.target.value })
            }
            className="border p-2 w-full"
            placeholder="Approval SLA (hrs)"
          />
        </div>
      )}

      {/* ACCESS TIERS */}
      {activeTab === "tiers" && (
        <div className="bg-white p-5 rounded-lg space-y-4">
          <h3 className="font-semibold">Access Tiers</h3>

          {tiers.map((tier) => (
            <div key={tier.id} className="flex gap-3">
              <input
                value={tier.name}
                onChange={(e) =>
                  setTiers(
                    tiers.map((t) =>
                      t.id === tier.id
                        ? { ...t, name: e.target.value }
                        : t
                    )
                  )
                }
                className="border p-2"
              />

              <input
                value={tier.access}
                onChange={(e) =>
                  setTiers(
                    tiers.map((t) =>
                      t.id === tier.id
                        ? { ...t, access: e.target.value }
                        : t
                    )
                  )
                }
                className="border p-2"
              />
            </div>
          ))}

          <button
            onClick={() =>
              setTiers([
                ...tiers,
                { id: Date.now(), name: "", access: "" },
              ])
            }
            className="bg-landvista-blue text-white px-4 py-2 rounded"
          >
            + Add Tier
          </button>
        </div>
      )}

      {/* ALERT RULES */}
      {activeTab === "alerts" && (
        <div className="bg-white p-5 rounded-lg space-y-3">
          <h3 className="font-semibold">Alert Rules</h3>

          {Object.keys(alerts).map((key) => (
            <label key={key} className="block">
              <input
                type="checkbox"
                checked={alerts[key]}
                onChange={() =>
                  setAlerts({
                    ...alerts,
                    [key]: !alerts[key],
                  })
                }
              />{" "}
              {key.toUpperCase()} Alerts
            </label>
          ))}
        </div>
      )}

      {/* EMAIL TEMPLATES */}
      {activeTab === "emails" && (
        <div className="bg-white p-5 rounded-lg space-y-4">
          <h3 className="font-semibold">Email Templates</h3>

          {Object.keys(emailTemplates).map((key) => (
            <textarea
              key={key}
              value={emailTemplates[key]}
              onChange={(e) =>
                setEmailTemplates({
                  ...emailTemplates,
                  [key]: e.target.value,
                })
              }
              className="border p-2 w-full"
              rows={3}
            />
          ))}
        </div>
      )}

      {/* SYSTEM CONFIG */}
      {activeTab === "system" && (
        <div className="bg-white p-5 rounded-lg space-y-3">
          <h3 className="font-semibold">System Config</h3>

          <label>
            <input
              type="checkbox"
              checked={system.maintenance}
              onChange={() =>
                setSystem({
                  ...system,
                  maintenance: !system.maintenance,
                })
              }
            />{" "}
            Maintenance Mode
          </label>

          <label>
            <input
              type="checkbox"
              checked={system.registrations}
              onChange={() =>
                setSystem({
                  ...system,
                  registrations: !system.registrations,
                })
              }
            />{" "}
            Allow Registrations
          </label>
        </div>
      )}

      {/* SAVE BUTTON */}
      <div>
        <button className="bg-landvista-blue text-white px-6 py-2 rounded">
          Save Settings
        </button>
      </div>

    </div>
  );
}