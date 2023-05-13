import Id from '../../../@shared/domain/value-object/id-value-object'
import TransactionGateway from '../../gateway/transaction-gateway'
import FindTransactionUseCase from './find-transaction-usecase'

const input = {
  filter: {
    id: new Id().id
  }
}

const expectedOutput = {
  id: new Id(),
  senderAccount: new Id().id,
  senderName: 'Any_Sender_Name',
  recipientAccount: new Id().id,
  recipientName: 'Any_Recepient_Name',
  amount: 25000,
  createdAt: new Date()
}

const MockRepository = (): TransactionGateway => {
  return {
    add: jest.fn(),
    findById: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
  }
}

type sutTypes = {
  sut: FindTransactionUseCase
  repository: TransactionGateway
}

const makeSut = (): sutTypes => {
  const repository = MockRepository()
  const sut = new FindTransactionUseCase(repository)
  return {
    sut,
    repository
  }
}

describe('FindTransactionUseCase tests', () => {
  test('Should call TransactionGateway.find with correct values', async () => {
    const { sut, repository } = makeSut()
    const findSpy = jest.spyOn(repository, 'find')
    await sut.execute(input)
    expect(findSpy).toHaveBeenCalledWith(input.filter)
  })

  test('Should throw if transaction do not exists', async () => {
    const { sut, repository } = makeSut()
    repository.find = jest.fn()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError('Transaction not found')
  })

  test('Should return a transaction on success', async () => {
    const { sut, repository } = makeSut()
    const output = await sut.execute(input)
    expect(output).toBeTruthy()
    expect(output.id).toBeDefined()
    expect(output.senderAccount).toBe(expectedOutput.senderAccount)
    expect(output.senderName).toBe(expectedOutput.senderName)
    expect(output.recipientAccount).toBe(expectedOutput.recipientAccount)
    expect(output.recipientName).toBe(expectedOutput.recipientName)
    expect(output.amount).toBe(expectedOutput.amount)
    expect(output.createdAt).toBe(expectedOutput.createdAt)
  })
})
