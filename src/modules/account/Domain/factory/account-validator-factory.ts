/* eslint-disable @typescript-eslint/no-extraneous-class */
import ValidatorInterface from '../../../@shared/validators/validator-interface'
import Account from '../entity/account-entity'
import AccountYupValidator from '../validator/account-yup-validator'

export default class AccountValidatorFactory {
  static create (): ValidatorInterface<Account> {
    return new AccountYupValidator()
  }
}
