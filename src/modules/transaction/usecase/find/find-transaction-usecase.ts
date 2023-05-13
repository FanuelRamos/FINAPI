import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import TransactionGateway from '../../gateway/transaction-gateway'
import { FindTransactionUseCaseInputDTO, FindTransactionUseCaseOutputDTO } from './find-transaction-usecase-dtos'

export default class FindTransactionUseCase implements UseCaseInterface<FindTransactionUseCaseInputDTO, FindTransactionUseCaseOutputDTO> {
  constructor (private _repository: TransactionGateway) {}

  async execute (input: FindTransactionUseCaseInputDTO): Promise<FindTransactionUseCaseOutputDTO> {
    const transaction = await this._repository.find(input.filter)
    if (!transaction) {
      throw new Error('Transaction not found')
    }
    return {
      id: transaction.id.id,
      senderAccount: transaction.senderAccount,
      senderName: transaction.senderName,
      recipientAccount: transaction.recipientAccount,
      recipientName: transaction.recipientName,
      amount: transaction.amount,
      createdAt: transaction.createdAt
    }
  }
}
