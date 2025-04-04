const pool = require('../db');

const getHeatAlertCountsByYear = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT year, COUNT(*) AS alert_count
      FROM heat_alerts
      GROUP BY year
      ORDER BY year;
    `);
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error('Error fetching heat alert counts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getHeatAlertCountsByYear,
};
