const express = require('express');
const { getDailyKcal, getPrivateDailyKcal } = require('../controllers/kcalController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/daily-kcal', getDailyKcal);
router.get('/private-daily-kcal', authMiddleware, getPrivateDailyKcal);

module.exports = router;
