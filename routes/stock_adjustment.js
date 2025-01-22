const express = require('express');
const { getStockAdjustments, createStockAdjustment } = require('../controllers/stockAdjustmentController');
const router = express.Router();

router.get('/', getStockAdjustments);
// router.get('/:id', getMovementById);
router.post('/add', createStockAdjustment );
// router.delete('/delete/:id', deleteUser);
// router.put('/restore/:id', restoreUser);
// router.put('/edit/:id', editUser);

module.exports = router;