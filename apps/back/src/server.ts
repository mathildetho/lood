import mongoose from 'mongoose';
import app from './app';
import { MONGODB } from './config.js';

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // Database
    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
    // eslint-disable-next-line no-console
    console.log('Connected to database');

    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Server started on ${port}`));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

// Start Server
start();
