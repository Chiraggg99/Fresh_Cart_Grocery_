# 🛒 FreshCart — Premium Grocery Store

![FreshCart Banner](https://raw.githubusercontent.com/Chiraggg99/Fresh_Cart_Grocery_/main/public/banner.png)

FreshCart is a sleek, modern, and high-performance full-stack grocery application designed for a premium shopping experience. Built with a focus on rich aesthetics, smooth interactions, and a simplified checkout flow.

![GitHub repo size](https://img.shields.io/github/repo-size/Chiraggg99/Fresh_Cart_Grocery_?color=green)
![GitHub license](https://img.shields.io/github/license/Chiraggg99/Fresh_Cart_Grocery_)

## ✨ Key Features

- **💎 Premium Design**: Sleek dark mode interface with glassmorphism, vibrant accents, and smooth animations.
- **🔍 Product Details**: Dedicated modal for every product with detailed descriptions and nutritional stats.
- **🛍️ Product Discovery**: Browse by categories with real-time search and **Price Sorting** (Low to High / High to Low).
- **🇮🇳 INR Currency**: Full support for Indian Rupee (₹) with realistic market prices.
- **⭐ Favorites System**: Quickly save items to your wishlist for later.
- **🛒 Advanced Cart**: Manage quantities directly from the product cards or the sidebar cart.
- **⚡ Super-Fast Checkout**: A streamlined 1-click payment simulation—no long forms, just pay and go.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.

## 🚀 Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (Modern Flexbox/Grid), JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Deployment**: Vercel-ready configuration included.

## 🛠️ Installation & Local Setup

Prerequisites: [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Chiraggg99/Fresh_Cart_Grocery_.git
   cd Fresh_Cart_Grocery_
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open in your browser**:
   Navigate to `http://localhost:3000`

## 🔌 API Endpoints (Express)

The backend provides a RESTful API for all grocery operations:
- `GET /api/products` - Fetch all products (with search/category filters).
- `GET /api/products/categories` - List available categories.
- `GET /api/cart` - Retrieve current cart session.
- `POST /api/cart` - Add an item to the cart.
- `POST /api/orders` - Simulate order placement.

## 📸 Showcase

<p align="center">
  <img src="public/screenshots/homepage.png" width="800" alt="FreshCart Homepage" />
</p>
<p align="center">
  <img src="public/screenshots/product-details.png" width="400" alt="Product Details" />
  <img src="public/screenshots/checkout.png" width="400" alt="Simplified Checkout" />
</p>

## 📦 Project Structure

```text
├── public/          # Frontend assets (HTML, CSS, JS)
│   ├── css/         # Modern styling & animations
│   ├── js/          # Frontend logic (Cart, Products, API)
│   └── index.html   # Main application shell
├── server/          # Node.js/Express backend
│   ├── data/        # Product and Mock Data
│   ├── routes/      # API Endpoints
│   └── index.js     # Server entry point
├── vercel.json      # Deployment configuration
└── package.json     # Project dependencies
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Contributing

This is an open-source project. Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🗺️ Roadmap

- [ ] **User Authentication**: Allow users to create accounts and save addresses.
- [ ] **Real Payment Integration**: Integrate Razorpay or Stripe for actual transactions.
- [ ] **Order Tracking**: Real-time status updates for active orders.
- [ ] **Reviews & Ratings**: Let customers share feedback on products.

---
Built with ❤️ by [Chirag Singh](https://github.com/Chiraggg99)
