import { FilterQuery } from 'mongoose'
import AccountEntity from '../entity/account-entity'
import AccountGateway from '../gateway/account-gateway'
import { AccountModel } from './account-model'

export default class AccountRepository implements AccountGateway {
  async add (account: AccountEntity): Promise<void> {
    await AccountModel.create({
      id: account.id,
      name: account.name,
      burth: account.burth,
      country: account.country,
      city: account.city,
      address: account.address,
      postalCode: account.postalCode,
      phone: account.phone,
      email: account.email,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    })
  }

  async find (filter: FilterQuery<unknown>): Promise<AccountEntity | null> {
    throw new Error('Method not implemented.')
  }

  async findById (id: string): Promise<AccountEntity | null> {
    throw new Error('Method not implemented.')
  }

  async update (account: AccountEntity): Promise<AccountEntity | null> {
    throw new Error('Method not implemented.')
  }
}
