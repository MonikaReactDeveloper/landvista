const express = require('express');
const app = express();
const router = express.Router();
app.use('/test', { default: router });
app.listen(3002);
