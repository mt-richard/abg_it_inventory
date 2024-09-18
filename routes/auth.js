const express = require('express');
const { Login, sendOTP, validateOTP, resetPassword } = require('../controllers/usersController');
const router = express.Router();

router.post('/login', Login);
router.post('/send_otp', sendOTP);
router.post('/validate_otp', validateOTP);
router.post('/reset_password', resetPassword);


module.exports = router;