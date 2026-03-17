const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const products = require('../data/products');

// GET /api/cart — view cart
router.get('/', (req, res) => {
  res.json({
    items: Cart.getAll(),
    total: parseFloat(Cart.getTotal().toFixed(2)),
    count: Cart.getCount(),
  });
});

// POST /api/cart — add item to cart
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }

  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!product.inStock) {
    return res.status(400).json({ error: 'Product is out of stock' });
  }

  const item = Cart.addItem(product, quantity || 1);
  res.status(201).json({
    message: `${product.name} added to cart`,
    item,
    cart: {
      total: parseFloat(Cart.getTotal().toFixed(2)),
      count: Cart.getCount(),
    },
  });
});

// PUT /api/cart/:productId — update quantity
router.put('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;

  if (quantity === undefined || quantity === null) {
    return res.status(400).json({ error: 'quantity is required' });
  }

  const item = Cart.updateQuantity(productId, parseInt(quantity));
  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  res.json({
    message: 'Cart updated',
    item,
    cart: {
      total: parseFloat(Cart.getTotal().toFixed(2)),
      count: Cart.getCount(),
    },
  });
});

// DELETE /api/cart/:productId — remove item from cart
router.delete('/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const removed = Cart.removeItem(productId);

  if (!removed) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  res.json({
    message: `${removed.name} removed from cart`,
    cart: {
      total: parseFloat(Cart.getTotal().toFixed(2)),
      count: Cart.getCount(),
    },
  });
});

// DELETE /api/cart — clear entire cart
router.delete('/', (req, res) => {
  Cart.clear();
  res.json({ message: 'Cart cleared', cart: { total: 0, count: 0 } });
});

module.exports = router;
