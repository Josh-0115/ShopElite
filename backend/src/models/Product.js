const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  rating: Number,
  reviewCount: Number,
  colors: [String],
  sizes: [String],
  category: String,
  subcategory: String,
  brand: String,
  gender: { type: String, index: true },
  isNew: Boolean,
  isBestSeller: Boolean,
  image: { type: String, required: true },   // e.g. "/images/women/w4.jpg"
  images: [String],
  description: String,
  stock: Number,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
