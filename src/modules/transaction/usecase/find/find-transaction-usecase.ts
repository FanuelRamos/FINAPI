import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import TransactionGateway from '../../gateway/transaction-gateway'
import { FindTransactionUseCaseInputDTO, FindTransactionUseCaseOutputDTO } from './find-transaction-usecase-dtos'

export default class FindTransactionUseCase implements UseCaseInterface<FindTransactionUseCaseInputDTO, FindTransactionUseCaseOutputDTO> {
  constructor (private _repository: TransactionGateway) {}

  async execute (input: FindTransactionUseCaseInputDTO): Promise<any> {
    const transaction = await this._repository.find(input.filter)
    return null
  }
}
