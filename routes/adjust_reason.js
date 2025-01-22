const express = require('express');
const { getAdjustReasons, createReason, getReasonById, editReason, deleteReason, restoreReason } = require('../controllers/adjustReasonController');
const router = express.Router();

router.get('/', getAdjustReasons);
router.get('/:id', getReasonById);
router.post('/add', createReason);
router.delete('/delete/:id', deleteReason);
router.put('/restore/:id', restoreReason);
router.put('/edit/:id', editReason);

module.exports = router;