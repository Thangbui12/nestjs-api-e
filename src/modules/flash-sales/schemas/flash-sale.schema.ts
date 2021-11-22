import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as moment from 'moment';

const FLASHSALE_MODEL = 'flash-sale';
const FlashSaleSchema = new mongoose.Schema(
  {
    flashCode: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discountPercent: { type: Number, required: true },
    timeStart: {
      type: Date,
      required: true,
    },
    timeEnd: {
      type: Date,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

FlashSaleSchema.pre('save', async function (next) {
  try {
    const timeEnd = moment(this.timeStart).add(this.duration, 'd');

    this['timeEnd'] = timeEnd;
  } catch (err) {
    return next(err);
  }
});

FlashSaleSchema.plugin(mongoosePaginate);
export { FlashSaleSchema, FLASHSALE_MODEL };
