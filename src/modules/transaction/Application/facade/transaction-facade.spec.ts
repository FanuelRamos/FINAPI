import Id from '../../../@shared/domain/value-object/id-value-object'
import { connectDb, dropCollections, dropDb } from '../../../@shared/utils/mongodb-memory-server'
import AccountFacadeFactory from '../../../account/Infra/factory/account-facade-factory'
import TransactionEntity from '../../Domain/entity/transaction-entity'
import TransactionFacadeFactory from '../../infra/factory/transaction-facade-factory'
import { TransactionModel } from '../../infra/repository/transaction-model'

const fakeAccountInput = {
  name: 'any_name',
  burth: new Date(),
  country: 'any_country',
  city: 'any_city',
  address: 'any_address',
  postalCode: '0000',
  phone: '+244939781000',
  email: 'any_email@mail.com'
}

type sutTypes = {
  add: any
  find: any
}

const makeSut = (): sutTypes => {
  return TransactionFacadeFactory.create()
}

describe('TransactionFacade tests', () => {
  beforeAll(async () => {
    await connectDb()
  })

  test('Should be able to add a Transaction', async () => {
    const transactionFacade = makeSut()
    fakeAccountInput.name = 'Any_Sender_Name'
    const senderAccount = await AccountFacadeFactory.create().add(fakeAccountInput)
    await AccountFacadeFactory.create().addStatement({
      account: senderAccount.id,
      transaction: new Id().id,
      amount: 35000,
      type: 'credit'
    })

    fakeAccountInput.name = 'Any_Recepient_Name'
    fakeAccountInput.email = 'Any_Recepient_Name@mail.com'
    const recipientAccount = await AccountFacadeFactory.create().add(fakeAccountInput)

    const fakeTransactionInput = {
      senderAccount: senderAccount.id,
      senderName: senderAccount.name,
      recipientAccount: recipientAccount.id,
      recipientName: recipientAccount.name,
      amount: 25000
    }

    const output = await transactionFacade.add(fakeTransactionInput)
    expect(output).toBeTruthy()
    expect(output.id).toBeDefined()
    expect(output.senderAccount).toBe(fakeTransactionInput.senderAccount)
    expect(output.senderName).toBe(fakeTransactionInput.senderName)
    expect(output.recipientAccount).toBe(fakeTransactionInput.recipientAccount)
    expect(output.recipientName).toBe(fakeTransactionInput.recipientName)
    expect(output.amount).toBe(fakeTransactionInput.amount)
    expect(output.createdAt).toBeDefined()
  })

  test('Should be able to find a Transaction', async () => {
    const transactionFacade = makeSut()

    const fakeTransaction = new TransactionEntity({
      senderAccount: new Id().id,
      senderName: 'Any_Sender_Name',
      recipientAccount: new Id().id,
      recipientName: 'Any_Recepient_Name',
      amount: 25000
    })

    await TransactionModel.create({
      id: fakeTransaction.id.id,
      senderAccount: fakeTransaction.senderAccount,
      senderName: fakeTransaction.senderName,
      recipientAccount: fakeTransaction.recipientAccount,
      recipientName: fakeTransaction.recipientName,
      amount: fakeTransaction.amount,
      createdAt: fakeTransaction.createdAt,
      updatedAt: fakeTransaction.updatedAt
    })

    const output = await transactionFacade.find({
      filter: {
        id: fakeTransaction.id.id
      }
    })
    expect(output).toBeTruthy()
    expect(output.id).toBeDefined()
    expect(output.senderAccount).toBe(fakeTransaction.senderAccount)
    expect(output.senderName).toBe(fakeTransaction.senderName)
    expect(output.recipientAccount).toBe(fakeTransaction.recipientAccount)
    expect(output.recipientName).toBe(fakeTransaction.recipientName)
    expect(output.amount).toBe(fakeTransaction.amount)
    expect(output.createdAt).toBeDefined()
  })

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
