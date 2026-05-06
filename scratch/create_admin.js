const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

// Use the actual model to ensure hashing hooks run
const User = require('../src/modules/auth/auth.model');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/realestate');
    console.log('Connected to DB');

    const admin = new User({
      fullName: 'Suryansh',
      email: 'suryansh@gmail.com',
      password: 'admin1234',
      role: 'admin',
      status: 'approved',
      isVerified: true
    });

    await admin.save();
    console.log('Admin account created successfully: suryansh@gmail.com / admin1234');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
