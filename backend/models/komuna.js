const mongoose = require('mongoose');

const komunaSchema = mongoose.Schema({
    name: { type: String, required: true },
}, {
    timestamps: true
})

const komunaModel = mongoose.model('Komuna', komunaSchema);

module.exports = komunaModel;