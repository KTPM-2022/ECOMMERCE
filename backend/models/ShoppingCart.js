const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingCart = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['completed', 'pending', 'canceled'], required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ShoppingCart', ShoppingCart);
