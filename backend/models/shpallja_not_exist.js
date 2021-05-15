const mongoose = require('mongoose');

const shpalljaNotExistSchema = mongoose.Schema({
    name: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
  
}, {
    timestamps: true
})

const shpalljaNotFoundModel = mongoose.model('ShpalljetNotFound', shpalljaNotExistSchema);

module.exports = shpalljaNotFoundModel;