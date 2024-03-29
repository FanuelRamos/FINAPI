import Id from '../../../../@shared/domain/value-object/id-value-object'
import AccountGateway from '../../../Application/gateway/account-gateway'
import FindStatementUseCase from './find-statement-usecase'

const expectedOutput = [
  {
    transaction: new Id().id,
    amount: 25000,
    type: 'credit',
    createdAt: new Date()
  },
  {
    transaction: new Id().id,
    amount: 5000,
    type: 'debit',
    createdAt: new Date()
  }
]

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
  sut: FindStatementUseCase
}

const makesut = (): sutTypes => {
  const repository = MockRepository()
  const sut = new FindStatementUseCase(repository)
  return {
    repository,
    sut
  }
}

describe('FindStatementUseCase unit test', () => {
  test('Should be able to find statements', async () => {
    const { sut, repository } = makesut()
    const id = new Id().id
    const output = await sut.execute({ id })

    expect(repository.findStatement).toHaveBeenCalledTimes(1)
    expect(output[0].transaction).toBe(expectedOutput[0].transaction)
    expect(output[1].transaction).toBe(expectedOutput[1].transaction)
    expect(output[0].amount).toBe(expectedOutput[0].amount)
    expect(output[1].amount).toBe(expectedOutput[1].amount)
    expect(output[0].type).toBe(expectedOutput[0].type)
    expect(output[1].type).toBe(expectedOutput[1].type)
    expect(output[0].createdAt).toBe(expectedOutput[0].createdAt)
    expect(output[1].createdAt).toBe(expectedOutput[1].createdAt)
  })

  test('Should not be able to find statement', async () => {
    const { sut, repository } = makesut()
    repository.findStatement = jest.fn()
    const id = new Id().id
    const promise = sut.execute({ id })
    await expect(promise).rejects.toThrowError('Could not find statement')
  })
})
