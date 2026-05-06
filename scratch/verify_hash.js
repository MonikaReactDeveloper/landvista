const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../src/modules/auth/auth.model');

const verifyPassword = async () => {
  await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/realestate');
  const user = await User.findOne({ email: 'suryansh@gmail.com' });
  if (!user) {
    console.log('User not found');
    process.exit();
  }
  
  const isMatch = await user.comparePassword('admin1234');
  console.log('Password match:', isMatch);
  process.exit();
};

verifyPassword();
