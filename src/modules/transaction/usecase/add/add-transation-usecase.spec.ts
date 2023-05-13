import Id from '../../../@shared/domain/value-object/id-value-object'
import TransactionGateway from '../../gateway/transaction-gateway'
import AccountFacadeFactory from '../../../account/factory/account-facade-factory'
import AddTransactionUseCase from './add-transaction-usecase'

const input = {
  senderAccount: new Id().id,
  senderName: 'Any_Sender_Name',
  recipientAccount: new Id().id,
  recipientName: 'Any_Recepient_Name',
  amount: 25000
}

const fakeAccount = {
  id: new Id().id,
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

jest.mock('../../../account/factory/account-facade-factory')

AccountFacadeFactory.create = jest.fn().mockReturnValue({
  find: jest.fn().mockReturnValue(Promise.resolve(fakeAccount)),
  findById: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  findStatement: jest.fn(),
  addStatement: jest.fn()
})

const MockRepository = (): TransactionGateway => {
  return {
    add: jest.fn(),
    findById: jest.fn(),
    find: jest.fn()
  }
}

type sutTypes = {
  sut: AddTransactionUseCase
  repository: TransactionGateway
}

const makeSut = (): sutTypes => {
  const repository = MockRepository()
  const sut = new AddTransactionUseCase(repository)
  return {
    sut,
    repository
  }
}

describe('AddTransactionUseCase tests', () => {
  test('Should return a transaction on success', async () => {
    const { sut } = makeSut()
    const output = await sut.execute(input)
    expect(output).toBeTruthy()
    expect(output.id).toBeDefined()
    expect(output.senderAccount).toBe(input.senderAccount)
    expect(output.senderName).toBe(input.senderName)
    expect(output.recipientAccount).toBe(input.recipientAccount)
    expect(output.recipientName).toBe(input.recipientName)
    expect(output.amount).toBe(input.amount)
    expect(output.createdAt).toBeDefined()
  })

  test('Should throw if senderAccount or recipientAccount do not exists', async () => {
    const { sut } = makeSut()
    AccountFacadeFactory.create().find = jest.fn().mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })
})
