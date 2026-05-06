import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { 
  Map, 
  Plus, 
  Edit2, 
  Archive, 
  Search, 
  Layers, 
  ChevronRight,
  Database,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Edit3
} from "lucide-react";

export default function AdminZones() {
  const [zones, setZones] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("zones"); // zones or sectors
  
  // Modal states
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [currentSector, setCurrentSector] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [zonesRes, sectorsRes] = await Promise.all([
        api.get("/zones-sectors/zones"),
        api.get("/zones-sectors/sectors")
      ]);
      setZones(zonesRes.data.data);
      setSectors(sectorsRes.data.data);
    } catch (error) {
      console.error("Error fetching zones/sectors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleZoneSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      if (currentZone) {
        await api.put(`/zones-sectors/zones/${currentZone._id}`, data);
      } else {
        await api.post("/zones-sectors/zones", data);
      }
      setShowZoneModal(false);
      setCurrentZone(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const [uploading, setUploading] = useState(false);

  const handleSectorSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      if (currentSector) {
        await api.put(`/zones-sectors/sectors/${currentSector._id}`, data);
      } else {
        await api.post("/zones-sectors/sectors", data);
      }
      setShowSectorModal(false);
      setCurrentSector(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleZoneImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/zones-sectors/zones/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (currentZone) {
        setCurrentZone({ ...currentZone, imageUrl: res.data.url });
      }
      
      // Update the hidden input in the form
      const imageInput = document.getElementById("zoneImageUrlInput");
      if (imageInput) imageInput.value = res.data.url;
      
      alert("Zone image uploaded successfully!");
    } catch (error) {
      alert("Upload failed: " + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleMapUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("map", file);

    try {
      const res = await api.post("/zones-sectors/sectors/upload-map", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (currentSector) {
        setCurrentSector({ ...currentSector, mapImageUrl: res.data.url });
      }
      
      // Update the hidden input in the form
      const mapInput = document.getElementById("mapImageUrlInput");
      if (mapInput) mapInput.value = res.data.url;
      
      alert("Map uploaded successfully!");
    } catch (error) {
      alert("Upload failed: " + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteZone = async (id) => {
    if (window.confirm("Permanently DELETE this strategic zone? This will also delete ALL linked sectors.")) {
      try {
        await api.delete(`/zones-sectors/zones/${id}`);
        fetchData();
      } catch (error) {
        console.error("Zone delete failed:", error);
        alert(error.response?.data?.message || "Operation failed.");
      }
    }
  };

  const handleDeleteSector = async (id) => {
    if (window.confirm("Permanently DELETE this operational sector?")) {
      try {
        await api.delete(`/zones-sectors/sectors/${id}`);
        fetchData();
      } catch (error) {
        console.error("Sector delete failed:", error);
        alert(error.response?.data?.message || "Operation failed.");
      }
    }
  };

  const getRiskBadge = (level) => {
    if (level >= 4) return "bg-red-100 text-red-700";
    if (level >= 3) return "bg-amber-100 text-amber-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-landvista-blue flex items-center gap-2">
            <Map className="w-6 h-6" />
            Geography Management
          </h1>
          <p className="text-landvista-grey text-sm mt-1">Manage strategic zones and sector activations</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { setCurrentZone(null); setShowZoneModal(true); }}
            className="flex items-center gap-2 bg-landvista-blue text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-opacity-90 transition shadow-lg shadow-landvista-blue/20"
          >
            <Plus className="w-4 h-4" /> NEW ZONE
          </button>
          <button 
            onClick={() => { setCurrentSector(null); setShowSectorModal(true); }}
            className="flex items-center gap-2 bg-white border-2 border-landvista-blue text-landvista-blue px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-50 transition"
          >
            <Plus className="w-4 h-4" /> NEW SECTOR
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab("zones")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'zones' ? 'bg-white text-landvista-blue shadow-sm' : 'text-landvista-grey hover:text-landvista-blue'}`}
        >
          Zones ({zones.length})
        </button>
        <button 
          onClick={() => setActiveTab("sectors")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'sectors' ? 'bg-white text-landvista-blue shadow-sm' : 'text-landvista-grey hover:text-landvista-blue'}`}
        >
          Sectors ({sectors.length})
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-landvista-blue mb-4"></div>
          <p className="text-landvista-grey font-medium">Loading geography data...</p>
        </div>
      ) : activeTab === "zones" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map(zone => (
            <div key={zone._id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-landvista-blue/5 rounded-xl text-landvista-blue">
                  <Map className="w-6 h-6" />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setCurrentZone(zone); setShowZoneModal(true); }} className="p-2 hover:bg-gray-100 rounded-lg text-landvista-grey"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteZone(zone._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{zone.code}</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600"><CheckCircle2 className="w-3 h-3" /> ACTIVE</span>
              </div>
              <h3 className="text-lg font-bold text-landvista-blue mb-2">{zone.name}</h3>
              <p className="text-sm text-landvista-grey line-clamp-2 mb-4">{zone.description}</p>
              
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-landvista-grey">
                <span>Linked Sectors</span>
                <span className="bg-landvista-blue/10 text-landvista-blue px-2 py-1 rounded-lg">
                  {sectors.filter(s => s.zone?._id === zone._id).length}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-landvista-grey uppercase tracking-widest">Map</th>
                <th className="px-6 py-4 text-[10px] font-bold text-landvista-grey uppercase tracking-widest">Sector Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-landvista-grey uppercase tracking-widest">Parent Zone</th>
                <th className="px-6 py-4 text-[10px] font-bold text-landvista-grey uppercase tracking-widest">Activation</th>
                <th className="px-6 py-4 text-[10px] font-bold text-landvista-grey uppercase tracking-widest">Risk Level</th>
                <th className="px-6 py-4 text-[10px] font-bold text-landvista-grey uppercase tracking-widest">Confidence</th>
                <th className="px-6 py-4 text-[10px] font-bold text-landvista-grey uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sectors.map(sector => (
                <tr key={sector._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                      {sector.mapImageUrl ? (
                        <img src={sector.mapImageUrl} alt="Map" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Layers size={16} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-landvista-blue">{sector.name}</span>
                      <span className="text-[10px] text-landvista-grey">{sector.code}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-landvista-slate font-medium">{sector.zone?.name || "Unlinked"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${sector.activationStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {sector.activationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getRiskBadge(sector.riskLevel)}`}>
                      LVL {sector.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-landvista-blue">
                    {sector.confidenceLevel}/5
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setCurrentSector(sector); setShowSectorModal(true); }} className="p-2 hover:bg-gray-100 rounded-lg text-landvista-grey"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteSector(sector._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Zone Modal */}
      {showZoneModal && (
        <div className="fixed inset-0 bg-landvista-blue/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 bg-landvista-blue text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">{currentZone ? 'Edit Zone' : 'Create New Zone'}</h2>
              <button onClick={() => setShowZoneModal(false)} className="hover:bg-white/10 p-2 rounded-full transition">✕</button>
            </div>
            <form onSubmit={handleZoneSubmit} className="p-8 space-y-6">
              <input type="hidden" name="imageUrl" id="zoneImageUrlInput" defaultValue={currentZone?.imageUrl} />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Zone Name</label>
                  <input name="name" defaultValue={currentZone?.name} required className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" placeholder="e.g. Special Economic Zone" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Zone Code</label>
                  <input name="code" defaultValue={currentZone?.code} required className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" placeholder="e.g. SEZ-IND" />
                </div>
              </div>

              {/* Zone Image Section */}
              <div className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <label className="text-[10px] font-bold text-landvista-grey uppercase block mb-4">Strategic Zone Image</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm flex-shrink-0">
                    {currentZone?.imageUrl ? (
                      <img src={currentZone.imageUrl} alt="Zone Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-[10px]">No Image</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleZoneImageUpload}
                      className="hidden" 
                      id="zoneImageUpload" 
                    />
                    <label 
                      htmlFor="zoneImageUpload"
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-landvista-blue cursor-pointer hover:bg-gray-50 transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {uploading ? 'UPLOADING...' : (currentZone?.imageUrl ? 'REPLACE IMAGE' : 'UPLOAD IMAGE')}
                    </label>
                    <p className="text-[10px] text-landvista-grey mt-2 opacity-60">Supported: JPG, PNG, WEBP. Max 5MB.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Location</label>
                  <input name="location" defaultValue={currentZone?.location} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" placeholder="e.g. North Mumbai" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Area Coverage</label>
                  <input name="area" defaultValue={currentZone?.area} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" placeholder="e.g. 500 sq km" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-landvista-grey uppercase">Description</label>
                <textarea name="description" defaultValue={currentZone?.description} rows="3" className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" placeholder="Zone purpose and strategic context..."></textarea>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowZoneModal(false)} className="flex-1 px-6 py-3 rounded-xl font-bold text-landvista-grey hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="flex-1 bg-landvista-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition shadow-lg shadow-landvista-blue/20">
                  {currentZone ? 'Update Zone' : 'Create Zone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sector Modal */}
      {showSectorModal && (
        <div className="fixed inset-0 bg-landvista-blue/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-landvista-blue text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">{currentSector ? 'Edit Sector' : 'Create New Sector'}</h2>
              <button onClick={() => setShowSectorModal(false)} className="hover:bg-white/10 p-2 rounded-full transition">✕</button>
            </div>
            <form onSubmit={handleSectorSubmit} className="p-8 space-y-6">
              <input type="hidden" name="mapImageUrl" id="mapImageUrlInput" defaultValue={currentSector?.mapImageUrl} />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Sector Name</label>
                  <input name="name" defaultValue={currentSector?.name} required className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Sector Code</label>
                  <input name="code" defaultValue={currentSector?.code} required className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-landvista-grey uppercase">Description</label>
                <textarea name="description" defaultValue={currentSector?.description} rows="2" className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" placeholder="Sector specific details..."></textarea>
              </div>

              {/* Map Image Section */}
              <div className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <label className="text-[10px] font-bold text-landvista-grey uppercase block mb-4">Sector Map Image</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm flex-shrink-0">
                    {currentSector?.mapImageUrl ? (
                      <img src={currentSector.mapImageUrl} alt="Map Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-[10px]">No Map</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleMapUpload}
                      className="hidden" 
                      id="sectorMapUpload" 
                    />
                    <label 
                      htmlFor="sectorMapUpload"
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-landvista-blue cursor-pointer hover:bg-gray-50 transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {uploading ? 'UPLOADING...' : (currentSector?.mapImageUrl ? 'REPLACE MAP' : 'UPLOAD MAP')}
                    </label>
                    <p className="text-[10px] text-landvista-grey mt-2 opacity-60">Supported: JPG, PNG, WEBP. Max 5MB.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Parent Zone</label>
                  <select name="zone" defaultValue={currentSector?.zone?._id} required className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition">
                    <option value="">Select Zone</option>
                    {zones.map(z => <option key={z._id} value={z._id}>{z.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Activation Status</label>
                  <select name="activationStatus" defaultValue={currentSector?.activationStatus || "Active"} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Risk Level (1-5)</label>
                  <input type="number" name="riskLevel" min="1" max="5" defaultValue={currentSector?.riskLevel || 3} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-landvista-grey uppercase">Confidence Level (1-5)</label>
                  <input type="number" name="confidenceLevel" min="1" max="5" defaultValue={currentSector?.confidenceLevel || 3} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-landvista-blue outline-none transition" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowSectorModal(false)} className="flex-1 px-6 py-3 rounded-xl font-bold text-landvista-grey hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="flex-1 bg-landvista-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition shadow-lg shadow-landvista-blue/20">
                  {currentSector ? 'Update Sector' : 'Create Sector'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}