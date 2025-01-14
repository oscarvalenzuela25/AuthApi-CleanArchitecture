import mongoose from 'mongoose';

const useSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  roles: {
    type: [String],
    default: ['USER_ROLE'],
  },
});

export const UserModel = mongoose.model('User', useSchema);
