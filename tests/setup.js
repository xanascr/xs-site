import mongoose from "mongoose";
import { beforeAll, afterAll } from "vitest";
import "dotenv/config";

let mongoServer;

function buildTestUri(baseUri) {
  try {
    const url = new URL(baseUri);
    url.pathname = "/xstest";
    return url.toString();
  } catch {
    return baseUri;
  }
}

beforeAll(async () => {
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: "xstest",
      storageEngine: "wiredTiger",
    },
  });
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;
  process.env.JWT_SECRET = "test-secret-key-for-vitest";

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
