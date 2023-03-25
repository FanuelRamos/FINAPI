import Statement from '../../../@shared/domain/value-object/statement-value-object'
import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import StatementGateway from '../../gateway/statement-gateway'
import { FindStatementInputDTO } from './find-statement-dto'

export default class FindStatementUseCase implements UseCaseInterface<FindStatementInputDTO, Statement[]> {
  constructor (private _repository: StatementGateway) {}

  async execute (input: FindStatementInputDTO): Promise<Statement[]> {
    const statements = await this._repository.findStatement(input.id)
    if (!statements) {
      throw new Error('Could not find statement')
    }
    return statements
  }
}
