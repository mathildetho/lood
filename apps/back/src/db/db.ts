import mongoose from 'mongoose';
import { MONGODB } from '../config.js';

const mongodbStart = async (): Promise<void> => {
  try {
    // Database
    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
      useFindAndModify: false,
    });
    console.log(`Connected to database`);
  } catch (err) {
    console.error("Connexion to database doesn't working", err);
  }
};

export default mongodbStart;
