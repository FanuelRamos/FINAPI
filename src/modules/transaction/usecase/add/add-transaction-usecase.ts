import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import AccountFacadeFactory from '../../../account/factory/account-facade-factory'
import Transaction from '../../entity/transaction-entity'
import TransactionGateway from '../../gateway/transaction-gateway'
import { AddTransactionUseCaseInputDTO, AddTransactionUseCaseOutputDTO } from './add-transaction-dtos'

export default class AddTransactionUseCase implements UseCaseInterface<AddTransactionUseCaseInputDTO, AddTransactionUseCaseOutputDTO> {
  constructor (private _repository: TransactionGateway) {}

  async execute (input: AddTransactionUseCaseInputDTO): Promise<AddTransactionUseCaseOutputDTO> {
    const accountFacade = AccountFacadeFactory.create()
    const senderAccount = await accountFacade.find({ filter: { id: input.senderAccount } })
    if (!senderAccount) {
      throw new Error('Sender Account not found')
    }
    const recipientAccount = await accountFacade.find({ filter: { id: input.recipientAccount } })
    if (!recipientAccount) {
      throw new Error('Recipient Account not found')
    }

    const transaction = new Transaction(input)

    await accountFacade.addStatement({
      account: senderAccount.id,
      transaction: transaction.id.id,
      amount: transaction.amount,
      type: 'debit'
    })

    await accountFacade.addStatement({
      account: recipientAccount.id,
      transaction: transaction.id.id,
      amount: transaction.amount,
      type: 'credit'
    })

    await this._repository.add(transaction)

    return {
      id: transaction.id.id,
      senderAccount: transaction.senderAccount,
      senderName: transaction.senderName,
      recipientAccount: transaction.recipientAccount,
      recepientName: transaction.recipientName,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    }
  }
}
