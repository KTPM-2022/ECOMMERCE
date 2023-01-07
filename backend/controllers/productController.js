const {
  getProductService,
  addProductService,
  getProductInfoService,
  getMoreProductsWithFieldService,
  getProductAdminService,
  deleteProductService,
  updateProductService,
} = require('../services/productService');

async function getProduct(req, res) {
  const {
    page,
    genderFilter,
    typeFilter,
    categoryFilter,
    sizeFilter,
    colorFilter,
    brandFilter,
    priceFilter,
    availableFilter,
    sortFilter,
  } = req.body;

  const [products, perPage, total] = await getProductService(
    page,
    genderFilter,
    typeFilter,
    categoryFilter,
    sizeFilter,
    colorFilter,
    brandFilter,
    priceFilter,
    availableFilter,
    sortFilter,
  );
  res.status(200).send({ products, perPage, total });
}

async function addProduct(req, res) {
  const { gender, type, name, brand, price, quantity, description } = req.body;
  categories = req.body.categories.split(',');
  size = req.body.size.split(',');
  colors = req.body.colors.split(',');
  const photos = req.files.map((file, index) => {
    return file.filename;
  });
  if (
    !photos ||
    photos.length === 0 ||
    !gender ||
    !type ||
    !name ||
    !categories ||
    !brand ||
    !price ||
    !size ||
    !colors ||
    !quantity ||
    !description
  ) {
    res.status(400).send('Please add all fields');
    return;
  }
  const isSuccess = await addProductService(
    photos,
    gender,
    type,
    name,
    categories,
    brand,
    price,
    size,
    colors,
    quantity,
    description,
  );
  if (isSuccess) res.status(200).send('Upload successfully');
  else res.status(400).send('Product exists');
}

async function getProductInfo(req, res) {
  const { id } = req.body;
  const product = await getProductInfoService(id);
  if (product) res.status(200).send(product);
  else res.status(400).send('Product not found');
}

async function getMoreProductsWithField(req, res) {
  const { field, value, exceptid } = req.body;
  const products = await getMoreProductsWithFieldService(field, value, exceptid);
  if (products) res.status(200).send(products);
  else res.status(400).send('Products not found');
}

async function getProductAdmin(req, res) {
  const { page } = req.body;
  if (!page) {
    res.status(400).send('Please add all fields');
    return;
  }
  const [products,perPage, total] = await getProductAdminService(page);
  res.status(200).send({products, perPage, total});
}

async function deleteProduct(req,res){
  const {id} = req.body;
  await deleteProductService(id);
  res.status(200).send("Delete product successfully");
}

async function updateProduct(req, res) {
  const {id, gender, type, name, brand, price, quantity, description } = req.body;
  categories = req.body.categories.split(',');
  size = req.body.size.split(',');
  colors = req.body.colors.split(',');
  const photos = req.files.map((file, index) => {
    return file.filename;
  });
  if (
    !photos ||
    photos.length === 0 ||
    !gender ||
    !type ||
    !name ||
    !categories ||
    !brand ||
    !price ||
    !size ||
    !colors ||
    !quantity ||
    !description
  ) {
    res.status(400).send('Please add all fields');
    return;
  }
  const isSuccess = updateProductService(
    id,
    photos,
    gender,
    type,
    name,
    categories,
    brand,
    price,
    size,
    colors,
    quantity,
    description,
  );
  if (isSuccess) res.status(200).send('Update successfully');
}

module.exports = {
  getProduct,
  addProduct,
  getProductInfo,
  getMoreProductsWithField,
  getProductAdmin,
  deleteProduct,
  updateProduct,
};
