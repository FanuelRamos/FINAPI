import { connectDb, dropCollections, dropDb } from '../../@shared/utils/mongodb-memory-server'
import Account from '../entity/account-entity'
import { AccountModel } from './account-model'
import AccountRepository from './account-repository'

const fakeAccount = new Account({
  name: 'any_name',
  burth: new Date(),
  country: 'any_country',
  city: 'any_city',
  address: 'any_address',
  postalCode: '0000',
  phone: '+244939781000',
  email: 'any_email@mail.com'
})

describe('AccountRepository unit tests', () => {
  beforeAll(async () => {
    await connectDb()
  })

  test('Should create a new account', async () => {
    const accountRepository = new AccountRepository()

    await accountRepository.add(fakeAccount)
    fakeAccount.createdAt = new Date()
    fakeAccount.updatedAt = new Date()

    const result = await AccountModel.findOne({ id: fakeAccount.id.id })

    expect(result).toBeTruthy()
    expect(result?.id).toBeDefined()
    expect(result?.name).toEqual(fakeAccount.name)
    expect(result?.burth).toEqual(fakeAccount.burth)
    expect(result?.country).toEqual(fakeAccount.country)
    expect(result?.city).toEqual(fakeAccount.city)
    expect(result?.address).toEqual(fakeAccount.address)
    expect(result?.postalCode).toEqual(fakeAccount.postalCode)
    expect(result?.phone).toEqual(fakeAccount.phone)
    expect(result?.email).toEqual(fakeAccount.email)
  })

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
