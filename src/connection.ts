import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MONGOOSE_OPTIONS } from './config';

export const connect = async (connectionString: string): Promise<void> => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(connectionString, MONGOOSE_OPTIONS);
  } catch (err) {
    console.log('error connecting to database', { err });
  }
};

export const close = async () => {
  await mongoose.disconnect();
};

export const clear = async () => {
  await mongoose.connection.dropDatabase();
};

export const getMongod = async () => {
  const mongod = await MongoMemoryServer.create();
  return { connectionString: mongod.getUri(), mongodServer: mongod };
};

export const stopMongod = async (mongod: any) => {
  await mongod.stop();
};

export const connectMongod = async (): Promise<void> => {
  try {
    const mongod = await getMongod();
    connect(mongod.connectionString);
  } catch (err) {
    console.log('error connecting to database', { err });
  }
};
