const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    gender: { type: String, required: true },
    type: { type: String, required: true },
    photos: { type: [String], required: true },
    name: { type: String, required: true },
    categories: { type: [String], required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: [String], required: true },
    colors: { type: [String], required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Product', Product);
