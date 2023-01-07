const express = require('express');
const router = express.Router();

const { addShoppingCart, getOrder, updateShoppingCart,getProduct } = require('../controllers/shoppingCartController');

router.post('/addshoppingcart', addShoppingCart);
router.post('/updateshoppingcart', updateShoppingCart);
router.post('/getproduct', getProduct);
router.post('/', getOrder);

module.exports = router;
