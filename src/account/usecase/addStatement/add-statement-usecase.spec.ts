import Id from '../../../@shared/domain/value-object/id-value-object'
import StatementGateway from '../../gateway/statement-gateway'
import AddStatementUseCase from './add-statement-usecase'

const input = {
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

const MockRepository = (): StatementGateway => {
  return {
    findStatement: jest.fn(),
    addStatement: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
  }
}

type sutTypes = {
  repository: StatementGateway
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
})
