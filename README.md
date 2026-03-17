# 🛒 FreshCart — Premium Grocery Store

![FreshCart Banner](https://raw.githubusercontent.com/Chiraggg99/Fresh_Cart_Grocery_/main/public/banner.png)

FreshCart is a comprehensive full-stack e-commerce solution tailored for modern grocery retail. It combines a high-end, dark-themed user interface with a robust Node.js backend to provide a seamless shopping experience. Built with a primary focus on performance, rich aesthetics (Glassmorphism), and a frictionless checkout flow specifically optimized for the Indian market.

![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Web-blue)
![Stack](https://img.shields.io/badge/stack-Node.js%20%7C%20VanillaJS-orange)
![Deployment](https://img.shields.io/badge/deployment-Vercel-black.svg?logo=vercel)

### 🌍 [Live Demo: fresh-cart-grocery.vercel.app](https://fresh-cart-grocery.vercel.app)

## ✨ Highlights

- **💎 Modern Dark UI**: Premium glassmorphism design with smooth animations.
- **🇮🇳 Indian Market Ready**: Standard INR (₹) pricing and local product units.
- **🛍️ Easy Discovery**: Category filters, real-time search, and price sorting.
- **⚡ Fast Checkout**: Streamlined 1-click payment simulation.

## 🚀 Tech Stack

- **Frontend**: Custom CSS3 (Glassmorphism, CSS Variables, Flex/Grid architecture), Vanilla ES6+ JavaScript for interactive state management.
- **Backend**: Node.js with Express.js to handle RESTful API routes for products, cart sessions, and order processing.
- **Standards**: Semantic HTML5 for SEO, Responsive Design for all devices, and clean MVC-inspired folder structure.

## 🛠️ Quick Start

### 🌐 Live Version
Visit the **[Live Demo](https://fresh-cart-grocery.vercel.app)** to see the app in action instantly.

### 💻 Local Development
1. **Clone & Install**:
   ```bash
   git clone https://github.com/Chiraggg99/Fresh_Cart_Grocery_.git
   cd Fresh_Cart_Grocery_ && npm install
   ```

2. **Run**:
   ```bash
   npm start
   ```
   Open `http://localhost:3000`

## ☁️ Deployment

This project is optimized for **Vercel**. Every push to the `main` branch is automatically deployed to production. Continuous integration and serverless functions are handled via `vercel.json`.

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
├── public/              # Client-side assets and UI
│   ├── css/             # Design system & component styles
│   ├── js/              # Client-side logic (API Client, Cart, UI)
│   ├── screenshots/     # Project showcase images
│   └── index.html       # Single Page Application entry
├── server/              # Server-side logic
│   ├── data/            # Product & Inventory (JSON based)
│   ├── routes/          # Express API endpoints
│   └── index.js         # Production-ready Server entry
├── vercel.json          # Deployment config for cloud hosting
└── package.json         # Dependency and script management
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
