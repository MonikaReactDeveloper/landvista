require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const propertyRoutes = require('./routes/propertyRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const insightRoutes = require('./routes/insightRoutes');

app.use('/api', propertyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/insights', insightRoutes);

// test route
app.get('/', (req, res) => {
  res.send("🚀 LandVista API Running");
});

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();