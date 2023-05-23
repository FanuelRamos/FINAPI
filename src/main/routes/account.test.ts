import mongoose from 'mongoose'
import request from 'supertest'
import app from '../config/app'

let conn: any = null

const makePostReuqest = async (): Promise<void> => {
  await request(app)
    .post('/api/account')
    .send({
      name: 'any_name',
      burth: new Date(),
      country: 'any_country',
      city: 'any_city',
      address: 'any_address',
      postalCode: '0000',
      phone: '+244939781000',
      email: 'any_email@mail.com'
    })
}

describe('Account routes test', () => {
  beforeAll(async () => {
    conn = await mongoose.connect(process.env.MONGO_URI_TEST!)
  })

  describe('POST /account', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/account')
        .send({
          name: 'any_name',
          burth: new Date(),
          country: 'any_country',
          city: 'any_city',
          address: 'any_address',
          postalCode: '0000',
          phone: '+244939781000',
          email: 'any_email@mail.com'
        })
        .expect(200)
    })
  })

  describe('GET /account', () => {
    test('Should return 200 on find account', async () => {
      await makePostReuqest()

      await request(app)
        .get('/api/account')
        .send({
          filter: {
            email: 'any_email@mail.com'
          }
        })
        .expect(200)
    })
  })

  describe('PUT /account', () => {
    test('Should return 200 on update account', async () => {
      await makePostReuqest()

      const account = await request(app)
        .get('/api/account')
        .send({
          filter: {
            email: 'any_email@mail.com'
          }
        })

      await request(app)
        .put('/api/account')
        .send({
          id: account.body.id,
          name: 'Fanuel Ramos',
          email: 'fakeaccount@finapi.com'
        })
        .expect(200)
    })
  })

  describe('POST /account/statement', () => {
    test('Should return 200 on add a Statement', async () => {
      await makePostReuqest()

      const account = await request(app)
        .get('/api/account')
        .send({
          filter: {
            email: 'any_email@mail.com'
          }
        })

      await request(app)
        .post('/api/account/statement')
        .send({
          account: account.body.id,
          transaction: 'any_id_transaction',
          amount: 25000,
          type: 'credit'
        })
        .expect(200)
    })
  })

  afterEach(async () => {
    await mongoose.connection.dropCollection('accounts')
  })

  afterAll(async () => {
    await conn.close
  })
})
