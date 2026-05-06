const zonesService = require("./zones.service");
const logger = require("../../utils/logger");

const zonesController = {
  // ZONES
  async createZone(req, res) {
    try {
      const zone = await zonesService.createZone(req.body);
      
      await logger.info(req, {
        action: "CREATE",
        module: "GEOGRAPHY",
        afterValue: zone,
        details: `Created new zone: ${zone.name}`,
        severity: "Medium"
      });

      res.status(201).json({ success: true, data: zone });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },


  async getZones(req, res) {
    try {
      const zones = await zonesService.getAllZones(req.query);
      res.status(200).json({ success: true, data: zones });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateZone(req, res) {
    try {
      const zone = await zonesService.updateZone(req.params.id, req.body);
      res.status(200).json({ success: true, data: zone });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // SECTORS
  async createSector(req, res) {
    try {
      const sector = await zonesService.createSector(req.body);
      res.status(201).json({ success: true, data: sector });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getSectors(req, res) {
    try {
      const sectors = await zonesService.getAllSectors(req.query);
      res.status(200).json({ success: true, data: sectors });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateSector(req, res) {
    try {
      const sector = await zonesService.updateSector(req.params.id, req.body);
      res.status(200).json({ success: true, data: sector });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async deleteZone(req, res) {
    try {
      await zonesService.deleteZone(req.params.id);
      res.status(200).json({ success: true, message: "Zone deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteSector(req, res) {
    try {
      await zonesService.deleteSector(req.params.id);
      res.status(200).json({ success: true, message: "Sector deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async uploadSectorMap(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      // Return the accessible URL
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;
      
      res.status(200).json({ 
        success: true, 
        url: fileUrl,
        filename: req.file.filename
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async uploadZoneImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;
      
      res.status(200).json({ 
        success: true, 
        url: fileUrl,
        filename: req.file.filename
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = zonesController;
