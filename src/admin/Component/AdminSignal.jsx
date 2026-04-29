import React, { useState } from "react";

export default function AdminSignal() {
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    signal_title: "",
    signal_type: "",
    zone_id: "",
    sector_id: "",

    strength: 1,
    confidence_level: 1,
    risk_level: 1,

    contradiction_flag: false,

    source_reference: "",
    observed_at: "",
    validation_status: "Pending",
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // SAVE
  const handleSubmit = () => {
    if (!form.signal_title) return alert("Signal title required");

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

  // VALIDATE
  const handleValidate = (id) => {
    setList(
      list.map((item) =>
        item.id === id
          ? { ...item, validation_status: "Validated" }
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
          Signal Management
        </h1>
        <p className="text-sm text-gray-500">
          Capture and validate raw intelligence signals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= FORM ================= */}
        <div className="space-y-5">

          {/* BASIC */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium text-gray-700">Basic Info</h3>

            <input
              name="signal_title"
              placeholder="Signal Title"
              value={form.signal_title}
              onChange={handleChange}
              className="input"
            />

            <input
              name="signal_type"
              placeholder="Signal Type (Policy, Infra...)"
              value={form.signal_type}
              onChange={handleChange}
              className="input"
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
            <h3 className="font-medium text-gray-700">Signal Strength & Scoring</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="text-xs text-gray-600">Strength (1–5)</label>
                <input type="number" name="strength" value={form.strength} onChange={handleChange} className="input" min={1} max={5} />
              </div>

              <div>
                <label className="text-xs text-gray-600">Confidence (1–5)</label>
                <input type="number" name="confidence_level" value={form.confidence_level} onChange={handleChange} className="input" min={1} max={5} />
              </div>

              <div>
                <label className="text-xs text-gray-600">Risk (1–5)</label>
                <input type="number" name="risk_level" value={form.risk_level} onChange={handleChange} className="input" min={1} max={5} />
              </div>

            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="contradiction_flag"
                checked={form.contradiction_flag}
                onChange={handleChange}
              />
              Contradictory Signal
            </label>
          </div>

          {/* SOURCE */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium text-gray-700">Source Info</h3>

            <input name="source_reference" placeholder="Source Reference" value={form.source_reference} onChange={handleChange} className="input" />

            <input
              type="datetime-local"
              name="observed_at"
              value={form.observed_at}
              onChange={handleChange}
              className="input"
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
            <div className="text-gray-400 text-sm">No signals yet</div>
          )}

          {list.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm">

              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {item.signal_title}
                </h3>

                <span className={`text-xs px-2 py-1 rounded
                  ${item.validation_status === "Validated"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                  {item.validation_status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {item.signal_type}
              </p>

              <div className="flex gap-4 text-xs text-gray-500 mt-2">
                <span>Strength: {item.strength}</span>
                <span>Risk: {item.risk_level}</span>
              </div>

              {item.contradiction_flag && (
                <span className="text-xs text-red-500">
                  Contradictory
                </span>
              )}

              <div className="flex gap-2 mt-3 text-xs">
                <button onClick={() => handleEdit(item)} className="btn-secondary">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="btn-secondary">Delete</button>
                <button onClick={() => handleValidate(item.id)} className="btn-primary">Validate</button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}