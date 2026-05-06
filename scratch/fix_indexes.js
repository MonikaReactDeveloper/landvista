const mongoose = require('mongoose');
require('dotenv').config();

const fixIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collections = ['zones', 'sectors'];
    for (const collName of collections) {
      console.log(`\nChecking indexes on ${collName}...`);
      const collection = db.collection(collName);
      const indexes = await collection.indexes();
      console.log(`Current indexes on ${collName}:`, indexes);

      const hasIdIndex = indexes.find(idx => idx.name === 'id_1');
      if (hasIdIndex) {
        console.log(`Dropping id_1 index on ${collName}...`);
        await collection.dropIndex('id_1');
        console.log(`Dropped id_1 index on ${collName}`);
      } else {
        console.log(`No id_1 index found on ${collName}`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixIndexes();
