const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const kcalRoutes = require('./routes/kcalRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Configurează un folder static pentru a servi fișiere (inclusiv favicon)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principală
app.get('/', (req, res) => {
    res.json({ message: 'Hello! Slim Mom API is ready to serve your requests.' });
});

// Rutele aplicației
app.use('/auth', authRoutes);
app.use('/kcal', kcalRoutes);
app.use('/products', productRoutes);

// Ruta de fallback pentru 404
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

module.exports = app;
