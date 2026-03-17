const products = [
  // 🍎 Fruits
  { id: 1, name: 'Royal Gala Apples', price: 180, category: 'Fruits', image: '🍎', unit: 'kg', inStock: true, description: 'Crisp and sweet, perfect for snacking' },
  { id: 2, name: 'Cavendish Bananas', price: 80, category: 'Fruits', image: '🍌', unit: 'bunch', inStock: true, description: 'Ripe and ready to eat' },
  { id: 3, name: 'Navel Oranges', price: 150, category: 'Fruits', image: '🍊', unit: 'kg', inStock: true, description: 'Juicy and seedless citrus' },
  { id: 4, name: 'Fresh Strawberries', price: 250, category: 'Fruits', image: '🍓', unit: 'punnet', inStock: true, description: 'Sweet and fragrant berries' },
  { id: 5, name: 'Hass Avocados', price: 250, category: 'Fruits', image: '🥑', unit: 'each', inStock: true, description: 'Creamy and ripe avocados' },

  // 🥦 Vegetables
  { id: 6, name: 'Baby Spinach', price: 60, category: 'Vegetables', image: '🥬', unit: '200g', inStock: true, description: 'Tender baby spinach leaves' },
  { id: 7, name: 'Roma Tomatoes', price: 80, category: 'Vegetables', image: '🍅', unit: 'kg', inStock: true, description: 'Perfect for salads and sauces' },
  { id: 8, name: 'Organic Broccoli', price: 180, category: 'Vegetables', image: '🥦', unit: 'head', inStock: true, description: 'Fresh organic broccoli crowns' },
  { id: 9, name: 'Sweet Bell Peppers', price: 150, category: 'Vegetables', image: '🫑', unit: '3 pack', inStock: true, description: 'Mixed red, yellow, and green' },
  { id: 10, name: 'Dutch Carrots', price: 80, category: 'Vegetables', image: '🥕', unit: 'bunch', inStock: true, description: 'Sweet and crunchy baby carrots' },
  { id: 31, name: 'Brown Onions', price: 40, category: 'Vegetables', image: '🧅', unit: 'kg', inStock: true, description: 'Essential for every kitchen' },
  { id: 32, name: 'Potatoes', price: 40, category: 'Vegetables', image: '🥔', unit: 'kg', inStock: true, description: 'Versatile and hearty potatoes' },

  // 🧀 Dairy
  { id: 11, name: 'Full Cream Milk', price: 130, category: 'Dairy', image: '🥛', unit: '2L', inStock: true, description: 'Farm fresh full cream milk' },
  { id: 12, name: 'Greek Yoghurt', price: 200, category: 'Dairy', image: '🍶', unit: '1kg', inStock: true, description: 'Thick and creamy natural yoghurt' },
  { id: 13, name: 'Aged Cheddar', price: 450, category: 'Dairy', image: '🧀', unit: '250g', inStock: true, description: 'Sharp and mature cheddar cheese' },
  { id: 14, name: 'Free Range Eggs', price: 120, category: 'Dairy', image: '🥚', unit: 'dozen', inStock: true, description: 'Farm fresh free range eggs' },
  { id: 15, name: 'Salted Butter', price: 250, category: 'Dairy', image: '🧈', unit: '250g', inStock: true, description: 'Premium salted butter block' },

  // 🥖 Bakery
  { id: 16, name: 'Sourdough Loaf', price: 150, category: 'Bakery', image: '🍞', unit: 'loaf', inStock: true, description: 'Artisan sourdough bread' },
  { id: 17, name: 'Butter Croissants', price: 200, category: 'Bakery', image: '🥐', unit: '4 pack', inStock: true, description: 'Flaky French-style croissants' },
  { id: 18, name: 'Multigrain Rolls', price: 120, category: 'Bakery', image: '🥖', unit: '6 pack', inStock: true, description: 'Hearty multigrain dinner rolls' },
  { id: 19, name: 'Chocolate Muffins', price: 250, category: 'Bakery', image: '🧁', unit: '4 pack', inStock: true, description: 'Double chocolate chip muffins' },
  { id: 20, name: 'Cinnamon Donuts', price: 180, category: 'Bakery', image: '🍩', unit: '6 pack', inStock: true, description: 'Sugar and cinnamon coated' },

  // 🥤 Beverages
  { id: 21, name: 'Fresh Orange Juice', price: 120, category: 'Beverages', image: '🧃', unit: '1L', inStock: true, description: 'Cold pressed orange juice' },
  { id: 22, name: 'Sparkling Water', price: 100, category: 'Beverages', image: '💧', unit: '1L', inStock: true, description: 'Natural sparkling mineral water' },
  { id: 23, name: 'Artisan Coffee Beans', price: 800, category: 'Beverages', image: '☕', unit: '500g', inStock: true, description: 'Medium roast arabica beans' },
  { id: 24, name: 'Green Tea Collection', price: 350, category: 'Beverages', image: '🍵', unit: '20 bags', inStock: true, description: 'Assorted premium green teas' },
  { id: 25, name: 'Coconut Water', price: 80, category: 'Beverages', image: '🥥', unit: '500ml', inStock: true, description: '100% pure coconut water' },

  // 🍿 Snacks
  { id: 26, name: 'Mixed Nuts', price: 600, category: 'Snacks', image: '🥜', unit: '400g', inStock: true, description: 'Roasted and salted mixed nuts' },
  { id: 27, name: 'Dark Chocolate Bar', price: 250, category: 'Snacks', image: '🍫', unit: '200g', inStock: true, description: '70% cocoa dark chocolate' },
  { id: 28, name: 'Sea Salt Chips', price: 120, category: 'Snacks', image: '🍿', unit: '175g', inStock: true, description: 'Kettle cooked potato chips' },
  { id: 29, name: 'Granola Bars', price: 180, category: 'Snacks', image: '🥜', unit: '6 pack', inStock: true, description: 'Oat and honey granola bars' },
  { id: 30, name: 'Rice Crackers', price: 120, category: 'Snacks', image: '🍘', unit: '100g', inStock: true, description: 'Soy and sesame rice crackers' },
];

module.exports = products;
