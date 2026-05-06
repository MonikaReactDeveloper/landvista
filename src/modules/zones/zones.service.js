const Zone = require("./zone.model");
const Sector = require("./sector.model");

const zoneService = {
  // --- ZONES ---
  async createZone(data) {
    return await Zone.create(data);
  },

  async getAllZones(filter = {}) {
    return await Zone.find({ ...filter, status: "Active" }).sort({ name: 1 });
  },

  async getZoneById(id) {
    return await Zone.findOne({ _id: id, status: "Active" });
  },

  async updateZone(id, data) {
    return await Zone.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteZone(id) {
    // Hard delete linked sectors first or let it be
    await Sector.deleteMany({ zone: id });
    return await Zone.findByIdAndDelete(id);
  },

  // --- SECTORS ---
  async createSector(data) {
    return await Sector.create(data);
  },

  async getAllSectors(filter = {}) {
    return await Sector.find({ ...filter, status: "Active" }).populate("zone", "name code").sort({ name: 1 });
  },

  async getSectorsByZone(zoneId) {
    return await Sector.find({ zone: zoneId, status: "Active" });
  },

  async updateSector(id, data) {
    return await Sector.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteSector(id) {
    return await Sector.findByIdAndDelete(id);
  }
};

module.exports = zoneService;
