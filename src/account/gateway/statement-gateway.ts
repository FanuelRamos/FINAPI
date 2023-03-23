import { FilterQuery } from 'mongoose'
import Statement from '../../@shared/domain/value-object/statement-value-object'

export interface AddStatementUseCaseInputDTO {
  account: string
  transaction: string
  amount: number
  type: string
}

export default interface StatementGateway {
  addStatement(input: AddStatementUseCaseInputDTO): Promise<Statement>
  findStatement(filter: FilterQuery<unknown>): Promise<Statement[] | null>
}
