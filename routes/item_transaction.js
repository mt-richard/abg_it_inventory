const express = require('express');
const { getTransaction, createTransactions } = require('../controllers/transctionController');
const router = express.Router();

router.get('/', getTransaction);
// router.get('/:id', getMovementById);
router.post('/add', createTransactions);
// router.delete('/delete/:id', deleteUser);
// router.put('/restore/:id', restoreUser);
// router.put('/edit/:id', editUser);

module.exports = router;