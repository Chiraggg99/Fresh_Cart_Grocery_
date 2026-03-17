// Cart Module — manages cart sidebar UI and cart API interactions

const Cart = {
  items: [],
  total: 0,
  count: 0,

  async init() {
    await this.refresh();
    this.bindEvents();
  },

  async refresh() {
    const data = await API.cart.get();
    this.items = data.items;
    this.total = data.total;
    this.count = data.count;
    this.render();
    this.updateBadge();
    
    // Synchronize product grid quantity controls
    if (typeof Products !== 'undefined' && Products.products && Products.products.length > 0) {
      Products.render();
    }
  },

  async addItem(productId, quantity = 1) {
    const data = await API.cart.add(productId, quantity);
    await this.refresh();
    App.showToast(`${data.item.name} added to cart`, 'success');
  },

  async updateQuantity(productId, quantity) {
    await API.cart.update(productId, quantity);
    await this.refresh();
  },

  async removeItem(productId) {
    const data = await API.cart.remove(productId);
    await this.refresh();
    App.showToast(`${data.message}`, 'success');
  },

  async clearCart() {
    await API.cart.clear();
    await this.refresh();
    App.showToast('Cart cleared', 'success');
  },

  render() {
    const itemsEl = document.getElementById('cart-items');
    const footerEl = document.getElementById('cart-footer');
    const emptyEl = document.getElementById('cart-empty');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (this.items.length === 0) {
      itemsEl.innerHTML = '';
      footerEl.classList.add('hidden');
      emptyEl.classList.add('visible');
      return;
    }

    emptyEl.classList.remove('visible');
    footerEl.classList.remove('hidden');

    subtotalEl.textContent = `₹${this.total.toFixed(2)}`;
    totalEl.textContent = `₹${this.total.toFixed(2)}`;

    itemsEl.innerHTML = this.items.map(item => `
      <div class="cart-item" data-id="${item.productId}">
        <span class="cart-item-emoji">${item.image}</span>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn ${item.quantity === 1 ? 'danger' : ''}" data-action="decrease" data-id="${item.productId}">−</button>
          <span class="cart-item-qty">${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.productId}">+</button>
        </div>
        <button class="cart-item-remove" data-action="remove" data-id="${item.productId}" title="Remove">🗑</button>
      </div>
    `).join('');
  },

  updateBadge() {
    const badge = document.getElementById('cart-badge');
    badge.textContent = this.count;
    if (this.count > 0) {
      badge.classList.remove('hidden');
      badge.classList.add('bounce');
      setTimeout(() => badge.classList.remove('bounce'), 400);
    } else {
      badge.classList.add('hidden');
    }
  },

  open() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
  },

  bindEvents() {
    // Cart toggle
    document.getElementById('cart-toggle-btn').addEventListener('click', () => this.open());
    document.getElementById('cart-close-btn').addEventListener('click', () => this.close());
    document.getElementById('cart-overlay').addEventListener('click', () => this.close());

    // Cart item actions (delegated)
    document.getElementById('cart-items').addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const productId = parseInt(btn.dataset.id);
      const action = btn.dataset.action;

      if (action === 'increase') {
        const item = this.items.find(i => i.productId === productId);
        if (item) await this.updateQuantity(productId, item.quantity + 1);
      } else if (action === 'decrease') {
        const item = this.items.find(i => i.productId === productId);
        if (item) {
          if (item.quantity <= 1) {
            await this.removeItem(productId);
          } else {
            await this.updateQuantity(productId, item.quantity - 1);
          }
        }
      } else if (action === 'remove') {
        await this.removeItem(productId);
      }
    });

    // Clear cart
    document.getElementById('clear-cart-btn').addEventListener('click', () => this.clearCart());

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', () => {
      OrdersUI.openCheckoutModal();
    });

    // Keyboard escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  },
};
