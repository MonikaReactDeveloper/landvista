const mongoose = require('mongoose');

async function promoteUsers() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/realestate');
    const User = mongoose.model('User', new mongoose.Schema({ email: String, role: String }));
    
    const emails = ['suryanshnema12@gmail.com', 'anujjhariya42@gmail.com', 'admin@landvista.com'];
    
    const result = await User.updateMany(
      { email: { $in: emails } },
      { $set: { role: 'admin' } }
    );
    
    console.log(`Successfully updated ${result.modifiedCount} users to Admin role.`);
  } catch (error) {
    console.error('Error promoting users:', error);
  } finally {
    await mongoose.disconnect();
  }
}

promoteUsers();
