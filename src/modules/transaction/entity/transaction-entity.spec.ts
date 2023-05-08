import Transaction from './transaction-entity'

describe('Transactions tests', () => {
  test('Should throw if required fields are missing', () => {
    expect(() => new Transaction({
      senderAccount: '',
      senderName: '',
      recipientAccount: '',
      recepientName: '',
      amount: 100
    })).toThrow()
  })
})
