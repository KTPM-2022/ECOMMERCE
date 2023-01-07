const express = require('express');
const router = express.Router();

const {
  getProduct,
  addProduct,
  getProductInfo,
  getMoreProductsWithField,
  getProductAdmin,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController');
const upload = require('../middlewares/uploadCloudinary');

router.post('/addproduct', upload.array('file', 8), addProduct);
router.post('/getproductinfo', getProductInfo);
router.post('/getmoreproductswithfield', getMoreProductsWithField);
router.post('/getproductadmin', getProductAdmin);
router.delete('/deleteproduct', deleteProduct);
router.put('/updateproduct', upload.array('file', 8),updateProduct);
router.post('/', getProduct);

module.exports = router;
