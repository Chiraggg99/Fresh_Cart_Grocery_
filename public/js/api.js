// API Client Helper — handles all fetch requests to the backend

const API = {
  BASE: '/api',

  async get(endpoint) {
    const res = await fetch(`${this.BASE}${endpoint}`);
    return res.json();
  },

  async post(endpoint, data) {
    const res = await fetch(`${this.BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async put(endpoint, data) {
    const res = await fetch(`${this.BASE}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async delete(endpoint) {
    const res = await fetch(`${this.BASE}${endpoint}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Product endpoints
  products: {
    getAll(category) {
      const query = category && category !== 'all' ? `?category=${category}` : '';
      return API.get(`/products${query}`);
    },
    search(term) {
      return API.get(`/products?search=${encodeURIComponent(term)}`);
    },
    getById(id) {
      return API.get(`/products/${id}`);
    },
    getCategories() {
      return API.get('/products/categories');
    },
  },

  // Cart endpoints
  cart: {
    get() {
      return API.get('/cart');
    },
    add(productId, quantity = 1) {
      return API.post('/cart', { productId, quantity });
    },
    update(productId, quantity) {
      return API.put(`/cart/${productId}`, { quantity });
    },
    remove(productId) {
      return API.delete(`/cart/${productId}`);
    },
    clear() {
      return API.delete('/cart');
    },
  },

  // Order endpoints
  orders: {
    place() {
      return API.post('/orders', {});
    },
    getAll() {
      return API.get('/orders');
    },
    getById(id) {
      return API.get(`/orders/${id}`);
    },
  },
};
