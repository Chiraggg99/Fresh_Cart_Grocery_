// In-memory cart store
let cartItems = [];

const Cart = {
  getAll() {
    return cartItems;
  },

  addItem(product, quantity = 1) {
    const existing = cartItems.find(item => item.productId === product.id);
    if (existing) {
      existing.quantity += quantity;
      return existing;
    }
    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: product.unit,
      quantity,
    };
    cartItems.push(newItem);
    return newItem;
  },

  updateQuantity(productId, quantity) {
    const item = cartItems.find(item => item.productId === productId);
    if (!item) return null;
    if (quantity <= 0) {
      return Cart.removeItem(productId);
    }
    item.quantity = quantity;
    return item;
  },

  removeItem(productId) {
    const index = cartItems.findIndex(item => item.productId === productId);
    if (index === -1) return null;
    const removed = cartItems.splice(index, 1)[0];
    return removed;
  },

  clear() {
    cartItems = [];
    return { message: 'Cart cleared' };
  },

  getTotal() {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getCount() {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  },

  getSnapshot() {
    return [...cartItems.map(item => ({ ...item }))];
  }
};

module.exports = Cart;
