const express = require('express');
const { getConsumedProductsByDay, deleteConsumedProduct } = require('../controllers/productController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/day', authMiddleware, getConsumedProductsByDay);


router.delete('/delete/:id', authMiddleware, deleteConsumedProduct);

module.exports = router;
