const express = require('express');
const { getAllAssignments, createItemAssign, getAssignmentsByItemId } = require('../controllers/itemAssignController');
const router = express.Router();

router.get('/', getAllAssignments);
router.get('/:itemId', getAssignmentsByItemId);
router.post('/', createItemAssign);
// router.delete('/delete/:id', deleteUser);
// router.put('/restore/:id', restoreUser);
// router.put('/edit/:id', editUser);

module.exports = router;