// Products Module — renders product grid and handles add-to-cart

const Products = {
  currentCategory: 'all',
  currentSort: 'default',
  products: [],
  favorites: [],

  async init() {
    this.favorites = JSON.parse(localStorage.getItem('freshcart_favorites')) || [];
    await this.loadProducts();
    this.bindEvents();
  },

  async loadProducts(category) {
    if (category) this.currentCategory = category;

    const grid = document.getElementById('product-grid');
    grid.innerHTML = this.renderSkeletons(8);

    if (this.currentCategory === 'favorites') {
      const data = await API.products.getAll('all');
      this.products = data.products.filter(p => this.favorites.includes(p.id));
    } else {
      const data = await API.products.getAll(this.currentCategory);
      this.products = data.products;
    }

    this.render();
  },

  async search(term) {
    if (!term.trim()) {
      return this.loadProducts(this.currentCategory);
    }

    const grid = document.getElementById('product-grid');
    grid.innerHTML = this.renderSkeletons(4);

    const data = await API.products.search(term);
    this.products = data.products;
    this.render();

    document.getElementById('section-title').textContent =
      `Results for "${term}"`;
    document.getElementById('product-count').textContent =
      `${data.count} item${data.count !== 1 ? 's' : ''}`;
  },

  render() {
    const grid = document.getElementById('product-grid');
    const title = document.getElementById('section-title');
    const count = document.getElementById('product-count');

    if (this.currentCategory === 'all') {
      title.textContent = 'All Groceries';
    } else if (this.currentCategory === 'favorites') {
      title.textContent = 'My Favorites ❤️';
    } else {
      title.textContent = this.currentCategory;
    }
    count.textContent = `${this.products.length} item${this.products.length !== 1 ? 's' : ''}`;

    if (this.products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 64px; margin-bottom: 16px; opacity: 0.3;">🔍</div>
          <p style="font-size: 16px; color: var(--text-secondary);">No products found</p>
        </div>
      `;
      return;
    }

    let sortedProducts = [...this.products];
    if (this.currentSort === 'price-low') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'price-high') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (this.currentSort === 'name-a-z') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    grid.innerHTML = sortedProducts.map(p => this.renderCard(p)).join('');
  },

  renderCard(product) {
    const cartItem = Cart.items.find(i => i.productId === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    let actionHtml = '';
    if (quantity > 0) {
      actionHtml = `
        <div class="product-qty-controls">
          <button class="product-qty-btn ${quantity === 1 ? 'danger' : ''}" data-action="decrease" data-id="${product.id}">−</button>
          <span class="product-qty-value">${quantity}</span>
          <button class="product-qty-btn" data-action="increase" data-id="${product.id}">+</button>
        </div>
      `;
    } else {
      actionHtml = `
        <button class="add-to-cart-btn" data-id="${product.id}" id="add-btn-${product.id}">
          <span>+ Add</span>
        </button>
      `;
    }

    return `
      <div class="product-card" id="product-${product.id}">
        <button class="favorite-btn ${this.favorites.includes(product.id) ? 'active' : ''}" data-id="${product.id}" title="Toggle Favorite">
          ${this.favorites.includes(product.id) ? '❤️' : '🤍'}
        </button>
        <div class="product-emoji" data-action="open-modal" data-id="${product.id}">${product.image}</div>
        <span class="product-category">${product.category}</span>
        <h3 class="product-name" data-action="open-modal" data-id="${product.id}">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-bottom">
          <div>
            <span class="product-price">₹${product.price.toFixed(2)}</span>
            <span class="product-unit">/ ${product.unit}</span>
          </div>
          ${actionHtml}
        </div>
      </div>
    `;
  },

  openModal(productId) {
    const product = this.products.length > 0 ? this.products.find(p => p.id === productId) : null;
    if (!product) return;

    const body = document.getElementById('product-modal-body');
    
    // Mock some nutritional info based on ID
    const calories = 50 + (product.id * 7) % 200;
    const protein = (product.id * 3) % 15;
    const shelfLife = 3 + (product.id * 2) % 10;

    body.innerHTML = `
      <div class="modal-image-side">${product.image}</div>
      <div class="modal-info-side">
        <span class="product-category">${product.category}</span>
        <h2>${product.name}</h2>
        <p class="modal-description">${product.description} Our ${product.name.toLowerCase()} are sourced fresh daily from local sustainable farms to ensure the highest quality for your kitchen.</p>
        
        <div class="modal-stats">
          <div class="stat-item">
            <span class="stat-label">Energy</span>
            <span class="stat-value">${calories} kcal / 100g</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Shelf Life</span>
            <span class="stat-value">${shelfLife} days</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Protein</span>
            <span class="stat-value">${protein}g / 100g</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Origin</span>
            <span class="stat-value">Local Farm</span>
          </div>
        </div>

        <div class="modal-footer">
          <div class="modal-price-wrap">
            <span class="modal-price">₹${product.price.toFixed(2)}</span>
            <span class="modal-unit">per ${product.unit}</span>
          </div>
          <button class="add-to-cart-btn" data-id="${product.id}" style="width: auto;">
            <span>+ Add to Cart</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('product-modal').classList.add('open');
    document.getElementById('product-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    document.getElementById('product-modal').classList.remove('open');
    document.getElementById('product-overlay').classList.remove('open');
    document.body.style.overflow = '';
  },

  renderSkeletons(count) {
    return Array(count).fill('<div class="skeleton-card"></div>').join('');
  },

  bindEvents() {
    // Add to cart and quantity clicks (delegated)
    document.getElementById('product-grid').addEventListener('click', async (e) => {
      // Add to cart initial click
      const addBtn = e.target.closest('.add-to-cart-btn');
      if (addBtn) {
        const productId = parseInt(addBtn.dataset.id);
        addBtn.innerHTML = '<span>✓ Added</span>';
        addBtn.classList.add('added');
        await Cart.addItem(productId);
        return;
      }

      // Quantity controls
      const qtyBtn = e.target.closest('.product-qty-btn');
      if (qtyBtn) {
        const productId = parseInt(qtyBtn.dataset.id);
        const action = qtyBtn.dataset.action;
        const cartItem = Cart.items.find(i => i.productId === productId);
        
        if (!cartItem) return;

        if (action === 'increase') {
          await Cart.updateQuantity(productId, cartItem.quantity + 1);
        } else if (action === 'decrease') {
          if (cartItem.quantity <= 1) {
            await Cart.removeItem(productId);
          } else {
            await Cart.updateQuantity(productId, cartItem.quantity - 1);
          }
        }
      }

      // Favorite toggle
      const favBtn = e.target.closest('.favorite-btn');
      if (favBtn) {
        const productId = parseInt(favBtn.dataset.id);
        const isFavorite = this.favorites.includes(productId);
        
        if (isFavorite) {
          this.favorites = this.favorites.filter(id => id !== productId);
          favBtn.classList.remove('active');
          favBtn.innerHTML = '🤍';
          App.showToast('Removed from favorites', 'info');
          
          // If currently in favorites view, we should re-render or animate removal
          if (this.currentCategory === 'favorites') {
            this.loadProducts('favorites');
          }
        } else {
          this.favorites.push(productId);
          favBtn.classList.add('active');
          favBtn.innerHTML = '❤️';
          App.showToast('Added to favorites', 'success');
        }
        
        localStorage.setItem('freshcart_favorites', JSON.stringify(this.favorites));
      }
    });

    // Category pills
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.loadProducts(pill.dataset.category);
        App.showView('products');
      });
    });

    // Search input
    let searchTimeout;
    document.getElementById('search-input').addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.search(e.target.value);
      }, 300);
    });

    // Sort dropdown
    document.getElementById('sort-select').addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.render();
    });

    // Modal clicks
    document.getElementById('product-grid').addEventListener('click', (e) => {
      const modalTrigger = e.target.closest('[data-action="open-modal"]');
      if (modalTrigger) {
        this.openModal(parseInt(modalTrigger.dataset.id));
      }
    });

    document.getElementById('product-modal-close').addEventListener('click', () => this.closeModal());
    document.getElementById('product-overlay').addEventListener('click', () => this.closeModal());

    // Delegate add-to-cart clicks from modal footer too
    document.getElementById('product-modal-body').addEventListener('click', async (e) => {
      const btn = e.target.closest('.add-to-cart-btn');
      if (!btn) return;
      
      const productId = parseInt(btn.dataset.id);
      btn.innerHTML = '<span>✓ Added</span>';
      
      await Cart.addItem(productId);
      
      setTimeout(() => {
        btn.innerHTML = '<span>+ Add to Cart</span>';
        this.closeModal();
      }, 800);
    });
  },
};
