const express = require('express');
const { getSuppliers, getSupplierById, createSupplier, deleteSupplier, restoreSupplier, editSupplier } = require('../controllers/supplierController');
const router = express.Router();

router.get('/', getSuppliers);
router.get('/:id', getSupplierById);
router.post('/add', createSupplier);
router.delete('/delete/:id', deleteSupplier);
router.put('/restore/:id', restoreSupplier);
router.put('/edit/:id', editSupplier);

module.exports = router;