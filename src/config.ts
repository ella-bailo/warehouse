import mongoose from 'mongoose';

export const mongooseOptions: mongoose.ConnectOptions = {
  autoIndex: true,
  dbName: 'warehouse',
};
