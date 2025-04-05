// backend/db.js
const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: parseInt(process.env.PG_PORT, 10),
  ssl: {
    rejectUnauthorized: false
  }
});


module.exports = pool;
