import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const ORDER_MODEL = 'order';
const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
        totalItemPrice: {
          type: Number,
        },
        name: {
          type: String,
        },
      },
    ],
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
    },
    adress: {
      type: String,
      require: true,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalPayOrder: {
      type: Number,
    },
  },
  { timestamps: true },
);

OrderSchema.plugin(mongoosePaginate);

export { ORDER_MODEL, OrderSchema };
