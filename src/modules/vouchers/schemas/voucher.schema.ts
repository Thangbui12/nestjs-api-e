import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as moment from 'moment';

const VOUCHER_MODEL = 'voucher';
const VoucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    timeStart: {
      type: Date,
      required: true,
    },
    timeEnd: {
      type: Date,
    },
  },
  { timestamps: true },
);

VoucherSchema.pre('save', async function (next) {
  try {
    const timeEnd = moment(this.timeStart).add(this.duration, 'd');

    this['timeEnd'] = timeEnd;
  } catch (err) {
    return next(err);
  }
});

VoucherSchema.plugin(mongoosePaginate);
export { VoucherSchema, VOUCHER_MODEL };
