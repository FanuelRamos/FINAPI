import UseCaseInterface from '../../../../@shared/usecase/usecase-interface'
import AccountGateway from '../../gateway/account-gateway'
import { FindAccountUseCaseInputDTO, FindAccountUseCaseOutputDTO } from './find-account-dto'

export default class FindAccountUseCase implements UseCaseInterface<FindAccountUseCaseInputDTO, FindAccountUseCaseOutputDTO> {
  constructor (private _repository: AccountGateway) {}

  async execute (input: FindAccountUseCaseInputDTO): Promise<FindAccountUseCaseOutputDTO> {
    const account = await this._repository.find(input.filter)
    if (!account) {
      throw new Error('Account not found')
    }

    return {
      id: account.id.id,
      name: account.name,
      burth: account.burth,
      country: account.country,
      city: account.city,
      address: account.address,
      postalCode: account.postalCode,
      phone: account.phone,
      email: account.email,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    }
  }
}
