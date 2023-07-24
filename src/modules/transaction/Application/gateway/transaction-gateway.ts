import { FilterQuery } from 'mongoose'
import Transaction from '../../Domain/entity/transaction-entity'

export default interface TransactionGateway {
  add (transaction: Transaction): Promise<void>
  findById (id: string): Promise<Transaction | null>
  find (filter: FilterQuery<unknown>): Promise<Transaction | null>
}
