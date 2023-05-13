import Id from '../../@shared/domain/value-object/id-value-object'
import { connectDb, dropCollections, dropDb } from '../../@shared/utils/mongodb-memory-server'
import AccountFacadeFactory from '../../account/factory/account-facade-factory'
import TransactionEntity from '../entity/transaction-entity'
import TransactionFacadeFactory from '../factory/transaction-facade-factory'

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

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
