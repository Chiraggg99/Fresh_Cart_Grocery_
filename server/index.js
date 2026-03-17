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

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('  🛒  Grocery App Server Running!');
  console.log(`  📍  http://localhost:${PORT}`);
  console.log('');
  console.log('  API Endpoints:');
  console.log(`  GET    /api/products          - List all products`);
  console.log(`  GET    /api/products/:id       - Get product by ID`);
  console.log(`  GET    /api/products/categories - List categories`);
  console.log(`  GET    /api/cart               - View cart`);
  console.log(`  POST   /api/cart               - Add to cart`);
  console.log(`  PUT    /api/cart/:productId    - Update quantity`);
  console.log(`  DELETE /api/cart/:productId    - Remove from cart`);
  console.log(`  DELETE /api/cart               - Clear cart`);
  console.log(`  POST   /api/orders             - Place order`);
  console.log(`  GET    /api/orders             - View orders`);
  console.log('');
});
