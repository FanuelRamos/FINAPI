import Id from '../../../@shared/domain/value-object/id-value-object'
import TransactionGateway from '../../gateway/transaction-gateway'
import FindTransactionUseCase from './find-transaction-usecase'

const input = {
  filter: {
    id: new Id().id
  }
}

const expectedOutput = {
  id: new Id().id,
  senderAccount: new Id().id,
  senderName: 'Any_Sender_Name',
  recipientAccount: new Id().id,
  recipientName: 'Any_Recepient_Name',
  amount: 25000,
  createdAt: new Date()
}

const MockRepository = (): TransactionGateway => {
  return {
    add: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    find: jest.fn()
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
})
