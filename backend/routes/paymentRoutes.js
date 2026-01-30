const express = require('express');
const router = express.Router();
const { createPaymentIntent, hireGuide } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/hire-guide', protect, hireGuide);

module.exports = router;
