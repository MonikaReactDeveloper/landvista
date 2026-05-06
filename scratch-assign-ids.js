require('dotenv').config();
const mongoose = require('mongoose');
const { Advisory, AdvisoryService, ServiceCategory } = require('./src/modules/advisory/advisory.model');
const Counter = require('./src/modules/common/counter.model');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/realestate').then(async () => {
  const updateCollection = async (Model, name) => {
    const items = await Model.find({ id: { $exists: false } });
    let count = 0;
    for (let item of items) {
      count++;
      item.id = count;
      await item.save();
    }
    // Update the counter to match the number of items we have
    await Counter.findOneAndUpdate({ modelName: name }, { seq: count }, { upsert: true });
    console.log(`Updated ${name} with ${count} IDs`);
  };

  await updateCollection(Advisory, 'Advisory');
  await updateCollection(AdvisoryService, 'AdvisoryService');
  await updateCollection(ServiceCategory, 'ServiceCategory');
  console.log("Database ID update complete.");
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
