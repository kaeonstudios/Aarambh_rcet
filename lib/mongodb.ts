/**
 * MongoDB connection singleton using Mongoose.
 * Caches the connection across hot-reloads in dev mode.
 */
import mongoose from 'mongoose';

// Cache connection on the global object to survive hot-reloads in dev
const globalWithMongoose = global as typeof globalThis & {
  mongoose?: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
};

let cached = globalWithMongoose.mongoose ?? { conn: null, promise: null };
globalWithMongoose.mongoose = cached;

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in your env settings');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
