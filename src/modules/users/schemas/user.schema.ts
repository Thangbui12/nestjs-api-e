import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as bcrypt from 'bcrypt';

const USER_MODEL = 'users';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpired: {
    type: Date,
  },
  isAdmin: {
    type: Boolean,
    select: true,
    default: false,
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg',
  },
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.plugin(mongoosePaginate);
export { UserSchema, USER_MODEL };
