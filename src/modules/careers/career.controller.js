const Career = require("./career.model");

const getCareers = async (req, res) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ postedAt: -1 });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: "Job posting not found" });
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCareer = async (req, res) => {
  try {
    const career = new Career(req.body);
    await career.save();
    res.status(201).json({ message: "Job posted successfully", career });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) return res.status(404).json({ message: "Job posting not found" });
    res.json({ message: "Job updated successfully", career });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ message: "Job posting not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
};
