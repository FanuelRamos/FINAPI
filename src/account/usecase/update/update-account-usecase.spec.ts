import Id from '../../../@shared/domain/value-object/id-value-object'
import AccountGateway from '../../gateway/account-gateway'
import UpdateAccountUseCase from './update-account-usecase'

const expectedOutput = {
  id: new Id(),
  name: 'any_name',
  burth: new Date(),
  country: 'any_country',
  city: 'any_city',
  address: 'any_address',
  postalCode: '0000',
  phone: '+244939781000',
  email: 'any_email@mail.com',
  createdAt: new Date(),
  updatedAt: new Date()
}

const MockRepository = (): AccountGateway => {
  return {
    find: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    add: jest.fn(),
    update: jest.fn()
  }
}

type sutTypes = {
  repository: AccountGateway
  sut: UpdateAccountUseCase
}

const makeSut = (): sutTypes => {
  const repository = MockRepository()
  const sut = new UpdateAccountUseCase(repository)
  return {
    repository,
    sut
  }
}

describe('UpdateAccountUseCase unit test', () => {
  test('Should not find an account', async () => {
    const { sut, repository } = makeSut()
    repository.findById = jest.fn()

    const input = {
      id: new Id().id
    }

    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError('Account not found')
  })

  test('Should not update an account', async () => {
    const { sut } = makeSut()
    const input = {
      id: expectedOutput.id.id
    }

    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError('Could not update account')
  })
})
