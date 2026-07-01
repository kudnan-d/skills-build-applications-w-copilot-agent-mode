import mongoose from 'mongoose';

const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoUri);
  return mongoose.connection;
}
