import { FilterQuery } from 'mongoose'
import Account from '../entity/account-entity'

export default interface AccountGateway {
  add(account: Account): Promise<void>
  find(filter: FilterQuery<unknown>): Promise<Account | null>
  findById(id: string): Promise<Account | null>
  update(account: Account): Promise<Account | null>
}
