const express = require('express');
const { getItemsMovements, getMovementById, createStockMovement } = require('../controllers/stockMovementController');
const router = express.Router();

router.get('/', getItemsMovements);
router.get('/:id', getMovementById);
router.post('/add', createStockMovement);
// router.delete('/delete/:id', deleteUser);
// router.put('/restore/:id', restoreUser);
// router.put('/edit/:id', editUser);

module.exports = router;