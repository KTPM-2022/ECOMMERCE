const { getOrderService,getProductService, addShoppingCartService, updateShoppingCartService } = require('../services/shoppingCartService');

async function getOrder(req, res) {
  const { page } = req.body;
  if (!page) {
    res.status(400).send('Please add all fields');
    return;
  }
  const [shoppingCarts,perPage, total] = await getOrderService(page);
  res.status(200).send({shoppingCarts, perPage, total});
}

async function getProduct(req, res) {
  const { user, page } = req.body;
  if (!user || !page) {
    res.status(400).send('Please add all fields');
    return;
  }
  const [shoppingCarts,perPage, total] = await getProductService(user, page);
  res.status(200).send({shoppingCarts, perPage, total});
}

async function addShoppingCart(req, res) {
  const { user, shoppingCarts } = req.body;
  const error = await addShoppingCartService(user, shoppingCarts);
  if (!error) res.status(200).send('Add successfully');
  else res.status(400).send(error);
}

async function updateShoppingCart(req, res) {
  const { id, field, value } = req.body;
  const error = await updateShoppingCartService(id,field,value);
  if (!error) res.status(200).send('Update successfully');
  else res.status(400).send(error);
}

module.exports = { getOrder,getProduct, addShoppingCart, updateShoppingCart };
