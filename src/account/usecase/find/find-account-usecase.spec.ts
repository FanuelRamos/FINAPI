import Id from '../../../@shared/domain/value-object/id-value-object'
import AccountGateway from '../../gateway/account-gateway'
import FindAccountUseCase from './find-account-usecase'

const input = {
  filter: {
    id: new Id().id
  }
}

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
    find: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    findById: jest.fn(),
    add: jest.fn(),
    update: jest.fn()
  }
}

type sutTypes = {
  repository: AccountGateway
  sut: FindAccountUseCase
}

const makeSut = (): sutTypes => {
  const repository = MockRepository()
  const sut = new FindAccountUseCase(repository)
  return {
    sut,
    repository
  }
}

describe('FindAccountUsecase unit test', () => {
  test('Should be able to find an account', async () => {
    const { sut, repository } = makeSut()
    const output = await sut.execute(input)

    expect(repository.find).toHaveBeenCalledTimes(1)
    expect(output.id).toBeTruthy()
    expect(output.name).toEqual(expectedOutput.name)
    expect(output.burth).toEqual(expectedOutput.burth)
    expect(output.country).toEqual(expectedOutput.country)
    expect(output.city).toEqual(expectedOutput.city)
    expect(output.address).toEqual(expectedOutput.address)
    expect(output.postalCode).toEqual(expectedOutput.postalCode)
    expect(output.phone).toEqual(expectedOutput.phone)
    expect(output.email).toEqual(expectedOutput.email)
  })

  test('Should not be able to find an account', async () => {
    const { sut, repository } = makeSut()
    repository.find = jest.fn()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError('Account not found')
  })
})
