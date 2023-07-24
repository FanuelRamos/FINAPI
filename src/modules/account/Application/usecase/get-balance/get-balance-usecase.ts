import UseCaseInterface from '../../../../@shared/usecase/usecase-interface'
import AccountGateway from '../../gateway/account-gateway'
import { GetBalanceUseCaseInputDTO, GetBalanceUseCaseOutputDTO } from './get-balence-usecase-dtos'

export default class GetBalanceUseCase implements UseCaseInterface<GetBalanceUseCaseInputDTO, GetBalanceUseCaseOutputDTO> {
  constructor (private _repository: AccountGateway) {}

  async execute (input: GetBalanceUseCaseInputDTO): Promise<GetBalanceUseCaseOutputDTO> {
    const statements = await this._repository.findStatement(input.id)

    if (!statements) {
      throw new Error('Statement not found')
    }

    const balance = statements.reduce((accumulated, trasaction) => {
      if (trasaction.type === 'credit') {
        return accumulated + trasaction.amount
      } else {
        return accumulated - trasaction.amount
      }
    }, 0)

    return {
      balance
    }
  }
}
