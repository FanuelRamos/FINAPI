import Id from '../../@shared/domain/value-object/id-value-object'
import { connectDb, dropCollections, dropDb } from '../../@shared/utils/mongodb-memory-server'
import Account from '../entity/account-entity'
import AccountFacadeFactory from '../factory/account-facade-factory'
import { AccountModel } from '../repository/account-model'
import { AccountFacadeInterface } from './account-facade-interface'

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

const makeSut = (): AccountFacadeInterface => {
  return AccountFacadeFactory.create()
}

describe('AccountFacade unit test', () => {
  beforeAll(async () => {
    await connectDb()
  })

  test('Should be able to create a new Account', async () => {
    const accountFacade = makeSut()

    const input = {
      name: 'any_name',
      burth: new Date(),
      country: 'any_country',
      city: 'any_city',
      address: 'any_address',
      postalCode: '0000',
      phone: '+244939781000',
      email: 'any_email@mail.com'
    }

    const output = await accountFacade.add(input)
    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.country).toBe(input.country)
    expect(output.city).toBe(input.city)
    expect(output.address).toBe(input.address)
    expect(output.postalCode).toBe(input.postalCode)
    expect(output.phone).toBe(input.phone)
    expect(output.email).toBe(input.email)
  })

  test('Should be able to find an account', async () => {
    const accountFacade = makeSut()

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

    const input = {
      filter: {
        id: fakeAccount.id.id
      }
    }

    const output = await accountFacade.find(input)
    expect(output.id).toBeTruthy()
    expect(output.name).toEqual(fakeAccount.name)
    expect(output.burth).toEqual(fakeAccount.burth)
    expect(output.country).toEqual(fakeAccount.country)
    expect(output.city).toEqual(fakeAccount.city)
    expect(output.address).toEqual(fakeAccount.address)
    expect(output.postalCode).toEqual(fakeAccount.postalCode)
    expect(output.phone).toEqual(fakeAccount.phone)
    expect(output.email).toEqual(fakeAccount.email)
  })

  test('Should be able to update an account', async () => {
    const accountFacade = makeSut()

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

    const input = {
      id: fakeAccount.id.id,
      name: 'Fanuel Ramos',
      email: 'fakeaccount@finapi.com'
    }

    const output = await accountFacade.update(input)

    expect(output.id).toBeTruthy()
    expect(output.name).toBe(input.name)
    expect(output.burth).toEqual(fakeAccount.burth)
    expect(output.country).toEqual(fakeAccount.country)
    expect(output.city).toEqual(fakeAccount.city)
    expect(output.address).toEqual(fakeAccount.address)
    expect(output.postalCode).toEqual(fakeAccount.postalCode)
    expect(output.phone).toEqual(fakeAccount.phone)
    expect(output.email).toBe(input.email)
  })

  test('Should create a new statement', async () => {
    const accountFacade = makeSut()

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

    const fakeStatement = {
      account: fakeAccount.id.id,
      transaction: new Id().id,
      amount: 25000,
      type: 'credit'
    }

    await accountFacade.addStatement(fakeStatement)

    const output = await AccountModel.findOne({ id: fakeAccount.id.id })

    expect(output).toBeTruthy()
    expect(output?.id).toBeDefined()
    expect(output?.statement[0].id).toBeDefined()
    expect(output?.statement[0].amount).toBe(fakeStatement.amount)
    expect(output?.statement[0].type).toBe(fakeStatement.type)
  })

  test('Should find statements', async () => {
    const accountFacade = makeSut()

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

    const fakeStatement1 = {
      account: fakeAccount.id.id,
      transaction: new Id().id,
      amount: 25000,
      type: 'credit'
    }

    const fakeStatement2 = {
      account: fakeAccount.id.id,
      transaction: new Id().id,
      amount: 25000,
      type: 'debit'
    }
    await accountFacade.addStatement(fakeStatement1)
    await accountFacade.addStatement(fakeStatement2)

    const statement = await accountFacade.findStatement({ id: fakeAccount.id.id })

    expect(statement).toBeTruthy()
    expect(statement[0].transaction).toBeDefined()
    expect(statement[1].transaction).toBeDefined()
    expect(statement[0].type).toBe('credit')
    expect(statement[1].type).toBe('debit')
  })

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
