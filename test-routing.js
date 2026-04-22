const express = require('express');
const app = express();

const propertyRoutes = express.Router();
propertyRoutes.get('/property', (req, res) => res.send('property'));

const serviceRoutes = express.Router();
serviceRoutes.get('/', (req, res) => res.send('services'));

app.use('/api', propertyRoutes);
app.use('/api/services', serviceRoutes);

app.listen(3002, async () => {
  try {
    const res = await fetch('http://localhost:3002/api/services');
    console.log("Status:", res.status);
    console.log("Text:", await res.text());
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
});
