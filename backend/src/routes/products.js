const express = require('express');
const router = express.Router();
const { getWomenProducts, getMenProducts } = require('../controllers/productController');

router.get('/women', getWomenProducts);
router.get('/men', getMenProducts);

module.exports = router;