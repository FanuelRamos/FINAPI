import mongoose from 'mongoose'
const { Schema } = mongoose

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
  statement: [{
    id: String,
    amount: Number,
    type: String
  }],
  createdAt: Date,
  updatedAt: Date
})

export const AccountModel = mongoose.model('accounts', accountSchema)
