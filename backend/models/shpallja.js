const mongoose = require('mongoose');

const shpalljaSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    category: { type: String, required: true },
    komuna: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0},
    images: { type: Array, required: true },
    rating: { type: Array },
    isApproved: { type: Boolean, default: false },
}, {
    timestamps: true
})

const shpalljaModel = mongoose.model('Shpalljet', shpalljaSchema);

module.exports = shpalljaModel;