import React, { useState } from "react";

const alertTypes = [
  "SLA Breach",
  "NDA Reminder",
  "Access Approval",
  "System Alert",
];

export default function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "SLA Breach",
      message: "Deal #102 exceeded SLA",
      time: new Date().toLocaleString(),
      read: false,
    },
  ]);

  const [rules, setRules] = useState({
    sla: true,
    nda: true,
    access: true,
    system: true,
  });

  const [newAlert, setNewAlert] = useState({
    type: "SLA Breach",
    message: "",
  });

  // CREATE ALERT (Manual / Testing)
  const createAlert = () => {
    if (!newAlert.message) return;

    const alert = {
      id: Date.now(),
      ...newAlert,
      time: new Date().toLocaleString(),
      read: false,
    };

    setAlerts([alert, ...alerts]);
    setNewAlert({ type: "SLA Breach", message: "" });
  };

  // MARK READ
  const markRead = (id) => {
    setAlerts(
      alerts.map((a) =>
        a.id === id ? { ...a, read: true } : a
      )
    );
  };

  // DELETE
  const deleteAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  // TOGGLE RULE
  const toggleRule = (key) => {
    setRules({ ...rules, [key]: !rules[key] });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-landvista-blue">
          Alerts & Notifications
        </h2>
        <p className="text-sm text-gray-500">
          Monitor system events and configure alert rules
        </p>
      </div>

      {/* RULE CONFIG */}
      <div className="bg-white p-5 rounded-lg">
        <h3 className="font-semibold mb-3">Notification Rules</h3>

        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <label>
            <input
              type="checkbox"
              checked={rules.sla}
              onChange={() => toggleRule("sla")}
            />{" "}
            SLA Alerts
          </label>

          <label>
            <input
              type="checkbox"
              checked={rules.nda}
              onChange={() => toggleRule("nda")}
            />{" "}
            NDA Reminders
          </label>

          <label>
            <input
              type="checkbox"
              checked={rules.access}
              onChange={() => toggleRule("access")}
            />{" "}
            Access Approval
          </label>

          <label>
            <input
              type="checkbox"
              checked={rules.system}
              onChange={() => toggleRule("system")}
            />{" "}
            System Alerts
          </label>
        </div>
      </div>

      {/* CREATE ALERT */}
      <div className="bg-white p-5 rounded-lg">
        <h3 className="font-semibold mb-3">Trigger Alert (Test)</h3>

        <div className="grid md:grid-cols-3 gap-3">
          <select
            value={newAlert.type}
            onChange={(e) =>
              setNewAlert({ ...newAlert, type: e.target.value })
            }
            className="border p-2"
          >
            {alertTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <input
            placeholder="Alert message"
            value={newAlert.message}
            onChange={(e) =>
              setNewAlert({ ...newAlert, message: e.target.value })
            }
            className="border p-2"
          />

          <button
            onClick={createAlert}
            className="bg-landvista-blue text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>

      {/* ALERT LIST */}
      <div className="bg-white p-5 rounded-lg">
        <h3 className="font-semibold mb-3">Alerts</h3>

        {alerts.length === 0 && (
          <p className="text-sm text-gray-500">
            No alerts available
          </p>
        )}

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border p-4 mb-2 rounded flex justify-between items-start ${
              alert.read ? "opacity-60" : ""
            }`}
          >
            <div>
              <h4 className="font-semibold text-sm">
                {alert.type}
              </h4>
              <p className="text-sm text-gray-600">
                {alert.message}
              </p>
              <span className="text-xs text-gray-400">
                {alert.time}
              </span>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              {!alert.read && (
                <button
                  onClick={() => markRead(alert.id)}
                  className="bg-landvista-blue text-white px-3 py-1 rounded"
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() => deleteAlert(alert.id)}
                className="bg-landvista-blue text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}