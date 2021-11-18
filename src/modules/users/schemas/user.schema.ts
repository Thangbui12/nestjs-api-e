import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as bcrypt from 'bcrypt';
import { userRole } from '../../../common/common.constans';

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
  salt: {
    type: String,
  },
  role: {
    type: String,
    enum: userRole,
    default: userRole.User,
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

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(this['password'], salt);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.plugin(mongoosePaginate);
export { UserSchema, USER_MODEL };
