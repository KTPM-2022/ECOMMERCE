const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCategory = new Schema(
  {
    gender: { type: String, required: true },
    typeValue: {
      type: [{ name: String, categories: [String] }],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ProductCategory', ProductCategory);
