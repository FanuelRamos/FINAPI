import ValidatorInterface from '../../@shared/validators/validator-interface'
import Transaction from '../entity/transaction-entity'
import TransactionYupValidator from '../validator/transaction-yup-validator'

export default class TransactionValidatorFactory {
  static create (): ValidatorInterface<Transaction> {
    return new TransactionYupValidator()
  }
}
