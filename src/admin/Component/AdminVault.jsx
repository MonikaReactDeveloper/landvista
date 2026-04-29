import React, { useState } from "react";

export default function AdminVault() {

  const [documents, setDocuments] = useState([]);
  const [logs, setLogs] = useState([]);

  const initialForm = {
    title: "",
    category: "",

    zone_id: "",
    sector_id: "",

    file: null,
    file_path: "",
    file_type: "",
    file_size: "",

    access_level: "Investor",

    version: 1,
    watermark_enabled: true,
    download_allowed: false,

    expiry_date: "",
    uploaded_by: "admin",

    document_status: "Active",
  };

  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // FILE CHANGE
  const handleFile = (file) => {
    if (!file) return;

    setForm({
      ...form,
      file,
      file_path: URL.createObjectURL(file),
      file_type: file.type,
      file_size: (file.size / 1024).toFixed(2) + " KB",
    });
  };

  // SAVE
  const handleSubmit = () => {
    if (!form.title || !form.file) {
      return alert("Title + File required");
    }

    if (editId) {
      setDocuments(
        documents.map((d) =>
          d.id === editId ? { ...form, id: editId } : d
        )
      );
    } else {
      setDocuments([{ ...form, id: Date.now() }, ...documents]);
    }

    resetForm();
  };

  // EDIT
  const handleEdit = (doc) => {
    setForm(doc);
    setEditId(doc.id);
  };

  // DELETE
  const handleDelete = (id) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  // ACCESS LOG
  const simulateAccess = (doc) => {
    setLogs([
      {
        user: "Investor A",
        document: doc.title,
        time: new Date().toLocaleString(),
      },
      ...logs,
    ]);
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">
        Document Vault
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ================= FORM ================= */}
        <div className="space-y-5">

          {/* BASIC */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">
              {editId ? "Edit Document" : "Upload Document"}
            </h3>

            <input className="input" placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            <input className="input" placeholder="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          {/* CLASSIFICATION */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">Classification</h3>

            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="Zone ID"
                name="zone_id"
                value={form.zone_id}
                onChange={handleChange}
              />

              <input className="input" placeholder="Sector ID"
                name="sector_id"
                value={form.sector_id}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FILE */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">File</h3>

            <input
              type="file"
              onChange={(e) => handleFile(e.target.files[0])}
              className="input"
            />

            {form.file && (
              <div className="text-xs text-gray-500">
                {form.file.name} • {form.file_size}
              </div>
            )}
          </div>

          {/* ACCESS CONTROL */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">Access Control</h3>

            <select className="input"
              name="access_level"
              value={form.access_level}
              onChange={handleChange}
            >
              <option>Visitor</option>
              <option>Applicant</option>
              <option>Investor</option>
              <option>Mandate</option>
            </select>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <label>
                <input type="checkbox"
                  name="watermark_enabled"
                  checked={form.watermark_enabled}
                  onChange={handleChange}
                /> Watermark
              </label>

              <label>
                <input type="checkbox"
                  name="download_allowed"
                  checked={form.download_allowed}
                  onChange={handleChange}
                /> Allow Download
              </label>
            </div>
          </div>

          {/* META */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">Metadata</h3>

            <div className="grid grid-cols-2 gap-3">
              <input type="number"
                name="version"
                value={form.version}
                onChange={handleChange}
                className="input"
              />

              <input type="date"
                name="expiry_date"
                value={form.expiry_date}
                onChange={handleChange}
                className="input"
              />
            </div>

            <select className="input"
              name="document_status"
              value={form.document_status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Archived</option>
              <option>Expired</option>
            </select>
          </div>

          {/* ACTION */}
          <div className="flex gap-3">
            <button onClick={handleSubmit} className="btn-primary w-full">
              {editId ? "Update" : "Upload"}
            </button>

            {editId && (
              <button onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            )}
          </div>

        </div>

        {/* ================= LIST ================= */}
        <div className="space-y-4">

          {/* DOCUMENTS */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-medium mb-3">Documents</h3>

            {documents.map((doc) => (
              <div key={doc.id} className="border p-3 mb-2 rounded">

                <div className="flex justify-between">
                  <h4 className="font-semibold">{doc.title}</h4>
                  <span className="text-xs">{doc.document_status}</span>
                </div>

                <p className="text-xs text-gray-500">
                  {doc.file_type} • {doc.file_size}
                </p>

                <p className="text-xs text-gray-500">
                  Access: {doc.access_level}
                </p>

                <div className="flex gap-2 mt-2 text-xs">
                  <button onClick={() => handleEdit(doc)} className="btn-secondary">Edit</button>
                  <button onClick={() => handleDelete(doc.id)} className="btn-secondary">Delete</button>
                  <button onClick={() => simulateAccess(doc)} className="btn-primary">Access</button>
                </div>

              </div>
            ))}
          </div>

          {/* LOGS */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-medium mb-3">Access Logs</h3>

            {logs.map((log, i) => (
              <div key={i} className="text-xs border p-2 mb-1 flex justify-between">
                <span>{log.user}</span>
                <span>{log.document}</span>
                <span>{log.time}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}