const ProductCategory = require('../models/ProductCategory');

async function getProductCategoryService() {
  const productCategories = await ProductCategory.find();
  return productCategories;
}

async function addProductCategoryService(genderName, typeValueName, categories) {
  const productCategory = await ProductCategory.findOneAndUpdate(
    { gender: genderName },
    {
      $push: { typeValue: { name: typeValueName, categories } },
    },
  );
  return productCategory;
}

module.exports = { getProductCategoryService, addProductCategoryService };
