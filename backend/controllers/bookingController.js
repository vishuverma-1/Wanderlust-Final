const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
    const { packageId, date, travelers } = req.body;
    const booking = new Booking({
        user: req.user._id,
        package: packageId,
        date,
        travelers,
    });
    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
};

const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate('package');
    res.json(bookings);
};

module.exports = { createBooking, getMyBookings };
