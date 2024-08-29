import { Schema, model } from 'mongoose';

type User = {
  uid: string;
  name: string;
  email: string;
  online: boolean;
};

const UserSchema = new Schema({
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
  online: {
    type: Boolean,
    default: false,
  },
});

UserSchema.method('toJSON', function () {
  const { _id, password, ...object } = this.toObject();
  console.log(password);
  const user: User = {
    ...object,
    uid: String(_id),
  };
  return user;
});

export default model('User', UserSchema);
