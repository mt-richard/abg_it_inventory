const express = require('express');
const { Login } = require('../controllers/usersController');
const router = express.Router();

router.post('/login', Login);

module.exports = router;