// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'solara.cnocc4k2osed.ap-southeast-2.rds.amazonaws.com',
  user: 'postgres',
  password: 'Fit5120!',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false // 让 Node.js 信任 AWS 提供的证书
  }
});

module.exports = pool;
