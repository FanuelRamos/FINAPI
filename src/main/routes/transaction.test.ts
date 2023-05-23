import mongoose from 'mongoose'
import request from 'supertest'
import app from '../config/app'

let conn: any = null

const makePostReuqest = async (email?: string): Promise<any> => {
  return await request(app)
    .post('/api/account')
    .send({
      name: 'any_name',
      burth: new Date(),
      country: 'any_country',
      city: 'any_city',
      address: 'any_address',
      postalCode: '0000',
      phone: '+244939781000',
      email: email ?? 'any_email@mail.com'
    })
}

describe('Transactions routes test', () => {
  beforeAll(async () => {
    conn = await mongoose.connect(process.env.MONGO_URI_TEST!)
  })

  describe('POST /transaction', () => {
    test('Should return 200 on add a transaction', async () => {
      const senderAccount = await makePostReuqest()
      const recipientAccount = await makePostReuqest('any_email1@mail.com')

      await request(app)
        .post('/api/account/statement')
        .send({
          account: senderAccount.body.id,
          transaction: 'any_id_transaction',
          amount: 25000,
          type: 'credit'
        })

      await request(app)
        .post('/api/transaction')
        .send({
          senderAccount: senderAccount.body.id,
          senderName: senderAccount.body.name,
          recipientAccount: recipientAccount.body.id,
          recipientName: recipientAccount.body.name,
          amount: 2500
        })
        .expect(200)
    })
  })

  describe('GET /transaction', () => {
    test('Should return 200 on find a transaction', async () => {
      const senderAccount = await makePostReuqest()
      const recipientAccount = await makePostReuqest('any_email1@mail.com')

      await request(app)
        .post('/api/account/statement')
        .send({
          account: senderAccount.body.id,
          transaction: 'any_id_transaction',
          amount: 25000,
          type: 'credit'
        })

      const transaction = await request(app)
        .post('/api/transaction')
        .send({
          senderAccount: senderAccount.body.id,
          senderName: senderAccount.body.name,
          recipientAccount: recipientAccount.body.id,
          recipientName: recipientAccount.body.name,
          amount: 2500
        })

      await request(app)
        .get('/api/transaction')
        .send({
          filter: {
            id: transaction.body.id
          }
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
