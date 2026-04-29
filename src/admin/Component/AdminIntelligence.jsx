import React, { useState } from "react";

export default function AdminIntelligence() {
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: "",
    summary: "",
    narrative: "",

    zone_id: "",
    sector_id: "",

    signals: [],

    confidence_score: 1,
    risk_level: 1,
    contradiction_level: 1,

    source_reference: "",
    source_type: "",

    analyst_verified: false,
    verified_by: "",
    verified_at: null,

    publish_status: "Draft",
    published_at: null,

    created_by: "admin",

    internal_notes: "",
  };

  const [form, setForm] = useState(initialForm);

  const [signalInput, setSignalInput] = useState({
    type: "",
    source: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ADD SIGNAL
  const addSignal = () => {
    if (!signalInput.type || !signalInput.source) return;

    setForm({
      ...form,
      signals: [
        ...form.signals,
        {
          ...signalInput,
          timestamp: new Date().toISOString(),
        },
      ],
    });

    setSignalInput({ type: "", source: "" });
  };

  const deleteSignal = (index) => {
    const updated = [...form.signals];
    updated.splice(index, 1);
    setForm({ ...form, signals: updated });
  };

  // SAVE
  const handleSubmit = () => {
    if (!form.title) return alert("Title required");

    if (editingId) {
      setList(list.map((i) => (i.id === editingId ? { ...form, id: editingId } : i)));
    } else {
      setList([{ ...form, id: Date.now() }, ...list]);
    }

    resetForm();
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  // DELETE
  const handleDelete = (id) => {
    setList(list.filter((i) => i.id !== id));
  };

  // VERIFY
  const handleVerify = (id) => {
    const now = new Date().toISOString();

    setList(
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              analyst_verified: true,
              verified_by: "admin",
              verified_at: now,
            }
          : item
      )
    );
  };

  // PUBLISH
  const handlePublish = (id) => {
    const now = new Date().toISOString();

    setList(
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              publish_status: "Published",
              published_at: now,
            }
          : item
      )
    );
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

return (
  <div className="p-6 bg-gray-50 min-h-screen">

    {/* HEADER */}
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Intelligence CMS
      </h1>
      <p className="text-sm text-gray-500">
        Manage intelligence records and signals
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ================= FORM ================= */}
      <div className="space-y-5">

        {/* BASIC INFO */}
        <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-medium text-gray-700">Basic Info</h3>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="input"
          />

          <input
            name="summary"
            placeholder="Summary"
            value={form.summary}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="narrative"
            placeholder="Narrative"
            value={form.narrative}
            onChange={handleChange}
            className="input h-24"
          />
        </div>

        {/* CLASSIFICATION */}
        <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-medium text-gray-700">Classification</h3>

          <div className="grid grid-cols-2 gap-3">
            <input name="zone_id" placeholder="Zone ID" value={form.zone_id} onChange={handleChange} className="input" />
            <input name="sector_id" placeholder="Sector ID" value={form.sector_id} onChange={handleChange} className="input" />
          </div>
        </div>

        {/* SCORING */}
        <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-medium text-gray-700">Scoring level</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  {/* RISK */}
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-600">
      Risk level(1–5)
    </label>
    <input
      type="number"
      name="risk_level"
      value={form.risk_level}
      onChange={handleChange}
      className="input"
      min={1}
      max={5}
    />
 
  </div>

  {/* CONFIDENCE */}
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-600">
      Confidence(1–5)
    </label>
    <input
      type="number"
      name="confidence_score"
      value={form.confidence_score}
      onChange={handleChange}
      className="input"
      min={1}
      max={5}
    />
   
  </div>

  {/* CONTRADICTION */}
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-600">
      Contradiction(1–5)
    </label>
    <input
      type="number"
      name="contradiction_level"
      value={form.contradiction_level}
      onChange={handleChange}
      className="input"
      min={1}
      max={5}
    />
  
  </div>
    </div></div>


        {/* SOURCE */}
        <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-medium text-gray-700">Source</h3>

          <input name="source_reference" placeholder="Reference" value={form.source_reference} onChange={handleChange} className="input" />
          <input name="source_type" placeholder="Type" value={form.source_type} onChange={handleChange} className="input" />
        </div>

        {/* SIGNALS */}
        <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-medium text-gray-700">Signals</h3>

          <div className="flex gap-2">
            <input
              placeholder="Type"
              value={signalInput.type}
              onChange={(e) => setSignalInput({ ...signalInput, type: e.target.value })}
              className="input flex-1"
            />
            <input
              placeholder="Source"
              value={signalInput.source}
              onChange={(e) => setSignalInput({ ...signalInput, source: e.target.value })}
              className="input flex-1"
            />
            <button onClick={addSignal} className="btn-primary">
              Add
            </button>
          </div>

          {form.signals.map((s, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded text-sm">
              <span>{s.type} • {s.source}</span>
              <button onClick={() => deleteSignal(i)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* NOTES */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-medium text-gray-700 mb-2">Internal Notes</h3>

          <textarea
            name="internal_notes"
            placeholder="Write notes..."
            value={form.internal_notes}
            onChange={handleChange}
            className="input h-20"
          />
        </div>

        {/* ACTION */}
        <div className="flex gap-3">
          <button onClick={handleSubmit} className="btn-primary">
            {editingId ? "Update" : "Create"}
          </button>

          <button onClick={resetForm} className="btn-secondary">
            Reset
          </button>
        </div>

      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-4">

        {list.length === 0 && (
          <div className="text-gray-400 text-sm">No intelligence yet</div>
        )}

        {list.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm">

            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">
                {item.title}
              </h3>

              <span className={`text-xs px-2 py-1 rounded 
                ${item.publish_status === "Published"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
                }`}>
                {item.publish_status}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              {item.summary}
            </p>

            <div className="flex gap-4 text-xs text-gray-500 mt-2">
              <span>Risk: {item.risk_level}</span>
              <span>Conf: {item.confidence_score}</span>
            </div>

            <div className="flex gap-2 mt-3 text-xs">
              <button onClick={() => handleEdit(item)} className="btn-secondary">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="btn-secondary">Delete</button>
              <button onClick={() => handleVerify(item.id)} className="btn-primary">Verify</button>
              <button onClick={() => handlePublish(item.id)} className="btn-success">Publish</button>
            </div>

          </div>
        ))}

      </div>

    </div>
  </div>
)
}