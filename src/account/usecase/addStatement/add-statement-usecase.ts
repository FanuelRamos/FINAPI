import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import StatementGateway from '../../gateway/statement-gateway'
import { AddStatementUseCaseInputDTO, AddStatementUseCaseOutputDTO } from './add-statement-dto'

export default class AddStatementUseCase implements UseCaseInterface<AddStatementUseCaseInputDTO, AddStatementUseCaseOutputDTO> {
  constructor (private _repository: StatementGateway) {}

  async execute (input: AddStatementUseCaseInputDTO): Promise<any> {
    const statement = await this._repository.addStatement(input)
    if (!statement) {
      throw new Error('Could not add statement')
    }
  }
}
