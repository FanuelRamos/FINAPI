import app from './config/app'
import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

void connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Listening for requests...')
  })
})
