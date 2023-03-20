import Account from './account-entity'

describe('AccountEntity test', () => {
  test('Should throw if required fields are missing', () => {
    expect(() => new Account({
      name: '',
      burth: new Date(),
      country: '',
      city: '',
      address: '',
      postalCode: '',
      phone: '',
      email: '',
      password: ''
    })).toThrow()
  })
})
