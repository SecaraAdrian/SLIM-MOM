const mongoose = require('mongoose');
const fs = require('fs');
const { ObjectId } = require('mongodb'); // Importăm ObjectId pentru a converti `_id`
const Product = require('./models/Product'); // Modelul Product

const dotenv = require('dotenv');
dotenv.config();

const seedDatabase = async () => {
    try {
        // Conectare la MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Citește fișierul JSON
        const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

        // Transformă `_id` în `ObjectId` și corectează produsele cu câmpuri lipsă
        const productsWithObjectId = products.map(product => {
            // Verificăm și logăm produsele cu câmpuri lipsă
            if (!product.calories) {
                console.warn('Product missing calories, setting default:', product.title || 'Unknown Title');
            }

            return {
                ...product,
                _id: new ObjectId(product._id.$oid), // Convertim `_id` în ObjectId
                calories: product.calories || 0,    // Setăm o valoare implicită pentru `calories`
            };
        });

        // Șterge toate datele existente din colecția `products`
        await Product.deleteMany();

        // Adaugă produsele în baza de date
        await Product.insertMany(productsWithObjectId);

        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error.message);
        process.exit(1);
    }
};

// Rulează funcția pentru a popula baza de date
seedDatabase();
