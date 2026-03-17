const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Orders = require('../models/orders');

// POST /api/orders — place an order from current cart
router.post('/', (req, res) => {
  const items = Cart.getAll();

  if (items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty. Add items before placing an order.' });
  }

  const total = Cart.getTotal();
  const orderItems = Cart.getSnapshot();
  const order = Orders.create(orderItems, total);
  Cart.clear();

  res.status(201).json({
    message: 'Order placed successfully!',
    order,
  });
});

// GET /api/orders — list all orders
router.get('/', (req, res) => {
  const orders = Orders.getAll();
  res.json({
    count: orders.length,
    orders,
  });
});

// GET /api/orders/:id — get single order
router.get('/:id', (req, res) => {
  const order = Orders.getById(parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

module.exports = router;
