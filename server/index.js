const express = require('express');
const path = require('path');
const cors = require('cors');

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all: serve index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start server only if not being imported as a module (e.g., for Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('');
    console.log('  🛒  Grocery App Server Running!');
    console.log(`  📍  http://localhost:${PORT}`);
    console.log('');
  });
}

// Export the app instance for Vercel serverless functions
module.exports = app;
