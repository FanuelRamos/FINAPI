import Id from '../../@shared/domain/value-object/id-value-object'
import { connectDb, dropCollections, dropDb } from '../../@shared/utils/mongodb-memory-server'
import TransactionEntity from '../entity/transaction-entity'
import { TransactionModel } from './transaction-model'
import TransactionRepository from './transaction-repository'

const fakeTransaction = new TransactionEntity({
  senderAccount: new Id().id,
  senderName: 'Any_Sender_Name',
  recipientAccount: new Id().id,
  recipientName: 'Any_Recepient_Name',
  amount: 25000
})

const makeSut = (): TransactionRepository => {
  return new TransactionRepository()
}

describe('TransactionRepository tests', () => {
  beforeAll(async () => {
    await connectDb()
  })

  test('Should add a transaction', async () => {
    const transactionRepository = makeSut()
    await transactionRepository.add(fakeTransaction)
    const result = await TransactionModel.findOne({ id: fakeTransaction.id.id })

    expect(result).toBeTruthy()
    expect(result?.id).toBeDefined()
    expect(result?.senderAccount).toBe(fakeTransaction.senderAccount)
    expect(result?.senderName).toBe(fakeTransaction.senderName)
    expect(result?.recipientAccount).toBe(fakeTransaction.recipientAccount)
    expect(result?.recipientName).toBe(fakeTransaction.recipientName)
    expect(result?.amount).toBe(fakeTransaction.amount)
    expect(result?.createdAt).toEqual(fakeTransaction.createdAt)
    expect(result?.updatedAt).toEqual(fakeTransaction.updatedAt)
  })

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
