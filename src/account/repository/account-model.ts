import mongoose from 'mongoose'
const { Schema } = mongoose

const statementSchema = new Schema({
  id: String,
  amount: Number,
  type: String
})

const accountSchema = new Schema({
  id: String,
  name: String,
  burth: Date,
  country: String,
  city: String,
  address: String,
  postalCode: String,
  phone: String,
  email: String,
  statement: [statementSchema],
  createdAt: Date,
  updatedAt: Date
})

export const AccountModel = mongoose.model('accounts', accountSchema)
