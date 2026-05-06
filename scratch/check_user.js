const mongoose = require('mongoose');
require('dotenv').config();

const checkUser = async () => {
  await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/realestate');
  const User = mongoose.model('User', new mongoose.Schema({ email: String, role: String }));
  
  const user = await User.findOne({ email: 'suryansh@gmail.com' });
  if (user) {
    console.log('Found user:', user);
  } else {
    console.log('User not found');
  }
  process.exit();
};

checkUser();
