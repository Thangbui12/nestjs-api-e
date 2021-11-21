import * as mongoose from 'mongoose';

const PRODUCT_MODEL = 'product';
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  images: {
    type: [String],
    required: false,
    default: 'default-image-product.jpg',
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  flashSale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'flash-sale',
    required: false,
  },
});
