import Id from '../../../../@shared/domain/value-object/id-value-object'
import AccountGateway from '../../gateway/account-gateway'
import GetBalanceUseCase from '../get-balance/get-balance-usecase'
import { AddStatementUseCaseInputDTO } from './add-statement-dto'
import AddStatementUseCase from './add-statement-usecase'

const input: AddStatementUseCaseInputDTO = {
  account: new Id().id,
  transaction: new Id().id,
  amount: 25000,
  type: 'credit'
}

const expectedOutput = {
  transaction: new Id(),
  amount: 25000,
  type: 'credit'
}

const MockRepository = (): AccountGateway => {
  return {
    find: jest.fn(),
    findById: jest.fn(),
    add: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    update: jest.fn(),
    findStatement: jest.fn(),
    addStatement: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
  }
}

jest.spyOn(GetBalanceUseCase.prototype, 'execute')
  .mockImplementation(async () => {
    return {
      balance: input.amount
    }
  })

type sutTypes = {
  repository: AccountGateway
  sut: AddStatementUseCase
}

const makeSut = (): sutTypes => {
  const repository = MockRepository()
  const sut = new AddStatementUseCase(repository)
  return {
    repository,
    sut
  }
}

describe('AddStatementUseCase unit test', () => {
  test('Should throws if it do not find account', async () => {
    const { sut, repository } = makeSut()
    repository.addStatement = jest.fn()

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrowError('Could not add statement')
  })

  test('Should throws if it do not have enough founds', async () => {
    const { sut } = makeSut()
    const promise = sut.execute({
      account: new Id().id,
      transaction: new Id().id,
      amount: 35000,
      type: 'debit'
    })

    await expect(promise).rejects.toThrowError('Insufficient funds')
  })

  test('Should be able to add a Statement', async () => {
    const { sut, repository } = makeSut()
    repository.addStatement = jest.fn().mockReturnValue(Promise.resolve(expectedOutput))

    const output = await sut.execute(input)
    expect(repository.addStatement).toHaveBeenCalledTimes(1)
    expect(output.transaction).toBe(expectedOutput.transaction.id)
    expect(output.amount).toBe(expectedOutput.amount)
    expect(output.type).toBe(expectedOutput.type)
  })
})
