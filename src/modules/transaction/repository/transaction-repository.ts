import { FilterQuery } from 'mongoose'
import TransactionEntity from '../entity/transaction-entity'
import TransactionGateway from '../gateway/transaction-gateway'
import { TransactionModel } from './transaction-model'
import Id from '../../@shared/domain/value-object/id-value-object'

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

  async findById (id: string): Promise<TransactionEntity | null> {
    const transaction = await TransactionModel.findOne({ id })
    if (!transaction) return null
    return new TransactionEntity({
      id: new Id(transaction.id),
      senderAccount: transaction.senderAccount!,
      senderName: transaction.senderName!,
      recipientAccount: transaction.recipientAccount!,
      recipientName: transaction.recipientName!,
      amount: transaction.amount!,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    })
  }

  async find (filter: FilterQuery<unknown>): Promise<TransactionEntity | null> {
    const transaction = await TransactionModel.findOne(filter)
    if (!transaction) return null
    return new TransactionEntity({
      id: new Id(transaction.id),
      senderAccount: transaction.senderAccount!,
      senderName: transaction.senderName!,
      recipientAccount: transaction.recipientAccount!,
      recipientName: transaction.recipientName!,
      amount: transaction.amount!,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    })
  }
}
