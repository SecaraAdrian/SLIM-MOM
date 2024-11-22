const ConsumedProduct = require('../models/ConsumedProduct');

// Funcția pentru a verifica produsele consumate într-o zi
exports.getConsumedProductsByDay = async (req, res) => {
    try {
        const { date } = req.query;

        console.log('Date query parameter:', date);
        console.log('User ID from token:', req.user.id);

        if (!date) {
            console.log('No date provided');
            return res.status(400).json({ message: 'Date query parameter is required' });
        }

        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const products = await ConsumedProduct.find({
            userId: req.user.id,
            date: { $gte: startOfDay, $lte: endOfDay },
        });

        console.log('Products found:', products);

        res.json(products);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Funcția pentru ștergerea unui produs consumat
exports.deleteConsumedProduct = async (req, res) => {
    try {
        const { id } = req.params; // Extrage ID-ul produsului din URL

        console.log('Product ID to delete:', id);

        const product = await ConsumedProduct.findByIdAndDelete(id); // Șterge produsul din baza de date

        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product deleted:', product);

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
