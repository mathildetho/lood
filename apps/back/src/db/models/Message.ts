import mongoose, { Types } from 'mongoose';

type ID = Types.ObjectId;

const { Schema } = mongoose;

export interface IMessage extends mongoose.Document {
  text: string;
  send_at: Date;
  read_at: Date;
  sender_id: ID;
  receiver_id: ID;
}

const MessageSchema = new Schema({
  text: { type: String, required: true },
  send_at: { type: Date, required: true },
  read_at: { type: Date },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

export default mongoose.model<IMessage>('message', MessageSchema);
