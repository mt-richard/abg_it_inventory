const express = require('express');
const { getStockMovements } = require('../controllers/stockMovementsController');
const router = express.Router();

router.get('/', getStockMovements);


module.exports = router;