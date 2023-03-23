import { FilterQuery } from 'mongoose'
import Statement from '../../@shared/domain/value-object/statement-value-object'

export default interface AccountGateway<T> {
  addStatement(input: T): Promise<Statement>
  findStatement(filter: FilterQuery<unknown>): Promise<Statement[] | null>
}
