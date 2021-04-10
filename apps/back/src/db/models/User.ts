import mongoose, { Types } from 'mongoose';

type ID = Types.ObjectId;

const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
  _doc: Record<string, unknown>;
  email: string;
  password: string;
  want: string;
  name: string;
  birthdate: string;
  photo: string;
  sexe: string;
  description: string;
  favorite_food?: ID[];
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  want: {
    type: String,
    enum: ['woman', 'man', 'all'],
  },
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  photo: { type: String, required: true },
  sexe: {
    type: String,
    enum: ['woman', 'man', 'other'],
  },
  description: {
    type: String,
    required: true,
    minLength: [30, 'Description must have at least 30 characters'],
  },
  favorite_food: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'food',
    },
  ],
});

export default mongoose.model<IUser>('user', UserSchema);
