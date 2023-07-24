import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import {
  AddTransactionFacadeInputDTO,
  AddTransactionFacadeOutputDTO,
  FindTransactionFacadeInputDTO,
  FindTransactionFacadeOutputDTO,
  TransactionFacadeInterface
} from './transaction-facade-interface'

interface UseCaseProps {
  addTransationUseCase: UseCaseInterface<AddTransactionFacadeInputDTO, AddTransactionFacadeOutputDTO>
  findTransactionUseCase: UseCaseInterface<FindTransactionFacadeInputDTO, FindTransactionFacadeOutputDTO>
}

export default class TransactionFacade implements TransactionFacadeInterface {
  private _addTransationUseCase: UseCaseInterface<AddTransactionFacadeInputDTO, AddTransactionFacadeOutputDTO>
  private _findTransactionUseCase: UseCaseInterface<FindTransactionFacadeInputDTO, FindTransactionFacadeOutputDTO>

  constructor (props: UseCaseProps) {
    this._addTransationUseCase = props.addTransationUseCase
    this._findTransactionUseCase = props.findTransactionUseCase
  }

  async add (input: AddTransactionFacadeInputDTO): Promise<AddTransactionFacadeOutputDTO> {
    return await this._addTransationUseCase.execute(input)
  }

  async find (input: FindTransactionFacadeInputDTO): Promise<FindTransactionFacadeOutputDTO> {
    return await this._findTransactionUseCase.execute(input)
  }
}
