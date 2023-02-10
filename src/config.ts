import mongoose from 'mongoose';

export const MONGOOSE_OPTIONS: mongoose.ConnectOptions = {
  autoIndex: true,
  dbName: 'warehouse',
};
