const Product = require('../models/Product');

exports.getWomenProducts = async (req, res) => {
  try {
    const products = await Product.find({ gender: 'women' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMenProducts = async (req, res) => {
  try {
    const products = await Product.find({ gender: 'men' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};