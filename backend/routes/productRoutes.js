const express = require('express');
const { getProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/', getProducts);

module.exports = router