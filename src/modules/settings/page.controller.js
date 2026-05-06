const RequestAccessPage = require("./request_access_page.model");

const getRequestAccessPage = async (req, res) => {
  try {
    let page = await RequestAccessPage.findOne({ isActive: true });
    if (!page) {
      // Return default if not found
      return res.json({
        hero: {
          headline: "Request Access to Institutional Land Intelligence",
          subheadline: "Qualification-based entry into a governance-led, NDA-controlled intelligence platform designed for institutional capital.",
          supporting_line: "Access is reviewed, validated, and approved — not granted automatically. Entry is governed, not open.",
          cta_primary: "Apply for Access",
          cta_secondary: "Begin Qualification",
        }
      });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRequestAccessPage = async (req, res) => {
  try {
    let page = await RequestAccessPage.findOneAndUpdate(
      { isActive: true },
      { ...req.body },
      { upsert: true, new: true }
    );
    res.json({ message: "Page content updated successfully", page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRequestAccessPage,
  updateRequestAccessPage
};
