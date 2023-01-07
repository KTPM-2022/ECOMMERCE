const Product = require('../models/Product');
const ShoppingCart = require('../models/ShoppingCart');

async function getProductService(
  page = 1,
  genderFilter,
  typeFilter,
  categoryFilter,
  sizeFilter,
  colorFilter,
  brandFilter,
  priceFilter,
  availableFilter,
  sortFilter,
) {
  const options = {};
  if (genderFilter) {
    options.gender = genderFilter;
  }
  if (typeFilter) {
    options.type = typeFilter;
  }
  if (categoryFilter) {
    options.categories = {
      $in: categoryFilter,
    };
  }
  if (sizeFilter) {
    options.size = {
      $in: sizeFilter,
    };
  }
  if (colorFilter) {
    options.colors = {
      $in: colorFilter,
    };
  }
  if (brandFilter && brandFilter.length > 0) {
    options.brand = {
      $in: brandFilter,
    };
  }
  if (priceFilter) {
    options.price = {
      $gte: priceFilter.left,
      $lte: priceFilter.right,
    };
  }
  if (availableFilter && availableFilter.length === 1) {
    if (availableFilter[0] === 0) {
      options.quantity = { $gte: 1 };
    } else {
      options.quantity = 0;
    }
  }
  const perPage = 20;
  let products;
  let total;

  if (!sortFilter.field) {
    products = await Product.find(options)
      .skip(perPage * page - perPage)
      .limit(perPage);
    total = await Product.find(options).countDocuments();
  } else {
    products = await Product.find(options)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({
        [sortFilter.field]: sortFilter.isInc,
      });
    total = await Product.find(options)
      .sort({
        [sortFilter.field]: sortFilter.isInc,
      })
      .countDocuments();
  }
  return [products, perPage, total];
}

async function addProductService(
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
) {
  const isProductExists = await Product.findOne({ name });
  if (!isProductExists) {
    await Product.create({
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
    });
    return true;
  } else return false;
}

async function getProductInfoService(id) {
  const product = await Product.findById(id);
  if (product) return product;
  return null;
}

async function getMoreProductsWithFieldService(field, value, exceptid) {
  let products;
  if (!exceptid)
    products = await Product.find({
      [field]: value,
    });
  else
    products = Product.find({
      [field]: value,
      _id: {
        $nin: [exceptid],
      },
    });
  if (products) return products;
  else return null;
}

async function getProductAdminService(page) {
  let perPage = 10;
  const products = await Product.aggregate([
    {
      $lookup: {
        from: 'shoppingcarts',
        localField: '_id',
        foreignField: 'product',
        as: 'shoppingcart',
      },
    },
    {
      $addFields: {
        totalQuantity: {
          $sum: '$shoppingcart.quantity',
        },
      },
    },
  ])
    .skip(perPage * page - perPage)
    .limit(perPage);
  const total = await Product.find().countDocuments();
  return [products, perPage, total];
}

async function deleteProductService(id) {
  await ShoppingCart.deleteMany({product: id});
  await Product.findByIdAndDelete(id);
  return true;
}

async function updateProductService(
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
) {
  const isProductExists = await Product.findById(id);
  if (isProductExists) {
    await Product.findByIdAndUpdate(id,{
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
    });
    return true;
  } else return false;
}

module.exports = {
  getProductService,
  addProductService,
  getProductInfoService,
  getMoreProductsWithFieldService,
  getProductAdminService,
  deleteProductService,
  updateProductService,
};
