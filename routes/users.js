const express = require('express');
const { getUsers, createUser, getUserByID, deleteUser, restoreUser, editUser } = require('../controllers/usersController');
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserByID);
router.post('/add', createUser);
router.delete('/delete/:id', deleteUser);
router.put('/restore/:id', restoreUser);
router.put('/edit/:id', editUser);

module.exports = router;