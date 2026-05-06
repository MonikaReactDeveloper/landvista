const axios = require('axios');

const testLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/admin-login', {
      email: 'suryanshnema12@gmail.com',
      password: 'admin1234'
    });
    console.log('Login successful:', response.data.user.email);
  } catch (error) {
    console.error('Login failed:', error.response?.status, error.response?.data?.message);
  }
};

testLogin();
