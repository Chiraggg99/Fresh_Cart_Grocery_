// App Controller — initializes modules, manages views and toasts

const App = {
  currentView: 'products',

  async init() {
    await Products.init();
    await Cart.init();
    this.bindEvents();
    console.log('🛒 FreshCart app loaded!');
  },

  showView(view) {
    this.currentView = view;

    // Hide all views
    document.getElementById('products-view').classList.remove('active');
    document.getElementById('orders-view').classList.remove('active');
    document.getElementById('order-success-view').classList.remove('active');

    // Show target view
    if (view === 'products') {
      document.getElementById('products-view').classList.add('active');
    } else if (view === 'orders') {
      document.getElementById('orders-view').classList.add('active');
      OrdersUI.loadOrders();
    } else if (view === 'order-success') {
      document.getElementById('order-success-view').classList.add('active');
    }
  },

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✅' : '⚠️'}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 250);
    }, 2500);
  },

  bindEvents() {
    // Logo click → go home
    document.getElementById('logo').addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      document.querySelector('[data-category="all"]').classList.add('active');
      Products.loadProducts('all');
      this.showView('products');
      document.getElementById('search-input').value = '';
    });

    // Continue shopping button (order success)
    document.getElementById('continue-shopping-btn').addEventListener('click', () => {
      this.showView('products');
    });

    // View orders button (order success)
    document.getElementById('view-orders-btn').addEventListener('click', () => {
      this.showView('orders');
    });
  },
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
