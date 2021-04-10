import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IFood extends mongoose.Document {
  title: string;
  description: string;
  photo: string;
  origine: string;
}

const FoodSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  origine: { type: String, required: true },
});

export default mongoose.model<IFood>('food', FoodSchema);
