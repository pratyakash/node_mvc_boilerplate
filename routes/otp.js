const express = require('express');

const router = express.Router();
const otpController = require('../controllers/otpController');

router
    .post('/verifyEmailOtp', (req, res) => otpController.verifyEmailOtp(req, res))

module.exports = router;
