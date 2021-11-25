import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const PRODUCT_MODEL = 'product';
const ProductSchema = new mongoose.Schema(
  {
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
      required: true,
      ref: 'category',
    },
    images: {
      type: [String],
      required: false,
      default: ['default-image-product.jpg'],
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "description's Product",
    },
    flashSale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'flash-sale',
      required: false,
    },
  },
  { timestamps: true },
);

ProductSchema.plugin(mongoosePaginate);

export { ProductSchema, PRODUCT_MODEL };
