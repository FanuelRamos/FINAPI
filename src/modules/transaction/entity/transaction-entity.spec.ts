import Id from '../../@shared/domain/value-object/id-value-object'
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

  test('Should throw if amount is less than 100', () => {
    expect(() => new Transaction({
      senderAccount: new Id().id,
      senderName: 'Any_Sender_Name',
      recipientAccount: new Id().id,
      recepientName: 'Any_Recepient_Name',
      amount: 90
    })).toThrow()
  })
})
