const mongoose = require('mongoose');

const consumedProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    kcal: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const ConsumedProduct = mongoose.model('ConsumedProduct', consumedProductSchema);
module.exports = ConsumedProduct;
