import UseCaseInterface from '../../../@shared/usecase/usecase-interface'
import Account from '../../entity/account-entity'
import AccountGateway from '../../gateway/account-gateway'
import { AddAccountUseCaseInputDTO, AddAccountUseCaseOutputDTO } from './add-account-dto'

export default class AddAccountUseCase implements UseCaseInterface<AddAccountUseCaseInputDTO, AddAccountUseCaseOutputDTO> {
  constructor (private _repository: AccountGateway) {}

  async execute (input: AddAccountUseCaseInputDTO): Promise<AddAccountUseCaseOutputDTO> {
    const account = new Account(input)

    await this._repository.add(account)

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
