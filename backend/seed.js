const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const Product = require('./src/models/Product');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

// NOTE: path to your frontend db.json
const dbPath = path.join(__dirname, '../frontend/src/db/db.json');

const raw = fs.readFileSync(dbPath, 'utf-8');
const db = JSON.parse(raw);

// Merge men + women arrays
const rawProducts = [
  ...(db.men || []),
  ...(db.women || []),
];

// Normalize product fields & image paths
const normalize = (p) => {
  // convert "src/assets/images/men/m1.jpg" -> "/images/men/m1.jpg"
  const toBackendImage = (img) =>
    (img || '').replace(/^src\/assets\/images\//, '/images/');

  return {
    name: p.name,
    price: Number(p.price),
    originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
    rating: p.rating,
    reviewCount: p.reviewCount,
    colors: p.colors || [],
    sizes: p.sizes || [],
    category: p.category,
    subcategory: p.subcategory,
    brand: p.brand,
    gender: p.gender,                     // already in your JSON
    isNew: Boolean(p.isNew),
    // some entries use isBestseller vs isBestSeller – normalize:
    isBestSeller: Boolean(p.isBestSeller || p.isBestseller),
    image: toBackendImage(p.image),
    images: (p.images || []).map(toBackendImage),
    description: p.description,
    stock: p.stock ?? 20,
  };
};

const products = rawProducts.map(normalize);

const run = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products from db.json`);
  } catch (e) {
    console.error('❌ Seeding failed:', e);
  } finally {
    process.exit();
  }
};

run();
