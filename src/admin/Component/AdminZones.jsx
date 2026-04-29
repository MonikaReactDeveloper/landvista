import React, { useState } from "react";

export default function AdminZones() {

  const [zones, setZones] = useState([]);
  const [sectors, setSectors] = useState([]);

  const initialZoneForm = {
    zone_name: "",
    code: "",
    summary: "",
    policy_reference: "",
    development_status: "Planned",
    visibility_status: "Public",
    map_url: "",
  };

  const initialSectorForm = {
    sector_name: "",
    code: "",
    zone_id: "",
    summary: "",
    risk_level: 1,
    development_status: "Planned",
    visibility_status: "Public",
  };

  const [zoneForm, setZoneForm] = useState(initialZoneForm);
  const [sectorForm, setSectorForm] = useState(initialSectorForm);

  const [editZoneId, setEditZoneId] = useState(null);
  const [editSectorId, setEditSectorId] = useState(null);

  // ---------------- ZONE ----------------

  const handleZoneSubmit = () => {
    if (!zoneForm.zone_name) return;

    if (editZoneId) {
      setZones(
        zones.map((z) =>
          z.id === editZoneId ? { ...zoneForm, id: editZoneId } : z
        )
      );
    } else {
      setZones([{ ...zoneForm, id: Date.now() }, ...zones]);
    }

    setZoneForm(initialZoneForm);
    setEditZoneId(null);
  };

  const handleEditZone = (zone) => {
    setZoneForm(zone);
    setEditZoneId(zone.id);
  };

  const deleteZone = (id) => {
    setZones(zones.filter((z) => z.id !== id));
    setSectors(sectors.filter((s) => s.zone_id !== id));
  };

  // ---------------- SECTOR ----------------

  const handleSectorSubmit = () => {
    if (!sectorForm.sector_name || !sectorForm.zone_id) return;

    if (editSectorId) {
      setSectors(
        sectors.map((s) =>
          s.id === editSectorId ? { ...sectorForm, id: editSectorId } : s
        )
      );
    } else {
      setSectors([{ ...sectorForm, id: Date.now() }, ...sectors]);
    }

    setSectorForm(initialSectorForm);
    setEditSectorId(null);
  };

  const handleEditSector = (sector) => {
    setSectorForm(sector);
    setEditSectorId(sector.id);
  };

  const deleteSector = (id) => {
    setSectors(sectors.filter((s) => s.id !== id));
  };

  // ---------------- RESET ----------------

  const cancelEdit = () => {
    setEditZoneId(null);
    setEditSectorId(null);
    setZoneForm(initialZoneForm);
    setSectorForm(initialSectorForm);
  };

  // ---------------- UI ----------------

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">
        Zone & Sector Management
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ================= FORMS ================= */}
        <div className="space-y-6">

          {/* ZONE FORM */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">
              {editZoneId ? "Edit Zone" : "Create Zone"}
            </h3>

            <input className="input" placeholder="Zone Name"
              value={zoneForm.zone_name}
              onChange={(e)=>setZoneForm({...zoneForm, zone_name:e.target.value})}
            />

            <input className="input" placeholder="Code"
              value={zoneForm.code}
              onChange={(e)=>setZoneForm({...zoneForm, code:e.target.value})}
            />

            <textarea className="input" placeholder="Summary"
              value={zoneForm.summary}
              onChange={(e)=>setZoneForm({...zoneForm, summary:e.target.value})}
            />

            <input className="input" placeholder="Policy Reference"
              value={zoneForm.policy_reference}
              onChange={(e)=>setZoneForm({...zoneForm, policy_reference:e.target.value})}
            />

            <input className="input" placeholder="Map URL"
              value={zoneForm.map_url}
              onChange={(e)=>setZoneForm({...zoneForm, map_url:e.target.value})}
            />

            <div className="grid grid-cols-2 gap-3">
              <select className="input"
                value={zoneForm.development_status}
                onChange={(e)=>setZoneForm({...zoneForm, development_status:e.target.value})}>
                <option>Planned</option>
                <option>Active</option>
                <option>Growth</option>
              </select>

              <select className="input"
                value={zoneForm.visibility_status}
                onChange={(e)=>setZoneForm({...zoneForm, visibility_status:e.target.value})}>
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button onClick={handleZoneSubmit} className="btn-primary w-full">
                {editZoneId ? "Update Zone" : "Add Zone"}
              </button>

              {editZoneId && (
                <button onClick={cancelEdit} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* SECTOR FORM */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
            <h3 className="font-medium">
              {editSectorId ? "Edit Sector" : "Create Sector"}
            </h3>

            <input className="input" placeholder="Sector Name"
              value={sectorForm.sector_name}
              onChange={(e)=>setSectorForm({...sectorForm, sector_name:e.target.value})}
            />

            <input className="input" placeholder="Code"
              value={sectorForm.code}
              onChange={(e)=>setSectorForm({...sectorForm, code:e.target.value})}
            />

            <select className="input"
              value={sectorForm.zone_id}
              onChange={(e)=>setSectorForm({...sectorForm, zone_id:e.target.value})}>
              <option value="">Select Zone</option>
              {zones.map(z => (
                <option key={z.id} value={z.id}>{z.zone_name}</option>
              ))}
            </select>

            <textarea className="input" placeholder="Summary"
              value={sectorForm.summary}
              onChange={(e)=>setSectorForm({...sectorForm, summary:e.target.value})}
            />

            <input type="number" min={1} max={5}
              value={sectorForm.risk_level}
              onChange={(e)=>setSectorForm({...sectorForm, risk_level:e.target.value})}
              className="input"
            />

            <div className="grid grid-cols-2 gap-3">
              <select className="input"
                value={sectorForm.development_status}
                onChange={(e)=>setSectorForm({...sectorForm, development_status:e.target.value})}>
                <option>Planned</option>
                <option>Active</option>
                <option>Growth</option>
              </select>

              <select className="input"
                value={sectorForm.visibility_status}
                onChange={(e)=>setSectorForm({...sectorForm, visibility_status:e.target.value})}>
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button onClick={handleSectorSubmit} className="btn-primary w-full">
                {editSectorId ? "Update Sector" : "Add Sector"}
              </button>

              {editSectorId && (
                <button onClick={cancelEdit} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ================= LIST ================= */}
        <div className="space-y-4">

          {/* ZONES */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-medium mb-3">Zones</h3>

            {zones.map(z => (
              <div key={z.id} className="border p-3 mb-2 rounded">

                <div className="flex justify-between">
                  <h4 className="font-semibold">{z.zone_name}</h4>
                  <span className="text-xs">{z.visibility_status}</span>
                </div>

                <p className="text-xs text-gray-500">{z.summary}</p>

                <div className="flex gap-2 mt-2 text-xs">
                  <button onClick={()=>handleEditZone(z)} className="btn-secondary">Edit</button>
                  <button onClick={()=>deleteZone(z.id)} className="btn-secondary">Delete</button>
                </div>

              </div>
            ))}
          </div>

          {/* SECTORS */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-medium mb-3">Sectors</h3>

            {sectors.map(s => (
              <div key={s.id} className="border p-3 mb-2 rounded">

                <div className="flex justify-between">
                  <h4 className="font-semibold">{s.sector_name}</h4>
                  <span className="text-xs">Risk: {s.risk_level}</span>
                </div>

                <p className="text-xs text-gray-500">
                  Zone: {zones.find(z=>z.id==s.zone_id)?.zone_name}
                </p>

                <div className="flex gap-2 mt-2 text-xs">
                  <button onClick={()=>handleEditSector(s)} className="btn-secondary">Edit</button>
                  <button onClick={()=>deleteSector(s.id)} className="btn-secondary">Delete</button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}