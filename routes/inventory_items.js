const express = require('express');
const { getUsers, createUser, getUserByID, deleteUser, restoreUser, editUser } = require('../controllers/usersController');
const { getItemsInStock, getItemById, createStockItems } = require('../controllers/inventoryItemsController');
const router = express.Router();

router.get('/', getItemsInStock);
router.get('/:id', getItemById);
router.post('/add', createStockItems);
// router.delete('/delete/:id', deleteUser);
// router.put('/restore/:id', restoreUser);
// router.put('/edit/:id', editUser);

module.exports = router;