import Id from '../../../@shared/domain/value-object/id-value-object'
import TransactionGateway from '../../gateway/transaction-gateway'
import AccountFacadeFactory from '../../../account/factory/account-facade-factory'
import AddTransactionUseCase from './add-transaction-usecase'
import TransactionEntity from '../../entity/transaction-entity'

const input = {
  senderAccount: new Id().id,
  senderName: 'Any_Sender_Name',
  recipientAccount: new Id().id,
  recepientName: 'Any_Recipient_Name',
  amount: 25000
}

const expectedOutput = new TransactionEntity({
  senderAccount: new Id().id,
  senderName: 'Any_Sender_Name',
  recipientAccount: new Id().id,
  recepientName: 'Any_Recepient_Name',
  amount: 200
})

jest.mock('../../../account/factory/account-facade-factory')

AccountFacadeFactory.create = jest.fn().mockReturnValue({
  find: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
  findById: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  findStatement: jest.fn(),
  addStatement: jest.fn()
})

const MockRepository = (): TransactionGateway => {
  return {
    add: jest.fn(),
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
  test('Should throw if senderAccount do not exists', async () => {
    const { sut } = makeSut()
    AccountFacadeFactory.create().find = jest.fn()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError('Sender Account not found')
  })
})
