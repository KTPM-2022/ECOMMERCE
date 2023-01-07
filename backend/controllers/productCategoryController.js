const { getProductCategoryService, addProductCategoryService } = require('../services/productCategoryService');

async function getProductCategory(req, res) {
  const productCategories = await getProductCategoryService();
  res.status(200).send(productCategories);
}

async function addProductCategory(req, res) {
  const { genderName, typeValueName, categories } = req.body;
  const productCategory = await addProductCategoryService(genderName, typeValueName, categories);
  res.status(200).send(productCategory);
}

module.exports = { getProductCategory, addProductCategory };
