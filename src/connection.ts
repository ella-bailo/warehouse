import mongoose from 'mongoose';
import { mongooseOptions } from './config';

export const connect = async (connectionString: string): Promise<void> => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(connectionString, mongooseOptions);
  } catch (err) {
    console.log('error connecting to database', { err });
  }
};

export const close = async () => {
  await mongoose.connection.close();
};
