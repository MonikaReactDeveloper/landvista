require('dotenv').config();
const mongoose = require('mongoose');
const { Zone, Sector, PolicyDocument, PolicyUpdate } = require('./src/modules/policy/policy.model');
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
    await Counter.findOneAndUpdate({ modelName: name }, { seq: count }, { upsert: true });
    console.log(`Updated ${name} with ${count} IDs`);
  };

  await updateCollection(Zone, 'Zone');
  await updateCollection(Sector, 'Sector');
  await updateCollection(PolicyDocument, 'PolicyDocument');
  await updateCollection(PolicyUpdate, 'PolicyUpdate');
  console.log("Policy module ID update complete.");
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
