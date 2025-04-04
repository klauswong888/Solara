const express = require('express');
const router = express.Router();
const { getHeatAlertCountsByYear } = require('../controllers/heatAlertController');

router.get('/count-by-year', getHeatAlertCountsByYear);

module.exports = router;
