import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import AccountGateway from '../../gateway/account-gateway'
import { AddStatementUseCaseInputDTO, AddStatementUseCaseOutputDTO } from './add-statement-dto'

export default class AddStatementUseCase implements UseCaseInterface<AddStatementUseCaseInputDTO, AddStatementUseCaseOutputDTO> {
  constructor (private _repository: AccountGateway) {}

  async execute (input: AddStatementUseCaseInputDTO): Promise<AddStatementUseCaseOutputDTO> {
    const statement = await this._repository.addStatement(input)
    if (!statement) {
      throw new Error('Could not add statement')
    }

    return {
      transaction: statement.transaction.id,
      amount: statement.amount,
      type: statement.type,
      createdAt: statement.createdAt
    }
  }
}
