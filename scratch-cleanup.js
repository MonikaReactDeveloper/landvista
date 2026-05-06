require("dotenv").config();
const mongoose = require("mongoose");
const { Advisory } = require("./src/modules/advisory/advisory.model");

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    
    // Delete all except the one they probably want to keep
    const all = await Advisory.find({});
    
    for (let adv of all) {
      if (adv.description === "Long gdjgfjfdj") {
        // Keep this one, and make sure it's active!
        adv.isActive = true;
        await adv.save();
      } else {
        await Advisory.findByIdAndDelete(adv._id);
      }
    }
    
    console.log("Cleanup complete. Remaining Advisories:", await Advisory.find({}));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
cleanup();
