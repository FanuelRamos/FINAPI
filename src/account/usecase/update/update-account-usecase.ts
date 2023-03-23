import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import AccountGateway from '../../gateway/account-gateway'
import { UpdateAccountUseCaseInputDTO, UpdateAccountUseCaseOutputDTO } from './update-account-dto'

export default class UpdateAccountUseCase implements UseCaseInterface<UpdateAccountUseCaseInputDTO, UpdateAccountUseCaseOutputDTO> {
  constructor (private _repository: AccountGateway) {}

  async execute (input: UpdateAccountUseCaseInputDTO): Promise<any> {
    const account = await this._repository.findById(input.id)
    if (!account) {
      throw new Error('Account not found')
    }
  }
}
