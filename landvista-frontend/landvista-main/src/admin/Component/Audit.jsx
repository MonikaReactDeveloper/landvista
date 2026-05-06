import React, { useState } from "react";

const logTypes = [
  "Login",
  "Logout",
  "NDA",
  "Document",
  "Admin",
  "Override",
];

export default function Audit() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      user: "Investor A",
      type: "Login",
      action: "User logged in",
      module: "Auth",
      time: "2026-04-27 10:30",
    },
    {
      id: 2,
      user: "Admin",
      type: "Override",
      action: "Deal overridden",
      module: "Pipeline",
      time: "2026-04-27 11:00",
    },
  ]);

  const [filters, setFilters] = useState({
    user: "",
    type: "",
    date: "",
  });

  // FILTER LOGS
  const filteredLogs = logs.filter((log) => {
    return (
      (!filters.user || log.user.includes(filters.user)) &&
      (!filters.type || log.type === filters.type) &&
      (!filters.date || log.time.includes(filters.date))
    );
  });

  // EXPORT CSV
  const exportCSV = () => {
    const rows = [
      ["User", "Type", "Action", "Module", "Time"],
      ...filteredLogs.map((l) => [
        l.user,
        l.type,
        l.action,
        l.module,
        l.time,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "audit_logs.csv");
    link.click();
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-landvista-blue">
            Audit Logs
          </h2>
          <p className="text-sm text-gray-500">
            Track all system activities and user actions
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="bg-landvista-blue text-white px-4 py-2 text-sm"
        >
          Export CSV
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-lg grid md:grid-cols-4 gap-3">

        <input
          placeholder="Search user"
          value={filters.user}
          onChange={(e) =>
            setFilters({ ...filters, user: e.target.value })
          }
          className="border p-2"
        />

        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
          className="border p-2"
        >
          <option value="">All Types</option>
          {logTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters({ ...filters, date: e.target.value })
          }
          className="border p-2"
        />

        <button
          onClick={() =>
            setFilters({ user: "", type: "", date: "" })
          }
          className="bg-landvista-blue text-white px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-5 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>User</th>
              <th>Type</th>
              <th>Action</th>
              <th>Module</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b">
                <td className="py-2">{log.user}</td>
                <td>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      log.type === "Override"
                        ? "bg-red-100 text-red-600"
                        : log.type === "Admin"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100"
                    }`}
                  >
                    {log.type}
                  </span>
                </td>
                <td>{log.action}</td>
                <td>{log.module}</td>
                <td className="text-xs text-gray-500">
                  {log.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLogs.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">
            No logs found
          </p>
        )}
      </div>

    </div>
  );
}