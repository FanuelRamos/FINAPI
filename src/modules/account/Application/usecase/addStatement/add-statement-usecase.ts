/* eslint-disable prefer-regex-literals */
import UseCaseInterface from '../../../../@shared/usecase/usecase-interface'
import AccountGateway from '../../gateway/account-gateway'
import GetBalanceUseCase from '../get-balance/get-balance-usecase'
import { AddStatementUseCaseInputDTO, AddStatementUseCaseOutputDTO } from './add-statement-dto'

export default class AddStatementUseCase implements UseCaseInterface<AddStatementUseCaseInputDTO, AddStatementUseCaseOutputDTO> {
  private _getBalance: GetBalanceUseCase
  constructor (private _repository: AccountGateway) {
    this._getBalance = new GetBalanceUseCase(this._repository)
  }

  async execute (input: AddStatementUseCaseInputDTO): Promise<AddStatementUseCaseOutputDTO> {
    if (input.type === 'debit') {
      const balance = await (await this._getBalance.execute({ id: input.account }))?.balance
      if (balance < input.amount) {
        throw new Error('Insufficient funds')
      }
    }
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
