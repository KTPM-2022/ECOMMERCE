const authRouter = require('./auth');
const userRouter = require('./user');
const productRouter = require('./product');
const productCategoryRouter = require('./productCategory');
const shoppingCartRouter = require('./shoppingCart');
const { protect } = require('../middlewares/auth');

function route(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/user', protect, userRouter);
  app.use('/api/product', productRouter);
  app.use('/api/productcategory', productCategoryRouter);
  app.use('/api/shoppingcart', shoppingCartRouter);
}

module.exports = route;
