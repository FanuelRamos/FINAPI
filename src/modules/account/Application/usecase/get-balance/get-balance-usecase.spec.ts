import Id from '../../../../@shared/domain/value-object/id-value-object'
import AccountGateway from '../../gateway/account-gateway'
import GetBalanceUseCase from './get-balance-usecase'

const expectedOutput = [
  {
    transaction: new Id().id,
    amount: 25000,
    type: 'credit'
  },
  {
    transaction: new Id().id,
    amount: 5000,
    type: 'debit'
  }
]

const input = {
  id: new Id().id
}

const MockRepository = (): AccountGateway => {
  return {
    find: jest.fn(),
    findById: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    findStatement: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    addStatement: jest.fn()
  }
}

type sutTypes = {
  repository: AccountGateway
  sut: GetBalanceUseCase
}

const makesut = (): sutTypes => {
  const repository = MockRepository()
  const sut = new GetBalanceUseCase(repository)
  return {
    repository,
    sut
  }
}

describe('GetBalanceUseCase unit tests', () => {
  test('Shold not be able to get balance of an not existing account', async () => {
    const { sut, repository } = makesut()
    repository.findStatement = jest.fn()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError('Statement not found')
  })

  test('Should be able to get balance', async () => {
    const { sut } = makesut()
    const balance = await sut.execute(input)
    const expectedBalance = expectedOutput[0].amount - expectedOutput[1].amount
    expect(balance.balance).toBe(expectedBalance)
  })
})
