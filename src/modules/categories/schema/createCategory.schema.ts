import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const CATEGORY_MODEL = 'category';
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

CategorySchema.plugin(mongoosePaginate);
export { CategorySchema, CATEGORY_MODEL };
