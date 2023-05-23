import mongoose from 'mongoose'
import request from 'supertest'
import app from '../config/app'

let conn: any = null

describe('Account routes test', () => {
  beforeAll(async () => {
    conn = await mongoose.connect(process.env.MONGO_URI_TEST!)
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
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

  afterEach(async () => {
    await mongoose.connection.dropCollection('accounts')
  })

  afterAll(async () => {
    await conn.close
  })
})
