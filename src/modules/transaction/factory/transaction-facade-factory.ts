import { TransactionFacadeInterface } from '../facade/transaction-facade-interface'
import TransactionFacade from '../facade/transation-facade'
import TransactionRepository from '../repository/transaction-repository'
import AddTransactionUseCase from '../usecase/add/add-transaction-usecase'
import FindTransactionUseCase from '../usecase/find/find-transaction-usecase'

export default class TransactionFacadeFactory {
  static create (): TransactionFacadeInterface {
    const transactionRepository = new TransactionRepository()
    const addTransationUseCase = new AddTransactionUseCase(transactionRepository)
    const findTransactionUseCase = new FindTransactionUseCase(transactionRepository)

    const transactionFacade = new TransactionFacade({
      addTransationUseCase,
      findTransactionUseCase
    })

    return transactionFacade
  }
}
