import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongo: MongoMemoryServer | null = null

export const connectDb = async (): Promise<void> => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()

  await mongoose.connect(uri, {
    dbName: 'finapi'
  })
}

export const dropDb = async (): Promise<void> => {
  if (mongo) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongo.stop()
  }
}

export const dropCollections = async (): Promise<void> => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
      await collection.drop()
    }
  }
}
