import { FilterQuery } from 'mongoose'
import TransactionEntity from '../entity/transaction-entity'
import TransactionGateway from '../gateway/transaction-gateway'
import { TransactionModel } from './transaction-model'

export default class TransactionRepository implements TransactionGateway {
  async add (transaction: TransactionEntity): Promise<void> {
    await TransactionModel.create({
      id: transaction.id,
      senderAccount: transaction.senderAccount,
      senderName: transaction.senderName,
      recipientAccount: transaction.recipientAccount,
      recipientName: transaction.recipientName,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    })
  }

  async find (filter: FilterQuery<unknown>): Promise<TransactionEntity> {
    throw new Error('Method not implemented.')
  }
}
