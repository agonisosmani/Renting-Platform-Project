const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    images: { type: Array, required: true },
    rating: { type: Number, required: true }
}, {
    timestamps: true
})

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;