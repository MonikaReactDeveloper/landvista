import React, { useState, useEffect } from "react";

const stages = ["New", "Review", "Negotiation", "Approved", "Rejected"];

export default function AdminPipelines() {

  const [deals, setDeals] = useState([]);
  const [overrideMode, setOverrideMode] = useState(false);

  const initialForm = {
    client_name: "",
    source: "",
    stage: "New",
    owner_id: "",

    deal_value: "",
    confidence_percent: 50,
    priority_score: 1,
    deal_category: "B",

    risk_flag: false,
    contradiction_flag: false,

    next_action: "",
    next_action_date: "",

    sla_due_date: "",

    founder_override_status: false,
    frozen: false,
  };

  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ---------------- CREATE / UPDATE ----------------
  const handleSubmit = () => {
    if (!form.client_name || !form.owner_id) return;

    const newDeal = {
      ...form,
      id: editId || Date.now(),
      sla_breach_status: false,
      created_at: new Date().toISOString(),
    };

    if (editId) {
      setDeals(deals.map((d) => (d.id === editId ? newDeal : d)));
    } else {
      setDeals([newDeal, ...deals]);
    }

    resetForm();
  };

  // ---------------- EDIT ----------------
  const handleEdit = (deal) => {
    setForm(deal);
    setEditId(deal.id);
  };

  // ---------------- DELETE ----------------
  const deleteDeal = (id) => {
    setDeals(deals.filter((d) => d.id !== id));
  };

  // ---------------- STAGE ----------------
  const updateStage = (id, stage) => {
    setDeals(deals.map((d) => (d.id === id ? { ...d, stage } : d)));
  };

  // ---------------- SLA MONITOR ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      setDeals((prev) =>
        prev.map((deal) => {
          if (!deal.sla_due_date) return deal;

          const now = new Date();
          const due = new Date(deal.sla_due_date);

          if (now > due) {
            return { ...deal, sla_breach_status: true };
          }

          return deal;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ---------------- FOUNDER OVERRIDE ----------------
  const overrideDeal = (id) => {
    if (!overrideMode) return alert("Enable override first");

    setDeals(
      deals.map((d) =>
        d.id === id
          ? {
              ...d,
              stage: "Approved",
              founder_override_status: true,
            }
          : d
      )
    );
  };

  // ---------------- FREEZE ----------------
  const freezeDeal = (id) => {
    setDeals(
      deals.map((d) =>
        d.id === id ? { ...d, frozen: !d.frozen } : d
      )
    );
  };

  // ---------------- RESET ----------------
  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  // ---------------- UI ----------------
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Pipeline / War Room</h2>
          <p className="text-sm text-gray-500">
            Deal tracking, SLA control, and execution monitoring
          </p>
        </div>

        <button
          onClick={() => setOverrideMode(!overrideMode)}
          className={`px-4 py-2 text-sm rounded ${
            overrideMode
              ? "bg-landvista-blue text-white"
              : "bg-gray-200"
          }`}
        >
          {overrideMode ? "Override ON" : "Override OFF"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ================= FORM ================= */}
        <div className="space-y-5">

          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">
              {editId ? "Edit Deal" : "Create Deal"}
            </h3>

            <input className="input" placeholder="Client Name"
              name="client_name"
              value={form.client_name}
              onChange={handleChange}
            />

            <input className="input" placeholder="Source"
              name="source"
              value={form.source}
              onChange={handleChange}
            />

            <input className="input" placeholder="Owner"
              name="owner_id"
              value={form.owner_id}
              onChange={handleChange}
            />

            <select className="input"
              name="stage"
              value={form.stage}
              onChange={handleChange}>
              {stages.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* DEAL METRICS */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">Deal Metrics</h3>

            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="Deal Value"
                name="deal_value"
                value={form.deal_value}
                onChange={handleChange}
              />

              <input type="number" className="input"
                name="confidence_percent"
                value={form.confidence_percent}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input type="number" className="input"
                name="priority_score"
                value={form.priority_score}
                onChange={handleChange}
              />

              <select className="input"
                name="deal_category"
                value={form.deal_category}
                onChange={handleChange}>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
          </div>

          {/* FLAGS */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-3">
            <h3 className="font-medium">Flags</h3>

            <label><input type="checkbox" name="risk_flag" checked={form.risk_flag} onChange={handleChange}/> Risk</label>
            <label><input type="checkbox" name="contradiction_flag" checked={form.contradiction_flag} onChange={handleChange}/> Contradiction</label>
          </div>

          {/* ACTIONS */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">Next Actions</h3>

            <input className="input" placeholder="Next Action"
              name="next_action"
              value={form.next_action}
              onChange={handleChange}
            />

            <input type="date" className="input"
              name="next_action_date"
              value={form.next_action_date}
              onChange={handleChange}
            />

            <input type="date" className="input"
              name="sla_due_date"
              value={form.sla_due_date}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3">
            <button onClick={handleSubmit} className="btn-primary w-full">
              {editId ? "Update Deal" : "Create Deal"}
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

          {deals.map((deal) => (
            <div key={deal.id} className="bg-white p-4 rounded-xl shadow-sm">

              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">{deal.client_name}</h4>
                  <p className="text-xs text-gray-500">
                    Owner: {deal.owner_id}
                  </p>
                </div>

                <div className="text-xs">
                  {deal.sla_breach_status && "⚠ SLA Breach"}
                </div>
              </div>

              {/* STAGES */}
              <div className="flex gap-2 flex-wrap mt-2">
                {stages.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStage(deal.id, s)}
                    className={`text-xs px-3 py-1 border ${
                      deal.stage === s ? "bg-black text-white" : ""
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* INFO */}
              <div className="text-xs mt-2 space-y-1">
                <p>Value: {deal.deal_value}</p>
                <p>Confidence: {deal.confidence_percent}%</p>
                <p>Priority: {deal.priority_score}</p>
                <p>Category: {deal.deal_category}</p>
              </div>

              {/* FLAGS */}
              <div className="flex gap-2 mt-2 text-xs">
                {deal.risk_flag && <span className="bg-red-100 px-2">Risk</span>}
                {deal.contradiction_flag && <span className="bg-yellow-100 px-2">Contradiction</span>}
              </div>

              {/* ACTION */}
              <p className="text-xs mt-2">
                Next: {deal.next_action} ({deal.next_action_date})
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-3 text-xs">
                <button onClick={() => handleEdit(deal)} className="btn-secondary">Edit</button>
                <button onClick={() => deleteDeal(deal.id)} className="btn-secondary">Delete</button>
                <button onClick={() => overrideDeal(deal.id)} className="btn-primary">Override</button>
                <button onClick={() => freezeDeal(deal.id)} className="btn-secondary">
                  {deal.frozen ? "Unfreeze" : "Freeze"}
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}