import mongoose, { Schema } from 'mongoose'

const transactionSchema = new Schema({
  id: String,
  senderAccount: String,
  senderName: String,
  recipientAccount: String,
  recipientName: String,
  amount: Number,
  createdAt: Date,
  updatedAt: Date
})

export const TransactionModel = mongoose.model('transaction', transactionSchema)
