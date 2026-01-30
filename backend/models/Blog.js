const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    tags: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
