import mongoose, { Types } from 'mongoose';
import { Buffer } from 'buffer';

type ID = Types.ObjectId;

const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
  _doc: Record<string, unknown>;
  email: string;
  password: string;
  lookFor: string;
  pseudo: string;
  birthdate: string;
  photo: string;
  photoType: string;
  status: string;
  sexe: string;
  description: string;
  favorite_food?: ID[];
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lookFor: {
    type: String,
    enum: ['Homme', 'Femme', 'Tous'],
  },
  pseudo: { type: String, required: true },
  birthdate: { type: Date, required: true },
  photo: { type: String, required: true },
  photoType: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'active'],
  },
  sexe: {
    type: String,
    enum: ['Homme', 'Femme', 'Autre'],
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

UserSchema.virtual('imgSrc').get(function () {
  if (this.img !== null && this.imgType !== null) {
    return `data:${this.imgType};charset=utf-8;base64,${this.img.toString(
      'base64'
    )}`;
  }
});

export default mongoose.model<IUser>('user', UserSchema);
