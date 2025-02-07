const express = require('express');
const { getDivisions, getDivisionByID, createDivision, deleteDivision, restoreDivision, editDivision } = require('../controllers/divisionController');
const router = express.Router();

router.get('/', getDivisions);
router.get('/:id', getDivisionByID);
router.post('/add', createDivision);
router.delete('/delete/:id', deleteDivision);
router.put('/restore/:id', restoreDivision);
router.put('/edit/:id', editDivision);

module.exports = router;