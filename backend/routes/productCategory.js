const express = require('express');
const router = express.Router();
const { getProductCategory, addProductCategory } = require('../controllers/productCategoryController');

router.post('/addproductcategory', addProductCategory);
router.post('/', getProductCategory);

module.exports = router;
