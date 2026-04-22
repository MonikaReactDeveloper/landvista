const express = require('express');
const app = express();

const router1 = express.Router();
router1.get('/property', (req, res) => res.send('property'));

const router2 = express.Router();
router2.get('/', (req, res) => res.send('services'));

app.use('/api', router1);
app.use('/api/services', router2);

app.get('/test', (req, res) => {
  res.send("test OK");
});

app.listen(3001, () => console.log('test server running'));
