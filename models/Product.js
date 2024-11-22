const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    categories: { type: String, required: true },
    weight: { type: Number, required: true },
    title: { type: String, required: true },
    calories: { type: Number, required: true, default: 0 },
    groupBloodNotAllowed: { type: [Boolean], required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
