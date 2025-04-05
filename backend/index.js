require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const heatAlertRoutes = require('./routes/heatAlertRoutes');


const app = express();
app.use(cors());
app.use(express.json()); 

app.use('/api/heat-alerts', heatAlertRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
