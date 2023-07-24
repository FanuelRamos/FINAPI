import Statement from '../../../@shared/domain/value-object/statement-value-object'
import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import {
  AccountFacadeInterface,
  AddAccountFacadeInputDTO,
  AddAccountFacadeOutputDTO,
  AddStatementFacadeInputDTO,
  AddStatementFacadeOutputDTO,
  FindAccountFacadeInputDTO,
  FindAccountFacadeOutputDTO,
  FindStatementFacadeInputDTO,
  GetBalanceFacadeInputDTO,
  GetBalanceFacadeOutputDTO,
  UpdateAccountFacadeInputDTO,
  UpdateAccountFacadeOutputDTO
} from './account-facade-interface'

interface UseCaseProps {
  addAccountUseCase: UseCaseInterface<AddAccountFacadeInputDTO, AddAccountFacadeOutputDTO>
  findAccountUseCase: UseCaseInterface<FindAccountFacadeInputDTO, FindAccountFacadeOutputDTO>
  updateAccountUseCase: UseCaseInterface<UpdateAccountFacadeInputDTO, UpdateAccountFacadeOutputDTO>
  addStatementUseCase: UseCaseInterface<AddStatementFacadeInputDTO, AddStatementFacadeOutputDTO>
  findStatementUseCase: UseCaseInterface<FindStatementFacadeInputDTO, Statement[]>
  getBalanceUseCase: UseCaseInterface<GetBalanceFacadeInputDTO, GetBalanceFacadeOutputDTO>
}

export default class AccountFacade implements AccountFacadeInterface {
  private _addAccountUseCase: UseCaseInterface<AddAccountFacadeInputDTO, AddAccountFacadeOutputDTO>
  private _findAccountUseCase: UseCaseInterface<FindAccountFacadeInputDTO, FindAccountFacadeOutputDTO>
  private _updateAccountUseCase: UseCaseInterface<UpdateAccountFacadeInputDTO, UpdateAccountFacadeOutputDTO>
  private _addStatementUseCase: UseCaseInterface<AddStatementFacadeInputDTO, AddStatementFacadeOutputDTO>
  private _findStatementUseCase: UseCaseInterface<FindStatementFacadeInputDTO, Statement[]>
  private _getBalanceUseCase: UseCaseInterface<GetBalanceFacadeInputDTO, GetBalanceFacadeOutputDTO>

  constructor (props: UseCaseProps) {
    this._addAccountUseCase = props.addAccountUseCase
    this._findAccountUseCase = props.findAccountUseCase
    this._updateAccountUseCase = props.updateAccountUseCase
    this._addStatementUseCase = props.addStatementUseCase
    this._findStatementUseCase = props.findStatementUseCase
    this._getBalanceUseCase = props.getBalanceUseCase
  }

  async add (input: AddAccountFacadeInputDTO): Promise<AddAccountFacadeOutputDTO> {
    return await this._addAccountUseCase.execute(input)
  }

  async find (input: FindAccountFacadeInputDTO): Promise<FindAccountFacadeOutputDTO> {
    return await this._findAccountUseCase.execute(input)
  }

  async update (input: UpdateAccountFacadeInputDTO): Promise<UpdateAccountFacadeOutputDTO> {
    return await this._updateAccountUseCase.execute(input)
  }

  async addStatement (input: AddStatementFacadeInputDTO): Promise<AddStatementFacadeOutputDTO> {
    return await this._addStatementUseCase.execute(input)
  }

  async findStatement (input: FindStatementFacadeInputDTO): Promise<Statement[]> {
    return await this._findStatementUseCase.execute(input)
  }

  async getBalance (input: GetBalanceFacadeInputDTO): Promise<GetBalanceFacadeOutputDTO> {
    return await this._getBalanceUseCase.execute(input)
  }
}
