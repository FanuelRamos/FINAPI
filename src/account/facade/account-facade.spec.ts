import { connectDb, dropCollections, dropDb } from '../../@shared/utils/mongodb-memory-server'
import AccountFacadeFactory from '../factory/account-facade-factory'

describe('AccountFacade unit test', () => {
  beforeAll(async () => {
    await connectDb()
  })

  test('Should be able to create a new Account', async () => {
    const accountFacade = AccountFacadeFactory.create()

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

  afterEach(async () => {
    await dropCollections()
  })

  afterAll(async () => {
    await dropDb()
  })
})
