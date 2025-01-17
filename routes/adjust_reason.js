const express = require('express');
const { getSuppliers, getSupplierById, createSupplier, deleteSupplier, restoreSupplier, editSupplier } = require('../controllers/supplierController');
const { getAdjustReasons, createReason, getReasonById, editReason, deleteReason, restoreReason } = require('../controllers/adjustReasonController');
const router = express.Router();

router.get('/', getAdjustReasons);
router.get('/:id', getReasonById);
router.post('/add', createReason);
router.delete('/delete/:id', deleteReason);
router.put('/restore/:id', restoreReason);
router.put('/edit/:id', editReason);

module.exports = router;