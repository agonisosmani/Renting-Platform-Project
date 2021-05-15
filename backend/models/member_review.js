const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true
})

const memberModel = mongoose.model('Member', memberSchema);

module.exports = memberModel;