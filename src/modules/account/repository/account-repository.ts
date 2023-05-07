import { FilterQuery } from 'mongoose'
import Account from '../entity/account-entity'
import AccountGateway, { AddStatementUseCaseInputDTO } from '../gateway/account-gateway'
import { AccountModel } from './account-model'
import Id from '../../@shared/domain/value-object/id-value-object'
import Statement from '../../@shared/domain/value-object/statement-value-object'

export default class AccountRepository implements AccountGateway {
  async add (account: Account): Promise<void> {
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

  async findById (id: string): Promise<Account | null> {
    const account = await AccountModel.findOne({ id })
    if (!account) return null
    return new Account({
      id: new Id(account.id),
      name: account.name!,
      burth: account.burth!,
      country: account.country!,
      city: account.city!,
      address: account.address!,
      postalCode: account.postalCode!,
      phone: account.phone!,
      email: account.email!,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    })
  }

  async find (filter: FilterQuery<unknown>): Promise<Account | null> {
    const account = await AccountModel.findOne(filter)
    if (!account) return null
    return new Account({
      id: new Id(account.id),
      name: account.name!,
      burth: account.burth!,
      country: account.country!,
      city: account.city!,
      address: account.address!,
      postalCode: account.postalCode!,
      phone: account.phone!,
      email: account.email!,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    })
  }

  async update (account: Account): Promise<Account | null> {
    const filter = { id: account.id.id }

    const accountData = await AccountModel.findOne(filter)
    if (!accountData) return null

    const updatedData = {
      id: account.id,
      name: account.name,
      burth: account.burth,
      country: account.country,
      city: account.city,
      address: account.address,
      postalCode: account.postalCode,
      phone: account.phone,
      email: account.email,
      updatedAt: account.updatedAt
    }

    const updatedAccout = await AccountModel.findOneAndUpdate(filter, updatedData, { new: true })
    if (!updatedAccout) return null

    return new Account({
      id: new Id(updatedAccout.id),
      name: updatedAccout.name!,
      burth: updatedAccout.burth!,
      country: updatedAccout.country!,
      city: updatedAccout.city!,
      address: updatedAccout.address!,
      postalCode: updatedAccout.postalCode!,
      phone: updatedAccout.phone!,
      email: updatedAccout.email!,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    })
  }

  async addStatement (input: AddStatementUseCaseInputDTO): Promise<Statement | null> {
    const filter = { id: input.account }
    const account = await AccountModel.findOne(filter)

    if (!account) return null
    const update = {
      $push:
        {
          statement: {
            transaction: input.transaction,
            amount: input.amount,
            type: input.type
          }
        }
    }

    const accountUpdated = await AccountModel.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false })
    if (!accountUpdated) return null

    return new Statement({
      transaction: input.transaction,
      amount: input.amount,
      type: input.type
    })
  }

  async findStatement (id: string): Promise<Statement[] | null> {
    const account = await AccountModel.findOne({ id })
    if (!account) return null

    return account.statement.toObject()
  }
}
