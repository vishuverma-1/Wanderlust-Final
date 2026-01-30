const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    activities: [String],
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
