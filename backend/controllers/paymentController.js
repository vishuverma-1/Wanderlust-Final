const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy'); // Fallback to dummy to prevent crash if not set

const createPaymentIntent = async (req, res) => {
    const { amount, currency = 'usd', description } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects amount in cents
            currency,
            description,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ message: 'Payment failed', error: error.message });
    }
};

const hireGuide = async (req, res) => {
    // This is a placeholder for the hiring logic.
    // In a real app, this would verify the payment success first (e.g. via webhook)
    // and then create a booking/contract record.
    const { guideId, days, amount } = req.body;

    // Validate guide existence etc. (Skipped for brevity)

    res.json({ message: 'Guide hiring process initiated', guideId, days, amount });
};

module.exports = { createPaymentIntent, hireGuide };
