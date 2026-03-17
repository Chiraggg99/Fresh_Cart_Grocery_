const express = require('express');
const router = express.Router();
const products = require('../data/products');

// GET /api/products — list all products, optionally filter by category or search
router.get('/', (req, res) => {
  let result = [...products];

  // Filter by category
  if (req.query.category) {
    result = result.filter(
      p => p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  // Search by name
  if (req.query.search) {
    const term = req.query.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(term));
  }

  res.json({
    count: result.length,
    products: result,
  });
});

// GET /api/products/categories — list all categories
router.get('/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json({ categories });
});

// GET /api/products/:id — get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
