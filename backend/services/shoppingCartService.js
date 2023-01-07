const Product = require('../models/Product');
const User = require('../models/User');
const ShoppingCart = require('../models/ShoppingCart');

async function addShoppingCartService(user, shoppingCarts) {
  if (!user || !shoppingCarts) {
    return 'Please add all fields';
  }
  const userExists = await User.findById(user);
  if (!userExists) {
    return 'User not found';
  }
  for (const shoppingCart of shoppingCarts) {
    await ShoppingCart.create({
      user,
      product: shoppingCart.product,
      size: shoppingCart.productSize,
      color: shoppingCart.productColor,
      quantity: shoppingCart.productQuantity,
      status: 'pending',
    });
  }
  return null;
}

async function getOrderService(page) {
  let perPage = 10;
  const shoppingCarts = await ShoppingCart.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate({
      path: 'product',
      select: 'name price quantity',
    });
  const total = await ShoppingCart.find().countDocuments();
  return [shoppingCarts, perPage, total];
}

async function getProductService(user, page) {
  let perPage = 10;
  const shoppingCarts = await ShoppingCart.find({ user })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .populate({
      path: 'product',
      select: 'photos type categories name price quantity updatedAt',
    });
  const total = await ShoppingCart.find({ user }).countDocuments();
  return [shoppingCarts, perPage, total];
}

async function updateShoppingCartService(id, field, value) {
  if (!id || !field || !value) return 'Please add all fields';
  const item = await ShoppingCart.findById(id);
  if (!item) return 'Item not found';
  await ShoppingCart.findByIdAndUpdate(id, { [field]: value });
  return null;
}

module.exports = { addShoppingCartService, getOrderService,getProductService, updateShoppingCartService };
