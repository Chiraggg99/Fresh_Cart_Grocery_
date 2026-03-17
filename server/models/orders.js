// In-memory orders store
let orders = [];
let nextId = 1;

const Orders = {
  create(items, total) {
    const order = {
      id: nextId++,
      items: items.map(item => ({ ...item })),
      total: parseFloat(total.toFixed(2)),
      date: new Date().toISOString(),
      status: 'confirmed',
    };
    orders.push(order);
    return order;
  },

  getAll() {
    return [...orders].reverse(); // newest first
  },

  getById(id) {
    return orders.find(order => order.id === id) || null;
  }
};

module.exports = Orders;
