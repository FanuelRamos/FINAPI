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

const makeSut = (): AccountRepository => {
  return new AccountRepository()
}

describe('AccountRepository unit tests', () => {
  beforeAll(async () => {
    await connectDb()
  })

  test('Should create a new account', async () => {
    const accountRepository = makeSut()

    await accountRepository.add(fakeAccount)

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

  test('Should not return an account if id not exists', async () => {
    const accountRepository = makeSut()

    const result = await accountRepository.findById('any_id')

    expect(result).toBeFalsy()
  })

  test('Should return an account if id exists', async () => {
    const accountRepository = makeSut()

    await AccountModel.create({
      id: fakeAccount.id,
      name: fakeAccount.name,
      burth: fakeAccount.burth,
      country: fakeAccount.country,
      city: fakeAccount.city,
      address: fakeAccount.address,
      postalCode: fakeAccount.postalCode,
      phone: fakeAccount.phone,
      email: fakeAccount.email,
      createdAt: fakeAccount.createdAt,
      updatedAt: fakeAccount.updatedAt
    })

    const result = await accountRepository.findById(fakeAccount.id.id)

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

  test('Should return an account if exists an account with given filters', async () => {
    const accountRepository = makeSut()

    await AccountModel.create({
      id: fakeAccount.id,
      name: fakeAccount.name,
      burth: fakeAccount.burth,
      country: fakeAccount.country,
      city: fakeAccount.city,
      address: fakeAccount.address,
      postalCode: fakeAccount.postalCode,
      phone: fakeAccount.phone,
      email: fakeAccount.email,
      createdAt: fakeAccount.createdAt,
      updatedAt: fakeAccount.updatedAt
    })

    const result = await accountRepository.find({ name: fakeAccount.name })

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

  test('Should not return an account if do not exists an account with given filters', async () => {
    const accountRepository = makeSut()

    const result = await accountRepository.find({ name: fakeAccount.name })

    expect(result).toBeFalsy()
  })

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
