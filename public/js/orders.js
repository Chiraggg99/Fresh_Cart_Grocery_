// Orders Module — handles checkout flow and order history

const OrdersUI = {
  orders: [],

  openCheckoutModal() {
    if (Cart.items.length === 0) {
      App.showToast('Your cart is empty!', 'error');
      return;
    }
    document.getElementById('checkout-pay-total').textContent = `₹${Cart.total.toFixed(2)}`;
    document.getElementById('checkout-modal').classList.add('open');
    document.getElementById('checkout-overlay').classList.add('open');
    Cart.close(); // hide cart sidebar behind modal
  },

  closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.remove('open');
    document.getElementById('checkout-overlay').classList.remove('open');
  },

  async placeOrder(event) {
    if (event) event.preventDefault();

    if (Cart.items.length === 0) {
      App.showToast('Your cart is empty!', 'error');
      return;
    }

    const payBtn = document.getElementById('pay-btn');
    const payText = payBtn.querySelector('.pay-text');
    const spinner = document.getElementById('pay-spinner');

    // Show loading state
    payBtn.disabled = true;
    payText.classList.add('hidden');
    spinner.classList.remove('hidden');

    // Simulate network delay for payment
    await new Promise(resolve => setTimeout(resolve, 1000));

    const data = await API.orders.place();

    // Reset button state
    payBtn.disabled = false;
    payText.classList.remove('hidden');
    spinner.classList.add('hidden');

    if (data.error) {
      App.showToast(data.error, 'error');
      return;
    }

    // Close checkout modal
    this.closeCheckoutModal();
    await Cart.refresh();

    // Show success screen
    document.getElementById('success-order-id').textContent = `Order #${data.order.id}`;
    document.getElementById('success-total').textContent = `Total: ₹${data.order.total.toFixed(2)}`;
    App.showView('order-success');
  },

  async loadOrders() {
    const data = await API.orders.getAll();
    this.orders = data.orders;
    this.render();
  },

  render() {
    const list = document.getElementById('orders-list');

    if (this.orders.length === 0) {
      list.innerHTML = `
        <div class="orders-empty">
          <div class="orders-empty-icon">📦</div>
          <p>No orders yet</p>
          <small>Place your first order to see it here!</small>
        </div>
      `;
      return;
    }

    list.innerHTML = this.orders.map(order => `
      <div class="order-card">
        <div class="order-card-header">
          <span class="order-id">Order #${order.id}</span>
          <span class="order-status">${order.status}</span>
        </div>
        <div class="order-items-list">
          ${order.items.map(item => `
            <div class="order-item-row">
              <span>${item.image} ${item.name} × ${item.quantity}</span>
              <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        <div class="order-footer">
          <span class="order-date">${new Date(order.date).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
          })}</span>
          <span class="order-total">₹${order.total.toFixed(2)}</span>
        </div>
      </div>
    `).join('');
  },

  bindEvents() {
    document.getElementById('checkout-close-btn').addEventListener('click', () => this.closeCheckoutModal());
    document.getElementById('checkout-overlay').addEventListener('click', () => this.closeCheckoutModal());
    document.getElementById('checkout-form').addEventListener('submit', (e) => this.placeOrder(e));
  }
};

// Initialize events when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  OrdersUI.bindEvents();
});
