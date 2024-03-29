import Id from '../../../@shared/domain/value-object/id-value-object'
import { connectDb, dropCollections, dropDb } from '../../../@shared/utils/mongodb-memory-server'
import Account from '../../Domain/entity/account-entity'
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

const fakeStatement = {
  account: new Id().id,
  transaction: new Id().id,
  amount: 25000,
  type: 'credit'
}

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

  test('Should not return an update an account if it do not exists', async () => {
    const accountRepository = makeSut()

    const result = await accountRepository.update(fakeAccount)

    expect(result).toBeFalsy()
  })

  test('Should return an updated account if exists', async () => {
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

    const updatedData = new Account({
      id: fakeAccount.id,
      name: 'Fanuel Ramos',
      burth: new Date(),
      country: 'Angola',
      city: 'Luanda',
      address: 'any_address',
      postalCode: '0000',
      phone: '+244939781000',
      email: 'fanuelramos111@gmail.com'
    })

    const result = await accountRepository.update(updatedData)

    expect(result).toBeTruthy()
    expect(result?.id).toBeDefined()
    expect(result?.name).toEqual(updatedData.name)
    expect(result?.burth).toEqual(updatedData.burth)
    expect(result?.country).toEqual(updatedData.country)
    expect(result?.city).toEqual(updatedData.city)
    expect(result?.address).toEqual(updatedData.address)
    expect(result?.postalCode).toEqual(updatedData.postalCode)
    expect(result?.phone).toEqual(updatedData.phone)
    expect(result?.email).toEqual(updatedData.email)
  })

  test('Should create a new statement', async () => {
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

    fakeStatement.account = fakeAccount.id.id
    await accountRepository.addStatement(fakeStatement)

    const result = await AccountModel.findOne({ id: fakeAccount.id.id })

    expect(result).toBeTruthy()
    expect(result?.id).toBeDefined()
    expect(result?.statement[0].id).toBeDefined()
    expect(result?.statement[0].amount).toBe(fakeStatement.amount)
    expect(result?.statement[0].type).toBe(fakeStatement.type)
  })

  test('Should not be able to create a new statement', async () => {
    const accountRepository = makeSut()

    fakeStatement.account = fakeAccount.id.id
    await accountRepository.addStatement(fakeStatement)

    const result = await AccountModel.findOne({ id: fakeAccount.id.id })

    expect(result).toBeFalsy()
    expect(result?.statement[0].id).toBeFalsy()
    expect(result?.statement[0].amount).toBeFalsy()
    expect(result?.statement[0].type).toBeFalsy()
  })

  test('Should find statements', async () => {
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

    fakeStatement.account = fakeAccount.id.id
    await accountRepository.addStatement(fakeStatement)
    fakeStatement.transaction = new Id().id
    fakeStatement.type = 'debit'
    await accountRepository.addStatement(fakeStatement)

    const statement = await accountRepository.findStatement(fakeAccount.id.id)

    expect(statement).toBeTruthy()
    expect(statement![0].transaction).toBeDefined()
    expect(statement![1].transaction).toBeDefined()
    expect(statement![0].type).toBe('credit')
    expect(statement![1].type).toBe('debit')
  })

  test('Should not find statement', async () => {
    const accountRepository = makeSut()

    fakeStatement.account = fakeAccount.id.id
    await accountRepository.addStatement(fakeStatement)

    const statement = await accountRepository.findStatement(fakeAccount.id.id)

    expect(statement).toBeFalsy()
  })

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
