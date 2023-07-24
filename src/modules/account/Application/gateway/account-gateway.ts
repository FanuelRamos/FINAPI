import { FilterQuery } from 'mongoose'
import Account from '../../Domain/entity/account-entity'
import Statement from '../../../@shared/domain/value-object/statement-value-object'

export interface AddStatementUseCaseInputDTO {
  account: string
  transaction: string
  amount: number
  type: string
}

export default interface AccountGateway {
  add(account: Account): Promise<void>
  find(filter: FilterQuery<unknown>): Promise<Account | null>
  findById(id: string): Promise<Account | null>
  update(account: Account): Promise<Account | null>
  addStatement(input: AddStatementUseCaseInputDTO): Promise<Statement | null>
  findStatement(id: string): Promise<Statement[] | null>
}
