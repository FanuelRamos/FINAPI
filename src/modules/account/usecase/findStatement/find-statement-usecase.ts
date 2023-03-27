import Statement from '../../../@shared/domain/value-object/statement-value-object'
import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import StatementGateway from '../../gateway/statement-gateway'
import { FindStatementUseCaseInputDTO } from './find-statement-dto'

export default class FindStatementUseCase implements UseCaseInterface<FindStatementUseCaseInputDTO, Statement[]> {
  constructor (private _repository: StatementGateway) {}

  async execute (input: FindStatementUseCaseInputDTO): Promise<Statement[]> {
    const statements = await this._repository.findStatement(input.id)
    if (!statements) {
      throw new Error('Could not find statement')
    }
    return statements
  }
}
