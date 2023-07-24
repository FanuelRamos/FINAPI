import UseCaseInterface from '../../../../@shared/usecase/usecase-interface'
import AccountGateway from '../../gateway/account-gateway'
import { UpdateAccountUseCaseInputDTO, UpdateAccountUseCaseOutputDTO } from './update-account-dto'

export default class UpdateAccountUseCase implements UseCaseInterface<UpdateAccountUseCaseInputDTO, UpdateAccountUseCaseOutputDTO> {
  constructor (private _repository: AccountGateway) {}

  async execute (input: UpdateAccountUseCaseInputDTO): Promise<UpdateAccountUseCaseOutputDTO> {
    const account = await this._repository.findById(input.id)
    if (!account) {
      throw new Error('Account not found')
    }

    account.name = input.name ?? account.name
    account.burth = input.burth ?? account.burth
    account.country = input.country ?? account.country
    account.city = input.city ?? account.city
    account.address = input.address ?? account.address
    account.postalCode = input.postalCode ?? account.postalCode
    account.phone = input.phone ?? account.phone
    account.email = input.email ?? account.email

    const updatedAccount = await this._repository.update(account)
    if (!updatedAccount) {
      throw new Error('Could not update account')
    }

    return {
      id: updatedAccount.id.id,
      name: updatedAccount.name,
      burth: updatedAccount.burth,
      country: updatedAccount.country,
      city: updatedAccount.city,
      address: updatedAccount.address,
      postalCode: updatedAccount.postalCode,
      phone: updatedAccount.phone,
      email: updatedAccount.email,
      updatedAt: updatedAccount.updatedAt
    }
  }
}
