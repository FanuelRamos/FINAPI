import AccountFacade from '../facade/account-facade'
import { AccountFacadeInterface } from '../facade/account-facade-interface'
import AccountRepository from '../repository/account-repository'
import AddAccountUseCase from '../usecase/add/add-account-usecase'
import AddStatementUseCase from '../usecase/addStatement/add-statement-usecase'
import FindAccountUseCase from '../usecase/find/find-account-usecase'
import FindStatementUseCase from '../usecase/findStatement/find-statement-usecase'
import GetBalanceUseCase from '../usecase/get-balance/get-balance-usecase'
import UpdateAccountUseCase from '../usecase/update/update-account-usecase'

export default class AccountFacadeFactory {
  static create (): AccountFacadeInterface {
    const repository = new AccountRepository()
    const addAccountUseCase = new AddAccountUseCase(repository)
    const findAccountUseCase = new FindAccountUseCase(repository)
    const updateAccountUseCase = new UpdateAccountUseCase(repository)
    const addStatementUseCase = new AddStatementUseCase(repository)
    const findStatementUseCase = new FindStatementUseCase(repository)
    const getBalanceUseCase = new GetBalanceUseCase(repository)

    const accountFacade = new AccountFacade({
      addAccountUseCase,
      findAccountUseCase,
      updateAccountUseCase,
      addStatementUseCase,
      findStatementUseCase,
      getBalanceUseCase
    })

    return accountFacade
  }
}
