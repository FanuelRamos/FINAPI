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

  test('Should throw if an invalid email address is provided', () => {
    expect(() => new Account({
      name: 'any_name',
      burth: new Date(),
      country: 'any_country',
      city: 'any_city',
      address: 'any_address',
      postalCode: 'any_post',
      phone: 'any_phone',
      email: 'any_email',
      password: 'any_password'
    })).toThrow()
  })
})
