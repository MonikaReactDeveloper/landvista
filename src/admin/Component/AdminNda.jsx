import React, { useState } from "react";

export default function AdminNda() {
  const [ndaVersions, setNdaVersions] = useState([
    {
      id: 1,
      version: "v1.0",
      date: "2026-04-01",
      active: true,
      fileName: "nda_v1.pdf",
    },
  ]);

  const [logs] = useState([
    {
      user: "Investor A",
      version: "v1.0",
      date: "2026-04-10",
      status: "Accepted",
    },
  ]);

  const [newVersion, setNewVersion] = useState("");
  const [file, setFile] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // ✅ Upload NDA
  const uploadNDA = () => {
    if (!newVersion || !file) {
      alert("Version + file required");
      return;
    }

    const newNda = {
      id: Date.now(),
      version: newVersion,
      date: new Date().toISOString().split("T")[0],
      active: false,
      fileName: file.name,
    };

    setNdaVersions([newNda, ...ndaVersions]);
    setNewVersion("");
    setFile(null);
  };

  // ✅ Set Active
  const setActive = (id) => {
    const updated = ndaVersions.map((nda) => ({
      ...nda,
      active: nda.id === id,
    }));
    setNdaVersions(updated);
  };

  // ✅ Delete NDA
  const deleteNda = (id) => {
    if (!window.confirm("Delete this NDA?")) return;

    const updated = ndaVersions.filter((nda) => nda.id !== id);
    setNdaVersions(updated);
  };

  // ✅ Start Edit
  const startEdit = (nda) => {
    setEditId(nda.id);
    setEditValue(nda.version);
  };

  // ✅ Save Edit
  const saveEdit = (id) => {
    const updated = ndaVersions.map((nda) =>
      nda.id === id ? { ...nda, version: editValue } : nda
    );

    setNdaVersions(updated);
    setEditId(null);
    setEditValue("");
  };

  // ✅ Force Re-Acceptance
  const forceReaccept = () => {
    alert("All users must re-accept latest NDA");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-landvista-blue">
          NDA Management
        </h2>
        <p className="text-sm text-gray-500">
          Control NDA versions, track acceptance, and enforce compliance
        </p>
      </div>

      {/* UPLOAD */}
      <div className="bg-white p-5 rounded-lg space-y-3">
        <h3 className="font-semibold">Upload NDA</h3>

        <input
          type="text"
          placeholder="Version (v2.0)"
          value={newVersion}
          onChange={(e) => setNewVersion(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
        />

        <button
          onClick={uploadNDA}
          className="bg-landvista-blue text-white px-4 py-2"
        >
          Upload NDA
        </button>
      </div>

      {/* VERSION LIST */}
      <div className="bg-white p-5 rounded-lg">
        <h3 className="font-semibold mb-3">NDA Versions</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>Version</th>
              <th>File</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {ndaVersions.map((nda) => (
              <tr key={nda.id} className="border-b">
                <td className="py-2">
                  {editId === nda.id ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border p-1 text-sm"
                    />
                  ) : (
                    nda.version
                  )}
                </td>

                <td>{nda.fileName}</td>
                <td>{nda.date}</td>

                <td>
                  {nda.active ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    "Inactive"
                  )}
                </td>

                <td className="space-x-2">

                  {/* EDIT */}
                  {editId === nda.id ? (
                    <button
                      onClick={() => saveEdit(nda.id)}
                      className="bg-landvista-blue text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(nda)}
                      className="bg-landvista-blue text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}

                  {/* ACTIVATE */}
                  {!nda.active && (
                    <button
                      onClick={() => setActive(nda.id)}
                      className="bg-landvista-blue text-white px-3 py-1 rounded"
                    >
                      Activate
                    </button>
                  )}

                  {/* DELETE */}
                  <button
                    onClick={() => deleteNda(nda.id)}
                    className="bg-landvista-blue text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORCE */}
      <div className="bg-white p-5 rounded-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Force Re-Acceptance</h3>
          <p className="text-sm text-gray-500">
            Require all users to accept latest NDA
          </p>
        </div>

        <button
          onClick={forceReaccept}
          className="bg-landvista-blue text-white px-4 py-2"
        >
          Force
        </button>
      </div>

      {/* LOGS */}
      <div className="bg-white p-5 rounded-lg">
        <h3 className="font-semibold mb-3">NDA Logs</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>User</th>
              <th>Version</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{log.user}</td>
                <td>{log.version}</td>
                <td>{log.date}</td>
                <td className="text-green-600">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}