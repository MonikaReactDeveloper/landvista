import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  ClipboardList,
  Search,
  Filter,
  Calendar,
  User,
  Box,
  AlertCircle,
  FileText,
  ChevronDown,
  Info,
  XCircle,
  CheckCircle2
} from "lucide-react";

export default function AdminAudit() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    user: "",
    module: "",
    severity: ""
  });
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/audit"); // Pointing to the correct base route
      setLogs(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (sev) => {
    switch (sev) {
      case "Critical": return "bg-red-500 text-white";
      case "High": return "bg-orange-500 text-white";
      case "Medium": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesUser = !filter.user || log.userEmail?.toLowerCase().includes(filter.user.toLowerCase());
    const matchesModule = !filter.module || log.module === filter.module;
    const matchesSeverity = !filter.severity || log.severity === filter.severity;
    return matchesUser && matchesModule && matchesSeverity;
  });

  const handleExportCSV = () => {
    if (logs.length === 0) return;
    const csvRows = [];
    csvRows.push("Timestamp,User Email,Role,Action,Module,Severity,Details,IP Address,Status");
    
    filteredLogs.forEach(log => {
      csvRows.push([
        new Date(log.createdAt).toISOString(),
        log.userEmail,
        log.role,
        log.action,
        log.module,
        log.severity,
        `"${log.details?.replace(/"/g, '""')}"`,
        log.ipAddress,
        log.status
      ].join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `LandVista_AuditTrail_${new Date().toISOString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-landvista-blue/10 text-landvista-blue rounded-2xl">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-landvista-blue tracking-tight">Audit Trail</h1>
            <p className="text-landvista-grey text-xs font-bold uppercase tracking-widest mt-0.5">Immutable system activity logs</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleExportCSV}
            className="bg-landvista-blue text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
          >
            Export CSV
          </button>
          <button
            onClick={fetchLogs}
            className="bg-gray-100 hover:bg-gray-200 text-landvista-blue px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
          >
            Refresh Logs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-landvista-grey" />
          <input
            placeholder="Filter by user..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-landvista-blue/20 text-sm"
            onChange={(e) => setFilter({ ...filter, user: e.target.value })}
          />
        </div>
        <div className="relative">
          <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-landvista-grey" />
          <select
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-landvista-blue/20 text-sm appearance-none"
            onChange={(e) => setFilter({ ...filter, module: e.target.value })}
          >
            <option value="">All Modules</option>
            <option value="GEOGRAPHY">Geography</option>
            <option value="USERS">Users</option>
            <option value="INTELLIGENCE">Intelligence</option>
            <option value="AUTH">Auth</option>
          </select>
        </div>
        <div className="relative">
          <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-landvista-grey" />
          <select
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-landvista-blue/20 text-sm appearance-none"
            onChange={(e) => setFilter({ ...filter, severity: e.target.value })}
          >
            <option value="">All Severities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-landvista-grey" />
          <input
            type="date"
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-landvista-blue/20 text-sm"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Timestamp</th>
              <th className="px-6 py-4 text-[10px] font-black text-landvista-grey uppercase tracking-widest">User / Role</th>
              <th className="px-6 py-4 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Action / Module</th>
              <th className="px-6 py-4 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Severity</th>
              <th className="px-6 py-4 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Details</th>
              <th className="px-6 py-4 text-[10px] font-black text-landvista-grey uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredLogs.map(log => (
              <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-landvista-blue">{new Date(log.createdAt).toLocaleDateString()}</span>
                    <span className="text-landvista-grey">{new Date(log.createdAt).toLocaleTimeString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-landvista-blue">{log.userEmail}</span>
                    <span className="text-[10px] font-bold text-landvista-grey uppercase tracking-tighter">{log.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-landvista-blue tracking-tighter px-2 py-1 bg-blue-50 rounded-lg">{log.action}</span>
                    <span className="text-[10px] font-bold text-landvista-grey uppercase opacity-60 tracking-widest">{log.module}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getSeverityColor(log.severity)}`}>
                    {log.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-landvista-grey font-medium max-w-xs truncate">
                  {log.details}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedLog(log)}
                    className="p-2 hover:bg-landvista-blue/10 rounded-xl text-landvista-blue transition-colors"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-landvista-blue/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]">
            <div className="p-8 bg-landvista-blue text-white flex justify-between items-start">
              <div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-3 inline-block ${getSeverityColor(selectedLog.severity)}`}>
                  {selectedLog.severity} PRIORITY
                </span>
                <h2 className="text-3xl font-black">{selectedLog.action} Activity</h2>
                <p className="opacity-60 text-sm mt-1">Log ID: {selectedLog._id}</p>
              </div>
              <button onClick={() => setSelectedLog(null)} className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition">✕</button>
            </div>

            <div className="p-8 space-y-8">
              {/* Meta Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Network Info</p>
                  <p className="text-sm font-bold text-landvista-blue">IP: {selectedLog.ipAddress}</p>
                  <p className="text-[10px] text-landvista-grey mt-1 truncate">{selectedLog.device}</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Subject</p>
                  <p className="text-sm font-bold text-landvista-blue">{selectedLog.userEmail}</p>
                  <p className="text-[10px] font-bold text-landvista-grey uppercase tracking-widest">{selectedLog.role}</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Context</p>
                  <p className="text-sm font-bold text-landvista-blue">Module: {selectedLog.module}</p>
                  <p className="text-[10px] font-bold text-landvista-grey uppercase tracking-widest">Status: {selectedLog.status}</p>
                </div>
              </div>

              {/* Data Diff */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-landvista-grey uppercase tracking-[0.2em]">Data Transformation (Before vs After)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100/50">
                    <p className="text-[10px] font-black text-red-600 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <XCircle className="w-3 h-3" /> Original Value
                    </p>
                    <pre className="text-[10px] text-red-900 overflow-auto max-h-60 leading-relaxed">
                      {JSON.stringify(selectedLog.beforeValue, null, 2) || "NULL"}
                    </pre>
                  </div>
                  <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100/50">
                    <p className="text-[10px] font-black text-green-600 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" /> New Value
                    </p>
                    <pre className="text-[10px] text-green-900 overflow-auto max-h-60 leading-relaxed">
                      {JSON.stringify(selectedLog.afterValue, null, 2) || "NULL"}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
