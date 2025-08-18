const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const products = [
  { name: "Women's Jacket", price: 79.99, gender: "women", image: "/images/women/jacket.jpg" },
  { name: "Women's Sneakers", price: 59.99, gender: "women", image: "/images/women/sneakers.jpg" },
  { name: "Men's Shirt", price: 49.99, gender: "men", image: "/images/men/shirt.jpg" },
  { name: "Men's Jeans", price: 69.99, gender: "men", image: "/images/men/jeans.jpg" },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();