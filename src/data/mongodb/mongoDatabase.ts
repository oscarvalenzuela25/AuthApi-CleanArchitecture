import mongoose from 'mongoose';
import { envs } from '../../config/env';

export class MongoDatabase {
  static async connect() {
    const { MONGO_URL, MONGO_USER, MONGO_PASSWORD, MONGO_DB_NAME = '' } = envs;
    const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`;
    const dbName = MONGO_DB_NAME;
    try {
      await mongoose.connect(mongoUrl, { dbName });
      console.log('Connected to database');
    } catch (error) {
      console.log('Error connecting to database', error);
      throw error;
    }
  }
}
